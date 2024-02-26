"use client";
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
//@ts-ignore
import TypeWriterEffect from "react-typewriter-effect";
export function HeroWave() {
  return (
    <WavyBackground className="max-w-5xl mx-auto pb-40">
      <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
        Start With Branyand Recs
      </p>
      <div className="mt-10 w-full flex items-center justify-center">
        <TypeWriterEffect
          textStyle={{
            color: "#FFFFFF",
            fontWeight: 500,
            fontSize: "2.5em",
          }}
          startDelay={2000}
          cursorColor="#3F3D56"
          multiText={[
            "Unlock your musical potential with expert guidance.",
            "Embark on a journey of musical discovery with us.",
            "Where passion meets proficiency: our music lessons.",
            "Elevate your skills with lessons from industry professionals.",
            "Discover the secrets of music from seasoned artists.",
            "Join a community dedicated to mastering the art of music.",
          ]}
          multiTextDelay={1000}
          typeSpeed={30}
          multiTextLoop={true}
        />
      </div>
    </WavyBackground>
  );
}
