
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import MainNavigation from "@/components/MainNavigation";
import { Clock, Users } from "lucide-react";

// Mock data for demonstration
const mockQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    category: "Geography",
    difficulty: "easy",
    correctAnswer: "Paris",
    incorrectAnswers: ["London", "Berlin", "Madrid"],
    explanation: "Paris is the capital and most populous city of France."
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    category: "Astronomy",
    difficulty: "easy",
    correctAnswer: "Mars",
    incorrectAnswers: ["Venus", "Jupiter", "Mercury"],
    explanation: "Mars is often called the 'Red Planet' due to its reddish appearance."
  },
  {
    id: 3,
    question: "Who wrote 'Romeo and Juliet'?",
    category: "Literature",
    difficulty: "easy",
    correctAnswer: "William Shakespeare",
    incorrectAnswers: ["Charles Dickens", "Jane Austen", "F. Scott Fitzgerald"],
    explanation: "Romeo and Juliet is a tragedy written by William Shakespeare early in his career."
  },
  {
    id: 4,
    question: "What is the largest ocean on Earth?",
    category: "Geography",
    difficulty: "medium",
    correctAnswer: "Pacific Ocean",
    incorrectAnswers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
    explanation: "The Pacific Ocean is the largest and deepest ocean on Earth."
  },
  {
    id: 5,
    question: "Which element has the chemical symbol 'O'?",
    category: "Chemistry",
    difficulty: "easy",
    correctAnswer: "Oxygen",
    incorrectAnswers: ["Gold", "Osmium", "Hydrogen"],
    explanation: "Oxygen is represented by the symbol 'O' on the periodic table of elements."
  },
];

const mockPlayers = [
  { id: 1, username: "TriviaMaster", score: 800 },
  { id: 2, username: "QuizWizard", score: 750 },
  { id: 3, username: "BrainBuster", score: 900 },
  { id: 4, username: "KnowledgeKing", score: 600 },
];

interface Question {
  id: number;
  question: string;
  category: string;
  difficulty: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  explanation: string;
}

interface Player {
  id: number;
  username: string;
  score: number;
}

// Game status types
type GameStatus = "lobby" | "countdown" | "question" | "answer-reveal" | "leaderboard" | "finished";

const Game = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<GameStatus>("lobby");
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [players, setPlayers] = useState<Player[]>(mockPlayers);
  const [username, setUsername] = useState<string>(localStorage.getItem("username") || "Player");
  const [countdownValue, setCountdownValue] = useState(3);
  
  const currentQuestion = questions[currentQuestionIndex];
  const allAnswers = currentQuestion 
    ? [...currentQuestion.incorrectAnswers, currentQuestion.correctAnswer].sort(() => Math.random() - 0.5)
    : [];
  
  // Join the game as a player
  useEffect(() => {
    if (!username) {
      navigate("/");
      toast({
        title: "Username Required",
        description: "Please enter a username to join the game",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would make an API call to join the game
    console.log(`Player ${username} joined game ${gameId}`);
    
    // For demo purposes, let's add the current user to players if not already there
    if (!players.some(p => p.username === username)) {
      setPlayers(prev => [...prev, { id: prev.length + 1, username, score: 0 }]);
    }
  }, [gameId, username, navigate]);
  
  // Start the game after a delay in the lobby
  useEffect(() => {
    if (status === "lobby") {
      const timer = setTimeout(() => {
        setStatus("countdown");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);
  
  // Countdown timer before showing the first question
  useEffect(() => {
    if (status === "countdown") {
      if (countdownValue > 0) {
        const timer = setTimeout(() => {
          setCountdownValue(countdownValue - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setStatus("question");
        setTimeLeft(15);
      }
    }
  }, [status, countdownValue]);
  
  // Timer for each question
  useEffect(() => {
    if (status === "question") {
      if (timeLeft > 0) {
        const timer = setTimeout(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        // Time's up
        setStatus("answer-reveal");
      }
    }
  }, [status, timeLeft]);
  
  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    if (status !== "question" || selectedAnswer) return;
    
    setSelectedAnswer(answer);
    
    // In a real app, we would send this to the server
    console.log(`Selected answer: ${answer}`);
    
    // Calculate score based on time left
    const isCorrect = answer === currentQuestion.correctAnswer;
    const scoreToAdd = isCorrect ? Math.max(10, timeLeft * 10) : 0;
    
    // Update player score
    setPlayers(prev => 
      prev.map(p => 
        p.username === username 
          ? { ...p, score: p.score + scoreToAdd } 
          : p
      )
    );
    
    // Show answer reveal
    setStatus("answer-reveal");
  };
  
  // Move to next question after reveal
  useEffect(() => {
    if (status === "answer-reveal") {
      const timer = setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
          setTimeLeft(15);
          setStatus("question");
        } else {
          // Game finished
          setStatus("finished");
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, currentQuestionIndex, questions.length]);
  
  // Render based on game status
  const renderGameContent = () => {
    switch (status) {
      case "lobby":
        return (
          <div className="trivia-card max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Game Lobby</h2>
            <p className="mb-6">Game Code: <span className="font-bold text-trivia-accent">{gameId}</span></p>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2 flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Players ({players.length})
              </h3>
              <ul className="space-y-2">
                {players.map(player => (
                  <li key={player.id} className="bg-trivia-background/50 p-2 rounded-lg">
                    {player.username} {player.username === username && "(You)"}
                  </li>
                ))}
              </ul>
            </div>
            
            <p className="text-center">Game starting soon...</p>
          </div>
        );
        
      case "countdown":
        return (
          <div className="trivia-card max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Get Ready!</h2>
            <div className="text-8xl font-bold text-trivia-accent mb-6">{countdownValue}</div>
            <p>The game is about to start...</p>
          </div>
        );
        
      case "question":
      case "answer-reveal":
        return (
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
              <div className="flex items-center text-sm font-medium">
                <Clock className="mr-1 h-4 w-4" />
                <span className={timeLeft <= 5 ? "text-trivia-danger" : ""}>
                  {timeLeft}s
                </span>
              </div>
            </div>
            
            <div className="timer-bar mb-6">
              <div 
                className="timer-bar-progress" 
                style={{ "--duration": `${status === "question" ? "15s" : "0s"}` } as React.CSSProperties}
              ></div>
            </div>
            
            <Card className="trivia-card mb-6">
              <h2 className="text-xl md:text-2xl font-bold mb-2">{currentQuestion.question}</h2>
              <div className="text-sm text-trivia-foreground/70 mb-4">
                Category: {currentQuestion.category} • Difficulty: {currentQuestion.difficulty}
              </div>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {allAnswers.map((answer, index) => {
                let answerClass = "answer-button";
                if (status === "answer-reveal") {
                  if (answer === currentQuestion.correctAnswer) {
                    answerClass += " correct";
                  } else if (answer === selectedAnswer && answer !== currentQuestion.correctAnswer) {
                    answerClass += " incorrect";
                  }
                } else if (answer === selectedAnswer) {
                  answerClass += " selected";
                }
                
                return (
                  <div 
                    key={index} 
                    className={answerClass}
                    onClick={() => handleAnswerSelect(answer)}
                  >
                    <div className="font-medium">{answer}</div>
                  </div>
                );
              })}
            </div>
            
            {status === "answer-reveal" && (
              <div className="mt-6 trivia-card">
                <h3 className="font-bold mb-2">Explanation:</h3>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
        );
        
      case "finished":
        return (
          <div className="trivia-card max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Game Completed!</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Final Leaderboard</h3>
              
              {players
                .sort((a, b) => b.score - a.score)
                .map((player, index) => (
                  <div 
                    key={player.id} 
                    className={`flex justify-between items-center p-3 mb-2 rounded-lg ${
                      player.username === username ? "bg-trivia-primary/20" : "bg-trivia-background/50"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="font-bold mr-3">{index + 1}.</span>
                      <span>{player.username} {player.username === username && "(You)"}</span>
                    </div>
                    <div className="font-bold">{player.score}</div>
                  </div>
                ))
              }
            </div>
            
            <div className="flex justify-center">
              <Button 
                className="trivia-button"
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavigation />
      
      <main className="flex-1 py-8">
        <div className="container px-4 mx-auto">
          {renderGameContent()}
        </div>
      </main>
    </div>
  );
};

export default Game;
