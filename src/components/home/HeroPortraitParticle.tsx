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
uniform float uDpr;
uniform float uSpan;
varying vec3 vColor;
varying float vAlpha;

void main() {
  float p = smoothstep(0.01, 0.85, uProgress);

  // Scaled base position mapped directly over the photo
  vec3 basePos = vec3(position.x * uSpan, position.y * uSpan, position.z);

  // Disperse and peel off from the vanishing photo into wide horizontal scanline waves
  vec3 target = vec3(
    (aSeed - 0.5) * 4.4,
    sin(aSeed * 25.1327) * 0.16 + (floor(position.y * 6.0 + 3.0) - 3.0) * 0.32,
    sin(aSeed * 18.0) * 0.25
  );
  vec3 pos = mix(basePos, target, p);

  // Natural subtle drift on highlights
  pos.x += sin(uTime * 0.4 + aSeed * 35.0) * 0.007 * (1.0 + p * 1.5);
  pos.y += cos(uTime * 0.3 + aSeed * 25.0) * 0.005 * (1.0 + p * 1.5);
  pos.z += sin(aSeed * 50.0 + uTime * 0.25) * 0.015;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;

  // Crisp circular particle point size: highly prominent and visible
  float brightness = dot(aColor, vec3(0.299, 0.587, 0.114));
  gl_PointSize = clamp((3.0 + brightness * 2.8) * uDpr, 3.2, 9.0);

  // Shift to warm amber-gold shimmer on scroll
  vColor = mix(aColor, vec3(1.0, 0.68, 0.35), p * 0.65);

  // Correct GLSL radial feathering (1.0 - smoothstep(min, max))
  float radius = length(position.xy);
  float feather = 1.0 - smoothstep(0.38, 0.5, radius);

  // Fade out and remove completely as scroll progresses
  vAlpha = max(0.0, 1.0 - p * 1.25) * feather;
}
`;

const fragmentShader = `
varying vec3 vColor;
varying float vAlpha;

void main() {
  // Circular point mask: perfectly round particles, never stretched or elongated
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;

  float edge = smoothstep(0.5, 0.1, d);
  float core = smoothstep(0.22, 0.0, d) * 0.65;
  float alpha = edge * vAlpha;
  if (alpha < 0.01) discard;

  // Luminous cybernetic particle glow with bright core highlight
  vec3 finalColor = vColor * 1.55 + vec3(core);
  gl_FragColor = vec4(finalColor, alpha * 0.95);
}
`;

export const HeroPortraitParticle: React.FC = () => {
  const { isMotionEnabled } = useMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('top');
      const heroHeight = heroEl ? heroEl.offsetHeight : window.innerHeight;
      const progress = Math.min(Math.max(window.scrollY / (heroHeight * 0.7), 0), 1);
      scrollRef.current = progress;

      // Smooth gradual fade down and slight scale sink of the photo on scroll
      if (imageWrapperRef.current) {
        const fadeOpacity = Math.max(0, 1 - progress * 1.7);
        imageWrapperRef.current.style.opacity = fadeOpacity.toString();
        imageWrapperRef.current.style.transform = `scale(${1 - progress * 0.06}) translateY(${progress * 22}px)`;
      }
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
      const size = Math.round(Math.max(rect.width, rect.height)) || 450;
      renderer.setSize(size, size, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    updateDimensions();

    // Exact projective span mapping particles onto the central photo
    const expansionRatio = 1.4;
    const cameraSpan = 2 * 2.8 * Math.tan((40 / 2) * (Math.PI / 180)); // 2.0382
    const portraitSpan = cameraSpan / expansionRatio;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uDpr: { value: Math.min(window.devicePixelRatio, 2) },
        uSpan: { value: portraitSpan },
      },
    });

    // Instant zero-latency geometry generation from pre-extracted portrait data
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(portraitData.positions, 3));
    particleGeometry.setAttribute('aColor', new THREE.Float32BufferAttribute(portraitData.colors, 3));
    particleGeometry.setAttribute('aSeed', new THREE.Float32BufferAttribute(portraitData.seeds, 1));

    const pointsObject = new THREE.Points(particleGeometry, material);
    scene.add(pointsObject);

    // Ambient floating stardust around portrait
    const dustCount = 45;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i++) {
      dustPositions[i] = (Math.random() - 0.5) * 3.6;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.03,
      transparent: true,
      opacity: 0.45,
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
      if (material) {
        material.uniforms.uDpr.value = Math.min(window.devicePixelRatio, 2);
      }
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

      pointsObject.rotation.y = THREE.MathUtils.damp(pointsObject.rotation.y, mouseRef.current.x * 0.12, 3.5, delta);
      pointsObject.rotation.x = THREE.MathUtils.damp(pointsObject.rotation.x, -mouseRef.current.y * 0.1, 3.5, delta);

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
      particleGeometry.dispose();
      renderer.dispose();
    };
  }, [isMotionEnabled]);

  return (
    <div
      ref={containerRef}
      className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[350px] lg:h-[350px] aspect-square select-none group"
      aria-label="Portrait of Ankit Bhandari with interactive 3D particle layerup"
    >
      {/* Soft atmospheric backlight halo */}
      <div className="absolute -inset-8 rounded-full bg-gradient-to-b from-white/10 via-zinc-800/10 to-transparent blur-3xl opacity-50 pointer-events-none" />

      {/* Crisp portrait image in pure feathery mode (NO STROKE, NO BOX BORDER) */}
      <div
        ref={imageWrapperRef}
        className="relative w-full h-full select-none will-change-transform"
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse 48% 46% at 50% 46%, #000 30%, rgba(0,0,0,0.85) 52%, rgba(0,0,0,0.2) 75%, transparent 95%)',
          maskImage: 'radial-gradient(ellipse 48% 46% at 50% 46%, #000 30%, rgba(0,0,0,0.85) 52%, rgba(0,0,0,0.2) 75%, transparent 95%)',
        }}
      >
        <Image
          src="/ankit-hero.png"
          alt="Ankit Bhandari"
          fill
          priority
          sizes="(max-width: 640px) 240px, (max-width: 768px) 320px, 350px"
          className="object-contain object-center contrast-110 brightness-105 grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        {/* Soft edge ambient light overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 3D WebGL particle cloud overlapping directly ON TOP of the image */}
      <canvas
        ref={canvasRef}
        className="absolute -inset-[20%] w-[140%] h-[140%] pointer-events-none z-20"
      />
    </div>
  );
};
