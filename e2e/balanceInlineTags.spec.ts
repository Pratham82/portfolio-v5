import { expect, test } from "@playwright/test";

import balanceInlineTags from "../src/utils/balanceInlineTags";

test.describe("balanceInlineTags", () => {
  test("leaves balanced HTML alone", () => {
    const html = "Hi <b>there</b><br> <small><b>Mumbai</b></small>";
    expect(balanceInlineTags(html)).toBe(html);
  });

  test("closes a doubled, unclosed <small>", () => {
    expect(
      balanceInlineTags("x<br> <small> <small><b>Mumbai📍</b></small>"),
    ).toBe("x<br> <small> <small><b>Mumbai📍</b></small></small>");
  });

  test("drops stray closing tags and fixes crossed nesting", () => {
    expect(balanceInlineTags("a</b> <b><i>c</b>")).toBe("a <b><i>c</i></b>");
  });
});
