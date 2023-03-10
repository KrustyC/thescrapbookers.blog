import { SectionWithTitle } from "./SectionWIthTitle/SectionWithTitle";

interface IPost {
  title: string;
  category: string;
}

const Post: React.FC<IPost> = ({ title, category }) => {
  return (
    <div className="flex flex-col w-full">
      <h3 className="text-3xl mb-4 text-black">{title}</h3>
      <div className="flex items-center mt-4 text-gray-400 uppercase tracking-widest">
        <span>{category}</span>
      </div>
    </div>
  );
};

const POSTS = [
  {
    title: '"Definitely not jet lagged"',
    category: "Lifestyle",
  },
  {
    title: "What surprised us about Buddhism",
    category: "Religion",
  },
  {
    title: "1o local things we know about Thailand",
    category: "Culture",
  },
  {
    title: "Yes or no to social media?",
    category: "Lifestyle",
  },
];

export const SmallNotes: React.FC = () => {
  return (
    <SectionWithTitle title="Small Notes" greyBackground>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-16">
        {POSTS.map((post, i) => (
          <Post key={i} {...post} />
        ))}
      </div>
    </SectionWithTitle>
  );
};
