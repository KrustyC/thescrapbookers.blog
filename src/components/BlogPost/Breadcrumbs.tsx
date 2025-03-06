import { Country } from "@/types/global";
import { Link } from "@/i18n/navigation";

interface BreadcrumbsProps {
  country: Pick<Country, "name" | "slug" | "continent">;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ country }) => {
  const { continent } = country;

  return (
    <div className="flex text-xl gap-x-2 text-white font-poppins">
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
