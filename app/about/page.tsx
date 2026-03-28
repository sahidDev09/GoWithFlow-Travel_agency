import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";

export const metadata = {
  title: "About Us | GoWithFlow",
  description: "Learn more about GoWithFlow, our story, mission, vision, and the team leading the way in luxury travel experiences.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 selection:bg-indigo-500/10">
      <Navbar />
      <AboutUs />
      <Footer />
    </main>
  );
}
