import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html className="dark" lang="eng">
      <Head />
      <body className="dark:bg-gray-950">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
