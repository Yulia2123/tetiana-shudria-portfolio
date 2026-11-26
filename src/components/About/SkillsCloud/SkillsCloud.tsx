"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";
import css from "./SkillsCloud.module.css";

type Skill = {
  title: string;
  tone: "lime" | "gray" | "white";
};

type SkillsCloudProps = {
  skills: readonly Skill[];
};

export default function SkillsCloud({ skills }: SkillsCloudProps) {
  const cloudRef = useRef<HTMLDivElement>(null);
  const skillRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const container = cloudRef.current;

    if (!container) return;

    const elements = skillRefs.current.filter(
      (element): element is HTMLSpanElement => element !== null
    );

    if (!elements.length) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (prefersReducedMotion.matches) {
      elements.forEach((element) => {
        element.style.opacity = "1";
      });
      return;
    }

    let engine: Matter.Engine | null = null;
    let animationFrame = 0;
    let isRunning = false;
    let isDisposed = false;

    const resetSkills = () => {
      elements.forEach((element) => {
        element.style.position = "";
        element.style.left = "";
        element.style.top = "";
        element.style.margin = "";
        element.style.transform = "";
        element.style.transformOrigin = "";
        element.style.willChange = "";
        element.style.opacity = "";
        element.style.transition = "";
      });
    };

    const startPhysics = () => {
      if (isRunning || isDisposed) return;

      resetSkills();

      void container.offsetWidth;

      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) return;

      const angles = [
        -0.07, 0.05, -0.04, 0.08, -0.06, 0.03, -0.09, 0.06, -0.03, 0.07, -0.05,
      ];

      const verticalOffsets = [-12, 5, -7, 10, -4, 8, -10, 4, -6, 11, -3];

      const items = elements.map((element, index) => {
        const itemWidth = element.offsetWidth;
        const itemHeight = element.offsetHeight;

        const y = Math.max(
          itemHeight / 2 + 4,
          Math.min(
            height - itemHeight / 2 - 4,
            20 +
              Math.random() * height * 0.35 +
              verticalOffsets[index % verticalOffsets.length]
          )
        );

        return {
          element,
          width: itemWidth,
          height: itemHeight,
          x: width + itemWidth / 2 + 80,
          y,
          angle: angles[index % angles.length],
          delay: index * 220,
        };
      });

      engine = Matter.Engine.create({
        enableSleeping: true,
      });

      const currentEngine = engine;

      currentEngine.gravity.y = 0.65;

      const bodies = items.map((item) => {
        const body = Matter.Bodies.rectangle(
          item.x,
          item.y,
          item.width,
          item.height,
          {
            angle: item.angle,
            restitution: 0.28,
            friction: 0.05,
            frictionStatic: 0.01,
            frictionAir: 0.003,
          }
        );

        Matter.Body.setInertia(body, Infinity);
        Matter.Body.setAngle(body, item.angle);
        Matter.Body.setAngularVelocity(body, 0);

        return body;
      });

      const spawned = items.map(() => false);

      const wall = 100;
      const margin = 10;

      const walls = [
        Matter.Bodies.rectangle(
          width / 2,
          height + wall / 2 - margin,
          width + wall * 2,
          wall,
          { isStatic: true }
        ),

        Matter.Bodies.rectangle(
          width / 2,
          -wall / 2 + margin,
          width + wall * 2,
          wall,
          { isStatic: true }
        ),

        Matter.Bodies.rectangle(
          -wall / 2 + margin,
          height / 2,
          wall,
          height + wall * 2,
          { isStatic: true }
        ),
      ];

      Matter.Composite.add(currentEngine.world, walls);

      items.forEach((item, index) => {
        const element = item.element;
        const body = bodies[index];

        element.style.position = "absolute";
        element.style.left = "0";
        element.style.top = "0";
        element.style.margin = "0";
        element.style.transformOrigin = "center center";
        element.style.willChange = "transform";
        element.style.opacity = "1";

        element.style.transform = `
  translate3d(
    ${body.position.x - item.width / 2}px,
    ${body.position.y - item.height / 2}px,
    0
  )
  rotate(${item.angle}rad)
`;
      });

      isRunning = true;

      let lastTime = performance.now();
      let startTime = lastTime;
      let settledFrames = 0;
      let rightWallAdded = false;

      const animate = (time: number) => {
        if (isDisposed || engine !== currentEngine) return;

        const delta = Math.min(time - lastTime, 1000 / 30);

        lastTime = time;

        const elapsedTime = time - startTime;

        items.forEach((item, index) => {
          if (spawned[index] || elapsedTime < item.delay) return;

          const body = bodies[index];

          Matter.Body.setVelocity(body, {
            x: -8 - Math.random() * 2,
            y: -0.5 + Math.random() * 1.5,
          });

          Matter.Body.setAngularVelocity(body, 0);

          Matter.Composite.add(currentEngine.world, body);

          spawned[index] = true;
        });

        Matter.Engine.update(currentEngine, delta);

        if (!rightWallAdded && spawned.every(Boolean)) {
          const allInside = bodies.every(
            (body) => body.bounds.max.x <= width - margin
          );

          if (allInside) {
            const rightWall = Matter.Bodies.rectangle(
              width + wall / 2 - margin,
              height / 2,
              wall,
              height + wall * 2,
              { isStatic: true }
            );

            Matter.Composite.add(currentEngine.world, rightWall);
            rightWallAdded = true;
          }
        }

        bodies.forEach((body, index) => {
          const item = items[index];

          item.element.style.transform = `
              translate3d(
                ${body.position.x - item.width / 2}px,
                ${body.position.y - item.height / 2}px,
                0
              )
              rotate(${item.angle}rad)
            `;
        });

        const allSpawned = spawned.every(Boolean);

        const isSettled =
          allSpawned &&
          bodies.every(
            (body) => body.speed < 0.12 && Math.abs(body.angularSpeed) < 0.02
          );

        settledFrames = isSettled ? settledFrames + 1 : 0;

        if (settledFrames > 45 || elapsedTime > 10000) {
          items.forEach(({ element }) => {
            element.style.willChange = "auto";
          });

          Matter.Composite.clear(currentEngine.world, false);
          Matter.Engine.clear(currentEngine);

          engine = null;
          isRunning = false;

          return;
        }

        animationFrame = requestAnimationFrame(animate);
      };

      animationFrame = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startPhysics();
          }
        });
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(container);

    return () => {
      isDisposed = true;

      observer.disconnect();
      cancelAnimationFrame(animationFrame);

      if (engine) {
        Matter.Composite.clear(engine.world, false);
        Matter.Engine.clear(engine);
        engine = null;
      }

      resetSkills();
    };
  }, []);

  return (
    <div ref={cloudRef} className={css.cloud}>
      {skills.map((skill, index) => (
        <span
          key={skill.title}
          ref={(element) => {
            skillRefs.current[index] = element;
          }}
          className={`${css.skill} ${css[skill.tone]}`}
        >
          {skill.title}
        </span>
      ))}
    </div>
  );
}
