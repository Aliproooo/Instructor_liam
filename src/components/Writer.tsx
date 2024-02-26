"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
export function Writer() {
  const words = [
    {
      text: "MEET",
    },
    {
      text: "OUR",
    },
    {
      text: "TOP",
    },

    {
      text: "INSTRUCTORS",
      className: "text-black dark:text-violet-400",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
