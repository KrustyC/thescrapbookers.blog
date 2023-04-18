import { useTranslations } from "next-intl";

export const metadata = {
  title: "A lil introduction",
  description: "Brief introduction to the blog post by us",
  generator: "Next.js",
  keywords: [
    "Travel",
    "South East Asia",
    "Introduction",
    "About Us",
    "AboutWhy we do it",
  ],
  authors: [
    { name: "Davide Crestini", url: "https://dcrestini.me" },
    { name: "Beatrice Cox", url: "https://beatricecox.com" },
  ],
  creator: "Davide Crestini",
  publisher: "Beatrice Cox",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  twitter: {
    card: "summary_large_image",
    title: "A lil introduction",
    description: "Brief introduction to the blog post by us",
    // siteId: '1467726470533754880',
    // creator: '@nextjs',
    // creatorId: '1467726470533754880',
    // images: ['https://nextjs.org/og.png'],
  },
  // images: [
  //   {
  //     url: 'https://nextjs.org/og.png',
  //     width: 800,
  //     height: 600,
  //   },
  //   {
  //     url: 'https://nextjs.org/og-alt.png',
  //     width: 1800,
  //     height: 1600,
  //     alt: 'My custom alt',
  //   },
  // ],
};

export default function ALilIntroductionPage() {
  const t = useTranslations("AboutUs");
  const bea = useTranslations("AboutUs.Beatrice");
  const davide = useTranslations("AboutUs.Davide");
  const generic = useTranslations("AboutUs.Generic");

  return (
    <div className="flex flex-col py-6 lg:py-8">
      <div className="flex flex-col items-center">
        <h1 className="rich-text-copy text-6xl font-semibold text-left pt-12 pb-16">
          {t("title")}
        </h1>
      </div>

      <div className="introduction-letter">
        <p>{bea("firstParagraph")}</p>
        <p>{bea("secondParagraph")}</p>
        <p>{bea("thirdParagraph")}</p>
        <p>{bea("fourthParagraph")}</p>
        <p>{bea("fifthParagraph")}</p>
        <p>{bea("sixthParagraph")}</p>

        <span className="font-bold">Beatrice</span>
      </div>

      <div className="introduction-letter">
        <p>{davide("firstParagraph")}</p>
        <p>{davide("secondParagraph")}</p>
        <p>{davide("thirdParagraph")}</p>
        <p>{davide("fourthParagraph")}</p>
        <p>{davide("fifthParagraph")}</p>

        <span className="font-bold">Davide</span>
      </div>

      <div className="rich-text-copy flex flex-col gap-y-6 text-2xl">
        <p>{generic("firstParagraph")}</p>
        <p>{generic("secondParagraph")}</p>
        <p>{generic("thirdParagraph")}</p>
      </div>
    </div>
  );
}
