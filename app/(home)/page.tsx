// "/" opens the Experience tab.
export { default } from "./experience/page";

// Keep in sync with SANITY_REVALIDATE (segment config must be a literal).
export const revalidate = 3600;
