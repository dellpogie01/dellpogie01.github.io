import React, { useEffect, useRef } from 'react';

export const MatrixRainBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = [];
    const speeds: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -height);
      speeds[i] = Math.random() * 0.6 + 0.3; // Very slow scroll speed
    }

    const characters = '0101010101010101';
    const neonColors = ['#00f0ff', '#10b981', '#8b5cf6', '#ec4899', '#34d399', '#67e8f9'];

    let colorIndex = 0;

    const draw = () => {
      // Very light fade so the entire background stays fully visible
      ctx.fillStyle = 'rgba(7, 8, 12, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Constantly changing lighter neon colors
        const currentColor = neonColors[(i + Math.floor(Date.now() / 800)) % neonColors.length];
        ctx.fillStyle = currentColor;
        ctx.shadowBlur = 8;
        ctx.shadowColor = currentColor;
        ctx.fillText(text, x, y);
        ctx.shadowBlur = 0;

        if (y > height && Math.random() > 0.98) {
          drops[i] = 0;
          speeds[i] = Math.random() * 0.6 + 0.3;
        }

        drops[i] += speeds[i];
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
};
