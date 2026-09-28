import "../styles/globals.css";

import { JetBrains_Mono } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { ReactNode } from "react";

import AnimatedBackground from "@/components/AnimatedBg";
import Layout from "@/components/Layout";

import Providers from "./providers";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Prathamesh's Website",
  description: "Prathamesh's portfolio website",
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en" className="scroll-smooth" suppressHydrationWarning>
    <body className="dark:bg-gray-950">
      <AnimatedBackground />
      <Providers>
        <Layout>
          <main className={`${jetbrainsMono.variable} font-sans`}>
            {children}
          </main>
          <Analytics />
        </Layout>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
