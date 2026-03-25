'use client';

import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { motion, useInView } from 'motion/react'; // ← new import
import { useTranslations } from 'next-intl';
import Section from '../common/Section';
import Wrapper from '../common/Wrapper';

const items = [
  '/images/falling/1.jpg',
  '/images/falling/2.jpg',
  '/images/falling/3.jpg',
  '/images/falling/4.jpg',
  '/images/falling/14.jpg',
  '/images/falling/15.jpg',
  '/images/falling/16.jpg',
  '/images/falling/17.jpg',
  '/images/falling/5.jpg',
  '/images/falling/6.jpg',
  '/images/falling/7.jpg',
  '/images/falling/8.jpg',
  '/images/falling/9.jpg',
  '/images/falling/10.jpg',
  '/images/falling/11.jpg',
  '/images/falling/1.jpg',
  '/images/falling/2.jpg',
  '/images/falling/3.jpg',
  '/images/falling/12.jpg',
  '/images/falling/13.jpg',
  '/images/falling/14.jpg',
  '/images/falling/15.jpg',
  '/images/falling/16.jpg',
  '/images/falling/17.jpg',
];

interface CircleWithImage extends Matter.Body {
  svgPath: string;
}

interface MatterMouseWithWheel extends Matter.Mouse {
  mousewheel: (event: Event) => void;
}

const Falling = () => {
  const t = useTranslations('pages.home');
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const circlesRef = useRef<Matter.Body[]>([]);
  const imagesCache = useRef<Map<string, HTMLImageElement>>(new Map());

  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.4,
    margin: '0px 0px -100px 0px',
  });

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

    const isMobile = window.innerWidth < 768;
    const circleRadius = isMobile ? 30 : 60;
    const circles: Matter.Body[] = [];

    items.forEach((svgPath, index) => {
      const x = cw / 2;
      const y = index * 20;
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
      circle.svgPath = svgPath;
      circles.push(circle);
    });

    Matter.World.add(world, circles);
    circlesRef.current = circles;

    const mouse = Matter.Mouse.create(render.canvas) as MatterMouseWithWheel;
    mouse.element.removeEventListener('wheel', mouse.mousewheel);
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Matter.World.add(world, mouseConstraint);

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

    // Cleanup
    return () => {
      Matter.Runner.stop(runner);
      Matter.Render.stop(render);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  useEffect(() => {
    if (isInView && runnerRef.current && engineRef.current) {
      Matter.Runner.run(runnerRef.current, engineRef.current);
    }
  }, [isInView]);

  return (
    <Section>
      <Wrapper>
        <motion.div
          ref={containerRef}
          className="bg-secondary relative h-180 w-full overflow-hidden rounded-3xl"
        >
          <div className="font-poppins text-primary absolute top-12 w-full px-5 text-center text-3xl font-bold xl:text-4xl 2xl:text-5xl">
            {t('falling')}
          </div>

          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute top-0 left-0 h-full w-full md:pointer-events-auto"
            style={{ display: 'block' }}
          />
        </motion.div>
      </Wrapper>
    </Section>
  );
};

export default Falling;
