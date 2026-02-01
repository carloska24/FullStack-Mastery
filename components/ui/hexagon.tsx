"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Lock, Check } from "lucide-react"

interface HexagonProps {
  title: string
  icon?: any
  status: "locked" | "active" | "completed"
  onClick?: () => void
  className?: string
  delay?: number
  color?: string // Tailwind gradient class
}

export function Hexagon({ 
    title, 
    icon: Icon, 
    status, 
    onClick, 
    className,
    delay = 0,
    color = "from-blue-500 to-cyan-500"
}: HexagonProps) {
  
  const isLocked = status === "locked"
  const isCompleted = status === "completed"
  const isActive = status === "active"

  return (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: delay 
        }}
        onClick={onClick}
        className={cn(
            "relative w-32 h-36 md:w-40 md:h-44 group cursor-pointer transition-transform hover:scale-105 z-10",
            className
        )}
    >
      {/* Glow Effect for Active/Completed */}
      {!isLocked && (
        <div className={cn(
            "absolute inset-0 blur-xl opacity-40 group-hover:opacity-70 transition-opacity bg-gradient-to-br",
            color
        )} />
      )}

      {/* The Hexagon Shape */}
      <div 
        className={cn(
            "absolute inset-0 flex items-center justify-center clip-hex",
            // Border simulation
            isLocked ? "bg-slate-800" : "bg-gradient-to-br p-[2px]", 
            !isLocked && color
        )}
        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
      >
        {/* Inner Content Background */}
        <div 
            className="w-full h-full bg-slate-950 flex flex-col items-center justify-center text-center p-2 transition-colors group-hover:bg-slate-900"
            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
        >
            {/* Status Icon Overlay */}
            <div className="absolute top-4 right-1/2 translate-x-1/2">
                {isLocked && <Lock className="w-4 h-4 text-slate-600" />}
                {isCompleted && <Check className="w-5 h-5 text-green-400 font-bold" />}
                {isActive && (
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_#60a5fa]" />
                )}
            </div>

            {/* Icon */}
            {Icon && (
                <div className={cn(
                    "mb-2 p-2 rounded-full bg-white/5",
                    isActive ? "text-white" : "text-slate-500"
                )}>
                    <Icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
            )}

            {/* Title */}
            <h3 className={cn(
                "text-[10px] md:text-xs font-bold uppercase tracking-wider max-w-[80%]",
                isLocked ? "text-slate-600" : "text-slate-200 group-hover:text-white"
            )}>
                {title}
            </h3>
        </div>
      </div>
    </motion.div>
  )
}
