/*
# Create student_profiles table for CareerInsight

1. New Tables
- `student_profiles`
  - `id` (uuid, primary key)
  - `email` (text, student's email for notifications)
  - `full_name` (text, student's full name)
  - `phone` (text, optional phone number)
  - `education_level` (text, e.g. 1st Year, 2nd Year, Final Year, Post-Graduate)
  - `degree` (text, e.g. Computer Science)
  - `university` (text, optional)
  - `interests` (text, career interests)
  - `resume_filename` (text, name of uploaded resume file)
  - `resume_uploaded` (boolean, whether resume has been uploaded)
  - `career_match_score` (integer, 0-100)
  - `skill_score` (integer, 0-100)
  - `readiness_score` (integer, 0-100)
  - `recommended_career` (text, top career match)
  - `skill_gaps` (jsonb, array of skill gap objects)
  - `strengths` (jsonb, array of strength strings)
  - `roadmap` (jsonb, array of roadmap step objects)
  - `assessments` (jsonb, array of assessment recommendations)
  - `job_recommendations` (jsonb, array of job recommendations)
  - `created_at` (timestamptz, default now)
  - `updated_at` (timestamptz, default now)

2. Security
- Enable RLS on `student_profiles`.
- Single-tenant no-auth app: allow anon + authenticated full CRUD.
*/

CREATE TABLE IF NOT EXISTS student_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  full_name text NOT NULL,
  phone text DEFAULT '',
  education_level text NOT NULL DEFAULT '3rd Year',
  degree text NOT NULL DEFAULT 'Computer Science',
  university text DEFAULT '',
  interests text DEFAULT '',
  resume_filename text DEFAULT '',
  resume_uploaded boolean NOT NULL DEFAULT false,
  career_match_score integer NOT NULL DEFAULT 0,
  skill_score integer NOT NULL DEFAULT 0,
  readiness_score integer NOT NULL DEFAULT 0,
  recommended_career text NOT NULL DEFAULT 'Data Analyst',
  skill_gaps jsonb NOT NULL DEFAULT '[]'::jsonb,
  strengths jsonb NOT NULL DEFAULT '[]'::jsonb,
  roadmap jsonb NOT NULL DEFAULT '[]'::jsonb,
  assessments jsonb NOT NULL DEFAULT '[]'::jsonb,
  job_recommendations jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_student_profiles" ON student_profiles;
CREATE POLICY "anon_select_student_profiles" ON student_profiles FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_student_profiles" ON student_profiles;
CREATE POLICY "anon_insert_student_profiles" ON student_profiles FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_student_profiles" ON student_profiles;
CREATE POLICY "anon_update_student_profiles" ON student_profiles FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_student_profiles" ON student_profiles;
CREATE POLICY "anon_delete_student_profiles" ON student_profiles FOR DELETE
  TO anon, authenticated USING (true);
