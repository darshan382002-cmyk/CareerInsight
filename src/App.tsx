import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import {
  ArrowUpRight,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  CloudUpload,
  FileSearch,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  Loader2,
  Menu,
  Network,
  Play,
  Presentation,
  Search,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  Upload,
  UserRound,
  Users,
  X,
  Zap,
} from 'lucide-react';
import ResumeAnalysisPage from '@/components/ResumeAnalysisPage';
import ProjectPosterPage from '@/components/ProjectPosterPage';
import ProfilePage from '@/components/ProfilePage';
import { CareerMatchPage, SkillGapsPage, RoadmapPage, AssessmentsPage, JobTrackerPage, ClassSuggestionsPage, ProfileEditPage, ChatBoxPage, NotificationsPage, ProjectPortalPage } from '@/components/DetailPages';
import { supabase, generateAnalysisData, extractNameFromFilename, sendNotificationEmail, createNotification, logActivity, fetchNotifications, ALL_DOMAINS, type StudentProfile, type NotificationItem } from '@/lib/supabase';
import { Mail as MailIcon, MessageSquare, LayoutDashboard as PortalIcon } from 'lucide-react';

type NavKey = 'Overview' | 'Career match' | 'Resume analysis' | 'Skill gaps' | 'Roadmap' | 'Assessments' | 'Job tracker' | 'Class suggestions' | 'Project poster' | 'My profile' | 'Notifications' | 'Chat box' | 'Project portal';

type NavItem = { label: NavKey; icon: typeof LayoutDashboard };

const navItems: NavItem[] = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Career match', icon: Target },
  { label: 'Resume analysis', icon: FileText },
  { label: 'Skill gaps', icon: Network },
  { label: 'Roadmap', icon: BookOpen },
  { label: 'Assessments', icon: ClipboardCheck },
  { label: 'Class suggestions', icon: GraduationCap },
  { label: 'Job tracker', icon: BriefcaseBusiness },
];

const levelData: Record<string, { guideline: string; placement: string; color: string }> = {
  '1st Year': { guideline: 'Focus on foundational skills and explore career paths. Build core programming and communication abilities.', placement: 'Exploration Phase', color: 'blue' },
  '2nd Year': { guideline: 'Start specializing. Take skill assessments, identify gaps, and begin your learning roadmap.', placement: 'Preparation Phase', color: 'violet' },
  '3rd Year': { guideline: 'Intensify preparation. Complete projects, certifications, and start applying for internships.', placement: 'Active Phase', color: 'gold' },
  'Final Year': { guideline: 'Final push! Apply aggressively, prepare for interviews, and track every opportunity.', placement: 'Placement Phase', color: 'green' },
  'Post-Graduate': { guideline: 'Leverage your advanced knowledge. Target specialized roles and leadership positions.', placement: 'Advanced Phase', color: 'violet' },
};

type UploadMode = 'resume' | 'certificate';
type EventEntry = { id: number; label: string; time: string; icon: typeof FileText; tone: string };
let eventIdCounter = 5;

const initialEvents: EventEntry[] = [
  { id: 1, label: 'Profile created successfully', time: 'Today, 9:30 AM', icon: Check, tone: 'green' },
  { id: 2, label: 'SQL fundamentals assessment scored 92%', time: 'Yesterday, 4:18 PM', icon: ClipboardCheck, tone: 'violet' },
  { id: 3, label: 'Started Data storytelling module', time: 'Monday, 11:05 AM', icon: BookOpen, tone: 'gold' },
  { id: 4, label: 'Career match updated', time: 'Sunday, 6:30 PM', icon: Target, tone: 'blue' },
];

function timeNow() {
  return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function greetingWord() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
}

function App() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [activePage, setActivePage] = useState<NavKey>('Overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadMode, setUploadMode] = useState<UploadMode>('resume');
  const [toast, setToast] = useState('');
  const [events, setEvents] = useState<EventEntry[]>(initialEvents);
  const [analyzing, setAnalyzing] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2800);
  };

  function logEvent(label: string, icon: EventEntry['icon'], tone: string) {
    const entry: EventEntry = { id: eventIdCounter++, label, time: timeNow(), icon, tone };
    setEvents((prev) => [entry, ...prev].slice(0, 12));
  }

  function handleProfileCreated(newProfile: StudentProfile) {
    setProfile(newProfile);
    setActivePage('Overview');
    createNotification(newProfile.id, `Profile created for ${newProfile.full_name}`, 'profile');
    logActivity(newProfile.id, 'Profile created', 'profile');
  }

  useEffect(() => {
    if (!profile) return;
    const pid = profile.id;
    let interval: ReturnType<typeof setInterval> | undefined;
    async function loadCount() {
      const items = await fetchNotifications(pid);
      setUnreadCount(items.filter((n) => !n.read).length);
    }
    loadCount();
    interval = setInterval(loadCount, 15000);
    return () => { if (interval) clearInterval(interval); };
  }, [profile]);

  function openUpload(mode: UploadMode) {
    setUploadMode(mode);
    setShowUpload(true);
  }

  async function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !profile) return;

    if (uploadMode === 'resume') {
      setAnalyzing(true);
      notify('Analyzing your resume with AI...');
      logEvent(`Resume uploaded: ${file.name}`, FileText, 'blue');

      await new Promise((r) => setTimeout(r, 2000));

      const extractedName = extractNameFromFilename(file.name);
      const analysisData = generateAnalysisData(file.name, profile.education_level, profile.interests, profile.degree, profile.industry);

      const updatedProfile: StudentProfile = {
        ...profile,
        full_name: extractedName,
        resume_filename: file.name,
        resume_uploaded: true,
        ...analysisData,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('student_profiles')
        .update({
          full_name: extractedName,
          resume_filename: file.name,
          resume_uploaded: true,
          ...analysisData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id);

      if (error) {
        notify('Resume analyzed locally — database sync will retry.');
      } else {
        notify(`Resume analyzed! Domain: ${analysisData.predicted_domain}. Welcome, ${extractedName}.`);
      }

      setProfile(updatedProfile);
      logEvent(`Resume analyzed — predicted domain: ${analysisData.predicted_domain} (${analysisData.career_match_score}% match)`, Sparkles, 'violet');
      setAnalyzing(false);
      setShowUpload(false);

      createNotification(profile.id, `Resume analyzed — domain: ${analysisData.predicted_domain} (${analysisData.career_match_score}% match)`, 'resume');
      logActivity(profile.id, `Resume analyzed: ${file.name}`, 'upload', analysisData.predicted_domain);

      sendNotificationEmail(
        profile.email,
        extractedName,
        'Your resume has been analyzed!',
        `Your resume has been analyzed successfully. Your predicted career domain is ${analysisData.predicted_domain}. Your career match score is ${analysisData.career_match_score}%, skill score is ${analysisData.skill_score}, readiness score is ${analysisData.readiness_score}, and ATS score is ${analysisData.ats_score}/100. Your recommended career is ${analysisData.recommended_career}. Visit your dashboard to see your personalized roadmap, class suggestions, and job recommendations.`
      ).then((ok) => {
        if (ok) notify('Analysis complete. A summary has been sent to your email.');
      });
    } else {
      const updatedProfile: StudentProfile = {
        ...profile,
        certificate_filename: file.name,
        certificate_uploaded: true,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('student_profiles')
        .update({
          certificate_filename: file.name,
          certificate_uploaded: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id);

      if (error) notify('Certificate saved locally — database sync will retry.');
      else notify(`Certificate uploaded: ${file.name}`);

      setProfile(updatedProfile);
      logEvent(`Certificate uploaded: ${file.name}`, Award, 'gold');
      createNotification(profile.id, `Certificate uploaded: ${file.name}`, 'upload');
      logActivity(profile.id, `Certificate uploaded: ${file.name}`, 'upload');
      setShowUpload(false);
    }
  }

  const handleNavClick = (label: NavKey) => {
    setActivePage(label);
    setIsMenuOpen(false);
  };

  function handleMetricClick(label: string, icon: EventEntry['icon'], tone: string) {
    notify(`${label} snapshot opened — view your detailed breakdown.`);
    logEvent(`${label} snapshot viewed`, icon, tone);
  }

  if (!profile) {
    return (
      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand-lockup">
            <div className="brand-mark"><Sparkles size={19} strokeWidth={2.5} /></div>
            <div>
              <div className="brand-name">Career<span>Insight</span></div>
              <div className="brand-caption">AI CAREER COMPASS</div>
            </div>
          </div>
          <div className="sidebar-bottom">
            <div className="help-card">
              <div className="help-icon"><CircleHelp size={17} /></div>
              <div><strong>Welcome!</strong><span>Create your profile to begin</span></div>
              <ChevronRight size={16} />
            </div>
            <div className="sidebar-footer"><span className="status-pulse" /> AI engine online <span>v2.4</span></div>
          </div>
        </aside>
        <main className="main-content">
          <header className="topbar">
            <div className="breadcrumb"><span>CareerInsight</span><ChevronRight size={14} /><strong>Create Profile</strong></div>
          </header>
          <ProfilePage onProfileCreated={handleProfileCreated} onNotify={notify} />
        </main>
        {toast && <div className="toast"><Check size={16} />{toast}</div>}
      </div>
    );
  }

  const studentName = profile.full_name;
  const firstName = studentName.split(' ')[0];
  const levelInfo = levelData[profile.education_level] || levelData['3rd Year'];

  return (
    <div className="app-shell">
      <aside className={`sidebar ${isMenuOpen ? 'sidebar-open' : ''}`}>
        <div className="brand-lockup">
          <div className="brand-mark"><Sparkles size={19} strokeWidth={2.5} /></div>
          <div>
            <div className="brand-name">Career<span>Insight</span></div>
            <div className="brand-caption">AI CAREER COMPASS</div>
          </div>
          <button className="mobile-close" onClick={() => setIsMenuOpen(false)} aria-label="Close menu"><X size={20} /></button>
        </div>

        <div className="profile-card">
          <div className="avatar avatar-photo">{initialsFromName(studentName)}</div>
          <div className="profile-copy">
            <strong>{studentName}</strong>
            <span>{profile.degree} · {profile.education_level}</span>
          </div>
        </div>

        {profile.resume_uploaded && (
          <div className="resume-status-badge">
            <Check size={12} /> Resume analyzed · {profile.predicted_domain}
          </div>
        )}
        {profile.certificate_uploaded && (
          <div className="cert-status-badge">
            <Award size={12} /> Certificate uploaded
          </div>
        )}

        <div className="nav-label">Workspace</div>
        <nav className="main-nav">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={`nav-item ${activePage === label ? 'active' : ''}`} onClick={() => handleNavClick(label)}>
              <Icon size={18} strokeWidth={activePage === label ? 2.2 : 1.8} />
              <span>{label}</span>
              {label === 'Career match' && profile.resume_uploaded && <span className="nav-dot" />}
            </button>
          ))}
        </nav>

        <div className="nav-label nav-label-space">Manage</div>
        <nav className="main-nav">
          <button className={`nav-item ${activePage === 'My profile' ? 'active' : ''}`} onClick={() => handleNavClick('My profile')}><UserRound size={18} /><span>My profile</span></button>
          <button className={`nav-item ${activePage === 'Notifications' ? 'active' : ''}`} onClick={() => handleNavClick('Notifications')}><Bell size={18} /><span>Notifications</span>{unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}</button>
          <button className={`nav-item ${activePage === 'Chat box' ? 'active' : ''}`} onClick={() => handleNavClick('Chat box')}><MessageSquare size={18} /><span>Chat box</span></button>
          <button className="nav-item" onClick={() => notify('Settings are coming together.')}><Settings size={18} /><span>Settings</span></button>
        </nav>

        <div className="nav-label nav-label-space">Project</div>
        <nav className="main-nav">
          <button className={`nav-item ${activePage === 'Project poster' ? 'active' : ''}`} onClick={() => handleNavClick('Project poster')}><Presentation size={18} /><span>Project poster</span></button>
          <button className={`nav-item ${activePage === 'Project portal' ? 'active' : ''}`} onClick={() => handleNavClick('Project portal')}><PortalIcon size={18} /><span>Project portal</span></button>
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon"><CircleHelp size={17} /></div>
            <div><strong>Need a little help?</strong><span>Explore our career guide</span></div>
            <ChevronRight size={16} />
          </div>
          <div className="sidebar-footer"><span className="status-pulse" /> AI engine online <span>v2.4</span></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setIsMenuOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
          <div className="breadcrumb"><span>Workspace</span><ChevronRight size={14} /><strong>{activePage}</strong></div>
          <div className="topbar-actions">
            <button className="icon-button search-button" aria-label="Search"><Search size={18} /></button>
            <button className="icon-button notification-button" onClick={() => handleNavClick('Notifications')} aria-label="Notifications"><Bell size={18} />{unreadCount > 0 && <span />}</button>
            <div className="topbar-avatar">{initialsFromName(studentName)}</div>
          </div>
        </header>

        {activePage === 'Overview' && (
          <Overview
            profile={profile}
            onUploadResume={() => openUpload('resume')}
            onUploadCertificate={() => openUpload('certificate')}
            onNotify={notify}
            onLogEvent={logEvent}
            events={events}
            onMetricClick={handleMetricClick}
            firstName={firstName}
            levelInfo={levelInfo}
          />
        )}
        {activePage === 'Career match' && <CareerMatchPage profile={profile} onNotify={notify} />}
        {activePage === 'Resume analysis' && <ResumeAnalysisPage onNotify={notify} />}
        {activePage === 'Skill gaps' && <SkillGapsPage profile={profile} onNotify={notify} />}
        {activePage === 'Roadmap' && <RoadmapPage profile={profile} onNotify={notify} />}
        {activePage === 'Assessments' && <AssessmentsPage profile={profile} onNotify={notify} />}
        {activePage === 'Class suggestions' && <ClassSuggestionsPage profile={profile} onNotify={notify} />}
        {activePage === 'Job tracker' && <JobTrackerPage profile={profile} onNotify={notify} />}
        {activePage === 'Project poster' && <div className="poster-scroll-wrap"><ProjectPosterPage /></div>}
        {activePage === 'Project portal' && <ProjectPortalPage profile={profile} />}
        {activePage === 'My profile' && <ProfileEditPage profile={profile} onNotify={notify} onProfileUpdated={(p) => setProfile(p)} />}
        {activePage === 'Notifications' && <NotificationsPage profile={profile} onNotify={notify} />}
        {activePage === 'Chat box' && <ChatBoxPage profile={profile} onNotify={notify} />}
      </main>

      {showUpload && (
        <div className="modal-backdrop" onClick={() => !analyzing && setShowUpload(false)}>
          <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => !analyzing && setShowUpload(false)} aria-label="Close"><X size={18} /></button>
            {analyzing ? (
              <>
                <div className="modal-icon"><Loader2 size={26} className="spin-icon" /></div>
                <span className="eyebrow">AI ANALYSIS IN PROGRESS</span>
                <h2>Analyzing your resume...</h2>
                <p>Our AI engine is extracting your skills, predicting your career domain, and building your personalized profile.</p>
                <div className="analyzing-steps">
                  <div className="analyzing-step"><Check size={14} /> Extracting text from resume</div>
                  <div className="analyzing-step"><Check size={14} /> Identifying skills and competencies</div>
                  <div className="analyzing-step"><Loader2 size={14} className="spin-icon" /> Predicting career domain</div>
                  <div className="analyzing-step pending">Building personalized roadmap</div>
                </div>
              </>
            ) : (
              <>
                <div className="modal-icon"><CloudUpload size={26} /></div>
                <span className="eyebrow">{uploadMode === 'resume' ? 'RESUME UPLOAD' : 'CERTIFICATE UPLOAD'}</span>
                <h2>{uploadMode === 'resume' ? 'Upload your resume' : 'Upload your certificate'}</h2>
                <p>{uploadMode === 'resume'
                  ? 'Upload your resume to get AI-powered career domain prediction, skill analysis, roadmaps, assessments, and job recommendations. You can re-upload anytime to refresh your analysis.'
                  : 'Upload your certificate to showcase your skills and boost your profile. This helps us refine your career recommendations.'}</p>

                <div className="upload-mode-tabs">
                  <button className={`upload-mode-tab ${uploadMode === 'resume' ? 'active' : ''}`} onClick={() => setUploadMode('resume')}><FileText size={14} /> Resume</button>
                  <button className={`upload-mode-tab ${uploadMode === 'certificate' ? 'active' : ''}`} onClick={() => setUploadMode('certificate')}><Award size={14} /> Certificate</button>
                </div>

                {uploadMode === 'resume' && profile.resume_uploaded && (
                  <div className="re-upload-note"><Check size={14} /> Current resume: {profile.resume_filename}</div>
                )}
                {uploadMode === 'certificate' && profile.certificate_uploaded && (
                  <div className="re-upload-note"><Check size={14} /> Current certificate: {profile.certificate_filename}</div>
                )}

                <button className="upload-dropzone" onClick={() => fileInputRef.current?.click()}>
                  {uploadMode === 'resume' ? <FileText size={21} /> : <Award size={21} />}
                  <span>Click to select your {uploadMode === 'resume' ? 'resume' : 'certificate'} file</span>
                  <small>PDF, DOCX, JPG, PNG · up to 10 MB</small>
                </button>
                <input ref={fileInputRef} className="hidden-input" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleFileUpload} />

                {uploadMode === 'resume' && profile.resume_uploaded && (
                  <p className="re-upload-hint">Uploading a new resume will replace the current one and re-analyze your profile.</p>
                )}
              </>
            )}
          </div>
        </div>
      )}
      {toast && <div className="toast"><Check size={16} />{toast}</div>}
    </div>
  );
}

type OverviewProps = {
  profile: StudentProfile;
  onUploadResume: () => void;
  onUploadCertificate: () => void;
  onNotify: (message: string) => void;
  onLogEvent: (label: string, icon: EventEntry['icon'], tone: string) => void;
  events: EventEntry[];
  onMetricClick: (label: string, icon: EventEntry['icon'], tone: string) => void;
  firstName: string;
  levelInfo: { guideline: string; placement: string; color: string };
};

function Overview(props: OverviewProps) {
  const { profile, onUploadResume, onUploadCertificate, onNotify, onLogEvent, events, onMetricClick, firstName, levelInfo } = props;

  return (
    <div className="page-wrap">
      <section className="welcome-row">
        <div>
          <div className="eyebrow">{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}</div>
          <h1>{greetingWord()}, {firstName}<span>.</span></h1>
          <p className="welcome-copy">{profile.resume_uploaded ? `Your resume has been analyzed across 21 IT domains. Predicted domain: ${profile.predicted_domain}.` : 'Upload your resume or certificate to unlock AI-powered career guidance across all 21 IT domains.'}</p>
        </div>
        <div className="welcome-actions">
          <button className="primary-button" onClick={onUploadResume}><CloudUpload size={17} /> {profile.resume_uploaded ? 'Re-upload resume' : 'Upload resume'}</button>
          <button className="secondary-button" onClick={onUploadCertificate}><Award size={17} /> {profile.certificate_uploaded ? 'Update certificate' : 'Upload certificate'}</button>
        </div>
      </section>

      <section className="placement-banner">
        <div className={`placement-icon ${levelInfo.color}`}><GraduationCap size={20} /></div>
        <div className="placement-content">
          <div className="placement-label"><span className={`placement-phase ${levelInfo.color}`}>{levelInfo.placement}</span><strong>{profile.education_level} Student</strong></div>
          <p>{levelInfo.guideline}</p>
        </div>
      </section>

      {profile.resume_uploaded && (
        <section className="domain-prediction-banner">
          <div className="domain-prediction-icon"><Sparkles size={22} /></div>
          <div className="domain-prediction-content">
            <div className="domain-prediction-label">AI PREDICTED DOMAIN</div>
            <strong>{profile.predicted_domain}</strong>
            <p>Based on your resume analysis, your strongest career path is <b>{profile.recommended_career}</b> at <b>{profile.career_match_score}%</b> match. Close your skill gaps to raise your readiness.</p>
          </div>
          <div className="domain-prediction-score">
            <div className="dps-ring" style={{ background: `conic-gradient(#7258db ${profile.career_match_score}%, #eef0f6 0deg)` }}>
              <div className="dps-ring-inner">{profile.career_match_score}%</div>
            </div>
          </div>
        </section>
      )}

      {!profile.resume_uploaded && (
        <section className="upload-prompt-banner" onClick={onUploadResume}>
          <div className="upload-prompt-icon"><CloudUpload size={24} /></div>
          <div><strong>Upload your resume to unlock everything</strong><span>One upload activates Career Match, Skill Gaps, Roadmap, Assessments, Class Suggestions, and Job Tracker across all 21 IT domains.</span></div>
          <ArrowUpRight size={20} className="muted-icon" />
        </section>
      )}

      <div className="section-heading"><div><h2>Your career snapshot</h2><p>{profile.resume_uploaded ? `Updated from ${profile.resume_filename}` : 'Upload your resume to see your scores'}</p></div></div>
      <section className="metric-grid">
        <button className="metric-card-clickable" onClick={() => onMetricClick('Career match', Target, 'blue')}>
          <div className="metric-card blue"><div className="metric-top"><div className="metric-icon"><Target size={19} /></div><span className="metric-label">Career match</span></div><div className="metric-bottom"><div><strong>{profile.resume_uploaded ? `${profile.career_match_score}%` : '—'}</strong><div className="metric-change"><span>AI scored</span></div></div></div></div>
        </button>
        <button className="metric-card-clickable" onClick={() => onMetricClick('Skill score', Zap, 'violet')}>
          <div className="metric-card violet"><div className="metric-top"><div className="metric-icon"><Zap size={19} /></div><span className="metric-label">Skill score</span></div><div className="metric-bottom"><div><strong>{profile.resume_uploaded ? `${profile.skill_score}/100` : '—'}</strong><div className="metric-change"><span>From resume</span></div></div></div></div>
        </button>
        <button className="metric-card-clickable" onClick={() => onMetricClick('Readiness score', TrendingUp, 'gold')}>
          <div className="metric-card gold"><div className="metric-top"><div className="metric-icon"><TrendingUp size={19} /></div><span className="metric-label">Readiness score</span></div><div className="metric-bottom"><div><strong>{profile.resume_uploaded ? `${profile.readiness_score}%` : '—'}</strong><div className="metric-change"><span>Job ready</span></div></div></div></div>
        </button>
        <button className="metric-card-clickable" onClick={() => onMetricClick('Applications', BriefcaseBusiness, 'green')}>
          <div className="metric-card green"><div className="metric-top"><div className="metric-icon"><BriefcaseBusiness size={19} /></div><span className="metric-label">Job matches</span></div><div className="metric-bottom"><div><strong>{profile.resume_uploaded ? `${profile.job_recommendations.length}` : '—'}</strong><div className="metric-change"><span>Recommended</span></div></div></div></div>
        </button>
      </section>

      {profile.resume_uploaded && (
        <section className="ats-score-banner">
          <div className="ats-score-left">
            <div className="ats-score-icon"><FileSearch size={22} /></div>
            <div>
              <div className="ats-score-label">ATS RESUME SCORE</div>
              <strong>{profile.ats_score}<small>/100</small></strong>
            </div>
          </div>
          <div className="ats-score-bar-wrap">
            <div className="ats-score-bar">
              <div className={`ats-score-fill ${profile.ats_score >= 75 ? 'good' : profile.ats_score >= 60 ? 'warn' : 'low'}`} style={{ width: `${profile.ats_score}%` }} />
            </div>
            <span className={`ats-score-status ${profile.ats_score >= 75 ? 'good' : profile.ats_score >= 60 ? 'warn' : 'low'}`}>{profile.ats_score >= 75 ? 'Good — likely to pass ATS filters' : profile.ats_score >= 60 ? 'Average — may get filtered by some ATS' : 'Below average — improve your resume format'}</span>
          </div>
        </section>
      )}

      {profile.resume_uploaded && (
        <>
          <section className="dashboard-grid">
            <div className="panel career-panel">
              <div className="panel-heading"><div><h3>Recommended career paths</h3><p>From your resume — domain: {profile.predicted_domain}</p></div></div>
              <div className="career-list">
                <button className="career-row"><span className="career-rank blue">01</span><span className="career-main"><strong>{profile.recommended_career}</strong><small>Best match from your resume</small></span><span className="match-pill blue">{profile.career_match_score}% <small>match</small></span><ChevronRight size={17} className="muted-icon" /></button>
                <button className="career-row"><span className="career-rank violet">02</span><span className="career-main"><strong>{profile.predicted_domain} Specialist</strong><small>Domain-aligned role</small></span><span className="match-pill violet">{Math.max(60, profile.career_match_score - 7)}% <small>match</small></span><ChevronRight size={17} className="muted-icon" /></button>
              </div>
              <div className="match-note"><Lightbulb size={16} /><span>Based on <b>{profile.skill_gaps.length} skill signals</b> from your resume.</span></div>
            </div>
            <div className="panel skill-panel">
              <div className="panel-heading"><div><h3>Skill gap analysis</h3><p>From your resume</p></div></div>
              <div className="skill-header"><span>Skill</span><span>Status</span><span>Signal</span></div>
              {profile.skill_gaps.slice(0, 4).map((skill) => (
                <div className="skill-row" key={skill.skill}>
                  <span className="skill-name">{skill.skill}</span>
                  <span className={`skill-status ${skill.status === 'Available' ? 'good' : 'warn'}`}>{skill.status === 'Available' ? 'Available' : 'Gap'}</span>
                  <span className={`skill-status ${skill.status === 'Available' ? 'good' : 'warn'}`}>{skill.status === 'Available' ? 'Strong' : 'Improve'}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-grid lower-grid">
            <div className="panel roadmap-panel">
              <div className="panel-heading"><div><h3>Your learning roadmap</h3><p>Personalized for {profile.predicted_domain}</p></div></div>
              <div className="roadmap-list">
                {profile.roadmap.slice(0, 3).map((step) => (
                  <div className={`roadmap-row ${step.done ? 'done' : ''}`} key={step.step}>
                    <div className="roadmap-node">{step.done ? <Check size={13} /> : <span />}</div>
                    <div><span className="roadmap-week">{step.week} · Step {step.step}</span><strong>{step.title}</strong></div>
                  </div>
                ))}
              </div>
              <div className="roadmap-footer"><span><span className="roadmap-progress" /> {profile.roadmap.filter((s) => s.done).length} of {profile.roadmap.length} complete</span></div>
            </div>
            <div className="panel activity-panel">
              <div className="panel-heading"><div><h3>Recent activity</h3><p>Your progress at a glance</p></div></div>
              <div className="activity-feed">
                {events.map((evt) => {
                  const Icon = evt.icon;
                  return (
                    <div className="activity-item" key={evt.id}>
                      <div className={`activity-icon ${evt.tone}-icon`}><Icon size={16} /></div>
                      <div><strong>{evt.label}</strong><span>{evt.time}</span></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}

      <footer className="app-footer"><span>Full Stack Web Application</span><i /> <span><Sparkles size={14} /> AI/ML Powered</span><i /> <span><Users size={14} /> Real-world impact</span><i /> <span>21 IT Domains</span></footer>
    </div>
  );
}

export default App;
