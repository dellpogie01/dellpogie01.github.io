import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Smartphone, Github, Sparkles, ChevronRight } from 'lucide-react';

interface OverviewTabProps {
  onExplore: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onExplore }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    let animationFrameId: number;

    try {
      const isSoftwareGl = (() => {
        try {
          const gl = document.createElement('canvas').getContext('webgl2');
          if (!gl) return true;
          const ext = gl.getExtension('WEBGL_debug_renderer_info');
          const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
          const gpu = String(gl.getParameter(param));
          gl.getExtension('WEBGL_lose_context')?.loseContext();
          return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
        } catch {
          return true;
        }
      })();

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 8);

      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false
      });

      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = !isSoftwareGl;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);

      renderer.domElement.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
        cancelAnimationFrame(animationFrameId);
        setWebglSupported(false);
      }, false);

      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();

      const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0x00f0ff, 3.0);
      keyLight.position.set(5, 5, 5);
      keyLight.castShadow = !isSoftwareGl;
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0x8b5cf6, 2.2);
      fillLight.position.set(-5, -3, 3);
      scene.add(fillLight);

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x07080c, 1.2);
      scene.add(hemiLight);

      // Procedural Screen Texture
      const canvas2d = document.createElement('canvas');
      canvas2d.width = 512;
      canvas2d.height = 1024;
      const ctx2d = canvas2d.getContext('2d')!;

      const grad = ctx2d.createLinearGradient(0, 0, 512, 1024);
      grad.addColorStop(0, '#090a0f');
      grad.addColorStop(0.5, '#1e1b4b');
      grad.addColorStop(1, '#0f172a');
      ctx2d.fillStyle = grad;
      ctx2d.fillRect(0, 0, 512, 1024);

      ctx2d.save();
      ctx2d.font = 'bold 380px Outfit, sans-serif';
      ctx2d.textAlign = 'center';
      ctx2d.textBaseline = 'middle';
      ctx2d.fillStyle = 'rgba(0, 240, 255, 0.12)';
      ctx2d.fillText('G', 256, 512);
      ctx2d.restore();

      const iconColors = ['#00f0ff', '#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#14b8a6'];
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 3; c++) {
          const x = 90 + c * 115;
          const y = 220 + r * 130;
          ctx2d.fillStyle = iconColors[(r * 3 + c) % iconColors.length];
          ctx2d.beginPath();
          ctx2d.roundRect(x, y, 75, 75, 20);
          ctx2d.fill();

          ctx2d.fillStyle = '#ffffff';
          ctx2d.font = 'bold 24px Outfit, sans-serif';
          ctx2d.textAlign = 'center';
          ctx2d.textBaseline = 'middle';
          ctx2d.fillText(`A${r * 3 + c + 1}`, x + 37.5, y + 37.5);
        }
      }

      const screenTexture = new THREE.CanvasTexture(canvas2d);
      screenTexture.colorSpace = THREE.SRGBColorSpace;

      const phoneGroup = new THREE.Group();

      const shape = new THREE.Shape();
      const width = 2.8;
      const height = 5.6;
      const radius = 0.35;

      shape.absarc(-width / 2 + radius, height / 2 - radius, radius, Math.PI, Math.PI / 2, true);
      shape.absarc(width / 2 - radius, height / 2 - radius, radius, Math.PI / 2, 0, true);
      shape.absarc(width / 2 - radius, -height / 2 + radius, radius, 0, -Math.PI / 2, true);
      shape.absarc(-width / 2 + radius, -height / 2 + radius, radius, -Math.PI / 2, -Math.PI, true);

      const extrudeSettings = {
        depth: 0.28,
        bevelEnabled: true,
        bevelSegments: 5,
        steps: 1,
        bevelSize: 0.05,
        bevelThickness: 0.05
      };

      const bodyGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      bodyGeo.center();

      const bodyMat = new THREE.MeshPhysicalMaterial({
        color: 0x0f172a,
        metalness: 0.9,
        roughness: 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
      });
      const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      phoneGroup.add(bodyMesh);

      const screenMat = new THREE.MeshStandardMaterial({
        map: screenTexture,
        roughness: 0.1,
        metalness: 0.1,
        emissive: 0x002040,
        emissiveIntensity: 0.2
      });
      const screenGeo = new THREE.BoxGeometry(2.52, 5.32, 0.02);
      const screenMesh = new THREE.Mesh(screenGeo, screenMat);
      screenMesh.position.set(0, 0, 0.16);
      phoneGroup.add(screenMesh);

      const frontCamMat = new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.1, metalness: 0.9 });
      const frontCamGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16);
      frontCamGeo.rotateX(Math.PI / 2);
      const frontCamMesh = new THREE.Mesh(frontCamGeo, frontCamMat);
      frontCamMesh.position.set(0, 2.48, 0.175);
      phoneGroup.add(frontCamMesh);

      const cameraIslandMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.8,
        roughness: 0.3
      });
      const islandGeo = new THREE.BoxGeometry(0.9, 1.0, 0.04);
      const islandMesh = new THREE.Mesh(islandGeo, cameraIslandMat);
      islandMesh.position.set(0.65, 2.05, -0.17);
      phoneGroup.add(islandMesh);

      const lensMat = new THREE.MeshStandardMaterial({ color: 0x020617, metalness: 0.95, roughness: 0.1 });
      const lensGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.06, 16);
      lensGeo.rotateX(Math.PI / 2);

      const lens1 = new THREE.Mesh(lensGeo, lensMat);
      lens1.position.set(0.5, 2.25, -0.20);
      phoneGroup.add(lens1);

      const lens2 = new THREE.Mesh(lensGeo, lensMat);
      lens2.position.set(0.5, 1.85, -0.20);
      phoneGroup.add(lens2);

      const lens3 = new THREE.Mesh(lensGeo, lensMat);
      lens3.position.set(0.8, 2.05, -0.20);
      phoneGroup.add(lens3);

      const buttonMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.2 });
      
      const powerGeo = new THREE.BoxGeometry(0.06, 0.6, 0.08);
      const powerMesh = new THREE.Mesh(powerGeo, buttonMat);
      powerMesh.position.set(1.44, 0.6, 0);
      phoneGroup.add(powerMesh);

      const volUpGeo = new THREE.BoxGeometry(0.06, 0.4, 0.08);
      const volUpMesh = new THREE.Mesh(volUpGeo, buttonMat);
      volUpMesh.position.set(-1.44, 1.1, 0);
      phoneGroup.add(volUpMesh);

      const volDownGeo = new THREE.BoxGeometry(0.06, 0.4, 0.08);
      const volDownMesh = new THREE.Mesh(volDownGeo, buttonMat);
      volDownMesh.position.set(-1.44, 0.5, 0);
      phoneGroup.add(volDownMesh);

      const portMat = new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.9 });
      const portGeo = new THREE.BoxGeometry(0.4, 0.05, 0.08);
      const portMesh = new THREE.Mesh(portGeo, portMat);
      portMesh.position.set(0, -2.85, 0);
      phoneGroup.add(portMesh);

      scene.add(phoneGroup);

      let mouseX = 0;
      let mouseY = 0;
      let targetRotationX = 0;
      let targetRotationY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX = x / (rect.width / 2);
        mouseY = y / (rect.height / 2);
      };

      window.addEventListener('mousemove', handleMouseMove);

      let clock = new THREE.Clock();

      const animate = () => {
        const time = clock.getElapsedTime();

        targetRotationY = mouseX * 0.7 + time * 0.25;
        targetRotationX = -mouseY * 0.7 + Math.sin(time * 0.6) * 0.15;

        phoneGroup.rotation.y += (targetRotationY - phoneGroup.rotation.y) * 0.08;
        phoneGroup.rotation.x += (targetRotationX - phoneGroup.rotation.x) * 0.08;
        phoneGroup.position.y = Math.sin(time * 1.5) * 0.2;

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
      console.warn('OverviewTab WebGL error:', err);
      setWebglSupported(false);
    }
  }, []);

  return (
    <div className="min-h-[85vh] flex items-center py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/35 text-cyan-400 text-xs sm:text-sm font-medium tracking-wide">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Independent Android Developer</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent animate-gradient-text">
                Small Ideas.{' '}
              </span>
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent animate-gradient-text">
                Meaningful Apps.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed bg-gradient-to-r from-cyan-300 via-pink-300 to-violet-300 bg-clip-text text-transparent animate-rainbow-text">
              Discover my collection of Android apps, games, and everyday tools—built with creativity, purpose, and attention to detail.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onExplore}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-black font-bold text-base shadow-xl shadow-cyan-500/25 hover:opacity-95 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
              >
                <span>Explore My Apps</span>
                <ChevronRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://github.com/dellpogie01"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 font-semibold text-base hover:bg-slate-700 hover:text-white transition-all flex items-center justify-center gap-3"
              >
                <Github className="w-5 h-5" />
                <span>View GitHub</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">7+</div>
                <div className="text-xs text-slate-400 mt-1">Android Projects</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-violet-400 font-mono">100%</div>
                <div className="text-xs text-slate-400 mt-1">Open & Purposeful</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-pink-400 font-mono">Kotlin</div>
                <div className="text-xs text-slate-400 mt-1">& Jetpack Compose</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full h-[420px] sm:h-[500px] flex items-center justify-center pointer-events-auto">
              <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />
              {!webglSupported && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 rounded-3xl border border-cyan-500/30 p-6 text-center">
                  <Smartphone className="w-16 h-16 text-cyan-400 mb-3 animate-pulse" />
                  <h3 className="font-bold text-lg text-white mb-1">JuanMediaHubPH Phone</h3>
                  <p className="text-xs text-slate-400 font-mono">Android Device Preview</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
