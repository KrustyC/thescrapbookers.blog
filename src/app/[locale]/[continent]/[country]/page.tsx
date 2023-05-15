import { Metadata } from "next";
import { AppLocale } from "types/global";
import { getCountry } from "utils/api";

interface CountryPageProps {
  params: {
    country: string;
    locale: AppLocale;
  };
}

/**
 *
 * @TODO This is not yet supported by next-intl, but once it is it should be addded, in order to
 * build static pages at build time and therefore improve performance
 *
 */
// export async function generateStaticParams() {
//   return ["en", "it"].map((locale) => ({
//     locale,
//   }));
// }

export async function generateMetadata({
  params: { country: countrySlug, locale },
}: CountryPageProps): Promise<Metadata> {
  const { country } = await getCountry(countrySlug, locale);

  const title = country.name;
  const description = country.metaDescription;
  const images = [
    {
      url: new URL(country.mainImage.url),
      height: country.mainImage.details.height || 569,
      width: country.mainImage.details.width || 853,
    },
  ];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: country.name,
      description: country.metaDescription,
      images,
    },
  };
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { country } = await getCountry(params.country, params.locale);

  return (
    <div className="flex flex-col">
      <div className="w-[1024px] mx-auto py-24">
        <h1 className="text-6xl font-bold">{country.name}</h1>

        {country.description && (
          <div className="text-xl">{country.description}</div>
        )}
      </div>
    </div>
  );
}
