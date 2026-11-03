import React, { useEffect, useRef } from 'react';
import { MAJOR_LANES } from '../../services/mockApi';

interface LowPowerViewProps {
  activeSection?: number;
}

export const LowPowerView: React.FC<LowPowerViewProps> = ({ activeSection = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dark gradient background
      const grad = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        50,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      grad.addColorStop(0, '#15151c');
      grad.addColorStop(1, '#0b0b0d');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render stylized 2D Earth circles and latitude arcs
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const R = Math.min(canvas.width, canvas.height) * 0.32;

      // Base globe circle
      ctx.strokeStyle = 'rgba(232, 128, 90, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      // Atmospheric ring
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(cx, cy, R + 8, 0, Math.PI * 2);
      ctx.stroke();

      // Latitude lines
      for (let lat = -50; lat <= 50; lat += 25) {
        const yOffset = (lat / 90) * R;
        const rLat = Math.sqrt(Math.max(0, R * R - yOffset * yOffset));
        ctx.strokeStyle = 'rgba(232, 128, 90, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(cx, cy + yOffset, rLat, rLat * 0.25, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw projected 2D trade lane curves
      MAJOR_LANES.forEach((lane, i) => {
        const angle1 = (lane.origin.lng * Math.PI) / 180 + t * 0.1;
        const x1 = cx + Math.cos(angle1) * (R * 0.85);
        const y1 = cy - (lane.origin.lat / 90) * (R * 0.7);

        const angle2 = (lane.destination.lng * Math.PI) / 180 + t * 0.1;
        const x2 = cx + Math.cos(angle2) * (R * 0.85);
        const y2 = cy - (lane.destination.lat / 90) * (R * 0.7);

        // Control point curved upward
        const mx = (x1 + x2) / 2;
        const my = Math.min(y1, y2) - 30;

        ctx.strokeStyle = lane.mode === 'AIR' ? '#60a5fa' : '#e8805a';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.lineDashOffset = -t * 20;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(mx, my, x2, y2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Port dot
        ctx.fillStyle = '#e8805a';
        ctx.beginPath();
        ctx.arc(x1, y1, 3, 0, Math.PI * 2);
        ctx.arc(x2, y2, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeSection]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* 2D Starry noise backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#e8805a_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
    </div>
  );
};
