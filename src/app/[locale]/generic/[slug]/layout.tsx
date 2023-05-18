import { Footer } from "components/Footer";
import { Navbar } from "components/Navbar";
import { AppLocale } from "types/global";

export default function GenericLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: AppLocale };
}) {
  return (
    <div>
      <Navbar locale={params.locale} />

      <div>{children}</div>

      <Footer locale={params.locale} />
    </div>
  );
}
