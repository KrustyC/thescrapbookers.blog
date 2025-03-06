"use client";

import { useRef } from "react";
import Image, { StaticImageData } from "next/image";

// import { register } from "swiper/element/bundle";
import { Link } from "@/i18n/navigation";

// register();

interface Slide {
  image: {
    src: StaticImageData | string;
    alt: string;
    title: string;
  };
  name?: string;
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
      freeMode
      slidesPerGroupAuto
      ref={swiperElRef}
      slidesPerView={1.2}
      spaceBetween={15}
      breakpoints={{
        720: {
          slidesPerView: 2.3,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3.3,
          spaceBetween: 40,
        },
        1600: {
          slidesPerView: 4.2,
          spaceBetween: 40,
        },
        2000: {
          slidesPerView: 5.2,
          spaceBetween: 40,
        },
        2400: {
          slidesPerView: 6.2,
          spaceBetween: 40,
        },
      }}
    >
      {slides.map((slide) => (
        <swiper-slide
          className="h-[500px] lg:h-[550px] mt-5 first:ml-4 lg:first:ml-8 last:mr-4 lg:last:mr-8 rounded-2xl hover:-translate-y-5 transition duration-500 group bg-gray-200"
          key={slide.href}
          lazy
        >
          <div className="h-full w-full relative rounded-2xl overflow-hidden mr-12">
            <Link href={slide.href} prefetch={false}>
              <Image
                fill
                src={slide.image.src}
                alt={slide.image.alt}
                title={slide.image.title}
                className="rounded-2xl group-hover:scale-125 transition duration-500"
                style={{ objectFit: "cover" }}
                sizes="100%"
                loading="lazy"
              />

              <div className="absolute z-10 top-0 left-0 bottom-0 right-0 h-full w-full flex items-center justify-center">
                <span className="text-7xl text-white uppercase font-league-gothic">
                  {slide.name}
                </span>
              </div>
            </Link>
          </div>
        </swiper-slide>
      ))}
    </swiper-container>
  );
};

export default CountriesCarousel;
