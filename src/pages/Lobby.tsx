
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import MainNavigation from "@/components/MainNavigation";
import { Users, Globe, Bolt, Clock, Play, Plus } from "lucide-react";

// Define the allowed status values using a literal type
interface TriviaSession {
  id: string;
  host: string;
  players: number;
  status: "lobby" | "active" | "completed";
  category: string;
  maxPlayers: number;
  created: Date;
}

// Mock data for demonstration - now with proper typed status values
const mockSessions: TriviaSession[] = [
  {
    id: "ABC123",
    host: "TriviaMaster",
    players: 3,
    status: "lobby",
    category: "Mixed",
    maxPlayers: 8,
    created: new Date(Date.now() - 120000),
  },
  {
    id: "DEF456",
    host: "QuizWizard",
    players: 5,
    status: "active",
    category: "Science",
    maxPlayers: 6,
    created: new Date(Date.now() - 300000),
  },
  {
    id: "GHI789",
    host: "BrainBuster",
    players: 2,
    status: "lobby",
    category: "History",
    maxPlayers: 4,
    created: new Date(Date.now() - 60000),
  },
];

const Lobby = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<TriviaSession[]>(mockSessions);
  const [username, setUsername] = useState<string>(localStorage.getItem("username") || "");
  const [gameCode, setGameCode] = useState("");
  const [filteredSessions, setFilteredSessions] = useState<TriviaSession[]>(sessions);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Update filtered sessions when the search query or tab changes
  useEffect(() => {
    let filtered = sessions;
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(session => 
        session.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by tab
    if (activeTab === "lobby") {
      filtered = filtered.filter(session => session.status === "lobby");
    } else if (activeTab === "active") {
      filtered = filtered.filter(session => session.status === "active");
    }
    
    setFilteredSessions(filtered);
  }, [sessions, searchQuery, activeTab]);
  
  const handleJoinGame = (sessionId: string) => {
    if (!username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a username to join a game",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would make an API call to join the game
    localStorage.setItem("username", username);
    navigate(`/game/${sessionId}`);
  };
  
  const handleCreateGame = () => {
    if (!username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a username to create a game",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would make an API call to create a game
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    localStorage.setItem("username", username);
    navigate(`/game/${randomCode}`);
  };
  
  const handleJoinByCode = () => {
    if (!gameCode.trim()) {
      toast({
        title: "Game code required",
        description: "Please enter a valid game code to join a session",
        variant: "destructive",
      });
      return;
    }
    
    if (!username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a username to join a game",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would validate the game code
    localStorage.setItem("username", username);
    navigate(`/game/${gameCode}`);
  };
  
  // Helper function to format the time since creation
  const formatTimeSince = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      const hours = Math.floor(seconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavigation />
      
      <main className="flex-1 py-8">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Game Sessions</h2>
              
              <div className="mb-6">
                <Input
                  placeholder="Search by game code, host, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-trivia-background text-trivia-foreground"
                />
              </div>
              
              <Tabs defaultValue="all" onValueChange={setActiveTab} className="mb-6">
                <TabsList>
                  <TabsTrigger value="all" className="data-[state=active]:bg-trivia-primary">
                    <Globe className="mr-2 h-4 w-4" />
                    All Games
                  </TabsTrigger>
                  <TabsTrigger value="lobby" className="data-[state=active]:bg-trivia-primary">
                    <Users className="mr-2 h-4 w-4" />
                    In Lobby
                  </TabsTrigger>
                  <TabsTrigger value="active" className="data-[state=active]:bg-trivia-primary">
                    <Bolt className="mr-2 h-4 w-4" />
                    In Progress
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4 mt-4">
                  {filteredSessions.length === 0 ? (
                    <div className="text-center py-8 trivia-card">
                      <p className="text-trivia-foreground/70">No game sessions found</p>
                    </div>
                  ) : (
                    filteredSessions.map(session => (
                      <SessionCard 
                        key={session.id} 
                        session={session}
                        onJoin={() => handleJoinGame(session.id)}
                      />
                    ))
                  )}
                </TabsContent>
                
                <TabsContent value="lobby" className="space-y-4 mt-4">
                  {filteredSessions.length === 0 ? (
                    <div className="text-center py-8 trivia-card">
                      <p className="text-trivia-foreground/70">No games in lobby</p>
                    </div>
                  ) : (
                    filteredSessions.map(session => (
                      <SessionCard 
                        key={session.id} 
                        session={session}
                        onJoin={() => handleJoinGame(session.id)}
                      />
                    ))
                  )}
                </TabsContent>
                
                <TabsContent value="active" className="space-y-4 mt-4">
                  {filteredSessions.length === 0 ? (
                    <div className="text-center py-8 trivia-card">
                      <p className="text-trivia-foreground/70">No active games</p>
                    </div>
                  ) : (
                    filteredSessions.map(session => (
                      <SessionCard 
                        key={session.id} 
                        session={session}
                        onJoin={() => handleJoinGame(session.id)}
                      />
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Quick Join</h2>
              
              <div className="trivia-card mb-6">
                <Label htmlFor="username" className="block mb-2">Your Trivia Handle</Label>
                <Input
                  id="username"
                  placeholder="YourTriviaMaster99"
                  className="mb-4 bg-trivia-background text-trivia-foreground"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                
                <Label htmlFor="gameCode" className="block mb-2">Game Code</Label>
                <div className="flex space-x-2">
                  <Input
                    id="gameCode"
                    placeholder="ABCDEF"
                    className="uppercase bg-trivia-background text-trivia-foreground"
                    value={gameCode}
                    onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                  />
                  <Button 
                    className="trivia-button"
                    onClick={handleJoinByCode}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Join
                  </Button>
                </div>
              </div>
              
              <div className="trivia-card">
                <h3 className="text-xl font-bold mb-4">Create New Game</h3>
                <p className="mb-4 text-trivia-foreground/80">
                  Start a new trivia session and invite friends to join.
                </p>
                <Button 
                  className="w-full trivia-button flex items-center justify-center"
                  onClick={handleCreateGame}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Game
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Session card component
interface SessionCardProps {
  session: TriviaSession;
  onJoin: () => void;
}

const SessionCard = ({ session, onJoin }: SessionCardProps) => {
  const formatTimeSince = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      const hours = Math.floor(seconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
  };
  
  return (
    <Card className="trivia-card">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <h3 className="text-lg font-semibold">Game #{session.id}</h3>
            <span className={`ml-3 text-xs px-2 py-1 rounded-full ${
              session.status === "lobby" 
                ? "bg-trivia-secondary/20 text-trivia-secondary" 
                : "bg-trivia-accent/20 text-trivia-accent"
            }`}>
              {session.status === "lobby" ? "In Lobby" : "In Progress"}
            </span>
          </div>
          
          <div className="mt-2 text-sm text-trivia-foreground/70">
            <p>Host: {session.host}</p>
            <p>Category: {session.category}</p>
            <div className="flex items-center mt-1">
              <Users className="h-3 w-3 mr-1" />
              <span>{session.players}/{session.maxPlayers} players</span>
              <Clock className="h-3 w-3 ml-3 mr-1" />
              <span>{formatTimeSince(session.created)}</span>
            </div>
          </div>
        </div>
        
        <Button
          className="trivia-button"
          disabled={session.status !== "lobby" || session.players >= session.maxPlayers}
          onClick={onJoin}
        >
          {session.status === "lobby" && session.players < session.maxPlayers
            ? "Join"
            : session.players >= session.maxPlayers
            ? "Full"
            : "In Progress"
          }
        </Button>
      </div>
    </Card>
  );
};

export default Lobby;
