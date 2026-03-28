import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Gallery from "@/components/Gallery";
import UpcomingEvents from "@/components/UpcomingEvents";
import ExploreDestinations from "@/components/ExploreDestinations";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-blue-50 selection:bg-indigo-500/10">
      <Navbar />
      <Hero />
      <Stats />
      <UpcomingEvents />
      <ExploreDestinations />
      <Gallery />
      <Testimonials />
      <Footer />
    </main>
  );
}
