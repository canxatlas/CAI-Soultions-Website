'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useId, useState } from 'react';

import { cn } from '@/lib/utils';

interface AnimatedBeamProps extends React.HTMLAttributes<HTMLDivElement> {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  fromRef?: { current: HTMLDivElement | null };
  toRef?: { current: HTMLDivElement | null };
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export const AnimatedBeam = React.forwardRef<HTMLDivElement, AnimatedBeamProps>(
  (
    {
      className,
      containerRef,
      fromRef,
      toRef,
      curvature = 0,
      reverse = false,
      duration = Math.random() * 3 + 4,
      delay = 0,
      pathColor = 'gray',
      pathWidth = 2,
      pathOpacity = 0.2,
      gradientStartColor = '#ffaa40',
      gradientStopColor = '#9c40ff',
      startXOffset = 0,
      startYOffset = 0,
      endXOffset = 0,
      endYOffset = 0,
    },
    ref
  ) => {
    const id = useId();
    const [pathD, setPathD] = useState('');

    // Calculate the gradient coordinates based on the reverse prop
    const gradientCoordinates = reverse
      ? {
          x1: ['90%', '-10%'],
          x2: ['100%', '0%'],
          y1: ['0%', '0%'],
          y2: ['0%', '0%'],
        }
      : {
          x1: ['10%', '110%'],
          x2: ['0%', '100%'],
          y1: ['0%', '0%'],
          y2: ['0%', '0%'],
        };

    useEffect(() => {
      const updatePath = () => {
        if (containerRef?.current && fromRef?.current && toRef?.current) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const rectA = fromRef.current.getBoundingClientRect();
          const rectB = toRef.current.getBoundingClientRect();

          const startX =
            rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
          const startY =
            rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
          const endX =
            rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
          const endY =
            rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

          const controlY = startY - curvature;
          const d = `M ${startX},${startY} Q ${
            (startX + endX) / 2
          },${controlY} ${endX},${endY}`;
          setPathD(d);
        }
      };

      // Initialize ResizeObserver
      const resizeObserver = new ResizeObserver(() => {
        updatePath();
      });

      // Observe the container element
      if (containerRef?.current) {
        resizeObserver.observe(containerRef.current);
      }

      // Call the updatePath initially to set the initial path
      updatePath();

      // Clean up the observer on component unmount
      return () => {
        resizeObserver.disconnect();
      };
    }, [
      containerRef,
      fromRef,
      toRef,
      curvature,
      startXOffset,
      startYOffset,
      endXOffset,
      endYOffset,
    ]);

    if (!pathD) return null;

    return (
      <div
        ref={ref}
        className={cn('absolute overflow-visible', className)}
        style={{
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <svg
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            pointerEvents: 'none',
          }}
        >
          <defs>
            <motion.linearGradient
              className="transform-gpu"
              id={id}
              gradientUnits="userSpaceOnUse"
              initial={{
                x1: '0%',
                x2: '0%',
                y1: '0%',
                y2: '0%',
              }}
              animate={{
                x1: gradientCoordinates.x1,
                x2: gradientCoordinates.x2,
                y1: gradientCoordinates.y1,
                y2: gradientCoordinates.y2,
              }}
              transition={{
                delay,
                duration,
                ease: [0.16, 1, 0.3, 1], // https://easings.net/#easeOutExpo
                repeat: Infinity,
                repeatDelay: 0,
              }}
            >
              <stop stopColor={gradientStartColor} stopOpacity="0" />
              <stop stopColor={gradientStartColor} />
              <stop offset="32.5%" stopColor={gradientStopColor} />
              <stop
                offset="100%"
                stopColor={gradientStopColor}
                stopOpacity="0"
              />
            </motion.linearGradient>
          </defs>
          <path
            d={pathD}
            stroke={pathColor}
            strokeWidth={pathWidth}
            strokeOpacity={pathOpacity}
            strokeLinecap="round"
          />
          <path
            d={pathD}
            strokeWidth={pathWidth}
            stroke={`url(#${id})`}
            strokeOpacity="1"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }
);

AnimatedBeam.displayName = 'AnimatedBeam';
