"use client";

import { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next-intl/link";
import { register } from "swiper/element/bundle";

import { leagueGothic } from "@/utils/fonts";

register();

interface Slide {
  image: StaticImageData | string;
  name: string;
  href: string;
}

interface CaoruselProps {
  slides: Slide[];
}

const CountriesCarousel: React.FC<CaoruselProps> = ({ slides }) => {
  const swiperElRef = useRef(null);

  return (
    <swiper-container
      cssMode
      className="flex"
      ref={swiperElRef}
      slidesPerView="auto"
      spaceBetween={40}
    >
      {slides.map((slide) => (
        <swiper-slide
          className="px-3 lg:px-0 h-[500px] md:h-[320px] lg:h-[550px] w-full lg:w-1/4"
          key={slide.href}
          lazy
        >
          <div className="h-full w-full bg-gray-200 relative rounded-2xl bg-gray-200">
            <Link
              href={slide.href}
              // className="h-full w-full bg-gray-200 relative"
            >
              <Image
                className="rounded-2xl"
                src={slide.image}
                alt="a man on a step ladder working with a lot of cable in Vientiane (Laos)"
                sizes="100%"
                loading="lazy"
                fill
                style={{ objectFit: "cover" }}
              />

              <div className="absolute z-10 top-0 left-0 bottom-0 right-0 h-full w-full flex items-center justify-center">
                <span
                  className="text-7xl text-white uppercase"
                  style={leagueGothic.style}
                >
                  {slide.name}
                </span>
              </div>
            </Link>
          </div>
        </swiper-slide>
      ))}
      {/* <swiper-slide lazy>Slide 2</swiper-slide>
      <swiper-slide lazy>Slide 3</swiper-slide> */}
    </swiper-container>
  );
};

export default CountriesCarousel;
