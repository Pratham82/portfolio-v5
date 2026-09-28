import Link from "next/link";

import { HoverItem, HoverList } from "@/components/ui/hover-list";

import type { LinkMeta } from "../lib/links";

import PageAnimationContainer from "./PageAnimationContainer";
import PageTitle from "./PageTitle";

interface ILinksProps {
  links: {
    content: string;
    meta: LinkMeta;
  }[];
}

const Links = (props: ILinksProps) => {
  const { links } = props;

  return (
    <PageAnimationContainer>
      <PageTitle>Links</PageTitle>
      <HoverList className="mt-3 flex flex-col">
        {links?.map(({ meta: linkData }) => (
          <HoverItem id={linkData.slug} key={linkData.slug}>
            <Link href={`/links/${linkData.slug}`} className="block px-3 py-3">
              <h2 className="font-medium text-foreground">{linkData.title}</h2>
              {linkData.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {linkData.description}
                </p>
              )}
              {linkData.category && (
                <span className="mt-2 block font-mono text-xs text-muted-foreground/80">
                  {Array.isArray(linkData.category)
                    ? linkData.category.join(", ")
                    : linkData.category}
                </span>
              )}
            </Link>
          </HoverItem>
        ))}
      </HoverList>
    </PageAnimationContainer>
  );
};

export default Links;
