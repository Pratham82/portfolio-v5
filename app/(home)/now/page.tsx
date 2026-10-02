import type { Metadata } from "next";

import Now from "@/components/sections/Now";
import { getNowContent, getNowData } from "@/lib/now";

// Re-fetch the live widgets at most hourly (segment config must be a literal).
export const revalidate = 3600;

export const metadata: Metadata = { title: "Now" };

const NowPage = async () => {
  const [{ updated, content }, data] = await Promise.all([
    getNowContent(),
    getNowData(),
  ]);

  return <Now updated={updated} content={content} data={data} />;
};

export default NowPage;
