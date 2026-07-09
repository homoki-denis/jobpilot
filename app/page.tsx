// 2. Internal imports
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/homepage/Hero";
import { Features } from "@/components/homepage/Features";
import { Testimonial } from "@/components/homepage/Testimonial";
import { CTASection } from "@/components/homepage/CTASection";
import { createInsforgeServer } from "@/lib/insforge-server";

// 4. Component
async function Home() {
  const insforge = await createInsforgeServer();
  const {
    data: { user },
  } = await insforge.auth.getCurrentUser();
  const isAuthenticated = !!user;

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <main className="flex-1">
        <Hero isAuthenticated={isAuthenticated} />
        <Features />
        <Testimonial />
        <CTASection isAuthenticated={isAuthenticated} />
      </main>
      <Footer />
    </>
  );
}

export default Home;
