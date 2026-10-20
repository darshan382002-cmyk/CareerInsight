import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  CloudUpload,
  FileText,
  GraduationCap,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Sparkles,
  Target,
  User,
} from 'lucide-react';
import { supabase, generateAnalysisData, sendNotificationEmail, ALL_DOMAINS, ALL_INDUSTRIES, INDUSTRY_DOMAIN_MAP, createNotification, logActivity, type StudentProfile } from '@/lib/supabase';

type Props = {
  onProfileCreated: (profile: StudentProfile) => void;
  onNotify: (msg: string) => void;
};

const educationLevels = ['1st Year', '2nd Year', '3rd Year', 'Final Year', 'Post-Graduate'];

const ALL_DEGREES = [
  'B.Tech — Computer Science',
  'B.Tech — Information Technology',
  'B.Tech — Electronics & Communication',
  'B.Tech — Electrical Engineering',
  'B.Tech — Mechanical Engineering',
  'B.Tech — Civil Engineering',
  'B.Tech — Chemical Engineering',
  'B.Tech — Aerospace Engineering',
  'B.Tech — Biotechnology',
  'B.Tech — Artificial Intelligence',
  'B.Tech — Data Science',
  'B.Tech — Cybersecurity',
  'B.Tech — Cloud Computing',
  'B.Tech — Internet of Things (IoT)',
  'B.E. — Computer Engineering',
  'B.E. — Information Science',
  'B.E. — Electronics Engineering',
  'B.E. — Telecommunication',
  'B.Sc — Computer Science',
  'B.Sc — Information Technology',
  'B.Sc — Data Science',
  'B.Sc — Mathematics',
  'B.Sc — Statistics',
  'B.Sc — Physics',
  'B.Sc — Electronics',
  'BCA — Computer Applications',
  'BBA — Business Administration',
  'B.Com — Commerce',
  'B.A. — Economics',
  'B.A. — English',
  'M.Tech — Computer Science',
  'M.Tech — Data Science',
  'M.Tech — Artificial Intelligence',
  'M.Tech — Software Engineering',
  'M.Tech — Cybersecurity',
  'MCA — Computer Applications',
  'M.Sc — Computer Science',
  'M.Sc — Data Science',
  'M.Sc — Statistics',
  'MBA — Human Resources',
  'MBA — Finance',
  'MBA — Marketing',
  'MBA — Operations',
  'MBA — Business Analytics',
  'Diploma — Computer Engineering',
  'Diploma — Information Technology',
  'Diploma — Electronics',
  'Diploma — Mechanical',
  'Other',
] as const;

export default function ProfilePage({ onProfileCreated, onNotify }: Props) {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    education_level: '3rd Year',
    degree: 'Computer Science',
    university: '',
    interests: '',
    industry: 'IT / Software',
  });
  const [domainOptions, setDomainOptions] = useState<string[]>(ALL_DOMAINS as unknown as string[]);

  useEffect(() => {
    const industryDomains = INDUSTRY_DOMAIN_MAP[form.industry];
    if (industryDomains) {
      setDomainOptions(industryDomains);
      if (form.interests && !industryDomains.includes(form.interests)) {
        setForm((prev) => ({ ...prev, interests: '' }));
      }
    } else {
      setDomainOptions(ALL_DOMAINS as unknown as string[]);
    }
  }, [form.industry]);
  const [loading, setLoading] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.full_name || !form.email) {
      onNotify('Please enter your name and email to continue.');
      return;
    }
    setLoading(true);

    const analysisData = generateAnalysisData(form.full_name + '_Resume.pdf', form.education_level, form.interests, form.degree, form.industry);

    const { data, error } = await supabase
      .from('student_profiles')
      .insert({
        email: form.email,
        full_name: form.full_name,
        phone: form.phone,
        education_level: form.education_level,
        degree: form.degree,
        university: form.university,
        interests: form.interests,
        industry: form.industry,
        resume_filename: '',
        resume_uploaded: false,
        certificate_filename: '',
        certificate_uploaded: false,
        ...analysisData,
      })
      .select()
      .single();

    if (error) {
      onNotify('Could not save profile to database. Using local session.');
      const localProfile: StudentProfile = {
        id: 'local-' + Date.now(),
        email: form.email,
        full_name: form.full_name,
        phone: form.phone,
        education_level: form.education_level,
        degree: form.degree,
        university: form.university,
        interests: form.interests,
        industry: form.industry,
        learning_started: [],
        assessment_scores: [],
        job_statuses: [],
        resume_filename: '',
        resume_uploaded: false,
        certificate_filename: '',
        certificate_uploaded: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...analysisData,
      } as StudentProfile;
      onProfileCreated(localProfile);
    } else {
      const profile = { ...(data as StudentProfile), learning_started: [], assessment_scores: [], job_statuses: [] } as StudentProfile;
      onProfileCreated(profile);
      onNotify(`Welcome, ${form.full_name}! Your profile is ready.`);
      createNotification(profile.id, `Profile created for ${form.full_name}`, 'profile');
      logActivity(profile.id, 'Profile created', 'profile');
      sendNotificationEmail(form.email, form.full_name, 'Welcome to CareerInsight!', `Your profile has been created successfully in the ${form.industry} industry. Upload your resume or certificate to unlock personalized career guidance, skill analysis, learning roadmaps, and class suggestions.`).then((ok) => {
        if (ok) onNotify('Profile created. A welcome email has been sent to your inbox.');
      });
    }
    setLoading(false);
  }

  return (
    <div className="profile-page-wrap">
      <div className="profile-card-hero">
        <div className="profile-hero-icon"><Sparkles size={28} /></div>
        <h1>Create your CareerInsight profile<span>.</span></h1>
        <p>Fill in your details to get started. Then upload your resume or certificate to unlock AI-powered career guidance across IT, Pharmaceutical, Biotech, Healthcare, Finance, and more industries, with skill analysis, class suggestions, and personalized roadmaps.</p>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label><User size={14} /> Full Name <span className="req">*</span></label>
            <input type="text" value={form.full_name} onChange={(e) => update('full_name', e.target.value)} placeholder="e.g. Ananya Sharma" required />
          </div>
          <div className="form-group">
            <label><Mail size={14} /> Email <span className="req">*</span></label>
            <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="e.g. ananya@university.edu" required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label><Phone size={14} /> Phone</label>
            <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="e.g. +91 98765 43210" />
          </div>
          <div className="form-group">
            <label><GraduationCap size={14} /> Education Level</label>
            <select value={form.education_level} onChange={(e) => update('education_level', e.target.value)}>
              {educationLevels.map((lvl) => <option key={lvl} value={lvl}>{lvl}</option>)}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label><FileText size={14} /> Degree</label>
            <select value={form.degree} onChange={(e) => update('degree', e.target.value)}>
              {ALL_DEGREES.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label><GraduationCap size={14} /> University / College</label>
            <input type="text" value={form.university} onChange={(e) => update('university', e.target.value)} placeholder="e.g. Delhi University" />
          </div>
        </div>

        <div className="form-group">
          <label><Target size={14} /> Industry</label>
          <select value={form.industry} onChange={(e) => update('industry', e.target.value)}>
            {ALL_INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label><Target size={14} /> Career Interest Domain</label>
          <select value={form.interests} onChange={(e) => update('interests', e.target.value)}>
            <option value="">Select a domain (optional — AI will predict from resume)</option>
            {domainOptions.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <button className="primary-button profile-submit" type="submit" disabled={loading}>
          {loading ? <><Loader2 size={17} className="spin-icon" /> Creating profile...</> : <>Create profile <ArrowRight size={17} /></>}
        </button>
      </form>

      <div className="profile-info-strip">
        <div className="info-item"><CloudUpload size={18} /><span>Upload resume or certificate</span></div>
        <div className="info-item"><Sparkles size={18} /><span>AI predicts your domain</span></div>
        <div className="info-item"><Check size={18} /><span>Get personalized guidance</span></div>
        <div className="info-item"><MessageSquare size={18} /><span>Chat box to admin</span></div>
      </div>
    </div>
  );
}
