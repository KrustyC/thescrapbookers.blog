import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { getTranslations } from "next-intl/server";

import { ExhibitionHero } from "@/components/exhibition/ExhibitionHero";
import { Shop } from "@/components/exhibition/Shop";
import { Footer } from "@/components/Footer";
import { getExhibition } from "@/graphql/queries/get-exhibition.query";
import { ArticleNotFoundIcon } from "@/icons/ArticleNotFound";
import { AppLocale } from "@/types/global";
import { Link } from "@/utils/navigation";
import { createAlternates } from "@/utils/urls";

interface ExhibitionPageProps {
  params: {
    slug: string;
    locale: AppLocale;
  };
}

export async function generateMetadata({
  params: { slug, locale },
}: ExhibitionPageProps): Promise<Metadata> {
  try {
    const { isEnabled } = draftMode();
    const { exhibition } = await getExhibition({
      slug,
      locale,
      isPreview: isEnabled,
    });

    if (!exhibition) {
      return {};
    }

    const title = exhibition.title;
    const description = `exhibition.description`; // @TODO Fix this somehow

    const images = exhibition.mainImage?.url
      ? [
          {
            url: new URL(exhibition.mainImage.url),
            height: exhibition.mainImage?.details.height || 569,
            width: exhibition.mainImage?.details.width || 853,
          },
        ]
      : [];

    return {
      title,
      description,
      alternates: exhibition.href
        ? createAlternates({ path: exhibition.href })
        : undefined,
      openGraph: {
        title,
        description,
        siteName: "The Scrapbookers",
        images,
        locale,
        url: new URL(
          `${locale === "it" ? `/${locale}` : ""}${exhibition.href || ""}`,
          process.env.NEXT_PUBLIC_BASE_URL
        ),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images,
      },
    };
  } catch (error) {
    return {};
  }
}

export default async function ExhibitionPage({
  params: { slug, locale },
}: ExhibitionPageProps) {
  const { isEnabled } = draftMode();
  const { exhibition } = await getExhibition({
    slug,
    locale,
    isPreview: isEnabled,
  });

  const t = await getTranslations({ locale, namespace: "Exhibition" });

  if (!exhibition) {
    return (
      <div className="flex flex-col items-center justify-center w-full py-12">
        <ArticleNotFoundIcon className="h-[180px] w-[320px] lg:h-[480px] lg:w-[620px]" />
        <h2 className="text-2xl lg:text-3xl w-[320px] mt-8 text-center">
          {t("notFound.message")}
        </h2>
        <Link
          href="/"
          className="bg-black px-6 pt-2 pb-4 w-fit font-bold inline-block mt-8"
        >
          <span className="text-xl text-white">{t("notFound.cta")}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 right-0 flex flex-col">
      <ExhibitionHero title={exhibition.title} image={exhibition.mainImage} />

      <div className="flex flex-col items-center justify-center w-full h-48 py-12">
        Ciao
      </div>

      <Shop />

      <Footer locale={locale} />
    </div>
  );
}
