import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { AppLocale } from "@/types/global";

export default async function GenericLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = await params;

  return (
    <div>
      <Navbar locale={locale as AppLocale} />

      <div>{children}</div>

      <Footer locale={locale as AppLocale} />
    </div>
  );
}
