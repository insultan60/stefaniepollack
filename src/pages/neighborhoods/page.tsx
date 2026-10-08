import PageHero from "@/components/feature/PageHero";
import FaqList from "@/components/feature/FaqList";
import Intro from "./components/Intro";
import NeighborhoodGrid from "./components/NeighborhoodGrid";
import CloserLook from "./components/CloserLook";
import CTASection from "../home/components/CTASection";

const faqs = [
  {
    q: "How do I choose a neighborhood in Los Angeles?",
    a: "Start with your budget, commute, and daily routine. Then visit each area at different times of day, including weekends. Stefanie can narrow the list and show you recent sales in each one.",
  },
  {
    q: "Is the San Fernando Valley part of Los Angeles?",
    a: "Much of it is. Studio City, Sherman Oaks, and Encino are neighborhoods in the City of Los Angeles. A few Valley cities, such as Burbank, are separate.",
  },
  {
    q: "Is Beverly Hills part of the City of Los Angeles?",
    a: "No. Beverly Hills is its own city, surrounded by Los Angeles, with its own city government.",
  },
  {
    q: "What if my neighborhood isn't listed?",
    a: "Contact Stefanie. She will tell you if she can help in that area.",
  },
];

export default function Neighborhoods() {
  return (
    <div className="w-full">
      <PageHero
        eyebrow="Neighborhood Guides"
        title="Los Angeles Neighborhoods,"
        italicTitle="Block by Block"
        subtitle="Local real estate knowledge for Studio City, Sherman Oaks, Encino, Beverly Hills, and nearby communities."
        image="/images/stefanie/lifestyle-2.jpg"
        imageAlt="Stefanie Pollack, Los Angeles real estate agent"
      />
      <Intro />
      <NeighborhoodGrid />
      <CloserLook />
      <section className="w-full bg-background-50 py-20 md:py-28">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <FaqList
            title={
              <>
                Los Angeles Neighborhood <span className="italic font-normal">FAQs</span>
              </>
            }
            faqs={faqs}
          />
        </div>
      </section>
      <CTASection
        title="Not Sure Which"
        italicTitle="Neighborhood Fits?"
        text="Tell Stefanie your budget and plans. She will help you compare Studio City, Sherman Oaks, Encino, Beverly Hills, and more."
      />
    </div>
  );
}
