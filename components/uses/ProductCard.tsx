import Image from "next/image";

import { ArrowUpRightIcon } from "@phosphor-icons/react";

import { IHardwareItem } from "@/interface/uses.interface";

import UsesLink from "./UsesLink";

type ProductCardProps = {
  item: IHardwareItem;
  fallbackEmoji?: string;
};

const ProductCard = ({ item, fallbackEmoji }: ProductCardProps) => {
  const { name, note, url, image } = item;

  return (
    <UsesLink url={url} label={name} className="group block h-full p-3">
      <div className="relative aspect-4/3 overflow-hidden rounded-md border bg-muted">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 640px) 200px, 45vw"
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span
            aria-hidden
            className="absolute inset-0 grid place-items-center text-3xl opacity-40 grayscale"
          >
            {fallbackEmoji}
          </span>
        )}
      </div>
      <div className="mt-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">{name}</p>
          {note && (
            <p className="font-mono text-xs text-muted-foreground">{note}</p>
          )}
        </div>
        {url && (
          <ArrowUpRightIcon
            aria-hidden
            className="mt-0.5 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          />
        )}
      </div>
    </UsesLink>
  );
};

export default ProductCard;
