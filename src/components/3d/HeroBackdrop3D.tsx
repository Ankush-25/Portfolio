'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as THREE from 'three';
import { useMotion } from '@/context/MotionContext';

const vertexShader = `
attribute vec3 aColor;
attribute float aSeed;
uniform float uTime;
uniform float uProgress;
uniform float uScale;
uniform float uDpr;
varying vec3 vColor;
varying float vAlpha;

void main() {
  float p = smoothstep(0.02, 0.85, uProgress);
  // Disperse into mini particle layer-up scanlines / waves upon scrolling
  vec3 target = vec3(
    (aSeed - 0.5) * 3.2,
    sin(aSeed * 25.1327) * 0.08 + (floor(position.x * 4.0 + 2.0) - 2.0) * 0.22,
    sin(aSeed * 18.0) * 0.15
  );
  vec3 pos = mix(position, target, p);
  float edge = smoothstep(0.18, 0.5, abs(position.x));
  pos.x += sin(uTime * 0.35 + aSeed * 40.0) * 0.012 * (edge + p);
  pos.y += cos(uTime * 0.25 + aSeed * 30.0) * 0.008 * p;
  pos.z += sin(aSeed * 64.0 + uTime * 0.2) * 0.02;

  vec4 mv = modelViewMatrix * vec4(pos * uScale, 1.0);
  gl_Position = projectionMatrix * mv;

  // Particle size based on brightness and DPR
  gl_PointSize = clamp((1.35 + dot(aColor, vec3(0.299, 0.587, 0.114)) * 1.1) * uDpr, 1.0, 5.0);

  // Transition from natural skin/suit tone to amber-gold particle glow on scroll
  vColor = mix(aColor, vec3(1.0, 0.52, 0.22), p * 0.65);
  vAlpha = (1.0 - p * 0.4) * smoothstep(0.55, 0.32, abs(position.y));
}
`;

const fragmentShader = `
varying vec3 vColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float alpha = smoothstep(0.5, 0.22, d) * vAlpha;
  if (alpha < 0.02) discard;
  gl_FragColor = vec4(vColor * 1.35, alpha * 0.95);
}
`;

export const HeroBackdrop3D: React.FC = () => {
  const { isMotionEnabled } = useMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isWebGLReady, setIsWebGLReady] = useState(false);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('top');
      const heroHeight = heroEl ? heroEl.offsetHeight : window.innerHeight;
      const progress = Math.min(Math.max(window.scrollY / (heroHeight * 0.85), 0), 1);
      scrollRef.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isMotionEnabled) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uScale: { value: 2.8 },
        uDpr: { value: Math.min(window.devicePixelRatio, 2) },
      },
    });

    let pointsObject: THREE.Points | null = null;
    let particleGeometry: THREE.BufferGeometry | null = null;

    // Load & Sample Photo Pixels into 3D Point Cloud
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = '/ankit-hero.png';

    img.onload = () => {
      try {
        const sampleWidth = window.innerWidth < 768 ? 160 : 260;
        const sampleHeight = Math.round(sampleWidth * 1.25);

        const offCanvas = document.createElement('canvas');
        offCanvas.width = sampleWidth;
        offCanvas.height = sampleHeight;
        const ctx = offCanvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, sampleWidth, sampleHeight);
        const imgData = ctx.getImageData(0, 0, sampleWidth, sampleHeight);
        const data = imgData.data;

        const positions: number[] = [];
        const colors: number[] = [];
        const seeds: number[] = [];

        for (let y = 0; y < sampleHeight; y++) {
          for (let x = 0; x < sampleWidth; x++) {
            const idx = (y * sampleWidth + x) * 4;
            const r = data[idx] / 255;
            const g = data[idx + 1] / 255;
            const b = data[idx + 2] / 255;
            const a = data[idx + 3] / 255;
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

            // Skip dark/transparent background pixels to isolate the subject
            if (a < 0.1 || luminance < 0.04) continue;

            // Normalize coordinate space
            const posX = (x / sampleWidth - 0.5) * 0.95;
            const posY = (0.5 - y / sampleHeight) * 1.15;
            const posZ = luminance * 0.04;

            positions.push(posX, posY, posZ);
            colors.push(r, g, b);
            seeds.push(((x * 127 + y * 311) % 997) / 997);
          }
        }

        particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        particleGeometry.setAttribute('aColor', new THREE.Float32BufferAttribute(colors, 3));
        particleGeometry.setAttribute('aSeed', new THREE.Float32BufferAttribute(seeds, 1));

        pointsObject = new THREE.Points(particleGeometry, material);

        // Position the particle cloud on the right side over the photo
        const isMobile = window.innerWidth < 768;
        pointsObject.position.set(isMobile ? 0 : 0.85, isMobile ? 0.2 : 0, 0);

        scene.add(pointsObject);
        setIsWebGLReady(true);
      } catch (err) {
        console.warn('Particle mesh generation fallback', err);
      }
    };

    // Ambient floating star dust in background
    const bgDustCount = 100;
    const bgDustGeo = new THREE.BufferGeometry();
    const bgPositions = new Float32Array(bgDustCount * 3);
    for (let i = 0; i < bgDustCount * 3; i++) {
      bgPositions[i] = (Math.random() - 0.5) * 20;
    }
    bgDustGeo.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));
    const bgDustMat = new THREE.PointsMaterial({
      color: 0x777777,
      size: 0.035,
      transparent: true,
      opacity: 0.35,
    });
    const bgDust = new THREE.Points(bgDustGeo, bgDustMat);
    scene.add(bgDust);

    // Mouse move parallax
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      if (pointsObject) {
        const isMob = window.innerWidth < 768;
        pointsObject.position.set(isMob ? 0 : 0.85, isMob ? 0.2 : 0, 0);
        material.uniforms.uScale.value = isMob ? 2.2 : 2.8;
      }
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Damped mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Smooth scroll damp for particle layer-up / wave dispersion
      const currentUProgress = material.uniforms.uProgress.value;
      material.uniforms.uProgress.value = THREE.MathUtils.damp(currentUProgress, scrollRef.current, 4.0, delta);
      material.uniforms.uTime.value = time;

      if (pointsObject) {
        pointsObject.rotation.y = THREE.MathUtils.damp(pointsObject.rotation.y, mouseRef.current.x * 0.08, 3.5, delta);
        pointsObject.rotation.x = THREE.MathUtils.damp(pointsObject.rotation.x, -mouseRef.current.y * 0.05, 3.5, delta);
      }

      bgDust.rotation.y = time * 0.015;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      material.dispose();
      bgDustGeo.dispose();
      bgDustMat.dispose();
      particleGeometry?.dispose();
      renderer.dispose();
    };
  }, [isMotionEnabled]);

  return (
    <div
      aria-hidden="true"
      className="scene-backdrop fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        background: 'radial-gradient(at 70% 32%, rgba(35, 35, 35, 0.45) 0%, rgba(3, 3, 3, 0) 58%), #030303',
      }}
    >
      {/* Three.js 3D Photo Particle Layerup Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Atmospheric Portrait: When WebGL is ready, opacity shifts to 0.38 so 3D particle points shine directly on top */}
      <div
        className={`artifact-fallback absolute top-[60px] sm:top-[80px] right-0 sm:right-[5%] w-[85vw] sm:w-[50vw] max-w-[620px] aspect-[4/5] select-none transition-opacity duration-1000 ${
          isWebGLReady ? 'opacity-35 webgl-active' : 'opacity-85'
        }`}
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, #000 35%, rgba(0,0,0,0.85) 65%, transparent 94%)',
          maskImage: 'linear-gradient(to bottom, #000 35%, rgba(0,0,0,0.85) 65%, transparent 94%)',
        }}
      >
        <Image
          src="/ankit-hero.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 85vw, 620px"
          className="object-contain object-top contrast-115 grayscale hover:grayscale-0 transition-all duration-1000"
        />
        {/* Soft edge ambient light */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-90" />
      </div>

      {/* Subtle Matrix Vignette Grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
};
