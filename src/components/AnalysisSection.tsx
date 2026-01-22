import { CheckCircle, XCircle, Lightbulb, Briefcase, Target } from "lucide-react";
import { CVAnalysis } from "@/types/cv";
import { Badge } from "@/components/ui/badge";

interface AnalysisSectionProps {
  analysis: CVAnalysis;
}

export const AnalysisSection = ({ analysis }: AnalysisSectionProps) => {
  return (
    <div className="space-y-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
      {/* Career Info */}
      <div className="bg-card rounded-xl p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-accent/10">
            <Briefcase className="w-5 h-5 text-accent" />
          </div>
          <h3 className="font-semibold text-foreground">Career Profile</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Career Level</p>
            <Badge variant="secondary" className="text-sm">
              {analysis.careerLevel}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Industry</p>
            <Badge variant="secondary" className="text-sm">
              {analysis.industry}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Target Roles</p>
            <div className="flex flex-wrap gap-1">
              {analysis.targetRoles.map((role, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Strengths */}
      <div className="bg-card rounded-xl p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-success/10">
            <CheckCircle className="w-5 h-5 text-success" />
          </div>
          <h3 className="font-semibold text-foreground">Strengths</h3>
        </div>
        <ul className="space-y-3">
          {analysis.strengths.map((strength, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-success mt-2 shrink-0" />
              <span className="text-sm text-muted-foreground">{strength.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className="bg-card rounded-xl p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-destructive/10">
            <XCircle className="w-5 h-5 text-destructive" />
          </div>
          <h3 className="font-semibold text-foreground">Areas for Improvement</h3>
        </div>
        <ul className="space-y-3">
          {analysis.weaknesses.map((weakness, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
              <span className="text-sm text-muted-foreground">{weakness.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Improvement Tips */}
      <div className="bg-card rounded-xl p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-warning/10">
            <Lightbulb className="w-5 h-5 text-warning" />
          </div>
          <h3 className="font-semibold text-foreground">Actionable Tips</h3>
        </div>
        <ul className="space-y-3">
          {analysis.improvements.map((tip, index) => (
            <li
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
            >
              <Target className="w-4 h-4 text-accent mt-0.5 shrink-0" />
              <span className="text-sm text-foreground">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
