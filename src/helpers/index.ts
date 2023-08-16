const getCurrentHeadTitle = ({ pathname }: { pathname: string }) => {
  const path = pathname !== "/" ? pathname.replace("/", "") : "/";
  const pageTitle = path[0].toUpperCase() + path.slice(1) || "Pratham82";
  return pageTitle;
};

const isCurrentPath = ({
  link,
  pathname,
}: {
  link: string;
  pathname: string;
}) => {
  const currentLink = link.toLowerCase();
  const [, cp] = pathname.split("/");
  return currentLink === cp;
};

export { getCurrentHeadTitle, isCurrentPath };
