import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ExploreDestinations from "@/components/ExploreDestinations";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-indigo-500/10">
      <Navbar />
      <Hero />
      <ExploreDestinations />
    </main>
  );
}
