export interface CVScore {
  atsCompatibility: number;
  contentQuality: number;
  keywordOptimization: number;
  readabilityStructure: number;
  roleFit: number;
  overall: number;
}

export interface CVStrength {
  text: string;
}

export interface CVWeakness {
  text: string;
}

export interface CVAnalysis {
  careerLevel: 'Junior' | 'Mid' | 'Senior';
  industry: string;
  targetRoles: string[];
  scores: CVScore;
  strengths: CVStrength[];
  weaknesses: CVWeakness[];
  improvements: string[];
}

export interface OptimizedCV {
  professionalSummary: string;
  experience: WorkExperience[];
  skills: {
    hard: string[];
    soft: string[];
  };
  education: Education[];
  certifications: string[];
}

export interface WorkExperience {
  title: string;
  company: string;
  period: string;
  achievements: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}
