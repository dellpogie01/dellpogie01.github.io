import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Smartphone } from 'lucide-react';
import { TechStack3DGrid } from './TechStack3D';

interface HeroProps {
  onExplore?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
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
      camera.position.set(0, 0, 7.8);

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

      const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0x00f0ff, 3.2);
      keyLight.position.set(5, 5, 5);
      keyLight.castShadow = !isSoftwareGl;
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0x8b5cf6, 2.4);
      fillLight.position.set(-5, -3, 3);
      scene.add(fillLight);

      // Dedicated rim back-light to catch glistening reflections on the shiny camera glass & Android logo
      const backLight = new THREE.DirectionalLight(0xffffff, 3.0);
      backLight.position.set(2, 4, -6);
      scene.add(backLight);

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
      ctx2d.font = 'bold 360px Outfit, sans-serif';
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

      // Front Screen Mesh
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

      // Punch-hole Front Camera
      const frontCamMat = new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.1, metalness: 0.9 });
      const frontCamGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16);
      frontCamGeo.rotateX(Math.PI / 2);
      const frontCamMesh = new THREE.Mesh(frontCamGeo, frontCamMat);
      frontCamMesh.position.set(0, 2.48, 0.175);
      phoneGroup.add(frontCamMesh);

      // ==========================================
      // 3D EMBOSSED CAMERA ISLAND
      // ==========================================
      const cameraIslandGroup = new THREE.Group();
      // Back surface of phone is at Z = -0.19
      cameraIslandGroup.position.set(0.65, 2.05, -0.19);
      cameraIslandGroup.rotation.y = Math.PI;

      // 1. Embossed Base Plateau Shape
      const cw = 0.98;
      const ch = 1.08;
      const cr = 0.22;
      const islandShape = new THREE.Shape();
      islandShape.moveTo(-cw / 2 + cr, -ch / 2);
      islandShape.lineTo(cw / 2 - cr, -ch / 2);
      islandShape.absarc(cw / 2 - cr, -ch / 2 + cr, cr, -Math.PI / 2, 0, false);
      islandShape.lineTo(cw / 2, ch / 2 - cr);
      islandShape.absarc(cw / 2 - cr, ch / 2 - cr, cr, 0, Math.PI / 2, false);
      islandShape.lineTo(-cw / 2 + cr, ch / 2);
      islandShape.absarc(-cw / 2 + cr, ch / 2 - cr, cr, Math.PI / 2, Math.PI, false);
      islandShape.lineTo(-cw / 2, -ch / 2 + cr);
      islandShape.absarc(-cw / 2 + cr, -ch / 2 + cr, cr, Math.PI, Math.PI * 1.5, false);

      const islandGeo = new THREE.ExtrudeGeometry(islandShape, {
        depth: 0.04,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.035,
        bevelThickness: 0.035
      });
      islandGeo.center();

      const islandMat = new THREE.MeshPhysicalMaterial({
        color: 0x0f172a,
        metalness: 0.85,
        roughness: 0.2,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1
      });
      const islandMesh = new THREE.Mesh(islandGeo, islandMat);
      islandMesh.position.set(0, 0, 0.02);
      cameraIslandGroup.add(islandMesh);

      // 2. Cyan Metallic Accent Chamfer Rim
      const rimShape = new THREE.Shape();
      const rw = 1.04;
      const rh = 1.14;
      const rr = 0.24;
      rimShape.moveTo(-rw / 2 + rr, -rh / 2);
      rimShape.lineTo(rw / 2 - rr, -rh / 2);
      rimShape.absarc(rw / 2 - rr, -rh / 2 + rr, rr, -Math.PI / 2, 0, false);
      rimShape.lineTo(rw / 2, rh / 2 - rr);
      rimShape.absarc(rw / 2 - rr, rh / 2 - rr, rr, 0, Math.PI / 2, false);
      rimShape.lineTo(-rw / 2 + rr, rh / 2);
      rimShape.absarc(-rw / 2 + rr, rh / 2 - rr, rr, Math.PI / 2, Math.PI, false);
      rimShape.lineTo(-rw / 2, -rh / 2 + rr);
      rimShape.absarc(-rw / 2 + rr, -rh / 2 + rr, rr, Math.PI, Math.PI * 1.5, false);

      const rimGeo = new THREE.ExtrudeGeometry(rimShape, {
        depth: 0.015,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.015,
        bevelThickness: 0.015
      });
      rimGeo.center();

      const rimMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        metalness: 0.95,
        roughness: 0.15,
        emissive: 0x083344,
        emissiveIntensity: 0.4
      });
      const rimMesh = new THREE.Mesh(rimGeo, rimMat);
      rimMesh.position.set(0, 0, 0.005);
      cameraIslandGroup.add(rimMesh);

      // 3. Triple Embossed Lenses with Titanium Bezels & Real Shiny Curved Glass (NO dots)
      const lensPositions = [
        { x: -0.16, y: 0.22 },
        { x: -0.16, y: -0.22 },
        { x: 0.16, y: 0.0 }
      ];

      const lensBezelMat = new THREE.MeshStandardMaterial({
        color: 0x475569,
        metalness: 0.95,
        roughness: 0.15
      });

      // Ultra-shiny, crystal-clear optical glass with specular reflection
      const shinyGlassMat = new THREE.MeshPhysicalMaterial({
        color: 0x070c18,
        metalness: 0.08,
        roughness: 0.015, // Ultra-polished mirror finish
        transmission: 0.65, // Optical glass transmission
        ior: 1.58, // Optical glass index of refraction
        reflectivity: 0.98,
        clearcoat: 1.0, // High-gloss clearcoat
        clearcoatRoughness: 0.02,
        specularIntensity: 1.0,
        specularColor: new THREE.Color(0xffffff)
      });

      // Dark interior camera sensor cavity backing
      const cavityMat = new THREE.MeshStandardMaterial({
        color: 0x010307,
        roughness: 0.9,
        metalness: 0.1
      });

      lensPositions.forEach((pos) => {
        // Metallic Chamfer Ring Bezel
        const bezelGeo = new THREE.CylinderGeometry(0.16, 0.17, 0.04, 32);
        bezelGeo.rotateX(Math.PI / 2);
        const bezel = new THREE.Mesh(bezelGeo, lensBezelMat);
        bezel.position.set(pos.x, pos.y, 0.055);
        cameraIslandGroup.add(bezel);

        // Dark interior camera sensor backing disk
        const cavityGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.02, 32);
        cavityGeo.rotateX(Math.PI / 2);
        const cavity = new THREE.Mesh(cavityGeo, cavityMat);
        cavity.position.set(pos.x, pos.y, 0.04);
        cameraIslandGroup.add(cavity);

        // Curved Convex Shiny Glass Lens (NO dots, pure glistening glass!)
        const glassGeo = new THREE.SphereGeometry(0.24, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.18);
        glassGeo.rotateX(Math.PI / 2);
        glassGeo.translate(0, 0, -0.202);
        const glass = new THREE.Mesh(glassGeo, shinyGlassMat);
        glass.position.set(pos.x, pos.y, 0.045);
        cameraIslandGroup.add(glass);
      });

      // Dual-tone LED Flash
      const flashGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.02, 16);
      flashGeo.rotateX(Math.PI / 2);
      const flashMat = new THREE.MeshStandardMaterial({
        color: 0xfef08a,
        emissive: 0xfef08a,
        emissiveIntensity: 0.6,
        roughness: 0.3
      });
      const flashMesh = new THREE.Mesh(flashGeo, flashMat);
      flashMesh.position.set(0.16, 0.24, 0.045);
      cameraIslandGroup.add(flashMesh);

      // Mic / AF Sensor
      const micGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.02, 16);
      micGeo.rotateX(Math.PI / 2);
      const micMat = new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.9 });
      const micMesh = new THREE.Mesh(micGeo, micMat);
      micMesh.position.set(0.16, -0.24, 0.045);
      cameraIslandGroup.add(micMesh);

      phoneGroup.add(cameraIslandGroup);

      // ==========================================
      // 3D EMBOSSED ANDROID LOGO ON BACK
      // ==========================================
      const androidGroup = new THREE.Group();
      androidGroup.position.set(0, 0.1, -0.19);
      androidGroup.rotation.y = Math.PI;

      // Bright Yellow-Green Glassy Material
      const androidMat = new THREE.MeshPhysicalMaterial({
        color: 0xa8f324, // Bright vibrant yellow-green / chartreuse
        metalness: 0.08,
        roughness: 0.06, // Mirror-smooth glassy finish
        transmission: 0.65, // Glassy translucency
        ior: 1.52, // Optical glass refractive index
        reflectivity: 0.95,
        clearcoat: 1.0, // High-gloss clearcoat
        clearcoatRoughness: 0.04,
        specularIntensity: 1.0,
        specularColor: new THREE.Color(0xffffff),
        emissive: 0x65a30d, // Luminous yellow-green glow
        emissiveIntensity: 0.35,
        thickness: 0.4,
        attenuationColor: new THREE.Color(0xbbf438),
        attenuationDistance: 0.5
      });

      // 1. Android Head (Semicircular Dome)
      const hr = 0.34;
      const headShape = new THREE.Shape();
      headShape.moveTo(-hr, 0);
      headShape.absarc(0, 0, hr, Math.PI, 0, true);
      headShape.lineTo(-hr, 0);

      const headGeo = new THREE.ExtrudeGeometry(headShape, {
        depth: 0.025,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.015,
        bevelThickness: 0.015
      });
      headGeo.center();
      const headMesh = new THREE.Mesh(headGeo, androidMat);
      headMesh.position.set(0, 0.23, 0.015);
      androidGroup.add(headMesh);

      // 2. Android Torso (Rounded Bottom Corners)
      const tw = 0.68;
      const th = 0.50;
      const tr = 0.12;
      const torsoShape = new THREE.Shape();
      torsoShape.moveTo(-tw / 2, 0);
      torsoShape.lineTo(tw / 2, 0);
      torsoShape.lineTo(tw / 2, -th + tr);
      torsoShape.absarc(tw / 2 - tr, -th + tr, tr, 0, -Math.PI / 2, true);
      torsoShape.lineTo(-tw / 2 + tr, -th);
      torsoShape.absarc(-tw / 2 + tr, -th + tr, tr, -Math.PI / 2, -Math.PI, true);
      torsoShape.lineTo(-tw / 2, 0);

      const torsoGeo = new THREE.ExtrudeGeometry(torsoShape, {
        depth: 0.025,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.015,
        bevelThickness: 0.015
      });
      torsoGeo.center();
      const torsoMesh = new THREE.Mesh(torsoGeo, androidMat);
      torsoMesh.position.set(0, -0.25, 0.015);
      androidGroup.add(torsoMesh);

      // 3. Android Arms (Capsules)
      const armGeo = new THREE.CapsuleGeometry(0.055, 0.26, 4, 16);
      armGeo.scale(1, 1, 0.45);
      const leftArm = new THREE.Mesh(armGeo, androidMat);
      leftArm.position.set(-0.46, -0.22, 0.015);
      androidGroup.add(leftArm);

      const rightArm = new THREE.Mesh(armGeo, androidMat);
      rightArm.position.set(0.46, -0.22, 0.015);
      androidGroup.add(rightArm);

      // 4. Android Legs (Capsules)
      const legGeo = new THREE.CapsuleGeometry(0.055, 0.18, 4, 16);
      legGeo.scale(1, 1, 0.45);
      const leftLeg = new THREE.Mesh(legGeo, androidMat);
      leftLeg.position.set(-0.16, -0.62, 0.015);
      androidGroup.add(leftLeg);

      const rightLeg = new THREE.Mesh(legGeo, androidMat);
      rightLeg.position.set(0.16, -0.62, 0.015);
      androidGroup.add(rightLeg);

      // 5. Android Antennae (Tilted ±30°)
      const antGeo = new THREE.CapsuleGeometry(0.016, 0.11, 3, 12);
      antGeo.scale(1, 1, 0.45);
      const leftAnt = new THREE.Mesh(antGeo, androidMat);
      leftAnt.position.set(-0.16, 0.45, 0.015);
      leftAnt.rotation.z = Math.PI / 6;
      androidGroup.add(leftAnt);

      const rightAnt = new THREE.Mesh(antGeo, androidMat);
      rightAnt.position.set(0.16, 0.45, 0.015);
      rightAnt.rotation.z = -Math.PI / 6;
      androidGroup.add(rightAnt);

      // 6. Android Eyes (Contrasting Dark Badges)
      const eyeGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.02, 16);
      eyeGeo.rotateX(Math.PI / 2);
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0x090a0f });
      const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
      leftEye.position.set(-0.13, 0.23, 0.035);
      androidGroup.add(leftEye);

      const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
      rightEye.position.set(0.13, 0.23, 0.035);
      androidGroup.add(rightEye);

      phoneGroup.add(androidGroup);

      // ==========================================
      // PHONE HARDWARE DETAILS (Buttons & Ports)
      // ==========================================
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

      // ==========================================
      // INTERACTIVE ROTATION & ANIMATION
      // ==========================================
      let mouseX = 0;
      let mouseY = 0;
      let targetRotationX = 0;
      let targetRotationY = 0;
      let isDragging = false;
      let previousPointerX = 0;
      let previousPointerY = 0;
      let dragRotationOffset = 0;
      let dragTiltOffset = 0;

      const handlePointerDown = (e: PointerEvent) => {
        isDragging = true;
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
      };

      const handlePointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX = x / (rect.width / 2);
        mouseY = y / (rect.height / 2);

        if (isDragging) {
          const deltaX = e.clientX - previousPointerX;
          const deltaY = e.clientY - previousPointerY;
          dragRotationOffset += deltaX * 0.01;
          dragTiltOffset += deltaY * 0.005;
          dragTiltOffset = Math.max(-0.6, Math.min(0.6, dragTiltOffset));
          previousPointerX = e.clientX;
          previousPointerY = e.clientY;
        }
      };

      const handlePointerUp = () => {
        isDragging = false;
      };

      container.addEventListener('pointerdown', handlePointerDown);
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);

      let clock = new THREE.Clock();

      const animate = () => {
        const time = clock.getElapsedTime();

        // Continuous smooth rotation and dynamic floating tilt even when mouse is not moving
        targetRotationY = dragRotationOffset + time * 0.75 + mouseX * 0.45;
        targetRotationX = dragTiltOffset - mouseY * 0.35 + Math.sin(time * 1.5) * 0.22;

        phoneGroup.rotation.y += (targetRotationY - phoneGroup.rotation.y) * 0.08;
        phoneGroup.rotation.x += (targetRotationX - phoneGroup.rotation.x) * 0.08;
        phoneGroup.rotation.z = Math.cos(time * 1.2) * 0.08;
        phoneGroup.position.y = Math.sin(time * 1.8) * 0.22;

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        if (!container) return;
        const aspect = container.clientWidth / container.clientHeight;
        camera.aspect = aspect;
        if (aspect < 0.85) {
          camera.position.z = 8.8;
        } else if (aspect < 1.25) {
          camera.position.z = 8.2;
        } else {
          camera.position.z = 7.8;
        }
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };

      // Call initial resize to align with container dimensions
      handleResize();

      window.addEventListener('resize', handleResize);

      return () => {
        container.removeEventListener('pointerdown', handlePointerDown);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        renderer.dispose();
      };
    } catch (err) {
      console.warn('OverviewTab WebGL error:', err);
      setWebglSupported(false);
    }
  }, []);

  return (
    <section id="hero" className="relative w-full min-h-screen pt-24 sm:pt-28 lg:pt-20 pb-8 sm:pb-12 lg:pb-4 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col justify-center">
        
        {/* Responsive Grid: 
            On Mobile: Title -> 3D Hero Phone -> Showcase & Tech Stack -> Coffee & Connect
            On Tablet & Desktop: 2 Columns side-by-side (Left: Text & Tech Stack, Right: Full Height 3D Phone)
        */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 lg:gap-8 items-start">
          
          {/* Section 1: Title & Subtitle (Row 1 Left on tablet/desktop, Top on mobile) */}
          <div className="md:col-span-7 w-full text-left pt-6 sm:pt-10 lg:pt-16">
            {/* "Small Ideas. Meaningful Apps." with plenty of space below so 'g' and 'pp' are never cut */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-[1.25] sm:leading-[1.2] pb-1.5 sm:pb-2 flex flex-wrap items-baseline gap-x-2.5 sm:gap-x-3 text-left">
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent animate-gradient-text whitespace-nowrap pb-1 inline-block">
                Small Ideas.
              </span>
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent animate-gradient-text whitespace-nowrap pb-1 inline-block">
                Meaningful Apps.
              </span>
            </h1>

            {/* Subtitle placed immediately near title */}
            <p className="mt-0.5 text-xs sm:text-sm lg:text-base text-slate-300 max-w-2xl mx-0 text-left font-light leading-snug bg-gradient-to-r from-cyan-300 via-pink-300 to-violet-300 bg-clip-text text-transparent animate-rainbow-text">
              Discover my collection of Android apps, games, and everyday tools.
              <span className="text-[11px] font-mono text-cyan-400/80 sm:hidden ml-1">• Swipe apps below ➔</span>
            </p>
          </div>

          {/* Section 2: 3D Hero Phone Canvas
              On Mobile: Sits right below Title & Subtitle for instant interactive 3D gratification
              On Tablet & Desktop: Occupies the right column (col-span-5) spanning both rows to the top of screen
          */}
          <div className="md:col-span-5 md:row-span-2 w-full flex flex-col items-center justify-center lg:-mt-20 md:-mt-8 my-2 md:my-0 relative pointer-events-auto">
            <div className="relative w-full h-[280px] sm:h-[340px] md:h-[500px] lg:h-[calc(100vh-1rem)] min-h-[260px] md:min-h-[460px] max-h-[880px] flex items-center justify-center">
              <div 
                ref={mountRef} 
                className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none select-none" 
                title="Drag to rotate phone in 3D"
              />
              {!webglSupported && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 rounded-3xl border border-cyan-500/30 p-6 text-center">
                  <Smartphone className="w-12 h-12 text-cyan-400 mb-2 animate-pulse" />
                  <h3 className="font-bold text-base text-white mb-1">JuanMediaHubPH Phone</h3>
                  <p className="text-xs text-slate-400 font-mono">Android Device Preview</p>
                </div>
              )}
            </div>
            {/* Mobile & Tablet Interactive Rotation Hint */}
            <div className="flex md:hidden items-center gap-1.5 text-[11px] font-mono text-cyan-400/70 mt-1 pointer-events-none">
              <span>👆</span>
              <span>Drag to rotate 3D phone</span>
            </div>
          </div>

          {/* Section 3: App Showcase, Tech Stack, Coffee & Connect (Row 2 Left on tablet/desktop, Below 3D phone on mobile) */}
          <div className="md:col-span-7 space-y-3.5 sm:space-y-4 text-left flex flex-col items-start w-full">
            
            {/* App Showcase Icons below "Discover..." (All 10 icons in 1 horizontal line at 3/4 size, touch-scrollable) */}
            <div className="w-full pt-0.5">
              <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-1 px-0.5 touch-pan-x">
                {[
                  { src: `${import.meta.env.BASE_URL}apps/ph-map.png`, alt: 'Philippine 3D Location Map' },
                  { src: `${import.meta.env.BASE_URL}apps/bible-kjv.jpg`, alt: 'Holy Bible KJV 1611 3D' },
                  { src: `${import.meta.env.BASE_URL}apps/praying-kids.jpg`, alt: 'Praying Kids Golden Cross' },
                  { src: `${import.meta.env.BASE_URL}apps/house-3d.jpg`, alt: 'Modern 3D Architecture House' },
                  { src: `${import.meta.env.BASE_URL}apps/business-growth.png`, alt: 'Business Growth Trend Charts' },
                  { src: `${import.meta.env.BASE_URL}apps/ai-brain.png`, alt: 'AI Brain Assistant' },
                  { src: `${import.meta.env.BASE_URL}apps/business-life.png`, alt: 'Business Tycoon Life' },
                  { src: `${import.meta.env.BASE_URL}apps/capybara-game.png`, alt: 'Capybara Forest Adventure' },
                  { src: `${import.meta.env.BASE_URL}apps/pill-reminder.png`, alt: 'Rx Pill & Medicine Reminder' },
                  { src: `${import.meta.env.BASE_URL}apps/pdf-scanner.png`, alt: 'Smart Camera PDF Scanner' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    title={item.alt}
                    className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl overflow-hidden border border-cyan-400/40 bg-slate-900/90 shadow-[0_3px_8px_rgba(0,0,0,0.5),0_1px_2px_rgba(6,182,212,0.3)] hover:border-cyan-300 hover:shadow-cyan-400/50 transition-colors duration-200 cursor-pointer flex-shrink-0 active:scale-95"
                  >
                    <img 
                      src={item.src} 
                      alt={item.alt} 
                      className="w-full h-full object-cover" 
                    />
                    {/* 3D Top Specular Gloss Highlight */}
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>

            {/* MY TECH STACK Section: Clear space above heading, exact same font and font size with DELIO LABADDAN */}
            <div className="w-full pt-2 sm:pt-3 lg:pt-3.5 space-y-1.5">
              <h2 className="font-extrabold text-base sm:text-xl lg:text-2xl tracking-tight bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent animate-gradient-text leading-tight">
                MY TECH STACK
              </h2>
              <TechStack3DGrid />
            </div>

            {/* Coffee & Code and Let's Connect: Responsive lines that wrap cleanly on mobile */}
            <div className="w-full pt-2 sm:pt-3 lg:pt-3.5 flex flex-col gap-2 text-left">
              {/* Coffee & Code */}
              <div className="flex flex-wrap lg:flex-nowrap items-baseline gap-1.5 text-xs sm:text-[13px] text-slate-300 font-light leading-relaxed">
                <span className="font-bold text-amber-400 whitespace-nowrap flex items-center gap-1.5 flex-shrink-0">
                  <span>☕</span>
                  <span>Coffee & Code:</span>
                </span>
                <span className="text-slate-300 lg:whitespace-nowrap lg:overflow-hidden lg:text-ellipsis">
                  If you enjoy my apps and want to support what I build, a coffee is always appreciated.
                </span>
              </div>

              {/* Let's Connect */}
              <div className="flex flex-wrap lg:flex-nowrap items-baseline gap-1.5 text-xs sm:text-[13px] text-slate-300 font-light leading-relaxed">
                <span className="font-bold text-cyan-400 whitespace-nowrap flex items-center gap-1.5 flex-shrink-0">
                  <span>⚡</span>
                  <span>Let’s Connect:</span>
                </span>
                <span className="text-slate-300 lg:whitespace-nowrap lg:overflow-hidden lg:text-ellipsis">
                  Have an idea, found a bug, or tried one of my apps? I’d love to hear from you.
                </span>
                <a 
                  href="mailto:juanmediahubph@gmail.com" 
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-mono text-[11px] hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  <span>Send Message</span>
                  <span>→</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
