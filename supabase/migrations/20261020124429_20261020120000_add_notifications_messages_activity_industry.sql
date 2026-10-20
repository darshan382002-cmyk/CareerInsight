/*
# Add notifications, messages, activity_log tables + industry column + extra fields

1. Modified Tables
- `student_profiles`
  - Added `industry` (text, default 'IT') — the industry sector (IT, Pharma, Biotech, Finance, Healthcare, Manufacturing, etc.)
  - Added `learning_started` (jsonb, default '[]') — array of class IDs the student has started learning
  - Added `assessment_scores` (jsonb, default '[]') — array of {id, score} for completed assessments
  - Added `job_statuses` (jsonb, default '[]') — array of {id, status} for job application statuses

2. New Tables
- `notifications`
  - `id` (uuid, primary key)
  - `profile_id` (uuid, references student_profiles)
  - `message` (text, notification content)
  - `type` (text, e.g. 'profile', 'resume', 'assessment', 'job', 'class', 'message')
  - `read` (boolean, default false)
  - `created_at` (timestamptz, default now())
- `messages`
  - `id` (uuid, primary key)
  - `profile_id` (uuid, references student_profiles)
  - `student_name` (text)
  - `student_email` (text)
  - `subject` (text)
  - `body` (text, the message/chat content)
  - `admin_email` (text, the email to deliver to, default 'darshan382002@gmail.com')
  - `sent` (boolean, whether email was sent)
  - `created_at` (timestamptz, default now())
- `activity_log`
  - `id` (uuid, primary key)
  - `profile_id` (uuid, references student_profiles)
  - `action` (text, what the student did)
  - `category` (text, e.g. 'upload', 'assessment', 'job', 'class', 'message')
  - `detail` (text, additional context)
  - `created_at` (timestamptz, default now())

3. Security
- Enable RLS on all new tables.
- Single-tenant no-auth app: allow anon + authenticated full CRUD on all tables.
*/
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS industry text NOT NULL DEFAULT 'IT';
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS learning_started jsonb NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS assessment_scores jsonb NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS job_statuses jsonb NOT NULL DEFAULT '[]'::jsonb;

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES student_profiles(id) ON DELETE CASCADE,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'general',
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_notifications" ON notifications;
CREATE POLICY "anon_select_notifications" ON notifications FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_notifications" ON notifications;
CREATE POLICY "anon_insert_notifications" ON notifications FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_notifications" ON notifications;
CREATE POLICY "anon_update_notifications" ON notifications FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_notifications" ON notifications;
CREATE POLICY "anon_delete_notifications" ON notifications FOR DELETE TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES student_profiles(id) ON DELETE CASCADE,
  student_name text NOT NULL,
  student_email text NOT NULL,
  subject text NOT NULL DEFAULT '',
  body text NOT NULL,
  admin_email text NOT NULL DEFAULT 'darshan382002@gmail.com',
  sent boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_messages" ON messages;
CREATE POLICY "anon_select_messages" ON messages FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_messages" ON messages;
CREATE POLICY "anon_insert_messages" ON messages FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_messages" ON messages;
CREATE POLICY "anon_update_messages" ON messages FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_messages" ON messages;
CREATE POLICY "anon_delete_messages" ON messages FOR DELETE TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES student_profiles(id) ON DELETE CASCADE,
  action text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  detail text DEFAULT '',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_activity_log" ON activity_log;
CREATE POLICY "anon_select_activity_log" ON activity_log FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_activity_log" ON activity_log;
CREATE POLICY "anon_insert_activity_log" ON activity_log FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_activity_log" ON activity_log;
CREATE POLICY "anon_update_activity_log" ON activity_log FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_activity_log" ON activity_log;
CREATE POLICY "anon_delete_activity_log" ON activity_log FOR DELETE TO anon, authenticated USING (true);
