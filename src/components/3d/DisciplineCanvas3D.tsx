'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useMotion } from '@/context/MotionContext';

interface DisciplineCanvas3DProps {
  activeId: 'build' | 'engineer' | 'scale';
}

export const DisciplineCanvas3D: React.FC<DisciplineCanvas3DProps> = ({ activeId }) => {
  const { isMotionEnabled } = useMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const objectGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 280;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
    } catch {
      // Fallback gracefully in environments without WebGL
      return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const group = new THREE.Group();
    scene.add(group);
    objectGroupRef.current = group;

    // 1. Build: Nested 3D Wireframe Icosahedron & Rings
    const buildGroup = new THREE.Group();
    const icoGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xe5e5e0,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    buildGroup.add(ico);

    const innerGeo = new THREE.OctahedronGeometry(1.0, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x9e9e9e,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    buildGroup.add(inner);

    const orbitRingGeo = new THREE.TorusGeometry(2.3, 0.02, 16, 80);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0x666666,
      transparent: true,
      opacity: 0.4,
    });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 2.5;
    buildGroup.add(orbitRing);

    // 2. Engineer: 3D Time-Series Neural Lattice / Wave
    const engineerGroup = new THREE.Group();
    const planeGeo = new THREE.PlaneGeometry(3.6, 3.6, 16, 16);
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = -Math.PI / 3;
    engineerGroup.add(plane);

    const pointsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
    });
    const nodePoints = new THREE.Points(planeGeo, pointsMat);
    plane.add(nodePoints);

    // 3. Scale: Concentric Ripple Rings
    const scaleGroup = new THREE.Group();
    for (let r = 0.6; r <= 2.4; r += 0.45) {
      const ringG = new THREE.RingGeometry(r, r + 0.03, 64);
      const ringM = new THREE.MeshBasicMaterial({
        color: 0xdddddd,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35 + (r / 2.4) * 0.4,
      });
      const ringMsh = new THREE.Mesh(ringG, ringM);
      ringMsh.rotation.x = Math.PI / 2.8;
      scaleGroup.add(ringMsh);
    }

    // Set initial active object
    buildGroup.visible = activeId === 'build';
    engineerGroup.visible = activeId === 'engineer';
    scaleGroup.visible = activeId === 'scale';

    group.add(buildGroup);
    group.add(engineerGroup);
    group.add(scaleGroup);

    // Mouse drag controls for rotating 3D object
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !group) return;
      const deltaX = e.clientX - prevMouseRef.current.x;
      const deltaY = e.clientY - prevMouseRef.current.y;

      group.rotation.y += deltaX * 0.01;
      group.rotation.x += deltaY * 0.01;

      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 280;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (isMotionEnabled && !isDraggingRef.current) {
        group.rotation.y += 0.007;
        group.rotation.x += 0.003;

        if (engineerGroup.visible) {
          const pos = planeGeo.attributes.position;
          for (let i = 0; i < pos.count; i++) {
            const u = pos.getX(i);
            const v = pos.getY(i);
            const z = Math.sin(u * 2 + elapsedTime * 2) * 0.25 + Math.cos(v * 2 + elapsedTime * 1.5) * 0.25;
            pos.setZ(i, z);
          }
          pos.needsUpdate = true;
        }

        if (scaleGroup.visible) {
          scaleGroup.children.forEach((child, index) => {
            const s = 1 + Math.sin(elapsedTime * 2.5 + index * 0.8) * 0.06;
            child.scale.set(s, s, s);
          });
        }
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onResize);

      icoGeo.dispose();
      icoMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      orbitRingGeo.dispose();
      orbitRingMat.dispose();
      planeGeo.dispose();
      planeMat.dispose();
      pointsMat.dispose();
      renderer.dispose();
    };
  }, [activeId, isMotionEnabled]);

  return (
    <div
      ref={containerRef}
      className="signal-visual w-full h-[280px] sm:h-[320px] rounded-2xl relative overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing border border-border bg-gradient-to-b from-[#111111]/80 to-[#070707]/90 shadow-inner group"
      style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(55, 55, 55, 0.2) 0%, rgba(10, 10, 10, 0.9) 75%)',
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* 3D Coordinate Hint */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-zinc-500 pointer-events-none">
        <span>INTERACTIVE 3D OBJECT</span>
        <span>DRAG TO ROTATE ↗</span>
      </div>
    </div>
  );
};
