import Hero from "./components/Hero";
import BuyerSellerCTA from "./components/BuyerSellerCTA";
import About from "./components/About";
import Articles from "./components/Articles";
import Stats from "./components/Stats";
import FeaturedProperties from "./components/FeaturedProperties";
import Neighborhoods from "./components/Neighborhoods";
import Testimonials from "./components/Testimonials";
import HowItWorks from "./components/HowItWorks";
import OfficeMap from "./components/OfficeMap";
import CTASection from "./components/CTASection";
import Newsletter from "./components/Newsletter";
import UpcomingEvent from "../philanthropy/components/UpcomingEvent";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <BuyerSellerCTA />
      {/* The next community event (Howl-O-Ween, Oct 30, 2026). Remove after it. */}
      <UpcomingEvent large className="py-20 md:py-28 lg:py-32" />
      <About />
      <Stats />
      <FeaturedProperties />
      <Neighborhoods />
      <Testimonials />
      <HowItWorks />
      <Articles />
      <OfficeMap />
      <CTASection />
      <Newsletter />
    </div>
  );
}
