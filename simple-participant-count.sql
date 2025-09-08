-- UNIQUE PARTICIPANT COUNT QUERY (NO DUPLICATES)
-- Copy and paste this directly into Supabase SQL Editor
-- This counts each unique email address only once across all sources

WITH all_participant_emails AS (
  -- Get all applicant emails (main applications)
  SELECT 
    LOWER(TRIM(email)) as clean_email,
    'applicant' as source_type,
    full_name,
    created_at
  FROM applicants
  WHERE email IS NOT NULL AND TRIM(email) != ''
  
  UNION ALL
  
  -- Get all team member emails from team_members arrays
  SELECT 
    LOWER(TRIM(UNNEST(
      array_remove(array_remove(team_members, ''), NULL)
    ))) as clean_email,
    'team_member' as source_type,
    'Team member of: ' || full_name as full_name,
    created_at
  FROM applicants 
  WHERE team_members IS NOT NULL 
    AND array_length(array_remove(array_remove(team_members, ''), NULL), 1) > 0
),
unique_participants AS (
  SELECT DISTINCT clean_email
  FROM all_participant_emails
  WHERE clean_email IS NOT NULL AND clean_email != ''
)
SELECT 
  -- Total unique participants (no duplicates)
  COUNT(*) as total_unique_participants,
  
  -- Additional statistics
  (SELECT COUNT(*) FROM applicants) as total_applications,
  (SELECT SUM(
    CASE 
      WHEN team_members IS NOT NULL THEN 
        array_length(array_remove(array_remove(team_members, ''), NULL), 1)
      ELSE 0 
    END
  ) FROM applicants) as total_team_member_emails,
  
  -- Show the difference (how many duplicates were removed)
  (SELECT COUNT(*) FROM applicants) + 
  (SELECT SUM(
    CASE 
      WHEN team_members IS NOT NULL THEN 
        array_length(array_remove(array_remove(team_members, ''), NULL), 1)
      ELSE 0 
    END
  ) FROM applicants) - COUNT(*) as duplicates_removed

FROM unique_participants;
