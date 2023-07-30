import { ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Container: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <div className="flex min-h-[85vh] justify-center pb-8 pt-32">
        <div className="max-w-sm sm:max-w-2xl lg:max-w-5xl">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Container;
