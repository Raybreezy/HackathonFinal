-- Detailed Participant Analysis Query
-- This provides comprehensive statistics about all participants including team member details

-- 1. SUMMARY STATISTICS
WITH clean_team_data AS (
  SELECT 
    id,
    full_name,
    email,
    team_preference,
    created_at,
    -- Clean team_members array by removing empty strings and nulls
    CASE 
      WHEN team_members IS NOT NULL THEN 
        array_remove(array_remove(team_members, ''), NULL)
      ELSE ARRAY[]::text[]
    END as clean_team_members
  FROM applicants
),
participant_stats AS (
  SELECT 
    *,
    array_length(clean_team_members, 1) as team_member_count,
    1 + COALESCE(array_length(clean_team_members, 1), 0) as total_team_size
  FROM clean_team_data
)

-- Main summary query
SELECT 
  '=== HACKATHON PARTICIPANT SUMMARY ===' as summary_title,
  
  -- Core counts
  COUNT(*) as total_applications,
  SUM(team_member_count) as total_additional_team_members,
  COUNT(*) + SUM(team_member_count) as total_participants,
  
  -- Breakdown by preference
  COUNT(*) FILTER (WHERE team_preference = 'individual') as individual_participants,
  COUNT(*) FILTER (WHERE team_preference = 'team') as seeking_team_participants,
  COUNT(*) FILTER (WHERE team_preference = 'have_team') as existing_team_leaders,
  
  -- Team statistics
  SUM(team_member_count) FILTER (WHERE team_preference = 'have_team') as members_in_existing_teams,
  COUNT(*) FILTER (WHERE team_preference = 'have_team') + 
    SUM(team_member_count) FILTER (WHERE team_preference = 'have_team') as total_in_existing_teams,
  
  -- Averages
  ROUND(AVG(total_team_size) FILTER (WHERE team_preference = 'have_team'), 2) as avg_existing_team_size,
  ROUND((COUNT(*) + SUM(team_member_count))::numeric / COUNT(*), 2) as avg_participants_per_application

FROM participant_stats;

-- 2. TEAM BREAKDOWN - Show each team and their members
SELECT 
  '=== EXISTING TEAMS BREAKDOWN ===' as teams_title,
  ROW_NUMBER() OVER (ORDER BY total_team_size DESC, full_name) as team_rank,
  full_name as team_leader,
  email as leader_email,
  total_team_size as team_size,
  team_member_count as additional_members,
  clean_team_members as team_member_emails,
  created_at::date as application_date
FROM participant_stats
WHERE team_preference = 'have_team'
ORDER BY total_team_size DESC, full_name;

-- 3. ALL UNIQUE PARTICIPANT EMAILS (for email list generation)
WITH all_emails AS (
  -- Get all applicant emails
  SELECT 
    LOWER(TRIM(email)) as clean_email,
    full_name,
    'applicant' as participant_type,
    created_at
  FROM applicants
  WHERE email IS NOT NULL AND TRIM(email) != ''
  
  UNION ALL
  
  -- Get all team member emails
  SELECT 
    LOWER(TRIM(UNNEST(
      array_remove(
        array_remove(team_members, ''), 
        NULL
      )
    ))) as clean_email,
    'Team member of: ' || full_name as full_name,
    'team_member' as participant_type,
    created_at
  FROM applicants 
  WHERE team_members IS NOT NULL 
    AND array_length(array_remove(array_remove(team_members, ''), NULL), 1) > 0
),
unique_emails_with_source AS (
  SELECT 
    clean_email,
    -- Keep track of all sources for each email
    array_agg(DISTINCT participant_type) as found_in_sources,
    -- Use the earliest created_at date
    MIN(created_at) as first_seen,
    -- Count occurrences before deduplication
    COUNT(*) as occurrence_count
  FROM all_emails
  WHERE clean_email IS NOT NULL AND clean_email != ''
  GROUP BY clean_email
)
SELECT 
  '=== UNIQUE PARTICIPANT EMAILS (NO DUPLICATES) ===' as email_list_title,
  COUNT(*) as total_unique_participants,
  COUNT(*) FILTER (WHERE 'applicant' = ANY(found_in_sources)) as emails_with_applications,
  COUNT(*) FILTER (WHERE 'team_member' = ANY(found_in_sources)) as emails_as_team_members,
  COUNT(*) FILTER (WHERE array_length(found_in_sources, 1) > 1) as emails_in_both_sources,
  SUM(occurrence_count) - COUNT(*) as total_duplicates_removed
FROM unique_emails_with_source;

-- 4. POTENTIAL DUPLICATE EMAILS (quality check)
WITH all_participant_emails AS (
  SELECT LOWER(TRIM(email)) as clean_email, 'applicant' as source
  FROM applicants
  WHERE email IS NOT NULL AND email != ''
  
  UNION ALL
  
  SELECT 
    LOWER(TRIM(UNNEST(
      array_remove(array_remove(team_members, ''), NULL)
    ))) as clean_email,
    'team_member' as source
  FROM applicants 
  WHERE team_members IS NOT NULL
),
email_counts AS (
  SELECT 
    clean_email,
    COUNT(*) as occurrence_count,
    array_agg(DISTINCT source) as found_in
  FROM all_participant_emails
  GROUP BY clean_email
  HAVING COUNT(*) > 1
)
SELECT 
  '=== POTENTIAL DUPLICATE EMAILS ===' as duplicates_title,
  clean_email,
  occurrence_count,
  found_in
FROM email_counts
ORDER BY occurrence_count DESC, clean_email;
