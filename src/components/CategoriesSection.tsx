import { poppins } from "@/utils/fonts";

import { SectionWithTitle } from "./SectionWIthTitle/SectionWithTitle";

interface ICategory {
  name: string;
  slug: string;
}

// Maybe leverage components to perform their own api call as they can all be separate

const Category: React.FC<ICategory> = ({ name }) => {
  return (
    <div className="flex w-full bg-[green] items-center py-5 px-8">
      <div
        style={poppins.style}
        className="flex items-center py-5 px-8 bg-white text-lg font-semibold min-w-32"
      >
        {name}
      </div>
    </div>
  );
};

const CATEGORIES: ICategory[] = [
  { name: "Nature", slug: "/" },
  { name: "Lifestyle", slug: "/" },
  { name: "Travel", slug: "/" },
  { name: "Food", slug: "/" },
  { name: "Experience", slug: "/" },
];

export const CategoriesSection: React.FC = () => {
  return (
    <SectionWithTitle title="Chiang Mai">
      <div className="flex gap-16">
        {/* @TODO Need to put something here */}
        <div className="w-7/12 bg-gray-200" />

        <div className="w-5/12 flex flex-col">
          <h3 className="text-3xl mt-4 text-black mb-8">Categories</h3>

          <div className="flex flex-col gap-y-8">
            {CATEGORIES.map((category, i) => (
              <Category key={i} {...category} />
            ))}
          </div>
        </div>
      </div>
    </SectionWithTitle>
  );
};
