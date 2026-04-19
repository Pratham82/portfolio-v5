import { useTheme } from "next-themes";

type ChipProps = {
  label: string;
  onClick?: () => void;
  isSelected?: boolean;
};

const themes = {
  dark: {
    chipBg: "bg-white/[0.07]",
    chipBorder: "border-white/[0.15]",
    chipText: "text-white/80",
    chipHoverBg: "hover:bg-white/[0.12]",
    chipSelectedBg: "bg-white/20",
  },
  light: {
    chipBg: "bg-black/[0.05]",
    chipBorder: "border-black/[0.15]",
    chipText: "text-black/70",
    chipHoverBg: "hover:bg-black/[0.10]",
    chipSelectedBg: "bg-black/15",
  },
} as const;

const Chip = ({ label, onClick, isSelected }: ChipProps) => {
  const { theme: activeTheme } = useTheme();
  const t = themes[(activeTheme as keyof typeof themes) ?? "dark"];

  return (
    <button
      onClick={onClick}
      className={`rounded-lg border px-2 py-1.5 font-mono text-xs transition-colors ${t.chipBg} ${t.chipBorder} ${t.chipText} ${t.chipHoverBg} ${
        isSelected ? t.chipSelectedBg : ""
      }`}
    >
      {label}
    </button>
  );
};

type ChipsProps = {
  skills: { id: string; children?: { id: string }[] }[];
  selectedSkill?: string | null;
  onSkillClick?: (skill: string) => void;
};

const Chips = ({ skills, selectedSkill, onSkillClick }: ChipsProps) => {
  const { theme: activeTheme } = useTheme();
  const t = themes[(activeTheme as keyof typeof themes) ?? "dark"];

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((category) => (
        <div key={category.id} className="flex flex-col gap-1.5">
          <span
            className={`text-xs my-1 font-semibold uppercase tracking-wider ${t.chipText}`}
          >
            {category.id}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {category.children?.map((skill) => (
              <Chip
                key={skill.id}
                label={skill.id}
                onClick={() => onSkillClick?.(skill.id)}
                isSelected={selectedSkill === skill.id}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chips;
