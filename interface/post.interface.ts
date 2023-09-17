export interface AllPost {
  __typename: string;
  _key?: null;
  title: string;
  subTitle: string;
  slug: Slug;
  author: Author;
  mainImage?: null;
  categories?: null;
  createdAt: string;
  publishedAt: string;
  blogBody: string;
}
export interface Slug {
  __typename: string;
  current: string;
}
export interface Author {
  __typename: string;
  _id: string;
  name: string;
  username: string;
  image: Image;
  bioRaw?: BioRaw[] | null;
}
export interface Image {
  __typename: string;
  asset: Asset;
}
export interface Asset {
  __typename: string;
  url: string;
}
export interface Children {
  _type: string;
  marks?: any[] | null;
  text: string;
  _key: string;
}
export interface BioRaw {
  children?: Children[] | null;
  _type: string;
  style: string;
  _key: string;
  markDefs?: any[] | null;
}
export interface AllPostResponse {
  allPost?: AllPost[] | null;
}
