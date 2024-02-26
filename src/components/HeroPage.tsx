import React from "react";
import HeroCarousel from "./HeroCarousel";

interface Props {
  // Define your component props here
}

const HeroPage: React.FC<Props> = () => {
  return (
    <div>
      <HeroCarousel />
    </div>
  );
};

export default HeroPage;
