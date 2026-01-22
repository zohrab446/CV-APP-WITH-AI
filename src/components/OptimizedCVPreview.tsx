import { Download, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OptimizedCV } from "@/types/cv";
import { Badge } from "@/components/ui/badge";

interface OptimizedCVPreviewProps {
  cv: OptimizedCV;
}

export const OptimizedCVPreview = ({ cv }: OptimizedCVPreviewProps) => {
  const [copied, setCopied] = useState(false);

  const generateCVText = () => {
    let text = "PROFESSIONAL SUMMARY\n";
    text += cv.professionalSummary + "\n\n";

    text += "WORK EXPERIENCE\n";
    cv.experience.forEach((exp) => {
      text += `${exp.title} | ${exp.company}\n`;
      text += `${exp.period}\n`;
      exp.achievements.forEach((achievement) => {
        text += `• ${achievement}\n`;
      });
      text += "\n";
    });

    text += "SKILLS\n";
    text += `Technical: ${cv.skills.hard.join(", ")}\n`;
    text += `Soft Skills: ${cv.skills.soft.join(", ")}\n\n`;

    text += "EDUCATION\n";
    cv.education.forEach((edu) => {
      text += `${edu.degree} | ${edu.institution} | ${edu.year}\n`;
    });

    if (cv.certifications.length > 0) {
      text += "\nCERTIFICATIONS\n";
      cv.certifications.forEach((cert) => {
        text += `• ${cert}\n`;
      });
    }

    return text;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateCVText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = generateCVText();
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "optimized-cv.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-card rounded-xl shadow-card overflow-hidden animate-slide-up" style={{ animationDelay: "300ms" }}>
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
        <h3 className="font-semibold text-foreground">Optimized CV</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? (
              <Check className="w-4 h-4 text-success" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button variant="accent" size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </div>

      {/* CV Content */}
      <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto">
        {/* Professional Summary */}
        <section>
          <h4 className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">
            Professional Summary
          </h4>
          <p className="text-sm text-foreground leading-relaxed">
            {cv.professionalSummary}
          </p>
        </section>

        {/* Work Experience */}
        <section>
          <h4 className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">
            Work Experience
          </h4>
          <div className="space-y-4">
            {cv.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-accent/30 pl-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h5 className="font-semibold text-foreground">{exp.title}</h5>
                  <span className="text-xs text-muted-foreground">{exp.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h4 className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">
            Skills
          </h4>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Technical Skills</p>
              <div className="flex flex-wrap gap-2">
                {cv.skills.hard.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Soft Skills</p>
              <div className="flex flex-wrap gap-2">
                {cv.skills.soft.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section>
          <h4 className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">
            Education
          </h4>
          <div className="space-y-2">
            {cv.education.map((edu, index) => (
              <div key={index} className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-foreground">{edu.degree}</p>
                  <p className="text-xs text-muted-foreground">{edu.institution}</p>
                </div>
                <span className="text-xs text-muted-foreground">{edu.year}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        {cv.certifications.length > 0 && (
          <section>
            <h4 className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">
              Certifications
            </h4>
            <div className="flex flex-wrap gap-2">
              {cv.certifications.map((cert, index) => (
                <Badge key={index} className="text-xs gradient-hero">
                  {cert}
                </Badge>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
