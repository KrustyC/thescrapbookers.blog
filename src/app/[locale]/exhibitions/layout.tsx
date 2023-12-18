import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { AppLocale } from "@/types/global";

export default function ExhibitionsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: AppLocale };
}) {
  return (
    <div>
      <Navbar blackText locale={params.locale} />

      <div className="pt-24">{children}</div>

      <Footer locale={params.locale} />
    </div>
  );
}
