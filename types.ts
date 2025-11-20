
export interface GithubProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  id: number;
}

export interface AnalysisResult {
  powerLevel: number; // Calculated score
  rawScoreBreakdown: {
    followerPoints: number;
    repoPoints: number;
    agePoints: number;
    bonusPoints: number;
  };
  archetype: string; // e.g. "Void Architect", "Code Ronin"
  globalRank: string; // e.g. "Top 0.1% - Elite"
  consistencyScore: number; // 0 - 100
  skills: {
    coding: number;
    logic: number;
    creativity: number;
    speed: number;
    collaboration: number;
    resilience: number;
  };
  languages: { name: string; percent: number }[];
  augmentations: { name: string; desc: string; rarity: 'common' | 'rare' | 'legendary' }[];
  analysis: string; // The paragraph text
  strengths: string[];
  weaknesses: string[];
  hackEfficiency: number; // percentage
}

export interface AppState {
  status: 'INTRO' | 'IDLE' | 'FETCHING_GITHUB' | 'ANALYZING_AI' | 'SUCCESS' | 'ERROR';
  mode: 'SINGLE' | 'COMPARE_SEARCH' | 'COMPARE_VIEW'; // New mode for comparison
  profile: GithubProfile | null;
  analysis: AnalysisResult | null;
  comparison?: {
    profile: GithubProfile;
    analysis: AnalysisResult;
  } | null;
  error: string | null;
}
