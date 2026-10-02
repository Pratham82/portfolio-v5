import type { Metadata } from "next";

// "/home" was the old landing URL, and browsers cache the old permanent
// "/" -> "/home" redirect, so it renders the same view instead of redirecting.
export { default } from "../experience/page";

// Keep in sync with SANITY_REVALIDATE (segment config must be a literal).
export const revalidate = 3600;

export const metadata: Metadata = { alternates: { canonical: "/" } };
