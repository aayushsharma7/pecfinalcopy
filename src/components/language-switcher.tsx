"use client"

import { useState } from "react"
import {Button} from "@/components/ui/button"
import { Languages, Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface LanguageSwitcherProps {
  currentLocale: string
  onLocaleChange: (locale: string) => void
}

const languages = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
]

export function LanguageSwitcher({ currentLocale, onLocaleChange }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0]

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        className="relative group bg-slate-900/50 border-slate-700 hover:bg-slate-800 hover:border-primary/50 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="h-5 w-5 text-slate-300 group-hover:text-primary transition-colors" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 mt-2 w-56 glass-panel border-primary/20 rounded-xl shadow-2xl overflow-hidden z-50"
            >
              <div className="p-2">
                <div className="flex items-center gap-2 px-3 py-2 mb-2 border-b border-slate-700">
                  <Languages className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-slate-300">Select Language</span>
                </div>
                
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => {
                      onLocaleChange(language.code)
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      currentLocale === language.code
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "text-slate-300 hover:bg-slate-800/50 hover:text-foreground"
                    }`}
                  >
                    <span className="text-2xl">{language.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium">{language.nativeName}</div>
                      <div className="text-xs opacity-60">{language.name}</div>
                    </div>
                    {currentLocale === language.code && (
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
