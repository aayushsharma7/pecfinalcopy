"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Trophy, Bookmark, Crown, CheckCircle2, XCircle, Eye, Map, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Question } from "@/lib/data"

interface ResultViewProps {
  score: number
  totalQuestions: number
  bookmarkedQuestions: Question[]
  userAnswers: { questionId: number; selectedOption: number | null }[]
  questions: Question[]
  onRestart: () => void
  onHome: () => void
  onLeaderboard: () => void
  onNextChapter?: () => void
  chapterId?: number
}

export function ResultView({
  score,
  totalQuestions,
  bookmarkedQuestions,
  userAnswers,
  questions,
  onRestart,
  onHome,
  onLeaderboard,
  onNextChapter,
  chapterId = 1,
}: ResultViewProps) {
  const maxPossibleScore = totalQuestions * 100
  const percentage = Math.round((score / maxPossibleScore) * 100)
  const [showReview, setShowReview] = useState(false)
  const [liveLeaderboard, setLiveLeaderboard] = useState([
    { name: "Scheherazade", score: 2000, avatar: "bg-amber-500", current: false, isBot: true },
    { name: "Sinbad", score: 1800, avatar: "bg-emerald-500", current: false, isBot: true },
    { name: "Aladdin", score: 1500, avatar: "bg-purple-500", current: false, isBot: true },
    { name: "Ali Baba", score: 1200, avatar: "bg-rose-500", current: false, isBot: true },
  ])
  const [stars, setStars] = useState<{ top: string; left: string; size: number; opacity: number }[]>([])

  useEffect(() => {
    const newStars = Array.from({ length: 50 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.7 + 0.3,
    }))
    setStars(newStars)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveLeaderboard((prev) => {
        const newBoard = [...prev]
        const randomBotIndex = Math.floor(Math.random() * newBoard.length)
        if (Math.random() > 0.7) {
          newBoard[randomBotIndex] = {
            ...newBoard[randomBotIndex],
            score: Math.min(maxPossibleScore, newBoard[randomBotIndex].score + 100),
          }
        }
        return newBoard
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [totalQuestions])

  let title = "A Humble Beginning"
  let message = "Every journey begins with a single step. Return to the tales and learn more."
  let colorClass = "text-slate-400"
  let badge = "Novice"

  if (percentage >= 90) {
    title = "Legendary Storyteller"
    message = "Your knowledge rivals that of Scheherazade herself! The spirits are in awe."
    colorClass = "text-amber-400"
    badge = `Master of Chapter ${chapterId}`
  } else if (percentage >= 70) {
    title = "Master of Tales"
    message = "You have traveled far and learned much. A true scholar of the Nights."
    colorClass = "text-emerald-400"
    badge = `Scholar of Chapter ${chapterId}`
  } else if (percentage >= 40) {
    title = "Wandering Adventurer"
    message = "You know the paths well, but many secrets remain hidden in the sands."
    colorClass = "text-blue-400"
    badge = `Traveler of Chapter ${chapterId}`
  }

  const leaderboard = [
    ...liveLeaderboard,
    { name: "You", score: score, avatar: "bg-blue-500", current: true, isBot: false },
  ].sort((a, b) => b.score - a.score)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-6 animate-fade-in relative z-10 overflow-y-auto">
      <div className="fixed inset-0 pointer-events-none z-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse-slow"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="fixed top-0 left-8 md:left-24 z-0 animate-swing origin-top hidden md:block">
        <div className="h-20 md:h-36 w-0.5 bg-amber-500/50 mx-auto"></div>
        <svg
          viewBox="0 0 100 140"
          className="w-14 h-20 md:w-16 md:h-24 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]"
          fill="currentColor"
        >
          <path d="M45 0 H55 V10 H45 Z" fill="#d97706" />
          <path d="M20 30 Q50 5 80 30 L90 40 H10 L20 30 Z" fill="#b45309" />
          <path d="M10 40 H90 L80 100 H20 L10 40 Z" fill="url(#lanternGradient)" stroke="#d97706" strokeWidth="2" />
          <path d="M20 100 L50 130 L80 100 Z" fill="#b45309" />
          <path d="M30 50 H70 L65 90 H35 L30 50 Z" fill="#fffbeb" opacity="0.8" />
          <defs>
            <linearGradient id="lanternGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div
        className="fixed top-0 right-8 md:right-24 z-0 animate-swing origin-top hidden md:block"
        style={{ animationDelay: "0.8s" }}
      >
        <div className="h-16 md:h-28 w-0.5 bg-amber-500/50 mx-auto"></div>
        <svg
          viewBox="0 0 100 140"
          className="w-12 h-16 md:w-14 md:h-20 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]"
          fill="currentColor"
        >
          <path d="M45 0 H55 V10 H45 Z" fill="#d97706" />
          <path d="M20 30 Q50 5 80 30 L90 40 H10 L20 30 Z" fill="#b45309" />
          <path d="M10 40 H90 L80 100 H20 L10 40 Z" fill="url(#lanternGradient)" stroke="#d97706" strokeWidth="2" />
          <path d="M20 100 L50 130 L80 100 Z" fill="#b45309" />
          <path d="M30 50 H70 L65 90 H35 L30 50 Z" fill="#fffbeb" opacity="0.8" />
          <defs>
            <linearGradient id="lanternGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 my-8 relative z-10">
        {/* Score Card */}
        <div className="glass-panel p-6 md:p-8 rounded-2xl flex flex-col items-center gap-6 border-t border-white/10">
          <div className="relative">
            <div
              className={cn(
                "absolute -inset-6 rounded-full blur-2xl opacity-20 animate-pulse-slow",
                percentage >= 80 ? "bg-amber-500" : "bg-blue-500",
              )}
            ></div>
            <Trophy className={cn("w-16 h-16 md:w-20 md:h-20 relative z-10 drop-shadow-2xl", colorClass)} />
          </div>

          <div className="space-y-2 text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-100">Chapter Complete</h2>
            <p className={cn("font-serif text-base md:text-lg font-medium", colorClass)}>{title}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-bold text-slate-300 mt-2">
              <Crown className="w-3 h-3 text-amber-500" />
              Badge Unlocked: {badge}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-center justify-center p-3 md:p-4 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] md:text-xs uppercase tracking-widest mb-1">Total Score</span>
              <div className="flex items-baseline gap-1">
                <span className={cn("text-2xl md:text-3xl font-bold font-serif", colorClass)}>{score}</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-3 md:p-4 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] md:text-xs uppercase tracking-widest mb-1">Accuracy</span>
              <div className="flex items-baseline gap-1">
                <span className={cn("text-2xl md:text-3xl font-bold font-serif", colorClass)}>{percentage}%</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full pt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={onHome}
                variant="outline"
                className="flex-1 bg-transparent border-slate-600 hover:bg-slate-800"
              >
                <Map className="w-4 h-4 mr-2" />
                Return to Map
              </Button>
              <Button
                onClick={onLeaderboard}
                variant="outline"
                className="flex-1 bg-transparent border-slate-600 hover:bg-slate-800"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Leaderboard
              </Button>
            </div>

            {onNextChapter && (
              <Button
                onClick={onNextChapter}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white"
              >
                Next Chapter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>

          <Button
            onClick={() => setShowReview(!showReview)}
            variant="ghost"
            className="w-full text-slate-400 hover:text-amber-400"
          >
            <Eye className="w-4 h-4 mr-2" />
            {showReview ? "Hide Details" : "Review Your Answers"}
          </Button>
        </div>

        <div className="space-y-6">
          {/* Leaderboard */}
          <div className="glass-panel p-6 rounded-2xl border-t border-white/5">
            <h3 className="font-serif text-xl text-amber-400 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Leaderboard
              </div>
              <span className="text-xs font-sans font-normal px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full animate-pulse">
                ● LIVE
              </span>
            </h3>
            <div className="space-y-3">
              {leaderboard.map((entry, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border transition-all duration-500",
                    entry.current
                      ? "bg-amber-500/10 border-amber-500/30 scale-[1.02]"
                      : "bg-slate-800/30 border-slate-700/50",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="font-mono text-slate-500 w-4 text-sm">#{index + 1}</div>
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white",
                        entry.avatar,
                      )}
                    >
                      {entry.name.charAt(0)}
                    </div>
                    <span className={cn("font-medium", entry.current ? "text-amber-200" : "text-slate-300")}>
                      {entry.name}
                    </span>
                  </div>
                  <span className="font-serif font-bold text-slate-200">{entry.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bookmarked Questions */}
          <div className="glass-panel p-6 rounded-2xl border-t border-white/5 h-full overflow-y-auto custom-scrollbar">
            <h3 className="font-serif text-xl text-blue-400 mb-4 flex items-center gap-2">
              <Bookmark className="w-5 h-5" />
              Bookmarked Tales ({bookmarkedQuestions.length})
            </h3>
            {bookmarkedQuestions.length > 0 ? (
              <div className="space-y-3">
                {bookmarkedQuestions.map((q, index) => (
                  <div key={index} className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
                    <p className="text-sm text-slate-300 mb-2">{q.question}</p>
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full border",
                          q.difficulty === "Easy" && "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
                          q.difficulty === "Medium" && "text-amber-400 border-amber-500/20 bg-amber-500/10",
                          q.difficulty === "Hard" && "text-rose-400 border-rose-500/20 bg-rose-500/10",
                        )}
                      >
                        {q.difficulty}
                      </span>
                      <span className="text-emerald-400">Answer: {q.options[q.correctAnswer]}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 flex flex-col items-center justify-center h-40">
                <Bookmark className="w-8 h-8 mx-auto mb-2 opacity-20" />
                <p className="text-sm">No tales bookmarked yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showReview && (
        <div className="w-full max-w-4xl glass-panel p-6 rounded-2xl border-t border-white/5 mb-8 animate-slide-up">
          <h3 className="font-serif text-2xl text-slate-200 mb-6">Journey Review</h3>
          <div className="space-y-4">
            {questions.map((q, index) => {
              const userAnswer = userAnswers.find((a) => a.questionId === q.id)
              const isCorrect = userAnswer?.selectedOption === q.correctAnswer
              const isSkipped = userAnswer?.selectedOption === null || userAnswer?.selectedOption === undefined

              return (
                <div
                  key={q.id}
                  className={cn(
                    "p-4 rounded-xl border",
                    isCorrect ? "bg-emerald-950/20 border-emerald-500/20" : "bg-rose-950/20 border-rose-500/20",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-200 font-medium mb-2">
                        <span className="text-slate-500 mr-2">{index + 1}.</span>
                        {q.question}
                      </p>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div
                          className={cn(
                            "p-2 rounded-lg",
                            isCorrect ? "bg-emerald-500/10 text-emerald-300" : "bg-rose-500/10 text-rose-300",
                          )}
                        >
                          <span className="text-xs opacity-70 block mb-1">Your Answer:</span>
                          {isSkipped ? "Time ran out" : q.options[userAnswer?.selectedOption as number]}
                        </div>
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-300">
                          <span className="text-xs opacity-70 block mb-1">Correct Answer:</span>
                          {q.options[q.correctAnswer]}
                        </div>
                      </div>
                      <p className="mt-3 text-xs text-slate-400 italic border-t border-white/5 pt-2">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
