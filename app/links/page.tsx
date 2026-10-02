import Links from "@/components/Links";
import { getAllLinks } from "@/lib/links";

// Keep in sync with SANITY_REVALIDATE (segment config must be a literal).
export const revalidate = 3600;

const LinksPage = async () => <Links links={await getAllLinks()} />;

export default LinksPage;
