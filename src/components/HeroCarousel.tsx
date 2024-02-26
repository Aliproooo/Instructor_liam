import { Roboto_Condensed, Roboto_Slab } from "next/font/google";
import React from "react";
import { HeroWave } from "./HeroWave";

const roboto = Roboto_Slab({ subsets: ["latin"], weight: ["800", "400"] });
function HeroCarousel() {
  return (
    <div className={`${roboto.className}`}>
      {/* <h1 className="text-[9rem] font-extrabold tracking-tighter">
        START WITH
      </h1>
      <h1 className="text-[11rem] font-extrabold tracking-tighter -mt-20">
        BRANYARD RECS
      </h1>
      <div className="mt-">
        <p className="text-4xl font-bold leading-10">
          The Best Place to Learn Music
        </p>
      </div> */}
      <HeroWave />
    </div>
  );
}

export default HeroCarousel;
