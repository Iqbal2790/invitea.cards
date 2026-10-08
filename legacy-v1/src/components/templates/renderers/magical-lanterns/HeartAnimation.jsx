"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function HeartAnimation({ onComplete }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    // Transparent background
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 350; // Jarak kamera

    // 2. Generate Heart Path using DOM SVG (invisible)
    const ns = "http://www.w3.org/2000/svg";
    const path = document.createElementNS(ns, "path");
    // Perfect heart SVG path, centered at 0,0
    path.setAttribute(
      "d",
      "M 0,-30 C -40,-80 -100,-60 -100,-10 C -100,40 0,90 0,110 C 0,90 100,40 100,-10 C 100,-60 40,-80 0,-30 Z"
    );

    const length = path.getTotalLength();
    const vertices = [];

    // Mengambil titik-titik di sepanjang path
    for (let i = 0; i < length; i += 0.2) { // 0.2 adalah kerapatan partikel
      const point = path.getPointAtLength(i);
      
      // Mengubah ke Vector3 dan memberikan efek scatter/noise
      // SVG Y positif ke bawah, 3D Y positif ke atas, jadi kita -point.y
      const vector = new THREE.Vector3(point.x, -point.y + 20, 0);
      
      // Scatter noise pada posisi akhir
      vector.x += (Math.random() - 0.5) * 15;
      vector.y += (Math.random() - 0.5) * 15;
      vector.z += (Math.random() - 0.5) * 30;
      
      vertices.push(vector);
    }

    // Menyiapkan BufferGeometry
    const positions = new Float32Array(vertices.length * 3);
    for (let i = 0; i < vertices.length; i++) {
      positions[i * 3] = vertices[i].x;
      positions[i * 3 + 1] = vertices[i].y;
      positions[i * 3 + 2] = vertices[i].z;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Membuat tekstur glow (gradasi radial) secara programatik
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext("2d");
    const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.2, "rgba(255,255,255,0.8)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.2)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
    const texture = new THREE.CanvasTexture(canvas);

    // Material partikel (Pink menyala dengan tekstur glow)
    const material = new THREE.PointsMaterial({
      color: 0xff69b4, // Hot Pink
      size: 10, // Ukuran diperbesar untuk memaksimalkan efek glow
      map: texture,
      transparent: true,
      opacity: 0, // Mulai dengan transparan
      blending: THREE.AdditiveBlending,
      depthWrite: false, // Mencegah partikel saling menutupi
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 3. Render Loop
    let animationFrameId;
    const render = () => {
      // Update posisi partikel di BufferGeometry sesuai dengan Vector3 yang dianimasikan GSAP
      const positionAttr = geometry.attributes.position;
      for (let i = 0; i < vertices.length; i++) {
        positionAttr.array[i * 3] = vertices[i].x;
        positionAttr.array[i * 3 + 1] = vertices[i].y;
        positionAttr.array[i * 3 + 2] = vertices[i].z;
      }
      positionAttr.needsUpdate = true;

      // Rotasi lambat
      particles.rotation.y = Math.sin(Date.now() * 0.0005) * 0.3;
      particles.rotation.x = Math.sin(Date.now() * 0.0003) * 0.1;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    // 4. GSAP Animation
    const tl = gsap.timeline({
      onComplete: () => {
        // Setelah animasi selesai, jeda 1.5 detik, lalu pudar (fade out)
        gsap.to(material, {
          opacity: 0,
          duration: 1.5,
          delay: 1.5,
          ease: "power2.inOut",
          onComplete: () => {
            if (onComplete) onComplete();
          }
        });
        
        // Hati sedikit membesar (efek detak / burst) sebelum pudar
        gsap.to(particles.scale, {
          x: 1.2,
          y: 1.2,
          z: 1.2,
          duration: 1.5,
          delay: 1.5,
          ease: "power2.in"
        });
      }
    });

    // Fade in material dengan cepat di awal
    gsap.to(material, { opacity: 0.9, duration: 1, ease: "power2.inOut" });

    // Animasi sebaran (scatter) membentuk hati
    vertices.forEach((vector, i) => {
      tl.from(
        vector,
        {
          x: (Math.random() - 0.5) * 800, // Terpencar acak secara horizontal
          y: (Math.random() - 0.5) * 800, // Terpencar acak secara vertikal
          z: (Math.random() - 0.5) * 800, // Dari jarak jauh atau dekat
          ease: "power2.inOut",
          duration: gsap.utils.random(2, 4)
        },
        i * 0.001 // Staggering: setiap partikel mulai dengan jeda sangat kecil
      );
    });

    // Handle Resize
    const handleResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      // Memundurkan kamera di layar sempit (mobile) agar hati tidak terpotong
      camera.position.z = width < 768 ? 550 : 350;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    // Panggil sekali di awal untuk memastikan Z awal sudah benar
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      tl.kill();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [onComplete]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-50 flex items-center justify-center"
    />
  );
}
