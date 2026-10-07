/** The homepage FAQ. One list for both places it appears: the visible FAQ
 *  (pages/home/components/HowItWorks.tsx) and the FAQPage entry in the
 *  homepage schema (scripts/prerender.mjs). Google expects the two to match
 *  word for word, so edit the text here only. */
export const HOME_FAQS: { q: string; a: string }[] = [
  {
    q: "How do I choose between Los Angeles real estate agents?",
    a: "Start with local sales that match your home type and price range. Ask how each agent prices, markets, and negotiates, then read recent client reviews. Meet at least two agents before you decide.",
  },
  {
    q: "What makes a top real estate agent in Los Angeles?",
    a: "Look for steady sales in your area, clear communication, and strong negotiation. Awards help, but results on homes like yours matter more. Ask any agent for recent examples.",
  },
  {
    q: "Is Studio City part of Los Angeles?",
    a: "Yes. Studio City is a neighborhood in the City of Los Angeles, in the San Fernando Valley. Stefanie is based there and works across the wider Los Angeles area.",
  },
  {
    q: "What does a certified negotiator do for me?",
    a: "A certified negotiator has trained in negotiation methods. Stefanie uses that training to push for a better price, cleaner terms, and fair repair requests.",
  },
  {
    q: "How long does selling a house in Los Angeles take?",
    a: "It depends on price, condition, and the neighborhood. Stefanie reviews nearby sales and gives you a realistic range in your first meeting.",
  },
  {
    q: "Does Stefanie work with first-time buyers?",
    a: "Yes. She helps first-time buyers set a budget, understand how offers and escrow work, and avoid common mistakes. She also works with move-up buyers, sellers, and investors.",
  },
];

