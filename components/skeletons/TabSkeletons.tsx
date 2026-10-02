import { cn } from "@/lib/utils";
import { skillsMindMapData } from "@/src/data/skils-data";
import { uses } from "@/src/data/uses";

/**
 * Loading placeholders for the home tabs (`app/(home)/<tab>/loading.tsx`).
 * Each one reuses its tab's wrappers, row heights and grid columns, so it
 * takes the same space as the real content at every width and nothing jumps
 * when the page arrives. Keep them in step when a tab's layout changes.
 */

const Bone = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={cn("animate-pulse rounded-md bg-muted", className)}
    style={style}
  />
);

/** A bar centred in a box of one text line's height (`line`). */
const Line = ({ line, bar }: { line: string; bar: string }) => (
  <div className={cn("flex items-center", line)}>
    <Bone className={bar} />
  </div>
);

/** `PageTitle`: text-lg / sm:text-xl, 28px line. */
const Title = ({
  className,
  width = "w-32",
}: {
  className?: string;
  width?: string;
}) => <Line line={cn("h-7", className)} bar={cn("h-5", width)} />;

const Status = ({ children }: { children: React.ReactNode }) => (
  <div role="status" aria-label="Loading" aria-busy>
    {children}
  </div>
);

const WIDTHS = ["w-1/2", "w-2/3", "w-3/5", "w-3/4", "w-2/5"];
const pick = (i: number) => WIDTHS[i % WIDTHS.length];

// ── Work ────────────────────────────────────────────────────────────────

/** `Experience` + `WorkExCard`: 45px logo, title / company / dates (86px). */
export const ExperienceSkeleton = () => (
  <Status>
    <Title width="w-40" />
    <div className="mt-3 flex flex-col">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="-mx-3 px-3 py-3">
          <div className="flex items-start gap-4">
            <Bone className="mt-0.5 size-[45px] shrink-0" />
            <div className="flex-1">
              <Line line="h-6" bar={cn("h-4", pick(i))} />
              <Line line="h-5" bar="h-3.5 w-48" />
              <Line line="mt-0.5 h-4" bar="h-3 w-36" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </Status>
);

/** `Projects` + `ProjectCard`: filter chips, then a 1 / 2 column card grid. */
export const ProjectsSkeleton = () => (
  <Status>
    <Title width="w-24" />
    <div className="flex flex-wrap gap-1 py-3">
      {["w-13", "w-21", "w-19", "w-11", "w-16", "w-20", "w-14"].map((w) => (
        <Bone key={w} className={cn("h-6", w)} />
      ))}
    </div>
    <div className="-mx-3 grid grid-cols-1 sm:grid-cols-2">
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className="flex flex-col p-3">
          <Line line="h-6" bar={cn("h-4", pick(i))} />
          <Line line="mt-1 h-5" bar="h-3.5 w-full" />
          {i >= 1 && i <= 3 && <Line line="h-5" bar="h-3.5 w-3/4" />}
          <div className="mt-3 flex gap-2">
            <Bone className="h-5.5 w-12" />
            <Bone className="h-5.5 w-16" />
          </div>
        </div>
      ))}
    </div>
  </Status>
);

/** `Skills` + `Chips`: one chip per skill, from the same data. */
export const SkillsSkeleton = () => (
  <Status>
    <Title className="mb-4" width="w-20" />
    <div className="flex flex-col gap-4">
      {(skillsMindMapData.children ?? []).map((category) => (
        <div key={category.id} className="flex flex-col gap-2">
          <Line line="h-4" bar="h-3 w-36" />
          <div className="flex flex-wrap gap-1.5">
            {category.children?.map((skill) => (
              // Chip: px-2 + mono text-xs (~7.2px a character) + border.
              <Bone
                key={skill.id}
                className="h-6.5"
                style={{ width: `${skill.id.length * 7.2 + 18}px` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </Status>
);

type Row = {
  /** No description line. */
  bare?: boolean;
  /** Lines that only wrap below `sm`. */
  wrap?: { title?: boolean; desc?: boolean };
};

/** A `BlogCard` / `Links` row: title, description, mono tags. */
const ListRow = ({
  i,
  withDate,
  bare,
  wrap,
}: Row & { i: number; withDate?: boolean }) => (
  <div className="px-3 py-3">
    <div className="flex items-center justify-between gap-4">
      <Line line="h-6 flex-1" bar={cn("h-4", pick(i))} />
      {withDate && <Bone className="h-3 w-20 shrink-0" />}
    </div>
    {wrap?.title && <Line line="h-6 sm:hidden" bar="h-4 w-1/3" />}
    {!bare && <Line line="mt-1 h-5" bar="h-3.5 w-4/5" />}
    {wrap?.desc && <Line line="h-5 sm:hidden" bar="h-3.5 w-1/2" />}
    <Line line="mt-2 h-4" bar="h-3 w-40" />
  </div>
);

// Shaped like the current posts: on phones the first titles wrap, and one
// post has no subtitle.
const BLOG_ROWS: Row[] = [
  { wrap: { title: true } },
  { wrap: { title: true } },
  { wrap: { title: true, desc: true } },
  { wrap: { title: true } },
  {},
  { bare: true, wrap: { title: true, desc: true } },
  {},
  {},
];

export const BlogsSkeleton = () => (
  <Status>
    <Title width="w-20" />
    <div className="-mx-3 mt-3 flex flex-col">
      {BLOG_ROWS.map((row, i) => (
        <ListRow key={i} i={i} withDate {...row} />
      ))}
    </div>
  </Status>
);

// ── Personal ────────────────────────────────────────────────────────────

/** A Now widget: icon + heading row with the "via …" source link. */
const WidgetHead = ({ width }: { width: string }) => (
  <div className="mb-3 flex items-center justify-between gap-2">
    <Line line="h-6" bar={cn("h-4", width)} />
    <Bone className="h-3 w-20" />
  </div>
);

/**
 * `Now`: the MDX text, then On repeat, Coding, Football, Favourite films and
 * Recently watched. Favourite films only render with a Letterboxd API key, so
 * `now/loading.tsx` passes whether one is set.
 */
export const NowSkeleton = ({
  withFavouriteFilms = false,
}: {
  withFavouriteFilms?: boolean;
}) => (
  <Status>
    <div className="mb-4 flex items-center justify-between gap-2">
      <Title width="w-14" />
      <Bone className="h-3 w-32" />
    </div>
    <Line line="h-5" bar="h-3.5 w-3/5" />
    {/* Lines per paragraph: [heading, all widths, extra below sm]. */}
    {(
      [
        ["Focus", 2, 1],
        ["Learning", 1, 1],
        ["Reading", 1, 0],
        ["Playing", 1, 0],
      ] as const
    ).map(([heading, lines, phoneLines], i) => (
      <div key={heading}>
        <Line line="mt-5 h-7" bar="h-4.5 w-24" />
        <div className="mt-1">
          {Array.from({ length: lines + phoneLines }, (_, l) => (
            <Line
              key={l}
              line={cn("h-5", l >= lines && "sm:hidden")}
              bar={cn("h-3.5", l === 0 ? pick(i + 3) : "w-1/2")}
            />
          ))}
        </div>
      </div>
    ))}

    {/* On repeat: 5 artists, then 5 tracks. */}
    <div className="mt-10">
      <WidgetHead width="w-24" />
      <div className="mb-4">
        <Line line="h-5" bar="h-3.5 w-2/3" />
        <Line line="h-5 sm:hidden" bar="h-3.5 w-1/3" />
      </div>
      <div className="mb-5 flex gap-4 overflow-hidden pb-1">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex w-20 shrink-0 flex-col items-center">
            <Bone className="size-16 rounded-full" />
            <Line line="mt-2 h-4" bar="h-3 w-14" />
            <Line line="h-6" bar="h-2.5 w-10" />
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex items-center gap-3 px-2 py-1.5">
            <Bone className="h-3 w-4 shrink-0" />
            <Bone className="size-9 shrink-0 rounded" />
            <div className="flex-1">
              <Line line="h-5" bar={cn("h-3.5", pick(i))} />
              <Line line="h-4" bar="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Coding this week. */}
    <div className="mt-10">
      <WidgetHead width="w-36" />
      <Bone className="h-[138px] rounded-xl sm:h-[74px]" />
    </div>

    {/* Football: two club cards, side by side from sm. */}
    <div className="mt-10">
      <WidgetHead width="w-20" />
      <div className="grid gap-3 sm:grid-cols-2">
        <Bone className="h-[398px] rounded-xl" />
        <Bone className="h-[398px] rounded-xl" />
      </div>
    </div>

    {/* Favourite films: 4 posters in one row. */}
    {withFavouriteFilms && (
      <div className="mt-10">
        <WidgetHead width="w-32" />
        <div className="-mx-3 grid grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="p-1.5 sm:p-3">
              <Bone className="aspect-2/3" />
              <Line line="mt-2 h-4" bar="h-3 w-4/5" />
              <Line line="h-4 sm:hidden" bar="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Recently watched: 8 posters, 3 / 4 columns. */}
    <div className="mt-10">
      <WidgetHead width="w-36" />
      <div className="-mx-3 grid grid-cols-3 sm:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="p-3">
            <Bone className="aspect-2/3" />
            <Line line="mt-2 h-4" bar="h-3 w-4/5" />
            {/* Titles wrap to two lines on phones, and on the second row. */}
            <Line line={cn("h-4", i < 4 && "sm:hidden")} bar="h-3 w-1/2" />
            <Line line="h-4" bar="h-2.5 w-12" />
          </div>
        ))}
      </div>
    </div>
  </Status>
);

/**
 * shadcn `TabsList` (36px) with its mb-6, plus the 8px gap `Tabs` puts before
 * the panel (margins would collapse, so it's all on the list).
 */
const TabsListBone = ({ width }: { width: string }) => (
  <Bone className={cn("mb-8 h-9 rounded-lg", width)} />
);

/** `Games`: intro, trophy summary, tabs, then a 2 / 3 column game grid. */
export const GamesSkeleton = () => (
  <Status>
    <Title className="mb-2" width="w-20" />
    <div className="mb-6">
      <Line line="h-5" bar="h-3.5 w-full" />
      <Line line="h-5 sm:hidden" bar="h-3.5 w-1/3" />
    </div>
    <Bone className="mb-6 h-[114px] rounded-xl sm:h-[66px]" />
    <TabsListBone width="w-[314px]" />
    <div className="-mx-3 grid grid-cols-2 sm:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="p-3">
          <Bone className="aspect-square rounded-lg" />
          <Line line="mt-2.5 h-5" bar={cn("h-3.5", pick(i))} />
          <Line line="mt-0.5 h-4" bar="h-3 w-24" />
        </div>
      ))}
    </div>
  </Status>
);

/** `Uses`: the Software tab, one tile per item from the same data. */
export const UsesSkeleton = () => (
  <Status>
    <Title className="mb-2" width="w-16" />
    <div className="mb-6">
      <Line line="h-5" bar="h-3.5 w-full" />
      <Line line="h-5" bar="h-3.5 w-full sm:w-1/2" />
      <Line line="h-5 sm:hidden" bar="h-3.5 w-1/3" />
    </div>
    <TabsListBone width="w-[300px]" />
    <div className="flex flex-col gap-10">
      {uses.software.map((section) => (
        <div key={section.id}>
          <Line line="mb-2 h-6" bar="h-4 w-32" />
          <div className="-mx-3 grid grid-cols-2 sm:grid-cols-3">
            {section.items.map((item, i) => {
              // Names of 16+ characters wrap below sm. The note is clamped to
              // 2 lines: ~28 characters fit per line from sm, ~18 below it.
              const note = item.note?.length ?? 0;
              return (
                <div
                  key={`${item.name}-${i}`}
                  className="flex items-center gap-3 p-3"
                >
                  <Bone className="size-9 shrink-0" />
                  <div className="flex-1">
                    <Line line="h-5" bar={cn("h-3.5", pick(i))} />
                    {item.name.length >= 16 && (
                      <Line line="h-5 sm:hidden" bar="h-3.5 w-1/3" />
                    )}
                    {note > 0 && <Line line="h-4" bar="h-3 w-4/5" />}
                    {note > 18 && (
                      <Line
                        line={cn("h-4", note <= 28 && "sm:hidden")}
                        bar="h-3 w-1/2"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </Status>
);

export const LinksSkeleton = () => (
  <Status>
    <Title width="w-16" />
    <div className="-mx-3 mt-3 flex flex-col">
      {/* The first link has no description. */}
      {Array.from({ length: 7 }, (_, i) => (
        <ListRow key={i} i={i} bare={i === 0} />
      ))}
    </div>
  </Status>
);

/** `AboutMe`: six social cards, then the taller GitHub card. */
export const AboutSkeleton = () => (
  <Status>
    <Title className="mb-4" width="w-28" />
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {Array.from({ length: 6 }, (_, i) => (
        <Bone key={i} className="h-[82px] rounded-xl" />
      ))}
      <Bone className="h-[230px] rounded-xl" />
    </div>
  </Status>
);
