-- Migration script to update the applicants table to match the new form structure
-- Run this in your Supabase SQL Editor

-- Step 1: Drop the old view first (since it references the table)
DROP VIEW IF EXISTS application_stats;

-- Step 2: Drop the university index 
DROP INDEX IF EXISTS idx_applicants_university;

-- Step 3: Remove the university column (this will delete all existing data in this column)
ALTER TABLE applicants DROP COLUMN IF EXISTS university;

-- Step 4: Make skills column nullable (allow NULL values)
ALTER TABLE applicants ALTER COLUMN skills DROP NOT NULL;

-- Step 4.5: Update existing 'no_preference' values to 'have_team'
UPDATE applicants SET team_preference = 'have_team' WHERE team_preference = 'no_preference';

-- Step 4.6: Update the team_preference constraint to use 'have_team' instead of 'no_preference'
ALTER TABLE applicants DROP CONSTRAINT IF EXISTS applicants_team_preference_check;
ALTER TABLE applicants ADD CONSTRAINT applicants_team_preference_check 
  CHECK (team_preference IN ('individual', 'team', 'have_team'));

-- Step 4.7: Add team_members column for team email addresses
ALTER TABLE applicants ADD COLUMN IF NOT EXISTS team_members TEXT[];

-- Step 4.8: Create index for team_members column
CREATE INDEX IF NOT EXISTS idx_applicants_team_members ON applicants USING GIN(team_members);

-- Step 5: Recreate the application_stats view with the updated structure
CREATE VIEW application_stats AS
SELECT 
  COUNT(*) as total_applications,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as applications_this_week,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as applications_this_month,
  COUNT(*) FILTER (WHERE track_selection = 'advanced') as advanced_track_applications,
  COUNT(*) FILTER (WHERE track_selection = 'beginner') as beginner_track_applications,
  COUNT(*) FILTER (WHERE team_preference = 'individual') as individual_preferences,
  COUNT(*) FILTER (WHERE team_preference = 'team') as team_preferences,
  COUNT(*) FILTER (WHERE team_preference = 'have_team') as have_team_preferences
FROM applicants;

-- Step 6: Grant permissions to the updated view
GRANT ALL ON application_stats TO anon, authenticated;

-- Verify the current schema
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'applicants' 
ORDER BY ordinal_position;
