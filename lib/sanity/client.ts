import { DocumentNode, print } from "graphql";

const ENDPOINT = process.env.NEXT_PUBLIC_PORTFOLIO_GRAPHQL_ENDPOINT;

/** How often (seconds) ISR re-fetches Sanity content. */
export const SANITY_REVALIDATE = 3600;

/** Cache tag on every Sanity fetch; the publish webhook expires it. */
export const SANITY_CACHE_TAG = "sanity";

/**
 * Runs a Sanity GraphQL query on the server. Throws on HTTP or GraphQL
 * errors so a failed build (or ISR revalidation) keeps the last good page
 * instead of rendering empty content.
 */
export const sanityQuery = async <T>(
  query: DocumentNode,
  variables?: Record<string, unknown>,
): Promise<T> => {
  if (!ENDPOINT) {
    throw new Error("NEXT_PUBLIC_PORTFOLIO_GRAPHQL_ENDPOINT is not set");
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: print(query), variables }),
    next: {
      tags: [SANITY_CACHE_TAG],
      // The publish webhook can't reach localhost, so dev always refetches.
      revalidate:
        process.env.NODE_ENV === "development" ? 0 : SANITY_REVALIDATE,
    },
  });
  if (!res.ok) {
    throw new Error(`Sanity request failed with status ${res.status}`);
  }

  const { data, errors } = await res.json();
  if (errors?.length) {
    throw new Error(
      `Sanity query failed: ${errors.map((e: Error) => e.message).join(", ")}`,
    );
  }

  return data as T;
};
