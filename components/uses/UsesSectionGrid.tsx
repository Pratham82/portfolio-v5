import { ReactNode } from "react";

import { HoverItem, HoverList } from "@/components/ui/hover-list";
import { IUsesItem, IUsesSection } from "@/interface/uses.interface";
import { cn } from "@/lib/utils";

const SIMPLE_ICONS_CDN = "https://cdn.simpleicons.org";

type UsesSectionGridProps<T extends IUsesItem> = {
  section: IUsesSection<T>;
  renderItem: (_item: T) => ReactNode;
  className?: string;
};

const SectionMark = ({
  emoji,
  logo,
  logoPath,
}: Pick<IUsesSection<IUsesItem>, "emoji" | "logo" | "logoPath">) => {
  const logoUrl = logo ? `${SIMPLE_ICONS_CDN}/${logo}` : logoPath;

  if (logoUrl) {
    // Masking the logo lets it take the heading's color in both themes.
    return (
      <span
        aria-hidden
        className="size-4 bg-foreground mask-contain mask-center mask-no-repeat"
        style={{ maskImage: `url(${logoUrl})` }}
      />
    );
  }

  return emoji ? <span aria-hidden>{emoji}</span> : null;
};

const UsesSectionGrid = <T extends IUsesItem>({
  section,
  renderItem,
  className,
}: UsesSectionGridProps<T>) => (
  <section aria-labelledby={`uses-${section.id}`}>
    <h2
      id={`uses-${section.id}`}
      className="mb-2 flex items-center gap-2 font-medium text-foreground"
    >
      <SectionMark {...section} />
      {section.title}
    </h2>
    <HoverList className={cn("grid", className)}>
      {section.items.map((item, index) => (
        <HoverItem id={`${section.id}-${index}`} key={`${item.name}-${index}`}>
          {renderItem(item)}
        </HoverItem>
      ))}
    </HoverList>
  </section>
);

export default UsesSectionGrid;
