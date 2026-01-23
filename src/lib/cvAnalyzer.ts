import { CVAnalysis, OptimizedCV } from "@/types/cv";

// Keywords for different categories
const TECH_KEYWORDS = ['javascript', 'typescript', 'react', 'node', 'python', 'java', 'aws', 'docker', 'kubernetes', 'sql', 'mongodb', 'git', 'api', 'agile', 'scrum', 'ci/cd', 'microservices', 'cloud', 'linux', 'html', 'css', 'angular', 'vue', 'graphql', 'rest', 'devops'];
const ACTION_VERBS = ['led', 'developed', 'implemented', 'created', 'designed', 'managed', 'increased', 'reduced', 'improved', 'built', 'launched', 'delivered', 'achieved', 'optimized', 'streamlined', 'collaborated', 'mentored', 'analyzed', 'executed', 'established'];
const METRICS_PATTERNS = [/\d+%/, /\$\d+/, /\d+\s*(users|customers|clients|projects|teams|people)/, /\d+x/, /\d+\s*(million|thousand|k|m)/i];
const SECTIONS = ['experience', 'education', 'skills', 'summary', 'objective', 'projects', 'certifications', 'achievements', 'awards'];

function countKeywords(text: string, keywords: string[]): number {
  const lowerText = text.toLowerCase();
  return keywords.filter(keyword => lowerText.includes(keyword.toLowerCase())).length;
}

function countPatternMatches(text: string, patterns: RegExp[]): number {
  return patterns.reduce((count, pattern) => {
    const matches = text.match(new RegExp(pattern, 'gi'));
    return count + (matches ? matches.length : 0);
  }, 0);
}

function detectCareerLevel(text: string): 'Junior' | 'Mid' | 'Senior' {
  const lowerText = text.toLowerCase();
  const seniorKeywords = ['senior', 'lead', 'principal', 'director', 'manager', 'head of', 'vp', 'chief', '10+ years', '8+ years', '7+ years'];
  const midKeywords = ['mid', '3+ years', '4+ years', '5+ years', '6+ years', 'intermediate'];
  
  const seniorCount = countKeywords(lowerText, seniorKeywords);
  const midCount = countKeywords(lowerText, midKeywords);
  
  if (seniorCount >= 2) return 'Senior';
  if (midCount >= 1 || seniorCount >= 1) return 'Mid';
  return 'Junior';
}

function detectIndustry(text: string): string {
  const industries: Record<string, string[]> = {
    'Technology': ['software', 'developer', 'engineer', 'programming', 'tech', 'it', 'data', 'web', 'mobile', 'app'],
    'Finance': ['finance', 'banking', 'accounting', 'investment', 'trading', 'financial'],
    'Healthcare': ['healthcare', 'medical', 'hospital', 'clinical', 'patient', 'health'],
    'Marketing': ['marketing', 'advertising', 'brand', 'digital marketing', 'seo', 'social media'],
    'Sales': ['sales', 'business development', 'account', 'revenue', 'client'],
    'Education': ['teacher', 'professor', 'education', 'academic', 'university', 'school'],
  };
  
  const lowerText = text.toLowerCase();
  let maxCount = 0;
  let detectedIndustry = 'General';
  
  for (const [industry, keywords] of Object.entries(industries)) {
    const count = countKeywords(lowerText, keywords);
    if (count > maxCount) {
      maxCount = count;
      detectedIndustry = industry;
    }
  }
  
  return detectedIndustry;
}

function extractTargetRoles(text: string): string[] {
  const rolePatterns = [
    /(?:seeking|looking for|applying for|target(?:ing)?)\s+(?:a\s+)?([a-zA-Z\s]+?)(?:\s+position|\s+role|\s+job|\.|\,)/gi,
    /(software engineer|developer|manager|analyst|designer|consultant|specialist|coordinator|director)/gi
  ];
  
  const roles = new Set<string>();
  rolePatterns.forEach(pattern => {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      if (match[1]) {
        roles.add(match[1].trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '));
      } else if (match[0]) {
        roles.add(match[0].trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '));
      }
    }
  });
  
  const roleArray = Array.from(roles).slice(0, 3);
  return roleArray.length > 0 ? roleArray : ['Professional Role'];
}

function analyzeStrengths(text: string, scores: Record<string, number>): { text: string }[] {
  const strengths: { text: string }[] = [];
  const lowerText = text.toLowerCase();
  
  if (scores.keywordOptimization > 60) {
    strengths.push({ text: "Good use of industry-relevant keywords and technical terms" });
  }
  if (countPatternMatches(text, METRICS_PATTERNS) >= 2) {
    strengths.push({ text: "Includes quantifiable achievements with metrics" });
  }
  if (countKeywords(lowerText, ACTION_VERBS) >= 5) {
    strengths.push({ text: "Strong action verbs used to describe accomplishments" });
  }
  if (text.length > 1000) {
    strengths.push({ text: "Comprehensive work history with detailed experience" });
  }
  if (lowerText.includes('certification') || lowerText.includes('certified')) {
    strengths.push({ text: "Professional certifications enhance credibility" });
  }
  if (scores.readabilityStructure > 70) {
    strengths.push({ text: "Well-structured content with clear organization" });
  }
  
  return strengths.length > 0 ? strengths : [{ text: "CV provides basic professional information" }];
}

function analyzeWeaknesses(text: string, scores: Record<string, number>): { text: string }[] {
  const weaknesses: { text: string }[] = [];
  const lowerText = text.toLowerCase();
  
  if (scores.keywordOptimization < 50) {
    weaknesses.push({ text: "Missing industry-specific keywords for ATS optimization" });
  }
  if (countPatternMatches(text, METRICS_PATTERNS) < 2) {
    weaknesses.push({ text: "Lacks measurable achievements and quantifiable results" });
  }
  if (countKeywords(lowerText, ACTION_VERBS) < 3) {
    weaknesses.push({ text: "Weak action verbs - consider using stronger language" });
  }
  if (text.length < 500) {
    weaknesses.push({ text: "CV content is too brief - add more detail" });
  }
  if (!lowerText.includes('summary') && !lowerText.includes('objective') && !lowerText.includes('profile')) {
    weaknesses.push({ text: "Missing professional summary section" });
  }
  if (scores.atsCompatibility < 60) {
    weaknesses.push({ text: "Format may not be fully ATS-compatible" });
  }
  
  return weaknesses.length > 0 ? weaknesses : [{ text: "Consider adding more specific details" }];
}

function generateImprovements(text: string, scores: Record<string, number>): string[] {
  const improvements: string[] = [];
  const lowerText = text.toLowerCase();
  
  if (countPatternMatches(text, METRICS_PATTERNS) < 3) {
    improvements.push("Add specific metrics to achievements (e.g., 'Increased sales by 25%', 'Managed team of 10')");
  }
  if (scores.keywordOptimization < 70) {
    improvements.push("Include more industry-standard keywords relevant to your target role");
  }
  if (!lowerText.includes('summary') && !lowerText.includes('profile')) {
    improvements.push("Add a compelling professional summary at the top of your CV");
  }
  if (countKeywords(lowerText, ACTION_VERBS) < 5) {
    improvements.push("Start bullet points with strong action verbs (Led, Developed, Implemented, etc.)");
  }
  if (!lowerText.includes('skill')) {
    improvements.push("Add a dedicated skills section organized by category");
  }
  if (text.length < 800) {
    improvements.push("Expand on your work experience with more specific accomplishments");
  }
  if (!lowerText.includes('certification') && !lowerText.includes('certified')) {
    improvements.push("Consider adding relevant certifications to strengthen your profile");
  }
  
  return improvements.slice(0, 5);
}

export function analyzeCV(cvText: string): { analysis: CVAnalysis; optimizedCV: OptimizedCV } {
  const wordCount = cvText.split(/\s+/).length;
  const lowerText = cvText.toLowerCase();
  
  // Calculate scores based on actual content
  const techKeywordCount = countKeywords(lowerText, TECH_KEYWORDS);
  const actionVerbCount = countKeywords(lowerText, ACTION_VERBS);
  const metricsCount = countPatternMatches(cvText, METRICS_PATTERNS);
  const sectionsCount = countKeywords(lowerText, SECTIONS);
  
  // ATS Compatibility: based on structure, keywords, and format
  const atsBase = 40;
  const atsBonus = Math.min(sectionsCount * 8, 30) + Math.min(techKeywordCount * 2, 20) + (wordCount > 300 ? 10 : 0);
  const atsCompatibility = Math.min(Math.round(atsBase + atsBonus + Math.random() * 5), 95);
  
  // Content Quality: based on action verbs, metrics, and depth
  const contentBase = 35;
  const contentBonus = Math.min(actionVerbCount * 3, 25) + Math.min(metricsCount * 5, 20) + Math.min(wordCount / 50, 20);
  const contentQuality = Math.min(Math.round(contentBase + contentBonus + Math.random() * 5), 95);
  
  // Keyword Optimization: based on technical and industry keywords
  const keywordBase = 30;
  const keywordBonus = Math.min(techKeywordCount * 4, 40) + Math.min(actionVerbCount * 2, 20) + (metricsCount > 0 ? 10 : 0);
  const keywordOptimization = Math.min(Math.round(keywordBase + keywordBonus + Math.random() * 5), 95);
  
  // Readability & Structure: based on sections and organization
  const readabilityBase = 45;
  const readabilityBonus = Math.min(sectionsCount * 10, 35) + (wordCount > 200 && wordCount < 1500 ? 15 : 5);
  const readabilityStructure = Math.min(Math.round(readabilityBase + readabilityBonus + Math.random() * 5), 95);
  
  // Role Fit: based on keywords and experience indicators
  const roleFitBase = 40;
  const roleFitBonus = Math.min(techKeywordCount * 3, 25) + Math.min(metricsCount * 4, 20) + Math.min(actionVerbCount * 2, 15);
  const roleFit = Math.min(Math.round(roleFitBase + roleFitBonus + Math.random() * 5), 95);
  
  // Overall score
  const overall = Math.round((atsCompatibility + contentQuality + keywordOptimization + readabilityStructure + roleFit) / 5);
  
  const scores = { atsCompatibility, contentQuality, keywordOptimization, readabilityStructure, roleFit, overall };
  
  const analysis: CVAnalysis = {
    careerLevel: detectCareerLevel(cvText),
    industry: detectIndustry(cvText),
    targetRoles: extractTargetRoles(cvText),
    scores,
    strengths: analyzeStrengths(cvText, scores),
    weaknesses: analyzeWeaknesses(cvText, scores),
    improvements: generateImprovements(cvText, scores),
  };
  
  // Generate optimized CV based on detected content
  const optimizedCV: OptimizedCV = {
    professionalSummary: `Results-driven ${analysis.careerLevel} professional with expertise in ${analysis.industry}. Proven track record of delivering impactful solutions and driving business outcomes. Seeking to leverage skills in ${analysis.targetRoles[0] || 'a challenging role'}.`,
    experience: [
      {
        title: analysis.targetRoles[0] || "Professional",
        company: "Your Company",
        period: "Present",
        achievements: [
          "Add your key achievements with specific metrics here",
          "Describe projects you led and their impact",
          "Include measurable results (%, $, numbers)",
        ],
      },
    ],
    skills: {
      hard: TECH_KEYWORDS.filter(k => lowerText.includes(k)).slice(0, 10),
      soft: ["Communication", "Problem Solving", "Team Collaboration", "Leadership"],
    },
    education: [
      {
        degree: "Your Degree",
        institution: "Your Institution",
        year: "Year",
      },
    ],
    certifications: lowerText.includes('certified') ? ["Relevant Certifications"] : [],
  };
  
  return { analysis, optimizedCV };
}
