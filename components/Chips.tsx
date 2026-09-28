import { cn } from "@/lib/utils";

type ChipProps = {
  label: string;
  onClick?: () => void;
  isSelected?: boolean;
};

const Chip = ({ label, onClick, isSelected }: ChipProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "rounded-md border border-foreground/15 bg-secondary px-2 py-1 font-mono text-xs text-foreground/90 transition-colors hover:border-foreground/30 hover:bg-accent hover:text-foreground",
      isSelected && "border-foreground/30 bg-accent text-foreground",
    )}
  >
    {label}
  </button>
);

type ChipsProps = {
  skills: { id: string; children?: { id: string }[] }[];
  selectedSkill?: string | null;
  onSkillClick?: (skill: string) => void;
};

const Chips = ({ skills, selectedSkill, onSkillClick }: ChipsProps) => (
  <div className="flex flex-col gap-4">
    {skills.map((category) => (
      <div key={category.id} className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
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

export default Chips;
