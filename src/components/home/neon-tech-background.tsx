"use client";

import { useEffect, useRef } from "react";

const nodes = [
  { left: "9%", top: "18%", delay: "-1.2s" },
  { left: "22%", top: "68%", delay: "-3.8s" },
  { left: "46%", top: "34%", delay: "-2.4s" },
  { left: "67%", top: "74%", delay: "-4.7s" },
  { left: "82%", top: "23%", delay: "-0.6s" },
  { left: "93%", top: "56%", delay: "-3.1s" },
];

const DATA_PATH = "M 4 104 H 112 L 158 58 H 286 L 332 18 H 416";

interface NeonTechBackgroundProps {
  intensity?: "strong" | "medium" | "subtle";
}

function DataStream({ className, duration }: { className: string; duration: string }) {
  return (
    <svg className={`home-neon-data-stream ${className}`} viewBox="0 0 420 120">
      <path d={DATA_PATH} />
      <circle r="3.5">
        <animateMotion dur={duration} path={DATA_PATH} repeatCount="indefinite" />
        <animate
          attributeName="opacity"
          dur={duration}
          keyTimes="0;0.1;0.78;1"
          repeatCount="indefinite"
          values="0;1;1;0"
        />
      </circle>
    </svg>
  );
}

export function NeonTechBackground({
  intensity = "strong",
}: NeonTechBackgroundProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopViewport = window.matchMedia("(min-width: 768px)");
    if (reducedMotion.matches || !desktopViewport.matches) return;

    let animationFrame: number | undefined;

    const updateParallax = () => {
      if (animationFrame) return;

      animationFrame = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const root = backdropRef.current;

        root?.style.setProperty(
          "--parallax-slow-y",
          `${-Math.min(scrollY * 0.015, 24)}px`,
        );
        root?.style.setProperty(
          "--parallax-medium-y",
          `${-Math.min(scrollY * 0.027, 42)}px`,
        );
        root?.style.setProperty(
          "--parallax-fast-y",
          `${-Math.min(scrollY * 0.038, 58)}px`,
        );

        animationFrame = undefined;
      });
    };

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateParallax);
    };
  }, []);

  return (
    <div
      ref={backdropRef}
      className={`home-neon-backdrop neon-intensity-${intensity}`}
      aria-hidden="true"
    >
      <div className="home-neon-parallax-layer home-neon-parallax-slow">
        <div className="home-neon-aurora" />
        <div className="home-neon-orb home-neon-orb-cyan" />
        <div className="home-neon-orb home-neon-orb-violet" />
      </div>
      <div className="home-neon-parallax-layer home-neon-parallax-medium">
        <div className="home-neon-grid" />
      </div>
      <div className="home-neon-parallax-layer home-neon-parallax-fast">
        <div className="home-neon-circuit home-neon-circuit-left" />
        <div className="home-neon-circuit home-neon-circuit-right" />
        <DataStream className="home-neon-data-one" duration="9s" />
        <DataStream className="home-neon-data-two" duration="12s" />
        {nodes.map((node, index) => (
          <span
            key={index}
            className="home-neon-node"
            style={{
              left: node.left,
              top: node.top,
              animationDelay: node.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
