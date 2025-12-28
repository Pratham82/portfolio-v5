export interface IBlogsPageResponse {
  __typename: string;
  pageName: string;
  subTitle?: null;
  blog?: Blog[] | null;
}
export interface Blog {
  title: string;
  subTitle?: string;
  date?: string;
  slug: string;
  readTime: string;
  tags: string[];
}
export interface Author {
  __typename: string;
  name: string;
  username: string;
  image: Image;
}
export interface Image {
  __typename: string;
  asset: Asset;
}
export interface Asset {
  __typename: string;
  url: string;
}
export interface Slug {
  __typename: string;
  current: string;
  source?: null;
}
