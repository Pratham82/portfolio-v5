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
      <div className="flex min-h-[85vh] justify-center pb-8 pt-32 px-4">
        <div className="max-w-sm sm:max-w-xl lg:max-w-2xl">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Container;
