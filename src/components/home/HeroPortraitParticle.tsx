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
uniform float uDpr;
varying vec3 vColor;
varying float vAlpha;

void main() {
  float p = smoothstep(0.01, 0.85, uProgress);

  // Disperse into mini particle layer-up scanlines & waves upon scrolling
  vec3 target = vec3(
    (aSeed - 0.5) * 3.4,
    sin(aSeed * 25.1327) * 0.12 + (floor(position.y * 5.0 + 2.5) - 2.5) * 0.32,
    sin(aSeed * 18.0) * 0.2
  );
  vec3 pos = mix(position, target, p);

  // Natural subtle floating drift on edges
  float edge = smoothstep(0.18, 0.6, length(position.xy));
  pos.x += sin(uTime * 0.4 + aSeed * 35.0) * 0.008 * (edge + p);
  pos.y += cos(uTime * 0.3 + aSeed * 25.0) * 0.006 * (edge + p);
  pos.z += sin(aSeed * 50.0 + uTime * 0.25) * 0.012;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;

  // Round, crisp circular particle point size
  float brightness = dot(aColor, vec3(0.299, 0.587, 0.114));
  gl_PointSize = clamp((1.7 + brightness * 1.1) * uDpr, 1.2, 4.2);

  // Shift to warm amber-gold shimmer on scroll
  vColor = mix(aColor, vec3(1.0, 0.58, 0.28), p * 0.65);
  vAlpha = (1.0 - p * 0.35) * smoothstep(0.7, 0.45, length(position.xy));
}
`;

const fragmentShader = `
varying vec3 vColor;
varying float vAlpha;

void main() {
  // Circular point mask: perfectly round particles, never stretched or elongated
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float alpha = smoothstep(0.5, 0.18, d) * vAlpha;
  if (alpha < 0.02) discard;

  // Crisp particle glow with additive illumination
  gl_FragColor = vec4(vColor * 1.35, alpha * 0.95);
}
`;

export const HeroPortraitParticle: React.FC = () => {
  const { isMotionEnabled } = useMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('top');
      const heroHeight = heroEl ? heroEl.offsetHeight : window.innerHeight;
      const progress = Math.min(Math.max(window.scrollY / (heroHeight * 0.75), 0), 1);
      scrollRef.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !isMotionEnabled) return;

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
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 2.8);

    const updateDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) || 300;
      renderer.setSize(size, size);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    updateDimensions();

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uDpr: { value: Math.min(window.devicePixelRatio, 2) },
      },
    });

    let pointsObject: THREE.Points | null = null;
    let particleGeometry: THREE.BufferGeometry | null = null;

    // Load and sample /ankit-hero.png
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = '/ankit-hero.png';

    img.onload = () => {
      try {
        const sampleSize = window.innerWidth < 768 ? 160 : 220;

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

        // Exact projective span matching the central portrait inside the expanded canvas
        // Canvas is expanded by 1.5x (w-[150%] h-[150%]) to allow particle dispersion margin
        const expansionRatio = 1.5;
        const cameraSpan = 2 * 2.8 * Math.tan((40 / 2) * (Math.PI / 180)); // 2.0382
        const portraitSpan = cameraSpan / expansionRatio;

        for (let y = 0; y < sampleSize; y++) {
          for (let x = 0; x < sampleSize; x++) {
            const idx = (y * sampleSize + x) * 4;
            const r = data[idx] / 255;
            const g = data[idx + 1] / 255;
            const b = data[idx + 2] / 255;
            const a = data[idx + 3] / 255;
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

            // Filter out black backdrop pixels
            if (a < 0.1 || luminance < 0.04) continue;

            // Pure 1:1 square coordinates mapped directly over the photo
            const posX = (x / sampleSize - 0.5) * portraitSpan;
            const posY = (0.5 - y / sampleSize) * portraitSpan;
            const posZ = luminance * 0.04;

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
        scene.add(pointsObject);
        setIsReady(true);
      } catch (err) {
        console.warn('Particle mesh initialization fallback', err);
      }
    };

    // Ambient floating stardust around portrait
    const dustCount = 40;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i++) {
      dustPositions[i] = (Math.random() - 0.5) * 3.5;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x888888,
      size: 0.025,
      transparent: true,
      opacity: 0.35,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // Mouse tilt tracking
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseRef.current.targetX = Math.min(Math.max((e.clientX - centerX) / (window.innerWidth / 2), -1), 1);
      mouseRef.current.targetY = Math.min(Math.max((e.clientY - centerY) / (window.innerHeight / 2), -1), 1);
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      updateDimensions();
    };
    window.addEventListener('resize', onResize);

    // Animation loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth cursor parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      const currentUProgress = material.uniforms.uProgress.value;
      material.uniforms.uProgress.value = THREE.MathUtils.damp(currentUProgress, scrollRef.current, 4.0, delta);
      material.uniforms.uTime.value = time;

      if (pointsObject) {
        pointsObject.rotation.y = THREE.MathUtils.damp(pointsObject.rotation.y, mouseRef.current.x * 0.12, 3.5, delta);
        pointsObject.rotation.x = THREE.MathUtils.damp(pointsObject.rotation.x, -mouseRef.current.y * 0.1, 3.5, delta);
      }

      dust.rotation.y = time * 0.015;

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
      ref={containerRef}
      className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-68 md:h-68 lg:w-72 lg:h-72 select-none group"
      aria-label="Portrait of Ankit Bhandari with interactive 3D particle layerup"
    >
      {/* Soft atmospheric backlight halo */}
      <div className="absolute -inset-4 rounded-full bg-gradient-to-b from-white/10 via-zinc-800/10 to-transparent blur-2xl opacity-50 pointer-events-none" />

      {/* Crisp, clearly shown portrait image */}
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden border border-border/80 bg-zinc-950/60 shadow-[0_0_50px_rgba(0,0,0,0.85)] transition-all duration-700"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, #000 70%, rgba(0,0,0,0.85) 86%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, #000 70%, rgba(0,0,0,0.85) 86%, transparent 100%)',
        }}
      >
        <Image
          src="/ankit-hero.png"
          alt="Ankit Bhandari"
          fill
          priority
          sizes="(max-width: 640px) 192px, (max-width: 768px) 240px, 288px"
          className="object-cover object-top contrast-110 brightness-105 grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        {/* Soft edge ambient light overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 3D WebGL particle cloud overlapping directly ON TOP of the image */}
      <canvas
        ref={canvasRef}
        className={`absolute -inset-[25%] w-[150%] h-[150%] pointer-events-none z-20 transition-opacity duration-700 ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
