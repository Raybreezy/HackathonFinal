import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a mock client if environment variables aren't set
let supabase: any;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  // Mock client for development without Supabase
  supabase = {
    from: () => ({
      insert: () => Promise.resolve({ error: null }),
      select: () => Promise.resolve({ data: [], error: null }),
      order: () => Promise.resolve({ data: [], error: null })
    }),
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ error: null }),
        getPublicUrl: () => ({ data: { publicUrl: '' } })
      })
    }
  }
}

export { supabase }

// Types for our applicant data
export interface Applicant {
  id?: string
  created_at?: string
  full_name: string
  email: string
  university: string
  track_selection: 'beginner' | 'advanced'
  skills: string[]
  experience: string
  motivation: string
  github_url?: string
  linkedin_url?: string
  portfolio_url?: string
  team_preference: 'individual' | 'team' | 'no_preference'
}
