import { CheatsheetLoading } from "@/components/country/Cheatsheet/Cheatsheet";
import { CountryHeroLoading } from "@/components/country/CountryHero";

export default function CountryLoading() {
  return (
    <div>
      <CountryHeroLoading />

      <div className="px-8 lg:px-24 xl:px-48 pt-12 lg:pt-32 pb-12 lg:pb-24">
        <CheatsheetLoading />
      </div>
    </div>
  );
}
