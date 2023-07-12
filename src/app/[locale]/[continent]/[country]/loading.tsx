import { CheatsheetLoading } from "@/components/country/Cheatsheet/Cheatsheet";
import { CountryHeroLoading } from "@/components/country/CountryHero";
import { PostCardLoading } from "@/components/PostCard/PostCard";

export default function CountryLoading() {
  return (
    <div>
      <CountryHeroLoading />

      <div className="px-8 lg:px-24 xl:px-48 pt-12 lg:pt-32 pb-12 lg:pb-24">
        <CheatsheetLoading />
      </div>

      <div className="px-8 lg:px-24 xl:px-48 mt-8 mb-24">
        <div className="w-full 2xl:w-max 2xl:mx-auto flex flex-col">
          <div className="w-2/3 mb-12 animate-pulse h-10 pulse bg-gray-300" />

          <div className="grid gap-x-12 gap-y-16 grid-cols-1 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <PostCardLoading key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
