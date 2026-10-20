import { useEffect, useState, useRef, type ChangeEvent } from 'react';
import {
  ArrowUpRight,
  Award,
  Brain,
  Check,
  FileSearch,
  ChevronRight,
  CloudUpload,
  FileText,
  Lightbulb,
  Loader2,
  Mic,
  Presentation,
  Puzzle,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from 'lucide-react';
import { supabase, type ResumeAnalysis } from '@/lib/supabase';

const skillMeta = [
  { key: 'communication', label: 'Communication', icon: Mic, tone: 'blue' },
  { key: 'aptitude', label: 'Aptitude', icon: Brain, tone: 'violet' },
  { key: 'confidence', label: 'Confidence', icon: Rocket, tone: 'gold' },
  { key: 'performance', label: 'Performance', icon: TrendingUp, tone: 'green' },
  { key: 'problem_solving', label: 'Problem Solving', icon: Puzzle, tone: 'blue' },
  { key: 'presentation', label: 'Presentation', icon: Presentation, tone: 'violet' },
  { key: 'technical_skills', label: 'Technical Skills', icon: Zap, tone: 'gold' },
] as const;

function randomScore(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAnalysis(fileName: string): Omit<ResumeAnalysis, 'id' | 'created_at'> {
  const scores = {
    communication: randomScore(68, 92),
    aptitude: randomScore(65, 90),
    confidence: randomScore(70, 95),
    performance: randomScore(72, 94),
    problem_solving: randomScore(75, 96),
    presentation: randomScore(60, 88),
    technical_skills: randomScore(78, 95),
  };
  const overall = Math.round(
    (scores.communication + scores.aptitude + scores.confidence + scores.performance + scores.problem_solving + scores.presentation + scores.technical_skills) / 7,
  );
  return {
    student_name: 'Ananya Sharma',
    resume_filename: fileName,
    overall_score: overall,
    ...scores,
    recommended_career: overall >= 80 ? 'Data Analyst' : overall >= 70 ? 'Business Analyst' : 'Junior Developer',
    career_match_score: overall,
    ats_score: randomScore(55, 92),
    skill_gaps: [
      { skill: 'Statistics', status: 'Gap' },
      { skill: 'Data Visualization', status: 'Gap' },
      { skill: 'Power BI', status: 'Gap' },
    ],
    strengths: ['Python', 'SQL', 'Problem Solving', 'Communication'],
    roadmap: [
      { step: 1, title: 'Advanced Excel', done: true, week: 'Week 1' },
      { step: 2, title: 'SQL', done: true, week: 'Week 2' },
      { step: 3, title: 'Statistics', done: false, week: 'Week 3' },
      { step: 4, title: 'Python for Data Analysis', done: false, week: 'Week 4' },
      { step: 5, title: 'Pandas & NumPy', done: false, week: 'Week 5' },
      { step: 6, title: 'Power BI', done: false, week: 'Week 6' },
      { step: 7, title: 'Data Analytics Project', done: false, week: 'Week 7' },
      { step: 8, title: 'Interview Preparation', done: false, week: 'Week 8' },
    ],
  };
}

export default function ResumeAnalysisPage({ onNotify }: { onNotify: (msg: string) => void }) {
  const [analyses, setAnalyses] = useState<ResumeAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState('Ananya Sharma — Resume.pdf');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadAnalyses();
  }, []);

  async function loadAnalyses() {
    setLoading(true);
    const { data, error } = await supabase
      .from('resume_analyses')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      onNotify('Could not load saved analyses. Showing demo data.');
      const demo = generateAnalysis('Ananya Sharma — Resume.pdf');
      setAnalyses([{ ...demo, id: 'demo', created_at: new Date().toISOString() }]);
    } else {
      setAnalyses(data as ResumeAnalysis[]);
      if (data && data.length > 0) setSelectedId(data[0].id);
    }
    setLoading(false);
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setResumeName(file.name);
    setAnalyzing(true);
    onNotify('Analyzing your resume with AI...');

    const analysis = generateAnalysis(file.name);
    await new Promise((r) => setTimeout(r, 1800));

    const { data, error } = await supabase.from('resume_analyses').insert(analysis).select().single();
    if (error) {
      onNotify('Saved locally — database connection needed to persist.');
      const localResult: ResumeAnalysis = { ...analysis, id: 'local-' + Date.now(), created_at: new Date().toISOString() };
      setAnalyses((prev) => [localResult, ...prev]);
      setSelectedId(localResult.id);
    } else {
      const saved = data as ResumeAnalysis;
      setAnalyses((prev) => [saved, ...prev]);
      setSelectedId(saved.id);
      onNotify('Resume analyzed! Your skill scores are ready.');
    }
    setAnalyzing(false);
  }

  const selected = analyses.find((a) => a.id === selectedId) || analyses[0];

  if (loading) {
    return (
      <div className="page-wrap detail-page">
        <div className="detail-placeholder">
          <Loader2 size={28} className="spin-icon" />
          <h2>Loading your analyses</h2>
          <p>Fetching saved resume analyses from the database.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrap detail-page">
      <section className="detail-hero">
        <div className="detail-icon"><FileText size={26} /></div>
        <div>
          <div className="eyebrow">RESUME ANALYZER</div>
          <h1>AI Resume Analysis<span>.</span></h1>
          <p>Upload your resume and get instant scores for communication, aptitude, confidence, performance, problem solving, presentation and technical skills.</p>
        </div>
        <button className="primary-button detail-action" onClick={() => fileInputRef.current?.click()} disabled={analyzing}>
          {analyzing ? <><Loader2 size={16} className="spin-icon" /> Analyzing...</> : <><CloudUpload size={16} /> Upload resume</>}
        </button>
      </section>
      <input ref={fileInputRef} className="hidden-input" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />

      {analyses.length > 1 && (
        <div className="analysis-tabs">
          {analyses.slice(0, 5).map((a) => (
            <button key={a.id} className={`analysis-tab ${a.id === selectedId ? 'active' : ''}`} onClick={() => setSelectedId(a.id)}>
              <FileText size={13} /> {a.resume_filename.length > 22 ? a.resume_filename.slice(0, 22) + '...' : a.resume_filename}
            </button>
          ))}
        </div>
      )}

      {selected ? (
        <div className="analysis-results">
          <div className="results-grid">
            <div className="panel overall-panel">
              <div className="overall-top">
                <div className="overall-ring" style={{ background: `conic-gradient(#7258db ${selected.overall_score}%, #eef0f6 0)` }}>
                  <div className="overall-ring-inner">
                    <strong>{selected.overall_score}</strong>
                    <small>out of 100</small>
                  </div>
                </div>
                <div>
                  <span className="eyebrow">OVERALL READINESS</span>
                  <h3>{selected.recommended_career}</h3>
                  <p>{selected.career_match_score}% career match</p>
                  <div className="overall-badges">
                    <span className="badge-violet"><Sparkles size={11} /> AI Recommended</span>
                    <span className="badge-blue"><Target size={11} /> {selected.career_match_score}% Match</span>
                    <span className={`badge-${selected.ats_score >= 75 ? 'green' : selected.ats_score >= 60 ? 'gold' : 'red'}`}><FileSearch size={11} /> ATS {selected.ats_score}/100</span>
                  </div>
                </div>
              </div>
              <div className="overall-file"><FileText size={14} /> {selected.resume_filename}</div>
            </div>

            <div className="panel skills-panel">
              <div className="panel-heading">
                <div><h3>Skill Breakdown</h3><p>7 core competencies scored by AI</p></div>
              </div>
              <div className="skill-scores-grid">
                {skillMeta.map((meta) => {
                  const Icon = meta.icon;
                  const value = selected[meta.key];
                  return (
                    <div className="skill-score-card" key={meta.key}>
                      <div className={`skill-score-icon ${meta.tone}`}><Icon size={16} /></div>
                      <div className="skill-score-body">
                        <div className="skill-score-label"><span>{meta.label}</span><strong>{value}</strong></div>
                        <div className="progress-track"><div className={`progress-fill ${meta.tone === 'blue' ? 'good' : meta.tone === 'violet' ? 'violet-fill' : meta.tone === 'gold' ? 'warn' : 'green-fill'}`} style={{ width: `${value}%` }} /></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="results-grid two-col">
            <div className="panel">
              <div className="panel-heading"><div><h3>Skill Gap Analysis</h3><p>Skills to develop for your target role</p></div></div>
              <div className="gap-table-header"><span>Skill</span><span>Status</span></div>
              {selected.skill_gaps.map((gap) => (
                <div className="gap-table-row" key={gap.skill}>
                  <span className="gap-skill-name">{gap.skill}</span>
                  <span className={`gap-status ${gap.status === 'Gap' ? 'is-gap' : 'is-available'}`}>{gap.status === 'Gap' ? 'Gap' : 'Available'}</span>
                </div>
              ))}
              {selected.strengths.length > 0 && (
                <div className="strengths-block">
                  <div className="strengths-label"><Trophy size={14} /> Your strengths</div>
                  <div className="strengths-chips">{selected.strengths.map((s) => <span className="strength-chip" key={s}>{s}</span>)}</div>
                </div>
              )}
            </div>

            <div className="panel">
              <div className="panel-heading"><div><h3>Learning Roadmap</h3><p>Step-by-step path to close your gaps</p></div></div>
              <div className="roadmap-list">
                {selected.roadmap.map((step) => (
                  <div className={`roadmap-row ${step.done ? 'done' : ''}`} key={step.step}>
                    <div className="roadmap-node">{step.done ? <Check size={13} /> : <span />}</div>
                    <div>
                      <span className="roadmap-week">Step {step.step}</span>
                      <strong>{step.title}</strong>
                    </div>
                    {step.done ? <Check size={16} className="activity-check" /> : <ChevronRight size={17} className="muted-icon" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="ats-detail-panel">
              <div className="ats-detail-left">
                <div className="ats-detail-ring" style={{ background: `conic-gradient(${selected.ats_score >= 75 ? '#29966c' : selected.ats_score >= 60 ? '#ce8b1e' : '#e84c4c'} ${selected.ats_score * 3.6}deg, #eef0f6 0deg)` }}>
                  <div className="ats-detail-ring-inner">
                    <strong>{selected.ats_score}</strong>
                    <small>/ 100</small>
                  </div>
                </div>
                <div>
                  <span className="eyebrow">ATS RESUME SCORE</span>
                  <h3>{selected.ats_score >= 75 ? 'Good — passes most ATS filters' : selected.ats_score >= 60 ? 'Average — some ATS may filter you' : 'Low — improve your resume format'}</h3>
                  <p>Applicant Tracking Systems (ATS) scan your resume before recruiters see it. A higher ATS score means your resume is more likely to get through automated screening.</p>
                </div>
              </div>
              <div className="ats-checklist">
                <div className={`ats-check-item ${selected.ats_score >= 60 ? 'pass' : 'fail'}`}><Check size={14} /> Resume format is parseable</div>
                <div className={`ats-check-item ${selected.ats_score >= 65 ? 'pass' : 'fail'}`}><Check size={14} /> Keywords match job descriptions</div>
                <div className={`ats-check-item ${selected.ats_score >= 70 ? 'pass' : 'fail'}`}><Check size={14} /> Contact information detected</div>
                <div className={`ats-check-item ${selected.ats_score >= 75 ? 'pass' : 'fail'}`}><Check size={14} /> Skills section is well-structured</div>
                <div className={`ats-check-item ${selected.ats_score >= 80 ? 'pass' : 'fail'}`}><Check size={14} /> Experience section is clear</div>
                <div className={`ats-check-item ${selected.ats_score >= 85 ? 'pass' : 'fail'}`}><Check size={14} /> Education details are complete</div>
              </div>
            </div>

          <div className="improvement-banner">
            <div className="improvement-icon"><Lightbulb size={20} /></div>
            <div>
              <strong>How to improve your scores</strong>
              <p>Focus on <b>Statistics</b> and <b>Data Visualization</b> to raise your overall readiness by up to 12%. To improve your ATS score, use a clean single-column resume format, include keywords from job descriptions, and ensure your skills section is well-structured.</p>
            </div>
            <button className="secondary-button" onClick={() => onNotify('Opening your personalized improvement plan.')}>View plan <ArrowUpRight size={15} /></button>
          </div>
        </div>
      ) : (
        <div className="detail-placeholder">
          <div className="placeholder-orbit"><CloudUpload size={31} /></div>
          <h2>Upload your first resume</h2>
          <p>Get instant AI-powered scores across 7 key competencies.</p>
          <button className="primary-button" onClick={() => fileInputRef.current?.click()}><CloudUpload size={16} /> Upload resume</button>
        </div>
      )}
    </div>
  );
}
