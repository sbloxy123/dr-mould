// Customer reviews. The home page Reviews section only renders when this
// list has at least one entry. The first review is shown as the featured quote.
// Only add real reviews, and don't add star ratings unless the review has them.

export type Review = {
  quote: string;
  name: string;
  town?: string;
  job?: string;
};

export const reviews: Review[] = [];
