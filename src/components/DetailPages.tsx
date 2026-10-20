import { useState, useEffect, useCallback } from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronRight,
  ClipboardCheck,
  Clock,
  CloudUpload,
  ExternalLink,
  FileText,
  GraduationCap,
  Lightbulb,
  Loader2,
  Mail,
  MessageSquare,
  Network,
  Play,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  User,
  Video,
  X,
  Zap,
} from 'lucide-react';
import type { StudentProfile, CareerMatch } from '@/lib/supabase';
import {
  supabase,
  createNotification,
  fetchNotifications,
  markAllNotificationsRead,
  sendMessage,
  fetchMessages,
  logActivity,
  fetchActivity,
  updateProfileData,
  ALL_DOMAINS,
  ALL_INDUSTRIES,
  INDUSTRY_DOMAIN_MAP,
  type NotificationItem,
  type MessageItem,
  type ActivityItem,
} from '@/lib/supabase';

function getCareerMatches(profile: StudentProfile): CareerMatch[] {
  const base = profile.career_match_score;
  return [
    { title: profile.recommended_career, match: base, color: 'blue', salary: '', skills: profile.predicted_domain },
    { title: `${profile.predicted_domain} Specialist`, match: Math.max(60, base - 7), color: 'violet', salary: '', skills: 'Domain-aligned' },
    { title: 'Software Developer', match: Math.max(50, base - 13), color: 'gold', salary: '', skills: 'General IT' },
  ];
}

/* ===== Career Match Page ===== */
export function CareerMatchPage({ profile, onNotify }: { profile: StudentProfile; onNotify: (msg: string) => void }) {
  const careers = getCareerMatches(profile);
  return (
    <div className="page-wrap detail-page">
      <section className="detail-hero">
        <div className="detail-icon"><Target size={26} /></div>
        <div>
          <div className="eyebrow">AI RECOMMENDATIONS</div>
          <h1>Your career matches<span>.</span></h1>
          <p>Based on your resume analysis, your predicted domain is <b>{profile.predicted_domain}</b>. Here are the career paths that best fit your skills.</p>
        </div>
      </section>

      {!profile.resume_uploaded ? (
        <ResumePrompt onNotify={onNotify} message="Upload your resume to unlock personalized career matches across all domains." />
      ) : (
        <>
          <div className="domain-prediction-banner" style={{ marginTop: 16 }}>
            <div className="domain-prediction-icon"><Sparkles size={22} /></div>
            <div className="domain-prediction-content">
              <div className="domain-prediction-label">AI PREDICTED DOMAIN</div>
              <strong>{profile.predicted_domain}</strong>
              <p>Your resume was analyzed across {profile.industry || 'IT'} industry domains. The best match for your skills is <b>{profile.predicted_domain}</b>.</p>
            </div>
          </div>

          <div className="career-match-grid" style={{ marginTop: 16 }}>
            {careers.map((career, i) => (
              <div className="career-match-card" key={career.title}>
                <div className={`career-rank ${career.color}`}>0{i + 1}</div>
                <div className="career-match-body">
                  <strong>{career.title}</strong>
                  <small>{career.skills}</small>
                  <div className="career-match-bar-wrap">
                    <div className="career-match-bar">
                      <div className={`career-match-fill ${career.color}`} style={{ width: `${career.match}%` }} />
                    </div>
                    <span className={`career-match-pct ${career.color}`}>{career.match}%</span>
                  </div>
                </div>
                <button className="secondary-button" onClick={() => onNotify(`${career.title} pathway opened.`)}>Explore <ChevronRight size={15} /></button>
              </div>
            ))}
          </div>

          <div className="panel" style={{ marginTop: 16 }}>
            <div className="panel-heading"><div><h3>How to grow your career in {profile.predicted_domain}</h3><p>AI recommendations from your resume</p></div></div>
            <div className="career-growth-tips">
              <div className="growth-tip"><Check size={16} /> Focus on mastering <b>{profile.strengths[0] || 'core skills'}</b> — you already have a strong foundation.</div>
              <div className="growth-tip"><Target size={16} /> Close your <b>{profile.skill_gaps.filter((g) => g.status === 'Gap').length} skill gaps</b> to increase placement chances by up to 15%.</div>
              <div className="growth-tip"><BookOpen size={16} /> Complete the <b>{profile.roadmap.length}-step roadmap</b> to become placement-ready in {profile.predicted_domain}.</div>
              <div className="growth-tip"><Award size={16} /> Take the recommended <b>assessments</b> to validate your skills for recruiters.</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ===== Skill Gaps Page ===== */
export function SkillGapsPage({ profile, onNotify }: { profile: StudentProfile; onNotify: (msg: string) => void }) {
  const gaps = profile.skill_gaps;
  const gapCount = gaps.filter((g) => g.status === 'Gap').length;
  const availCount = gaps.filter((g) => g.status === 'Available').length;
  const gapSkills = gaps.filter((g) => g.status === 'Gap').map((g) => g.skill);

  return (
    <div className="page-wrap detail-page">
      <section className="detail-hero">
        <div className="detail-icon"><Network size={26} /></div>
        <div>
          <div className="eyebrow">SKILL INTELLIGENCE</div>
          <h1>Skill gap analysis<span>.</span></h1>
          <p>From your resume for the <b>{profile.predicted_domain}</b> domain, we identified {availCount} available skills and {gapCount} gaps to close for placement readiness.</p>
        </div>
      </section>

      {!profile.resume_uploaded ? (
        <ResumePrompt onNotify={onNotify} message="Upload your resume to see which skills you have and which you need for your predicted domain." />
      ) : (
        <>
          <div className="skill-gap-summary">
            <div className="sgs-card green"><Check size={20} /><div><strong>{availCount}</strong><span>Available</span></div></div>
            <div className="sgs-card red"><Target size={20} /><div><strong>{gapCount}</strong><span>Gaps to close</span></div></div>
            <div className="sgs-card violet"><TrendingUp size={20} /><div><strong>{profile.skill_score}</strong><span>Skill score</span></div></div>
          </div>

          <div className="panel" style={{ marginTop: 16 }}>
            <div className="panel-heading"><div><h3>Skills for {profile.predicted_domain}</h3><p>From your resume vs. domain requirements</p></div></div>
            <div className="gap-table-header"><span>Skill</span><span>Status</span></div>
            {gaps.map((gap) => (
              <div className="gap-table-row" key={gap.skill}>
                <span className="gap-skill-name">{gap.skill}</span>
                <span className={`gap-status ${gap.status === 'Gap' ? 'is-gap' : 'is-available'}`}>{gap.status}</span>
              </div>
            ))}
            {profile.strengths.length > 0 && (
              <div className="strengths-block">
                <div className="strengths-label"><Trophy size={14} /> Your strengths</div>
                <div className="strengths-chips">{profile.strengths.map((s) => <span className="strength-chip" key={s}>{s}</span>)}</div>
              </div>
            )}
          </div>

          <div className="panel" style={{ marginTop: 16 }}>
            <div className="panel-heading"><div><h3>Which skills to focus on</h3><p>Real improvement areas from your resume</p></div></div>
            {gapSkills.length > 0 ? (
              <div className="career-growth-tips">
                {gapSkills.map((skill) => (
                  <div className="growth-tip" key={skill}><Target size={16} /> <b>{skill}</b> — this is a gap in your resume for {profile.predicted_domain}. Take the related class and assessment to close this gap.</div>
                ))}
                <div className="growth-tip"><Lightbulb size={16} /> Closing all {gapCount} gaps can raise your readiness score by up to {(gapCount * 7)}%.</div>
              </div>
            ) : (
              <div className="career-growth-tips">
                <div className="growth-tip"><Check size={16} /> No skill gaps detected! Your resume covers all core skills for {profile.predicted_domain}.</div>
              </div>
            )}
          </div>

          <div className="improvement-banner">
            <div className="improvement-icon"><Lightbulb size={20} /></div>
            <div>
              <strong>Placement recommendation for {profile.predicted_domain}</strong>
              <p>As a fresher, focus on closing your <b>{gapCount} skill gaps</b> to increase your placement chances. Each gap you close can raise your readiness score by 5-8%. Learn the skills listed above using the class suggestions page.</p>
            </div>
            <button className="secondary-button" onClick={() => onNotify('Opening your skill improvement plan.')}>View plan <ArrowRight size={15} /></button>
          </div>
        </>
      )}
    </div>
  );
}

/* ===== Roadmap Page ===== */
export function RoadmapPage({ profile, onNotify }: { profile: StudentProfile; onNotify: (msg: string) => void }) {
  const [roadmap, setRoadmap] = useState(profile.roadmap);
  const completed = roadmap.filter((s) => s.done).length;

  function toggleStep(idx: number) {
    const updated = [...roadmap];
    updated[idx] = { ...updated[idx], done: !updated[idx].done };
    setRoadmap(updated);
    onNotify(updated[idx].done ? `Completed: ${updated[idx].title}` : `Marked incomplete: ${updated[idx].title}`);
    updateProfileData(profile.id, { roadmap: updated });
    if (updated[idx].done) {
      createNotification(profile.id, `Roadmap step completed: ${updated[idx].title}`, 'roadmap');
      logActivity(profile.id, `Completed roadmap step: ${updated[idx].title}`, 'roadmap');
    }
  }

  return (
    <div className="page-wrap detail-page">
      <section className="detail-hero">
        <div className="detail-icon"><BookOpen size={26} /></div>
        <div>
          <div className="eyebrow">PERSONALIZED PLAN</div>
          <h1>Your learning roadmap<span>.</span></h1>
          <p>A step-by-step plan built from your resume analysis for <b>{profile.predicted_domain}</b> to get you placement-ready.</p>
        </div>
      </section>

      {!profile.resume_uploaded ? (
        <ResumePrompt onNotify={onNotify} message="Upload your resume to generate your personalized learning roadmap for your predicted domain." />
      ) : (
        <>
          <div className="roadmap-progress-banner">
            <div className="rmp-icon"><TrendingUp size={22} /></div>
            <div><strong>{completed} of {roadmap.length} steps complete</strong><span>{Math.round((completed / roadmap.length) * 100)}% through your {profile.predicted_domain} roadmap</span></div>
            <div className="rmp-ring" style={{ background: `conic-gradient(#7258db ${(completed / roadmap.length) * 360}deg, #eef0f6 0deg)` }}>
              <div className="rmp-ring-inner">{Math.round((completed / roadmap.length) * 100)}%</div>
            </div>
          </div>

          <div className="panel" style={{ marginTop: 16 }}>
            <div className="panel-heading"><div><h3>Learning path for {profile.predicted_domain}</h3><p>Click a step to mark it complete</p></div></div>
            <div className="roadmap-list">
              {roadmap.map((step, idx) => (
                <button className={`roadmap-row-clickable ${step.done ? 'done' : ''}`} key={step.step} onClick={() => toggleStep(idx)}>
                  <div className="roadmap-node">{step.done ? <Check size={13} /> : <span />}</div>
                  <div>
                    <span className="roadmap-week">{step.week} · Step {step.step}</span>
                    <strong>{step.title}</strong>
                  </div>
                  {step.done ? <Check size={16} className="activity-check" /> : <ChevronRight size={17} className="muted-icon" />}
                </button>
              ))}
            </div>
          </div>

          <div className="panel" style={{ marginTop: 16 }}>
            <div className="panel-heading"><div><h3>What to try to improve your performance</h3><p>AI suggestions for {profile.predicted_domain}</p></div></div>
            <div className="career-growth-tips">
              <div className="growth-tip"><Video size={16} /> Watch the recommended classes to learn current technology in your domain.</div>
              <div className="growth-tip"><ClipboardCheck size={16} /> Take assessments after each roadmap step to validate your learning.</div>
              <div className="growth-tip"><BriefcaseBusiness size={16} /> Apply for the recommended jobs once you complete 60% of your roadmap.</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ===== Assessments Page (with real Start flow) ===== */
const QUIZ_QUESTIONS = [
  { q: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Query Logic', 'Standard Question Language', 'System Query Layer'], answer: 0 },
  { q: 'Which is a NoSQL database?', options: ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle'], answer: 2 },
  { q: 'What does a primary key do?', options: ['Stores images', 'Uniquely identifies rows', 'Encrypts data', 'Indexes files'], answer: 1 },
  { q: 'Which is a data visualization tool?', options: ['Tableau', 'Java', 'Git', 'Docker'], answer: 0 },
  { q: 'What is the purpose of normalization?', options: ['Speed up queries', 'Reduce data redundancy', 'Encrypt data', 'Backup data'], answer: 1 },
  { q: 'Which Python library is used for data analysis?', options: ['React', 'Pandas', 'Docker', 'Kubernetes'], answer: 1 },
];

export function AssessmentsPage({ profile, onNotify }: { profile: StudentProfile; onNotify: (msg: string) => void }) {
  const [assessments, setAssessments] = useState(profile.assessments);
  const [activeQuiz, setActiveQuiz] = useState<number | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);
  const [quizDone, setQuizDone] = useState(false);
  const completed = assessments.filter((a) => a.done).length;

  function startAssessment(id: number) {
    setActiveQuiz(id);
    setQuizIdx(0);
    setQuizScore(0);
    setQuizAnswered(null);
    setQuizDone(false);
    onNotify('Assessment started! Answer the questions to complete it.');
  }

  function answerQuestion(selected: number) {
    if (quizAnswered !== null) return;
    setQuizAnswered(selected);
    if (selected === QUIZ_QUESTIONS[quizIdx].answer) {
      setQuizScore((s) => s + 1);
    }
  }

  function nextQuestion() {
    if (quizIdx + 1 >= QUIZ_QUESTIONS.length) {
      const finalScore = Math.round(((quizScore + (quizAnswered === QUIZ_QUESTIONS[quizIdx].answer ? 0 : 0)) / QUIZ_QUESTIONS.length) * 100);
      finishAssessment(finalScore);
    } else {
      setQuizIdx((i) => i + 1);
      setQuizAnswered(null);
    }
  }

  function finishAssessment(score: number) {
    if (activeQuiz === null) return;
    const updated = assessments.map((a) => a.id === activeQuiz ? { ...a, done: true } : a);
    setAssessments(updated);
    setQuizDone(true);
    const assessment = assessments.find((a) => a.id === activeQuiz);
    onNotify(`${assessment?.title} completed! Score: ${score}%`);
    updateProfileData(profile.id, { assessments: updated });
    createNotification(profile.id, `Assessment completed: ${assessment?.title} — Score: ${score}%`, 'assessment');
    logActivity(profile.id, `Completed assessment: ${assessment?.title} (${score}%)`, 'assessment', String(score));
  }

  function closeQuiz() {
    setActiveQuiz(null);
    setQuizDone(false);
  }

  return (
    <div className="page-wrap detail-page">
      <section className="detail-hero">
        <div className="detail-icon"><ClipboardCheck size={26} /></div>
        <div>
          <div className="eyebrow">CHECK YOUR PROGRESS</div>
          <h1>Assessments for {profile.predicted_domain}<span>.</span></h1>
          <p>Based on your resume, these assessments will help you master the skills for <b>{profile.recommended_career}</b> and improve your placement chances.</p>
        </div>
      </section>

      {!profile.resume_uploaded ? (
        <ResumePrompt onNotify={onNotify} message="Upload your resume to get personalized assessment recommendations for your predicted domain." />
      ) : (
        <>
          <div className="assessment-summary">
            <div className="asmt-card violet"><ClipboardCheck size={20} /><div><strong>{completed}/{assessments.length}</strong><span>Completed</span></div></div>
            <div className="asmt-card blue"><Clock size={20} /><div><strong>{assessments.reduce((sum, a) => sum + parseInt(a.duration), 0)} min</strong><span>Total time</span></div></div>
            <div className="asmt-card gold"><Award size={20} /><div><strong>{Math.round((completed / assessments.length) * 100)}%</strong><span>Progress</span></div></div>
          </div>

          <div className="assessment-list" style={{ marginTop: 16 }}>
            {assessments.map((a) => (
              <div className={`assessment-card ${a.done ? 'done' : ''}`} key={a.id}>
                <div className={`assessment-node ${a.done ? 'done' : ''}`}>{a.done ? <Check size={14} /> : <span />}</div>
                <div className="assessment-body">
                  <strong>{a.title}</strong>
                  <div className="assessment-meta">
                    <span className="asmt-domain">{a.domain}</span>
                    <span className="asmt-diff">{a.difficulty}</span>
                    <span className="asmt-dur"><Clock size={12} /> {a.duration}</span>
                  </div>
                </div>
                <button className={a.done ? 'secondary-button' : 'primary-button'} onClick={() => a.done ? onNotify(`${a.title} already completed. Retake not needed.`) : startAssessment(a.id)}>
                  {a.done ? <><Check size={13} /> Completed</> : <><Play size={13} fill='currentColor' /> Start</>}
                </button>
              </div>
            ))}
          </div>

          <div className="panel" style={{ marginTop: 16 }}>
            <div className="match-note"><Lightbulb size={16} /><span>Complete these assessments to demonstrate mastery in {profile.predicted_domain}. Recruiters value verified skills for fresher placements.</span></div>
          </div>
        </>
      )}

      {activeQuiz !== null && (
        <div className="modal-backdrop" onClick={() => !quizDone && closeQuiz()}>
          <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeQuiz} aria-label="Close"><X size={18} /></button>
            {!quizDone ? (
              <>
                <div className="modal-icon"><ClipboardCheck size={26} /></div>
                <span className="eyebrow">ASSESSMENT IN PROGRESS</span>
                <h2>Question {quizIdx + 1} of {QUIZ_QUESTIONS.length}</h2>
                <p style={{ fontSize: 15, marginBottom: 16 }}>{QUIZ_QUESTIONS[quizIdx].q}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
                  {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => {
                    const isCorrect = i === QUIZ_QUESTIONS[quizIdx].answer;
                    const isSelected = quizAnswered === i;
                    let cls = 'quiz-option';
                    if (quizAnswered !== null) {
                      if (isCorrect) cls += ' correct';
                      else if (isSelected) cls += ' wrong';
                    }
                    return (
                      <button key={i} className={cls} onClick={() => answerQuestion(i)} disabled={quizAnswered !== null}>
                        {opt}
                        {quizAnswered !== null && isCorrect && <Check size={16} />}
                      </button>
                    );
                  })}
                </div>
                {quizAnswered !== null && (
                  <button className="primary-button" style={{ marginTop: 16, width: '100%' }} onClick={nextQuestion}>
                    {quizIdx + 1 >= QUIZ_QUESTIONS.length ? 'Finish assessment' : 'Next question'} <ArrowRight size={15} />
                  </button>
                )}
              </>
            ) : (
              <>
                <div className="modal-icon" style={{ background: '#dcfce7', color: '#16a34a' }}><Trophy size={26} /></div>
                <span className="eyebrow">ASSESSMENT COMPLETE</span>
                <h2>You scored {Math.round((quizScore / QUIZ_QUESTIONS.length) * 100)}%</h2>
                <p>You got {quizScore} out of {QUIZ_QUESTIONS.length} questions correct. Your assessment has been saved to your profile.</p>
                <button className="primary-button" style={{ marginTop: 16, width: '100%' }} onClick={closeQuiz}>Done <Check size={15} /></button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== Class Suggestions Page (with real Start learning tracking) ===== */
export function ClassSuggestionsPage({ profile, onNotify }: { profile: StudentProfile; onNotify: (msg: string) => void }) {
  const classes = profile.class_suggestions || [];
  const [learningStarted, setLearningStarted] = useState<number[]>(profile.learning_started || []);

  function startLearning(classId: number, title: string, platform: string) {
    const updated = learningStarted.includes(classId) ? learningStarted : [...learningStarted, classId];
    setLearningStarted(updated);
    updateProfileData(profile.id, { learning_started: updated });
    onNotify(`Started learning: ${title}. Opening on ${platform}...`);
    createNotification(profile.id, `Started learning: ${title} on ${platform}`, 'class');
    logActivity(profile.id, `Started class: ${title}`, 'class', platform);
  }

  return (
    <div className="page-wrap detail-page">
      <section className="detail-hero">
        <div className="detail-icon"><GraduationCap size={26} /></div>
        <div>
          <div className="eyebrow">LEARN &amp; IMPROVE</div>
          <h1>Class suggestions for {profile.predicted_domain}<span>.</span></h1>
          <p>AI-recommended courses to help you learn current technology in your domain, close skill gaps, and improve your placement chances.</p>
        </div>
      </section>

      {!profile.resume_uploaded ? (
        <ResumePrompt onNotify={onNotify} message="Upload your resume to get personalized class and course recommendations for your predicted domain." />
      ) : classes.length === 0 ? (
        <div className="resume-prompt-card">
          <div className="resume-prompt-icon"><GraduationCap size={32} /></div>
          <h2>No class suggestions yet</h2>
          <p>Re-upload your resume to generate class recommendations.</p>
        </div>
      ) : (
        <>
          <div className="class-suggestions-grid">
            {classes.map((cls) => {
              const started = learningStarted.includes(cls.id);
              return (
                <div className="class-suggestion-card" key={cls.id}>
                  <div className="class-card-top">
                    <div className="class-card-icon"><GraduationCap size={20} /></div>
                    <span className={`class-level-badge ${cls.level.toLowerCase()}`}>{cls.level}</span>
                  </div>
                  <strong>{cls.title}</strong>
                  <div className="class-card-meta">
                    <span><Video size={12} /> {cls.platform}</span>
                    <span><Clock size={12} /> {cls.duration}</span>
                  </div>
                  <p className="class-card-focus">{cls.focus}</p>
                  {started && <div className="re-upload-note" style={{ marginBottom: 8 }}><Check size={14} /> Learning in progress</div>}
                  <button
                    className={started ? 'secondary-button full-width' : 'primary-button full-width'}
                    onClick={() => startLearning(cls.id, cls.title, cls.platform)}
                  >
                    {started ? <><BookOpen size={14} /> Continue learning</> : <>Start learning <Play size={13} fill='currentColor' /></>}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="improvement-banner" style={{ marginTop: 16 }}>
            <div className="improvement-icon"><Lightbulb size={20} /></div>
            <div>
              <strong>How to use these classes</strong>
              <p>Start with beginner-level classes if you're a fresher. Focus on classes that cover your <b>skill gaps</b> first. Complete at least 2 classes before applying for jobs in {profile.predicted_domain}.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ===== Job Tracker Page (with persisting status updates) ===== */
export function JobTrackerPage({ profile, onNotify }: { profile: StudentProfile; onNotify: (msg: string) => void }) {
  const [jobs, setJobs] = useState(profile.job_recommendations);

  function cycleStatus(id: number) {
    const statuses = ['Recommended', 'Applied', 'Interview', 'Offer'];
    const job = jobs.find((j) => j.id === id);
    if (!job) return;
    const curIdx = statuses.indexOf(job.status);
    const nextIdx = (curIdx + 1) % statuses.length;
    const newStatus = statuses[nextIdx];
    const updated = jobs.map((j) => j.id === id ? { ...j, status: newStatus } : j);
    setJobs(updated);
    updateProfileData(profile.id, { job_recommendations: updated });
    onNotify(`${job.title} status updated to: ${newStatus}`);
    createNotification(profile.id, `Job status updated: ${job.title} → ${newStatus}`, 'job');
    logActivity(profile.id, `Updated job status: ${job.title} to ${newStatus}`, 'job', newStatus);
  }

  return (
    <div className="page-wrap detail-page">
      <section className="detail-hero">
        <div className="detail-icon"><BriefcaseBusiness size={26} /></div>
        <div>
          <div className="eyebrow">OPPORTUNITY PIPELINE</div>
          <h1>Job recommendations for {profile.predicted_domain}<span>.</span></h1>
          <p>Based on your resume analysis, here are the roles in <b>{profile.predicted_domain}</b> that match your skills. Focus on the jobs that align with your resume strengths.</p>
        </div>
      </section>

      {!profile.resume_uploaded ? (
        <ResumePrompt onNotify={onNotify} message="Upload your resume to get job recommendations matched to your skills in your predicted domain." />
      ) : (
        <>
          <div className="job-list">
            {jobs.map((job) => (
              <div className="job-card" key={job.id}>
                <div className="job-main">
                  <div className="job-icon"><BriefcaseBusiness size={18} /></div>
                  <div>
                    <strong>{job.title}</strong>
                    <div className="job-meta">
                      <span><Building2 size={12} /> {job.company}</span>
                      <span><Target size={12} /> {job.match}% match</span>
                      <span className="job-focus"><Zap size={12} /> {job.focus}</span>
                    </div>
                  </div>
                </div>
                <div className="job-actions">
                  <span className={`job-status-pill status-${job.status.toLowerCase().replace(' ', '-')}`}>{job.status}</span>
                  <button className="secondary-button" onClick={() => cycleStatus(job.id)}>Update status <ChevronRight size={15} /></button>
                </div>
              </div>
            ))}
          </div>

          <div className="panel" style={{ marginTop: 16 }}>
            <div className="panel-heading"><div><h3>Which jobs to focus on</h3><p>AI priority from your resume</p></div></div>
            <div className="career-growth-tips">
              <div className="growth-tip"><Target size={16} /> Focus on <b>jobs with 80%+ match</b> — these align most closely with your resume skills.</div>
              <div className="growth-tip"><BriefcaseBusiness size={16} /> Apply to at least <b>3-5 jobs</b> in {profile.predicted_domain} to maximize your chances.</div>
              <div className="growth-tip"><Award size={16} /> Complete the <b>assessments</b> before applying — verified scores make your application stand out.</div>
            </div>
          </div>

          <div className="panel" style={{ marginTop: 16 }}>
            <div className="panel-heading"><div><h3>Resume-based job focus</h3><p>What to improve from your resume</p></div></div>
            <div className="career-growth-tips">
              {profile.skill_gaps.filter((g) => g.status === 'Gap').slice(0, 3).map((g) => (
                <div className="growth-tip" key={g.skill}><Lightbulb size={16} /> Improve <b>{g.skill}</b> — this skill gap affects your job match score. Close it to unlock higher-match roles.</div>
              ))}
              {profile.skill_gaps.filter((g) => g.status === 'Gap').length === 0 && (
                <div className="growth-tip"><Check size={16} /> Your resume covers all key skills for {profile.predicted_domain} jobs. Apply with confidence!</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ===== Profile Page (full edit) ===== */
export function ProfileEditPage({ profile, onNotify, onProfileUpdated }: { profile: StudentProfile; onNotify: (msg: string) => void; onProfileUpdated: (p: StudentProfile) => void }) {
  const [form, setForm] = useState({
    full_name: profile.full_name,
    email: profile.email,
    phone: profile.phone || '',
    education_level: profile.education_level,
    degree: profile.degree,
    university: profile.university || '',
    interests: profile.interests || '',
    industry: profile.industry || 'IT / Software',
  });
  const [saving, setSaving] = useState(false);
  const [domainOptions, setDomainOptions] = useState<string[]>(ALL_DOMAINS as unknown as string[]);

  useEffect(() => {
    const industryDomains = INDUSTRY_DOMAIN_MAP[form.industry];
    if (industryDomains) {
      setDomainOptions(industryDomains);
      if (!industryDomains.includes(form.interests)) {
        setForm((prev) => ({ ...prev, interests: '' }));
      }
    } else {
      setDomainOptions(ALL_DOMAINS as unknown as string[]);
    }
  }, [form.industry]);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.full_name || !form.email) {
      onNotify('Name and email are required.');
      return;
    }
    setSaving(true);
    const ok = await updateProfileData(profile.id, form);
    if (ok) {
      onProfileUpdated({ ...profile, ...form });
      onNotify('Profile updated successfully.');
      createNotification(profile.id, 'Profile information updated', 'profile');
      logActivity(profile.id, 'Updated profile information', 'profile');
    } else {
      onNotify('Could not save to database. Changes kept locally.');
      onProfileUpdated({ ...profile, ...form });
    }
    setSaving(false);
  }

  return (
    <div className="page-wrap detail-page">
      <section className="detail-hero">
        <div className="detail-icon"><User size={26} /></div>
        <div>
          <div className="eyebrow">YOUR ACCOUNT</div>
          <h1>My profile<span>.</span></h1>
          <p>View and update your personal information. Your profile is linked to your email <b>{profile.email}</b> and is private to you.</p>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }} className="profile-edit-grid">
        <div className="panel" style={{ margin: 0 }}>
          <div className="panel-heading"><div><h3>Profile summary</h3><p>Your current information</p></div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 20px 20px' }}>
            <div className="profile-summary-row"><User size={15} /> <span>Name:</span> <strong>{profile.full_name}</strong></div>
            <div className="profile-summary-row"><Mail size={15} /> <span>Email:</span> <strong>{profile.email}</strong></div>
            <div className="profile-summary-row"><Target size={15} /> <span>Industry:</span> <strong>{profile.industry || 'IT / Software'}</strong></div>
            <div className="profile-summary-row"><Sparkles size={15} /> <span>Predicted domain:</span> <strong>{profile.resume_uploaded ? profile.predicted_domain : 'Not analyzed yet'}</strong></div>
            <div className="profile-summary-row"><FileText size={15} /> <span>Resume:</span> <strong>{profile.resume_uploaded ? profile.resume_filename : 'Not uploaded'}</strong></div>
            <div className="profile-summary-row"><Award size={15} /> <span>Certificate:</span> <strong>{profile.certificate_uploaded ? profile.certificate_filename : 'Not uploaded'}</strong></div>
            <div className="profile-summary-row"><TrendingUp size={15} /> <span>Career match:</span> <strong>{profile.resume_uploaded ? `${profile.career_match_score}%` : 'N/A'}</strong></div>
          </div>
        </div>

        <form className="panel" style={{ margin: 0 }} onSubmit={handleSave}>
          <div className="panel-heading" style={{ marginBottom: 12 }}><div><h3>Edit information</h3><p>Update your details</p></div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 20px 20px' }}>
            <label className="profile-edit-label">Full Name</label>
            <input className="profile-edit-input" type="text" value={form.full_name} onChange={(e) => update('full_name', e.target.value)} />
            <label className="profile-edit-label">Email</label>
            <input className="profile-edit-input" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} />
            <label className="profile-edit-label">Phone</label>
            <input className="profile-edit-input" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
            <label className="profile-edit-label">Industry</label>
            <select className="profile-edit-input" value={form.industry} onChange={(e) => update('industry', e.target.value)}>
              {ALL_INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
            </select>
            <label className="profile-edit-label">Career Interest Domain</label>
            <select className="profile-edit-input" value={form.interests} onChange={(e) => update('interests', e.target.value)}>
              <option value="">Select a domain (optional)</option>
              {domainOptions.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <button className="primary-button" type="submit" disabled={saving} style={{ marginTop: 4 }}>
              {saving ? <><Loader2 size={16} className="spin-icon" /> Saving...</> : <>Save changes <Check size={16} /></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ===== Chat / Complaint Box Page ===== */
export function ChatBoxPage({ profile, onNotify }: { profile: StudentProfile; onNotify: (msg: string) => void }) {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);

  const loadMessages = useCallback(async () => {
    const data = await fetchMessages(profile.id);
    setMessages(data);
  }, [profile.id]);

  useEffect(() => { loadMessages(); }, [loadMessages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) {
      onNotify('Please enter a message.');
      return;
    }
    setSending(true);
    const result = await sendMessage(profile.id, profile.full_name, profile.email, subject, body);
    if (result.saved || result.emailed) {
      onNotify('Message sent! It has been delivered to the admin email.');
      setSubject('');
      setBody('');
      createNotification(profile.id, 'Your message was sent to admin', 'message');
      logActivity(profile.id, 'Sent a message to admin', 'message', subject || 'No subject');
      loadMessages();
    } else {
      onNotify('Could not send message. Please try again.');
    }
    setSending(false);
  }

  return (
    <div className="page-wrap detail-page">
      <section className="detail-hero">
        <div className="detail-icon"><MessageSquare size={26} /></div>
        <div>
          <div className="eyebrow">STUDENT CHAT BOX</div>
          <h1>Send a message<span>.</span></h1>
          <p>Have a question, complaint, or feedback? Send a message here and it will be delivered to the admin at <b>darshan382002@gmail.com</b>.</p>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }} className="chat-grid">
        <form className="panel" style={{ margin: 0 }} onSubmit={handleSend}>
          <div className="panel-heading" style={{ marginBottom: 12 }}><div><h3>Write a message</h3><p>Delivered to admin email</p></div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 20px 20px' }}>
            <label className="profile-edit-label">Subject</label>
            <input className="profile-edit-input" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Question about my domain prediction" />
            <label className="profile-edit-label">Message</label>
            <textarea className="profile-edit-input chat-textarea" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Type your message here..." rows={6} />
            <button className="primary-button" type="submit" disabled={sending}>
              {sending ? <><Loader2 size={16} className="spin-icon" /> Sending...</> : <>Send message <Send size={15} /></>}
            </button>
          </div>
        </form>

        <div className="panel" style={{ margin: 0 }}>
          <div className="panel-heading" style={{ marginBottom: 12 }}><div><h3>Your messages</h3><p>History of sent messages</p></div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 20px 20px', maxHeight: 400, overflowY: 'auto' }}>
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#888', padding: 20 }}>No messages yet. Send your first message!</div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="chat-message-item">
                  <div className="chat-message-header">
                    <strong>{msg.subject || 'No subject'}</strong>
                    <span className={`chat-message-status ${msg.sent ? 'sent' : 'pending'}`}>{msg.sent ? 'Delivered' : 'Pending'}</span>
                  </div>
                  <p className="chat-message-body">{msg.body}</p>
                  <small className="chat-message-time">{new Date(msg.created_at).toLocaleString()}</small>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Notifications Panel Page ===== */
export function NotificationsPage({ profile, onNotify }: { profile: StudentProfile; onNotify: (msg: string) => void }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetchNotifications(profile.id);
    setNotifications(data);
    setLoading(false);
  }, [profile.id]);

  useEffect(() => { load(); }, [load]);

  async function handleMarkAll() {
    await markAllNotificationsRead(profile.id);
    onNotify('All notifications marked as read.');
    load();
  }

  return (
    <div className="page-wrap detail-page">
      <section className="detail-hero">
        <div className="detail-icon"><Mail size={26} /></div>
        <div>
          <div className="eyebrow">NOTIFICATIONS</div>
          <h1>Your notifications<span>.</span></h1>
          <p>All activity updates from your time on the platform — resume uploads, assessments, jobs, classes, and messages.</p>
        </div>
      </section>

      <div className="panel" style={{ marginTop: 16 }}>
        <div className="panel-heading">
          <div><h3>Recent notifications</h3><p>{notifications.filter((n) => !n.read).length} unread</p></div>
          {notifications.some((n) => !n.read) && (
            <button className="secondary-button" onClick={handleMarkAll}>Mark all read <Check size={14} /></button>
          )}
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 30, color: '#888' }}><Loader2 size={24} className="spin-icon" /></div>
        ) : notifications.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', padding: 30 }}>No notifications yet. Start using the platform to see updates here.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 20px 20px' }}>
            {notifications.map((n) => (
              <div key={n.id} className={`notification-item ${n.read ? 'read' : 'unread'}`}>
                <div className={`notification-dot ${n.type}`} />
                <div style={{ flex: 1 }}>
                  <p>{n.message}</p>
                  <small>{new Date(n.created_at).toLocaleString()}</small>
                </div>
                {!n.read && <span className="notification-unread-badge">New</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ===== Project Portal Page (dynamic) ===== */
export function ProjectPortalPage({ profile }: { profile: StudentProfile }) {
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [messages, setMessages] = useState<MessageItem[]>([]);

  useEffect(() => {
    fetchActivity(profile.id).then(setActivity);
    fetchMessages(profile.id).then(setMessages);
  }, [profile.id]);

  const toolsUsed = [
    { name: 'React + TypeScript', icon: '⚡', desc: 'Frontend framework' },
    { name: 'Supabase', icon: '🟢', desc: 'Database & backend' },
    { name: 'Tailwind CSS', icon: '🎨', desc: 'Styling' },
    { name: 'Lucide Icons', icon: '✨', desc: 'UI icons' },
    { name: 'Edge Functions', icon: '⚡', desc: 'Email notifications' },
  ];

  const assessmentsStarted = profile.assessments?.filter((a) => a.done).length || 0;
  const classesStarted = (profile.learning_started || []).length;
  const jobsApplied = profile.job_recommendations?.filter((j) => j.status !== 'Recommended').length || 0;

  return (
    <div className="page-wrap detail-page">
      <section className="detail-hero">
        <div className="detail-icon"><Sparkles size={26} /></div>
        <div>
          <div className="eyebrow">PROJECT PORTAL</div>
          <h1>Platform overview<span>.</span></h1>
          <p>Everything happening on the platform — tools used, your assignments, classes started, and messages sent.</p>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }} className="portal-grid">
        <div className="panel" style={{ margin: 0 }}>
          <div className="panel-heading"><div><h3>Tools & Technologies</h3><p>What powers this platform</p></div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 20px 20px' }}>
            {toolsUsed.map((t) => (
              <div key={t.name} className="portal-tool-row">
                <span className="portal-tool-icon">{t.icon}</span>
                <div><strong>{t.name}</strong><small>{t.desc}</small></div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel" style={{ margin: 0 }}>
          <div className="panel-heading"><div><h3>Your progress</h3><p>Based on your resume</p></div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 20px 20px' }}>
            <div className="portal-stat-row"><ClipboardCheck size={18} /><span>Assessments completed:</span><strong>{assessmentsStarted} / {profile.assessments?.length || 0}</strong></div>
            <div className="portal-stat-row"><BookOpen size={18} /><span>Classes started:</span><strong>{classesStarted} / {profile.class_suggestions?.length || 0}</strong></div>
            <div className="portal-stat-row"><BriefcaseBusiness size={18} /><span>Jobs applied:</span><strong>{jobsApplied} / {profile.job_recommendations?.length || 0}</strong></div>
            <div className="portal-stat-row"><MessageSquare size={18} /><span>Messages sent:</span><strong>{messages.length}</strong></div>
            <div className="portal-stat-row"><FileText size={18} /><span>Resume:</span><strong>{profile.resume_uploaded ? 'Uploaded' : 'Not uploaded'}</strong></div>
          </div>
        </div>

        <div className="panel" style={{ margin: 0 }}>
          <div className="panel-heading"><div><h3>Recent activity</h3><p>Your latest actions</p></div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 20px 20px', maxHeight: 300, overflowY: 'auto' }}>
            {activity.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#888', padding: 20 }}>No activity yet. Start using the platform!</div>
            ) : (
              activity.map((a) => (
                <div key={a.id} className="portal-activity-row">
                  <span className={`portal-activity-dot ${a.category}`} />
                  <div><strong>{a.action}</strong>{a.detail && <small> · {a.detail}</small>}</div>
                  <small>{new Date(a.created_at).toLocaleString()}</small>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="panel" style={{ margin: 0 }}>
          <div className="panel-heading"><div><h3>Messages</h3><p>Sent to admin</p></div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 20px 20px', maxHeight: 300, overflowY: 'auto' }}>
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#888', padding: 20 }}>No messages sent yet.</div>
            ) : (
              messages.map((m) => (
                <div key={m.id} className="portal-message-row">
                  <strong>{m.subject || 'No subject'}</strong>
                  <p>{m.body.slice(0, 80)}{m.body.length > 80 ? '...' : ''}</p>
                  <small>{new Date(m.created_at).toLocaleString()} · {m.sent ? 'Delivered' : 'Pending'}</small>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Resume Prompt ===== */
function ResumePrompt({ onNotify, message }: { onNotify: (msg: string) => void; message: string }) {
  return (
    <div className="resume-prompt-card">
      <div className="resume-prompt-icon"><CloudUpload size={32} /></div>
      <h2>Upload your resume first</h2>
      <p>{message}</p>
      <button className="primary-button" onClick={() => onNotify('Go to the Overview page to upload your resume.')}>Go to Overview <ArrowRight size={16} /></button>
    </div>
  );
}
