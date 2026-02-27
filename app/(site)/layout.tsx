import Link from "next/link";
import Footer from "../components/Footer";
import SiteHeader from "../components/SiteHeader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="main-content" className="min-h-dvh flex flex-col items-center relative">
      <SiteHeader />

      {children}
      <Footer />
    </main>
  );
}
