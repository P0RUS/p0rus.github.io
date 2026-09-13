"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PantheonScroll() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const threshold = document.querySelector(".threshold-content");
      const orbit = document.querySelector(".orbit-scene");
      const orbits = document.querySelectorAll(".orbit");
      const hermes = document.querySelector(".hermes-placeholder");

      if (!threshold || !orbit || !hermes) return;

      gsap.timeline({
        scrollTrigger: {
          trigger: orbit,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      })
        .fromTo(
          threshold,
          {
            y: 0,
            opacity: 1,
          },
          {
            y: -180,
            opacity: 0,
            ease: "none",
          }
        )
        .fromTo(
          orbits,
          {
            scale: 0.72,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            stagger: 0.08,
          },
          0
        )
        .fromTo(
          hermes,
          {
            x: 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            ease: "none",
          },
          0.25
        );
    }, root);

    return () => context.revert();
  }, []);

  return <div ref={root} />;
}