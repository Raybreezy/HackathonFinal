-- Supabase SQL Query to Count Total Participants
-- This query counts all participants including team members

WITH participant_counts AS (
  SELECT 
    id,
    full_name,
    email,
    team_preference,
    team_members,
    -- Count the applicant themselves (always 1)
    1 as applicant_count,
    -- Count team members (filter out empty/null emails)
    CASE 
      WHEN team_members IS NOT NULL THEN 
        array_length(
          array_remove(
            array_remove(team_members, ''), 
            NULL
          ), 
          1
        )
      ELSE 0 
    END as team_member_count
  FROM applicants
)
SELECT 
  -- Total individual applicants
  COUNT(*) as total_applicants,
  
  -- Total team members across all applications
  SUM(team_member_count) as total_team_members,
  
  -- Grand total of all participants (applicants + their team members)
  COUNT(*) + SUM(team_member_count) as total_participants,
  
  -- Breakdown by team preference
  COUNT(*) FILTER (WHERE team_preference = 'individual') as individual_applicants,
  COUNT(*) FILTER (WHERE team_preference = 'team') as looking_for_team_applicants,
  COUNT(*) FILTER (WHERE team_preference = 'have_team') as have_team_applicants,
  
  -- Team stats
  SUM(team_member_count) FILTER (WHERE team_preference = 'have_team') as total_existing_team_members,
  
  -- Average team size for those who have teams
  CASE 
    WHEN COUNT(*) FILTER (WHERE team_preference = 'have_team') > 0 THEN
      ROUND(
        (COUNT(*) FILTER (WHERE team_preference = 'have_team') + 
         SUM(team_member_count) FILTER (WHERE team_preference = 'have_team')) / 
        COUNT(*) FILTER (WHERE team_preference = 'have_team')::numeric, 
        2
      )
    ELSE 0
  END as average_team_size_with_existing_teams

FROM participant_counts;

-- Alternative query to see individual team breakdowns
-- Uncomment the query below to see each team and their member count

/*
SELECT 
  full_name,
  email,
  team_preference,
  CASE 
    WHEN team_members IS NOT NULL THEN 
      array_length(
        array_remove(
          array_remove(team_members, ''), 
          NULL
        ), 
        1
      )
    ELSE 0 
  END as team_member_count,
  -- Total team size including the applicant
  1 + CASE 
    WHEN team_members IS NOT NULL THEN 
      array_length(
        array_remove(
          array_remove(team_members, ''), 
          NULL
        ), 
        1
      )
    ELSE 0 
  END as total_team_size,
  team_members
FROM applicants
WHERE team_preference = 'have_team'
ORDER BY total_team_size DESC;
*/
