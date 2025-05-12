"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ContainerScroll = ({
  titleComponent,
  children,
  className,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scaleDimensions = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-[60vh] flex flex-col items-center justify-start pt-40",
        className
      )}
    >
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <motion.div
          style={{
            scale: scaleDimensions,
            opacity: opacity,
          }}
          className="max-w-6xl px-4 py-8 mx-auto flex flex-col items-center justify-center"
        >
          {titleComponent && (
            <div className="mb-10 text-center">{titleComponent}</div>
          )}
          <div>{children}</div>
        </motion.div>
      </div>
    </div>
  );
}; 