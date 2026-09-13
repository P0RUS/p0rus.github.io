"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  depth: number;
  twinkle: number;
  phase: number;
};

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let animationFrame: number;
    let scrollY = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor(
        (window.innerWidth * window.innerHeight) / 420
      );

      stars = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius:
          Math.random() < 0.92
            ? Math.random() * 0.8 + 0.25
            : Math.random() * 1.4 + 0.8,
        alpha: Math.random() * 0.65 + 0.2,
        depth: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * 0.5 + 0.5,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const star of stars) {
        const parallaxY = -scrollY * star.depth * 0.12;

        let y = star.y + parallaxY;

        if (y < -10) y += window.innerHeight + 20;
        if (y > window.innerHeight + 10) y -= window.innerHeight + 20;

        const twinkle =
          0.82 +
          Math.sin(time * 0.001 * star.twinkle + star.phase) * 0.18;

        ctx.beginPath();
        ctx.arc(star.x, y, star.radius, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(255, 255, 255, ${
          star.alpha * twinkle
        })`;

        ctx.fill();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    handleScroll();

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    animationFrame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="star-field"
      aria-hidden="true"
    />
  );
}