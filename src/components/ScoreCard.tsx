import { cn } from "@/lib/utils";

interface ScoreCardProps {
  label: string;
  score: number;
  delay?: number;
}

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-warning";
  return "text-destructive";
};

const getProgressColor = (score: number) => {
  if (score >= 80) return "bg-success";
  if (score >= 60) return "bg-warning";
  return "bg-destructive";
};

export const ScoreCard = ({ label, score, delay = 0 }: ScoreCardProps) => {
  return (
    <div
      className="bg-card rounded-xl p-4 shadow-card animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className={cn("text-lg font-bold", getScoreColor(score))}>
          {score}%
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out",
            getProgressColor(score)
          )}
          style={{
            width: `${score}%`,
            animationDelay: `${delay + 200}ms`,
          }}
        />
      </div>
    </div>
  );
};
