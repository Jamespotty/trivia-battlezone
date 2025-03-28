
import { generateClient } from 'aws-amplify/api';

// This is a placeholder for the actual generated types from Amplify
// You'll need to run 'npx ampx generate-types' after setting up Amplify backend
export interface TriviaQuestionModel {
  id: string;
  question: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  correctAnswer: string;
  incorrectAnswers: string[];
  explanation?: string;
}

export interface TriviaSessionModel {
  id: string;
  code: string;
  status: 'lobby' | 'active' | 'completed';
  currentQuestion?: number;
  questions: any; // This will be a JSON object from the schema
  createdAt: string;
  owner: string;
}

export interface PlayerModel {
  id: string;
  score: number;
  responseTime?: number;
  sessionId: string;
  createdAt: string;
  owner: string;
}

export interface UserProfileModel {
  id: string;
  username: string;
  totalWins: number;
  avgResponseTime?: number;
  createdAt: string;
  owner: string;
}

// Generate the Amplify API client
const client = generateClient();

// Mock implementation until your Amplify backend is set up
const dataService = {
  // Questions
  fetchQuestions: async (category?: string, limit = 10) => {
    console.log('Fetching questions with category:', category);
    // This would be replaced with actual API call
    return [];
  },
  
  // Sessions
  createSession: async (sessionData: Partial<TriviaSessionModel>) => {
    console.log('Creating session:', sessionData);
    // This would be replaced with actual API call
    return { id: 'mock-id', ...sessionData } as TriviaSessionModel;
  },
  
  listSessions: async () => {
    console.log('Listing all sessions');
    // This would be replaced with actual API call
    return [];
  },
  
  // Players
  updatePlayerScore: async (playerId: string, score: number) => {
    console.log('Updating player score:', playerId, score);
    // This would be replaced with actual API call
    return { id: playerId, score };
  },
  
  // User Profiles
  getUserProfile: async (userId: string) => {
    console.log('Getting user profile:', userId);
    // This would be replaced with actual API call
    return null;
  },
  
  // Realtime subscriptions
  subscribeToSessionUpdates: (sessionId: string, callback: (data: any) => void) => {
    console.log('Subscribing to session updates:', sessionId);
    // This would be replaced with actual subscription
    // Return a function to unsubscribe
    return () => {
      console.log('Unsubscribed from session updates:', sessionId);
    };
  }
};

export default dataService;
