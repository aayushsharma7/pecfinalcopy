"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import { HangingLantern } from "@/components/hanging-lantern"

interface LandingViewProps {
  onStart: () => void
  onLeaderboard: () => void
  onMultiplayer: () => void
  onProfile: () => void
}

export function LandingView({ onStart, onLeaderboard, onMultiplayer, onProfile }: LandingViewProps) {
  const [stars, setStars] = useState<{ top: string; left: string; size: number; opacity: number }[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const newStars = Array.from({ length: 50 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.7 + 0.3,
    }))
    setStars(newStars)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    const x = (clientX / innerWidth - 0.5) * 20 // Range -10 to 10
    const y = (clientY / innerHeight - 0.5) * 20 // Range -10 to 10
    setMousePos({ x, y })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden bg-[#1a0b2e] text-white selection:bg-amber-500/30"
    >
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none" />

      {/* Stars Background with Parallax */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-200 ease-out hidden md:block"
        style={{ transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)` }}
      >
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

      {/* Top Navigation Pill */}
      <div className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 z-30 w-full max-w-[90%] md:max-w-fit">
        <div className="flex items-center justify-center gap-4 md:gap-8 px-6 py-2 md:px-8 md:py-3 rounded-full border border-amber-500/50 bg-[#0f0518]/80 backdrop-blur-sm shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all duration-300">
          <button className="text-amber-100 hover:text-amber-400 font-serif tracking-widest text-xs md:text-sm transition-colors hover:scale-105 transform">
            HOME
          </button>
          <span className="text-amber-500">•</span>
          <button
            onClick={onLeaderboard}
            className="text-amber-100 hover:text-amber-400 font-serif tracking-widest text-xs md:text-sm transition-colors hover:scale-105 transform"
          >
            LEADERBOARD
          </button>
          <span className="text-amber-500">•</span>
          <button
            onClick={onProfile}
            className="text-amber-100 hover:text-amber-400 font-serif tracking-widest text-xs md:text-sm transition-colors hover:scale-105 transform"
          >
            PROFILE
          </button>
          <span className="text-amber-500">•</span>
          <button
            onClick={onStart}
            className="text-amber-100 hover:text-amber-400 font-serif tracking-widest text-xs md:text-sm transition-colors hover:scale-105 transform"
          >
            PLAY
          </button>
        </div>
      </div>

      {/* Hanging Lanterns - Top Left - Adjusted visibility and positioning for mobile */}
      <div className="absolute top-0 left-2 md:left-12 z-20 animate-swing origin-top group cursor-pointer hidden sm:block">
        <div className="h-12 md:h-20 w-0.5 bg-amber-500/50 mx-auto group-hover:bg-amber-400 transition-colors"></div>
        <HangingLantern className="w-12 h-16 md:w-16 md:h-24 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(245,158,11,0.9)] transition-all duration-300 transform group-hover:scale-110" />
      </div>
      <div
        className="absolute top-0 left-16 md:left-40 z-20 animate-swing origin-top group cursor-pointer hidden md:block"
        style={{ animationDelay: "1s" }}
      >
        <div className="h-8 w-0.5 bg-amber-500/50 mx-auto group-hover:bg-amber-400 transition-colors"></div>
        <HangingLantern className="w-12 h-16 text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(245,158,11,0.9)] transition-all duration-300 transform group-hover:scale-110" />
      </div>

      {/* Hanging Lanterns - Top Right - Adjusted visibility and positioning for mobile */}
      <div
        className="absolute top-0 right-2 md:right-12 z-20 animate-swing origin-top group cursor-pointer hidden sm:block"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="h-10 md:h-16 w-0.5 bg-amber-500/50 mx-auto group-hover:bg-amber-400 transition-colors"></div>
        <HangingLantern className="w-12 h-16 md:w-16 md:h-24 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(245,158,11,0.9)] transition-all duration-300 transform group-hover:scale-110" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen pt-20 pb-60 px-4 text-center">
        <div
          className="space-y-2 animate-fade-in transition-transform duration-100 ease-out w-full max-w-4xl"
          style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
        >
          <h1 className="md:mt-12 font-serif text-7xl sm:text-6xl md:text-6xl lg:text-9xl font-bold text-[#fbbf24] drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] tracking-tight leading-none hover:scale-105 transition-transform duration-500 cursor-default">
            ARABIAN
            <br />
            NIGHTS
          </h1>
          <h2 className="font-serif text-2xl sm:text-6xl md:text-5xl lg:text-7xl font-bold text-[#fbbf24] drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] tracking-wide mb-8 hover:scale-105 transition-transform duration-500 cursor-default">
            VIZIER
          </h2>

          <div className="mt-8 md:mt-12 max-w-lg mx-auto px-4">
            <p className="font-serif italic text-slate-100 text-base md:text-xl leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              "Open the gates of mystery.
              <br />
              Test your wisdom against the ancient djinns."
            </p>
          </div>

          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center w-full px-4">
            <Button
              onClick={onStart}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white border-2 border-amber-400/30 px-8 md:px-10 py-6 md:py-8 text-lg md:text-xl font-serif tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.8)] transition-all duration-300 rounded-full hover:scale-110 active:scale-95 min-w-[200px]"
            >
              PLAY SOLO
            </Button>

            <Button
              onClick={onMultiplayer}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white border-2 border-purple-400/30 px-8 md:px-10 py-6 md:py-8 text-lg md:text-xl font-serif tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.8)] transition-all duration-300 rounded-full hover:scale-110 active:scale-95 min-w-[200px]"
            >
              MULTIPLAYER
            </Button>

            <Button
              onClick={onLeaderboard}
              variant="outline"
              className="w-full sm:w-auto bg-slate-900/50 border-amber-500/30 text-amber-200 hover:bg-amber-950/50 hover:text-amber-100 hover:border-amber-400/50 px-6 md:px-8 py-6 md:py-8 text-base md:text-lg font-serif tracking-wider transition-all duration-300 rounded-full hover:scale-110 active:scale-95 min-w-[200px]"
            >
              LEADERBOARD
            </Button>
          </div>
        </div>
      </div>

      {/* Mosque Silhouettes - Bottom Left */}
      <div
        className="absolute bottom-0 left-0 w-full md:w-1/2 h-[35vh] md:h-[50vh] z-10 pointer-events-none transition-transform duration-300 ease-out opacity-80 md:opacity-100"
        style={{ transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 0.5}px)` }}
      >
        <MosqueLeft className="w-full h-full object-cover object-bottom text-[#ffb6c1] drop-shadow-[0_-5px_10px_rgba(0,0,0,0.3)]" />
      </div>

      {/* Mosque Silhouettes - Bottom Right */}
      <div
        className="absolute bottom-0 right-0 w-full md:w-1/2 h-[40vh] md:h-[60vh] z-10 pointer-events-none transition-transform duration-300 ease-out opacity-80 md:opacity-100"
        style={{ transform: `translate(${mousePos.x * -1.5}px, ${mousePos.y * 0.5}px)` }}
      >
        <MosqueRight className="w-full h-full object-cover object-bottom text-[#ffb6c1] drop-shadow-[0_-5px_10px_rgba(0,0,0,0.3)]" />
      </div>

      {/* Clouds */}
      <div className="absolute bottom-0 left-0 w-full h-52 bg-gradient-to-t from-[#1a0b2e] via-[#1a0b2e]/80 to-transparent z-20 pointer-events-none"></div>
    </div>
  )
}

function MosqueLeft({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} preserveAspectRatio="xMinYMax meet">
      {/* Colors based on the image: Pinks, Peaches, Purples */}
      <defs>
        <linearGradient id="domeGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fca5a5" /> {/* Light Red/Pink */}
          <stop offset="100%" stopColor="#f87171" /> {/* Red 400 */}
        </linearGradient>
        <linearGradient id="wallGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffedd5" /> {/* Orange 50 */}
          <stop offset="100%" stopColor="#fdba74" /> {/* Orange 300 */}
        </linearGradient>
      </defs>
      {/* Tall Minaret */}
      <rect x="50" y="100" width="30" height="200" fill="url(#wallGradient)" />
      <path d="M45 100 H85 L65 70 Z" fill="#fbbf24" /> {/* Roof */}
      <circle cx="65" cy="65" r="3" fill="#fbbf24" /> {/* Spire */}
      <rect x="60" y="120" width="10" height="20" rx="5" fill="#4c1d95" /> {/* Window */}
      <rect x="60" y="160" width="10" height="20" rx="5" fill="#4c1d95" /> {/* Window */}
      {/* Main Dome Structure */}
      <rect x="100" y="150" width="120" height="150" fill="url(#wallGradient)" />
      {/* Dome */}
      <path d="M100 150 Q160 80 220 150" fill="url(#domeGradient)" />
      <path d="M160 80 L160 60" stroke="#fbbf24" strokeWidth="2" />
      <path d="M160 60 L155 65 M160 60 L165 65" stroke="#fbbf24" strokeWidth="2" /> {/* Crescent */}
      {/* Arches */}
      <path d="M120 300 V220 Q140 200 160 220 V300" fill="#4c1d95" />
      <path d="M180 300 V240 Q190 230 200 240 V300" fill="#4c1d95" />
      {/* Small Side Tower */}
      <rect x="240" y="180" width="40" height="120" fill="url(#wallGradient)" />
      <path d="M240 180 Q260 160 280 180" fill="url(#domeGradient)" />
    </svg>
  )
}

function MosqueRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} preserveAspectRatio="xMaxYMax meet">
      <defs>
        <linearGradient id="domeGradientRight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="100%" stopColor="#f87171" />
        </linearGradient>
        <linearGradient id="wallGradientRight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffedd5" />
          <stop offset="100%" stopColor="#fdba74" />
        </linearGradient>
      </defs>

      {/* Large Right Structure */}
      <rect x="250" y="120" width="150" height="180" fill="url(#wallGradientRight)" />

      {/* Big Dome */}
      <path d="M280 120 Q340 40 400 120" fill="url(#domeGradientRight)" />
      <path d="M340 40 L340 20" stroke="#fbbf24" strokeWidth="2" />
      <path d="M340 20 L335 25 M340 20 L345 25" stroke="#fbbf24" strokeWidth="2" />

      {/* Windows/Arches */}
      <rect x="270" y="150" width="15" height="30" rx="7.5" fill="#4c1d95" />
      <rect x="300" y="150" width="15" height="30" rx="7.5" fill="#4c1d95" />
      <rect x="330" y="150" width="15" height="30" rx="7.5" fill="#4c1d95" />
      <rect x="360" y="150" width="15" height="30" rx="7.5" fill="#4c1d95" />

      {/* Large Arch Entrance */}
      <path d="M300 300 V220 Q340 180 380 220 V300" fill="#4c1d95" />

      {/* Side Minaret */}
      <rect x="180" y="160" width="40" height="140" fill="url(#wallGradientRight)" />
      <path d="M180 160 Q200 130 220 160" fill="url(#domeGradientRight)" />
      <path d="M200 130 L200 110" stroke="#fbbf24" strokeWidth="2" />

      {/* Decorative Top Border on Wall */}
      <path d="M250 120 H400" stroke="#fbbf24" strokeWidth="4" strokeDasharray="10 10" />
    </svg>
  )
}
