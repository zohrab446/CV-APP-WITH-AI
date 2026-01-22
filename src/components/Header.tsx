import { FileText, Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="w-full gradient-hero py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm mb-6">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-primary-foreground/90">
            AI-Powered CV Analysis
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 tracking-tight">
          CV Analyzer & Optimizer
        </h1>
        
        <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
          Transform your resume into an ATS-friendly, professional document that 
          gets you noticed by recruiters and hiring managers.
        </p>

        <div className="flex items-center justify-center gap-6 mt-8 text-primary-foreground/70">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            <span className="text-sm">ATS Optimized</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-primary-foreground/40" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm">AI Enhanced</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-primary-foreground/40" />
          <div className="flex items-center gap-2">
            <span className="text-sm">Free to Use</span>
          </div>
        </div>
      </div>
    </header>
  );
};
