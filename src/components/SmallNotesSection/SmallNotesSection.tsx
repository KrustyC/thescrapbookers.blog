import { getTranslations } from "next-intl/server";
import type { AppLocale, Post as IPost } from "types/global";
import { SectionWithTitle } from "../SectionWIthTitle/SectionWithTitle";
import { SmallNotePost } from "./SmallNotePost";
import { SmallNotesSectionSkeleton } from "./SmallNotesSectionSkeleton";

async function getSmallNotes(): Promise<{ posts: IPost[] }> {
  const url = `${process.env.baseUrl}/post/api?tag=smallnoteHome`;
  // const res = await fetch(url, { next: { revalidate: 0 } });
  const res = await fetch(url, { next: { revalidate: 86400 } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function SmallNotesSection({
  locale,
}: {
  locale: AppLocale;
}) {
  const { posts } = await getSmallNotes();

  const t = await getTranslations("Home.SmallNotes");

  return (
    <SectionWithTitle title={t("title")} greyBackground>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-y-12 gap-x-16">
        {posts.map((post, i) => (
          <SmallNotePost key={i} post={post} locale={locale} />
        ))}
      </div>
    </SectionWithTitle>
  );
}

export { SmallNotesSectionSkeleton };
