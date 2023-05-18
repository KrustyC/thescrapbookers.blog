import Image from "next/image";
import Link from "next/link";

import eyesPic from "../../public/images/eyes.png";

import "../globals.css";

export default function NotFound() {
  return (
    <div className="bg-primary h-screen w-screen flex items-center">
      <div className="w-5/6 mx-auto h-3/4 flex flex-col justify-center relative">
        <div className="absolute top-5 right-10">
          <div className="relative h-[150px] w-[190px]">
            <Image
              src={eyesPic}
              alt="eyeys looking down"
              placeholder="blur"
              fill
              sizes="100%"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <h2 className="text-8xl sm:text-6xl w-[720px] font-bold mb-8 sm:mb-3">
          mmmh... maybe you are a bit ahead of our travel.
        </h2>
        <Link
          href="/"
          className="bg-white px-6 pt-2 pb-4 w-fit font-bold inline-block"
        >
          <span className="text-8xl sm:text-6xl text-black">
            back to homepage
          </span>
        </Link>
      </div>
    </div>
  );
}
