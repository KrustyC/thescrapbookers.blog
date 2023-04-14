import { Navbar } from "components/Navbar";
import { Footer } from "components/Footer";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />

      <div>{children}</div>

      <Footer />
    </div>
  );
}
