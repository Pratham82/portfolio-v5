export interface IAllContactsPageResponse {
  pageName: string;
  title: string;
  subtitle: string;
  contactsLinks?: ContactsLinks[] | null;
}
export interface ContactsLinks {
  socialLink: string;
  link: string;
}
export interface Data {
  allContactsPage?: IAllContactsPageResponse[] | null;
}
export interface RootObject {
  data: Data;
}
