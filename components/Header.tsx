import classNames from "classnames";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { tabsData } from "../src/data/headerData";
import { getCurrentHeadTitle } from "../src/helpers";
import ThemeToggler from "./ThemeSwitcher";

const Header = () => {
  const { pathname, push } = useRouter();

  const currentPath = pathname.replace("/", "");

  return (
    <>
      <Head>
        <title>{getCurrentHeadTitle({ pathname })}</title>
      </Head>
      <div className="fixed top-0 z-10 w-full border-slate-400 py-4 shadow-sm shadow-gray-800 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[280px] justify-between">
          <h1 className="text-center text-lg font-semibold">
            <Link href="home">Pratham82</Link>
          </h1>
          <ThemeToggler />
        </div>
        <div className="space-x-1a flex justify-center pt-4">
          {tabsData.map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => {
                push(`/${tab.id}`);
              }}
              className={`relative
              px-3 py-1.5 text-sm font-medium transition focus-visible:outline-2 `}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {currentPath.includes(tab.id) && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 z-10 rounded-md bg-slate-900 dark:bg-slate-100"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span
                className={classNames(
                  "relative z-10 mix-blend-exclusion",
                  currentPath.includes(tab.id) && "text-slate-50",
                )}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
