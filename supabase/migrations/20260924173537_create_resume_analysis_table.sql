/*
# Create resume_analyses table for CareerInsight

1. New Tables
- `resume_analyses`
  - `id` (uuid, primary key)
  - `student_name` (text, name of the student)
  - `resume_filename` (text, name of the uploaded file)
  - `overall_score` (integer, 0-100 composite readiness score)
  - `communication` (integer, 0-100 skill score)
  - `aptitude` (integer, 0-100 skill score)
  - `confidence` (integer, 0-100 skill score)
  - `performance` (integer, 0-100 skill score)
  - `problem_solving` (integer, 0-100 skill score)
  - `presentation` (integer, 0-100 skill score)
  - `technical_skills` (integer, 0-100 skill score)
  - `recommended_career` (text, top career match)
  - `career_match_score` (integer, 0-100 match percentage)
  - `skill_gaps` (jsonb, array of identified skill gaps)
  - `strengths` (jsonb, array of identified strengths)
  - `roadmap` (jsonb, array of learning roadmap steps)
  - `created_at` (timestamptz, default now)

2. Security
- Enable RLS on `resume_analyses`.
- Single-tenant no-auth app: allow anon + authenticated full CRUD.
*/

CREATE TABLE IF NOT EXISTS resume_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL DEFAULT 'Ananya Sharma',
  resume_filename text NOT NULL DEFAULT 'resume.pdf',
  overall_score integer NOT NULL DEFAULT 0,
  communication integer NOT NULL DEFAULT 0,
  aptitude integer NOT NULL DEFAULT 0,
  confidence integer NOT NULL DEFAULT 0,
  performance integer NOT NULL DEFAULT 0,
  problem_solving integer NOT NULL DEFAULT 0,
  presentation integer NOT NULL DEFAULT 0,
  technical_skills integer NOT NULL DEFAULT 0,
  recommended_career text NOT NULL DEFAULT 'Data Analyst',
  career_match_score integer NOT NULL DEFAULT 0,
  skill_gaps jsonb NOT NULL DEFAULT '[]'::jsonb,
  strengths jsonb NOT NULL DEFAULT '[]'::jsonb,
  roadmap jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE resume_analyses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_resume_analyses" ON resume_analyses;
CREATE POLICY "anon_select_resume_analyses" ON resume_analyses FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_resume_analyses" ON resume_analyses;
CREATE POLICY "anon_insert_resume_analyses" ON resume_analyses FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_resume_analyses" ON resume_analyses;
CREATE POLICY "anon_update_resume_analyses" ON resume_analyses FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_resume_analyses" ON resume_analyses;
CREATE POLICY "anon_delete_resume_analyses" ON resume_analyses FOR DELETE
  TO anon, authenticated USING (true);
