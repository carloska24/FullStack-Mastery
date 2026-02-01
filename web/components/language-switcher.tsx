"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full px-4 border-primary/20 bg-background/50 backdrop-blur hover:bg-primary/10 hover:border-primary/50 transition-all group"
        >
          <Globe className="w-5 h-5 text-blue-500 mr-2 group-hover:animate-spin-slow transition-transform" />
          <span className="flex items-center gap-2 font-medium">
            {language === 'pt' ? (
                <>
                    <span className="text-lg">🇧🇷</span> 
                    <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent font-bold">PT-BR</span>
                </>
            ) : (
                <>
                    <span className="text-lg">🇺🇸</span>
                    <span className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent font-bold">English-USA</span>
                </>
            )}
          </span>
          <span className="sr-only">Switch Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => setLanguage('en')} className="gap-2 cursor-pointer p-3">
          <span className="text-xl">🇺🇸</span> 
          <span className="font-medium">English-USA</span>
          {language === 'en' && <span className="ml-auto text-primary">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('pt')} className="gap-2 cursor-pointer p-3">
          <span className="text-xl">🇧🇷</span> 
          <span className="font-medium">Português-BR</span>
          {language === 'pt' && <span className="ml-auto text-primary">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
