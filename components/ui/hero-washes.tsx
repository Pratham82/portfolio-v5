type Wash = {
  color: string;
  className: string;
  /** Opacity (%) at the center and at `midStop`. */
  peak: number;
  mid: number;
  midStop: number;
};

// Large washes frame the hero; the smaller ones add depth where they overlap.
const WASHES: Wash[] = [
  {
    color: "--wash-iris",
    className: "-left-56 -top-40 h-[600px] w-[740px]",
    peak: 16,
    mid: 7,
    midStop: 45,
  },
  {
    color: "--wash-teal",
    className: "-right-64 top-2 h-[560px] w-[620px]",
    peak: 14,
    mid: 6,
    midStop: 48,
  },
  {
    color: "--wash-rose",
    className: "left-[38%] top-48 h-[340px] w-[380px]",
    peak: 11,
    mid: 5,
    midStop: 45,
  },
  {
    color: "--wash-amber",
    className: "-left-28 top-[340px] h-[300px] w-[320px]",
    peak: 10,
    mid: 4,
    midStop: 45,
  },
  {
    color: "--wash-sky",
    className: "-right-28 top-[520px] h-[400px] w-[440px]",
    peak: 10,
    mid: 4,
    midStop: 48,
  },
];

const gradient = ({ color, peak, mid, midStop }: Wash) =>
  `radial-gradient(closest-side, color-mix(in oklab, var(${color}) ${peak}%, transparent) 0%, color-mix(in oklab, var(${color}) ${mid}%, transparent) ${midStop}%, transparent 100%)`;

/**
 * Soft, static color washes behind the home hero. They're part of the page
 * flow, so they scroll away with it. Colors come from the --wash-* tokens.
 */
const HeroWashes = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
    {WASHES.map((wash) => (
      <div
        key={wash.color}
        className={`absolute ${wash.className}`}
        style={{ background: gradient(wash) }}
      />
    ))}
  </div>
);

export default HeroWashes;
