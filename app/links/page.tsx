import Links from "@/components/Links";
import { getAllLinks } from "@/lib/links";

const LinksPage = () => <Links links={getAllLinks()} />;

export default LinksPage;
