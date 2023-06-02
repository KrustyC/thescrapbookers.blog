import { ContinentHeroLoading } from "@/components/continent/ContinentHero";
import { CountryLoading } from "@/components/continent/Country";

export default function PostLoading() {
  return (
    <div>
      <ContinentHeroLoading />

      <div className="flex flex-col gap-y-16 px-8 lg:px-24 xl:px-48 pt-12 lg:pt-32 pb-12 lg:pb-24">
        {Array.from({ length: 3 }).map((_, i) => (
          <CountryLoading key={i} />
        ))}
      </div>
    </div>
  );
}
