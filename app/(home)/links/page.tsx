import type { Metadata } from "next";

import Links from "@/components/Links";
import { getAllLinks } from "@/lib/links";

// Keep in sync with SANITY_REVALIDATE (segment config must be a literal).
export const revalidate = 3600;

export const metadata: Metadata = { title: "Links" };

const LinksPage = async () => <Links links={await getAllLinks()} />;

export default LinksPage;
