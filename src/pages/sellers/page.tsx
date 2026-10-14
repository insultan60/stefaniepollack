import { LineChart, Sparkles, Camera, Megaphone, Handshake, ClipboardCheck } from "lucide-react";
import PageHero from "@/components/feature/PageHero";
import ServicesGrid from "@/components/feature/ServicesGrid";
import ProcessSteps from "@/components/feature/ProcessSteps";
import CostsSection from "@/components/feature/CostsSection";
import AreaLinks from "@/components/feature/AreaLinks";
import ReviewGrid from "@/components/feature/ReviewGrid";
import FaqList from "@/components/feature/FaqList";
import Intro from "./components/Intro";
import CTASection from "../home/components/CTASection";
import { HOMEBOT_URL } from "@/lib/homebot";

/* Copy is from the client's sellers-page brief. It targets broad Los Angeles
   and Valley seller searches; neighborhood names stay on the neighborhood
   pages, which the short link cards below point to. */

const steps = [
  { title: "Meet and set goals.", text: "Stefanie learns your timeline and what you hope to net, then walks through your home." },
  { title: "Price it right.", text: "She builds a market analysis from recent nearby sales and recommends a list price." },
  { title: "Prepare and stage.", text: "You get a clear to-do list covering repairs, decluttering, and staging, and she can recommend trusted vendors." },
  { title: "Photograph and launch.", text: "Professional photos and video, then online marketing and the Compass network put your home in front of buyers." },
  { title: "Review offers.", text: "Stefanie vets every offer for price, terms, and risk, and negotiates for you." },
  { title: "Close escrow.", text: "She coordinates inspections, disclosures, and deadlines until the sale closes." },
];

const services = [
  {
    icon: LineChart,
    title: "Pricing Strategy",
    description:
      "A market analysis built on real, recent sales near you, so your price attracts strong offers fast and does not leave money on the table.",
  },
  {
    icon: Sparkles,
    title: "Staging Guidance",
    description:
      "Practical direction on decluttering, furniture, and styling so your home shows at its best. Home staging in Los Angeles can make a real difference in how buyers see your space.",
  },
  {
    icon: Camera,
    title: "Professional Photography",
    description: "High-resolution photos and video that make your listing stand out from the first day.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Targeted online ads and the reach of the Compass network to put your home in front of serious buyers.",
  },
  {
    icon: Handshake,
    title: "Skilled Negotiation",
    description: "Every offer is reviewed and negotiated, so you get the best terms overall, not just the highest number.",
  },
  {
    icon: ClipboardCheck,
    title: "Escrow Coordination",
    description: "Full coordination from accepted offer to closing, so nothing slips through the cracks.",
  },
];

const costs = [
  {
    title: "Agent Commission and Closing Costs",
    text: "Commission is negotiable, and Stefanie explains her fees and what they cover before you sign. Sellers also commonly pay escrow and title fees and transfer taxes, plus any agreed repair credits.",
  },
  {
    title: "Los Angeles Transfer Taxes",
    text: "Sales inside the City of Los Angeles can carry extra transfer taxes, and higher-priced sales may pay more. Stefanie helps you see how these affect your bottom line.",
  },
  {
    title: "Preparation Costs",
    text: "Small repairs, cleaning, and staging can raise what buyers will pay, but not every project pays off. She tells you which ones are worth it and which to skip.",
  },
];

/* Short link cards only: the buyers page carries the longer blurbs. */
const areas = [
  { name: "Studio City", linkText: "Selling a home in Studio City" },
  { name: "Sherman Oaks", linkText: "Sell your Sherman Oaks home" },
  { name: "Encino", linkText: "Encino real estate agent" },
  { name: "Beverly Hills", linkText: "Beverly Hills real estate agent" },
];

const faqs = [
  {
    q: "How do I know what my home is worth in Los Angeles?",
    a: "Start with the free home value tool, then ask Stefanie for a market analysis. An online estimate is a starting point. A comparison with recent nearby sales, adjusted for condition and upgrades, is more accurate.",
  },
  {
    q: "What is the best time to sell a house in Los Angeles?",
    a: "Spring is often busy, but the best time depends on your goals and your local market. Stefanie can tell you what is happening in your area now.",
  },
  {
    q: "Do I need to stage my home?",
    a: "Not always, but clean, decluttered, and well-styled homes usually show better in photos and in person. Stefanie advises which rooms matter most, so you do not spend more than you need to.",
  },
  {
    q: "How long will it take to sell my home?",
    a: "It depends on price, condition, and the market. Once you have an accepted offer, escrow commonly takes about a month.",
  },
  {
    q: "Should I fix things before I list?",
    a: "Sometimes. Safety and major issues are worth handling, while cosmetic projects may not pay back. Stefanie will go through the home with you and tell you which are worth doing.",
  },
  {
    q: "Can I sell without listing publicly?",
    a: "In some cases, yes. Private sales and early marketing to select buyers can work, but a public listing usually brings more exposure. Stefanie explains the trade-offs for your home.",
  },
];

export default function Sellers() {
  return (
    <div className="w-full">
      <PageHero
        eyebrow="Sellers"
        title="Sell Your Los Angeles Home"
        italicTitle="With Confidence"
        subtitle="Stefanie Pollack is a Los Angeles listing agent who brings on-point pricing, standout staging, savvy marketing, and stellar negotiation."
        image="/images/stefanie/lifestyle-5.jpg"
        imageAlt="Stefanie Pollack, Los Angeles listing agent"
      />
      <Intro />
      <ProcessSteps
        eyebrow="How It Works"
        title="How to Sell a House in California,"
        italicTitle="Step by Step"
        intro="Here is how to sell your home in Los Angeles, from the first call to closing."
        steps={steps}
      />
      <ServicesGrid
        eyebrow="How I Help"
        title="What a Listing Agent Does"
        italicTitle="for You in Los Angeles"
        services={services}
        image="/images/stefanie/headshot.jpg"
        imageAlt="Stefanie Pollack, Los Angeles listing agent"
      />
      <CostsSection
        eyebrow="Know the Numbers"
        title="What It Costs to Sell"
        italicTitle="a House in California"
        intro="Selling costs come out of your sale price, so it helps to see them early. Stefanie gives you a written estimate of your net proceeds before you list, based on your home and your mortgage balance."
        topics={costs}
        note="Stefanie is a real estate agent, not a tax or legal advisor. Speak with a tax professional about any taxes on your sale."
        button={{ label: "Get Your Free Home Value", href: HOMEBOT_URL, external: true }}
      />
      <AreaLinks
        eyebrow="Neighborhoods"
        title="Where Stefanie Sells Homes"
        italicTitle="in Los Angeles and the Valley"
        intro="Selling a home starts with knowing your local market. Pick your area to see how Stefanie approaches it."
        areas={areas}
      />
      <ReviewGrid
        title="What Sellers Say"
        italicTitle="About Working With Stefanie"
        intro="Reviews from sellers across Los Angeles and the San Fernando Valley."
        authors={["Grace V.", "Melissa S.", "Leanne S."]}
      />
      <section className="w-full bg-background-50 py-20 md:py-28">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <FaqList
            title={
              <>
                Home Seller <span className="italic font-normal">FAQs</span>
              </>
            }
            faqs={faqs}
          />
        </div>
      </section>
      <CTASection
        title="Ready to Sell"
        italicTitle="Your Los Angeles Home?"
        text="Whether you plan to list this spring or just want to know your options, a short conversation is the best first step. Tell Stefanie about your home and your goals, and she will show you what it could sell for."
        image="/images/neighborhoods/sherman-oaks.jpg"
        imageAlt="Condo in Sherman Oaks sold by Stefanie Pollack"
        primary={{ label: "Get Your Free Home Value", href: HOMEBOT_URL, external: true }}
        secondary={{ label: "Schedule a Meeting", href: "/schedule" }}
      />
    </div>
  );
}
