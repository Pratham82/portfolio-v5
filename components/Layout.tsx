import { ReactNode } from "react";

// import Footer from "./Footer";
// import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Container: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <>
      {/* <Header /> */}
      <div className="flex min-h-[85vh] justify-center pb-8 pt-8 px-4">
        <div className="max-w-xs sm:max-w-lg lg:max-w-lg">{children}</div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Container;
