"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent} from "@/components/ui/card"
import { Trophy, Crown, Medal, Star, Home, RotateCcw } from "lucide-react"
import { motion } from "framer-motion"
import { HangingLantern } from "@/components/hanging-lantern"

interface Player {
  id: string
  name: string
  score: number
  avatar?: string
}

interface MultiplayerResultViewProps {
  players: Player[]
  currentPlayerId: string
  onPlayAgain: () => void
  onLeave: () => void
}

export function MultiplayerResultView({ players, currentPlayerId, onPlayAgain, onLeave }: MultiplayerResultViewProps) {
  // Sort players by score (highest first)
  const rankedPlayers = [...players].sort((a, b) => b.score - a.score)
  const currentPlayerIndex = rankedPlayers.findIndex(p => p.id === currentPlayerId)
  const currentPlayer = rankedPlayers[currentPlayerIndex]
  
  // Determine win/loss/tie status
  const topScore = rankedPlayers[0]?.score || 0
  const isWinner = currentPlayerIndex === 0
  const isTie = rankedPlayers.filter(p => p.score === topScore).length > 1 && currentPlayer?.score === topScore
  
  let statusTitle = "Good Try!"
  let statusMessage = "Keep practicing and you'll reach the top!"
  let statusColor = "text-slate-400"
  
  if (isWinner && !isTie) {
    statusTitle = "Victory!"
    statusMessage = "You are the champion of this journey!"
    statusColor = "text-amber-400"
  } else if (isTie) {
    statusTitle = "Tied for Glory!"
    statusMessage = "A magnificent performance worthy of the Sultans!"
    statusColor = "text-emerald-400"
  } else if (currentPlayerIndex === 1) {
    statusTitle = "Runner-Up!"
    statusMessage = "So close to victory! Well played!"
    statusColor = "text-blue-400"
  }
  
  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown className="h-6 w-6 text-amber-400" />
    if (index === 1) return <Medal className="h-6 w-6 text-slate-400" />
    if (index === 2) return <Medal className="h-6 w-6 text-orange-600" />
    return <Star className="h-4 w-4 text-slate-500" />
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="stars-bg absolute inset-0 opacity-50"></div>
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      {/* Hanging Lanterns */}
      <div className="absolute top-0 left-8 md:left-24 z-20 animate-swing origin-top hidden md:block">
        <div className="h-20 md:h-36 w-0.5 bg-amber-500/50 mx-auto"></div>
        <HangingLantern className="w-12 h-16 md:w-16 md:h-24 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]" />
      </div>
      <div 
        className="absolute top-0 right-8 md:right-24 z-20 animate-swing origin-top hidden md:block"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="h-16 md:h-28 w-0.5 bg-amber-500/50 mx-auto"></div>
        <HangingLantern className="w-10 h-14 md:w-14 md:h-20 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl z-10 space-y-8"
      >
        {/* Status Card */}
        <Card className="glass-panel border-primary/20 backdrop-blur-xl shadow-2xl">
          <CardContent className="p-8 text-center space-y-6">
            <div className="relative inline-block">
              <div className={`absolute -inset-8 rounded-full blur-2xl opacity-20 animate-pulse-slow ${isWinner ? "bg-amber-500" : isTie ? "bg-emerald-500" : "bg-blue-500"}`}></div>
              <Trophy className={`w-20 h-20 relative z-10 drop-shadow-2xl ${statusColor}`} />
            </div>
            
            <div>
              <h1 className={`text-5xl font-bold font-serif mb-2 ${statusColor}`}>{statusTitle}</h1>
              <p className="text-slate-300 text-lg">{statusMessage}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-4">
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-xs uppercase tracking-widest block mb-1">Your Rank</span>
                <span className={`text-3xl font-bold font-serif ${statusColor}`}>#{currentPlayerIndex + 1}</span>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-xs uppercase tracking-widest block mb-1">Your Score</span>
                <span className={`text-3xl font-bold font-serif ${statusColor}`}>{currentPlayer?.score || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card className="glass-panel border-primary/20 backdrop-blur-xl shadow-2xl">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold gold-gradient-text font-serif mb-6 text-center">Final Rankings</h2>
            <div className="space-y-3">
              {rankedPlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    player.id === currentPlayerId
                      ? "bg-primary/10 border-primary/30 scale-[1.02] shadow-lg"
                      : "bg-slate-900/30 border-slate-800/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 flex items-center justify-center">
                      {getRankIcon(index)}
                    </div>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center font-bold text-black shadow-lg shadow-amber-500/20 overflow-hidden">
                      {player.avatar ? (
                        <img src={player.avatar} alt={player.name} className="h-full w-full object-cover" />
                      ) : (
                        player.name.substring(0, 2).toUpperCase()
                      )}
                    </div>
                    <div>
                      <span className={`font-bold text-lg ${player.id === currentPlayerId ? "text-primary" : "text-foreground"}`}>
                        {player.name}
                      </span>
                      {player.id === currentPlayerId && (
                        <span className="ml-2 text-xs text-primary/60">(You)</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-2xl text-primary">{player.score}</span>
                    <span className="text-xs text-slate-500 block">points</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="py-6 text-lg bg-transparent border-slate-600 hover:bg-slate-800 hover:border-slate-500"
            onClick={onLeave}
          >
            <Home className="mr-2 h-5 w-5" />
            Leave
          </Button>
          <Button
            className="py-6 text-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold shadow-xl shadow-amber-500/20"
            onClick={onPlayAgain}
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Play Again
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
