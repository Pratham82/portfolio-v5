import "../styles/globals.css";

import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { ReactNode } from "react";

// import AnimatedBackground from "@/components/AnimatedBg";
import Layout from "@/components/Layout";

import Providers from "./providers";

export const metadata: Metadata = {
  title: { default: "Prathamesh's Website", template: "%s | Prathamesh" },
  description: "Prathamesh's portfolio website",
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html
    lang="en"
    className={`${GeistSans.variable} ${GeistMono.variable} scroll-smooth`}
    suppressHydrationWarning
  >
    <body>
      <Providers>
        {/*<AnimatedBackground />*/}
        <Layout>
          <main>{children}</main>
          <Analytics />
        </Layout>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
