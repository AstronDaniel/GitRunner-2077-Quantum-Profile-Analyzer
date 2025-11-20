
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GithubProfile, AnalysisResult } from "../types";

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Deterministic Power Level Calculation
const calculatePowerLevel = (profile: GithubProfile) => {
  const accountCreation = new Date(profile.created_at);
  const now = new Date();
  const accountAgeDays = Math.floor((now.getTime() - accountCreation.getTime()) / (1000 * 3600 * 24));
  
  // Points breakdown
  const followerPoints = profile.followers * 10; 
  const repoPoints = profile.public_repos * 5; 
  const gistPoints = profile.public_gists * 2; 
  const agePoints = Math.floor(accountAgeDays / 2); 
  
  const lastUpdate = new Date(profile.updated_at);
  const daysSinceUpdate = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 3600 * 24));
  let consistencyMultiplier = 1.0;
  
  if (daysSinceUpdate < 7) consistencyMultiplier = 1.2; 
  else if (daysSinceUpdate < 30) consistencyMultiplier = 1.1; 
  else if (daysSinceUpdate > 180) consistencyMultiplier = 0.8; 
  
  const rawScore = Math.floor((followerPoints + repoPoints + gistPoints + agePoints) * consistencyMultiplier);
  
  return {
    total: rawScore,
    breakdown: {
      followerPoints,
      repoPoints,
      agePoints,
      bonusPoints: Math.floor(rawScore - (followerPoints + repoPoints + gistPoints + agePoints))
    }
  };
};

export const analyzeProfileWithGemini = async (profile: GithubProfile): Promise<AnalysisResult> => {
  const modelId = "gemini-2.5-flash";
  
  const calculatedStats = calculatePowerLevel(profile);

  const prompt = `
    Act as a futuristic Cyberpunk System Analyzer AI (Model 2077).
    User Data:
    - Username: ${profile.login}
    - Bio: ${profile.bio}
    - Repos: ${profile.public_repos}
    - Followers: ${profile.followers}
    - Calculated Power Level: ${calculatedStats.total}

    Task:
    1. Assign a cool 'archetype' (e.g., "Neural Architect").
    2. Write a short 'analysis' (max 40 words) in cyberpunk slang.
    3. Estimate 'skills' (0-100) based on stats.
    4. 'languages': Predict top 3 likely programming languages and their percentages based on the profile vibe (if unknown, guess based on archetype).
    5. 'augmentations': Create 3 cool cybernetic unlockables based on their stats (e.g., "Optical Camo" for low followers but high code, "Titanium Cortex" for high repos). Give them a rarity.
    
    Return JSON.
  `;

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      archetype: { type: Type.STRING },
      globalRank: { type: Type.STRING },
      consistencyScore: { type: Type.INTEGER },
      skills: {
        type: Type.OBJECT,
        properties: {
          coding: { type: Type.INTEGER },
          logic: { type: Type.INTEGER },
          creativity: { type: Type.INTEGER },
          speed: { type: Type.INTEGER },
          collaboration: { type: Type.INTEGER },
          resilience: { type: Type.INTEGER },
        },
        required: ["coding", "logic", "creativity", "speed", "collaboration", "resilience"]
      },
      languages: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            percent: { type: Type.INTEGER }
          }
        }
      },
      augmentations: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            desc: { type: Type.STRING },
            rarity: { type: Type.STRING, enum: ["common", "rare", "legendary"] }
          }
        }
      },
      analysis: { type: Type.STRING },
      strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
      weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
      hackEfficiency: { type: Type.INTEGER },
    },
    required: ["archetype", "globalRank", "consistencyScore", "skills", "languages", "augmentations", "analysis", "strengths", "weaknesses", "hackEfficiency"]
  };

  try {
    const response = await genAI.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No analysis generated");
    
    const aiData = JSON.parse(text);

    return {
      ...aiData,
      powerLevel: calculatedStats.total,
      rawScoreBreakdown: calculatedStats.breakdown
    } as AnalysisResult;

  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return {
      powerLevel: calculatedStats.total,
      rawScoreBreakdown: calculatedStats.breakdown,
      archetype: "Offline Phantom",
      globalRank: "Unknown Signal",
      consistencyScore: 0,
      skills: { coding: 10, logic: 10, creativity: 10, speed: 10, collaboration: 10, resilience: 10 },
      languages: [{ name: "Binary", percent: 100 }],
      augmentations: [{ name: "Corrupted Memory", desc: "Failed to load data", rarity: "common" }],
      analysis: "CONNECTION FAILED. UNABLE TO RETRIEVE NEURAL DATA.",
      strengths: ["Local Storage"],
      weaknesses: ["Network Latency"],
      hackEfficiency: 0
    };
  }
};
