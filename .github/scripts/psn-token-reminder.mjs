// Opens a GitHub issue (assigned to the repo owner, so GitHub emails them)
// the day before the PSN NPSSO token expires. Run daily by
// .github/workflows/psn-token-reminder.yml; see docs/psn.md.
//
// Env:
//   PSN_NPSSO_EXPIRES_ON  expiry date of the current NPSSO, YYYY-MM-DD
//   GITHUB_TOKEN, GITHUB_REPOSITORY  provided by GitHub Actions
//   TODAY    optional YYYY-MM-DD override, for testing
//   DRY_RUN  "1" to print what would happen without calling GitHub

const LABEL = "psn-token";
const TIME_ZONE = "Asia/Kolkata";

const {
  PSN_NPSSO_EXPIRES_ON: expiresOn,
  GITHUB_TOKEN: token,
  GITHUB_REPOSITORY: repo,
  TODAY,
  DRY_RUN,
} = process.env;

if (!expiresOn) {
  console.log(
    "::warning::PSN_NPSSO_EXPIRES_ON is not set. Set it with: gh variable set PSN_NPSSO_EXPIRES_ON --body YYYY-MM-DD",
  );
  process.exit(0);
}
if (!/^\d{4}-\d{2}-\d{2}$/.test(expiresOn)) {
  console.log(
    `::error::PSN_NPSSO_EXPIRES_ON must be YYYY-MM-DD, got "${expiresOn}"`,
  );
  process.exit(1);
}

// en-CA formats dates as YYYY-MM-DD.
const today =
  TODAY ?? new Date().toLocaleDateString("en-CA", { timeZone: TIME_ZONE });
const remindOn = new Date(`${expiresOn}T00:00:00Z`);
remindOn.setUTCDate(remindOn.getUTCDate() - 1);
const remindOnText = remindOn.toISOString().slice(0, 10);

if (today < remindOnText) {
  console.log(
    `PSN NPSSO expires on ${expiresOn}; reminder due on ${remindOnText}. Nothing to do today (${today}).`,
  );
  process.exit(0);
}

const expired = today >= expiresOn;
const title = expired
  ? `PSN token expired on ${expiresOn}: renew PSN_NPSSO`
  : `PSN token expires tomorrow (${expiresOn}): renew PSN_NPSSO`;
const [owner] = (repo ?? "/").split("/");
const body = `The PlayStation NPSSO token behind the Games section ${
  expired ? `expired on **${expiresOn}**` : `expires on **${expiresOn}**`
}. Once it does, \`/games\` and the Games tab show only the curated favourites.

### Renew it
1. Sign in at https://www.playstation.com, then open https://ca.account.sony.com/api/v1/ssocookie in the same browser and copy the \`npsso\` value.
2. Note the new expiry date: DevTools → Application → Cookies → \`https://ca.account.sony.com\` → \`npsso\` → **Expires**.
3. Update \`PSN_NPSSO\` in \`portfolio-v5/.env\` and in Vercel (Production + Preview), then redeploy.
4. Record the new expiry date, so the next reminder lands on time:
   \`\`\`bash
   gh variable set PSN_NPSSO_EXPIRES_ON --body YYYY-MM-DD
   \`\`\`
5. Close this issue.

Full steps: [docs/psn.md](https://github.com/${repo}/blob/master/docs/psn.md#renewing-the-token).`;

if (DRY_RUN === "1") {
  console.log(
    `[dry run] would open issue for @${owner}:\n# ${title}\n\n${body}`,
  );
  process.exit(0);
}

const github = async (path, init = {}) => {
  const res = await fetch(`https://api.github.com/repos/${repo}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...init.headers,
    },
  });
  if (!res.ok && res.status !== 422) {
    throw new Error(
      `${init.method ?? "GET"} ${path}: ${res.status} ${await res.text()}`,
    );
  }
  return res.status === 204 ? null : res.json();
};

// One open reminder at a time; don't open a new one every day.
const open = await github(`/issues?labels=${LABEL}&state=open&per_page=1`);
if (open.length > 0) {
  console.log(`Reminder already open: ${open[0].html_url}`);
  process.exit(0);
}

// 422 means the label already exists.
await github("/labels", {
  method: "POST",
  body: JSON.stringify({
    name: LABEL,
    color: "003791",
    description: "PSN NPSSO token renewal reminder",
  }),
});

const issue = await github("/issues", {
  method: "POST",
  body: JSON.stringify({ title, body, labels: [LABEL], assignees: [owner] }),
});
console.log(`Opened ${issue.html_url}`);
