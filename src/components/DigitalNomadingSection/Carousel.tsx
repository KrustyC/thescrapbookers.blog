"use client";

import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Image from "next/image";
import Link from "next-intl/link";

import { AppLocale, Post } from "@/types/global";

import "react-horizontal-scrolling-menu/dist/styles.css";
// import { LeftArrow } from "./LeftArrow";
// import { RightArrow } from "./RightArrow";

interface CarouselProps {
  posts: Post[];
  locale: AppLocale;
}

export const Carousel: React.FC<CarouselProps> = ({ posts }) => {
  return (
    <div className="flex flex-col w-full bg-[green]">
      <ScrollMenu
        wrapperClassName="relative scroll-menu-wrapper max-w-full bg-[red] overflow-hidden"
        // LeftArrow={LeftArrow}
        // RightArrow={RightArrow}
      >
        {posts.map((post, i) => (
          <div className="flex flex-col w-[150px] mr-4" key={i}>
            <Link
              href={post.href}
              className="w-[150px] h-[250px] relative rounded-2xl drop-shadow-lg"
              prefetch={false}
            >
              <Image
                className="rounded-xl"
                sizes="100%"
                fill
                src={post.thumbnailImage?.url || DEFAULT_IMAGE}
                alt={post.thumbnailImage?.description || "default image"}
                loading="lazy"
                style={{ objectFit: "cover" }}
              />
            </Link>

            <h3 className="w-full line-clamp-2 font-semibold mt-3">
              {post.title}
            </h3>
          </div>
        ))}
      </ScrollMenu>
      <div>DIO BELVA</div>
    </div>
  );
};

const DEFAULT_IMAGE = ""; // @TODO Ask Bea to do a nice default image

// export const Carouselsss: React.FC<CarouselProps> = ({ posts, locale }) => {
//   return (
//     <>
//       <div className="max-w-full overflow-hidden">
//         <ScrollMenu
//           wrapperClassName="relative scroll-menu-wrapper"
//           // LeftArrow={LeftArrow}
//           // RightArrow={RightArrow}
//         >
//           <SwiperSlide>
//             <div className="flex flex-col">
//               <Link
//                 href={posts[0].href}
//                 className="w-[250px] h-[450px] relative rounded-2xl drop-shadow-lg"
//                 prefetch={false}
//               >
//                 <Image
//                   className="rounded-xl"
//                   sizes="100%"
//                   fill
//                   src={posts[0].thumbnailImage?.url || DEFAULT_IMAGE}
//                   alt={posts[0].thumbnailImage?.description || "default image"}
//                   loading="lazy"
//                   style={{ objectFit: "contain" }}
//                 />
//               </Link>

//               <div>{posts[0].title}</div>
//             </div>
//           </SwiperSlide>
//           <SwiperSlide>
//             <div className="flex flex-col">
//               <Link
//                 href={posts[1].href}
//                 className="w-[250px] h-[450px] relative rounded-2xl drop-shadow-lg"
//                 prefetch={false}
//               >
//                 <Image
//                   className="rounded-xl"
//                   sizes="100%"
//                   fill
//                   src={posts[1].thumbnailImage?.url || DEFAULT_IMAGE}
//                   alt={posts[1].thumbnailImage?.description || "default image"}
//                   loading="lazy"
//                   style={{ objectFit: "contain" }}
//                 />
//               </Link>

//               <div>{posts[1].title}</div>
//             </div>
//           </SwiperSlide>
//           <SwiperSlide>
//             <div className="flex flex-col">
//               <Link
//                 href={posts[1].href}
//                 className="w-[250px] h-[450px] relative rounded-2xl drop-shadow-lg"
//                 prefetch={false}
//               >
//                 <Image
//                   className="rounded-xl"
//                   sizes="100%"
//                   fill
//                   src={posts[1].thumbnailImage?.url || DEFAULT_IMAGE}
//                   alt={posts[1].thumbnailImage?.description || "default image"}
//                   loading="lazy"
//                   style={{ objectFit: "contain" }}
//                 />
//               </Link>

//               <div>{posts[1].title}</div>
//             </div>
//           </SwiperSlide>
//           {/* <SwiperSlide>Slide 3</SwiperSlide>
//           <SwiperSlide>Slide 4</SwiperSlide> */}
//         </ScrollMenu>
//       </div>

//       {/* <CarouselProvider
//         naturalSlideWidth={250}
//         naturalSlideHeight={650}
//         totalSlides={posts.length}
//       >
//         <Slider>
//           {posts.map(({ href, thumbnailImage, title }, i) => (
//             <Slide index={i} key={i}>
//               <div className="flex flex-col">
//                 <Link
//                   href={href}
//                   className="w-[250px] h-[450px] relative rounded-2xl drop-shadow-lg"
//                   prefetch={false}
//                 >
//                   <Image
//                     className="rounded-xl"
//                     sizes="100%"
//                     fill
//                     src={thumbnailImage?.url || DEFAULT_IMAGE}
//                     alt={thumbnailImage?.description || "default image"}
//                     loading="lazy"
//                     style={{ objectFit: "contain" }}
//                   />
//                 </Link>

//                 <div>{title}</div>
//               </div>
//             </Slide>
//           ))}
//         </Slider>

//         <ButtonBack>Back</ButtonBack>
//         <ButtonNext>Next</ButtonNext>
//       </CarouselProvider> */}
//     </>
//   );
// };

// // export default Carousel;

// // import Image from "next/image";
// // import Link from "next-intl/link";

// // import type { AppLocale, Post as IPost } from "@/types/global";
// // import { formatDate, getFormat } from "@/utils/date";

// // const DEFAULT_IMAGE = ""; // @TODO Ask Bea to do a nice default image

// // interface PostProps {
// //   posts: IPost[];
// //   locale: AppLocale;
// // }

// // export const Carousel: React.FC<PostProps> = ({
// //   posts,
// //   locale,
// // }) => {

// //   return (
// //     <Link
// //       href={href}
// //       className="flex items-end w-full aspect-square relative bg-gray-200 rounded-2xl drop-shadow-lg bg-gray-400"
// //       prefetch={false}
// //     >
// //       <Image
// //         className="rounded-2xl"
// //         sizes="100%"
// //         fill
// //         src={thumbnailImage?.url || DEFAULT_IMAGE}
// //         alt={thumbnailImage?.description || "default image"}
// //         loading="lazy"
// //         style={{ objectFit: "cover" }}
// //       />

// //       <div className="flex flex-col z-10 text-black p-6 rounded-b-lg bg-white/75">
// //         <h3 className="text-3xl text-black font-semibold">{title}</h3>

// //         <div className="flex items-center my-2 uppercase tracking-widest text-regular">
// //           <span>{category}</span>
// //           <div className="border-r-2 border-black h-3 mx-2" />
// //           <span>
// //             {formatDate({
// //               date: new Date(date),
// //               format: getFormat(locale),
// //               locale,
// //             })}
// //           </span>
// //         </div>

// //         <span className="text-lg line-clamp-2">
// //           {smallIntro}
// //         </span>
// //       </div>
// //     </Link>
// //   );
// // };
