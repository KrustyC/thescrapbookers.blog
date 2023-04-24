import { Navbar } from "components/Navbar";
import { Footer } from "components/Footer";
import { AppLocale } from "types/global";
import { useTranslations } from "next-intl";

export default function PostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: AppLocale };
}) {
  const t = useTranslations("Global.LocaleSwitch");

  return (
    <div>
      <Navbar locale={params.locale} helpText={t("helpText")} />

      <div>{children}</div>

      <Footer />
    </div>
  );
}
