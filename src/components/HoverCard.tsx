"use client";

import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";

type Props = {
  url: string;
  title: string;
  subtitle: string;
};
export function HoverCard({ url, title, subtitle }: Props) {
  return (
    <div className="h-[40rem] relative  flex items-center justify-center">
      <DirectionAwareHover imageUrl={url}>
        <p className="font-bold text-xl">{title}</p>
        <p className="font-normal text-sm">{subtitle}</p>
      </DirectionAwareHover>
    </div>
  );
}
