import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Head from "next/head";

import AnimatedBackground from "../components/AnimatedBg";
import Layout from "../components/Layout";
import MiniFooter from "../components/MiniFooter";
import apolloClient from "../lib/apollo";

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
              <Component {...pageProps} />
            </Layout>
          </ApolloProvider>
        </AnimatePresence>
      </ThemeProvider>
      <MiniFooter />
    </>
  );
};

export default MyApp;
