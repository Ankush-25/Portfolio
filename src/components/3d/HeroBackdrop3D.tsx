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

  // Disperse into mini particle layer-up scanlines upon scrolling
  vec3 target = vec3(
    (aSeed - 0.5) * 2.8,
    sin(aSeed * 25.1327) * 0.07 + (floor(position.y * 6.0 + 3.0) - 3.0) * 0.16,
    sin(aSeed * 18.0) * 0.12
  );
  vec3 pos = mix(position, target, p);

  // Subtle natural floating drift
  float edge = smoothstep(0.15, 0.5, abs(position.x));
  pos.x += sin(uTime * 0.35 + aSeed * 35.0) * 0.008 * (edge + p);
  pos.y += cos(uTime * 0.25 + aSeed * 25.0) * 0.006 * p;
  pos.z += sin(aSeed * 50.0 + uTime * 0.2) * 0.015;

  vec4 mv = modelViewMatrix * vec4(pos * uScale, 1.0);
  gl_Position = projectionMatrix * mv;

  // Round, crisp particle point size with uniform square scale
  float brightness = dot(aColor, vec3(0.299, 0.587, 0.114));
  gl_PointSize = clamp((1.8 + brightness * 0.9) * uDpr, 1.5, 4.5);

  // Amber glow shift on scroll
  vColor = mix(aColor, vec3(1.0, 0.55, 0.24), p * 0.6);
  vAlpha = (1.0 - p * 0.35) * smoothstep(0.55, 0.35, abs(position.y));
}
`;

const fragmentShader = `
varying vec3 vColor;
varying float vAlpha;

void main() {
  // Circular point mask to ensure particles are perfectly round, never stretched
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float alpha = smoothstep(0.5, 0.2, d) * vAlpha;
  if (alpha < 0.02) discard;

  gl_FragColor = vec4(vColor * 1.3, alpha * 0.95);
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
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uScale: { value: 2.2 },
        uDpr: { value: Math.min(window.devicePixelRatio, 2) },
      },
    });

    let pointsObject: THREE.Points | null = null;
    let particleGeometry: THREE.BufferGeometry | null = null;

    // Load & Sample Photo Pixels with strictly preserved 1:1 Aspect Ratio
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = '/ankit-hero.png';

    img.onload = () => {
      try {
        // True 1:1 square sampling matching 800x800 image
        const sampleSize = window.innerWidth < 768 ? 180 : 260;

        const offCanvas = document.createElement('canvas');
        offCanvas.width = sampleSize;
        offCanvas.height = sampleSize;
        const ctx = offCanvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
        const imgData = ctx.getImageData(0, 0, sampleSize, sampleSize);
        const data = imgData.data;

        const positions: number[] = [];
        const colors: number[] = [];
        const seeds: number[] = [];

        for (let y = 0; y < sampleSize; y++) {
          for (let x = 0; x < sampleSize; x++) {
            const idx = (y * sampleSize + x) * 4;
            const r = data[idx] / 255;
            const g = data[idx + 1] / 255;
            const b = data[idx + 2] / 255;
            const a = data[idx + 3] / 255;
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

            // Filter out black backdrop
            if (a < 0.1 || luminance < 0.035) continue;

            // Pure square mapping: x and y have 1:1 scale
            const posX = (x / sampleSize - 0.5) * 1.0;
            const posY = (0.5 - y / sampleSize) * 1.0;
            const posZ = luminance * 0.03;

            positions.push(posX, posY, posZ);
            colors.push(r, g, b);
            seeds.push(((x * 137 + y * 293) % 997) / 997);
          }
        }

        particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        particleGeometry.setAttribute('aColor', new THREE.Float32BufferAttribute(colors, 3));
        particleGeometry.setAttribute('aSeed', new THREE.Float32BufferAttribute(seeds, 1));

        pointsObject = new THREE.Points(particleGeometry, material);

        // Position: Centered horizontally (x = 0), matching Sarthak's center layout
        const isMobile = window.innerWidth < 768;
        pointsObject.position.set(0, isMobile ? 0.35 : 0.22, 0);

        scene.add(pointsObject);
        setIsWebGLReady(true);
      } catch (err) {
        console.warn('Particle mesh initialization fallback', err);
      }
    };

    // Soft celestial particles around the centered portrait
    const dustCount = 80;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i++) {
      dustPositions[i] = (Math.random() - 0.5) * 16;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x666666,
      size: 0.03,
      transparent: true,
      opacity: 0.3,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // Mouse parallax
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
        pointsObject.position.set(0, isMob ? 0.35 : 0.22, 0);
        material.uniforms.uScale.value = isMob ? 1.8 : 2.2;
      }
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const currentUProgress = material.uniforms.uProgress.value;
      material.uniforms.uProgress.value = THREE.MathUtils.damp(currentUProgress, scrollRef.current, 4.0, delta);
      material.uniforms.uTime.value = time;

      if (pointsObject) {
        // Centered 3D rotational tilt tracking cursor
        pointsObject.rotation.y = THREE.MathUtils.damp(pointsObject.rotation.y, mouseRef.current.x * 0.08, 3.5, delta);
        pointsObject.rotation.x = THREE.MathUtils.damp(pointsObject.rotation.x, -mouseRef.current.y * 0.06, 3.5, delta);
      }

      dust.rotation.y = time * 0.012;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      material.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      particleGeometry?.dispose();
      renderer.dispose();
    };
  }, [isMotionEnabled]);

  return (
    <div
      aria-hidden="true"
      className="scene-backdrop fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 35%, rgba(45, 45, 45, 0.4) 0%, rgba(3, 3, 3, 0) 65%), #030303',
      }}
    >
      {/* Three.js 3D Photo Particle Layerup Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Atmospheric Centered Portrait: perfectly aligned with the 3D particles */}
      <div
        className={`artifact-fallback absolute top-[40px] sm:top-[60px] left-1/2 -translate-x-1/2 w-[85vw] sm:w-[500px] lg:w-[560px] aspect-square select-none transition-opacity duration-1000 ${
          isWebGLReady ? 'opacity-35 webgl-active' : 'opacity-85'
        }`}
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, #000 45%, rgba(0,0,0,0.85) 70%, transparent 95%)',
          maskImage: 'linear-gradient(to bottom, #000 45%, rgba(0,0,0,0.85) 70%, transparent 95%)',
        }}
      >
        <Image
          src="/ankit-hero.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 85vw, 560px"
          className="object-contain object-center contrast-115 grayscale hover:grayscale-0 transition-all duration-1000"
        />
        {/* Soft edge ambient light */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80" />
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
