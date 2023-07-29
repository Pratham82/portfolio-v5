import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "next-themes";
import apolloClient from "../lib/apollo";
import Layout from "../components/Layout";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default MyApp;
