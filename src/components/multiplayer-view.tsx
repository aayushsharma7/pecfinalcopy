"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft, Users, Play } from "lucide-react"
import { motion } from "framer-motion"
import { HangingLantern } from "@/components/hanging-lantern"

interface MultiplayerViewProps {
  onBack: () => void
  onCreateRoom: (username: string) => void
  onJoinRoom: (roomId: string, username: string) => void
  username: string
  userAvatar?: string
}

export function MultiplayerView({ onBack, onCreateRoom, onJoinRoom, username, userAvatar }: MultiplayerViewProps) {
  const [roomId, setRoomId] = useState("")
  const [mode, setMode] = useState<"menu" | "create" | "join">("menu")

  const handleCreate = () => {
    onCreateRoom(username)
  }

  const handleJoin = () => {
    if (roomId.trim()) {
      onJoinRoom(roomId, username)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="stars-bg absolute inset-0 opacity-50"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
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
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Button
          variant="ghost"
          className="mb-8 text-slate-400 hover:text-white hover:bg-white/10"
          onClick={() => {
            if (mode === "menu") onBack()
            else setMode("menu")
          }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="glass-panel border-primary/20 backdrop-blur-xl text-slate-100 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold gold-gradient-text font-serif">
              Multiplayer Arena
            </CardTitle>
            <CardDescription className="text-slate-400">
              Challenge your friends in real-time!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center gap-3 mb-6 p-3 bg-black/20 rounded-xl border border-white/5">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center font-bold text-black shadow-lg shadow-amber-500/20">
                    {userAvatar ? (
                        <img src={userAvatar} alt={username} className="h-full w-full rounded-full object-cover" />
                    ) : (
                        username.substring(0, 2).toUpperCase()
                    )}
                </div>
                <div className="text-left">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Playing as</p>
                    <p className="text-primary font-bold text-lg leading-none">{username}</p>
                </div>
            </div>

            {mode === "menu" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Button
                    className="h-32 flex flex-col items-center justify-center space-y-4 bg-gradient-to-br from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 border-0 shadow-lg shadow-purple-900/20 transition-all hover:scale-[1.02]"
                    onClick={() => setMode("create")}
                  >
                    <Play className="h-8 w-8" />
                    <span className="font-bold">Create Room</span>
                  </Button>
                  <Button
                    className="h-32 flex flex-col items-center justify-center space-y-4 bg-gradient-to-br from-pink-600 to-rose-700 hover:from-pink-500 hover:to-rose-600 border-0 shadow-lg shadow-pink-900/20 transition-all hover:scale-[1.02]"
                    onClick={() => setMode("join")}
                  >
                    <Users className="h-8 w-8" />
                    <span className="font-bold">Join Room</span>
                  </Button>
                </div>
              </div>
            )}

            {mode === "create" && (
              <div className="space-y-6 text-center">
                <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-800">
                  <p className="text-slate-300 mb-4">Ready to host a game?</p>
                  <Button
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold"
                    onClick={handleCreate}
                  >
                    Start Hosting
                  </Button>
                </div>
              </div>
            )}

            {mode === "join" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Room Code</label>
                  <Input
                    placeholder="Enter 6-character code"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                    maxLength={6}
                    className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-600 focus:ring-pink-500 focus:border-pink-500 text-center text-2xl tracking-widest uppercase font-mono"
                  />
                </div>
                <Button
                  className="w-full bg-pink-600 hover:bg-pink-500 mt-4 font-bold"
                  onClick={handleJoin}
                  disabled={!roomId.trim() || roomId.length < 6}
                >
                  Join Game
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
