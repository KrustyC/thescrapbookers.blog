import { getTranslations } from "next-intl/server";

import { SectionWithTitle } from "../SectionWIthTitle/SectionWithTitle";

import { SmallNotePost } from "./SmallNotePost";
import { SmallNotesSectionSkeleton } from "./SmallNotesSectionSkeleton";

import type { AppLocale,} from "@/types/global";
import { getPostsByTag } from "@/utils/api";

export default async function SmallNotesSection({
  locale,
}: {
  locale: AppLocale;
}) {
  const t = await getTranslations("Home.SmallNotes");

  try {
    const { posts } = await getPostsByTag({ tag: "smallnoteHome", locale });

    return (
      <SectionWithTitle title={t("title")} greyBackground>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-y-12 gap-x-16">
          {posts.map((post, i) => (
            <SmallNotePost key={i} post={post} locale={locale} />
          ))}
        </div>
      </SectionWithTitle>
    );
  } catch (error) {
    return (
      <SectionWithTitle title={t("title")} greyBackground>
        <div className="flex flex-col">
          <h4 className="text-3xl mb-4">{t("error1")}</h4>
          <span className="text-xl">{t("error2")}</span>
        </div>
      </SectionWithTitle>
    );
  }
}

export { SmallNotesSectionSkeleton };
