import Link from "next-intl/link";

import { Country } from "@/types/global";
import { poppins } from "@/utils/fonts";

interface BreadcrumbsProps {
  country: Pick<Country, "name" | "slug" | "continent">;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ country }) => {
  const { continent } = country;

  return (
    <div className={`flex text-xl gap-x-2 text-white ${poppins.className}`}>
      <Link href={`/${continent?.slug}`} prefetch={false}>
        {continent?.name}
      </Link>

      <span className="font-bold mx-2 text-white">/</span>

      <Link href={`/${continent?.slug}/${country.slug}`} prefetch={false}>
        {country.name}
      </Link>
    </div>
  );
};
