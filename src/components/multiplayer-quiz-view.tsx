"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Timer, Users } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { HangingLantern } from "@/components/hanging-lantern"
import { questionPool } from "@/lib/data"

interface Player {
  id: string
  name: string
  score: number
  avatar?: string
}

interface MultiplayerQuizViewProps {
  socket: any
  roomId: string
  players: Player[]
  onComplete: (score: number) => void
}

export function MultiplayerQuizView({ socket, roomId, players, onComplete }: MultiplayerQuizViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [score, setScore] = useState(0)
  const [waitingForOthers, setWaitingForOthers] = useState(false)

  // Use a subset of questions for multiplayer for now, or sync questions via socket
  // Ideally, the server sends the questions. For MVP, we'll use a fixed set from the pool.
  // Let's pick 5 random questions or just the first 5.
  // To ensure all players have same questions, we should seed it or server should send indices.
  // For this MVP, let's use the first 5 questions of level 1.
  const questions = questionPool.slice(0, 5)
  const currentQuestion = questions[currentQuestionIndex]

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnswered && !waitingForOthers && timeLeft > 0) {
        setTimeLeft((prev) => prev - 1)
      } else if (timeLeft === 0 && !isAnswered) {
        handleAnswer(-1) // Timeout
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, isAnswered, waitingForOthers])

  useEffect(() => {
    if (socket) {
      socket.on("next_question", () => {
        setWaitingForOthers(false)
        setIsAnswered(false)
        setSelectedOption(null)
        setTimeLeft(15)
        setCurrentQuestionIndex((prev) => prev + 1)
      })

      socket.on("game_over", ({ finalScore }: { finalScore: number }) => {
        onComplete(score) // Or use server score
      })
    }
  }, [socket, score, onComplete])

  const handleAnswer = (index: number) => {
    if (isAnswered) return

    setSelectedOption(index)
    setIsAnswered(true)
    setWaitingForOthers(true)

    let points = 0
    if (index === currentQuestion.correctAnswer) {
      points = 100 + timeLeft * 2 // Bonus for speed
      setScore((prev) => prev + points)
    }

    socket.emit("submit_answer", {
      roomId,
      answerIndex: index,
      timeTaken: 15 - timeLeft,
    })
    
    socket.emit("update_score", {
        roomId,
        score: score + points
    })

    // For MVP, if it's the last question, we might just finish locally or wait for server
    if (currentQuestionIndex >= questions.length - 1) {
      setTimeout(() => {
        onComplete(score + points)
      }, 2000)
    } else {
        // In a real synchronized game, we'd wait for server to send "next_question"
        // For this MVP, let's just move to next question after a delay to simulate sync
        // or wait for the server if we implemented that logic.
        // Since server logic is simple, let's auto-advance for now to keep it playable without full server sync logic
        setTimeout(() => {
            setWaitingForOthers(false)
            setIsAnswered(false)
            setSelectedOption(null)
            setTimeLeft(15)
            setCurrentQuestionIndex((prev) => prev + 1)
        }, 3000)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="stars-bg absolute inset-0 opacity-50"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow delay-700"></div>
      </div>

      {/* Hanging Lanterns */}
      <div className="absolute top-0 left-4 md:left-16 z-20 animate-swing origin-top">
        <div className="h-16 md:h-24 w-0.5 bg-amber-500/50 mx-auto"></div>
        <HangingLantern className="w-10 h-14 md:w-12 md:h-16 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]" />
      </div>
      <div 
        className="absolute top-0 right-4 md:right-16 z-20 animate-swing origin-top"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="h-14 md:h-20 w-0.5 bg-amber-500/50 mx-auto"></div>
        <HangingLantern className="w-8 h-12 md:w-10 md:h-14 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]" />
      </div>

      <div className="w-full max-w-6xl z-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar with players */}
        <Card className="lg:col-span-1 glass-panel border-primary/20 h-fit sticky top-4 shadow-2xl backdrop-blur-xl">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center space-x-2 text-primary mb-2 border-b border-primary/10 pb-4">
              <Users className="h-5 w-5" />
              <span className="font-bold font-serif text-lg">Caravan</span>
            </div>
            <div className="space-y-3">
              {players.map((player) => (
                <div key={player.id} className="flex justify-between items-center p-3 rounded-xl bg-black/20 border border-white/5 hover:border-primary/20 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center font-bold text-black text-xs shadow-md shadow-amber-500/10 overflow-hidden">
                        {player.avatar ? (
                            <img src={player.avatar} alt={player.name} className="h-full w-full object-cover" />
                        ) : (
                            player.name.substring(0, 2).toUpperCase()
                        )}
                    </div>
                    <span className="text-foreground font-medium truncate max-w-[80px]">{player.name}</span>
                  </div>
                  <span className="font-mono font-bold text-primary">{player.score}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Quiz Area */}
        <div className="lg:col-span-3 space-y-8">
          <div className="flex justify-between items-center glass-panel p-4 rounded-2xl border-primary/20 shadow-lg backdrop-blur-xl">
            <div className="text-muted-foreground font-medium">
              Question <span className="text-primary font-bold">{currentQuestionIndex + 1}</span> of {questions.length}
            </div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${timeLeft < 5 ? "bg-destructive/10 border-destructive text-destructive animate-pulse" : "bg-primary/10 border-primary/30 text-primary"}`}>
              <Timer className="h-5 w-5" />
              <span className="font-mono font-bold text-lg">
                {timeLeft}s
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Card className="glass-panel border-primary/20 shadow-2xl overflow-hidden backdrop-blur-xl">
                <CardContent className="p-8 md:p-12">
                  <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-10 leading-tight font-serif text-center">
                    {currentQuestion.question}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className={`h-auto py-6 px-6 justify-start text-left text-lg border-white/10 hover:border-primary/50 transition-all duration-300 rounded-xl group ${
                          selectedOption === index
                            ? "bg-primary text-black border-primary hover:bg-primary hover:text-black shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                            : "text-slate-300 bg-black/20 hover:bg-black/40"
                        } ${isAnswered && index !== selectedOption ? "opacity-40 grayscale" : ""}`}
                        onClick={() => handleAnswer(index)}
                        disabled={isAnswered}
                      >
                        <span className={`mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-bold transition-colors ${
                          selectedOption === index 
                            ? "border-black text-black" 
                            : "border-white/20 text-white/50 group-hover:border-primary/50 group-hover:text-primary"
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="font-medium">{option}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {waitingForOthers && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10 animate-pulse"
                >
                  <p className="text-primary font-medium">Waiting for other travelers to decide...</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
