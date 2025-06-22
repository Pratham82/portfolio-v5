import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head />

      <body className="dark:bg-gray-950">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
