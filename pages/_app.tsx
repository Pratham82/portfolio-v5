import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";

import "../styles/globals.css";
import apolloClient from "../lib/apollo";
import Layout from "../components/Layout";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <AnimatePresence mode="wait" initial>
        <ApolloProvider client={apolloClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default MyApp;
