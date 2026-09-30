import { ReactNode } from "react";

import { HoverItem, HoverList } from "@/components/ui/hover-list";
import { IUsesItem, IUsesSection } from "@/interface/uses.interface";
import { cn } from "@/lib/utils";

type UsesSectionGridProps<T extends IUsesItem> = {
  section: IUsesSection<T>;
  renderItem: (_item: T) => ReactNode;
  className?: string;
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
      {section.emoji && <span aria-hidden>{section.emoji}</span>}
      {section.title}
    </h2>
    <HoverList className={cn("grid", className)}>
      {section.items.map((item) => (
        <HoverItem id={`${section.id}-${item.name}`} key={item.name}>
          {renderItem(item)}
        </HoverItem>
      ))}
    </HoverList>
  </section>
);

export default UsesSectionGrid;
