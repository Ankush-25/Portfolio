'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import * as THREE from 'three';
import { useMotion } from '@/context/MotionContext';
import portraitData from '@/content/portraitData.json';

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
  float p = smoothstep(0.02, 0.8, uProgress);

  // Disperse into mini particle layer-up scanlines & waves upon scrolling
  vec3 target = vec3(
    (aSeed - 0.5) * 3.6,
    sin(aSeed * 25.1327) * 0.08 + (floor(position.y * 6.0 + 3.0) - 3.0) * 0.24,
    sin(aSeed * 18.0) * 0.16
  );
  vec3 pos = mix(position, target, p);

  // Natural subtle drift on highlights
  float edge = smoothstep(0.18, 0.5, abs(position.x));
  pos.x += sin(uTime * 0.35 + aSeed * 35.0) * 0.008 * (edge + p);
  pos.y += cos(uTime * 0.25 + aSeed * 25.0) * 0.006 * p;
  pos.z += sin(aSeed * 50.0 + uTime * 0.2) * 0.015;

  vec4 mv = modelViewMatrix * vec4(pos * uScale, 1.0);
  gl_Position = projectionMatrix * mv;

  // Crisp circular particle point size: prominent & clearly visible
  float brightness = dot(aColor, vec3(0.299, 0.587, 0.114));
  gl_PointSize = clamp((2.4 + brightness * 2.0) * uDpr, 2.2, 7.0);

  // Shift to warm amber-gold shimmer on scroll
  vColor = mix(aColor, vec3(1.0, 0.58, 0.26), p * 0.6);

  // Fade out and remove completely as scroll progresses
  vAlpha = max(0.0, 1.0 - p * 1.25) * smoothstep(0.55, 0.35, abs(position.y));
}
`;

const fragmentShader = `
varying vec3 vColor;
varying float vAlpha;

void main() {
  // Circular point mask: perfectly round particles, never stretched or elongated
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;

  float edge = smoothstep(0.5, 0.15, d);
  float core = smoothstep(0.2, 0.0, d) * 0.45;
  float alpha = edge * vAlpha;
  if (alpha < 0.01) discard;

  // Luminous cybernetic particle glow with core highlight
  vec3 finalColor = vColor * 1.35 + vec3(core);
  gl_FragColor = vec4(finalColor, alpha * 0.95);
}
`;

export const HeroBackdrop3D: React.FC = () => {
  const { isMotionEnabled } = useMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('top');
      const heroHeight = heroEl ? heroEl.offsetHeight : window.innerHeight;
      const progress = Math.min(Math.max(window.scrollY / (heroHeight * 0.75), 0), 1);
      scrollRef.current = progress;

      // Gradually fade down and sink the photo on scroll until it vanishes
      if (imageRef.current) {
        const opacity = Math.max(0, 1 - progress * 1.7);
        imageRef.current.style.opacity = opacity.toString();
        imageRef.current.style.transform = `translateX(-50%) scale(${1 - progress * 0.05}) translateY(${progress * 25}px)`;
      }
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

    // 9,772 portrait particles from portraitData.json
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(portraitData.positions, 3));
    particleGeometry.setAttribute('aColor', new THREE.Float32BufferAttribute(portraitData.colors, 3));
    particleGeometry.setAttribute('aSeed', new THREE.Float32BufferAttribute(portraitData.seeds, 1));

    const pointsObject = new THREE.Points(particleGeometry, material);
    scene.add(pointsObject);

    // Sync 3D particle scale and vertical center with the big .artifact-fallback image
    const updateMeshAlignment = () => {
      const fallback = document.querySelector('.artifact-fallback');
      const vHeight = 2 * 4.2 * Math.tan((40 / 2) * (Math.PI / 180)); // ~3.057
      if (fallback) {
        const rect = fallback.getBoundingClientRect();
        const canvasHeight = window.innerHeight;
        material.uniforms.uScale.value = (rect.height / canvasHeight) * vHeight;
        pointsObject.position.y = vHeight / 2 - (rect.top + rect.height / 2) * (vHeight / canvasHeight);
      } else {
        const isMobile = window.innerWidth < 768;
        material.uniforms.uScale.value = isMobile ? 1.8 : 2.2;
        pointsObject.position.set(0, isMobile ? 0.35 : 0.22, 0);
      }
    };
    updateMeshAlignment();

    // Ambient floating celestial star dust across viewport
    const dustCount = 80;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i++) {
      dustPositions[i] = (Math.random() - 0.5) * 16;
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

    // Subtle orbital ring
    const ringGeo = new THREE.TorusGeometry(3.2, 0.005, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x444444,
      transparent: true,
      opacity: 0.16,
      wireframe: true,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Mouse parallax
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateMeshAlignment();
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const currentUProgress = material.uniforms.uProgress.value;
      material.uniforms.uProgress.value = THREE.MathUtils.damp(currentUProgress, scrollRef.current, 3.8, delta);
      material.uniforms.uTime.value = time;

      // 3D rotational tilt tracking cursor
      pointsObject.rotation.y = THREE.MathUtils.damp(pointsObject.rotation.y, mouseRef.current.x * 0.08, 3.5, delta);
      pointsObject.rotation.x = THREE.MathUtils.damp(pointsObject.rotation.x, -mouseRef.current.y * 0.06, 3.5, delta);

      dust.rotation.y = time * 0.012;
      ring.rotation.z = time * 0.02;

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
      ringGeo.dispose();
      ringMat.dispose();
      particleGeometry.dispose();
      renderer.dispose();
    };
  }, [isMotionEnabled]);

  return (
    <div
      aria-hidden="true"
      className="scene-backdrop fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 32%, rgba(45, 45, 45, 0.4) 0%, rgba(3, 3, 3, 0) 65%), #030303',
      }}
    >
      {/* Big, atmospheric centered portrait matching Sarthak's reference site */}
      <div
        ref={imageRef}
        className="artifact-fallback absolute top-[40px] sm:top-[60px] left-1/2 -translate-x-1/2 w-[85vw] sm:w-[500px] lg:w-[580px] xl:w-[620px] aspect-square select-none will-change-transform"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, #000 48%, rgba(0,0,0,0.85) 72%, transparent 96%)',
          maskImage: 'linear-gradient(to bottom, #000 48%, rgba(0,0,0,0.85) 72%, transparent 96%)',
        }}
      >
        <Image
          src="/ankit-hero.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 85vw, 620px"
          className="object-contain object-top contrast-110 brightness-105 grayscale hover:grayscale-0 transition-all duration-1000"
        />
        {/* Soft edge ambient light */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/80 via-transparent to-transparent" />
      </div>

      {/* Three.js 3D Photo Particle Layerup Canvas overlapping directly over the big portrait */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle Matrix Vignette Grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
};
