import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import Head from "next/head";
import ThemeToggler from "./ThemeSwitcher";
import { headerLinks } from "../src/data/headerData";
import { isCurrentPath, getCurrentHeadTitle } from "../src/helpers";

const Header = () => {
  const { pathname } = useRouter();

  return (
    <>
      <Head>
        <title>{getCurrentHeadTitle({ pathname })}</title>
      </Head>
      <div className="z-10 border-slate-400 py-4 shadow-sm shadow-gray-800 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-sm justify-between">
          <h1 className="text-center text-lg font-semibold">Pratham82</h1>
          <ThemeToggler />
        </div>
        <div className="text text-slate-00 mx-auto flex max-w-md list-none justify-center pt-4 text-sm">
          {headerLinks?.map(({ link, id }) => (
            <div
              key={id}
              className={classNames("px-4 py-2", {
                "rounded-md bg-slate-800 font-medium text-white": isCurrentPath(
                  { link, pathname },
                ),
              })}
            >
              <Link href={`/${link.toLocaleLowerCase()}`}>{link}</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;