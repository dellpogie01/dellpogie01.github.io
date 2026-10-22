import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Pulse {
  distance: number;
  speed: number;
  length: number;
  color: string;
}

class CircuitTrace {
  points: Point[];
  currentDirection: { dx: number; dy: number };
  currentLength: number;
  targetLength: number;
  maxTurns: number;
  turns: number;
  growthSpeed: number;
  state: 'growing' | 'alive' | 'fading' | 'dead';
  color: string;
  pulseColor: string;
  width: number;
  life: number;
  maxLife: number;
  opacity: number;
  vias: Point[];
  pulses: Pulse[];
  pulseCooldown: number;

  constructor(startX: number, startY: number, widthBound: number, heightBound: number, grid: number) {
    this.points = [{ x: startX, y: startY }];
    this.vias = [{ x: startX, y: startY }];

    // Initial orthogonal direction
    const isHorizontal = Math.random() > 0.5;
    const dir = Math.random() > 0.5 ? 1 : -1;
    this.currentDirection = isHorizontal ? { dx: dir, dy: 0 } : { dx: 0, dy: dir };

    this.currentLength = 0;
    this.targetLength = (Math.floor(Math.random() * 4) + 2) * grid;
    this.maxTurns = Math.floor(Math.random() * 4) + 3; // 3 to 6 right angle turns
    this.turns = 0;
    this.growthSpeed = Math.random() * 1.5 + 2.0; // 2.0 to 3.5 px/frame
    this.state = 'growing';
    this.opacity = 0.05;
    this.life = 0;
    this.maxLife = Math.floor(Math.random() * 300) + 350; // 6 to 11 seconds at 60fps

    // Palette: Neon Cyan (dominant), Cyber Violet, Android Emerald
    const colorType = Math.random();
    if (colorType < 0.65) {
      this.color = '#00f0ff';
      this.pulseColor = '#67e8f9';
    } else if (colorType < 0.85) {
      this.color = '#8b5cf6';
      this.pulseColor = '#c084fc';
    } else {
      this.color = '#3ddc84';
      this.pulseColor = '#86efac';
    }

    this.width = Math.random() > 0.7 ? 2 : 1.5;
    this.pulses = [];
    this.pulseCooldown = Math.floor(Math.random() * 40) + 10;
  }

  update(widthBound: number, heightBound: number, grid: number) {
    if (this.state === 'growing') {
      if (this.opacity < 0.85) {
        this.opacity += 0.04;
      }

      this.currentLength += this.growthSpeed;

      // Spawn occasional pulse even during growth
      this.pulseCooldown--;
      if (this.pulseCooldown <= 0) {
        this.pulses.push({
          distance: 0,
          speed: Math.random() * 2.5 + 4.0,
          length: Math.random() * 25 + 35,
          color: this.pulseColor
        });
        this.pulseCooldown = Math.floor(Math.random() * 90) + 60;
      }

      if (this.currentLength >= this.targetLength) {
        const last = this.points[this.points.length - 1];
        const nextX = last.x + this.currentDirection.dx * this.targetLength;
        const nextY = last.y + this.currentDirection.dy * this.targetLength;

        this.points.push({ x: nextX, y: nextY });
        this.turns++;

        // Add solder via pad at corner
        if (Math.random() > 0.4) {
          this.vias.push({ x: nextX, y: nextY });
        }

        // Check if finished or near boundary
        const margin = grid * 2;
        const outOfBounds = nextX < margin || nextX > widthBound - margin || nextY < margin || nextY > heightBound - margin;

        if (this.turns >= this.maxTurns || outOfBounds) {
          this.state = 'alive';
          this.vias.push({ x: nextX, y: nextY });
        } else {
          // 90-degree turn: if horizontal, must turn vertical; if vertical, must turn horizontal
          if (this.currentDirection.dx !== 0) {
            let dy = Math.random() > 0.5 ? 1 : -1;
            if (nextY + dy * grid < margin) dy = 1;
            if (nextY + dy * grid > heightBound - margin) dy = -1;
            this.currentDirection = { dx: 0, dy };
          } else {
            let dx = Math.random() > 0.5 ? 1 : -1;
            if (nextX + dx * grid < margin) dx = 1;
            if (nextX + dx * grid > widthBound - margin) dx = -1;
            this.currentDirection = { dx, dy: 0 };
          }

          this.targetLength = (Math.floor(Math.random() * 4) + 2) * grid;
          this.currentLength = 0;
        }
      }
    } else if (this.state === 'alive') {
      this.life++;

      // Spawn pulses along full completed line
      this.pulseCooldown--;
      if (this.pulseCooldown <= 0) {
        this.pulses.push({
          distance: 0,
          speed: Math.random() * 2.5 + 4.5,
          length: Math.random() * 30 + 40,
          color: this.pulseColor
        });
        this.pulseCooldown = Math.floor(Math.random() * 70) + 40;
      }

      if (this.life >= this.maxLife) {
        this.state = 'fading';
      }
    } else if (this.state === 'fading') {
      this.opacity -= 0.015;
      if (this.opacity <= 0) {
        this.state = 'dead';
      }
    }

    // Update pulses
    const totalDrawnLen = this.getTotalLength();
    for (let i = this.pulses.length - 1; i >= 0; i--) {
      const p = this.pulses[i];
      p.distance += p.speed;
      if (p.distance - p.length > totalDrawnLen) {
        this.pulses.splice(i, 1);
      }
    }
  }

  getCurrentPoints(): Point[] {
    const pts = [...this.points];
    if (this.state === 'growing') {
      const last = pts[pts.length - 1];
      pts.push({
        x: last.x + this.currentDirection.dx * this.currentLength,
        y: last.y + this.currentDirection.dy * this.currentLength
      });
    }
    return pts;
  }

  getTotalLength(): number {
    const pts = this.getCurrentPoints();
    let len = 0;
    for (let i = 0; i < pts.length - 1; i++) {
      len += Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
    }
    return len;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const pts = this.getCurrentPoints();
    if (pts.length < 2) return;

    ctx.save();
    ctx.globalAlpha = this.opacity;

    // 1. Draw Circuit Trace Polyline
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i].x, pts[i].y);
    }
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowBlur = 4;
    ctx.shadowColor = this.color;
    ctx.stroke();

    // 2. Draw Solder Via Pads
    for (const via of this.vias) {
      // Outer rim
      ctx.beginPath();
      ctx.arc(via.x, via.y, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();

      // Inner pad hole
      ctx.beginPath();
      ctx.arc(via.x, via.y, 1.4, 0, Math.PI * 2);
      ctx.fillStyle = '#07080c';
      ctx.fill();
    }

    // 3. Draw Glowing Energy Pulses Travelling Along Trace
    for (const pulse of this.pulses) {
      const dHead = pulse.distance;
      const dTail = Math.max(0, pulse.distance - pulse.length);
      const pulsePoints = this.getPulsePoints(pts, dTail, dHead);

      if (pulsePoints.length >= 2) {
        // Glowing Tail Segment
        ctx.beginPath();
        ctx.moveTo(pulsePoints[0].x, pulsePoints[0].y);
        for (let j = 1; j < pulsePoints.length; j++) {
          ctx.lineTo(pulsePoints[j].x, pulsePoints[j].y);
        }
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = this.width + 1.2;
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 12;
        ctx.stroke();

        // Brilliant Glowing Head Core
        const head = pulsePoints[pulsePoints.length - 1];
        ctx.beginPath();
        ctx.arc(head.x, head.y, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 14;
        ctx.fill();
      }
    }

    ctx.restore();
  }

  private getPulsePoints(pts: Point[], d1: number, d2: number): Point[] {
    let accumulated = 0;
    const pathPoints: Point[] = [];

    for (let i = 0; i < pts.length - 1; i++) {
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const segLen = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      if (segLen === 0) continue;

      const segStart = accumulated;
      const segEnd = accumulated + segLen;

      if (d2 >= segStart && d1 <= segEnd) {
        const t1 = Math.max(0, (d1 - segStart) / segLen);
        const t2 = Math.min(1, (d2 - segStart) / segLen);

        const subP1: Point = {
          x: p1.x + t1 * (p2.x - p1.x),
          y: p1.y + t1 * (p2.y - p1.y)
        };
        const subP2: Point = {
          x: p1.x + t2 * (p2.x - p1.x),
          y: p1.y + t2 * (p2.y - p1.y)
        };

        if (pathPoints.length === 0) {
          pathPoints.push(subP1);
        }
        pathPoints.push(subP2);
      }
      accumulated += segLen;
    }

    return pathPoints;
  }
}

export const CircuitBoardBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const GRID = 38;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const traces: CircuitTrace[] = [];
    const MAX_TRACES = Math.min(42, Math.max(22, Math.floor((width * height) / 45000)));

    const spawnTrace = (atRandomProgress = false) => {
      // Snap to grid
      const cols = Math.floor(width / GRID);
      const rows = Math.floor(height / GRID);
      const startX = (Math.floor(Math.random() * (cols - 4)) + 2) * GRID;
      const startY = (Math.floor(Math.random() * (rows - 4)) + 2) * GRID;

      const trace = new CircuitTrace(startX, startY, width, height, GRID);
      if (atRandomProgress) {
        // Pre-warm trace for instant visually complete lines on page load
        const preSteps = Math.floor(Math.random() * 200) + 50;
        for (let s = 0; s < preSteps; s++) {
          trace.update(width, height, GRID);
        }
      }
      traces.push(trace);
    };

    // Pre-populate with pre-warmed traces
    for (let i = 0; i < MAX_TRACES; i++) {
      spawnTrace(true);
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle Background Grid Points (PCB Vias Grid)
      ctx.save();
      ctx.fillStyle = 'rgba(56, 189, 248, 0.035)';
      const cols = Math.floor(width / GRID);
      const rows = Math.floor(height / GRID);
      for (let c = 1; c < cols; c++) {
        for (let r = 1; r < rows; r++) {
          ctx.beginPath();
          ctx.arc(c * GRID, r * GRID, 1.0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // Update & Draw Traces
      for (let i = traces.length - 1; i >= 0; i--) {
        const trace = traces[i];
        trace.update(width, height, GRID);
        trace.draw(ctx);

        if (trace.state === 'dead') {
          traces.splice(i, 1);
        }
      }

      // Maintain pool
      while (traces.length < MAX_TRACES) {
        spawnTrace(false);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
