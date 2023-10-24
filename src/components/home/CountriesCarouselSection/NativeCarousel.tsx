import Image, { StaticImageData } from "next/image";

import { Link } from "@/utils/navigation";

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

export const NativeCarousel: React.FC<CaoruselProps> = ({ slides }) => (
  <div className="flex gap-4 lg:gap-10 overflow-scroll snap-proximity w-full">
    {slides.map((slide) => (
      <Link
        key={slide.href}
        href={slide.href}
        className="group relative overflow-hidden h-[500px] lg:h-[550px] min-w-[340px] lg:min-w-[400px] mt-5 first:ml-4 lg:first:ml-8 last:mr-4 lg:last:mr-8 rounded-2xl hover:-translate-y-5 transition duration-500 bg-gray-200"
        prefetch={false}
      >
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
    ))}
  </div>
);
