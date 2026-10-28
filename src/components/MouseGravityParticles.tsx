import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  color: string;
  glowColor: string;
  orbitDir: number;
  trail: { x: number; y: number }[];
  maxTrail: number;
  pulsePhase: number;
}

export const MouseGravityParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Gravity attractor center (tracks mouse or gently wanders if idle)
    const attractor = {
      x: width * 0.5,
      y: height * 0.45,
      targetX: width * 0.5,
      targetY: height * 0.45,
      isMouseActive: false,
      lastInteractionTime: Date.now()
    };

    // Neon green color variations
    const neonColors = [
      { core: '#ffffff', dot: '#39ff14', glow: '#39ff14' }, // Pure Neon Lime
      { core: '#f0fdf4', dot: '#22c55e', glow: '#4ade80' }, // Vivid Emerald
      { core: '#ffffff', dot: '#00ff88', glow: '#00ff88' }, // Electric Spring Green
      { core: '#ecfccb', dot: '#a3e635', glow: '#bef264' }, // Neon Chartreuse
      { core: '#ffffff', dot: '#10b981', glow: '#34d399' }  // Bright Mint Neon
    ];

    // Spawn responsive physics particles (85 on mobile, 160 on desktop for rich particle density)
    const isMobile = width < 768;
    const particleCount = isMobile ? 85 : 160;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 250 + 60;
      const palette = neonColors[Math.floor(Math.random() * neonColors.length)];

      particles.push({
        x: attractor.x + Math.cos(angle) * dist,
        y: attractor.y + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        radius: Math.random() * 2.2 + 1.6, // 1.6px to 3.8px
        mass: Math.random() * 1.5 + 0.8,
        color: palette.dot,
        glowColor: palette.glow,
        orbitDir: Math.random() > 0.45 ? 1 : -1,
        trail: [],
        maxTrail: Math.floor(Math.random() * 5) + 4,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Pointer event listeners (tracks mouse and touch)
    const handlePointerMove = (e: PointerEvent) => {
      attractor.targetX = e.clientX;
      attractor.targetY = e.clientY;
      attractor.isMouseActive = true;
      attractor.lastInteractionTime = Date.now();
    };

    const handlePointerDown = (e: PointerEvent) => {
      attractor.targetX = e.clientX;
      attractor.targetY = e.clientY;
      attractor.isMouseActive = true;
      attractor.lastInteractionTime = Date.now();

      // Gravitational shockwave pulse on click: disperse particles outward
      for (const p of particles) {
        const dx = p.x - e.clientX;
        const dy = p.y - e.clientY;
        const d = Math.hypot(dx, dy) || 1;
        const force = 18 / (d * 0.04 + 1);
        p.vx += (dx / d) * force;
        p.vy += (dy / d) * force;
      }
    };

    const handlePointerLeave = () => {
      attractor.isMouseActive = false;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('resize', handleResize);

    let startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) * 0.001;

      // If mouse is idle for > 2.5 seconds or not moved yet, gently float attractor in a graceful figure-eight
      if (!attractor.isMouseActive || Date.now() - attractor.lastInteractionTime > 2500) {
        const cx = width < 768 ? width * 0.5 : width * 0.62;
        const cy = width < 768 ? height * 0.38 : height * 0.45;
        attractor.targetX = cx + Math.sin(elapsed * 0.8) * (width * (width < 768 ? 0.28 : 0.22));
        attractor.targetY = cy + Math.sin(elapsed * 1.6) * (width < 768 ? 70 : 110);
      }

      // Smooth lag towards target attractor (feels like a heavy gravity well)
      attractor.x += (attractor.targetX - attractor.x) * 0.12;
      attractor.y += (attractor.targetY - attractor.y) * 0.12;

      ctx.clearRect(0, 0, width, height);

      // Render & update each neon green particle
      const G = 1750; // Gravitational constant
      const softening = 850; // Softening parameter to prevent division by zero / singularity
      const maxSpeed = 16;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Calculate gravity vector toward mouse attractor
        const dx = attractor.x - p.x;
        const dy = attractor.y - p.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        // Gravitational force: F = G / (dist^2 + softening)
        const force = (G * p.mass) / (distSq + softening);

        // Unit direction vectors
        const nx = dx / (dist + 0.1);
        const ny = dy / (dist + 0.1);

        // Radial inward acceleration
        p.vx += nx * force;
        p.vy += ny * force;

        // Tangential orbital swirl force (creates mesmerizing orbital rotation around mouse)
        const tangentialForce = force * 0.48 * p.orbitDir;
        p.vx += -ny * tangentialForce;
        p.vy += nx * tangentialForce;

        // Fluid friction damping
        p.vx *= 0.962;
        p.vy *= 0.962;

        // Velocity clamp
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        // Save position to trail
        p.trail.unshift({ x: p.x, y: p.y });
        if (p.trail.length > p.maxTrail) {
          p.trail.pop();
        }

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // 2. Draw trailing neon cometary tail
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let t = 1; t < p.trail.length; t++) {
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
          }
          ctx.strokeStyle = p.glowColor;
          ctx.lineWidth = p.radius * 0.7;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.globalAlpha = 0.28;
          ctx.stroke();
        }

        // 3. Draw Neon Green Dot with Glowing Aura
        const pulse = Math.sin(elapsed * 4 + p.pulsePhase) * 0.2 + 0.9;
        const currentRadius = p.radius * pulse;

        // Outer Neon Glow
        ctx.save();
        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = 12;
        ctx.globalAlpha = 0.88;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // White-hot energetic center core
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#ffffff';
        ctx.globalAlpha = 0.95;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius * 0.42, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="pointer-events-none fixed inset-0 z-20 w-full h-full select-none"
      aria-hidden="true"
    />
  );
};
