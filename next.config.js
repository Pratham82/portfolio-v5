const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  turbopack: {
    root: path.join(__dirname),
    rules: {
      "*.graphql": {
        loaders: ["graphql-tag/loader"],
        as: "*.js",
      },
      "*.gql": {
        loaders: ["graphql-tag/loader"],
        as: "*.js",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "ghchart.rshah.org",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
      {
        protocol: "https",
        hostname: "image.api.playstation.com",
      },
      {
        protocol: "https",
        hostname: "psnobj.prod.dl.playstation.net",
      },
      {
        protocol: "https",
        hostname: "a.ltrbxd.com",
      },
      {
        protocol: "https",
        hostname: "images.fotmob.com",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
  async redirects() {
    // Old back-button links reopened a home tab with ?from=; tabs have URLs now.
    return [
      {
        source: "/home",
        has: [{ type: "query", key: "from", value: "blog" }],
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/home",
        has: [{ type: "query", key: "from", value: "links" }],
        destination: "/links",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
};
