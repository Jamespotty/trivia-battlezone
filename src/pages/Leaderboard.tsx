
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MainNavigation from "@/components/MainNavigation";
import { Trophy, Medal, Crown, Star, Users, Clock, BarChart } from "lucide-react";

// Mock data for demonstration
const mockGlobalPlayers = [
  { id: 1, username: "TriviaMaster", totalScore: 12800, gamesPlayed: 24, winRate: 0.75, avgResponseTime: 3.2 },
  { id: 2, username: "QuizWizard", totalScore: 11500, gamesPlayed: 18, winRate: 0.6, avgResponseTime: 2.7 },
  { id: 3, username: "BrainBuster", totalScore: 15200, gamesPlayed: 30, winRate: 0.8, avgResponseTime: 2.5 },
  { id: 4, username: "KnowledgeKing", totalScore: 9800, gamesPlayed: 15, winRate: 0.6, avgResponseTime: 3.5 },
  { id: 5, username: "FactFinder", totalScore: 10500, gamesPlayed: 22, winRate: 0.5, avgResponseTime: 3.8 },
  { id: 6, username: "TriviaChamp", totalScore: 14300, gamesPlayed: 27, winRate: 0.7, avgResponseTime: 2.3 },
  { id: 7, username: "QuizNinja", totalScore: 13200, gamesPlayed: 25, winRate: 0.68, avgResponseTime: 2.9 },
  { id: 8, username: "MindMaster", totalScore: 11900, gamesPlayed: 20, winRate: 0.6, avgResponseTime: 3.1 },
  { id: 9, username: "GeekGenius", totalScore: 12100, gamesPlayed: 23, winRate: 0.65, avgResponseTime: 3.0 },
  { id: 10, username: "WisdomWarrior", totalScore: 10800, gamesPlayed: 21, winRate: 0.52, avgResponseTime: 3.3 },
];

const mockRecentGames = [
  { 
    id: "GAME123", 
    date: new Date(Date.now() - 3600000), 
    category: "Mixed",
    players: [
      { username: "TriviaMaster", score: 850 },
      { username: "QuizWizard", score: 760 },
      { username: "BrainBuster", score: 920 },
      { username: "KnowledgeKing", score: 680 },
    ] 
  },
  { 
    id: "GAME456", 
    date: new Date(Date.now() - 7200000), 
    category: "Science",
    players: [
      { username: "GeekGenius", score: 780 },
      { username: "BrainBuster", score: 820 },
      { username: "FactFinder", score: 650 },
      { username: "TriviaChamp", score: 910 },
    ] 
  },
  { 
    id: "GAME789", 
    date: new Date(Date.now() - 86400000), 
    category: "History",
    players: [
      { username: "KnowledgeKing", score: 720 },
      { username: "WisdomWarrior", score: 680 },
      { username: "QuizNinja", score: 870 },
      { username: "MindMaster", score: 750 },
    ] 
  },
];

interface Player {
  id: number;
  username: string;
  totalScore: number;
  gamesPlayed: number;
  winRate: number;
  avgResponseTime: number;
}

interface GameResult {
  id: string;
  date: Date;
  category: string;
  players: {
    username: string;
    score: number;
  }[];
}

const Leaderboard = () => {
  const [timeRange, setTimeRange] = useState("all-time");
  const [category, setCategory] = useState("all");
  const [players, setPlayers] = useState<Player[]>(mockGlobalPlayers);
  const [recentGames, setRecentGames] = useState<GameResult[]>(mockRecentGames);
  
  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavigation />
      
      <main className="flex-1 py-8">
        <div className="container px-4 mx-auto">
          <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
          
          <Tabs defaultValue="global" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="global" className="data-[state=active]:bg-trivia-primary">
                <Trophy className="mr-2 h-4 w-4" />
                Global Rankings
              </TabsTrigger>
              <TabsTrigger value="recent" className="data-[state=active]:bg-trivia-primary">
                <BarChart className="mr-2 h-4 w-4" />
                Recent Games
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="global">
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
                  <div>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger className="w-full md:w-40 bg-trivia-card">
                        <SelectValue placeholder="Time Range" />
                      </SelectTrigger>
                      <SelectContent className="bg-trivia-card border-purple-800/30">
                        <SelectItem value="all-time">All Time</SelectItem>
                        <SelectItem value="this-week">This Week</SelectItem>
                        <SelectItem value="this-month">This Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="w-full md:w-40 bg-trivia-card">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-trivia-card border-purple-800/30">
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="geography">Geography</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Card className="trivia-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-purple-800/30">
                        <th className="px-4 py-3 text-left">Rank</th>
                        <th className="px-4 py-3 text-left">Player</th>
                        <th className="px-4 py-3 text-right">Total Score</th>
                        <th className="px-4 py-3 text-right">Games</th>
                        <th className="px-4 py-3 text-right">Win Rate</th>
                        <th className="px-4 py-3 text-right">Avg. Response</th>
                      </tr>
                    </thead>
                    <tbody>
                      {players
                        .sort((a, b) => b.totalScore - a.totalScore)
                        .map((player, index) => (
                          <tr 
                            key={player.id} 
                            className="border-b border-purple-800/10 hover:bg-trivia-primary/5"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                {index === 0 ? (
                                  <Crown className="h-5 w-5 text-yellow-500 mr-1" />
                                ) : index === 1 ? (
                                  <Medal className="h-5 w-5 text-gray-300 mr-1" />
                                ) : index === 2 ? (
                                  <Medal className="h-5 w-5 text-amber-600 mr-1" />
                                ) : (
                                  <span className="font-medium ml-1 mr-2">{index + 1}</span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 font-medium">{player.username}</td>
                            <td className="px-4 py-3 text-right">{player.totalScore.toLocaleString()}</td>
                            <td className="px-4 py-3 text-right">{player.gamesPlayed}</td>
                            <td className="px-4 py-3 text-right">{(player.winRate * 100).toFixed(0)}%</td>
                            <td className="px-4 py-3 text-right">{player.avgResponseTime.toFixed(1)}s</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="trivia-card">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Top Scorer</h3>
                    <Star className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="text-center">
                    <div className="inline-block p-2 rounded-full bg-trivia-primary/20 mb-2">
                      <Crown className="h-10 w-10 text-yellow-500" />
                    </div>
                    <h4 className="text-xl font-bold">
                      {players.sort((a, b) => b.totalScore - a.totalScore)[0].username}
                    </h4>
                    <p className="text-sm text-trivia-foreground/70">
                      Total Score: {players.sort((a, b) => b.totalScore - a.totalScore)[0].totalScore.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="trivia-card">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Most Games</h3>
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="text-center">
                    <div className="inline-block p-2 rounded-full bg-trivia-secondary/20 mb-2">
                      <Users className="h-10 w-10 text-blue-500" />
                    </div>
                    <h4 className="text-xl font-bold">
                      {players.sort((a, b) => b.gamesPlayed - a.gamesPlayed)[0].username}
                    </h4>
                    <p className="text-sm text-trivia-foreground/70">
                      Games Played: {players.sort((a, b) => b.gamesPlayed - a.gamesPlayed)[0].gamesPlayed}
                    </p>
                  </div>
                </div>
                
                <div className="trivia-card">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Fastest Responder</h3>
                    <Clock className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="text-center">
                    <div className="inline-block p-2 rounded-full bg-trivia-accent/20 mb-2">
                      <Clock className="h-10 w-10 text-green-500" />
                    </div>
                    <h4 className="text-xl font-bold">
                      {players.sort((a, b) => a.avgResponseTime - b.avgResponseTime)[0].username}
                    </h4>
                    <p className="text-sm text-trivia-foreground/70">
                      Avg. Response: {players.sort((a, b) => a.avgResponseTime - b.avgResponseTime)[0].avgResponseTime.toFixed(1)}s
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="recent">
              <div className="space-y-6">
                {recentGames.map(game => (
                  <Card key={game.id} className="trivia-card">
                    <div className="mb-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">Game #{game.id}</h3>
                        <span className="text-sm text-trivia-foreground/70">
                          {formatDate(game.date)}
                        </span>
                      </div>
                      <p className="text-sm text-trivia-foreground/70">Category: {game.category}</p>
                    </div>
                    
                    <div className="space-y-3">
                      {game.players
                        .sort((a, b) => b.score - a.score)
                        .map((player, index) => (
                          <div 
                            key={player.username} 
                            className="flex justify-between items-center p-2 rounded-lg bg-trivia-background/50"
                          >
                            <div className="flex items-center">
                              <span className="font-medium mr-3">{index + 1}.</span>
                              <span>{player.username}</span>
                            </div>
                            <div className="font-bold">{player.score}</div>
                          </div>
                        ))
                      }
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
