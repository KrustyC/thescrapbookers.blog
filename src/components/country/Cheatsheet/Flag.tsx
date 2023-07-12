import {
  CambodiaFlag,
  IndonesiaFlag,
  JapanFlag,
  LaosFlag,
  MalaysiaFlag,
  SingaporeFlag,
  SouthKoreaFlag,
  ThailandFlag,
  VietnamFlag,
} from "@/components/flags";

const FlagIcon: React.FC<{ slug: string }> = ({ slug }) => {
  switch (slug) {
    case "cambodia":
      return <CambodiaFlag />;
    case "indonesia":
      return <IndonesiaFlag />;
    case "japan":
      return <JapanFlag />;
    case "laos":
      return <LaosFlag />;
    case "malaysia":
      return <MalaysiaFlag />;
    case "singapore":
      return <SingaporeFlag />;
    case "south-korea":
      return <SouthKoreaFlag />;
    case "thailand":
      return <ThailandFlag />;
    case "vietnam":
      return <VietnamFlag />;
    default:
      return null;
  }
};

export const Flag: React.FC<{ slug: string }> = ({ slug }) => {
  return (
    <div className="flex w-28 h-fit rounded-xl drop-shadow-lg">
      <FlagIcon slug={slug} />
    </div>
  );
};
