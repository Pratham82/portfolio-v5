import "../styles/globals.css";

import type { AppProps } from "next/app";
import { JetBrains_Mono } from "next/font/google";
import Head from "next/head";

import { Analytics } from "@vercel/analytics/next";
import { AnimatePresence } from "motion/react";
import { ThemeProvider } from "next-themes";

import { AnimatedBackground, Layout } from "@/components";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AnimatedBackground />
      <Head>
        <title>Prathamesh&apos;s Website </title>
        <meta name="description" content="Prathamesh's portfolio website" />
      </Head>
      <ThemeProvider attribute="class">
        <AnimatePresence mode="wait" initial>
          <Layout>
            <main className={`${jetbrainsMono.variable} font-sans`}>
              <Component {...pageProps} />
            </main>
            <Analytics />
          </Layout>
        </AnimatePresence>
      </ThemeProvider>
      {/* <MiniFooter /> */}
    </>
  );
};

export default MyApp;
