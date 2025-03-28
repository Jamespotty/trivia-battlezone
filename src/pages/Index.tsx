
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import MainNavigation from "@/components/MainNavigation";
import { Brain, Trophy, Users, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [gameCode, setGameCode] = useState("");
  const [username, setUsername] = useState("");
  const [isJoiningGame, setIsJoiningGame] = useState(false);

  const handleJoinGame = () => {
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
        description: "Please enter a username to continue",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would validate the game code
    // For now, we'll just navigate to the game page
    localStorage.setItem("username", username);
    navigate(`/game/${gameCode}`);
  };

  const handleCreateGame = () => {
    if (!username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a username to continue",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would create a game session
    // For now, we'll generate a random code and navigate
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    localStorage.setItem("username", username);
    navigate(`/game/${randomCode}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MainNavigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-transparent bg-clip-text trivia-gradient-bg">
                  TriviaCraft
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-trivia-foreground/80 max-w-2xl mx-auto">
                Test your knowledge with friends in real-time multiplayer trivia battles.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="trivia-card animate-pulse-scale mb-8">
                <Label htmlFor="username" className="block mb-2">Enter Your Trivia Handle</Label>
                <Input
                  id="username"
                  placeholder="YourTriviaMaster99"
                  className="mb-4 bg-trivia-background text-trivia-foreground"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full trivia-button flex items-center justify-center"
                        onClick={() => setIsJoiningGame(true)}
                      >
                        <Users className="mr-2 h-4 w-4" />
                        Join Game
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="trivia-card">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Join a Game</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <Label htmlFor="gameCode" className="block mb-2">Enter Game Code</Label>
                        <Input
                          id="gameCode"
                          placeholder="ABCDEF"
                          className="uppercase bg-trivia-background text-trivia-foreground"
                          value={gameCode}
                          onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                        />
                        <Button 
                          className="w-full trivia-button mt-4"
                          onClick={handleJoinGame}
                        >
                          Join Game
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    className="w-full trivia-button flex items-center justify-center"
                    onClick={handleCreateGame}
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Create Game
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-trivia-card/50">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="trivia-card flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-trivia-primary flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Create or Join</h3>
                <p className="text-trivia-foreground/80">
                  Create a new game session or join an existing one with a game code.
                </p>
              </div>
              
              <div className="trivia-card flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-trivia-secondary flex items-center justify-center mb-4">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Answer Questions</h3>
                <p className="text-trivia-foreground/80">
                  Test your knowledge with timed questions across various categories.
                </p>
              </div>
              
              <div className="trivia-card flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-trivia-accent flex items-center justify-center mb-4">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Climb the Ranks</h3>
                <p className="text-trivia-foreground/80">
                  Score points and compete for the top spot on the leaderboard.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-6 text-center text-trivia-foreground/60">
        <p>© 2023 TriviaCraft. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
