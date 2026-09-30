import { StarIcon } from "@phosphor-icons/react";

import { ISoftwareItem } from "@/interface/uses.interface";

import ToolIcon from "./ToolIcon";
import UsesLink from "./UsesLink";

const ToolTile = ({ item }: { item: ISoftwareItem }) => {
  const { name, note, url, highlight } = item;

  return (
    <UsesLink
      url={url}
      label={name}
      className="group flex h-full items-center gap-3 p-3"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-md border bg-card">
        <ToolIcon {...item} />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1 text-sm font-medium text-foreground">
          {name}
          {highlight && (
            <StarIcon
              weight="fill"
              aria-label="Favorite"
              className="size-3 shrink-0 text-muted-foreground"
            />
          )}
        </span>
        {note && (
          <span className="line-clamp-2 text-xs text-muted-foreground">
            {note}
          </span>
        )}
      </span>
    </UsesLink>
  );
};

export default ToolTile;
