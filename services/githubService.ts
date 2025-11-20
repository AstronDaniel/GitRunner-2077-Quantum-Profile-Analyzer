import { GithubProfile } from '../types';

export const fetchGithubProfile = async (username: string): Promise<GithubProfile> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("TARGET_NOT_FOUND");
      }
      throw new Error("CONNECTION_REFUSED");
    }
    const data = await response.json();
    return data as GithubProfile;
  } catch (error) {
    console.error("Error fetching GitHub profile:", error);
    throw error;
  }
};
