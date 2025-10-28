export const headerLinks = [
  { id: "a167c067-78e9-4e4f-9ff7-7255326c2a6c", link: "Home", path: "home" },
  {
    id: "b34f03b5-1f24-4b7e-9b9a-c43a830f8e35",
    link: "Projects",
    path: "projects",
  },
  { id: "ffa62e68-d888-4df9-8bc2-9444d4eeb801", link: "Blogs", path: "blogs" },
  // { id: "42d773e6-4999-4575-97f8-81c32be201c8", link: "Contact" },
  { id: "56a0fc95-8999-4b54-8dd1-2c9bea902d4f", link: "About", path: "about" },
];

export const tabsData = [
  { label: "Home", id: "home" },
  {
    label: "Projects",
    id: "projects",
  },
  { label: "Blogs", id: "blogs" },
  // { id: "42d773e6-4999-4575-97f8-81c32be201c8", label: "Contact" },
  { label: "About", id: "about" },
];

export enum SocialLinkType {
  GITHUB = "GITHUB",
  LINKEDIN = "LINKEDIN",
  TWITTER = "TWITTER",
  INSTA = "INSTA",
  MAIL = "MAIL",
  BLUESKY = "BLUESKY",
  RESUME = "RESUME",
}

export type SocialLinksType = {
  id: SocialLinkType | string;
  link: string;
};

export const socialLinks = [
  {
    id: SocialLinkType.GITHUB,
    link: "https://github.com/pratham82",
  },
  {
    id: SocialLinkType.LINKEDIN,
    link: "https://www.linkedin.com/in/prathameshmali/",
  },
  {
    id: SocialLinkType.TWITTER,
    link: "https://www.twitter.com/pratham_82 ",
  },
  {
    id: SocialLinkType.INSTA,
    link: "https://www.instagram.com/pratham82.sh/",
  },
  {
    id: SocialLinkType.BLUESKY,
    link: "https://bsky.app/profile/pratham82.bsky.social",
  },
  {
    id: SocialLinkType.MAIL,
    link: "mailto:mali.prathamesh82@gmail.com",
  },
  {
    id: SocialLinkType.RESUME,
    link: "https://drive.google.com/file/d/1b2c3d4",
  },
];
