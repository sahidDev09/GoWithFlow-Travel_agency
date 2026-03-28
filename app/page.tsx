import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ExploreDestinations from "@/components/ExploreDestinations";
import UpcomingEvents from "@/components/UpcomingEvents";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-blue-50 selection:bg-indigo-500/10">
      <Navbar />
      <Hero />
      <UpcomingEvents />
      <ExploreDestinations />
      <Footer />
    </main>
  );
}
