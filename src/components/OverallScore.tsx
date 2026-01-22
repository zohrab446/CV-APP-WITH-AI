import { cn } from "@/lib/utils";

interface OverallScoreProps {
  score: number;
}

const getScoreGrade = (score: number) => {
  if (score >= 90) return { grade: "A+", label: "Excellent" };
  if (score >= 80) return { grade: "A", label: "Great" };
  if (score >= 70) return { grade: "B", label: "Good" };
  if (score >= 60) return { grade: "C", label: "Fair" };
  return { grade: "D", label: "Needs Work" };
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "from-success to-accent";
  if (score >= 60) return "from-warning to-accent";
  return "from-destructive to-warning";
};

export const OverallScore = ({ score }: OverallScoreProps) => {
  const { grade, label } = getScoreGrade(score);

  return (
    <div className="relative flex flex-col items-center justify-center p-8 animate-scale-in">
      {/* Circular Progress */}
      <div className="relative w-40 h-40">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-secondary"
          />
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="url(#scoreGradient)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${(score / 100) * 440} 440`}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--success))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
        </svg>

        {/* Score Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn(
            "text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
            getScoreColor(score)
          )}>
            {score}
          </span>
          <span className="text-sm text-muted-foreground font-medium">out of 100</span>
        </div>
      </div>

      {/* Grade Badge */}
      <div className="mt-4 flex items-center gap-3">
        <div className="px-4 py-2 rounded-full gradient-hero">
          <span className="text-lg font-bold text-primary-foreground">{grade}</span>
        </div>
        <span className="text-lg font-semibold text-foreground">{label}</span>
      </div>
    </div>
  );
};
