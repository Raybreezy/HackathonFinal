-- Create the applicants table
CREATE TABLE applicants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  track_selection TEXT NOT NULL CHECK (track_selection IN ('beginner', 'advanced')),
  skills TEXT[],
  experience TEXT NOT NULL,
  motivation TEXT NOT NULL,
  github_url TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  team_preference TEXT NOT NULL CHECK (team_preference IN ('individual', 'team', 'have_team')),
  team_members TEXT[]
);

-- Create indexes for better performance
CREATE INDEX idx_applicants_email ON applicants(email);
CREATE INDEX idx_applicants_track_selection ON applicants(track_selection);
CREATE INDEX idx_applicants_skills ON applicants USING GIN(skills);
CREATE INDEX idx_applicants_team_preference ON applicants(team_preference);
CREATE INDEX idx_applicants_team_members ON applicants USING GIN(team_members);
CREATE INDEX idx_applicants_created_at ON applicants(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;

-- Create policies for the applicants table
-- Allow anyone to insert (submit applications)
CREATE POLICY "Anyone can submit applications" ON applicants FOR INSERT WITH CHECK (true);

-- Only allow admins to view applications (you can modify this later for proper authentication)
CREATE POLICY "Admins can view all applications" ON applicants FOR SELECT USING (true);

-- Only allow admins to update applications
CREATE POLICY "Admins can update applications" ON applicants FOR UPDATE USING (true);

-- Only allow admins to delete applications
CREATE POLICY "Admins can delete applications" ON applicants FOR DELETE USING (true);

-- Create a view for application statistics
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

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON applicants TO anon, authenticated;
GRANT ALL ON application_stats TO anon, authenticated;
