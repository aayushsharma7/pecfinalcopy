import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, Copy, Play } from "lucide-react"
import { motion } from "framer-motion"

interface Player {
  id: string
  name: string
  score: number
  avatar?: string
}

interface LobbyViewProps {
  roomId: string
  players: Player[]
  isHost: boolean
  onStartGame: () => void
  onLeave: () => void
}

export function LobbyView({ roomId, players, isHost, onStartGame, onLeave }: LobbyViewProps) {
  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="stars-bg absolute inset-0 opacity-50"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="glass-panel rounded-3xl p-8 md:p-12 shadow-2xl border border-primary/20 backdrop-blur-xl">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-bold gold-gradient-text font-serif mb-2">Room: {roomId}</h1>
              <p className="text-muted-foreground">Waiting for travelers...</p>
            </div>
            <Button 
              variant="ghost" 
              onClick={onLeave}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              Leave Oasis
            </Button>
          </div>

          <div className="bg-black/30 rounded-2xl p-6 mb-8 border border-primary/10">
            <p className="text-primary/80 text-sm font-bold mb-3 uppercase tracking-wider">Share this code with friends:</p>
            <div className="flex items-center gap-4">
              <span className="text-5xl font-bold text-primary font-mono tracking-widest">{roomId}</span>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-primary/10 text-primary hover:bg-primary/20" onClick={copyRoomId}>
                <Copy className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary/80 border-b border-primary/10 pb-2">
              <Users className="h-5 w-5" />
              <span className="font-bold">Players ({players.length})</span>
            </div>
            
            <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {players.map((player) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center font-bold text-black shadow-lg shadow-amber-500/20 overflow-hidden">
                        {player.avatar ? (
                            <img src={player.avatar} alt={player.name} className="h-full w-full object-cover" />
                        ) : (
                            player.name.substring(0, 2).toUpperCase()
                        )}
                    </div>
                    <span className="font-medium text-lg text-foreground group-hover:text-primary transition-colors">{player.name}</span>
                  </div>
                  {player.id === players[0]?.id ? (
                    <span className="text-xs font-bold bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/30">
                      HOST
                    </span>
                  ) : (
                    <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
                      READY
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            {isHost ? (
              <Button
                className="w-full py-6 text-lg rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold shadow-xl shadow-amber-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                onClick={onStartGame}
              >
                <Play className="mr-2 h-6 w-6 fill-black" />
                Start Journey
              </Button>
            ) : (
              <div className="text-center p-6 bg-primary/5 rounded-xl border border-primary/10 animate-pulse">
                <p className="text-primary/80 font-medium">Waiting for the caravan leader to start...</p>
              </div>
            )}
          </div>

        </div>
      </motion.div>
    </div>
  )
}
