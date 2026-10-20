import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Check,
  Cloud,
  Database,
  FileText,
  GitBranch,
  Globe,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  Lock,
  Monitor,
  Network,
  Presentation,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  UserCheck,
  Users,
  Zap,
} from 'lucide-react';

const headerFeatures = [
  { icon: Sparkles, label: 'AI/ML Recommendation' },
  { icon: FileText, label: 'Resume Analysis' },
  { icon: Network, label: 'Skill Gap Analysis' },
  { icon: BookOpen, label: 'Learning Roadmap' },
  { icon: Trophy, label: 'Assessments & Quizzes' },
  { icon: LayoutDashboard, label: 'Analytics Dashboard' },
];

const keyFeatures = [
  'User Authentication (Student/Admin)',
  'Resume Upload & Analysis',
  'Skill Extraction using NLP',
  'AI-Based Career Recommendation',
  'Skill Gap Analysis',
  'Personalized Learning Roadmap',
  'Skill Assessments & Quizzes',
  'Job Readiness Score',
  'Job/Application Tracker',
  'Interactive Dashboards',
  'Admin Management Panel',
  'Analytics & Reports',
];

const coreModules = [
  { n: 1, title: 'User Management', desc: 'Registration, Login, Profile' },
  { n: 2, title: 'Resume Analyzer', desc: 'Extract text, identify skills, calculate resume score' },
  { n: 3, title: 'Career Recommendation', desc: 'AI/ML model recommends suitable career paths' },
  { n: 4, title: 'Skill Gap Analysis', desc: 'Compare existing skills with required skills' },
  { n: 5, title: 'Learning Roadmap', desc: 'Personalized step-by-step learning path' },
  { n: 6, title: 'Assessments', desc: 'Skill-based tests and quizzes' },
  { n: 7, title: 'Job Tracker', desc: 'Track applications and interview status' },
  { n: 8, title: 'Dashboards & Reports', desc: 'Visual analytics for students and admins' },
];

const techStack = {
  FRONTEND: { icon: Monitor, items: ['Angular', 'HTML5', 'CSS3', 'Bootstrap', 'JavaScript'] },
  BACKEND: { icon: Server, items: ['Django', 'Django REST Framework', 'Python'] },
  DATABASE: { icon: Database, items: ['MySQL', 'PostgreSQL'] },
  'AI / ML / NLP': { icon: Brain, items: ['Scikit-learn', 'Pandas', 'NumPy', 'NLTK / spaCy'] },
  OTHERS: { icon: GitBranch, items: ['JWT', 'Git & GitHub', 'Chart.js', 'Cloud Deployment'] },
};

const skillGapData = [
  { skill: 'Python', status: 'Available' },
  { skill: 'SQL', status: 'Available' },
  { skill: 'Excel', status: 'Available' },
  { skill: 'Power BI', status: 'Gap' },
  { skill: 'Statistics', status: 'Gap' },
  { skill: 'Pandas', status: 'Available' },
  { skill: 'Data Visualization', status: 'Gap' },
];

const roadmapSteps = [
  'Advanced Excel', 'SQL', 'Statistics', 'Python for Data Analysis',
  'Pandas & NumPy', 'Power BI', 'Data Analytics Project', 'Interview Preparation',
];

const benefits = [
  { icon: Target, text: 'Helps students choose the right career path' },
  { icon: Network, text: 'Identifies skill gaps and suggests improvements' },
  { icon: TrendingUp, text: 'Improves employability and job readiness' },
  { icon: Lightbulb, text: 'Saves time and effort with personalized guidance' },
  { icon: BarChart3, text: 'Provides data-driven insights for better decision making' },
];

const footerItems = [
  { icon: LayoutDashboard, label: 'Full Stack Web Application' },
  { icon: Sparkles, label: 'AI/ML Powered' },
  { icon: Users, label: 'Real-world Impact' },
  { icon: ShieldCheck, label: 'Scalable & Secure' },
];

function PosterHeader() {
  return (
    <div className="poster-header">
      <div className="poster-header-left">
        <div className="poster-brand-mark"><GraduationCap size={26} /></div>
        <div>
          <h1 className="poster-title">CAREER<span>INSIGHT</span></h1>
          <p className="poster-subtitle">AI-Powered Career Guidance, Skill Assessment &amp; Job Readiness Platform for Students</p>
        </div>
      </div>
      <div className="poster-header-right">
        <div className="poster-mockup-laptop">
          <div className="poster-mockup-screen">
            <div className="mockup-topbar"><span /><span /><span /></div>
            <div className="mockup-body">
              <div className="mockup-greeting">Welcome, Ananya!</div>
              <div className="mockup-scores">
                <div className="mockup-score"><strong>89%</strong><small>Career Match</small></div>
                <div className="mockup-score"><strong>82%</strong><small>Skill Score</small></div>
                <div className="mockup-score"><strong>78%</strong><small>Readiness</small></div>
              </div>
              <div className="mockup-section-title">Recommended Careers</div>
              <div className="mockup-bar"><div className="mockup-bar-fill" style={{ width: '89%' }}><span>Data Analyst</span></div></div>
              <div className="mockup-bar"><div className="mockup-bar-fill violet" style={{ width: '76%' }}><span>Business Analyst</span></div></div>
              <div className="mockup-section-title">Skill Gap</div>
              <div className="mockup-mini-bars"><i /><i /><i /><i /><i /></div>
            </div>
          </div>
          <div className="poster-mockup-base" />
        </div>
        <div className="poster-mockup-phone">
          <div className="poster-phone-notch" />
          <div className="poster-phone-screen">
            <div className="mockup-greeting">Dashboard</div>
            <div className="mockup-score-phone"><strong>89%</strong><small>Match</small></div>
            <div className="mockup-score-phone violet"><strong>82</strong><small>Skill</small></div>
            <div className="mockup-score-phone gold"><strong>78%</strong><small>Ready</small></div>
            <div className="mockup-mini-bars"><i /><i /><i /><i /><i /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ num, title, icon: Icon }: { num: string; title: string; icon: typeof Sparkles }) {
  return (
    <div className="poster-section-header">
      <div className="poster-section-num">{num}</div>
      <Icon size={16} />
      <h2>{title}</h2>
    </div>
  );
}

export default function ProjectPosterPage() {
  return (
    <div className="poster-page">
      <div className="poster-sheet">
        <PosterHeader />

        <div className="poster-feature-icons">
          {headerFeatures.map((f) => {
            const Icon = f.icon;
            return (
              <div className="poster-feature-pill" key={f.label}>
                <Icon size={14} />
                <span>{f.label}</span>
              </div>
            );
          })}
        </div>

        <div className="poster-grid">
          <div className="poster-col poster-col-left">
            <section className="poster-section">
              <SectionHeader num="01" title="ABSTRACT" icon={FileText} />
              <p className="poster-body-text">
                CareerInsight is an AI-powered full-stack web application designed to help students make informed career decisions based on educational background, technical skills, interests, academic performance, projects, certifications and assessment results. The system uses Machine Learning and Natural Language Processing to analyze student profiles and resumes, recommend career paths, identify skill gaps and provide personalized learning roadmaps. Students can take skill-based assessments, track progress and improve job readiness through interactive dashboards.
              </p>
            </section>

            <section className="poster-section">
              <SectionHeader num="02" title="KEY FEATURES" icon={Sparkles} />
              <div className="poster-features-grid">
                {keyFeatures.map((feat) => (
                  <div className="poster-feature-check" key={feat}>
                    <Check size={13} className="poster-check-icon" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="poster-section">
              <SectionHeader num="03" title="CORE MODULES" icon={LayoutDashboard} />
              <div className="poster-modules-list">
                {coreModules.map((mod) => (
                  <div className="poster-module-row" key={mod.n}>
                    <span className="poster-module-num">{mod.n}</span>
                    <div>
                      <strong>{mod.title}</strong>
                      <small>{mod.desc}</small>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="poster-section">
              <SectionHeader num="04" title="SYSTEM ARCHITECTURE" icon={Server} />
              <div className="poster-arch">
                <div className="arch-tier">
                  <div className="arch-tier-label">Client</div>
                  <div className="arch-boxes">
                    <div className="arch-box"><Monitor size={14} /> Web Browser</div>
                    <div className="arch-box"><Smartphone size={14} /> Mobile App</div>
                  </div>
                </div>
                <div className="arch-arrow"><ArrowRight size={18} /></div>
                <div className="arch-tier">
                  <div className="arch-tier-label">Web Server</div>
                  <div className="arch-boxes">
                    <div className="arch-box"><Server size={14} /> Django</div>
                    <div className="arch-box"><Globe size={14} /> REST API</div>
                  </div>
                </div>
                <div className="arch-arrow"><ArrowRight size={18} /></div>
                <div className="arch-tier">
                  <div className="arch-tier-label">Database</div>
                  <div className="arch-boxes">
                    <div className="arch-box"><Database size={14} /> MySQL</div>
                    <div className="arch-box"><Database size={14} /> PostgreSQL</div>
                  </div>
                </div>
              </div>
              <div className="arch-ml-block">
                <div className="arch-ml-label"><Brain size={14} /> AI/ML Engine</div>
                <div className="arch-ml-items">
                  <span>Career Recommendation</span>
                  <span>Skill Gap Analysis</span>
                  <span>Resume Analysis</span>
                </div>
              </div>
            </section>
          </div>

          <div className="poster-col poster-col-right">
            <section className="poster-section">
              <SectionHeader num="05" title="TECHNOLOGY STACK" icon={Zap} />
              <div className="poster-tech-stack">
                {Object.entries(techStack).map(([cat, info]) => {
                  const Icon = info.icon;
                  return (
                    <div className="poster-tech-category" key={cat}>
                      <div className="poster-tech-cat-header"><Icon size={14} /> <span>{cat}</span></div>
                      <div className="poster-tech-items">
                        {info.items.map((item) => <span className="poster-tech-chip" key={item}>{item}</span>)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="poster-section">
              <SectionHeader num="06" title="DASHBOARD PREVIEWS" icon={LayoutDashboard} />
              <div className="poster-previews">
                <div className="poster-preview-card">
                  <div className="preview-card-header"><LayoutDashboard size={14} /> Student Dashboard</div>
                  <div className="preview-greeting">Welcome, Ananya!</div>
                  <div className="preview-scores">
                    <div className="preview-score"><strong>89%</strong><small>Career Match</small></div>
                    <div className="preview-score violet"><strong>82%</strong><small>Skill Score</small></div>
                    <div className="preview-score gold"><strong>78%</strong><small>Readiness</small></div>
                  </div>
                  <div className="preview-sub-label">Recommended Careers</div>
                  <div className="preview-bar"><div className="preview-bar-fill" style={{ width: '89%' }}>Data Analyst</div></div>
                  <div className="preview-bar"><div className="preview-bar-fill violet" style={{ width: '76%' }}>Business Analyst</div></div>
                  <div className="preview-sub-label">Skill Gap</div>
                  <div className="preview-mini-bars"><i /><i /><i /><i /><i /></div>
                </div>

                <div className="poster-preview-card">
                  <div className="preview-card-header"><Network size={14} /> Skill Gap Analysis</div>
                  <div className="preview-gap-table">
                    {skillGapData.map((row) => (
                      <div className="preview-gap-row" key={row.skill}>
                        <span>{row.skill}</span>
                        <span className={`preview-gap-status ${row.status === 'Gap' ? 'is-gap' : 'is-avail'}`}>{row.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="poster-preview-card">
                  <div className="preview-card-header"><BookOpen size={14} /> Learning Roadmap</div>
                  <div className="preview-roadmap">
                    {roadmapSteps.map((step, i) => (
                      <div className="preview-roadmap-step" key={step}>
                        <div className={`preview-roadmap-node ${i < 2 ? 'done' : ''}`}>{i < 2 ? <Check size={11} /> : <span />}</div>
                        <span><b>Step {i + 1}:</b> {step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="poster-section">
              <SectionHeader num="07" title="AI WORKFLOW" icon={Brain} />
              <div className="poster-workflow">
                <div className="workflow-step"><FileText size={16} /><span>Student Profile &amp; Resume Data</span></div>
                <ArrowRight size={16} className="workflow-arrow" />
                <div className="workflow-step"><Brain size={16} /><span>NLP &amp; Feature Extraction</span></div>
                <ArrowRight size={16} className="workflow-arrow" />
                <div className="workflow-step"><Sparkles size={16} /><span>ML Model / Career Recommendation</span></div>
                <ArrowRight size={16} className="workflow-arrow" />
                <div className="workflow-step"><Target size={16} /><span>Top Career Matches &amp; Skill Gap</span></div>
              </div>
            </section>

            <section className="poster-section">
              <SectionHeader num="08" title="BENEFITS" icon={TrendingUp} />
              <div className="poster-benefits">
                {benefits.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div className="poster-benefit-row" key={b.text}>
                      <div className="poster-benefit-icon"><Icon size={15} /></div>
                      <span>{b.text}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="poster-section">
              <SectionHeader num="09" title="CONCLUSION" icon={GraduationCap} />
              <p className="poster-body-text">
                CareerInsight integrates Full Stack Development, Machine Learning, and Data Analytics to deliver a real-world solution for students. It empowers students to identify suitable career opportunities, improve skills, and achieve professional goals through intelligent recommendations and continuous learning.
              </p>
            </section>
          </div>
        </div>

        <footer className="poster-footer">
          {footerItems.map((item) => {
            const Icon = item.icon;
            return (
              <div className="poster-footer-item" key={item.label}>
                <Icon size={16} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </footer>
      </div>
    </div>
  );
}
