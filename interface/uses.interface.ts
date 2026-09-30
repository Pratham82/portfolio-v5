export interface IUsesItem {
  name: string;
  /** Product page or homepage; the card links out when set. */
  url?: string;
  note?: string;
  highlight?: boolean;
}

export interface IHardwareItem extends IUsesItem {
  /** Path under `public/`, e.g. `/uses/hardware/mac-mini-m4.webp`. */
  image?: string;
}

export interface ISoftwareItem extends IUsesItem {
  /** Simple Icons slug (https://simpleicons.org), shown in its brand color. */
  icon?: string;
  /** Dark-theme override for brands whose color is black (e.g. `white`). */
  iconDarkColor?: string;
  /** Local icon under `public/`, for apps Simple Icons doesn't cover. */
  iconPath?: string;
}

export interface IUsesSection<T extends IUsesItem> {
  id: string;
  title: string;
  emoji?: string;
  items: T[];
}

export interface IUsesConfig {
  hardware: IUsesSection<IHardwareItem>[];
  software: IUsesSection<ISoftwareItem>[];
}
