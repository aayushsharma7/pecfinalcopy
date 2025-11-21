"use client"

import { motion } from "framer-motion"
import { Lock, Map, Scroll, Star, Trophy, ChevronLeft, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { HangingLantern } from "@/components/hanging-lantern"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface LevelSelectionViewProps {
  unlockedLevels: number[]
  onSelectLevel: (level: number) => void
  onBack: () => void
  onLogout?: () => void
  onProfile: () => void
}

export function LevelSelectionView({ unlockedLevels, onSelectLevel, onBack, onLogout, onProfile }: LevelSelectionViewProps) {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 z-10 relative">
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

      <div className="fixed top-0 left-10 md:left-40 z-0 animate-swing origin-top hidden md:block">
        <div className="h-24 md:h-48 w-0.5 bg-amber-500/50 mx-auto"></div>
        <HangingLantern className="w-16 h-24 md:w-20 md:h-32 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]" />
      </div>
      <div
        className="fixed top-0 right-10 md:right-40 z-0 animate-swing origin-top hidden md:block"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="h-16 md:h-32 w-0.5 bg-amber-500/50 mx-auto"></div>
        <HangingLantern className="w-14 h-20 md:w-16 md:h-24 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 relative z-10 w-full max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-between mb-6 px-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="border-amber-500/50 text-amber-100 hover:bg-amber-500/20 hover:text-white hover:border-amber-400 gap-2 transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.1)] bg-transparent"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onProfile}
              className="border-amber-500/50 text-amber-100 hover:bg-amber-500/20 hover:text-white hover:border-amber-400 gap-2 transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.1)] bg-transparent"
            >
              <User className="w-5 h-5" />
              Profile
            </Button>

            {onLogout && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-amber-500/50 text-amber-100 hover:bg-amber-500/20 hover:text-white hover:border-amber-400 gap-2 transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.1)] bg-transparent"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-slate-900 border-amber-500/30 text-slate-100">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-amber-400 font-serif text-xl">
                      Depart from the Journey?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-300">
                      Are you sure that you want to log out? Your current progress in this session will be saved, but you
                      will leave the magical realm.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={onLogout}
                      className="bg-amber-600 text-white hover:bg-amber-500 border-none"
                    >
                      Yes, Log Out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>

        <h2 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] mb-4">
          Choose Your Path
        </h2>
        <p className="text-amber-100/80 text-lg max-w-md mx-auto">
          Unlock the chapters of the Arabian Nights one by one.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {levels.map((level, index) => {
          const isUnlocked = unlockedLevels.includes(level.id)
          const Icon = level.icon

          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => isUnlocked && onSelectLevel(level.id)}
                disabled={!isUnlocked}
                className={`w-full h-full relative group overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                  isUnlocked
                    ? "border-amber-500/30 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(251,191,36,0.2)] cursor-pointer"
                    : "border-slate-700 bg-slate-900/50 cursor-not-allowed opacity-70"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    isUnlocked ? level.color : "from-slate-800 to-slate-900"
                  } opacity-20 group-hover:opacity-30 transition-opacity`}
                />

                <div className="relative p-6 flex items-start gap-4 text-left h-full">
                  <div
                    className={`p-3 rounded-xl ${
                      isUnlocked
                        ? "bg-gradient-to-br from-amber-400/20 to-amber-600/20 text-amber-300"
                        : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {isUnlocked ? <Icon className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h3
                        className={`text-xl font-bold font-serif ${isUnlocked ? "text-amber-100" : "text-slate-400"}`}
                      >
                        {level.title}
                      </h3>
                      {isUnlocked && (
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Part {level.id}
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${isUnlocked ? "text-amber-100/70" : "text-slate-500"}`}>
                      {level.description}
                    </p>
                  </div>
                </div>
              </button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

const levels = [
  {
    id: 1,
    title: "The Merchant's Tales",
    description: "Begin your journey in the bustling bazaars.",
    icon: Scroll,
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 2,
    title: "The Seven Voyages",
    description: "Brave the high seas and mythical monsters.",
    icon: Map,
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: 3,
    title: "The Cave of Wonders",
    description: "Seek the hidden treasures of the ancients.",
    icon: Star,
    color: "from-purple-500 to-pink-600",
  },
  {
    id: 4,
    title: "The Sultan's Palace",
    description: "Prove your wisdom to the royal court.",
    icon: Trophy,
    color: "from-emerald-500 to-teal-600",
  },
]
