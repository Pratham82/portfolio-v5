"use client";

import { ReactNode } from "react";

import CodingStats from "@/components/now/CodingStats";
import Football from "@/components/now/Football";
import Movies from "@/components/now/Movies";
import OnRepeat from "@/components/now/OnRepeat";
import PageAnimationContainer from "@/components/PageAnimationContainer";
import PageTitle from "@/components/PageTitle";
import type { INowData } from "@/interface/now.interface";
import { formatDay } from "@/src/utils/formatIst";

type NowProps = {
  /** YYYY-MM-DD from `content/now.mdx`. */
  updated: string;
  /** The rendered `content/now.mdx`. */
  content: ReactNode;
  data: INowData;
};

const Now = ({ updated, content, data }: NowProps) => (
  <PageAnimationContainer>
    <div className="mb-4 flex items-baseline justify-between gap-2">
      <PageTitle>Now</PageTitle>
      {updated && (
        <p className="font-mono text-xs text-muted-foreground">
          Updated {formatDay(updated)} {updated.slice(0, 4)}
        </p>
      )}
    </div>

    <div className="prose prose-neutral max-w-none text-sm dark:prose-invert prose-headings:mb-1 prose-headings:mt-5 prose-headings:font-semibold prose-headings:tracking-tight prose-p:my-1 prose-a:underline-offset-4">
      {content}
    </div>

    {data.topItems && <OnRepeat topItems={data.topItems} />}
    {data.coding && <CodingStats coding={data.coding} />}
    {data.football && <Football teams={data.football} />}
    {data.films && data.films.length > 0 && <Movies films={data.films} />}
  </PageAnimationContainer>
);

export default Now;
