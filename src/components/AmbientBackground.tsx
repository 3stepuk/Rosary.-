import React, { useEffect, useRef, useMemo } from 'react';
import { MysterySetKey, AmbientVisualOption } from '../types';

interface AmbientBackgroundProps {
  mysterySet: MysterySetKey;
  visualMode?: AmbientVisualOption; // 'particles' | 'aura' | 'minimal'
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
  baseAlpha: number;
  speedY: number;
  speedX: number;
  swaySpeed: number;
  swayAmp: number;
  swayOffset: number;
  pulseSpeed: number;
  pulseOffset: number;
  colorType: 'gold' | 'amber' | 'warmWhite' | 'mysteryAccent';
}

const MYSTERY_PALETTES: Record<MysterySetKey, {
  aura1: string;
  aura2: string;
  aura3: string;
  accentParticleRgb: string; // r, g, b
}> = {
  joyful: {
    // Warm dawn & golden joyful morning
    aura1: 'rgba(212, 163, 89, 0.14)',
    aura2: 'rgba(231, 192, 127, 0.08)',
    aura3: 'rgba(180, 100, 60, 0.06)',
    accentParticleRgb: '243, 203, 120'
  },
  sorrowful: {
    // Contemplative Gethsemane & deep candlelit sanctuary
    aura1: 'rgba(122, 48, 64, 0.15)',
    aura2: 'rgba(180, 105, 59, 0.09)',
    aura3: 'rgba(60, 40, 80, 0.08)',
    accentParticleRgb: '220, 140, 110'
  },
  glorious: {
    // Radiant celestial gold & resurrection light
    aura1: 'rgba(235, 185, 75, 0.18)',
    aura2: 'rgba(244, 222, 175, 0.10)',
    aura3: 'rgba(198, 153, 79, 0.08)',
    accentParticleRgb: '255, 225, 150'
  },
  luminous: {
    // Baptismal Jordan azure & divine transfiguration light
    aura1: 'rgba(61, 90, 128, 0.16)',
    aura2: 'rgba(224, 177, 87, 0.11)',
    aura3: 'rgba(90, 130, 180, 0.07)',
    accentParticleRgb: '180, 215, 255'
  }
};

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({
  mysterySet,
  visualMode = 'particles'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const palette = useMemo(() => MYSTERY_PALETTES[mysterySet] || MYSTERY_PALETTES.joyful, [mysterySet]);

  useEffect(() => {
    if (visualMode !== 'particles') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle count adapted to screen resolution (approx 45 on mobile, 70 on desktop)
    const particleCount = Math.min(80, Math.max(35, Math.floor((width * height) / 22000)));
    const particles: Particle[] = [];

    const colorTypes: Array<'gold' | 'amber' | 'warmWhite' | 'mysteryAccent'> = [
      'gold',
      'gold',
      'amber',
      'warmWhite',
      'mysteryAccent'
    ];

    // Initialize particles with randomized positions and organic drift speeds
    for (let i = 0; i < particleCount; i++) {
      const radius = 0.8 + Math.random() * 2.2; // 0.8px to 3.0px
      const baseAlpha = 0.15 + Math.random() * 0.65;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        alpha: baseAlpha,
        targetAlpha: baseAlpha,
        baseAlpha,
        speedY: 0.15 + Math.random() * 0.45, // Gentle upward rise
        speedX: (Math.random() - 0.5) * 0.1,
        swaySpeed: 0.0008 + Math.random() * 0.0018,
        swayAmp: 15 + Math.random() * 30,
        swayOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.0015 + Math.random() * 0.003,
        pulseOffset: Math.random() * Math.PI * 2,
        colorType: colorTypes[Math.floor(Math.random() * colorTypes.length)]
      });
    }

    // Resize handler with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 150);
    };
    window.addEventListener('resize', handleResize);

    // Optional subtle interactive parallax
    let mouseX = width / 2;
    let mouseY = height / 2;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let isVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && !animationFrameId) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let lastTime = performance.now();

    const getRgbForType = (type: Particle['colorType']): string => {
      switch (type) {
        case 'gold':
          return '231, 192, 127'; // #e7c07f
        case 'amber':
          return '198, 153, 79';  // #c6994f
        case 'warmWhite':
          return '245, 235, 220'; // candlelight highlight
        case 'mysteryAccent':
          return palette.accentParticleRgb;
      }
    };

    const render = (now: number) => {
      if (!isVisible) return;

      const dt = Math.min(now - lastTime, 64); // Cap delta time in case of tab lag
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move upward gently
        p.y -= p.speedY * (dt / 16.6);

        // Sinusoidal sway horizontally
        const sway = Math.sin(now * p.swaySpeed + p.swayOffset) * p.swayAmp;
        const currentX = p.x + sway + (mouseX - width / 2) * 0.012;

        // Alpha twinkle / breathing cycle
        const pulse = Math.sin(now * p.pulseSpeed + p.pulseOffset);
        p.alpha = Math.max(0.05, Math.min(0.9, p.baseAlpha + pulse * 0.25));

        // Recycle particle when it floats off the top
        if (p.y + p.radius * 2 < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
          p.baseAlpha = 0.15 + Math.random() * 0.65;
        }

        // Wrap around horizontally if pushed out
        if (currentX < -20) p.x += width + 20;
        if (currentX > width + 20) p.x -= width + 20;

        const rgb = getRgbForType(p.colorType);

        // Draw glowing halo around speck
        if (p.radius > 1.4) {
          const haloGrad = ctx.createRadialGradient(
            currentX,
            p.y,
            0,
            currentX,
            p.y,
            p.radius * 3.5
          );
          haloGrad.addColorStop(0, `rgba(${rgb}, ${p.alpha * 0.5})`);
          haloGrad.addColorStop(0.5, `rgba(${rgb}, ${p.alpha * 0.15})`);
          haloGrad.addColorStop(1, `rgba(${rgb}, 0)`);

          ctx.fillStyle = haloGrad;
          ctx.beginPath();
          ctx.arc(currentX, p.y, p.radius * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw solid core of the speck
        ctx.fillStyle = `rgba(${rgb}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(currentX, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(resizeTimeout);
    };
  }, [visualMode, palette]);

  if (visualMode === 'minimal') {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[#120e0b] transition-colors duration-1000"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Base deep background */}
      <div className="absolute inset-0 bg-[#120e0b]" />

      {/* Atmospheric Shifting Color Auras */}
      {/* Aura Orb 1: Upper center-left sanctuary glow */}
      <div
        className="absolute -top-[15%] left-[10%] h-[70vw] w-[70vw] max-w-[800px] max-h-[800px] rounded-full blur-[100px] sm:blur-[140px] transition-all duration-[2500ms] animate-aura-slow"
        style={{
          backgroundColor: palette.aura1,
          willChange: 'transform, opacity'
        }}
      />

      {/* Aura Orb 2: Lower center-right warm candlelight glow */}
      <div
        className="absolute -bottom-[20%] right-[5%] h-[75vw] w-[75vw] max-w-[850px] max-h-[850px] rounded-full blur-[110px] sm:blur-[150px] transition-all duration-[2500ms] animate-aura-reverse"
        style={{
          backgroundColor: palette.aura2,
          willChange: 'transform, opacity'
        }}
      />

      {/* Aura Orb 3: Center subtle radiant pulse */}
      <div
        className="absolute top-[35%] left-[25%] h-[55vw] w-[55vw] max-w-[650px] max-h-[650px] rounded-full blur-[90px] sm:blur-[130px] transition-all duration-[2500ms] animate-pulse-gentle"
        style={{
          backgroundColor: palette.aura3,
          willChange: 'transform, opacity'
        }}
      />

      {/* Subtle Cathedral Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,8,6,0.65)_100%)] pointer-events-none" />

      {/* Canvas for floating light specks & candlelight motes */}
      {visualMode === 'particles' && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full pointer-events-none"
        />
      )}
    </div>
  );
};
