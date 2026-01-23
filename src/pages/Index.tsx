import { useState } from "react";
import { Header } from "@/components/Header";
import { CVUploader } from "@/components/CVUploader";
import { OverallScore } from "@/components/OverallScore";
import { ScoreCard } from "@/components/ScoreCard";
import { AnalysisSection } from "@/components/AnalysisSection";
import { OptimizedCVPreview } from "@/components/OptimizedCVPreview";
import { analyzeCV } from "@/lib/cvAnalyzer";
import { CVAnalysis, OptimizedCV } from "@/types/cv";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, FileCheck } from "lucide-react";

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<CVAnalysis | null>(null);
  const [optimizedCV, setOptimizedCV] = useState<OptimizedCV | null>(null);

  const handleAnalyze = async (content: string) => {
    setIsAnalyzing(true);
    
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Analyze the actual CV content
    const { analysis: cvAnalysis, optimizedCV: cvOptimized } = analyzeCV(content);
    setAnalysis(cvAnalysis);
    setOptimizedCV(cvOptimized);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {!analysis ? (
          <div className="max-w-2xl mx-auto">
            <CVUploader onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Score Overview */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 bg-card rounded-xl shadow-card p-4">
                <OverallScore score={analysis.scores.overall} />
              </div>
              <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                <ScoreCard
                  label="ATS Compatibility"
                  score={analysis.scores.atsCompatibility}
                  delay={0}
                />
                <ScoreCard
                  label="Content Quality"
                  score={analysis.scores.contentQuality}
                  delay={100}
                />
                <ScoreCard
                  label="Keywords"
                  score={analysis.scores.keywordOptimization}
                  delay={200}
                />
                <ScoreCard
                  label="Readability"
                  score={analysis.scores.readabilityStructure}
                  delay={300}
                />
                <ScoreCard
                  label="Role Fit"
                  score={analysis.scores.roleFit}
                  delay={400}
                />
              </div>
            </div>

            {/* Tabs for Analysis and Optimized CV */}
            <Tabs defaultValue="analysis" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
                <TabsTrigger value="analysis" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Analysis
                </TabsTrigger>
                <TabsTrigger value="optimized" className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4" />
                  Optimized CV
                </TabsTrigger>
              </TabsList>

              <TabsContent value="analysis">
                <AnalysisSection analysis={analysis} />
              </TabsContent>

              <TabsContent value="optimized">
                {optimizedCV && <OptimizedCVPreview cv={optimizedCV} />}
              </TabsContent>
            </Tabs>

            {/* New Analysis Button */}
            <div className="flex justify-center pt-8">
              <button
                onClick={() => {
                  setAnalysis(null);
                  setOptimizedCV(null);
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                Analyze another CV
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            AI CV Analyzer — Transform your resume for success
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
