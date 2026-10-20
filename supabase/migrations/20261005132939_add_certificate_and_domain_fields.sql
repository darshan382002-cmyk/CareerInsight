/*
# Add certificate and domain fields to student_profiles

1. Modified Tables
- `student_profiles`
  - Added `certificate_filename` (text, default '') — name of uploaded certificate file
  - Added `certificate_uploaded` (boolean, default false) — whether certificate has been uploaded
  - Added `predicted_domain` (text, default '') — AI-predicted career domain from resume
  - Added `class_suggestions` (jsonb, default '[]') — recommended classes/courses for the student's domain

2. Security
- No security changes. Existing RLS policies remain in place.
*/

ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS certificate_filename text NOT NULL DEFAULT '';
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS certificate_uploaded boolean NOT NULL DEFAULT false;
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS predicted_domain text NOT NULL DEFAULT '';
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS class_suggestions jsonb NOT NULL DEFAULT '[]'::jsonb;
