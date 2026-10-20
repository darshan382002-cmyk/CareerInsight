import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type SkillGap = { skill: string; status: 'Available' | 'Gap' };
export type Strength = string;
export type RoadmapStep = { step: number; title: string; done: boolean; week: string };
export type AssessmentRec = { id: number; title: string; domain: string; difficulty: string; duration: string; done: boolean };
export type JobRec = { id: number; title: string; company: string; match: number; status: string; focus: string };
export type CareerMatch = { title: string; match: number; color: string; salary: string; skills: string };
export type ClassSuggestion = { id: number; title: string; platform: string; duration: string; level: string; focus: string };

export type StudentProfile = {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  education_level: string;
  degree: string;
  university: string;
  interests: string;
  resume_filename: string;
  resume_uploaded: boolean;
  certificate_filename: string;
  certificate_uploaded: boolean;
  predicted_domain: string;
  career_match_score: number;
  skill_score: number;
  readiness_score: number;
  ats_score: number;
  recommended_career: string;
  skill_gaps: SkillGap[];
  strengths: Strength[];
  roadmap: RoadmapStep[];
  assessments: AssessmentRec[];
  job_recommendations: JobRec[];
  class_suggestions: ClassSuggestion[];
  learning_started: number[];
  assessment_scores: { id: number; score: number }[];
  job_statuses: { id: number; status: string }[];
  industry: string;
  created_at: string;
  updated_at: string;
};

export type NotificationItem = {
  id: string;
  profile_id: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
};

export type MessageItem = {
  id: string;
  profile_id: string;
  student_name: string;
  student_email: string;
  subject: string;
  body: string;
  admin_email: string;
  sent: boolean;
  created_at: string;
};

export type ActivityItem = {
  id: string;
  profile_id: string;
  action: string;
  category: string;
  detail: string;
  created_at: string;
};

export type ResumeAnalysis = {
  id: string;
  student_name: string;
  resume_filename: string;
  overall_score: number;
  communication: number;
  aptitude: number;
  confidence: number;
  performance: number;
  problem_solving: number;
  presentation: number;
  technical_skills: number;
  recommended_career: string;
  career_match_score: number;
  ats_score: number;
  skill_gaps: SkillGap[];
  strengths: Strength[];
  roadmap: RoadmapStep[];
  created_at: string;
};

export const ALL_DOMAINS = [
  'Software Development', 'Web Development', 'Mobile Development',
  'Data Analytics', 'Data Science', 'AI / ML', 'Cloud Computing',
  'Cybersecurity', 'Networking', 'Database', 'Big Data', 'DevOps',
  'Testing / QA', 'UI/UX', 'IoT', 'Blockchain', 'RPA', 'AR/VR',
  'IT Support', 'Business Intelligence', 'Data Engineering',
  // Pharma & Life Sciences
  'Pharmaceutical Sciences', 'Pharmacovigilance', 'Clinical Research',
  'Regulatory Affairs', 'Medical Writing',
  // Biotech
  'Biotechnology', 'Bioinformatics', 'Genomics',
  // Healthcare
  'Healthcare Analytics', 'Medical Devices', 'Health Informatics',
  // Finance
  'Financial Analytics', 'Fintech',
  // Manufacturing
  'Manufacturing Analytics', 'Supply Chain Analytics',
  // General
  'Digital Marketing', 'Human Resources', 'Project Management',
] as const;

export const ALL_INDUSTRIES = [
  'IT / Software',
  'Pharmaceutical',
  'Biotech',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Other',
] as const;

export const INDUSTRY_DOMAIN_MAP: Record<string, string[]> = {
  'IT / Software': [
    'Software Development', 'Web Development', 'Mobile Development', 'Data Analytics', 'Data Science', 'AI / ML', 'Cloud Computing',
    'Cybersecurity', 'Networking', 'Database', 'Big Data', 'DevOps', 'Testing / QA', 'UI/UX', 'IoT', 'Blockchain', 'RPA', 'AR/VR',
    'IT Support', 'Business Intelligence', 'Data Engineering',
  ],
  'Pharmaceutical': [
    'Pharmaceutical Sciences', 'Pharmacovigilance', 'Clinical Research', 'Regulatory Affairs', 'Medical Writing',
    'Healthcare Analytics', 'Data Analytics', 'Project Management',
  ],
  'Biotech': [
    'Biotechnology', 'Bioinformatics', 'Genomics', 'Clinical Research', 'Pharmaceutical Sciences',
    'Data Science', 'AI / ML', 'Healthcare Analytics',
  ],
  'Healthcare': [
    'Healthcare Analytics', 'Medical Devices', 'Health Informatics', 'Clinical Research',
    'Data Analytics', 'IT Support', 'Project Management',
  ],
  'Finance': [
    'Financial Analytics', 'Fintech', 'Business Intelligence', 'Data Analytics',
    'Data Science', 'Cybersecurity', 'Blockchain',
  ],
  'Manufacturing': [
    'Manufacturing Analytics', 'Supply Chain Analytics', 'IoT', 'RPA',
    'Data Analytics', 'Project Management', 'Software Development',
  ],
  'Other': [
    'Digital Marketing', 'Human Resources', 'Project Management', 'Data Analytics', 'Business Intelligence',
  ],
};

type DomainData = {
  skills: string[];
  roadmap: { title: string; week: string }[];
  assessments: { title: string; difficulty: string; duration: string }[];
  jobs: { title: string; company: string; focus: string }[];
  classes: { title: string; platform: string; duration: string; level: string; focus: string }[];
  salary: string;
  careerTitle: string;
};

const DOMAIN_DB: Record<string, DomainData> = {
  'Software Development': {
    skills: ['Java', 'Python', 'C++', 'Data Structures', 'Algorithms', 'OOP', 'Git', 'REST API', 'Debugging', 'System Design'],
    careerTitle: 'Software Developer',
    salary: '₹4–₹12 LPA',
    roadmap: [
      { title: 'Master Data Structures & Algorithms', week: 'Week 1–2' },
      { title: 'Learn OOP and Design Patterns', week: 'Week 3–4' },
      { title: 'Build a Full-Stack Application', week: 'Week 5–6' },
      { title: 'Practice System Design Basics', week: 'Week 7' },
      { title: 'Mock Interviews & Coding Practice', week: 'Week 8' },
    ],
    assessments: [
      { title: 'DSA Fundamentals Quiz', difficulty: 'Beginner', duration: '20 min' },
      { title: 'OOP Concepts Assessment', difficulty: 'Intermediate', duration: '15 min' },
      { title: 'System Design Basics', difficulty: 'Advanced', duration: '30 min' },
      { title: 'Coding Aptitude Test', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Debugging & Code Review', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Junior Software Developer', company: 'Infosys', focus: 'Java · DSA · OOP' },
      { title: 'Backend Developer Trainee', company: 'TCS Digital', focus: 'Python · REST API' },
      { title: 'Full Stack Developer Intern', company: 'Zoho', focus: 'Java · SQL · React' },
      { title: 'Software Engineer Associate', company: 'Wipro', focus: 'C++ · Algorithms' },
    ],
    classes: [
      { title: 'Java Programming Masterclass', platform: 'Udemy', duration: '60 hrs', level: 'Beginner', focus: 'Core Java for placements' },
      { title: 'Data Structures & Algorithms', platform: 'Coursera', duration: '40 hrs', level: 'Intermediate', focus: 'Crack coding interviews' },
      { title: 'System Design Primer', platform: 'YouTube', duration: '15 hrs', level: 'Advanced', focus: ' Scalable architecture' },
      { title: 'Git & GitHub Essentials', platform: 'freeCodeCamp', duration: '5 hrs', level: 'Beginner', focus: 'Version control basics' },
    ],
  },
  'Web Development': {
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'REST API', 'Git', 'Responsive Design'],
    careerTitle: 'Web Developer',
    salary: '₹3–₹10 LPA',
    roadmap: [
      { title: 'Master HTML, CSS & JavaScript', week: 'Week 1–2' },
      { title: 'Learn React Fundamentals', week: 'Week 3–4' },
      { title: 'Build REST APIs with Node.js', week: 'Week 5–6' },
      { title: 'Deploy a Full-Stack Project', week: 'Week 7' },
      { title: 'Portfolio & Interview Prep', week: 'Week 8' },
    ],
    assessments: [
      { title: 'JavaScript Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'React Concepts Quiz', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'CSS & Responsive Design', difficulty: 'Beginner', duration: '15 min' },
      { title: 'Node.js & Express Basics', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Web Security Basics', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Frontend Developer Intern', company: 'Razorpay', focus: 'React · JavaScript' },
      { title: 'Full Stack Web Developer', company: 'Swiggy', focus: 'Node.js · React · MongoDB' },
      { title: 'Web Developer Trainee', company: 'Freshworks', focus: 'HTML · CSS · JS' },
      { title: 'MERN Stack Developer', company: 'CleverTap', focus: 'MongoDB · Express · React · Node' },
    ],
    classes: [
      { title: 'The Complete Web Developer Bootcamp', platform: 'Udemy', duration: '65 hrs', level: 'Beginner', focus: 'Full-stack web dev' },
      { title: 'React - The Complete Guide', platform: 'Coursera', duration: '40 hrs', level: 'Intermediate', focus: 'Modern React apps' },
      { title: 'Node.js & Express.js Masterclass', platform: 'YouTube', duration: '12 hrs', level: 'Intermediate', focus: 'Backend API development' },
      { title: 'CSS Flexbox & Grid Mastery', platform: 'freeCodeCamp', duration: '6 hrs', level: 'Beginner', focus: 'Modern layouts' },
    ],
  },
  'Mobile Development': {
    skills: ['Java', 'Kotlin', 'Swift', 'Flutter', 'Dart', 'React Native', 'Android SDK', 'iOS SDK', 'REST API', 'Firebase'],
    careerTitle: 'Mobile App Developer',
    salary: '₹4–₹11 LPA',
    roadmap: [
      { title: 'Learn Kotlin or Dart Basics', week: 'Week 1–2' },
      { title: 'Build a Simple Mobile App', week: 'Week 3–4' },
      { title: 'Master UI Components & Navigation', week: 'Week 5–6' },
      { title: 'Integrate APIs & Firebase', week: 'Week 7' },
      { title: 'Publish App & Interview Prep', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Android Development Basics', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Flutter & Dart Fundamentals', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Mobile UI/UX Concepts', difficulty: 'Beginner', duration: '15 min' },
      { title: 'REST API Integration', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Firebase & Cloud Messaging', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Android Developer Intern', company: 'PhonePe', focus: 'Kotlin · Android SDK' },
      { title: 'Flutter Developer', company: 'Dunzo', focus: 'Flutter · Dart · Firebase' },
      { title: 'Mobile App Trainee', company: 'BYJU\'S', focus: 'React Native · JavaScript' },
      { title: 'iOS Developer Associate', company: 'Swiggy', focus: 'Swift · iOS SDK' },
    ],
    classes: [
      { title: 'Android App Development with Kotlin', platform: 'Udemy', duration: '50 hrs', level: 'Beginner', focus: 'Native Android apps' },
      { title: 'Flutter & Dart - Complete Guide', platform: 'Coursera', duration: '35 hrs', level: 'Intermediate', focus: 'Cross-platform apps' },
      { title: 'React Native - Practical Guide', platform: 'YouTube', duration: '18 hrs', level: 'Intermediate', focus: 'Cross-platform with React' },
      { title: 'Firebase for Mobile Apps', platform: 'freeCodeCamp', duration: '8 hrs', level: 'Beginner', focus: 'Backend for mobile' },
    ],
  },
  'Data Analytics': {
    skills: ['Excel', 'SQL', 'Python', 'Pandas', 'Tableau', 'Power BI', 'Statistics', 'Data Visualization', ' storytelling', 'Communication'],
    careerTitle: 'Data Analyst',
    salary: '₹4–₹10 LPA',
    roadmap: [
      { title: 'Master Advanced Excel', week: 'Week 1–2' },
      { title: 'Learn SQL Fundamentals', week: 'Week 3' },
      { title: 'Python for Data Analysis', week: 'Week 4–5' },
      { title: 'Data Visualization with Power BI', week: 'Week 6–7' },
      { title: 'Analytics Project & Interview Prep', week: 'Week 8' },
    ],
    assessments: [
      { title: 'SQL Fundamentals Quiz', difficulty: 'Beginner', duration: '15 min' },
      { title: 'Excel for Analytics', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Statistics & Probability', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Data Visualization Concepts', difficulty: 'Beginner', duration: '15 min' },
      { title: 'Python Pandas Assessment', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Junior Data Analyst', company: 'TechCorp India', focus: 'SQL · Python · Excel' },
      { title: 'BI Analyst Intern', company: 'DataSoft Solutions', focus: 'Power BI · SQL' },
      { title: 'Data Analytics Trainee', company: 'InnoAnalytics', focus: 'Python · Statistics' },
      { title: 'Research Analyst', company: 'Global Insights', focus: 'Excel · Communication' },
    ],
    classes: [
      { title: 'Google Data Analytics Professional', platform: 'Coursera', duration: '180 hrs', level: 'Beginner', focus: 'Complete analytics foundation' },
      { title: 'Excel Skills for Business', platform: 'edX', duration: '30 hrs', level: 'Beginner', focus: 'Advanced Excel for jobs' },
      { title: 'SQL for Data Science', platform: 'Udemy', duration: '20 hrs', level: 'Intermediate', focus: 'Database querying' },
      { title: 'Power BI Dashboard Masterclass', platform: 'YouTube', duration: '10 hrs', level: 'Intermediate', focus: 'Visual analytics' },
    ],
  },
  'Data Science': {
    skills: ['Python', 'R', 'Statistics', 'Machine Learning', 'Pandas', 'NumPy', 'Scikit-learn', 'SQL', 'Data Visualization', 'Mathematics'],
    careerTitle: 'Data Scientist',
    salary: '₹6–₹18 LPA',
    roadmap: [
      { title: 'Statistics & Mathematics Foundation', week: 'Week 1–2' },
      { title: 'Python for Data Science', week: 'Week 3–4' },
      { title: 'Machine Learning Algorithms', week: 'Week 5–6' },
      { title: 'Build an End-to-End ML Project', week: 'Week 7' },
      { title: 'Kaggle & Interview Preparation', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Statistics & Probability', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Python for Data Science', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Machine Learning Concepts', difficulty: 'Advanced', duration: '30 min' },
      { title: 'SQL for Data Science', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Data Visualization & Storytelling', difficulty: 'Beginner', duration: '15 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Data Scientist Intern', company: 'Flipkart', focus: 'Python · ML · Statistics' },
      { title: 'Junior Data Scientist', company: 'Mu Sigma', focus: 'R · Analytics · ML' },
      { title: 'ML Trainee', company: 'Fractal Analytics', focus: 'Python · Scikit-learn' },
      { title: 'Data Science Associate', company: 'LatentView', focus: 'Statistics · SQL · Python' },
    ],
    classes: [
      { title: 'IBM Data Science Professional', platform: 'Coursera', duration: '200 hrs', level: 'Beginner', focus: 'Complete DS pipeline' },
      { title: 'Machine Learning by Andrew Ng', platform: 'Coursera', duration: '60 hrs', level: 'Intermediate', focus: 'ML fundamentals' },
      { title: 'Python for Data Science & ML', platform: 'Udemy', duration: '50 hrs', level: 'Beginner', focus: 'Hands-on Python' },
      { title: 'Statistics for Data Science', platform: 'YouTube', duration: '15 hrs', level: 'Intermediate', focus: 'Math foundation' },
    ],
  },
  'AI / ML': {
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'NLP', 'Computer Vision', 'Mathematics', 'Statistics', 'Scikit-learn', 'MLOps'],
    careerTitle: 'AI/ML Engineer',
    salary: '₹6–₹20 LPA',
    roadmap: [
      { title: 'Math & Statistics for ML', week: 'Week 1–2' },
      { title: 'Machine Learning with Scikit-learn', week: 'Week 3–4' },
      { title: 'Deep Learning with TensorFlow/PyTorch', week: 'Week 5–6' },
      { title: 'NLP or Computer Vision Specialization', week: 'Week 7' },
      { title: 'Deploy ML Model & Interview Prep', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Machine Learning Fundamentals', difficulty: 'Advanced', duration: '30 min' },
      { title: 'Deep Learning Concepts', difficulty: 'Advanced', duration: '30 min' },
      { title: 'NLP Basics Quiz', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Computer Vision Assessment', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Python for ML', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'ML Engineer Intern', company: 'Google India', focus: 'TensorFlow · Python · ML' },
      { title: 'AI Engineer Trainee', company: 'Nvidia India', focus: 'Deep Learning · PyTorch' },
      { title: 'NLP Engineer Associate', company: 'Sarvam AI', focus: 'NLP · Transformers · Python' },
      { title: 'Computer Vision Developer', company: 'Tessact', focus: 'OpenCV · CNNs · Python' },
    ],
    classes: [
      { title: 'Deep Learning Specialization', platform: 'Coursera', duration: '80 hrs', level: 'Advanced', focus: 'Neural networks & deep learning' },
      { title: 'TensorFlow Developer Certificate', platform: 'Udemy', duration: '40 hrs', level: 'Intermediate', focus: 'TF for production' },
      { title: 'PyTorch for Deep Learning', platform: 'YouTube', duration: '20 hrs', level: 'Intermediate', focus: 'Hands-on PyTorch' },
      { title: 'NLP with Transformers', platform: 'HuggingFace', duration: '25 hrs', level: 'Advanced', focus: 'Modern NLP' },
    ],
  },
  'Cloud Computing': {
    skills: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Linux', 'Terraform', 'CI/CD', 'Networking', 'Scripting'],
    careerTitle: 'Cloud Engineer',
    salary: '₹5–₹15 LPA',
    roadmap: [
      { title: 'Linux & Networking Fundamentals', week: 'Week 1–2' },
      { title: 'AWS or Azure Core Services', week: 'Week 3–4' },
      { title: 'Docker & Containerization', week: 'Week 5–6' },
      { title: 'Kubernetes Basics & Terraform', week: 'Week 7' },
      { title: 'Cloud Project & Certification Prep', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Cloud Computing Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'AWS Core Services Quiz', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Docker & Containers', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Linux Administration Basics', difficulty: 'Beginner', duration: '15 min' },
      { title: 'Kubernetes Concepts', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Cloud Engineer Intern', company: 'AWS India', focus: 'AWS · Linux · Docker' },
      { title: 'DevOps Cloud Trainee', company: 'Accenture', focus: 'Azure · CI/CD · Terraform' },
      { title: 'Cloud Support Associate', company: 'Infosys', focus: 'GCP · Linux · Networking' },
      { title: 'Cloud Administrator', company: 'TCS', focus: 'AWS · Docker · Scripting' },
    ],
    classes: [
      { title: 'AWS Cloud Practitioner', platform: 'AWS Academy', duration: '40 hrs', level: 'Beginner', focus: 'AWS fundamentals' },
      { title: 'Docker & Kubernetes Complete Guide', platform: 'Udemy', duration: '35 hrs', level: 'Intermediate', focus: 'Container orchestration' },
      { title: 'Azure Fundamentals AZ-900', platform: 'Microsoft Learn', duration: '20 hrs', level: 'Beginner', focus: 'Azure basics' },
      { title: 'Terraform for Cloud Infrastructure', platform: 'YouTube', duration: '12 hrs', level: 'Intermediate', focus: 'Infrastructure as code' },
    ],
  },
  'Cybersecurity': {
    skills: ['Network Security', 'Linux', 'Penetration Testing', 'Cryptography', 'SIEM', 'Python', 'OWASP', 'Firewalls', 'Incident Response', 'Risk Analysis'],
    careerTitle: 'Cybersecurity Analyst',
    salary: '₹5–₹14 LPA',
    roadmap: [
      { title: 'Networking & Linux Fundamentals', week: 'Week 1–2' },
      { title: 'Learn Cryptography & Security Concepts', week: 'Week 3–4' },
      { title: 'Web Application Security (OWASP)', week: 'Week 5–6' },
      { title: 'Penetration Testing Basics', week: 'Week 7' },
      { title: 'Security Project & Certification Prep', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Network Security Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Cryptography Basics', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'OWASP Top 10 Quiz', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Linux for Security', difficulty: 'Beginner', duration: '15 min' },
      { title: 'Incident Response & SIEM', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Security Analyst Intern', company: 'K7 Computing', focus: 'SIEM · Incident Response' },
      { title: 'Cybersecurity Trainee', company: 'TCS Cyber', focus: 'Network Security · Python' },
      { title: 'Pentester Associate', company: 'Safe Security', focus: 'OWASP · Penetration Testing' },
      { title: 'SOC Analyst', company: 'Wipro', focus: 'SIEM · Firewalls · Monitoring' },
    ],
    classes: [
      { title: 'Google Cybersecurity Professional', platform: 'Coursera', duration: '150 hrs', level: 'Beginner', focus: 'Security operations' },
      { title: 'CompTIA Security+ Prep', platform: 'Udemy', duration: '40 hrs', level: 'Intermediate', focus: 'Security fundamentals' },
      { title: 'Web Application Penetration Testing', platform: 'YouTube', duration: '20 hrs', level: 'Intermediate', focus: 'Ethical hacking' },
      { title: 'Python for Security', platform: 'freeCodeCamp', duration: '10 hrs', level: 'Beginner', focus: 'Security scripting' },
    ],
  },
  'Networking': {
    skills: ['TCP/IP', 'Routing', 'Switching', 'Cisco IOS', 'Network Design', 'Firewalls', 'VPN', 'DNS', 'DHCP', 'Troubleshooting'],
    careerTitle: 'Network Engineer',
    salary: '₹3–₹9 LPA',
    roadmap: [
      { title: 'Networking Fundamentals (OSI, TCP/IP)', week: 'Week 1–2' },
      { title: 'Routing & Switching Basics', week: 'Week 3–4' },
      { title: 'Network Security & Firewalls', week: 'Week 5–6' },
      { title: 'Network Design & Troubleshooting', week: 'Week 7' },
      { title: 'CCNA Prep & Interview Practice', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Networking Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'TCP/IP & Subnetting', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Routing Protocols Quiz', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Network Security Basics', difficulty: 'Beginner', duration: '15 min' },
      { title: 'Network Troubleshooting', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Network Engineer Intern', company: 'Airtel', focus: 'Routing · Switching' },
      { title: 'Network Support Associate', company: 'Cisco TAC', focus: 'Cisco IOS · Troubleshooting' },
      { title: 'NOCH Engineer Trainee', company: 'Tata Comm', focus: 'TCP/IP · Monitoring' },
      { title: 'Network Admin', company: 'Reliance', focus: 'Firewalls · VPN · DNS' },
    ],
    classes: [
      { title: 'Cisco CCNA Complete Course', platform: 'Udemy', duration: '50 hrs', level: 'Intermediate', focus: 'CCNA certification' },
      { title: 'Networking Fundamentals', platform: 'YouTube', duration: '15 hrs', level: 'Beginner', focus: 'Core networking' },
      { title: 'Network Security & Firewalls', platform: 'Coursera', duration: '25 hrs', level: 'Intermediate', focus: 'Securing networks' },
      { title: 'Subnetting Masterclass', platform: 'freeCodeCamp', duration: '5 hrs', level: 'Beginner', focus: 'IP addressing' },
    ],
  },
  'Database': {
    skills: ['SQL', 'PostgreSQL', 'MySQL', 'Oracle', 'MongoDB', 'Database Design', 'Normalization', 'Indexing', 'Stored Procedures', 'DBA'],
    careerTitle: 'Database Administrator',
    salary: '₹4–₹12 LPA',
    roadmap: [
      { title: 'SQL Fundamentals & Advanced Queries', week: 'Week 1–2' },
      { title: 'Database Design & Normalization', week: 'Week 3–4' },
      { title: 'Learn PostgreSQL & MySQL Admin', week: 'Week 5–6' },
      { title: 'Performance Tuning & Indexing', week: 'Week 7' },
      { title: 'DBA Project & Interview Prep', week: 'Week 8' },
    ],
    assessments: [
      { title: 'SQL Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Database Design & Normalization', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Advanced SQL Queries', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'PostgreSQL Administration', difficulty: 'Advanced', duration: '25 min' },
      { title: 'NoSQL & MongoDB Basics', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Database Administrator Intern', company: 'Oracle India', focus: 'Oracle · SQL · DBA' },
      { title: 'SQL Developer Trainee', company: 'Cognizant', focus: 'SQL · Stored Procedures' },
      { title: 'Database Engineer', company: 'PostgresPro', focus: 'PostgreSQL · Indexing' },
      { title: 'DBA Associate', company: 'IBM India', focus: 'MySQL · Backup · Tuning' },
    ],
    classes: [
      { title: 'Complete SQL Bootcamp', platform: 'Udemy', duration: '30 hrs', level: 'Beginner', focus: 'SQL from scratch' },
      { title: 'Database Management Systems', platform: 'Coursera', duration: '40 hrs', level: 'Intermediate', focus: 'DBMS concepts' },
      { title: 'PostgreSQL Administration', platform: 'YouTube', duration: '15 hrs', level: 'Intermediate', focus: 'Postgres DBA' },
      { title: 'MongoDB Basics', platform: 'MongoDB University', duration: '10 hrs', level: 'Beginner', focus: 'NoSQL databases' },
    ],
  },
  'Big Data': {
    skills: ['Hadoop', 'Spark', 'Kafka', 'Scala', 'Python', 'Hive', 'HBase', 'Airflow', 'ETL', 'Data Pipelines'],
    careerTitle: 'Big Data Engineer',
    salary: '₹6–₹16 LPA',
    roadmap: [
      { title: 'Big Data Fundamentals & Hadoop', week: 'Week 1–2' },
      { title: 'Apache Spark with Scala/Python', week: 'Week 3–4' },
      { title: 'Kafka & Real-time Data Streaming', week: 'Week 5–6' },
      { title: 'Build ETL Pipelines with Airflow', week: 'Week 7' },
      { title: 'Big Data Project & Interview Prep', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Big Data Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Hadoop & HDFS Concepts', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Apache Spark Quiz', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Kafka & Streaming', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'ETL & Data Pipelines', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Big Data Engineer Intern', company: 'Cloudera', focus: 'Hadoop · Spark · Scala' },
      { title: 'Data Pipeline Engineer', company: 'Flipkart', focus: 'Kafka · Airflow · Python' },
      { title: 'Big Data Trainee', company: 'TCS Big Data', focus: 'Spark · Hive · ETL' },
      { title: 'Hadoop Developer', company: 'Impetus', focus: 'Hadoop · Hive · HBase' },
    ],
    classes: [
      { title: 'Big Data Engineering with Spark', platform: 'Coursera', duration: '50 hrs', level: 'Intermediate', focus: 'Spark & big data' },
      { title: 'Hadoop & Spark Complete Course', platform: 'Udemy', duration: '40 hrs', level: 'Beginner', focus: 'Big data ecosystem' },
      { title: 'Apache Kafka Tutorial', platform: 'YouTube', duration: '12 hrs', level: 'Intermediate', focus: 'Streaming data' },
      { title: 'Airflow for Data Pipelines', platform: 'freeCodeCamp', duration: '8 hrs', level: 'Intermediate', focus: 'Workflow orchestration' },
    ],
  },
  'DevOps': {
    skills: ['Docker', 'Kubernetes', 'Jenkins', 'Git', 'CI/CD', 'Ansible', 'Terraform', 'Linux', 'AWS', 'Monitoring'],
    careerTitle: 'DevOps Engineer',
    salary: '₹5–₹15 LPA',
    roadmap: [
      { title: 'Linux & Git Fundamentals', week: 'Week 1–2' },
      { title: 'Docker & Containerization', week: 'Week 3–4' },
      { title: 'CI/CD with Jenkins & GitLab', week: 'Week 5–6' },
      { title: 'Kubernetes & Infrastructure as Code', week: 'Week 7' },
      { title: 'DevOps Project & Interview Prep', week: 'Week 8' },
    ],
    assessments: [
      { title: 'DevOps Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Docker Concepts Quiz', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Kubernetes Assessment', difficulty: 'Advanced', duration: '25 min' },
      { title: 'CI/CD Pipeline Concepts', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Linux & Shell Scripting', difficulty: 'Beginner', duration: '15 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'DevOps Engineer Intern', company: 'Razorpay', focus: 'Docker · Jenkins · AWS' },
      { title: 'DevOps Trainee', company: 'Accenture', focus: 'Kubernetes · CI/CD · Terraform' },
      { title: 'Site Reliability Engineer', company: 'Swiggy', focus: 'Linux · Monitoring · Docker' },
      { title: 'Cloud DevOps Associate', company: 'Wipro', focus: 'AWS · Ansible · Git' },
    ],
    classes: [
      { title: 'DevOps Engineering Course', platform: 'Udemy', duration: '50 hrs', level: 'Intermediate', focus: 'Complete DevOps pipeline' },
      { title: 'Docker & Kubernetes for Beginners', platform: 'Coursera', duration: '35 hrs', level: 'Beginner', focus: 'Containerization' },
      { title: 'Jenkins CI/CD Tutorial', platform: 'YouTube', duration: '10 hrs', level: 'Intermediate', focus: 'CI/CD pipelines' },
      { title: 'Terraform & Ansible', platform: 'freeCodeCamp', duration: '12 hrs', level: 'Intermediate', focus: 'Infrastructure automation' },
    ],
  },
  'Testing / QA': {
    skills: ['Selenium', 'Test Automation', 'Manual Testing', 'Java', 'Python', 'JMeter', 'API Testing', 'Bug Tracking', 'Test Cases', 'CI/CD'],
    careerTitle: 'QA Engineer',
    salary: '₹3–₹9 LPA',
    roadmap: [
      { title: 'Software Testing Fundamentals', week: 'Week 1–2' },
      { title: 'Manual Testing & Test Case Design', week: 'Week 3–4' },
      { title: 'Automation with Selenium', week: 'Week 5–6' },
      { title: 'API Testing & Performance Testing', week: 'Week 7' },
      { title: 'QA Project & Interview Prep', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Software Testing Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Test Case Design', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Selenium Automation Quiz', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'API Testing Concepts', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Performance & Load Testing', difficulty: 'Advanced', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'QA Engineer Intern', company: 'SAP Labs', focus: 'Selenium · Java · Automation' },
      { title: 'Manual Testing Trainee', company: 'Cognizant', focus: 'Test Cases · Bug Tracking' },
      { title: 'Automation Tester', company: 'Thoucentric', focus: 'Python · Selenium · API' },
      { title: 'QA Associate', company: 'Infosys', focus: 'Manual · JMeter · CI/CD' },
    ],
    classes: [
      { title: 'Software Testing Masterclass', platform: 'Udemy', duration: '40 hrs', level: 'Beginner', focus: 'Manual & automation' },
      { title: 'Selenium WebDriver with Java', platform: 'Coursera', duration: '30 hrs', level: 'Intermediate', focus: 'Test automation' },
      { title: 'API Testing with Postman', platform: 'YouTube', duration: '10 hrs', level: 'Beginner', focus: 'API testing' },
      { title: 'JMeter for Performance Testing', platform: 'freeCodeCamp', duration: '8 hrs', level: 'Intermediate', focus: 'Load testing' },
    ],
  },
  'UI/UX': {
    skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Adobe XD', 'Interaction Design', 'Usability Testing', 'CSS', 'Accessibility'],
    careerTitle: 'UI/UX Designer',
    salary: '₹4–₹12 LPA',
    roadmap: [
      { title: 'Design Fundamentals & Principles', week: 'Week 1–2' },
      { title: 'Master Figma & Wireframing', week: 'Week 3–4' },
      { title: 'User Research & Usability Testing', week: 'Week 5–6' },
      { title: 'Build a Design System & Prototype', week: 'Week 7' },
      { title: 'Portfolio & Interview Prep', week: 'Week 8' },
    ],
    assessments: [
      { title: 'UI/UX Design Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Figma & Prototyping Quiz', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'User Research Methods', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Design Systems & Accessibility', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Interaction Design Concepts', difficulty: 'Beginner', duration: '15 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'UI/UX Designer Intern', company: 'Zomato', focus: 'Figma · User Research' },
      { title: 'Product Design Trainee', company: 'Razorpay', focus: 'Prototyping · Design Systems' },
      { title: 'UX Designer Associate', company: 'PhonePe', focus: 'Wireframing · Usability' },
      { title: 'Interaction Designer', company: 'Freshworks', focus: 'Adobe XD · Interaction' },
    ],
    classes: [
      { title: 'Google UX Design Professional', platform: 'Coursera', duration: '150 hrs', level: 'Beginner', focus: 'Complete UX process' },
      { title: 'Figma Complete Course', platform: 'Udemy', duration: '25 hrs', level: 'Beginner', focus: 'Figma mastery' },
      { title: 'Design Systems & Prototyping', platform: 'YouTube', duration: '12 hrs', level: 'Intermediate', focus: 'Scalable design' },
      { title: 'User Research Methods', platform: 'NNGroup', duration: '10 hrs', level: 'Intermediate', focus: 'Research techniques' },
    ],
  },
  'IoT': {
    skills: ['Arduino', 'Raspberry Pi', 'C/C++', 'Python', 'Sensors', 'MQTT', 'Embedded Systems', 'Networking', 'Cloud IoT', 'Prototyping'],
    careerTitle: 'IoT Developer',
    salary: '₹4–₹11 LPA',
    roadmap: [
      { title: 'Electronics & Sensor Fundamentals', week: 'Week 1–2' },
      { title: 'Arduino & Raspberry Pi Programming', week: 'Week 3–4' },
      { title: 'IoT Protocols (MQTT, CoAP)', week: 'Week 5–6' },
      { title: 'Cloud IoT Platform Integration', week: 'Week 7' },
      { title: 'IoT Project & Interview Prep', week: 'Week 8' },
    ],
    assessments: [
      { title: 'IoT Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Arduino & Sensors Quiz', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Embedded Systems Concepts', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'IoT Protocols (MQTT)', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Cloud IoT Integration', difficulty: 'Advanced', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'IoT Developer Intern', company: 'Bosch India', focus: 'Arduino · Sensors · Python' },
      { title: 'Embedded IoT Engineer', company: 'Tata Elxsi', focus: 'C/C++ · Embedded · MQTT' },
      { title: 'IoT Trainee', company: 'Wipro IoT', focus: 'Raspberry Pi · Cloud IoT' },
      { title: 'IoT Solutions Associate', company: 'L&T Tech', focus: 'Sensors · Networking · Prototyping' },
    ],
    classes: [
      { title: 'IoT Specialization', platform: 'Coursera', duration: '60 hrs', level: 'Beginner', focus: 'Complete IoT pipeline' },
      { title: 'Arduino & Raspberry Pi Projects', platform: 'Udemy', duration: '30 hrs', level: 'Beginner', focus: 'Hands-on IoT' },
      { title: 'Embedded Systems Programming', platform: 'YouTube', duration: '15 hrs', level: 'Intermediate', focus: 'Embedded C' },
      { title: 'MQTT & IoT Protocols', platform: 'freeCodeCamp', duration: '6 hrs', level: 'Intermediate', focus: 'IoT communication' },
    ],
  },
  'Blockchain': {
    skills: ['Solidity', 'Ethereum', 'Smart Contracts', 'Web3.js', 'Cryptography', 'Go', 'Hyperledger', 'Truffle', 'DeFi', 'Token Standards'],
    careerTitle: 'Blockchain Developer',
    salary: '₹6–₹18 LPA',
    roadmap: [
      { title: 'Cryptography & Blockchain Fundamentals', week: 'Week 1–2' },
      { title: 'Solidity & Smart Contracts', week: 'Week 3–4' },
      { title: 'Ethereum & Web3.js', week: 'Week 5–6' },
      { title: 'Build a DApp', week: 'Week 7' },
      { title: 'Blockchain Project & Interview Prep', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Blockchain Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Solidity & Smart Contracts', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Ethereum & Web3 Quiz', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Cryptography for Blockchain', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'DeFi & Token Standards', difficulty: 'Advanced', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Blockchain Developer Intern', company: 'Polygon', focus: 'Solidity · Ethereum · Web3' },
      { title: 'Smart Contract Engineer', company: 'CoinDCX', focus: 'Solidity · DeFi · Security' },
      { title: 'Blockchain Trainee', company: 'Infosys Blockchain', focus: 'Hyperledger · Go' },
      { title: 'Web3 Developer Associate', company: 'Biconomy', focus: 'Web3.js · Smart Contracts' },
    ],
    classes: [
      { title: 'Blockchain Specialization', platform: 'Coursera', duration: '70 hrs', level: 'Intermediate', focus: 'Complete blockchain' },
      { title: 'Ethereum & Solidity Complete Course', platform: 'Udemy', duration: '40 hrs', level: 'Intermediate', focus: 'Smart contracts' },
      { title: 'Web3 Development Tutorial', platform: 'YouTube', duration: '15 hrs', level: 'Intermediate', focus: 'DApp development' },
      { title: 'Hyperledger for Enterprise', platform: 'freeCodeCamp', duration: '10 hrs', level: 'Advanced', focus: 'Enterprise blockchain' },
    ],
  },
  'RPA': {
    skills: ['UiPath', 'Automation Anywhere', 'Blue Prism', 'Python', 'VBA', 'Process Mapping', 'OCR', 'Workflow Design', 'Excel Automation', 'Bot Development'],
    careerTitle: 'RPA Developer',
    salary: '₹4–₹10 LPA',
    roadmap: [
      { title: 'RPA Fundamentals & Process Mapping', week: 'Week 1–2' },
      { title: 'Master UiPath Studio', week: 'Week 3–4' },
      { title: 'Automation Anywhere & Blue Prism', week: 'Week 5–6' },
      { title: 'Build End-to-End Bots', week: 'Week 7' },
      { title: 'RPA Project & Interview Prep', week: 'Week 8' },
    ],
    assessments: [
      { title: 'RPA Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'UiPath Studio Quiz', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Process Mapping & Automation', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'OCR & Data Extraction', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Bot Development Concepts', difficulty: 'Beginner', duration: '15 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'RPA Developer Intern', company: 'UiPath', focus: 'UiPath · OCR · Python' },
      { title: 'Automation Engineer Trainee', company: 'Accenture', focus: 'Blue Prism · VBA · Excel' },
      { title: 'RPA Developer', company: 'Cognizant', focus: 'Automation Anywhere · Workflows' },
      { title: 'RPA Associate', company: 'TCS BPS', focus: 'UiPath · Process Mapping · Bots' },
    ],
    classes: [
      { title: 'UiPath RPA Developer Course', platform: 'UiPath Academy', duration: '40 hrs', level: 'Beginner', focus: 'UiPath certification' },
      { title: 'RPA - Automation Anywhere', platform: 'Udemy', duration: '25 hrs', level: 'Intermediate', focus: 'AA platform' },
      { title: 'Python for RPA', platform: 'YouTube', duration: '10 hrs', level: 'Intermediate', focus: 'Scripting automation' },
      { title: 'Excel Automation with VBA', platform: 'freeCodeCamp', duration: '8 hrs', level: 'Beginner', focus: 'Excel macros' },
    ],
  },
  'AR/VR': {
    skills: ['Unity', 'C#', '3D Modeling', 'Blender', 'AR Foundation', 'Vuforia', 'Oculus SDK', 'Shader Programming', 'UX for AR/VR', '3D Math'],
    careerTitle: 'AR/VR Developer',
    salary: '₹5–₹14 LPA',
    roadmap: [
      { title: 'Unity & C# Fundamentals', week: 'Week 1–2' },
      { title: '3D Modeling with Blender', week: 'Week 3–4' },
      { title: 'AR Development with AR Foundation', week: 'Week 5–6' },
      { title: 'VR Development with Oculus SDK', week: 'Week 7' },
      { title: 'AR/VR Project & Interview Prep', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Unity & C# Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: '3D Modeling Concepts', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'AR Development Quiz', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'VR Development Concepts', difficulty: 'Advanced', duration: '25 min' },
      { title: '3D Math & Shaders', difficulty: 'Advanced', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'AR/VR Developer Intern', company: 'Niantic', focus: 'Unity · AR Foundation · C#' },
      { title: 'Unity Developer', company: 'Gametheory', focus: 'Unity · 3D · Shaders' },
      { title: 'VR Developer Trainee', company: 'Tata Elxsi', focus: 'Oculus SDK · Unity · VR' },
      { title: 'XR Associate', company: 'Scapic', focus: 'Vuforia · 3D Modeling · AR' },
    ],
    classes: [
      { title: 'Unity AR/VR Development', platform: 'Udemy', duration: '40 hrs', level: 'Intermediate', focus: 'Unity for XR' },
      { title: '3D Modeling with Blender', platform: 'YouTube', duration: '20 hrs', level: 'Beginner', focus: '3D assets' },
      { title: 'AR Foundation Tutorial', platform: 'Coursera', duration: '15 hrs', level: 'Intermediate', focus: 'AR apps' },
      { title: 'C# for Unity', platform: 'freeCodeCamp', duration: '10 hrs', level: 'Beginner', focus: 'Unity scripting' },
    ],
  },
  'IT Support': {
    skills: ['Windows Server', 'Linux', 'Active Directory', 'Networking', 'Hardware', 'Troubleshooting', 'Office 365', 'Helpdesk', 'Remote Support', 'Ticketing'],
    careerTitle: 'IT Support Specialist',
    salary: '₹3–₹7 LPA',
    roadmap: [
      { title: 'Hardware & OS Fundamentals', week: 'Week 1–2' },
      { title: 'Networking & Troubleshooting', week: 'Week 3–4' },
      { title: 'Windows Server & Active Directory', week: 'Week 5–6' },
      { title: 'Office 365 & Helpdesk Tools', week: 'Week 7' },
      { title: 'IT Support Project & Interview Prep', week: 'Week 8' },
    ],
    assessments: [
      { title: 'IT Support Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Networking Basics', difficulty: 'Beginner', duration: '15 min' },
      { title: 'Windows Server & AD', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Hardware Troubleshooting', difficulty: 'Beginner', duration: '15 min' },
      { title: 'Office 365 Administration', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'IT Support Intern', company: 'IBM India', focus: 'Windows · AD · Helpdesk' },
      { title: 'Desktop Support Engineer', company: 'Wipro', focus: 'Hardware · Office 365 · Troubleshooting' },
      { title: 'Helpdesk Trainee', company: 'HCL', focus: 'Ticketing · Remote Support · Networking' },
      { title: 'IT Support Associate', company: 'Infosys', focus: 'Linux · Windows Server · AD' },
    ],
    classes: [
      { title: 'Google IT Support Professional', platform: 'Coursera', duration: '100 hrs', level: 'Beginner', focus: 'Complete IT support' },
      { title: 'CompTIA A+ Certification', platform: 'Udemy', duration: '30 hrs', level: 'Beginner', focus: 'Hardware & OS' },
      { title: 'Windows Server Administration', platform: 'YouTube', duration: '15 hrs', level: 'Intermediate', focus: 'Server management' },
      { title: 'Office 365 for Admins', platform: 'Microsoft Learn', duration: '10 hrs', level: 'Beginner', focus: 'O365 admin' },
    ],
  },
  'Business Intelligence': {
    skills: ['Power BI', 'Tableau', 'SQL', 'Excel', 'ETL', 'Data Warehousing', 'DAX', 'Data Modeling', 'Python', 'Reporting'],
    careerTitle: 'BI Analyst',
    salary: '₹4–₹11 LPA',
    roadmap: [
      { title: 'SQL & Data Warehousing Basics', week: 'Week 1–2' },
      { title: 'Master Power BI & DAX', week: 'Week 3–4' },
      { title: 'Tableau for Dashboards', week: 'Week 5–6' },
      { title: 'Data Modeling & ETL', week: 'Week 7' },
      { title: 'BI Project & Interview Prep', week: 'Week 8' },
    ],
    assessments: [
      { title: 'BI Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Power BI & DAX Quiz', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Tableau Concepts', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'SQL for BI', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Data Warehousing & ETL', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'BI Analyst Intern', company: 'Microsoft India', focus: 'Power BI · SQL · DAX' },
      { title: 'Tableau Developer', company: 'ZS Associates', focus: 'Tableau · Data Modeling · SQL' },
      { title: 'BI Trainee', company: 'TCS BI', focus: 'Power BI · Excel · ETL' },
      { title: 'Reporting Analyst', company: 'Accenture', focus: 'SQL · Tableau · Reporting' },
    ],
    classes: [
      { title: 'Microsoft Power BI Data Analyst', platform: 'Microsoft Learn', duration: '40 hrs', level: 'Intermediate', focus: 'Power BI & DAX' },
      { title: 'Tableau for Business Intelligence', platform: 'Udemy', duration: '30 hrs', level: 'Beginner', focus: 'Tableau dashboards' },
      { title: 'Data Warehousing Concepts', platform: 'Coursera', duration: '20 hrs', level: 'Intermediate', focus: 'Data warehouse design' },
      { title: 'DAX Masterclass', platform: 'YouTube', duration: '10 hrs', level: 'Advanced', focus: 'Advanced DAX formulas' },
    ],
  },
  'Data Engineering': {
    skills: ['Python', 'SQL', 'Spark', 'Airflow', 'Kafka', 'ETL', 'Snowflake', 'AWS Redshift', 'dbt', 'Data Warehousing'],
    careerTitle: 'Data Engineer',
    salary: '₹6–₹16 LPA',
    roadmap: [
      { title: 'Advanced SQL & Python for Data', week: 'Week 1–2' },
      { title: 'ETL Pipelines with Airflow', week: 'Week 3–4' },
      { title: 'Spark for Big Data Processing', week: 'Week 5–6' },
      { title: 'Data Warehousing with Snowflake', week: 'Week 7' },
      { title: 'Data Engineering Project & Interview', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Data Engineering Fundamentals', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Python & SQL for DE', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Spark & Big Data Processing', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Airflow & ETL Pipelines', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Data Warehousing Concepts', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Data Engineer Intern', company: 'Swiggy', focus: 'Python · Spark · Airflow' },
      { title: 'ETL Developer Trainee', company: 'Cognizant', focus: 'SQL · Airflow · Snowflake' },
      { title: 'Data Platform Engineer', company: 'Flipkart', focus: 'Kafka · Spark · AWS Redshift' },
      { title: 'Data Engineering Associate', company: 'Zomato', focus: 'Python · dbt · Snowflake' },
    ],
    classes: [
      { title: 'Data Engineering Specialization', platform: 'Coursera', duration: '80 hrs', level: 'Intermediate', focus: 'Complete DE pipeline' },
      { title: 'Apache Spark for Data Engineering', platform: 'Udemy', duration: '35 hrs', level: 'Intermediate', focus: 'Spark processing' },
      { title: 'Airflow & ETL Pipelines', platform: 'YouTube', duration: '15 hrs', level: 'Intermediate', focus: 'Workflow orchestration' },
      { title: 'Snowflake & Data Warehousing', platform: 'freeCodeCamp', duration: '10 hrs', level: 'Advanced', focus: 'Cloud data warehouse' },
    ],
  },
  'Pharmaceutical Sciences': {
    skills: ['Pharmacology', 'Pharmaceutics', 'GMP', 'Drug Development', 'Quality Control', 'Analytical Chemistry', 'Regulatory Knowledge', 'Documentation', 'FDA Guidelines', 'Validation'],
    careerTitle: 'Pharmaceutical Scientist',
    salary: '₹3–₹9 LPA',
    roadmap: [
      { title: 'Pharmacology & Drug Action Fundamentals', week: 'Week 1–2' },
      { title: 'Pharmaceutics & Formulation', week: 'Week 3–4' },
      { title: 'GMP & Quality Control', week: 'Week 5–6' },
      { title: 'Regulatory Guidelines (FDA/CDSCO)', week: 'Week 7' },
      { title: 'Industry Project & Interview Prep', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Pharmacology Basics', difficulty: 'Beginner', duration: '20 min' },
      { title: 'GMP & Quality Systems', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Drug Development Process', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Analytical Techniques', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Regulatory Affairs Fundamentals', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Pharma Research Associate', company: 'Sun Pharma', focus: 'Pharmacology · GMP' },
      { title: 'QC Analyst Trainee', company: 'Dr. Reddy\'s', focus: 'Analytical Chemistry · HPLC' },
      { title: 'Formulation Scientist Intern', company: 'Cipla', focus: 'Pharmaceutics · Validation' },
      { title: 'Regulatory Associate', company: 'Lupin', focus: 'FDA · Documentation' },
    ],
    classes: [
      { title: 'Pharmaceutical Sciences Fundamentals', platform: 'Coursera', duration: '50 hrs', level: 'Beginner', focus: 'Complete pharma foundation' },
      { title: 'GMP for Pharmaceutical Industry', platform: 'edX', duration: '30 hrs', level: 'Intermediate', focus: 'Quality manufacturing' },
      { title: 'Drug Regulatory Affairs', platform: 'Udemy', duration: '25 hrs', level: 'Intermediate', focus: 'FDA & CDSCO guidelines' },
      { title: 'Analytical Methods in Pharma', platform: 'YouTube', duration: '12 hrs', level: 'Advanced', focus: 'HPLC, GC, dissolution testing' },
    ],
  },
  'Pharmacovigilance': {
    skills: ['ADR Reporting', 'ICSR', 'Pharmacovigilance', 'Medical Coding', 'Argus Safety', 'VigiFlow', 'Risk Management', 'Literature Review', 'Regulatory Submission', 'Communication'],
    careerTitle: 'Pharmacovigilance Associate',
    salary: '₹3–₹7 LPA',
    roadmap: [
      { title: 'Introduction to Pharmacovigilance', week: 'Week 1–2' },
      { title: 'ADR & ICSR Reporting', week: 'Week 3–4' },
      { title: 'Safety Database (Argus/VigiFlow)', week: 'Week 5–6' },
      { title: 'Risk Management & Signal Detection', week: 'Week 7' },
      { title: 'Regulatory Submission & Interview', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Pharmacovigilance Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'ICSR & ADR Reporting', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Safety Database Quiz', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Signal Detection & Risk Management', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Regulatory Submissions', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Pharmacovigilance Associate', company: 'Novartis', focus: 'ICSR · Argus' },
      { title: 'Drug Safety Trainee', company: 'Pfizer India', focus: 'ADR · Reporting' },
      { title: 'PV Scientist Intern', company: 'TCS Life Sciences', focus: 'VigiFlow · Literature' },
      { title: 'Case Processing Associate', company: 'Accenture Life Sciences', focus: 'Argus · Coding' },
    ],
    classes: [
      { title: 'Pharmacovigilance Professional Certificate', platform: 'Coursera', duration: '60 hrs', level: 'Beginner', focus: 'Complete PV training' },
      { title: 'ICSR & ADR Reporting Mastery', platform: 'Udemy', duration: '25 hrs', level: 'Intermediate', focus: 'Case processing' },
      { title: 'Argus Safety Database Training', platform: 'YouTube', duration: '15 hrs', level: 'Intermediate', focus: 'Safety database' },
      { title: 'Drug Safety Regulations', platform: 'edX', duration: '20 hrs', level: 'Beginner', focus: 'Global PV regulations' },
    ],
  },
  'Clinical Research': {
    skills: ['GCP', 'Clinical Trials', 'Protocol Design', 'ICF', 'CRF', 'Monitoring', 'Pharmacokinetics', 'Biostatistics', 'Regulatory Affairs', 'Data Management'],
    careerTitle: 'Clinical Research Associate',
    salary: '₹3–₹8 LPA',
    roadmap: [
      { title: 'GCP & Clinical Trial Fundamentals', week: 'Week 1–2' },
      { title: 'Protocol Design & CRF', week: 'Week 3–4' },
      { title: 'Clinical Monitoring & Site Visits', week: 'Week 5–6' },
      { title: 'Data Management & Biostatistics', week: 'Week 7' },
      { title: 'Regulatory Submission & Interview', week: 'Week 8' },
    ],
    assessments: [
      { title: 'GCP Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Clinical Trial Phases', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Protocol & CRF Design', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Clinical Monitoring', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Biostatistics for Clinical Research', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Clinical Research Associate', company: 'IQVIA', focus: 'GCP · Monitoring' },
      { title: 'CRA Trainee', company: 'Syngene', focus: 'Trials · CRF' },
      { title: 'Clinical Data Intern', company: 'Parexel', focus: 'Data Mgmt · Biostatistics' },
      { title: 'Trial Coordinator', company: 'Fortis Clinical', focus: 'Protocol · ICF' },
    ],
    classes: [
      { title: 'Clinical Research Professional Certificate', platform: 'Coursera', duration: '80 hrs', level: 'Beginner', focus: 'Complete CR training' },
      { title: 'GCP for Clinical Research', platform: 'edX', duration: '20 hrs', level: 'Beginner', focus: 'Good Clinical Practice' },
      { title: 'Clinical Trial Design', platform: 'Udemy', duration: '30 hrs', level: 'Intermediate', focus: 'Protocol & methodology' },
      { title: 'Biostatistics for Clinicians', platform: 'YouTube', duration: '15 hrs', level: 'Advanced', focus: 'Statistical methods' },
    ],
  },
  'Regulatory Affairs': {
    skills: ['Regulatory Submission', 'FDA Guidelines', 'CDSCO', 'ICH Guidelines', 'Dossier Preparation', 'CTD Format', 'Labeling', 'Compliance', 'Documentation', 'Communication'],
    careerTitle: 'Regulatory Affairs Associate',
    salary: '₹4–₹9 LPA',
    roadmap: [
      { title: 'Regulatory Framework (FDA/CDSCO/EMA)', week: 'Week 1–2' },
      { title: 'ICH Guidelines & CTD Format', week: 'Week 3–4' },
      { title: 'Dossier Preparation & eCTD', week: 'Week 5–6' },
      { title: 'Labeling & Compliance', week: 'Week 7' },
      { title: 'Submission Project & Interview', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Regulatory Framework Quiz', difficulty: 'Beginner', duration: '20 min' },
      { title: 'ICH & CTD Guidelines', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Dossier Preparation', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Labeling & Compliance', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Global Submission Strategy', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Regulatory Affairs Associate', company: 'Glenmark', focus: 'CTD · CDSCO' },
      { title: 'Regulatory Trainee', company: 'Zydus', focus: 'FDA · Dossier' },
      { title: 'Submission Associate', company: 'Biocon', focus: 'eCTD · ICH' },
      { title: 'Compliance Officer', company: 'Alembic', focus: 'Labeling · Compliance' },
    ],
    classes: [
      { title: 'Regulatory Affairs Certificate', platform: 'Coursera', duration: '60 hrs', level: 'Beginner', focus: 'Complete RA training' },
      { title: 'CTD & eCTD Preparation', platform: 'Udemy', duration: '25 hrs', level: 'Intermediate', focus: 'Dossier formatting' },
      { title: 'FDA & CDSCO Regulations', platform: 'YouTube', duration: '12 hrs', level: 'Intermediate', focus: 'Global regulations' },
      { title: 'ICH Guidelines Masterclass', platform: 'edX', duration: '15 hrs', level: 'Advanced', focus: 'Quality, safety, efficacy' },
    ],
  },
  'Medical Writing': {
    skills: ['Medical Terminology', 'Scientific Writing', 'Clinical Documentation', 'Manuscript Writing', 'Regulatory Writing', 'Literature Review', 'Editing', 'Data Interpretation', 'Communication', 'Attention to Detail'],
    careerTitle: 'Medical Writer',
    salary: '₹4–₹10 LPA',
    roadmap: [
      { title: 'Medical Terminology & Scientific Writing', week: 'Week 1–2' },
      { title: 'Clinical & Regulatory Documents', week: 'Week 3–4' },
      { title: 'Manuscript & Publication Writing', week: 'Week 5–6' },
      { title: 'Literature Review & Data Interpretation', week: 'Week 7' },
      { title: 'Writing Portfolio & Interview', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Medical Terminology Quiz', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Scientific Writing Assessment', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Regulatory Writing', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Manuscript Writing', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Editing & Proofreading', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Medical Writer Associate', company: 'Novartis India', focus: 'Regulatory · Clinical' },
      { title: 'Scientific Writer Trainee', company: 'Dr. Reddy\'s', focus: 'Manuscript · Literature' },
      { title: 'Regulatory Writer Intern', company: 'Cipla', focus: 'CTD · Documentation' },
      { title: 'Medical Communications Associate', company: 'MedComm', focus: 'Writing · Editing' },
    ],
    classes: [
      { title: 'Medical Writing Certificate', platform: 'Coursera', duration: '50 hrs', level: 'Beginner', focus: 'Complete medical writing' },
      { title: 'Scientific Writing Mastery', platform: 'Udemy', duration: '25 hrs', level: 'Intermediate', focus: 'Research papers' },
      { title: 'Regulatory Writing for Pharma', platform: 'edX', duration: '20 hrs', level: 'Advanced', focus: 'CTD & submissions' },
      { title: 'Medical Editing Essentials', platform: 'YouTube', duration: '8 hrs', level: 'Beginner', focus: 'Style & accuracy' },
    ],
  },
  'Biotechnology': {
    skills: ['Molecular Biology', 'Cell Culture', 'PCR', 'ELISA', 'Bioprocessing', 'Fermentation', 'GMP', 'Bioreactors', 'Protein Purification', 'Documentation'],
    careerTitle: 'Biotechnologist',
    salary: '₹4–₹10 LPA',
    roadmap: [
      { title: 'Molecular Biology Fundamentals', week: 'Week 1–2' },
      { title: 'Cell Culture & Lab Techniques', week: 'Week 3–4' },
      { title: 'Bioprocessing & Fermentation', week: 'Week 5–6' },
      { title: 'Protein Purification & Bioreactors', week: 'Week 7' },
      { title: 'Industry Project & Interview', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Molecular Biology Quiz', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Cell Culture Techniques', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Bioprocessing Fundamentals', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Protein Purification', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Bioreactor Operations', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Biotech Research Associate', company: 'Biocon', focus: 'Cell Culture · PCR' },
      { title: 'Bioprocess Trainee', company: 'Bharat Biotech', focus: 'Fermentation · Bioreactors' },
      { title: 'R&D Scientist Intern', company: 'Syngene', focus: 'Molecular · ELISA' },
      { title: 'Downstream Process Associate', company: 'Serum Institute', focus: 'Purification · GMP' },
    ],
    classes: [
      { title: 'Biotechnology Professional Certificate', platform: 'Coursera', duration: '100 hrs', level: 'Beginner', focus: 'Complete biotech foundation' },
      { title: 'Cell Culture & Lab Techniques', platform: 'Udemy', duration: '30 hrs', level: 'Intermediate', focus: 'Hands-on lab skills' },
      { title: 'Bioprocessing & Fermentation', platform: 'edX', duration: '25 hrs', level: 'Advanced', focus: 'Industrial biotech' },
      { title: 'Protein Purification Methods', platform: 'YouTube', duration: '12 hrs', level: 'Intermediate', focus: 'Chromatography' },
    ],
  },
  'Bioinformatics': {
    skills: ['Python', 'R', 'BLAST', 'Genomics', 'BioPython', 'Statistics', 'Data Mining', 'Sequence Analysis', 'Structural Bioinformatics', 'Machine Learning'],
    careerTitle: 'Bioinformatician',
    salary: '₹5–₹12 LPA',
    roadmap: [
      { title: 'Python & R for Bioinformatics', week: 'Week 1–2' },
      { title: 'Sequence Analysis & BLAST', week: 'Week 3–4' },
      { title: 'Genomics & Next-Gen Sequencing', week: 'Week 5–6' },
      { title: 'Structural Bioinformatics', week: 'Week 7' },
      { title: 'Bioinformatics Project & Interview', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Python for Bioinformatics', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Sequence Analysis Quiz', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Genomics & NGS', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Structural Bioinformatics', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Statistics for Bioinformatics', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Bioinformatics Analyst', company: ' Strand Life Sciences', focus: 'Python · Genomics' },
      { title: 'Computational Biology Trainee', company: 'Institute of Bioinformatics', focus: 'R · Sequence Analysis' },
      { title: 'Genomics Data Intern', company: 'MedGenome', focus: 'NGS · BLAST' },
      { title: 'Bioinformatics Associate', company: 'Karkinos Healthcare', focus: 'ML · Structural Bio' },
    ],
    classes: [
      { title: 'Bioinformatics Specialization', platform: 'Coursera', duration: '80 hrs', level: 'Beginner', focus: 'Complete bioinformatics' },
      { title: 'Python for Genomics', platform: 'Udemy', duration: '35 hrs', level: 'Intermediate', focus: 'BioPython programming' },
      { title: 'Genomics & NGS Analysis', platform: 'edX', duration: '30 hrs', level: 'Advanced', focus: 'Sequencing pipelines' },
      { title: 'Structural Bioinformatics', platform: 'YouTube', duration: '15 hrs', level: 'Advanced', focus: 'Protein structures' },
    ],
  },
  'Genomics': {
    skills: ['Genomics', 'NGS', 'Python', 'R', 'GWAS', 'Variant Calling', 'Sequence Analysis', 'Statistics', 'Population Genetics', 'Data Visualization'],
    careerTitle: 'Genomics Analyst',
    salary: '₹5–₹13 LPA',
    roadmap: [
      { title: 'Genomics Fundamentals & NGS', week: 'Week 1–2' },
      { title: 'Variant Calling & GWAS', week: 'Week 3–4' },
      { title: 'Python & R for Genomics', week: 'Week 5–6' },
      { title: 'Population Genetics', week: 'Week 7' },
      { title: 'Genomics Project & Interview', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Genomics Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'NGS & Variant Calling', difficulty: 'Advanced', duration: '25 min' },
      { title: 'GWAS & Statistics', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Population Genetics', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Python for Genomics', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Genomics Analyst Intern', company: 'MedGenome', focus: 'NGS · Variant Calling' },
      { title: 'Genomics Trainee', company: 'Strand Life Sciences', focus: 'GWAS · Python' },
      { title: 'Computational Genomics Associate', company: 'CSIR-IGIB', focus: 'R · Population Genetics' },
      { title: 'NGS Data Analyst', company: 'Karkinos', focus: 'Sequence · Visualization' },
    ],
    classes: [
      { title: 'Genomics Data Science', platform: 'Coursera', duration: '60 hrs', level: 'Beginner', focus: 'Complete genomics' },
      { title: 'NGS Analysis Pipeline', platform: 'Udemy', duration: '30 hrs', level: 'Advanced', focus: 'Variant calling' },
      { title: 'GWAS & Statistical Genetics', platform: 'edX', duration: '25 hrs', level: 'Advanced', focus: 'Association studies' },
      { title: 'Python for Genomics', platform: 'YouTube', duration: '15 hrs', level: 'Intermediate', focus: 'BioPython' },
    ],
  },
  'Healthcare Analytics': {
    skills: ['SQL', 'Python', 'Healthcare Data', 'Tableau', 'Statistics', 'EHR', 'ICD-10', 'Data Visualization', 'Excel', 'Communication'],
    careerTitle: 'Healthcare Data Analyst',
    salary: '₹4–₹11 LPA',
    roadmap: [
      { title: 'Healthcare Data Fundamentals & EHR', week: 'Week 1–2' },
      { title: 'SQL & Python for Healthcare Data', week: 'Week 3–4' },
      { title: 'ICD-10 & Medical Coding', week: 'Week 5–6' },
      { title: 'Data Visualization for Healthcare', week: 'Week 7' },
      { title: 'Analytics Project & Interview', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Healthcare Data Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'SQL for Healthcare', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'ICD-10 & Medical Coding', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Statistics for Healthcare', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Python for Health Analytics', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Healthcare Analyst Intern', company: 'Apollo Hospitals', focus: 'SQL · Tableau · EHR' },
      { title: 'Health Data Trainee', company: 'Fortis', focus: 'Python · ICD-10' },
      { title: 'Clinical Data Analyst', company: 'Max Healthcare', focus: 'Excel · Statistics' },
      { title: 'Healthcare BI Associate', company: 'Narayana Health', focus: 'Power BI · SQL' },
    ],
    classes: [
      { title: 'Healthcare Analytics Professional', platform: 'Coursera', duration: '80 hrs', level: 'Beginner', focus: 'Complete health analytics' },
      { title: 'EHR & Healthcare Data', platform: 'edX', duration: '25 hrs', level: 'Beginner', focus: 'Electronic health records' },
      { title: 'ICD-10 Medical Coding', platform: 'Udemy', duration: '20 hrs', level: 'Intermediate', focus: 'Coding standards' },
      { title: 'Tableau for Healthcare', platform: 'YouTube', duration: '10 hrs', level: 'Intermediate', focus: 'Health dashboards' },
    ],
  },
  'Medical Devices': {
    skills: ['Biomedical Engineering', 'Regulatory (FDA/CE)', 'ISO 13485', 'Design Controls', 'Risk Management', 'Testing', 'Quality Systems', 'Documentation', 'CAD', 'Statistics'],
    careerTitle: 'Medical Device Engineer',
    salary: '₹4–₹10 LPA',
    roadmap: [
      { title: 'Biomedical Engineering Fundamentals', week: 'Week 1–2' },
      { title: 'ISO 13485 & Design Controls', week: 'Week 3–4' },
      { title: 'Risk Management & Testing', week: 'Week 5–6' },
      { title: 'Regulatory Submissions (FDA/CE)', week: 'Week 7' },
      { title: 'Device Project & Interview', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Biomedical Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'ISO 13485 & Quality Systems', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Design Controls & Risk Management', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Regulatory for Devices', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Device Testing & Validation', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Medical Device Engineer Intern', company: 'Siemens Healthineers', focus: 'Design · ISO 13485' },
      { title: 'R&D Device Trainee', company: 'Philips Healthcare', focus: 'CAD · Testing' },
      { title: 'Regulatory Device Associate', company: 'GE Healthcare', focus: 'FDA · CE' },
      { title: 'Quality Engineer', company: 'Trivitron Healthcare', focus: 'Risk · Documentation' },
    ],
    classes: [
      { title: 'Medical Device Engineering', platform: 'Coursera', duration: '60 hrs', level: 'Beginner', focus: 'Complete device training' },
      { title: 'ISO 13485 & Quality Management', platform: 'edX', duration: '25 hrs', level: 'Intermediate', focus: 'Quality systems' },
      { title: 'FDA Regulatory for Devices', platform: 'Udemy', duration: '20 hrs', level: 'Intermediate', focus: '510(k) submissions' },
      { title: 'Biomedical Device Design', platform: 'YouTube', duration: '12 hrs', level: 'Advanced', focus: 'Design & prototyping' },
    ],
  },
  'Health Informatics': {
    skills: ['HL7', 'FHIR', 'EHR', 'SQL', 'Python', 'Healthcare Standards', 'Data Integration', 'Clinical Workflows', 'HIPAA', 'Analytics'],
    careerTitle: 'Health Informatics Specialist',
    salary: '₹5–₹12 LPA',
    roadmap: [
      { title: 'Health Informatics & EHR Fundamentals', week: 'Week 1–2' },
      { title: 'HL7 & FHIR Standards', week: 'Week 3–4' },
      { title: 'Data Integration & Clinical Workflows', week: 'Week 5–6' },
      { title: 'HIPAA & Security', week: 'Week 7' },
      { title: 'Informatics Project & Interview', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Health Informatics Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'HL7 & FHIR Standards', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'EHR & Data Integration', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Clinical Workflows', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'HIPAA & Security', difficulty: 'Beginner', duration: '15 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Health Informatics Analyst', company: 'Allscripts', focus: 'HL7 · FHIR · EHR' },
      { title: 'Informatics Trainee', company: 'Epic Systems', focus: 'Clinical Workflows' },
      { title: 'Health IT Intern', company: 'Cerner', focus: 'SQL · Integration' },
      { title: 'Informatics Associate', company: 'Apollo 247', focus: 'Python · Analytics' },
    ],
    classes: [
      { title: 'Health Informatics Certificate', platform: 'Coursera', duration: '70 hrs', level: 'Beginner', focus: 'Complete informatics' },
      { title: 'HL7 & FHIR for Developers', platform: 'edX', duration: '25 hrs', level: 'Intermediate', focus: 'Interoperability' },
      { title: 'EHR Data & Analytics', platform: 'Udemy', duration: '20 hrs', level: 'Intermediate', focus: 'EHR systems' },
      { title: 'HIPAA Compliance', platform: 'YouTube', duration: '8 hrs', level: 'Beginner', focus: 'Data privacy' },
    ],
  },
  'Financial Analytics': {
    skills: ['Excel', 'SQL', 'Python', 'Financial Modeling', 'Valuation', 'Risk Analysis', 'Statistics', 'Power BI', 'Accounting', 'Communication'],
    careerTitle: 'Financial Analyst',
    salary: '₹5–₹12 LPA',
    roadmap: [
      { title: 'Financial Modeling & Valuation', week: 'Week 1–2' },
      { title: 'Excel & SQL for Finance', week: 'Week 3–4' },
      { title: 'Risk Analysis & Statistics', week: 'Week 5–6' },
      { title: 'Python for Financial Analytics', week: 'Week 7' },
      { title: 'Finance Project & Interview', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Financial Modeling Quiz', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Excel for Finance', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Valuation Techniques', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Risk Analysis', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Python for Finance', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Financial Analyst Intern', company: 'Goldman Sachs', focus: 'Modeling · Excel · Valuation' },
      { title: 'Risk Analyst Trainee', company: 'Morgan Stanley', focus: 'Risk · Statistics' },
      { title: 'Finance Data Analyst', company: 'JPMorgan', focus: 'SQL · Python · Power BI' },
      { title: 'Investment Analyst', company: 'ICICI Securities', focus: 'Valuation · Accounting' },
    ],
    classes: [
      { title: 'Financial Analyst Professional', platform: 'Coursera', duration: '60 hrs', level: 'Beginner', focus: 'Complete finance analytics' },
      { title: 'Financial Modeling & Valuation', platform: 'Udemy', duration: '40 hrs', level: 'Intermediate', focus: 'DCF, LBO, M&A' },
      { title: 'Python for Finance', platform: 'edX', duration: '25 hrs', level: 'Intermediate', focus: 'Financial programming' },
      { title: 'Risk Management in Finance', platform: 'YouTube', duration: '12 hrs', level: 'Advanced', focus: 'Market & credit risk' },
    ],
  },
  'Fintech': {
    skills: ['Python', 'Blockchain', 'APIs', 'Payment Systems', 'SQL', 'Machine Learning', 'Regulatory Tech', 'Data Security', 'Cloud', 'Mobile Payments'],
    careerTitle: 'Fintech Developer',
    salary: '₹6–₹15 LPA',
    roadmap: [
      { title: 'Fintech Landscape & Payment Systems', week: 'Week 1–2' },
      { title: 'Python & APIs for Fintech', week: 'Week 3–4' },
      { title: 'Blockchain & Smart Contracts', week: 'Week 5–6' },
      { title: 'Regulatory Tech & Security', week: 'Week 7' },
      { title: 'Fintech Project & Interview', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Fintech Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Payment Systems Quiz', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Blockchain for Fintech', difficulty: 'Advanced', duration: '25 min' },
      { title: 'API Design for Finance', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Fintech Security & Compliance', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Fintech Developer Intern', company: 'Razorpay', focus: 'Python · APIs · Payments' },
      { title: 'Blockchain Fintech Trainee', company: 'CoinDCX', focus: 'Blockchain · Smart Contracts' },
      { title: 'Payments Engineer', company: 'PhonePe', focus: 'SQL · APIs · Cloud' },
      { title: 'Fintech Analyst', company: 'CRED', focus: 'ML · Data Security' },
    ],
    classes: [
      { title: 'Fintech Professional Certificate', platform: 'Coursera', duration: '70 hrs', level: 'Beginner', focus: 'Complete fintech' },
      { title: 'Payment Systems Engineering', platform: 'Udemy', duration: '30 hrs', level: 'Intermediate', focus: 'UPI, cards, wallets' },
      { title: 'Blockchain for Finance', platform: 'edX', duration: '25 hrs', level: 'Advanced', focus: 'DeFi & smart contracts' },
      { title: 'Fintech APIs & Integration', platform: 'YouTube', duration: '10 hrs', level: 'Intermediate', focus: 'API development' },
    ],
  },
  'Manufacturing Analytics': {
    skills: ['Python', 'SQL', 'IoT', 'Power BI', 'Lean Manufacturing', 'Six Sigma', 'Statistics', 'Predictive Maintenance', 'Excel', 'Data Visualization'],
    careerTitle: 'Manufacturing Data Analyst',
    salary: '₹4–₹10 LPA',
    roadmap: [
      { title: 'Manufacturing Data & IoT Fundamentals', week: 'Week 1–2' },
      { title: 'Lean & Six Sigma Basics', week: 'Week 3–4' },
      { title: 'Python & SQL for Manufacturing', week: 'Week 5–6' },
      { title: 'Predictive Maintenance', week: 'Week 7' },
      { title: 'Analytics Project & Interview', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Manufacturing Analytics Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Lean & Six Sigma Quiz', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'IoT in Manufacturing', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Predictive Maintenance', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Python for Manufacturing', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Manufacturing Analyst Intern', company: 'Tata Motors', focus: 'IoT · Python · Power BI' },
      { title: 'Production Data Trainee', company: 'Mahindra', focus: 'SQL · Lean · Statistics' },
      { title: 'Predictive Maintenance Analyst', company: 'Bosch India', focus: 'ML · IoT · Maintenance' },
      { title: 'Quality Data Analyst', company: 'Maruti Suzuki', focus: 'Six Sigma · Excel' },
    ],
    classes: [
      { title: 'Manufacturing Analytics Professional', platform: 'Coursera', duration: '60 hrs', level: 'Beginner', focus: 'Complete manufacturing analytics' },
      { title: 'Lean Six Sigma for Analysts', platform: 'Udemy', duration: '30 hrs', level: 'Intermediate', focus: 'Process improvement' },
      { title: 'IoT & Predictive Maintenance', platform: 'edX', duration: '25 hrs', level: 'Advanced', focus: 'Sensor data & ML' },
      { title: 'Power BI for Manufacturing', platform: 'YouTube', duration: '10 hrs', level: 'Intermediate', focus: 'Production dashboards' },
    ],
  },
  'Supply Chain Analytics': {
    skills: ['Excel', 'SQL', 'Python', 'Forecasting', 'Inventory Management', 'Logistics', 'Power BI', 'Statistics', 'Optimization', 'Data Visualization'],
    careerTitle: 'Supply Chain Analyst',
    salary: '₹4–₹10 LPA',
    roadmap: [
      { title: 'Supply Chain Fundamentals & Inventory', week: 'Week 1–2' },
      { title: 'Excel & SQL for Supply Chain', week: 'Week 3–4' },
      { title: 'Forecasting & Optimization', week: 'Week 5–6' },
      { title: 'Python for Supply Chain Analytics', week: 'Week 7' },
      { title: 'Analytics Project & Interview', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Supply Chain Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Inventory Management Quiz', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Forecasting Techniques', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Optimization in Supply Chain', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Python for Supply Chain', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Supply Chain Analyst Intern', company: 'Amazon India', focus: 'SQL · Forecasting · Python' },
      { title: 'Logistics Analyst Trainee', company: 'Flipkart', focus: 'Excel · Optimization' },
      { title: 'Inventory Analyst', company: 'Reliance Retail', focus: 'Power BI · Inventory' },
      { title: 'Demand Planner Associate', company: 'Hindustan Unilever', focus: 'Forecasting · Statistics' },
    ],
    classes: [
      { title: 'Supply Chain Analytics Specialization', platform: 'Coursera', duration: '70 hrs', level: 'Beginner', focus: 'Complete supply chain analytics' },
      { title: 'Forecasting & Demand Planning', platform: 'Udemy', duration: '30 hrs', level: 'Intermediate', focus: 'Time series forecasting' },
      { title: 'Optimization in Supply Chain', platform: 'edX', duration: '25 hrs', level: 'Advanced', focus: 'Linear & integer programming' },
      { title: 'Power BI for Supply Chain', platform: 'YouTube', duration: '10 hrs', level: 'Intermediate', focus: 'Logistics dashboards' },
    ],
  },
  'Digital Marketing': {
    skills: ['SEO', 'SEM', 'Content Marketing', 'Social Media', 'Google Analytics', 'Email Marketing', 'WordPress', 'Copywriting', 'PPC', 'Data Analysis'],
    careerTitle: 'Digital Marketing Specialist',
    salary: '₹3–₹9 LPA',
    roadmap: [
      { title: 'SEO & Content Marketing Fundamentals', week: 'Week 1–2' },
      { title: 'Google Ads & PPC', week: 'Week 3–4' },
      { title: 'Social Media & Email Marketing', week: 'Week 5–6' },
      { title: 'Google Analytics & Reporting', week: 'Week 7' },
      { title: 'Marketing Project & Interview', week: 'Week 8' },
    ],
    assessments: [
      { title: 'SEO Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Google Ads & PPC Quiz', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Social Media Marketing', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Google Analytics', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Content Marketing Strategy', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Digital Marketing Intern', company: 'Zomato', focus: 'SEO · Social Media' },
      { title: 'SEO Specialist Trainee', company: 'Swiggy', focus: 'SEO · Content · Analytics' },
      { title: 'PPC Analyst', company: 'Nykaa', focus: 'Google Ads · PPC' },
      { title: 'Social Media Associate', company: 'Myntra', focus: 'Social · Content · Copywriting' },
    ],
    classes: [
      { title: 'Google Digital Marketing & E-commerce', platform: 'Coursera', duration: '120 hrs', level: 'Beginner', focus: 'Complete digital marketing' },
      { title: 'SEO Training Masterclass', platform: 'Udemy', duration: '30 hrs', level: 'Beginner', focus: 'Search optimization' },
      { title: 'Google Analytics Certification', platform: 'Google Skillshop', duration: '15 hrs', level: 'Intermediate', focus: 'Analytics & reporting' },
      { title: 'PPC & Google Ads', platform: 'YouTube', duration: '10 hrs', level: 'Intermediate', focus: 'Paid advertising' },
    ],
  },
  'Human Resources': {
    skills: ['Recruitment', 'HRIS', 'Employee Relations', 'Payroll', 'Labor Laws', 'Performance Management', 'Onboarding', 'Communication', 'Excel', 'Data Analysis'],
    careerTitle: 'HR Associate',
    salary: '₹3–₹8 LPA',
    roadmap: [
      { title: 'HR Fundamentals & Recruitment', week: 'Week 1–2' },
      { title: 'HRIS & Performance Management', week: 'Week 3–4' },
      { title: 'Labor Laws & Payroll', week: 'Week 5–6' },
      { title: 'Employee Relations & Onboarding', week: 'Week 7' },
      { title: 'HR Project & Interview', week: 'Week 8' },
    ],
    assessments: [
      { title: 'HR Fundamentals Quiz', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Recruitment & Selection', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Labor Laws & Compliance', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Performance Management', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'HR Analytics', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'HR Intern', company: 'Infosys', focus: 'Recruitment · HRIS' },
      { title: 'HR Trainee', company: 'TCS', focus: 'Onboarding · Payroll' },
      { title: 'Recruitment Associate', company: 'Wipro', focus: 'Recruitment · Screening' },
      { title: 'HR Operations', company: 'Accenture', focus: 'Excel · Labor Laws' },
    ],
    classes: [
      { title: 'Google HR Professional Certificate', platform: 'Coursera', duration: '80 hrs', level: 'Beginner', focus: 'Complete HR training' },
      { title: 'HR Management Masterclass', platform: 'Udemy', duration: '30 hrs', level: 'Intermediate', focus: 'Modern HR practices' },
      { title: 'Labor Laws in India', platform: 'edX', duration: '15 hrs', level: 'Intermediate', focus: 'Compliance & regulations' },
      { title: 'HR Analytics', platform: 'YouTube', duration: '10 hrs', level: 'Advanced', focus: 'Data-driven HR' },
    ],
  },
  'Project Management': {
    skills: ['Agile', 'Scrum', 'PMP', 'Jira', 'Risk Management', 'Stakeholder Management', 'Budgeting', 'MS Project', 'Communication', 'Leadership'],
    careerTitle: 'Project Coordinator',
    salary: '₹4–₹10 LPA',
    roadmap: [
      { title: 'Project Management Fundamentals', week: 'Week 1–2' },
      { title: 'Agile & Scrum Methodology', week: 'Week 3–4' },
      { title: 'Risk & Stakeholder Management', week: 'Week 5–6' },
      { title: 'Jira & Project Tools', week: 'Week 7' },
      { title: 'PM Project & Interview Prep', week: 'Week 8' },
    ],
    assessments: [
      { title: 'Project Management Fundamentals', difficulty: 'Beginner', duration: '20 min' },
      { title: 'Agile & Scrum Quiz', difficulty: 'Intermediate', duration: '25 min' },
      { title: 'Risk Management', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'Stakeholder Management', difficulty: 'Intermediate', duration: '20 min' },
      { title: 'PMP Concepts', difficulty: 'Advanced', duration: '25 min' },
      { title: 'Aptitude & Logical Reasoning', difficulty: 'Intermediate', duration: '30 min' },
    ],
    jobs: [
      { title: 'Project Coordinator Intern', company: 'Deloitte', focus: 'Agile · Jira' },
      { title: 'Scrum Master Trainee', company: 'Accenture', focus: 'Scrum · Stakeholder' },
      { title: 'PMO Associate', company: 'KPMG', focus: 'MS Project · Budgeting' },
      { title: 'Project Analyst', company: 'EY', focus: 'Risk · Agile · Communication' },
    ],
    classes: [
      { title: 'Google Project Management Certificate', platform: 'Coursera', duration: '120 hrs', level: 'Beginner', focus: 'Complete PM training' },
      { title: 'PMP Certification Prep', platform: 'Udemy', duration: '40 hrs', level: 'Advanced', focus: 'PMP exam readiness' },
      { title: 'Agile & Scrum Masterclass', platform: 'edX', duration: '20 hrs', level: 'Intermediate', focus: 'Agile methodology' },
      { title: 'Jira for Project Management', platform: 'YouTube', duration: '8 hrs', level: 'Beginner', focus: 'Project tools' },
    ],
  },
};

function randomScore(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export function extractNameFromFilename(filename: string): string {
  const noExt = filename.replace(/\.(pdf|doc|docx|jpg|jpeg|png)$/i, '');
  const cleaned = noExt
    .replace(/[_\-]+/g, ' ')
    .replace(/\b(resume|cv|curriculum vitae|bio|certificate|cert)\b/gi, '')
    .replace(/[—–-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const fallbackFirsts = ['Aarav', 'Diya', 'Vikram', 'Priya', 'Rohan', 'Sneha', 'Karan', 'Ananya', 'Arjun', 'Ishita'];
  if (!cleaned) return fallbackFirsts[Math.floor(Math.random() * fallbackFirsts.length)] + ' ' + fallbackFirsts[Math.floor(Math.random() * fallbackFirsts.length)];
  const parts = cleaned.split(' ').filter((p) => p.length > 1 && !/^(resume|cv|bio|certificate|cert|final|draft)$/i.test(p));
  if (parts.length === 0) return fallbackFirsts[Math.floor(Math.random() * fallbackFirsts.length)] + ' ' + fallbackFirsts[Math.floor(Math.random() * fallbackFirsts.length)];
  return parts.slice(0, 3).map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join(' ');
}

const DOMAIN_KEYWORDS: Record<string, string[]> = {
  'Software Development': ['software', 'java', 'c++', 'developer', 'algorithm', 'data structure', 'oop', 'system design', 'backend', 'programmer', 'c#', '.net', 'spring', 'software engineer'],
  'Web Development': ['web', 'html', 'css', 'javascript', 'react', 'node', 'frontend', 'fullstack', 'full stack', 'express', 'mongodb', 'angular', 'vue', 'next.js', 'web developer', 'django', 'flask', 'php', 'laravel'],
  'Mobile Development': ['mobile', 'android', 'ios', 'flutter', 'kotlin', 'swift', 'react native', 'dart', 'app developer', 'mobile app', 'android sdk', 'xcode'],
  'Data Analytics': ['analytics', 'excel', 'sql', 'tableau', 'power bi', 'data analyst', 'visualization', 'pandas', 'business analyst', 'reporting', 'dashboard', 'microsoft excel', 'vlookup', 'pivot'],
  'Data Science': ['data science', 'machine learning', 'statistics', 'r programming', 'scikit', 'data scientist', 'numpy', 'predictive', 'regression', 'classification', 'clustering', 'data mining'],
  'AI / ML': ['artificial intelligence', 'deep learning', 'tensorflow', 'pytorch', 'nlp', 'computer vision', 'neural', 'ai/ml', 'chatbot', 'llm', 'generative', 'transformer', 'cnn', 'rnn', 'gpt'],
  'Cloud Computing': ['cloud', 'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'devops', 's3', 'ec2', 'lambda', 'cloud engineer', 'iaas', 'paas', 'saas'],
  'Cybersecurity': ['security', 'cyber', 'pentest', 'penetration', 'owasp', 'cryptography', 'siem', 'firewall', 'vulnerability', 'ethical hacking', 'soc', 'incident response', 'malware', 'infosec'],
  'Networking': ['network', 'cisco', 'ccna', 'routing', 'switching', 'tcp/ip', 'lan', 'wan', 'firewall', 'subnetting', 'dhcp', 'dns', 'vlan', 'ospf', 'bgp', 'network engineer'],
  'Database': ['database', 'sql', 'oracle', 'mysql', 'postgresql', 'dba', 'mongodb', 'normalization', 'stored procedure', 'redis', 'cassandra', 'mongodb', 'query optimization', 'indexing'],
  'Big Data': ['big data', 'hadoop', 'spark', 'kafka', 'hive', 'hbase', 'etl', 'scala', 'airflow', 'pig', 'sqoop', 'flume', 'data lake'],
  'DevOps': ['devops', 'jenkins', 'docker', 'kubernetes', 'ci/cd', 'ansible', 'terraform', 'container', 'helm', 'gitlab ci', 'github actions', 'prometheus', 'grafana', 'nagios'],
  'Testing / QA': ['testing', 'qa', 'selenium', 'automation test', 'manual test', 'jmeter', 'quality assurance', 'bug', 'test automation', 'cypress', 'appium', 'postman', 'testng', 'junit'],
  'UI/UX': ['ui', 'ux', 'figma', 'design', 'wireframe', 'prototype', 'adobe xd', 'user research', 'interaction design', 'sketch', 'invision', 'zeplin', 'design system', 'usability', 'persona'],
  'IoT': ['iot', 'arduino', 'raspberry pi', 'sensor', 'embedded', 'mqtt', 'smart device', 'edge computing', 'esp32', 'nodemcu', 'industrial iot', 'wearable', 'actuator'],
  'Blockchain': ['blockchain', 'solidity', 'ethereum', 'smart contract', 'web3', 'hyperledger', 'defi', 'token', 'nft', 'crypto', 'ganache', 'truffle', 'hardhat', 'metamask', 'dapp'],
  'RPA': ['rpa', 'uipath', 'automation anywhere', 'blue prism', 'bot', 'robotic process', 'power automate', 'pega', 'workfusion', 'automation edge'],
  'AR/VR': ['ar', 'vr', 'unity', '3d', 'blender', 'oculus', 'vuforia', 'augmented', 'virtual reality', 'xr', 'hololens', 'metaverse', 'unreal engine', 'webxr', 'ar foundation'],
  'IT Support': ['it support', 'helpdesk', 'windows server', 'active directory', 'office 365', 'desktop support', 'ticketing', 'servicenow', 'remedy', 'exchange', 'troubleshooting', 'patch management'],
  'Business Intelligence': ['business intelligence', 'power bi', 'tableau', 'dax', 'data warehouse', 'etl', 'reporting', 'dashboard', 'looker', 'ssrs', 'ssis', 'ssas', 'qlik', 'microstrategy'],
  'Data Engineering': ['data engineer', 'data pipeline', 'airflow', 'spark', 'snowflake', 'dbt', 'redshift', 'etl pipeline', 'databricks', 'data warehouse', 'glue', 'bigquery', 'synapse'],
  'Pharmaceutical Sciences': ['pharmaceutical', 'pharmacology', 'pharmaceutics', 'drug development', 'gmp', 'quality control', 'formulation', 'hplc', 'dissolution', 'analytical chemistry'],
  'Pharmacovigilance': ['pharmacovigilance', 'adr', 'icsr', 'drug safety', 'argus', 'vigiflow', 'case processing', 'signal detection', 'safety reporting'],
  'Clinical Research': ['clinical research', 'clinical trial', 'gcp', 'crf', 'protocol', 'icf', 'monitoring', 'biostatistics', 'investigator', 'site visit'],
  'Regulatory Affairs': ['regulatory affairs', 'fda', 'cdsco', 'ich', 'ctd', 'ectd', 'dossier', 'submission', 'labeling', 'compliance'],
  'Medical Writing': ['medical writing', 'medical writer', 'scientific writing', 'manuscript', 'regulatory writing', 'medical terminology', 'clinical documentation'],
  'Biotechnology': ['biotechnology', 'biotech', 'molecular biology', 'cell culture', 'pcr', 'elisa', 'bioprocessing', 'fermentation', 'bioreactor', 'protein purification'],
  'Bioinformatics': ['bioinformatics', 'blast', 'biopython', 'sequence analysis', 'structural bioinformatics', 'computational biology', 'genomics', 'protein structure'],
  'Genomics': ['genomics', 'ngs', 'gwas', 'variant calling', 'population genetics', 'sequencing', 'genome', 'dna sequencing'],
  'Healthcare Analytics': ['healthcare analytics', 'health data', 'ehr', 'icd-10', 'medical coding', 'hospital data', 'clinical data', 'health analytics'],
  'Medical Devices': ['medical device', 'biomedical engineering', 'iso 13485', 'design controls', 'device testing', '510k', 'ce mark', 'medical equipment'],
  'Health Informatics': ['health informatics', 'hl7', 'fhir', 'clinical workflow', 'hipaa', 'health it', 'interoperability', 'health data integration'],
  'Financial Analytics': ['financial analytics', 'financial modeling', 'valuation', 'risk analysis', 'accounting', 'investment', 'finance analyst', 'portfolio'],
  'Fintech': ['fintech', 'payment systems', 'upi', 'digital payments', 'lending', 'neobank', 'financial technology', 'regtech'],
  'Manufacturing Analytics': ['manufacturing analytics', 'lean manufacturing', 'six sigma', 'predictive maintenance', 'production data', 'factory analytics', 'oee'],
  'Supply Chain Analytics': ['supply chain', 'logistics', 'inventory management', 'forecasting', 'demand planning', 'warehouse', 'procurement'],
  'Digital Marketing': ['digital marketing', 'seo', 'sem', 'ppc', 'google ads', 'social media marketing', 'content marketing', 'google analytics', 'email marketing'],
  'Human Resources': ['human resources', 'hr', 'recruitment', 'hris', 'payroll', 'employee relations', 'onboarding', 'labor laws', 'performance management'],
  'Project Management': ['project management', 'pmp', 'agile', 'scrum', 'jira', 'stakeholder', 'project coordinator', 'pmo', 'ms project'],
};

const DEGREE_DOMAIN_MAP: Record<string, string[]> = {
  'computer science': ['Software Development', 'Web Development', 'Data Science', 'AI / ML', 'Database'],
  'information technology': ['Software Development', 'Web Development', 'Cloud Computing', 'IT Support', 'Networking'],
  'electronics': ['IoT', 'Networking', 'Embedded', 'Software Development'],
  'electrical': ['IoT', 'Networking', 'Software Development'],
  'mechanical': ['RPA', 'IoT', 'Software Development'],
  'civil': ['Software Development', 'Data Analytics'],
  'chemical': ['Data Science', 'Data Analytics', 'Software Development'],
  'aerospace': ['AI / ML', 'Software Development', 'Data Science'],
  'biotechnology': ['Biotechnology', 'Bioinformatics', 'Clinical Research'],
  'pharmacy': ['Pharmaceutical Sciences', 'Pharmacovigilance', 'Clinical Research', 'Regulatory Affairs'],
  'pharma': ['Pharmaceutical Sciences', 'Pharmacovigilance', 'Clinical Research'],
  'clinical research': ['Clinical Research', 'Regulatory Affairs', 'Pharmacovigilance'],
  'artificial intelligence': ['AI / ML', 'Data Science', 'Software Development'],
  'data science': ['Data Science', 'Data Analytics', 'Data Engineering', 'Business Intelligence'],
  'cybersecurity': ['Cybersecurity', 'Networking', 'Cloud Computing'],
  'cloud computing': ['Cloud Computing', 'DevOps', 'Software Development'],
  'internet of things': ['IoT', 'Networking', 'Cloud Computing'],
  'computer engineering': ['Software Development', 'Web Development', 'Database', 'Cloud Computing'],
  'information science': ['Software Development', 'Web Development', 'Data Analytics', 'Database'],
  'electronics engineering': ['IoT', 'Networking', 'Software Development'],
  'telecommunication': ['Networking', 'Cloud Computing', 'Software Development'],
  'computer applications': ['Software Development', 'Web Development', 'Database', 'Data Analytics'],
  'business administration': ['Business Intelligence', 'Data Analytics', 'Testing / QA'],
  'commerce': ['Business Intelligence', 'Data Analytics', 'Data Engineering'],
  'economics': ['Data Analytics', 'Data Science', 'Business Intelligence'],
  'english': ['UI/UX', 'Business Intelligence', 'IT Support'],
  'mathematics': ['Data Science', 'Data Engineering', 'AI / ML'],
  'statistics': ['Data Science', 'Data Analytics', 'Business Intelligence'],
  'physics': ['Data Science', 'AI / ML', 'IoT'],
  'human resources': ['Business Intelligence', 'IT Support', 'Testing / QA'],
  'finance': ['Data Analytics', 'Business Intelligence', 'Data Engineering'],
  'marketing': ['Business Intelligence', 'Data Analytics', 'UI/UX'],
  'operations': ['Data Analytics', 'Business Intelligence', 'RPA'],
  'business analytics': ['Business Intelligence', 'Data Analytics', 'Data Science'],
  'software engineering': ['Software Development', 'Web Development', 'DevOps'],
};

export function predictDomain(filename: string, interests: string, degree: string = '', industry: string = ''): string {
  const text = (filename + ' ' + interests + ' ' + degree).toLowerCase();
  let bestDomain = '';
  let bestScore = 0;
  const keywordEntries = Object.entries(DOMAIN_KEYWORDS);
  const industryDomains = industry && INDUSTRY_DOMAIN_MAP[industry] ? INDUSTRY_DOMAIN_MAP[industry] : null;
  for (const [domain, keywords] of keywordEntries) {
    if (industryDomains && !industryDomains.includes(domain)) continue;
    let score = 0;
    for (const kw of keywords) {
      if (text.includes(kw)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      bestDomain = domain;
    }
  }
  if (!bestDomain && degree) {
    const degreeLower = degree.toLowerCase();
    const degreeDomains = industryDomains || null;
    for (const [degreeKey, domains] of Object.entries(DEGREE_DOMAIN_MAP)) {
      if (degreeLower.includes(degreeKey)) {
        const pool = degreeDomains ? degreeDomains.filter((d) => domains.includes(d)) : domains;
        if (pool && pool.length > 0) {
          bestDomain = pool[Math.floor(Math.random() * pool.length)];
        } else if (degreeDomains && degreeDomains.length > 0) {
          bestDomain = degreeDomains[0];
        } else {
          bestDomain = domains[Math.floor(Math.random() * domains.length)];
        }
        break;
      }
    }
  }
  if (!bestDomain && interests && DOMAIN_DB[interests]) {
    bestDomain = interests;
  }
  if (!bestDomain) {
    const domains = industryDomains && industryDomains.length > 0 ? industryDomains : Object.keys(DOMAIN_DB);
    bestDomain = domains[Math.floor(Math.random() * domains.length)];
  }
  return bestDomain;
}

export function generateAnalysisData(fileName: string, educationLevel: string, interests: string = '', degree: string = '', industry: string = '') {
  const predictedDomain = predictDomain(fileName, interests, degree, industry);
  const domainInfo = DOMAIN_DB[predictedDomain] || DOMAIN_DB['Data Analytics'];

  const careerMatch = randomScore(72, 95);
  const skillScore = randomScore(65, 90);
  const readinessScore = randomScore(60, 88);
  const atsScore = randomScore(55, 92);

  const availableSkills = pickRandom(domainInfo.skills, randomScore(4, 6));
  const allGaps = domainInfo.skills.filter((s) => !availableSkills.includes(s)).slice(0, 3);

  const skillGaps: SkillGap[] = [
    ...availableSkills.map((s) => ({ skill: s, status: 'Available' as const })),
    ...allGaps.map((s) => ({ skill: s, status: 'Gap' as const })),
  ];

  const strengths = availableSkills.slice(0, 4);

  const roadmap: RoadmapStep[] = domainInfo.roadmap.map((r, i) => ({
    step: i + 1,
    title: r.title,
    done: i < 2,
    week: r.week,
  }));

  const assessments: AssessmentRec[] = domainInfo.assessments.map((a, i) => ({
    id: i + 1,
    title: a.title,
    domain: predictedDomain,
    difficulty: a.difficulty,
    duration: a.duration,
    done: i === 0,
  }));

  const jobRecommendations: JobRec[] = domainInfo.jobs.map((j, i) => ({
    id: i + 1,
    title: j.title,
    company: j.company,
    match: careerMatch - i * 5,
    status: 'Recommended',
    focus: j.focus,
  }));

  const classSuggestions: ClassSuggestion[] = domainInfo.classes.map((c, i) => ({
    id: i + 1,
    title: c.title,
    platform: c.platform,
    duration: c.duration,
    level: c.level,
    focus: c.focus,
  }));

  return {
    predicted_domain: predictedDomain,
    career_match_score: careerMatch,
    skill_score: skillScore,
    readiness_score: readinessScore,
    ats_score: atsScore,
    recommended_career: domainInfo.careerTitle,
    skill_gaps: skillGaps,
    strengths,
    roadmap,
    assessments,
    job_recommendations: jobRecommendations,
    class_suggestions: classSuggestions,
  };
}

export async function sendNotificationEmail(email: string, name: string, subject: string, message: string): Promise<boolean> {
  try {
    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-notification`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ email, name, subject, message }),
    });
    if (!response.ok) return false;
    const data = await response.json();
    return data.success === true;
  } catch {
    return false;
  }
}

export async function createNotification(profileId: string, message: string, type: string): Promise<void> {
  try {
    await supabase.from('notifications').insert({ profile_id: profileId, message, type });
  } catch { /* ignore */ }
}

export async function fetchNotifications(profileId: string): Promise<NotificationItem[]> {
  try {
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false })
      .limit(50);
    return (data || []) as NotificationItem[];
  } catch {
    return [];
  }
}

export async function markNotificationRead(id: string): Promise<void> {
  try {
    await supabase.from('notifications').update({ read: true }).eq('id', id);
  } catch { /* ignore */ }
}

export async function markAllNotificationsRead(profileId: string): Promise<void> {
  try {
    await supabase.from('notifications').update({ read: true }).eq('profile_id', profileId).eq('read', false);
  } catch { /* ignore */ }
}

export async function sendMessage(profileId: string, studentName: string, studentEmail: string, subject: string, body: string): Promise<{ saved: boolean; emailed: boolean }> {
  const adminEmail = 'darshan382002@gmail.com';
  let saved = false;
  let emailed = false;
  try {
    const { error } = await supabase.from('messages').insert({
      profile_id: profileId, student_name: studentName, student_email: studentEmail,
      subject, body, admin_email: adminEmail, sent: false,
    });
    saved = !error;
  } catch { /* ignore */ }
  try {
    emailed = await sendNotificationEmail(adminEmail, studentName, `Student Message: ${subject || 'No subject'}`, `From: ${studentName} (${studentEmail})\n\n${body}`);
    if (saved && emailed) {
      await supabase.from('messages').update({ sent: true }).eq('profile_id', profileId).order('created_at', { ascending: false }).limit(1);
    }
  } catch { /* ignore */ }
  return { saved, emailed };
}

export async function fetchMessages(profileId: string): Promise<MessageItem[]> {
  try {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: true });
    return (data || []) as MessageItem[];
  } catch {
    return [];
  }
}

export async function logActivity(profileId: string, action: string, category: string, detail: string = ''): Promise<void> {
  try {
    await supabase.from('activity_log').insert({ profile_id: profileId, action, category, detail });
  } catch { /* ignore */ }
}

export async function fetchActivity(profileId: string): Promise<ActivityItem[]> {
  try {
    const { data } = await supabase
      .from('activity_log')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false })
      .limit(30);
    return (data || []) as ActivityItem[];
  } catch {
    return [];
  }
}

export async function updateProfileData(profileId: string, updates: Record<string, unknown>): Promise<boolean> {
  try {
    const { error } = await supabase.from('student_profiles').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', profileId);
    return !error;
  } catch {
    return false;
  }
}
