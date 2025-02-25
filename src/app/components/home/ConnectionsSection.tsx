'use client';

import React, { forwardRef, useRef } from 'react';
import { cn } from '@/lib/utils';
import { AnimatedBeam } from '@/components/magicui/animated-beam';
import { Icons } from '@/components/ui/icons';

interface CircleProps {
  className?: string;
  children?: React.ReactNode;
  size?: number;
}

const Circle = React.memo(
  forwardRef<HTMLDivElement, CircleProps>(
    ({ className, children, size = 12 }, ref) => {
      return (
        <div
          ref={ref}
          className={cn(
            'z-10 flex items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]',
            `size-${size}`,
            className
          )}
        >
          {children}
        </div>
      );
    }
  )
);

Circle.displayName = 'Circle';

export const ConnectionsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);

  const connections = [
    { from: 5, to: 0, duration: 1.8, startDelay: 0.2, curvature: 0.2 },
    { from: 5, to: 1, duration: 1.8, startDelay: 0.4, curvature: -0.1 },
    { from: 5, to: 2, duration: 1.8, startDelay: 0.6, curvature: -0.15 },
    { from: 5, to: 3, duration: 1.8, startDelay: 0.8, curvature: 0.1 },
    { from: 5, to: 4, duration: 1.8, startDelay: 1.0, curvature: 0.15 },
    { from: 6, to: 5, duration: 2.5, startDelay: 1.2, curvature: 0.2 },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-black py-20">
      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-2 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">
            Seamless Integration
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Connect your favorite apps and services with our AI assistant.
            Experience automated workflows and intelligent interactions across
            platforms.
          </p>
        </div>

        <div
          className="relative flex h-[500px] w-full items-center justify-center overflow-hidden p-10"
          ref={containerRef}
        >
          <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
            <div className="flex flex-col justify-center">
              <Circle
                ref={(el) => {
                  circleRefs.current[6] = el;
                }}
              >
                <Icons.user size={22} />
              </Circle>
            </div>
            <div className="flex flex-col justify-center">
              <Circle
                ref={(el) => {
                  circleRefs.current[5] = el;
                }}
                size={16}
              >
                <Icons.openai size={22} />
              </Circle>
            </div>
            <div className="flex flex-col justify-center gap-2">
              {[
                Icons.googleDrive({ size: 22 }),
                Icons.email({ size: 22 }),
                Icons.whatsapp({ size: 22 }),
                Icons.phone({ size: 22 }),
                Icons.notion({ size: 22 }),
              ].map((Icon, index) => (
                <Circle
                  key={index}
                  ref={(el) => {
                    circleRefs.current[index] = el;
                  }}
                >
                  {Icon}
                </Circle>
              ))}
            </div>
          </div>

          {connections.map(({ from, to, duration, startDelay, curvature }) => {
            const fromElement = circleRefs.current[from];
            const toElement = circleRefs.current[to];

            if (!fromElement || !toElement) return null;

            return (
              <AnimatedBeam
                key={`${from}-${to}`}
                containerRef={containerRef}
                fromRef={{ current: fromElement }}
                toRef={{ current: toElement }}
                duration={duration}
                delay={startDelay}
                curvature={curvature}
                pathWidth={2}
                gradientStartColor="#6366f1"
                gradientStopColor="#ec4899"
                pathOpacity={0.6}
              />
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            className="rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
              window.location.href = '#contact';
            }}
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />
    </section>
  );
};
