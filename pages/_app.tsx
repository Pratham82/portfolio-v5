import "../styles/globals.css";

import type { AppProps } from "next/app";
import { JetBrains_Mono } from "next/font/google";
import Head from "next/head";

import { ApolloProvider } from "@apollo/client";
import { Analytics } from "@vercel/analytics/next";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";

import { AnimatedBackground, Layout } from "@/components";

import apolloClient from "../lib/apollo";

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
          <ApolloProvider client={apolloClient}>
            <Layout>
              <main className={`${jetbrainsMono.variable} font-sans`}>
                <Component {...pageProps} />
              </main>
              <Analytics />
            </Layout>
          </ApolloProvider>
        </AnimatePresence>
      </ThemeProvider>
      {/* <MiniFooter /> */}
    </>
  );
};

export default MyApp;
