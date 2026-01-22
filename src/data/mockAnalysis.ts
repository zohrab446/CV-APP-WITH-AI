import { CVAnalysis, OptimizedCV } from "@/types/cv";

export const mockAnalysis: CVAnalysis = {
  careerLevel: "Mid",
  industry: "Technology",
  targetRoles: ["Software Engineer", "Full Stack Developer", "Tech Lead"],
  scores: {
    atsCompatibility: 78,
    contentQuality: 72,
    keywordOptimization: 65,
    readabilityStructure: 85,
    roleFit: 80,
    overall: 76,
  },
  strengths: [
    { text: "Strong technical background with relevant programming skills" },
    { text: "Clear chronological work history with progressive responsibilities" },
    { text: "Quantifiable achievements in recent positions" },
    { text: "Good educational foundation with relevant degree" },
  ],
  weaknesses: [
    { text: "Professional summary lacks specific value proposition" },
    { text: "Missing industry-specific keywords for ATS optimization" },
    { text: "Some bullet points lack measurable impact metrics" },
    { text: "Skills section could be better organized by category" },
  ],
  improvements: [
    "Add specific metrics to all achievement bullets (e.g., 'Increased performance by 40%')",
    "Include more industry-standard keywords like 'Agile', 'CI/CD', 'microservices'",
    "Rewrite professional summary to highlight your unique value proposition in 2-3 sentences",
    "Group skills into categories: Languages, Frameworks, Tools, Soft Skills",
    "Add relevant certifications if available (AWS, Google Cloud, etc.)",
  ],
};

export const mockOptimizedCV: OptimizedCV = {
  professionalSummary:
    "Results-driven Software Engineer with 5+ years of experience building scalable web applications and leading cross-functional teams. Proven track record of delivering high-impact solutions that increased user engagement by 40% and reduced system downtime by 60%. Passionate about clean code, performance optimization, and mentoring junior developers.",
  experience: [
    {
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      period: "2021 - Present",
      achievements: [
        "Led development of microservices architecture serving 2M+ daily active users, improving system reliability by 99.9%",
        "Reduced API response times by 65% through implementation of caching strategies and database optimization",
        "Mentored team of 5 junior developers, conducting weekly code reviews and technical training sessions",
        "Implemented CI/CD pipelines using GitHub Actions, reducing deployment time from 2 hours to 15 minutes",
      ],
    },
    {
      title: "Software Engineer",
      company: "StartupXYZ",
      period: "2019 - 2021",
      achievements: [
        "Developed customer-facing dashboard increasing user engagement by 40% and reducing support tickets by 30%",
        "Built real-time notification system handling 100K+ messages daily using WebSocket and Redis",
        "Collaborated with product team to define technical requirements for 15+ feature releases",
      ],
    },
    {
      title: "Junior Developer",
      company: "Digital Agency Co.",
      period: "2018 - 2019",
      achievements: [
        "Created responsive web applications for 10+ clients using React and Node.js",
        "Improved website load times by 50% through asset optimization and lazy loading implementation",
      ],
    },
  ],
  skills: {
    hard: [
      "JavaScript/TypeScript",
      "React",
      "Node.js",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "Docker",
      "Kubernetes",
      "GraphQL",
      "REST APIs",
      "Git",
    ],
    soft: [
      "Team Leadership",
      "Technical Mentoring",
      "Agile/Scrum",
      "Problem Solving",
      "Communication",
      "Project Management",
    ],
  },
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "State University",
      year: "2018",
    },
  ],
  certifications: [
    "AWS Solutions Architect Associate",
    "Google Cloud Professional Developer",
  ],
};
