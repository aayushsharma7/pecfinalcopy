"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trophy, Crown, Medal } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LeaderboardViewProps {
  onBack: () => void
}

interface LeaderboardEntry {
  id: string
  username: string
  avatar: string | null
  gamesWon: number
  gamesPlayed: number
}

export function LeaderboardView({ onBack }: LeaderboardViewProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/leaderboard")
        const data = await res.json()
        if (data.leaderboard) {
          setLeaderboard(data.leaderboard)
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col items-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="stars-bg absolute inset-0 opacity-50"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-muted-foreground hover:text-primary hover:bg-primary/10 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-4xl font-bold gold-gradient-text font-serif text-center flex-1 mr-20">
            Hall of Legends
          </h1>
        </div>

        {/* Leaderboard List */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 border-primary/20 min-h-[60vh]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-primary/80 animate-pulse">Summoning the scrolls...</p>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Trophy className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>No legends have risen yet. Be the first!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {leaderboard.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl border transition-all hover:scale-[1.01]",
                    index === 0 ? "bg-gradient-to-r from-amber-500/20 to-yellow-600/20 border-amber-500/50 shadow-lg shadow-amber-500/10" :
                    index === 1 ? "bg-gradient-to-r from-slate-400/20 to-slate-500/20 border-slate-400/50" :
                    index === 2 ? "bg-gradient-to-r from-orange-700/20 to-orange-800/20 border-orange-700/50" :
                    "bg-black/20 border-white/5 hover:border-primary/30"
                  )}
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex-shrink-0 w-12 text-center">
                      {index === 0 ? <Crown className="w-8 h-8 text-amber-400 mx-auto animate-float" /> :
                       index === 1 ? <Medal className="w-8 h-8 text-slate-300 mx-auto" /> :
                       index === 2 ? <Medal className="w-8 h-8 text-orange-400 mx-auto" /> :
                       <span className="text-xl font-bold text-muted-foreground">#{index + 1}</span>
                      }
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-inner",
                        index === 0 ? "bg-amber-500 text-black ring-2 ring-amber-300" :
                        "bg-slate-800 text-slate-200"
                      )}>
                        {entry.avatar ? (
                          <img src={entry.avatar} alt={entry.username} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          entry.username.substring(0, 2).toUpperCase()
                        )}
                      </div>
                      <div>
                        <h3 className={cn(
                          "font-bold text-lg",
                          index === 0 ? "text-amber-400" : "text-foreground"
                        )}>
                          {entry.username}
                        </h3>
                        <p className="text-xs text-muted-foreground">{entry.gamesPlayed} journeys completed</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold font-mono text-primary">
                      {entry.gamesWon}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Victories</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
