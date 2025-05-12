import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Sparkles } from "lucide-react";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pb-[400px]">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none flex items-center justify-center gap-4">
                Scroll Animations
                <Sparkles className="h-8 w-8 md:h-16 md:w-16 text-yellow-400" />
              </span>
            </h1>
          </>
        }
      >
        <img
          src="https://images.pexels.com/photos/5483071/pexels-photo-5483071.jpeg"
          alt="Coding workspace with laptop"
          className="mx-auto rounded-2xl object-cover h-full w-full object-center"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
} 