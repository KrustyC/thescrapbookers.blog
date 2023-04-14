import IntroductionPost from "components/IntroductionPost";

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
  locale: "en-GB",
  type: "website",
};

export default function ALilIntroductionPage() {
  return (
    <div>
      <IntroductionPost />
    </div>
  );
}
