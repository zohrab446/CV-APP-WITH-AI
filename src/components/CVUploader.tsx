import { useState, useRef } from "react";
import { Upload, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface CVUploaderProps {
  onAnalyze: (content: string) => void;
  isAnalyzing: boolean;
}

export const CVUploader = ({ onAnalyze, isAnalyzing }: CVUploaderProps) => {
  const [cvText, setCvText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = async (file: File) => {
    setFileName(file.name);
    const text = await file.text();
    setCvText(text);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleAnalyze = () => {
    if (cvText.trim()) {
      onAnalyze(cvText);
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Upload Area */}
      <div
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer",
          isDragging
            ? "border-accent bg-accent/5 scale-[1.01]"
            : "border-border hover:border-accent/50 hover:bg-muted/30",
          fileName && "border-success bg-success/5"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div
            className={cn(
              "p-4 rounded-full transition-colors duration-300",
              fileName ? "bg-success/10" : "bg-secondary"
            )}
          >
            {fileName ? (
              <FileText className="w-8 h-8 text-success" />
            ) : (
              <Upload className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <div>
            <p className="font-semibold text-foreground">
              {fileName || "Drop your CV here or click to upload"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Supports TXT, PDF, DOC, DOCX files
            </p>
          </div>
        </div>
      </div>

      {/* Or Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-sm text-muted-foreground font-medium">OR</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Text Area */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          Paste your CV content
        </label>
        <Textarea
          placeholder="Paste your CV content here...

Include your:
• Professional Summary
• Work Experience
• Skills
• Education
• Certifications"
          value={cvText}
          onChange={(e) => setCvText(e.target.value)}
          className="min-h-[200px] resize-none bg-card border-border focus:border-accent transition-colors"
        />
      </div>

      {/* Analyze Button */}
      <Button
        variant="hero"
        size="xl"
        className="w-full"
        onClick={handleAnalyze}
        disabled={!cvText.trim() || isAnalyzing}
      >
        {isAnalyzing ? (
          <>
            <Sparkles className="w-5 h-5 animate-pulse-soft" />
            Analyzing your CV...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Analyze & Optimize CV
          </>
        )}
      </Button>
    </div>
  );
};
