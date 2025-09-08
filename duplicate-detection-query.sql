-- DUPLICATE EMAIL DETECTION QUERY
-- Use this to find emails that appear in both applicant emails and team_members arrays

WITH all_participant_emails AS (
  -- Get all applicant emails
  SELECT 
    LOWER(TRIM(email)) as clean_email,
    'applicant' as source_type,
    full_name,
    id as applicant_id
  FROM applicants
  WHERE email IS NOT NULL AND TRIM(email) != ''
  
  UNION ALL
  
  -- Get all team member emails
  SELECT 
    LOWER(TRIM(UNNEST(
      array_remove(array_remove(team_members, ''), NULL)
    ))) as clean_email,
    'team_member' as source_type,
    'Team member of: ' || full_name as full_name,
    id as applicant_id
  FROM applicants 
  WHERE team_members IS NOT NULL 
    AND array_length(array_remove(array_remove(team_members, ''), NULL), 1) > 0
),
email_occurrence_count AS (
  SELECT 
    clean_email,
    COUNT(*) as total_occurrences,
    array_agg(DISTINCT source_type) as found_in_sources,
    array_agg(DISTINCT full_name) as associated_names,
    array_agg(DISTINCT applicant_id) as related_application_ids
  FROM all_participant_emails
  GROUP BY clean_email
)
SELECT 
  -- Summary statistics
  '=== DUPLICATE EMAIL SUMMARY ===' as summary,
  (SELECT COUNT(*) FROM email_occurrence_count) as total_unique_emails,
  (SELECT COUNT(*) FROM email_occurrence_count WHERE total_occurrences > 1) as emails_with_duplicates,
  (SELECT SUM(total_occurrences) FROM email_occurrence_count) as total_email_instances,
  (SELECT SUM(total_occurrences) - COUNT(*) FROM email_occurrence_count) as total_duplicates_found

UNION ALL

-- Show actual duplicate emails
SELECT 
  clean_email as email_address,
  total_occurrences::text as occurrence_count,
  array_to_string(found_in_sources, ', ') as found_in,
  array_to_string(associated_names, ' | ') as names,
  array_to_string(related_application_ids::text[], ', ') as application_ids
FROM email_occurrence_count
WHERE total_occurrences > 1
ORDER BY total_occurrences DESC, clean_email;
