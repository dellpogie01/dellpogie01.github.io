import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Code, Cpu } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
}

export const About: React.FC<AboutProps> = ({ darkMode }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    let animationFrameId: number;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 7);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);

      renderer.domElement.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
        cancelAnimationFrame(animationFrameId);
        setWebglSupported(false);
      }, false);

      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0x00f0ff, 3.5, 50);
      pointLight.position.set(3, 3, 3);
      scene.add(pointLight);

      const pointLight2 = new THREE.PointLight(0x8b5cf6, 3.0, 50);
      pointLight2.position.set(-3, -3, 3);
      scene.add(pointLight2);

      const techItems = [
        { color: 0x00f0ff, label: 'Kotlin' },
        { color: 0x8b5cf6, label: 'Compose' },
        { color: 0xec4899, label: 'Material 3' },
        { color: 0x3b82f6, label: 'Android' },
        { color: 0x10b981, label: 'GitHub' },
        { color: 0xf59e0b, label: 'Three.js' }
      ];

      const spheres: { mesh: THREE.Mesh; basePos: THREE.Vector3 }[] = [];
      const sphereGeo = new THREE.SphereGeometry(0.55, 32, 32);

      techItems.forEach((item, index) => {
        const mat = new THREE.MeshPhysicalMaterial({
          color: item.color,
          metalness: 0.85,
          roughness: 0.2,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          emissive: item.color,
          emissiveIntensity: 0.25
        });

        const mesh = new THREE.Mesh(sphereGeo, mat);
        const angle = (index / techItems.length) * Math.PI * 2;
        const radius = 2.4;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        mesh.position.set(x, y, 0);

        scene.add(mesh);
        spheres.push({
          mesh,
          basePos: new THREE.Vector3(x, y, 0)
        });
      });

      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      };

      window.addEventListener('mousemove', handleMouseMove);

      let clock = new THREE.Clock();

      const animate = () => {
        const time = clock.getElapsedTime();

        spheres.forEach((s, idx) => {
          const targetX = s.basePos.x + Math.sin(time * 0.8 + idx) * 0.4 + mouseX * 1.5;
          const targetY = s.basePos.y + Math.cos(time * 0.8 + idx) * 0.4 + mouseY * 1.5;

          s.mesh.position.x += (targetX - s.mesh.position.x) * 0.08;
          s.mesh.position.y += (targetY - s.mesh.position.y) * 0.08;

          s.mesh.rotation.x += 0.01;
          s.mesh.rotation.y += 0.015;
        });

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationFrameId);
        renderer.dispose();
      };
    } catch (err) {
      console.warn('About WebGL initialization caught error, using fallback:', err);
      setWebglSupported(false);
    }
  }, []);

  return (
    <section id="about" className={`py-24 relative ${darkMode ? 'bg-[#090a0f]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/35 text-cyan-400 text-xs sm:text-sm font-medium">
              <Code className="w-4 h-4" />
              <span>About JuanMediaHubPH</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Playfair_Display',serif]">
              Crafting Purposeful Android Experiences
            </h2>

            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              Hello! I am JuanMediaHubPH, an independent Android developer dedicated to building useful utilities, engaging educational apps, and delightful mobile games. 
            </p>

            <p className="text-slate-400 text-base font-light leading-relaxed">
              Every project in this portfolio is crafted with modern Android development standards—leveraging Kotlin, Jetpack Compose, and clean architecture principles to ensure smooth performance, responsive layouts, and intuitive user experiences.
            </p>
          </div>

          {/* Right Column: 3D Tech Spheres Canvas with Fallback */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full h-[400px] sm:h-[460px] rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#07080c] border border-cyan-500/20 shadow-2xl overflow-hidden flex items-center justify-center">
              <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />
              
              {!webglSupported && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 p-6 text-center">
                  <Cpu className="w-16 h-16 text-cyan-400 mb-3 animate-pulse" />
                  <h3 className="font-bold text-lg text-white mb-1">Android Tech Stack</h3>
                  <p className="text-xs text-slate-400 font-mono">Kotlin · Jetpack Compose · Material 3 · Android Studio</p>
                </div>
              )}

              <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
                <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase bg-slate-900/80 px-4 py-2 rounded-xl border border-cyan-500/30">
                  Interactive 3D Tech Spheres (Move Mouse to Interact)
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
