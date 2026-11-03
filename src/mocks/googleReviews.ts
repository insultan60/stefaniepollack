/* Reviews from Stefanie's Google Business Profile, word for word.

   Collected Nov 2026 from the public listing ("Stefanie Pollack, Real Estate
   Agent // Compass Studio City", 5.0 from 34 reviews). The source showed each
   review's text, rating and date but not the reviewer's name, so `author` is
   left empty and the card says "Google review" instead. Add names from the
   profile if Stefanie is happy to show them.

   The first review is longer than the source showed; it is cut at the end of
   a sentence rather than mid-thought. The Oct 2023 "best Realtor in Studio
   City" review is left out because it is already on the site as Valerie B.

   To update the rating or count, change GOOGLE_RATING below. */

export const GOOGLE_PROFILE_URL =
  "https://www.google.com/search?q=Stefanie+Pollack,+Real+Estate+Agent&kgmid=/g/11hbgf0gvy";

export const GOOGLE_RATING = { rating: 5.0, count: 34 };

export type GoogleReview = {
  id: string;
  quote: string;
  /** Reviewer name, when known. */
  author?: string;
  /** Month and year shown on the card. */
  date: string;
  rating: number;
};

export const googleReviews: GoogleReview[] = [
  {
    id: "g-2025-11-16",
    quote:
      "Selling my home was a deeply personal and emotional process, and I cannot express how grateful I am to have had Stefanie Pollack by my side. From the very first conversation, I knew I was in the hands of someone who not only understood the housing market inside and out—but someone who genuinely cared about me and my experience. Her knowledge of both the broader real estate landscape and the Burbank market specifically is extraordinary. Stefanie walked me through every shift, every rate change, every question I had with such clarity and reassurance.",
    date: "Nov 2025",
    rating: 5,
  },
  {
    id: "g-2024-04-22",
    quote:
      "We are absolutely thrilled with the exceptional service provided by Stefanie Pollack, our neighbor and trusted Studio City realtor! From start to finish, she went above and beyond to ensure a smooth and successful sale of our home in Studio City. Stefanie's professionalism, knowledge of the Studio City real estate market, and dedication are truly unmatched. I couldn't be happier with the outcome and highly recommend Stefanie to anyone in our neighborhood looking to buy or sell Studio City real estate. Trust me, you won't find a better real estate agent in Studio City!",
    date: "Apr 2024",
    rating: 5,
  },
  {
    id: "g-2024-04-02",
    quote:
      "I had a great experience working with Stefanie, my Studio City realtor, who recently helped me purchase a home. From start to finish, her professionalism and knowledge were truly exceptional. She guided me through every step of the process, and I highly recommend Stefanie for anyone looking to buy or sell a property in Studio City. Thank you for making this journey smooth and successful!",
    date: "Apr 2024",
    rating: 5,
  },
  {
    id: "g-2024-03-23",
    quote:
      "Stefanie was so amazing from the very beginning. She helped us sell our family's home of 80 yrs. She listened to our wants and needs during a hard time and made it very easy on us. Her entire team was supportive, attentive and so knowledgeable. I could not say enough about how amazing and seamless this made our experience. Stefanie as a person is so supportive and sweet. She was always there when we needed her. We are extremely grateful she was with us during this journey!",
    date: "Mar 2024",
    rating: 5,
  },
  {
    id: "g-2023-09-25",
    quote:
      "Stefanie is one of the best Realtors in Studio City! Selling your home at the right time is hard to predict alone. Using someone who is seasoned in this industry is key! Stefanie was incredible and walked us through every single step to successfully sell our home at the best price we could get in the market. She did not miss a detail. Also the amount of closing paperwork can be very daunting but Stefanie made it very easy for us.",
    date: "Sep 2023",
    rating: 5,
  },
  {
    id: "g-2022-10-29",
    quote:
      "Stefanie is wonderful! Stefanie assisted my daughter and I as we searched for my daughters first home. Stefanie listened to our requirements and continued the search until we found the perfect condo in a great neighborhood. I was so pleased with her professionalism and dedication that I enlisted Stefanie's help in getting my son and daughter-in-law into their first home! She helped with all aspects of the listing, ensuring that we were positive the home checked all the boxes. The next time I need a Real Estate Agent, without hesitation, Stefanie will be my one and only choice!",
    date: "Oct 2022",
    rating: 5,
  },
  {
    id: "g-2022-10-27",
    quote:
      "Stefanie was fantastic! The home buying process in LA can be stressful, but her professionalism and confidence put us at ease. She is incredibly intelligent and hard working, and truly listened to our wants and found the answers to all our questions. She will take good care of you too! Cannot recommend Stefanie enough.",
    date: "Oct 2022",
    rating: 5,
  },
];
