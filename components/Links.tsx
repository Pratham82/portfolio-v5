import Link from "next/link";

import { LinkMeta } from "../lib/links";

import PageAnimationContainer from "./PageAnimationContainer";

interface ILinksProps {
  links: {
    content: string;
    meta: LinkMeta;
  }[];
}

const Links = (props: ILinksProps) => {
  const { links } = props;

  return (
    <PageAnimationContainer className="sm:w-[575px]">
      <h1 className="text-2xl font-bold mb-4">Links</h1>
      <div className="flex flex-col py-3 gap-4">
        {links?.map(({ meta: linkData }) => (
          <Link
            href={`/links/${linkData.slug}`}
            key={linkData.slug}
            className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <h2 className="text-xl font-semibold mb-2">{linkData.title}</h2>
            {linkData.description && (
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {linkData.description}
              </p>
            )}
            {linkData.category && (
              <span className="text-sm text-gray-500 dark:text-gray-500">
                {Array.isArray(linkData.category)
                  ? linkData.category.join(", ")
                  : linkData.category}
              </span>
            )}
          </Link>
        ))}
      </div>
    </PageAnimationContainer>
  );
};

export default Links;
