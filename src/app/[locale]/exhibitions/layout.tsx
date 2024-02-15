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
      <Navbar locale={params.locale} />

      <div className="pt-24">{children}</div>
    </div>
  );
}
