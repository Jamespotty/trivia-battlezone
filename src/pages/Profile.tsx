
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import MainNavigation from "@/components/MainNavigation";
import { AreaChart, Brain, Clock, Trophy, User, BarChart3, PieChart, Award, Medal } from "lucide-react";

// Mock data for demonstration
const mockUserStats = {
  username: "TriviaMaster",
  joinDate: new Date(2023, 1, 15),
  totalScore: 12800,
  gamesPlayed: 24,
  gamesWon: 18,
  winRate: 0.75,
  avgResponseTime: 3.2,
  bestCategory: "Science",
  worstCategory: "Literature",
  highestScore: 930,
  badges: ["Fast Responder", "Knowledge Master", "Science Expert"],
  categoryScores: {
    Science: 3800,
    History: 2900,
    Geography: 2500,
    Entertainment: 1900,
    Sports: 1700,
  },
  recentGames: [
    { id: "GAME123", date: new Date(Date.now() - 86400000), score: 850, position: 1, category: "Mixed" },
    { id: "GAME456", date: new Date(Date.now() - 172800000), score: 760, position: 2, category: "Science" },
    { id: "GAME789", date: new Date(Date.now() - 259200000), score: 920, position: 1, category: "History" },
    { id: "GAME012", date: new Date(Date.now() - 345600000), score: 680, position: 3, category: "Geography" },
    { id: "GAME345", date: new Date(Date.now() - 432000000), score: 810, position: 2, category: "Entertainment" },
  ],
};

interface UserStats {
  username: string;
  joinDate: Date;
  totalScore: number;
  gamesPlayed: number;
  gamesWon: number;
  winRate: number;
  avgResponseTime: number;
  bestCategory: string;
  worstCategory: string;
  highestScore: number;
  badges: string[];
  categoryScores: Record<string, number>;
  recentGames: {
    id: string;
    date: Date;
    score: number;
    position: number;
    category: string;
  }[];
}

const Profile = () => {
  const [userStats, setUserStats] = useState<UserStats>(mockUserStats);
  const [username, setUsername] = useState<string>(localStorage.getItem("username") || "Player");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  
  // Sync username with localStorage
  useEffect(() => {
    setUsername(localStorage.getItem("username") || "Player");
    setNewUsername(localStorage.getItem("username") || "Player");
  }, []);
  
  // Format date function
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  // Save username function
  const handleSaveUsername = () => {
    if (!newUsername.trim()) {
      toast({
        title: "Invalid username",
        description: "Username cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    localStorage.setItem("username", newUsername);
    setUsername(newUsername);
    setIsEditingUsername(false);
    
    toast({
      title: "Username updated",
      description: "Your username has been updated successfully",
    });
  };
  
  // Get top categories by score
  const topCategories = Object.entries(userStats.categoryScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);
  
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavigation />
      
      <main className="flex-1 py-8">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Card className="trivia-card mb-6">
                <div className="text-center mb-4">
                  <div className="inline-block p-4 mb-4 rounded-full bg-trivia-primary/20">
                    <User className="h-16 w-16 text-trivia-primary" />
                  </div>
                  
                  {isEditingUsername ? (
                    <div className="space-y-2">
                      <Input
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className="text-center font-bold text-xl bg-trivia-background text-trivia-foreground"
                      />
                      <div className="flex space-x-2">
                        <Button 
                          className="flex-1 trivia-button"
                          onClick={handleSaveUsername}
                        >
                          Save
                        </Button>
                        <Button 
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            setIsEditingUsername(false);
                            setNewUsername(username);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{username}</h2>
                      <Button 
                        variant="outline" 
                        className="text-sm"
                        onClick={() => setIsEditingUsername(true)}
                      >
                        Edit Username
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="flex justify-between">
                    <span className="text-trivia-foreground/70">Member Since</span>
                    <span>{formatDate(userStats.joinDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-trivia-foreground/70">Games Played</span>
                    <span>{userStats.gamesPlayed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-trivia-foreground/70">Win Rate</span>
                    <span>{(userStats.winRate * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-trivia-foreground/70">Total Score</span>
                    <span>{userStats.totalScore.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-trivia-foreground/70">Highest Score</span>
                    <span>{userStats.highestScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-trivia-foreground/70">Avg Response Time</span>
                    <span>{userStats.avgResponseTime.toFixed(1)}s</span>
                  </div>
                </div>
              </Card>
              
              <Card className="trivia-card">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Award className="mr-2 h-5 w-5 text-yellow-500" />
                  Badges & Achievements
                </h3>
                
                <div className="space-y-3">
                  {userStats.badges.map((badge, index) => (
                    <div 
                      key={index} 
                      className="flex items-center p-2 rounded-lg bg-trivia-background/50"
                    >
                      <Medal className="h-5 w-5 mr-3 text-yellow-500" />
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Tabs defaultValue="stats">
                <TabsList className="mb-6">
                  <TabsTrigger value="stats" className="data-[state=active]:bg-trivia-primary">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Statistics
                  </TabsTrigger>
                  <TabsTrigger value="games" className="data-[state=active]:bg-trivia-primary">
                    <Trophy className="mr-2 h-4 w-4" />
                    Game History
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="stats">
                  <div className="grid gap-6 md:grid-cols-3 mb-6">
                    <Card className="trivia-card">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">Games Won</h3>
                        <div className="text-3xl font-bold text-trivia-primary">
                          {userStats.gamesWon}
                        </div>
                        <p className="text-sm text-trivia-foreground/70">
                          out of {userStats.gamesPlayed} games
                        </p>
                      </div>
                    </Card>
                    
                    <Card className="trivia-card">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">Best Category</h3>
                        <div className="text-3xl font-bold text-trivia-accent">
                          {userStats.bestCategory}
                        </div>
                        <p className="text-sm text-trivia-foreground/70">
                          {userStats.categoryScores[userStats.bestCategory]} points
                        </p>
                      </div>
                    </Card>
                    
                    <Card className="trivia-card">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">Response Time</h3>
                        <div className="text-3xl font-bold text-trivia-secondary">
                          {userStats.avgResponseTime.toFixed(1)}s
                        </div>
                        <p className="text-sm text-trivia-foreground/70">
                          average per question
                        </p>
                      </div>
                    </Card>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="trivia-card">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <PieChart className="mr-2 h-5 w-5" />
                        Top Categories
                      </h3>
                      
                      <div className="space-y-4">
                        {topCategories.map(([category, score], index) => (
                          <div key={category}>
                            <div className="flex justify-between mb-1">
                              <span>{category}</span>
                              <span>{score} points</span>
                            </div>
                            <div className="h-2 rounded-full bg-trivia-background overflow-hidden">
                              <div 
                                className={`h-full ${
                                  index === 0 
                                    ? "bg-trivia-primary" 
                                    : index === 1 
                                    ? "bg-trivia-secondary" 
                                    : "bg-trivia-accent"
                                }`}
                                style={{ width: `${(score / userStats.totalScore) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                    
                    <Card className="trivia-card">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Brain className="mr-2 h-5 w-5" />
                        Performance Insights
                      </h3>
                      
                      <div className="space-y-2">
                        <div className="p-3 rounded-lg bg-trivia-background/50">
                          <div className="flex items-center mb-2">
                            <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                            <span className="font-medium">Best Performance</span>
                          </div>
                          <p className="text-sm text-trivia-foreground/70">
                            You excel in {userStats.bestCategory} questions, with an average score 20% higher than other categories.
                          </p>
                        </div>
                        
                        <div className="p-3 rounded-lg bg-trivia-background/50">
                          <div className="flex items-center mb-2">
                            <Clock className="h-4 w-4 mr-2 text-blue-500" />
                            <span className="font-medium">Response Time</span>
                          </div>
                          <p className="text-sm text-trivia-foreground/70">
                            Your average response time is {userStats.avgResponseTime.toFixed(1)}s, which is faster than 65% of all players.
                          </p>
                        </div>
                        
                        <div className="p-3 rounded-lg bg-trivia-background/50">
                          <div className="flex items-center mb-2">
                            <AreaChart className="h-4 w-4 mr-2 text-green-500" />
                            <span className="font-medium">Improvement Area</span>
                          </div>
                          <p className="text-sm text-trivia-foreground/70">
                            Consider practicing {userStats.worstCategory} questions to improve your overall ranking.
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="games">
                  <Card className="trivia-card overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-purple-800/30">
                            <th className="px-4 py-3 text-left">Game ID</th>
                            <th className="px-4 py-3 text-left">Date</th>
                            <th className="px-4 py-3 text-left">Category</th>
                            <th className="px-4 py-3 text-right">Position</th>
                            <th className="px-4 py-3 text-right">Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userStats.recentGames.map(game => (
                            <tr 
                              key={game.id} 
                              className="border-b border-purple-800/10 hover:bg-trivia-primary/5"
                            >
                              <td className="px-4 py-3 font-medium">{game.id}</td>
                              <td className="px-4 py-3">{formatDate(game.date)}</td>
                              <td className="px-4 py-3">{game.category}</td>
                              <td className="px-4 py-3 text-right">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  game.position === 1 
                                    ? "bg-yellow-500/20 text-yellow-500" 
                                    : game.position === 2 
                                    ? "bg-gray-300/20 text-gray-300" 
                                    : game.position === 3 
                                    ? "bg-amber-600/20 text-amber-600" 
                                    : "bg-trivia-foreground/20 text-trivia-foreground/70"
                                }`}>
                                  {game.position === 1 ? "1st" : 
                                   game.position === 2 ? "2nd" : 
                                   game.position === 3 ? "3rd" : 
                                   `${game.position}th`}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right font-medium">{game.score}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
