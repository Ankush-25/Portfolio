'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useMotion } from '@/context/MotionContext';

export const HeroBackdrop3D: React.FC = () => {
  const { isMotionEnabled } = useMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

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

    // Ambient floating celestial star dust across the entire viewport
    const dustCount = 120;
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
    const ringGeo = new THREE.TorusGeometry(3.2, 0.006, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x444444,
      transparent: true,
      opacity: 0.18,
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
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      dust.rotation.y = time * 0.012 + mouseRef.current.x * 0.05;
      dust.rotation.x = mouseRef.current.y * 0.03;

      ring.rotation.z = time * 0.02;
      ring.rotation.y = mouseRef.current.x * 0.08;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      dustGeo.dispose();
      dustMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, [isMotionEnabled]);

  return (
    <div
      aria-hidden="true"
      className="scene-backdrop fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 30%, rgba(45, 45, 45, 0.35) 0%, rgba(3, 3, 3, 0) 65%), #030303',
      }}
    >
      {/* Three.js Global Scene Canvas */}
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
