
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Users, User, Home, Menu, X } from "lucide-react";

const MainNavigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home", icon: <Home className="mr-2 h-4 w-4" /> },
    { path: "/lobby", label: "Lobby", icon: <Users className="mr-2 h-4 w-4" /> },
    { path: "/leaderboard", label: "Leaderboard", icon: <Trophy className="mr-2 h-4 w-4" /> },
    { path: "/profile", label: "Profile", icon: <User className="mr-2 h-4 w-4" /> },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-trivia-card border-b border-purple-800/30 text-trivia-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center font-bold text-xl text-transparent bg-clip-text trivia-gradient-bg"
            >
              TriviaCraft
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant={location.pathname === link.path ? "default" : "ghost"}
                  className={location.pathname === link.path 
                    ? "bg-trivia-primary hover:bg-trivia-primary/90" 
                    : "hover:bg-trivia-primary/10"
                  }
                >
                  {link.icon}
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex md:hidden items-center">
            <Button 
              variant="ghost" 
              className="inline-flex items-center justify-center p-2"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-trivia-card border-t border-purple-800/30">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`${
                  location.pathname === link.path
                    ? "bg-trivia-primary/20 text-white"
                    : "hover:bg-trivia-primary/10"
                } block px-3 py-2 rounded-md text-base font-medium flex items-center`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainNavigation;
