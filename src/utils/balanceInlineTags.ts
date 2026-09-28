const INLINE_TAGS = new Set(["b", "strong", "i", "em", "small", "u", "span"]);
const TAG = /<\/?([a-z]+)\b[^>]*>/gi;

/**
 * Closes unclosed inline tags and drops stray closing ones in CMS-authored
 * HTML. The browser's parser carries an unclosed tag like `<small>` into the
 * elements that follow, which breaks React hydration.
 */
const balanceInlineTags = (html: string): string => {
  const open: string[] = [];

  const balanced = html.replace(TAG, (tag, rawName: string) => {
    const name = rawName.toLowerCase();
    if (!INLINE_TAGS.has(name)) return tag;

    if (!tag.startsWith("</")) {
      open.push(name);
      return tag;
    }

    const index = open.lastIndexOf(name);
    if (index === -1) return "";

    // Close anything opened inside this tag first, so nesting stays valid.
    const inner = open.splice(index).slice(1).reverse();
    return inner.map((n) => `</${n}>`).join("") + tag;
  });

  return (
    balanced +
    open
      .reverse()
      .map((n) => `</${n}>`)
      .join("")
  );
};

export default balanceInlineTags;
