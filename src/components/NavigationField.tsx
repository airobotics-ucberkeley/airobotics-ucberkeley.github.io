"use client";

import { useEffect, useRef } from "react";

/**
 * Hero backdrop: a robot navigating a world.
 *
 * There is an actual little simulation behind this. Convex obstacles make up
 * the world; the robot casts a lidar fan and the rays terminate where they hit
 * something, so the visible scan is a real raycast rather than a decorative
 * arc. It picks a goal, plans a path around whatever is in the way, drives it,
 * leaves a fading trail, and picks another.
 *
 * Canvas, because a lidar fan is a few hundred short lines redrawn every frame.
 * Under `prefers-reduced-motion` a single frame is drawn and no loop starts.
 */

type Vec = { x: number; y: number };
type Obstacle = { pts: Vec[] };

const RAYS = 96; // lidar beams per revolution
const RANGE = 240; // lidar range, px
const SPEED = 1.35; // px per frame
const TRAIL = 90; // breadcrumb length

/** Segment/segment intersection, returned as the distance along a→b. */
function hit(a: Vec, b: Vec, c: Vec, d: Vec): number | null {
  const r = { x: b.x - a.x, y: b.y - a.y };
  const s = { x: d.x - c.x, y: d.y - c.y };
  const denom = r.x * s.y - r.y * s.x;
  if (Math.abs(denom) < 1e-9) return null;

  const t = ((c.x - a.x) * s.y - (c.y - a.y) * s.x) / denom;
  const u = ((c.x - a.x) * r.y - (c.y - a.y) * r.x) / denom;
  return t >= 0 && t <= 1 && u >= 0 && u <= 1 ? t : null;
}

export function NavigationField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let obstacles: Obstacle[] = [];
    let edges: [Vec, Vec][] = [];
    let robot: Vec = { x: 0, y: 0 };
    let heading = 0;
    let path: Vec[] = [];
    let trail: Vec[] = [];
    let spin = 0;
    let frame = 0;

    const rand = (min: number, max: number) =>
      min + Math.random() * (max - min);

    const buildWorld = () => {
      const count = Math.max(
        5,
        Math.min(11, Math.round((width * height) / 150000)),
      );
      obstacles = Array.from({ length: count }, () => {
        const cx = rand(0, width);
        const cy = rand(0, height);
        const r = rand(38, 104);
        const sides = Math.floor(rand(4, 7));
        const turn = rand(0, Math.PI);
        return {
          pts: Array.from({ length: sides }, (_, i) => {
            const a = turn + (i / sides) * Math.PI * 2;
            const rr = r * rand(0.62, 1);
            return { x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr };
          }),
        };
      });

      edges = [];
      for (const o of obstacles) {
        for (let i = 0; i < o.pts.length; i++) {
          edges.push([o.pts[i]!, o.pts[(i + 1) % o.pts.length]!]);
        }
      }
    };

    const blocked = (a: Vec, b: Vec) =>
      edges.some(([c, d]) => hit(a, b, c, d) !== null);

    const inside = (p: Vec) =>
      p.x > 8 && p.x < width - 8 && p.y > 8 && p.y < height - 8;

    /** Straight line if it is clear, otherwise a two-leg detour around it. */
    const planTo = (goal: Vec): Vec[] => {
      if (!blocked(robot, goal)) return [goal];

      for (let attempt = 0; attempt < 60; attempt++) {
        const via = {
          x: rand(0, width),
          y: rand(0, height),
        };
        if (!inside(via)) continue;
        if (!blocked(robot, via) && !blocked(via, goal)) return [via, goal];
      }
      return [];
    };

    const newGoal = () => {
      for (let attempt = 0; attempt < 80; attempt++) {
        const goal = { x: rand(40, width - 40), y: rand(40, height - 40) };
        if (Math.hypot(goal.x - robot.x, goal.y - robot.y) < width / 3)
          continue;
        const plan = planTo(goal);
        if (plan.length) {
          path = plan;
          return;
        }
      }
      path = [];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildWorld();
      robot = { x: width * 0.2, y: height * 0.7 };
      trail = [];
      newGoal();
    };

    /** Distance to the nearest obstacle along a ray, capped at RANGE. */
    const cast = (angle: number) => {
      const end = {
        x: robot.x + Math.cos(angle) * RANGE,
        y: robot.y + Math.sin(angle) * RANGE,
      };
      let nearest = 1;
      for (const [c, d] of edges) {
        const t = hit(robot, end, c, d);
        if (t !== null && t < nearest) nearest = t;
      }
      return nearest;
    };

    const step = () => {
      if (!path.length) {
        newGoal();
        return;
      }

      const target = path[0]!;
      const dx = target.x - robot.x;
      const dy = target.y - robot.y;
      const dist = Math.hypot(dx, dy);

      if (dist < SPEED * 1.5) {
        path.shift();
        if (!path.length) newGoal();
        return;
      }

      heading = Math.atan2(dy, dx);
      robot = {
        x: robot.x + (dx / dist) * SPEED,
        y: robot.y + (dy / dist) * SPEED,
      };

      trail.push({ ...robot });
      if (trail.length > TRAIL) trail.shift();

      spin += 0.05;
    };

    const paint = () => {
      ctx.clearRect(0, 0, width, height);

      // world
      ctx.lineWidth = 1;
      for (const o of obstacles) {
        ctx.beginPath();
        ctx.moveTo(o.pts[0]!.x, o.pts[0]!.y);
        for (const p of o.pts.slice(1)) ctx.lineTo(p.x, p.y);
        ctx.closePath();
        ctx.fillStyle = "rgba(31, 95, 191, 0.07)";
        ctx.fill();
        ctx.strokeStyle = "rgba(150, 190, 255, 0.28)";
        ctx.stroke();
      }

      // lidar fan
      for (let i = 0; i < RAYS; i++) {
        const angle = spin + (i / RAYS) * Math.PI * 2;
        const t = cast(angle);
        const hx = robot.x + Math.cos(angle) * RANGE * t;
        const hy = robot.y + Math.sin(angle) * RANGE * t;

        ctx.strokeStyle = `rgba(77, 155, 255, ${t < 1 ? 0.2 : 0.07})`;
        ctx.beginPath();
        ctx.moveTo(robot.x, robot.y);
        ctx.lineTo(hx, hy);
        ctx.stroke();

        if (t < 1) {
          ctx.fillStyle = "rgba(160, 215, 255, 0.85)";
          ctx.fillRect(hx - 1.3, hy - 1.3, 2.6, 2.6);
        }
      }

      // planned path
      if (path.length) {
        ctx.strokeStyle = "rgba(253, 181, 21, 0.45)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(robot.x, robot.y);
        for (const p of path) ctx.lineTo(p.x, p.y);
        ctx.stroke();
        ctx.setLineDash([]);

        const goal = path[path.length - 1]!;
        ctx.strokeStyle = "rgba(253, 181, 21, 0.7)";
        ctx.strokeRect(goal.x - 5, goal.y - 5, 10, 10);
      }

      // trail
      if (trail.length > 1) {
        for (let i = 1; i < trail.length; i++) {
          ctx.strokeStyle = `rgba(253, 181, 21, ${(i / trail.length) * 0.3})`;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(trail[i - 1]!.x, trail[i - 1]!.y);
          ctx.lineTo(trail[i]!.x, trail[i]!.y);
          ctx.stroke();
        }
      }

      // the robot, pointed along its heading
      ctx.save();
      ctx.translate(robot.x, robot.y);
      ctx.rotate(heading);
      ctx.fillStyle = "rgba(253, 181, 21, 0.95)";
      ctx.beginPath();
      ctx.moveTo(7, 0);
      ctx.lineTo(-4.5, 4);
      ctx.lineTo(-4.5, -4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const loop = () => {
      step();
      paint();
      frame = requestAnimationFrame(loop);
    };

    resize();
    if (reduced) {
      paint();
    } else {
      frame = requestAnimationFrame(loop);
    }

    const onResize = () => {
      resize();
      if (reduced) paint();
    };

    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_at_center,#000_45%,transparent_88%)]"
    />
  );
}
