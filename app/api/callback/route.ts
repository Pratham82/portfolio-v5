import { NextRequest } from "next/server";

// One-time Spotify OAuth helper: shows the authorization code so a refresh
// token can be generated.
export const GET = (request: NextRequest) => {
  const code = request.nextUrl.searchParams.get("code");

  return new Response(`Authorization Code: ${code}`);
};
