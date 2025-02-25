import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

interface AnimatedBeamProps extends React.HTMLAttributes<HTMLDivElement> {
  containerRef?: React.RefObject<HTMLDivElement>;
  fromRef?: React.RefObject<HTMLDivElement>;
  toRef?: React.RefObject<HTMLDivElement>;
  duration?: number;
}

export const AnimatedBeam = React.forwardRef<HTMLDivElement, AnimatedBeamProps>(
  (
    { className, containerRef, fromRef, toRef, duration = 3, ...props },
    ref
  ) => {
    const [line, setLine] = useState<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    } | null>(null);

    useEffect(() => {
      if (!containerRef?.current || !fromRef?.current || !toRef?.current)
        return;

      const updateLine = () => {
        const container = containerRef.current!.getBoundingClientRect();
        const from = fromRef.current!.getBoundingClientRect();
        const to = toRef.current!.getBoundingClientRect();

        setLine({
          x1: from.left + from.width / 2 - container.left,
          y1: from.top + from.height / 2 - container.top,
          x2: to.left + to.width / 2 - container.left,
          y2: to.top + to.height / 2 - container.top,
        });
      };

      updateLine();
      window.addEventListener('resize', updateLine);
      return () => window.removeEventListener('resize', updateLine);
    }, [containerRef, fromRef, toRef]);

    if (!line) return null;

    const angle =
      (Math.atan2(line.y2 - line.y1, line.x2 - line.x1) * 180) / Math.PI;
    const length = Math.sqrt(
      Math.pow(line.x2 - line.x1, 2) + Math.pow(line.y2 - line.y1, 2)
    );

    return (
      <div
        ref={ref}
        className={cn('group absolute overflow-hidden', className)}
        style={{
          left: line.x1,
          top: line.y1,
          width: length,
          height: '2px',
          transform: `rotate(${angle}deg)`,
          transformOrigin: '0 0',
        }}
        {...props}
      >
        <div className="relative h-full w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-500/50" />
          <div
            className="absolute h-full w-20 animate-beam-fast bg-gradient-to-r from-transparent via-white to-transparent"
            style={{ animationDuration: `${duration}s` }}
          />
        </div>
      </div>
    );
  }
);

AnimatedBeam.displayName = 'AnimatedBeam';
