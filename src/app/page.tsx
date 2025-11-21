"use client"
import { useState, useEffect } from "react"
import { LandingView } from "@/components/landing-view"
import { Button } from "@/components/ui/button"
import { LevelSelectionView } from "@/components/level-selection-view"
import SignupView from "@/components/signup-view"
import { QuizView } from "@/components/quiz-view"
import { ResultView } from "@/components/result-view"
import LoginView from "@/components/login-view"
import { LeaderboardView } from "@/components/leaderboard-view"
import { MultiplayerView } from "@/components/multiplayer-view"
import { LobbyView } from "@/components/lobby-view"
import { MultiplayerQuizView } from "@/components/multiplayer-quiz-view"
import { MultiplayerResultView } from "@/components/multiplayer-result-view"
import UserProfileView from "@/components/user-profile-view"
import { questionPool, type Question } from "@/lib/data"
import io from "socket.io-client"

type GameState = "landing" | "login" | "signup" | "levels" | "quiz" | "result" | "leaderboard" | "multiplayer_menu" | "lobby" | "multiplayer_quiz" | "multiplayer_result" | "profile"

let socket: any

export default function Page() {
  const [gameState, setGameState] = useState<GameState>("landing")
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([])
  const [score, setScore] = useState(0)
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Question[]>([])
  const [userAnswers, setUserAnswers] = useState<{ questionId: number; selectedOption: number | null }[]>([])
  const [username, setUsername] = useState("")
  const [userAvatar, setUserAvatar] = useState<string | undefined>(undefined)

  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([1])
  const [currentLevel, setCurrentLevel] = useState<number>(1)

  // Multiplayer state
  const [roomId, setRoomId] = useState("")
  const [players, setPlayers] = useState<{ id: string; name: string; score: number; avatar?: string }[]>([])
  const [isHost, setIsHost] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem("vizier_user")
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setUsername(user.name)
    }
    // Fetch full profile to get avatar
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/auth/me")
      const data = await res.json()
      if (data.user) {
        setUsername(data.user.username)
        setUserAvatar(data.user.avatar || undefined)
      }
    } catch (error) {
      console.error("Failed to fetch profile", error)
    }
  }

  useEffect(() => {
    if (gameState === "multiplayer_menu" && !socket) {
        socketInitializer()
    }
  }, [gameState])

  const socketInitializer = async () => {
    await fetch("/api/socket")
    socket = io()

    socket.on("connect", () => {
      console.log("connected")
    })

    socket.on("room_created", ({ roomId }: { roomId: string }) => {
      setRoomId(roomId)
      setIsHost(true)
      setGameState("lobby")
    })

    socket.on("room_joined", ({ roomId }: { roomId: string }) => {
      setRoomId(roomId)
      setIsHost(false)
      setGameState("lobby")
    })

    socket.on("update_players", (updatedPlayers: any) => {
      setPlayers(updatedPlayers)
    })

    socket.on("game_started", () => {
      setGameState("multiplayer_quiz")
    })
    
    socket.on("error", ({ message }: { message: string }) => {
        alert(message)
    })
  }

  const goToLogin = () => {
    if (username) {
      setGameState("levels")
    } else {
      setGameState("login")
    }
  }

  const goToSignup = () => {
    setGameState("signup")
  }

  const handleLogin = (name: string) => {
    setUsername(name)
    fetchProfile() // Fetch avatar after login
    setGameState("levels")
  }

  const handleSignupSuccess = (name: string) => {
    setUsername(name)
    fetchProfile()
    setGameState("levels")
  }

  const handleLogout = () => {
    localStorage.removeItem("vizier_user")
    setUsername("")
    setUserAvatar(undefined)
    // Also call logout API
    fetch("/api/auth/logout").catch(console.error)
    setGameState("landing")
  }

  const goToLevels = () => {
    setGameState("levels")
  }

  const goToLeaderboard = () => {
    setGameState("leaderboard")
  }

  const goToProfile = () => {
    setGameState("profile")
  }

  const goToMultiplayer = () => {
    setGameState("multiplayer_menu")
  }

  const startLevel = (levelId: number) => {
    setCurrentLevel(levelId)
    const startIndex = (levelId - 1) * 7
    const levelQuestions = questionPool.slice(startIndex, startIndex + 7)

    setCurrentQuestions(levelQuestions)
    setScore(0)
    setBookmarkedQuestions([])
    setUserAnswers([])
    setGameState("quiz")
  }

  const handleQuizComplete = (
    finalScore: number,
    bookmarks: Question[],
    answers: { questionId: number; selectedOption: number | null }[],
  ) => {
    setScore(finalScore)
    setBookmarkedQuestions(bookmarks)
    setUserAnswers(answers)

    if (currentLevel < 4 && !unlockedLevels.includes(currentLevel + 1)) {
      setUnlockedLevels([...unlockedLevels, currentLevel + 1])
    }

    setGameState("result")
  }

  const goHome = () => {
    setGameState("landing")
    if (socket) {
        socket.disconnect()
        socket = null
    }
  }

  const handleNextChapter = () => {
    if (currentLevel < 4) {
      startLevel(currentLevel + 1)
    }
  }

  // Multiplayer handlers
  const handleCreateRoom = (name: string) => {
    setUsername(name)
    socket.emit("create_room", { username: name, avatar: userAvatar })
  }

  const handleJoinRoom = (rId: string, name: string) => {
    setUsername(name)
    socket.emit("join_room", { roomId: rId, username: name, avatar: userAvatar })
  }

  const handleStartMultiplayerGame = () => {
    socket.emit("start_game", { roomId })
  }

  const handleMultiplayerComplete = (finalScore: number) => {
      setScore(finalScore)
      setGameState("multiplayer_result")
  }

  const handlePlayAgain = () => {
      // Reset multiplayer state and return to lobby
      setGameState("lobby")
  }

  const handleLeaveLobby = () => {
      if (socket) {
          socket.emit("leave_room", { roomId })
          socket.disconnect()
      }
      setRoomId("")
      setPlayers([])
      setIsHost(false)
      goHome()
  }

  return (
    <main className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black overflow-hidden relative">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/10 rounded-full blur-[100px]"></div>
      </div>

      {gameState === "landing" && (
        <LandingView 
          onStart={goToLogin} 
          onLeaderboard={goToLeaderboard} 
          onMultiplayer={goToMultiplayer}
          onProfile={goToProfile}
        />
      )}

      {gameState === "login" && (
        <LoginView 
          onLogin={handleLogin} 
          onBack={goHome} 
          onSignup={goToSignup} 
        />
      )}

      {gameState === "signup" && (
        <SignupView 
          onSignupSuccess={handleSignupSuccess} 
          onBack={goHome} 
          onLogin={goToLogin} 
        />
      )}

      {gameState === "leaderboard" && <LeaderboardView onBack={goHome} />}

      {gameState === "profile" && (
        <div className="relative z-10 pt-20">
           <Button
            variant="outline"
            onClick={goHome}
            className="fixed top-4 left-4 z-20 border-amber-500/50 text-amber-100 hover:bg-amber-500/20 hover:text-white hover:border-amber-400 gap-2"
          >
            Back
          </Button>
          <UserProfileView />
        </div>
      )}

      {gameState === "levels" && (
        <LevelSelectionView
          unlockedLevels={unlockedLevels}
          onSelectLevel={startLevel}
          onBack={goHome}
          onLogout={handleLogout}
          onProfile={goToProfile}
        />
      )}

      {gameState === "quiz" && (
        <QuizView questions={currentQuestions} onComplete={handleQuizComplete} onExit={goToLevels} />
      )}

      {gameState === "result" && (
        <ResultView
          score={score}
          totalQuestions={currentQuestions.length}
          bookmarkedQuestions={bookmarkedQuestions}
          userAnswers={userAnswers}
          questions={currentQuestions}
          onRestart={() => startLevel(currentLevel)}
          onHome={goToLevels}
          onLeaderboard={goToLeaderboard}
          onNextChapter={currentLevel < 4 ? handleNextChapter : undefined}
          chapterId={currentLevel}
        />
      )}

      {gameState === "multiplayer_menu" && (
        <MultiplayerView
          onBack={goHome}
          onCreateRoom={handleCreateRoom}
          onJoinRoom={handleJoinRoom}
          username={username}
          userAvatar={userAvatar}
        />
      )}

      {gameState === "lobby" && (
        <LobbyView
          roomId={roomId}
          players={players}
          isHost={isHost}
          onStartGame={handleStartMultiplayerGame}
          onLeave={goHome}
        />
      )}

      {gameState === "multiplayer_quiz" && (
        <MultiplayerQuizView
          socket={socket}
          roomId={roomId}
          players={players}
          onComplete={handleMultiplayerComplete}
        />
      )}

      {gameState === "multiplayer_result" && socket && (
        <MultiplayerResultView
          players={players}
          currentPlayerId={socket.id}
          onPlayAgain={handlePlayAgain}
          onLeave={handleLeaveLobby}
        />
      )}
    </main>
  )
}
