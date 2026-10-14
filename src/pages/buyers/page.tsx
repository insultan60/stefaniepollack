import { Search, LineChart, Handshake, Users, ClipboardCheck, KeyRound } from "lucide-react";
import PageHero from "@/components/feature/PageHero";
import ServicesGrid from "@/components/feature/ServicesGrid";
import ProcessSteps from "@/components/feature/ProcessSteps";
import CostsSection from "@/components/feature/CostsSection";
import AreaLinks from "@/components/feature/AreaLinks";
import ReviewGrid from "@/components/feature/ReviewGrid";
import FaqList from "@/components/feature/FaqList";
import Intro from "./components/Intro";
import CTASection from "../home/components/CTASection";

/* Copy is from the client's buyers-page brief. It targets broad Los Angeles
   and Valley buyer searches; neighborhood names stay on the neighborhood
   pages, which the cards below link to. */

const steps = [
  { title: "Set goals and budget.", text: "Stefanie learns your timeline, must-haves, and comfortable monthly payment." },
  { title: "Get pre-approved.", text: "A lender confirms what you can borrow, and sellers expect the letter with every offer." },
  { title: "Search and tour.", text: "She builds your search, including off-market homes through Compass, and gives you honest feedback after each showing." },
  { title: "Make an offer.", text: "She sets your price from recent sales and negotiates on price and terms." },
  { title: "Inspect and review.", text: "You review inspections and disclosures, then move ahead, ask for repairs, or renegotiate." },
  { title: "Close escrow.", text: "She tracks every deadline until you get your keys." },
];

const services = [
  {
    icon: Search,
    title: "Personalized Home Search",
    description:
      "A search built around your budget, must-haves, and timeline. Stefanie also watches for off-market homes through the Compass network, so you can see some homes before the public does.",
  },
  {
    icon: LineChart,
    title: "Market and Neighborhood Guidance",
    description:
      "Prices and lifestyles change from one Valley street to the next. Stefanie explains what you are paying for, from lot size and school zones to traffic and noise, so you pick the right area before you pick a house.",
  },
  {
    icon: Handshake,
    title: "Skilled Negotiation",
    description:
      "With more than 20 years in Los Angeles real estate and a background in finance, Stefanie negotiates on price, repairs, and terms. Her goal is the best overall deal for you, not just the lowest number.",
  },
  {
    icon: Users,
    title: "Trusted Local Network",
    description:
      "She connects you with lenders, inspectors, and contractors she knows and trusts, so you are not searching for them in the middle of escrow.",
  },
  {
    icon: ClipboardCheck,
    title: "Careful Due Diligence",
    description:
      "Stefanie reviews disclosures, inspection findings, and the property's history with you before you commit. If something looks wrong, she tells you, even when it means walking away.",
  },
  {
    icon: KeyRound,
    title: "Start-to-Finish Support",
    description:
      "You have one person from the first showing through closing day. After you move in, Stefanie stays a resource for contractors, local questions, and your next real estate decision.",
  },
];

const costs = [
  {
    title: "Down Payment and Loan Types",
    text: "How much you need depends on the loan. Conventional loans often start with a smaller down payment than many buyers expect, and FHA and VA loans have their own requirements. In much of Los Angeles, higher prices mean many buyers need a jumbo loan, which has different rules. A lender can tell you exactly what you qualify for, and Stefanie can introduce you to local lenders she trusts.",
  },
  {
    title: "Closing Costs",
    text: "Buyers also pay closing costs, which cover the lender, escrow and title services, and prepaid items like insurance and property taxes. They commonly add up to a few percent of the purchase price. Stefanie helps you estimate them up front and, where it makes sense, negotiate for the seller to cover part of them.",
  },
  {
    title: "First-Time Home Buyer Help",
    text: "If you are a first-time home buyer in Los Angeles, you may qualify for California programs that offer down payment help or lower rates. Programs change and have strict rules, so ask a lender early.",
  },
];

const areas = [
  {
    name: "Studio City",
    linkText: "Buying a home in Studio City",
    description: "Stefanie's home base, with walkable stretches on Ventura Boulevard, quiet residential streets, and homes in the hills above.",
  },
  {
    name: "Sherman Oaks",
    linkText: "Sherman Oaks homes for sale",
    description: "A large neighborhood with a mix of houses, condos, and hillside homes, close to the 101 and 405 freeways.",
  },
  {
    name: "Encino",
    linkText: "Encino real estate agent",
    description: "Known for larger lots on the flats and view homes in the hills, with plenty of options for buyers who want space.",
  },
  {
    name: "Beverly Hills",
    linkText: "Beverly Hills real estate",
    description: "A different market on the Westside, with luxury homes, condos, and estates, and its own city rules.",
  },
];

const faqs = [
  {
    q: "Do I need a buyer's agent to buy a house in Los Angeles?",
    a: "You are not required to have one, but a buyer's agent helps you price an offer against recent sales, read disclosures, and handle negotiations, which are the parts that cost buyers the most when they go wrong. They also find homes you might not see on your own, including some that sell privately.",
  },
  {
    q: "How much does a buyer's agent cost?",
    a: "Buyer agent pay is now spelled out in a written agreement you sign before touring homes, and the amount is negotiable. Stefanie explains how she is paid and who pays before you start, so there are no surprises later.",
  },
  {
    q: "How long does it take to buy a house in Los Angeles?",
    a: "Searching can take a few weeks or several months, depending on your budget and how specific your wish list is. Once your offer is accepted, escrow commonly takes about a month.",
  },
  {
    q: "What is an off-market home, and how can I see one?",
    a: "It is a home for sale that is not listed publicly. Agents hear about these through their networks and brokerage tools. Tell Stefanie what you are looking for, and she will let you know when a match comes up.",
  },
  {
    q: "Can I buy a new home before I sell my current one?",
    a: "Often yes, but it takes planning. Options include a bridge loan, a home equity line of credit, or a contingent offer, and each has trade-offs. Stefanie works with you and your lender to choose the safest approach.",
  },
  {
    q: "What makes an offer stand out when several buyers compete?",
    a: "Price is only part of it. Sellers also look at your pre-approval strength, how much you can put down, flexibility on timing, and fewer contingencies. Stefanie helps you decide which of these you can offer without taking on too much risk.",
  },
];

export default function Buyers() {
  return (
    <div className="w-full">
      <PageHero
        eyebrow="Buyers"
        title="Find Your Next Home"
        italicTitle="in Los Angeles"
        subtitle="Stefanie Pollack is a Los Angeles buyer's agent who guides you from pre-approval to closing, with an expert negotiator on your side."
        image="/images/stefanie/lifestyle-1.jpg"
        imageAlt="Stefanie Pollack, Los Angeles buyer's agent"
      />
      <Intro />
      <ProcessSteps
        eyebrow="How It Works"
        title="The Home Buying Process in California,"
        italicTitle="Step by Step"
        intro="Here is how to buy a house in Los Angeles, from the first call to the keys."
        steps={steps}
        button={{ label: "Start Your Home Search", href: "/contact" }}
      />
      <ServicesGrid
        eyebrow="How I Help"
        title="What a Buyer's Agent Does"
        italicTitle="for You in Los Angeles"
        services={services}
        image="/images/stefanie/portrait-1.jpg"
        imageAlt="Stefanie Pollack, Los Angeles buyer's agent"
      />
      <CostsSection
        eyebrow="Know the Numbers"
        title="What It Costs to Buy"
        italicTitle="a Home in Los Angeles"
        intro="Before you tour a single home, it helps to know what you will pay beyond the price. Stefanie walks every buyer through the numbers early, so there are no surprises when you make an offer."
        topics={costs}
        note="Stefanie is a real estate agent, not a lender or a financial advisor. Talk with a licensed lender about your own situation."
        button={{ label: "Talk With Stefanie About Your Budget", href: "/contact" }}
      />
      <AreaLinks
        eyebrow="Neighborhoods"
        title="Where Stefanie Helps Buyers"
        italicTitle="in Los Angeles and the Valley"
        intro="Stefanie works across the San Fernando Valley and parts of Los Angeles. Pick an area to see local homes, prices, schools, and what daily life looks like."
        areas={areas}
      />
      <ReviewGrid
        title="What Buyers Say"
        italicTitle="About Working With Stefanie"
        intro="Reviews from buyers across Los Angeles and the San Fernando Valley."
        authors={["Brian S.", "Denise K.", "Eric H."]}
      />
      <section className="w-full bg-background-50 py-20 md:py-28">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <FaqList
            title={
              <>
                Home Buyer <span className="italic font-normal">FAQs</span>
              </>
            }
            faqs={faqs}
          />
        </div>
      </section>
      <CTASection
        title="Ready to Find Your Home"
        italicTitle="in Los Angeles?"
        text="Whether you are just starting to look or have already saved a few listings, a short conversation is the best first step. Tell Stefanie what you want in a home, and she will tell you what to do next."
        image="/images/stefanie/lifestyle-2.jpg"
        imageAlt="Stefanie Pollack, Los Angeles real estate agent"
      />
    </div>
  );
}
