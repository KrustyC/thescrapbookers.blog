import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { AppLocale } from "@/types/global";

export default async function GenericLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;

  return (
    <div>
      <Navbar locale={locale} />

      <div>{children}</div>

      <Footer locale={locale} />
    </div>
  );
}
