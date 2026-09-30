import { revalidateTag } from "next/cache";

import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

import { SANITY_CACHE_TAG } from "@/lib/sanity/client";

const SECRET = process.env.SANITY_REVALIDATE_SECRET;

/**
 * Sanity webhook target: expires every Sanity-backed page as soon as content
 * is published, instead of waiting for the hourly ISR.
 */
export const POST = async (request: Request) => {
  if (!SECRET) {
    return Response.json(
      { error: "SANITY_REVALIDATE_SECRET is not set" },
      { status: 500 },
    );
  }

  const body = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME) ?? "";
  if (!(await isValidSignature(body, signature, SECRET))) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  // A webhook can't use updateTag; { expire: 0 } makes the next visit refetch.
  revalidateTag(SANITY_CACHE_TAG, { expire: 0 });

  return Response.json({ revalidated: true, now: Date.now() });
};
