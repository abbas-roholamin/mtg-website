'use client';

import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import SectionContainer from '../common/SectionContainer';

interface CircleWithImage extends Matter.Body {
  svgPath: string;
}

gsap.registerPlugin(ScrollTrigger);

const Falling = () => {
  const t = useTranslations('pages.home');
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const circlesRef = useRef<Matter.Body[]>([]);
  const imagesCache = useRef<Map<string, HTMLImageElement>>(new Map());

  const items = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
  ];

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      if (imagesCache.current.has(src)) {
        resolve(imagesCache.current.get(src)!);
      } else {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          imagesCache.current.set(src, img);
          resolve(img);
        };
        img.onerror = reject;
        img.src = src;
      }
    });
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    if (cw === 0 || ch === 0) return;

    const engine = Matter.Engine.create();
    engine.gravity.y = 1;
    const world = engine.world;

    const render = Matter.Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio,
      },
    });

    const wallThickness = 40;
    const walls = [
      Matter.Bodies.rectangle(cw / 2, -wallThickness / 2, cw, wallThickness, {
        isStatic: true,
        restitution: 0,
        friction: 1,
        render: {
          strokeStyle: 'transparent',
          fillStyle: 'transparent',
          lineWidth: 0,
        },
      }),
      Matter.Bodies.rectangle(
        cw / 2,
        ch + wallThickness / 2,
        cw,
        wallThickness,
        {
          isStatic: true,
          restitution: 0,
          friction: 1,
          render: {
            strokeStyle: 'transparent',
            fillStyle: 'transparent',
            lineWidth: 0,
          },
        }
      ),
      Matter.Bodies.rectangle(-wallThickness / 2, ch / 2, wallThickness, ch, {
        isStatic: true,
        restitution: 0,
        friction: 1,
        render: {
          strokeStyle: 'transparent',
          fillStyle: 'transparent',
          lineWidth: 0,
        },
      }),
      Matter.Bodies.rectangle(
        cw + wallThickness / 2,
        ch / 2,
        wallThickness,
        ch,
        {
          isStatic: true,
          restitution: 0,
          friction: 1,
          render: {
            strokeStyle: 'transparent',
            fillStyle: 'transparent',
            lineWidth: 0,
          },
        }
      ),
    ];
    Matter.World.add(world, walls);

    const circleRadius = 60;
    const circles: Matter.Body[] = [];
    items.forEach((svgPath, index) => {
      const x = cw / 2;
      const y = 50 + index * 70;
      const circle: CircleWithImage = Matter.Bodies.circle(x, y, circleRadius, {
        restitution: 0,
        friction: 0.3,
        density: 0.001,
        label: `circle${index + 1}`,
        render: {
          fillStyle: 'transparent',
          strokeStyle: 'transparent',
        },
      }) as CircleWithImage;
      (circle as CircleWithImage).svgPath = svgPath;
      circles.push(circle);
    });
    Matter.World.add(world, circles);
    circlesRef.current = circles;

    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Matter.World.add(world, mouseConstraint);

    const preventScroll = (e: Event) => e.preventDefault();
    canvas.addEventListener('mousewheel', preventScroll);
    canvas.addEventListener('DOMMouseScroll', preventScroll);

    Matter.Events.on(render, 'afterRender', () => {
      const ctx = render.context;
      circles.forEach(async circle => {
        const pos = circle.position;
        const angle = circle.angle;
        const svgPath = (circle as CircleWithImage).svgPath;

        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.arc(0, 0, circleRadius, 0, Math.PI * 2);
        ctx.clip();

        ctx.fillStyle = '#f7f7f7';
        ctx.fill();

        try {
          let img = imagesCache.current.get(svgPath);
          if (!img) {
            img = await loadImage(svgPath);
          }
          const size = circleRadius * 2;
          ctx.drawImage(img, -size / 2, -size / 2, size, size);
        } catch (error) {
          console.warn('Error loading SVG:', svgPath);
          ctx.font = '40px sans-serif';
          ctx.fillStyle = '#999';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('?', 0, 0);
        }

        ctx.restore();
      });
    });

    Matter.Render.run(render);
    const runner = Matter.Runner.create();

    engineRef.current = engine;
    renderRef.current = render;
    runnerRef.current = runner;

    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      onEnter: () => {
        if (runnerRef.current && engineRef.current) {
          Matter.Runner.run(runnerRef.current, engineRef.current);
        }
      },
      once: true,
    });

    return () => {
      scrollTrigger.kill();
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (renderRef.current) Matter.Render.stop(renderRef.current);
      if (engineRef.current) {
        Matter.World.clear(engineRef.current.world, false);
        Matter.Engine.clear(engineRef.current);
      }
      canvas.removeEventListener('mousewheel', preventScroll);
      canvas.removeEventListener('DOMMouseScroll', preventScroll);
    };
  }, []);

  return (
    <SectionContainer>
      <div
        ref={containerRef}
        className="relative h-140 w-full overflow-hidden rounded-3xl bg-purple-200"
      >
        <div className="font-quick-sand absolute top-12 w-full px-5 text-center text-3xl font-bold xl:text-4xl 2xl:text-5xl">
          {t('falling')}
        </div>

        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 h-full w-full"
          style={{ display: 'block' }}
        />
      </div>
    </SectionContainer>
  );
};

export default Falling;
