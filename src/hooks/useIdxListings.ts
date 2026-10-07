import { useEffect, useState } from "react";
import { fetchFeatured, fetchSoldPending } from "@/lib/idx";
import { getListingsSeed, type ListingsData } from "@/lib/listingsSeed";
type ListingsState = { data: ListingsData | null; loading: boolean; error: string | null };

// Module-level cache so PropertyGrid, the /listings/:slug detail page, and
// the homepage's FeaturedProperties don't each fire their own fetch.
let cache: Promise<ListingsData> | null = null;

function loadListings(): Promise<ListingsData> {
  if (!cache) {
    cache = Promise.all([fetchFeatured(), fetchSoldPending()])
      .then(([available, sold]) => ({ available, sold }))
      .catch((err) => {
        cache = null; // let the next mount retry instead of caching a failure forever
        throw err;
      });
  }
  return cache;
}

/** Real IDX Broker listings (featured/active + sold/pending) for this
 *  account, replacing the old src/mocks/home.ts arrays. */
export function useIdxListings(): ListingsState {
  // Prerendered pages start from the build-time snapshot (see listingsSeed),
  // so the HTML has real listings and hydration matches it; the fetch below
  // then replaces the snapshot with the live feed.
  const [state, setState] = useState<ListingsState>(() => {
    const seed = getListingsSeed();
    return seed ? { data: seed, loading: false, error: null } : { data: null, loading: true, error: null };
  });

  useEffect(() => {
    let cancelled = false;
    loadListings()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        // Keep showing the snapshot if the live refresh fails.
        if (!cancelled && !getListingsSeed()) {
          setState({ data: null, loading: false, error: err instanceof Error ? err.message : "Failed to load listings" });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
