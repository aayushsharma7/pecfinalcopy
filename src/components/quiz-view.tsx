"use client"

import { useState, useEffect, useRef } from "react"
import type { Question } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Lamp, Star, ChevronRight, XCircle, CheckCircle2, Flame, Bookmark, Timer, Coins, Sparkles } from "lucide-react"
import Image from "next/image"
import { HangingLantern } from "@/components/hanging-lantern"

interface QuizViewProps {
  questions: Question[]
  onComplete: (
    score: number,
    bookmarkedQuestions: Question[],
    userAnswers: { questionId: number; selectedOption: number | null }[],
  ) => void
  onExit: () => void
}

export function QuizView({ questions, onComplete, onExit }: QuizViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showWisdom, setShowWisdom] = useState(false)
  const [streak, setStreak] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set())
  const [userAnswers, setUserAnswers] = useState<{ questionId: number; selectedOption: number | null }[]>([])
  const [timeLeft, setTimeLeft] = useState(20)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [genieEmotion, setGenieEmotion] = useState<"idle" | "happy" | "sad" | "thinking">("idle")
  const [stars, setStars] = useState<{ top: string; left: string; size: number; opacity: number }[]>([])

  const currentQuestion = questions[currentIndex]

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
    if (isAnswered) return
    setGenieEmotion("thinking")

    setTimeLeft(20)
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [currentIndex, isAnswered])

  const handleTimeout = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setIsAnswered(true)
    setStreak(0)
    setGenieEmotion("sad")
    setUserAnswers((prev) => [...prev, { questionId: currentQuestion.id, selectedOption: null }])
    setTimeout(() => setShowWisdom(true), 400)
  }

  useEffect(() => {
    setShowHint(false)
    setGenieEmotion("idle")
  }, [currentIndex])

  const handleOptionClick = (index: number) => {
    if (isAnswered) return
    if (timerRef.current) clearInterval(timerRef.current)

    setSelectedOption(index)
    setIsAnswered(true)

    setUserAnswers((prev) => [...prev, { questionId: currentQuestion.id, selectedOption: index }])

    if (index === currentQuestion.correctAnswer) {
      let questionScore = Math.max(0, Math.floor(100 * (timeLeft / 20)))

      if (showHint) {
        questionScore = Math.max(0, questionScore - 30)
      }

      setScore((prev) => prev + questionScore)
      setStreak((prev) => prev + 1)
      setGenieEmotion("happy")
    } else {
      setStreak(0)
      setGenieEmotion("sad")
    }

    setTimeout(() => setShowWisdom(true), 400)
  }

  const toggleBookmark = () => {
    setBookmarkedIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(currentQuestion.id)) {
        newSet.delete(currentQuestion.id)
      } else {
        newSet.add(currentQuestion.id)
      }
      return newSet
    })
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedOption(null)
      setIsAnswered(false)
      setShowWisdom(false)
    } else {
      const bookmarkedQuestions = questions.filter((q) => bookmarkedIds.has(q.id))
      onComplete(score, bookmarkedQuestions, userAnswers)
    }
  }

  const progress = ((currentIndex + 1) / questions.length) * 100
  const isBookmarked = bookmarkedIds.has(currentQuestion.id)

  const getGenieImage = () => {
    switch (genieEmotion) {
      case "happy":
        return "/happy-genie-character-celebrating-3d-cartoon.jpg"
      case "sad":
        return "/sad-genie-character-sympathetic-3d-cartoon.jpg"
      case "thinking":
        return "/thinking-genie-character-pondering-3d-cartoon.jpg"
      default:
        return "/friendly-blue-genie-character-floating-3d-cartoon.jpg"
    }
  }

  return (
    <div className="flex flex-col min-h-screen w-full max-w-6xl mx-auto p-3 md:p-6 relative z-10 animate-fade-in">
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

      <div className="fixed top-0 left-4 md:left-20 z-0 animate-swing origin-top hidden sm:block">
        <div className="h-16 md:h-32 w-0.5 bg-amber-500/50 mx-auto"></div>
        <HangingLantern className="w-12 h-16 md:w-16 md:h-24 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]" />
      </div>
      <div
        className="fixed top-0 right-4 md:right-20 z-0 animate-swing origin-top hidden sm:block"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="h-12 md:h-24 w-0.5 bg-amber-500/50 mx-auto"></div>
        <HangingLantern className="w-10 h-14 md:w-14 md:h-20 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]" />
      </div>

      <div className="fixed bottom-20 left-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="fixed bottom-20 left-10 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 md:mb-8 glass-panel p-4 rounded-xl relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]" />
        <div className="flex w-full md:w-auto justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={onExit}
            className="border-amber-500/50 text-amber-100 hover:bg-amber-500/20 hover:text-white hover:border-amber-400 z-10 transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.1)] bg-transparent"
          >
            Exit Journey
          </Button>

          {/* Mobile-only question counter */}
          <div className="md:hidden flex items-center gap-2">
            <span className="font-serif text-amber-400 font-bold">
              {currentIndex + 1} <span className="text-slate-600 text-sm">/ {questions.length}</span>
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 z-10">
          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-400 uppercase tracking-wider">Question</span>
            <span className="font-serif text-amber-400 font-bold text-lg">
              {currentIndex + 1} <span className="text-slate-600 text-sm">/ {questions.length}</span>
            </span>
          </div>
          <div className="relative">
            <Lamp className="w-6 h-6 text-amber-500" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-ping" />
          </div>
        </div>
      </header>

      <div className="w-full h-1 bg-slate-800 rounded-full mb-6 md:mb-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-6 md:gap-8 items-start">
        <div className="glass-panel p-4 md:p-8 rounded-2xl border-t border-white/5 relative overflow-hidden min-h-[400px] flex flex-col order-2 md:order-1">
          <div className="flex flex-wrap justify-between items-start mb-6 gap-3">
            <div
              className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
                currentQuestion.difficulty === "Easy" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                currentQuestion.difficulty === "Medium" && "bg-amber-500/10 text-amber-400 border-amber-500/20",
                currentQuestion.difficulty === "Hard" && "bg-rose-500/10 text-rose-400 border-rose-500/20",
              )}
            >
              <Star className="w-3 h-3 mr-1.5 fill-current" />
              {currentQuestion.difficulty}
            </div>
            <div className="flex gap-2 ml-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleBookmark}
                className={cn(
                  "hover:bg-amber-500/10 transition-all",
                  isBookmarked ? "text-amber-400" : "text-slate-500 hover:text-amber-400",
                )}
                title="Bookmark Question"
              >
                <Bookmark className={cn("w-4 h-4", isBookmarked && "fill-current")} />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHint(true)}
                disabled={showHint || isAnswered}
                className={cn(
                  "border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-400 transition-all relative overflow-hidden group text-xs md:text-sm",
                  showHint ? "opacity-50 cursor-not-allowed text-amber-400" : "text-amber-500",
                )}
                title="Rub the Lamp for a hint (-30 points)"
              >
                <div className="absolute inset-0 bg-amber-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Lamp className={cn("w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2", !showHint && "animate-pulse")} />
                {showHint ? "Summoned" : "Rub Lamp (-30)"}
              </Button>
            </div>
          </div>

          <h2 className="font-serif text-xl md:text-3xl text-slate-100 leading-relaxed mb-6 md:mb-8 flex-grow">
            {currentQuestion.question}
          </h2>

          {showHint && (
            <div className="mb-6 p-4 bg-amber-950/30 border border-amber-500/20 rounded-xl animate-fade-in relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-50" />
              <p className="text-amber-200 text-sm flex items-start gap-2 relative z-10">
                <span className="text-2xl mr-2 animate-bounce">🧞‍♂️</span>
                <span className="italic mt-1">"Master, I grant you this wisdom: {currentQuestion.hint}"</span>
              </p>
            </div>
          )}

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOption === index
              const isCorrect = index === currentQuestion.correctAnswer
              const showCorrect = isAnswered && isCorrect
              const showWrong = isAnswered && isSelected && !isCorrect

              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  disabled={isAnswered}
                  className={cn(
                    "w-full text-left p-3 md:p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group relative overflow-hidden",
                    !isAnswered && "bg-slate-800/50 border-slate-700 hover:border-amber-500/50 hover:bg-slate-800",
                    showCorrect &&
                      "bg-emerald-950/40 border-emerald-500/50 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.1)] animate-pop",
                    showWrong && "bg-rose-950/40 border-rose-500/50 text-rose-100 animate-shake",
                    isAnswered && !showCorrect && !showWrong && "opacity-50 grayscale",
                  )}
                >
                  <span className="text-base md:text-lg relative z-10">{option}</span>
                  {showCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 relative z-10 flex-shrink-0 ml-2" />
                  )}
                  {showWrong && <XCircle className="w-5 h-5 text-rose-400 relative z-10 flex-shrink-0 ml-2" />}
                  {!isAnswered && (
                    <div className="absolute left-0 top-0 h-full w-1 bg-slate-600 group-hover:bg-amber-500 transition-colors" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div className="relative flex flex-col items-center order-1 md:order-2 w-full">
          <div className="relative w-full aspect-square max-w-[200px] md:max-w-[300px] mx-auto mb-4 animate-float">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />

            <Image
              src={getGenieImage() || "/placeholder.svg"}
              alt="Genie Companion"
              width={400}
              height={400}
              className="object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            />

            <Sparkles
              className="absolute top-10 right-10 text-yellow-300 w-6 h-6 animate-sparkle"
              style={{ animationDelay: "0.5s" }}
            />
            <Sparkles
              className="absolute bottom-20 left-10 text-blue-300 w-4 h-4 animate-sparkle"
              style={{ animationDelay: "1.2s" }}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3 w-full mb-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-amber-950/30 rounded-full border border-amber-500/20 z-10 text-sm md:text-base">
              <Coins className="w-3 h-3 md:w-4 md:h-4 text-amber-400" />
              <span className="font-bold text-amber-100">{score} Pts</span>
            </div>

            <div
              className={cn(
                "flex items-center gap-2 px-3 py-1 rounded-full border transition-all duration-300 text-sm md:text-base",
                timeLeft <= 5
                  ? "bg-rose-950/50 border-rose-500/50 text-rose-400 animate-pulse"
                  : "bg-slate-900/50 border-slate-700 text-slate-300",
              )}
            >
              <Timer className="w-3 h-3 md:w-4 md:h-4" />
              <span className="font-mono font-bold">{timeLeft}s</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 bg-amber-950/30 rounded-full border border-amber-500/20 z-10 text-sm md:text-base">
              <Flame
                className={cn("w-3 h-3 md:w-4 md:h-4", streak > 2 ? "text-orange-500 animate-pulse" : "text-slate-500")}
              />
              <span className={cn("font-bold", streak > 2 ? "text-orange-400" : "text-slate-400")}>
                Streak: {streak}
              </span>
            </div>
          </div>

          <div className="w-full">
            {showWisdom ? (
              <div className="glass-card p-6 rounded-xl border-l-4 border-l-amber-500 animate-slide-up relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-amber-500/10 rounded-full blur-xl" />
                <h3 className="font-serif text-amber-400 text-lg mb-2 flex items-center gap-2">
                  <Lamp className="w-4 h-4" />
                  Ancient Wisdom
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed italic">"{currentQuestion.explanation}"</p>
                <div className="mt-6 pt-4 border-t border-white/5">
                  <Button onClick={handleNext} className="w-full group bg-amber-600 hover:bg-amber-500 text-white">
                    {currentIndex < questions.length - 1 ? "Next Tale" : "Finish Journey"}
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="glass-panel p-4 rounded-xl text-center border border-dashed border-slate-700/50 bg-slate-900/30 hidden md:block">
                <p className="text-slate-400 text-sm italic">
                  {genieEmotion === "thinking"
                    ? "The Genie awaits your wisdom..."
                    : "Rub the lamp if you seek guidance!"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
