import { useTranslations } from "next-intl";

import { AppLocale } from "@/types/global";

import { HeroContent } from "./HeroContent";

interface HeroProps {
  locale: AppLocale;
}

export const Hero: React.FC<HeroProps> = ({ locale }) => {
  const heroCopy = useTranslations("Home.Hero");
  const localeDropdownCopy = useTranslations("Global.LocaleSelector");
  const navbarCopy = useTranslations("Global.NavbarLinks");

  return (
    <div className="md:p-8">
      <HeroContent
        locale={locale}
        heroCopy={{
          title: heroCopy("title"),
          subtitle: heroCopy("subtitle"),
          heroImgAlt: heroCopy("heroImgAlt"),
        }}
        localeDropdownCopy={{
          optionEnglish: localeDropdownCopy("optionEnglish"),
          optionItalian: localeDropdownCopy("optionItalian"),
        }}
        navbarCopy={{
          asia: navbarCopy("asia"),
          aboutUs: navbarCopy("aboutUs"),
          allArticles: navbarCopy("allArticles"),
        }}
      />
    </div>
  );
};
