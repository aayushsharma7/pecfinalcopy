"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Amiri } from "next/font/google"

const amiri = Amiri({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-amiri",
})

interface LeaderboardViewProps {
  onBack: () => void
}

type Tab = "global" | "chapters"
type Chapter = "chapter1" | "chapter2" | "chapter3" | "chapter4"

interface LeaderboardEntry {
  rank: number
  name: string
  score: number
  avatar?: string | null
}

export function LeaderboardView({ onBack }: LeaderboardViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>("global")
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null)
  const [currentEntries, setCurrentEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch real data from API
  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (activeTab === "global") {
        setLoading(true)
        try {
          const res = await fetch("/api/leaderboard")
          const data = await res.json()
          if (data.leaderboard) {
             const mapped = data.leaderboard.map((item: any, index: number) => ({
                rank: index + 1,
                name: item.username,
                score: item.gamesWon,
                avatar: item.avatar
             }))
             setCurrentEntries(mapped)
          }
        } catch (error) {
          console.error("Error fetching leaderboard:", error)
        } finally {
          setLoading(false)
        }
      } else {
        // No API for chapters yet, clear entries
        setCurrentEntries([])
      }
    }

    fetchLeaderboard()
  }, [activeTab, activeChapter])

  const switchToGlobal = () => {
    setActiveTab("global")
    setActiveChapter(null)
  }

  const switchToChapter = (chapter: Chapter) => {
    setActiveTab("chapters")
    setActiveChapter(chapter)
  }

  const getLeaderboardTitle = () => {
    if (activeTab === "global") {
      return "Top Players"
    } else if (activeChapter) {
      const chapterNum = activeChapter.replace("chapter", "")
      return `Chapter ${chapterNum} Leaders`
    }
    return "Top Players"
  }

  return (
    <div className={`${amiri.variable} relative min-h-screen w-full overflow-hidden`} style={{ backgroundColor: "#2C061F", fontFamily: "var(--font-amiri), serif" }}>
      {/* Background Layer */}
      <div
        className="fixed inset-0 z-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black"
        style={{
          backgroundImage: "url('/bg-desert.jpg'), linear-gradient(to bottom, #1a0b2e, #2C061F)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.8)",
        }}
      />

      {/* Top Header with Banner */}
      <div className="relative w-full h-[120px] sm:h-[150px] md:h-[200px] flex justify-center items-center animate-floatY">
        <div
          className="absolute inset-0 bg-gradient-to-b from-amber-900/20 to-transparent"
          style={{
            backgroundImage: "url('/banner.png')",
            backgroundSize: "contain",
            backgroundPosition: "top",
            backgroundRepeat: "repeat",
          }}
        />
        <div className="relative inline-block w-full max-w-[700px] px-2 sm:px-4" style={{ width: "min(90%, 700px)" }}>
          <Image
            src="/banner-frame.png"
            alt="Banner Frame"
            width={700}
            height={200}
            className="w-full h-auto pointer-events-none"
            priority
          />
          <h1
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[#FFD700] whitespace-nowrap pointer-events-none z-10"
            style={{
              fontFamily: "var(--font-amiri), serif",
              letterSpacing: "1px",
              textShadow: "0 0 12px gold, 0 0 30px rgba(255,215,0,0.6)",
            }}
          >
            Leaderboard
          </h1>
        </div>
      </div>

      {/* Leaderboard Frame Container */}
      <div
        className="absolute top-[120px] sm:top-[150px] md:top-[200px] left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] max-w-[900px] max-h-[calc(100vh-140px)] sm:max-h-[calc(100vh-170px)] md:max-h-[60vh] bg-black/50 border-2 sm:border-[3px] border-[rgba(255,215,0,0.6)] rounded-xl sm:rounded-2xl md:rounded-[25px] backdrop-blur-[10px] p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto z-10"
        style={{
          boxShadow: "0 0 30px rgba(255, 215, 0, 0.3), 0 15px 40px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Navigation Bar */}
        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-5 flex-wrap">
          <button
            onClick={switchToGlobal}
            className={cn(
              "px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 text-sm sm:text-base md:text-xl font-bold text-[#FFD700] bg-[rgba(255,215,0,0.1)] border-2 border-[rgba(255,215,0,0.3)] rounded-lg sm:rounded-xl transition-all duration-300",
              activeTab === "global"
                ? "opacity-100 bg-[rgba(255,215,0,0.2)] border-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.6)]"
                : "opacity-60 hover:opacity-80 hover:-translate-y-0.5",
            )}
            style={{
              fontFamily: "var(--font-amiri), serif",
              textShadow: activeTab === "global" ? "0 0 15px #FFD700" : "0 0 8px rgba(255,215,0,0.5)",
            }}
          >
            Global Empire
          </button>
          <button
            onClick={() => {
              setActiveTab("chapters")
              if (!activeChapter) {
                switchToChapter("chapter1")
              }
            }}
            className={cn(
              "px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 text-sm sm:text-base md:text-xl font-bold text-[#FFD700] bg-[rgba(255,215,0,0.1)] border-2 border-[rgba(255,215,0,0.3)] rounded-lg sm:rounded-xl transition-all duration-300",
              activeTab === "chapters"
                ? "opacity-100 bg-[rgba(255,215,0,0.2)] border-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.6)]"
                : "opacity-60 hover:opacity-80 hover:-translate-y-0.5",
            )}
            style={{
              fontFamily: "var(--font-amiri), serif",
              textShadow: activeTab === "chapters" ? "0 0 15px #FFD700" : "0 0 8px rgba(255,215,0,0.5)",
            }}
          >
            Chapter Legends
          </button>
        </div>

        {/* Sub-Menu (Chapter Buttons) */}
        {activeTab === "chapters" && (
          <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-3 sm:mb-4 md:mb-5 overflow-x-auto pb-2 scrollbar-hide">
            {(["chapter1", "chapter2", "chapter3", "chapter4"] as Chapter[]).map((chapter) => (
              <button
                key={chapter}
                onClick={() => switchToChapter(chapter)}
                className={cn(
                  "px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 text-xs sm:text-sm md:text-base lg:text-lg font-bold text-[#FFD700] bg-[rgba(255,215,0,0.1)] border-2 border-[rgba(255,215,0,0.3)] rounded-md sm:rounded-lg transition-all duration-300 whitespace-nowrap flex-shrink-0",
                  activeChapter === chapter
                    ? "opacity-100 bg-[rgba(255,215,0,0.2)] border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                    : "opacity-60 hover:opacity-80 hover:-translate-y-0.5",
                )}
                style={{
                  fontFamily: "var(--font-amiri), serif",
                  textShadow: activeChapter === chapter ? "0 0 12px #FFD700" : "0 0 6px rgba(255,215,0,0.5)",
                }}
              >
                {chapter.replace("chapter", "Ch ")}
              </button>
            ))}
          </div>
        )}

        {/* Leaderboard Header */}
        <h2
          className="text-center text-[#FFD700] text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 md:mb-6"
          style={{
            fontFamily: "var(--font-amiri), serif",
            textShadow: "0 0 10px rgba(255, 215, 0, 0.6)",
            letterSpacing: "1px",
          }}
        >
          {getLeaderboardTitle()}
        </h2>

        {/* Leaderboard List */}
        {loading ? (
             <div className="text-center text-[#FFD700] py-10">Loading...</div>
        ) : currentEntries.length === 0 ? (
          <div className="text-center text-[rgba(255,215,0,0.7)] text-base sm:text-lg md:text-xl lg:text-2xl py-6 sm:py-8 md:py-10 italic" style={{ fontFamily: "var(--font-amiri), serif" }}>
            {activeTab === "chapters" ? "Chapter leaderboards coming soon!" : "No players yet. Be the first to play!"}
          </div>
        ) : (
          <ul className="space-y-2 sm:space-y-3 list-none p-0">
            {currentEntries.map((entry, index) => {
              const isTopThree = entry.rank <= 3
              const rankEmoji = entry.rank === 1 ? "🥇 " : entry.rank === 2 ? "🥈 " : entry.rank === 3 ? "🥉 " : ""

              return (
                <li
                  key={`${entry.rank}-${entry.name}`}
                  className={cn(
                    "flex items-center justify-between px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-3 lg:px-5 lg:py-4 mb-2 sm:mb-3 bg-[rgba(255,255,255,0.05)] border-2 border-[rgba(255,215,0,0.3)] rounded-lg sm:rounded-xl md:rounded-[15px] transition-all duration-300 cursor-pointer hover:bg-[rgba(255,215,0,0.15)] hover:border-[rgba(255,215,0,0.8)] hover:translate-x-1 sm:hover:translate-x-2 md:hover:translate-x-2.5 hover:shadow-[0_5px_15px_rgba(255,215,0,0.3)]",
                    isTopThree &&
                      "bg-gradient-to-br from-[rgba(255,215,0,0.2)] to-[rgba(255,165,0,0.1)] border-[rgba(255,215,0,0.8)] shadow-[0_0_20px_rgba(255,215,0,0.4)]",
                  )}
                  style={{
                    animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div
                    className={cn(
                      "text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#FFD700] min-w-[40px] sm:min-w-[50px] md:min-w-[60px] text-center",
                      isTopThree && "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
                    )}
                    style={{
                      textShadow: "0 0 8px rgba(255, 215, 0, 0.6)",
                    }}
                  >
                    {rankEmoji}
                    {entry.rank}
                  </div>
                  <div className="flex-1 flex flex-col ml-2 sm:ml-3 md:ml-4 lg:ml-5 min-w-0" style={{ fontFamily: "var(--font-amiri), serif" }}>
                    <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-[#FFD700] mb-0.5 sm:mb-1 truncate">
                      {entry.name}
                    </div>
                    <div className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80">
                      Score: {entry.score}
                    </div>
                  </div>
                  <div
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#FFD700] min-w-[60px] sm:min-w-[80px] md:min-w-[100px] text-right"
                    style={{
                      textShadow: "0 0 10px rgba(255, 215, 0, 0.6)",
                    }}
                  >
                    {entry.score}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {/* Corner Elements */}
      <div className="fixed bottom-0 w-full pointer-events-none z-0 hidden sm:block">
        <Image
          src="/magic-lamp.png"
          alt="Magic Lamp"
          width={300}
          height={300}
          className="absolute bottom-0 left-0 w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] h-auto opacity-50 sm:opacity-70 md:opacity-100"
        />
        <Image
          src="/character.png"
          alt="Character"
          width={350}
          height={350}
          className="absolute bottom-0 right-0 w-[150px] sm:w-[200px] md:w-[280px] lg:w-[350px] h-auto opacity-50 sm:opacity-70 md:opacity-100"
        />
      </div>

      {/* Back Button */}
      <Button
        variant="outline"
        onClick={onBack}
        className="fixed top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 z-20 border-[#FFD700]/50 text-[#FFD700] hover:bg-[#FFD700]/20 hover:text-white hover:border-[#FFD700] gap-1 sm:gap-2 transition-all duration-300 shadow-[0_0_10px_rgba(255,215,0,0.1)] bg-transparent text-xs sm:text-sm md:text-base px-2 py-1.5 sm:px-3 sm:py-2"
      >
        <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
        <span className="hidden sm:inline">Back</span>
      </Button>

      <style jsx>{`
        @keyframes floatY {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-floatY {
          animation: floatY 4s ease-in-out infinite;
        }

        /* Custom Scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(255, 215, 0, 0.5);
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 215, 0, 0.8);
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
