import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ExploreDestinations from "@/components/ExploreDestinations";
import UpcomingEvents from "@/components/UpcomingEvents";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-indigo-500/10">
      <Navbar />
      <Hero />
      <UpcomingEvents />
      <ExploreDestinations />
    </main>
  );
}
