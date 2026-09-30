import Image from "next/image";

import { ISoftwareItem } from "@/interface/uses.interface";
import { cn } from "@/lib/utils";

const SIMPLE_ICONS_CDN = "https://cdn.simpleicons.org";

type ToolIconProps = Pick<
  ISoftwareItem,
  "name" | "icon" | "iconDarkColor" | "iconPath"
>;

const ToolIcon = ({ name, icon, iconDarkColor, iconPath }: ToolIconProps) => {
  if (icon) {
    // The CDN serves the SVG in its brand color; SVGs skip the optimizer.
    return (
      <>
        <Image
          src={`${SIMPLE_ICONS_CDN}/${icon}`}
          alt=""
          width={20}
          height={20}
          unoptimized
          className={cn("size-5", iconDarkColor && "dark:hidden")}
        />
        {iconDarkColor && (
          <Image
            src={`${SIMPLE_ICONS_CDN}/${icon}/${iconDarkColor}`}
            alt=""
            width={20}
            height={20}
            unoptimized
            className="hidden size-5 dark:block"
          />
        )}
      </>
    );
  }

  if (iconPath) {
    return (
      <Image src={iconPath} alt="" width={24} height={24} className="size-6" />
    );
  }

  return (
    <span
      aria-hidden
      className="font-mono text-xs text-muted-foreground group-hover:text-foreground"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
};

export default ToolIcon;
