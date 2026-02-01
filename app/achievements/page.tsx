"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Cpu, Hexagon, Shield, Zap, PenTool, Trophy, Lock, Star, ChevronRight, Info } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useGamification } from "@/hooks/use-gamification" 
import { SKILL_TREE, ATTRIBUTES, SkillNode, AttributeType } from "@/data/skill-tree"
import { STAGES } from "@/data/study-plan"
import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function AchievementsPageV2() {
    const { profile } = useGamification()
    const progress = profile?.progress || []
    const level = profile?.level || 1
    const xp = profile?.xp || 0
    const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null)

    // --- LOGIC HELPER ---
    const getSkillStatus = (node: SkillNode | null) => {
        if (!node) return "locked"
        // Specific Override for Root
        if (node.stageRequired === 0) return "unlocked" // Always unlocked start? Or unlocked if stage 0 tasks done.
        
        if (!STAGES[node.stageRequired]) return "locked"
        const stageTasks = STAGES[node.stageRequired].tasks
        const isUnlocked = stageTasks.every(t => progress.includes(t.id))
        return isUnlocked ? "unlocked" : "locked"
    }
    
    // --- STATS CALC ---
    const calculateStats = () => {
        const stats = { LOGIC: 0, DESIGN: 0, OPS: 0 }
        stats.LOGIC += Math.floor(level * 0.5)
        stats.DESIGN += Math.floor(level * 0.5)
        stats.OPS += Math.floor(level * 0.5)
        SKILL_TREE.forEach(node => {
            if (getSkillStatus(node) === "unlocked") {
                stats[node.category] += 10
            }
        })
        return stats
    }
    const stats = calculateStats()
    const maxStat = 100

    return (
        <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-cyan-500/30 font-sans">
            
            {/* BACKGROUND ANIMATED STARS */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-[#020617] to-black" />
                <div className="size-full absolute inset-0 opacity-20 animate-[pulse_8s_infinite]" 
                     style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
                </div>
            </div>

            {/* --- HUD HEADER --- */}
            <header className="absolute top-0 left-0 right-0 z-40 p-6 flex justify-between items-start pointer-events-none">
                <div className="pointer-events-auto">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="text-slate-400 hover:text-white backdrop-blur-sm bg-black/20 border border-white/5 rounded-full px-6">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            COMMAND DECK
                        </Button>
                    </Link>
                </div>
                
                {/* CHARACTER SUMMARY (Mobile/HUD) */}
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-2xl">
                     <div className="w-12 h-12 rounded-full border-2 border-cyan-500/50 bg-slate-900 flex items-center justify-center">
                        <span className="font-bold">{profile?.name?.charAt(0) || "P"}</span>
                     </div>
                     <div>
                        <div className="text-sm font-bold text-cyan-400">Level {level} Pilot</div>
                        <div className="text-xs text-slate-400">{profile?.name}</div>
                     </div>
                </div>
            </header>

            {/* --- MAIN LAYOUT: CONSTELLATION MAP --- */}
            <main className="relative z-10 w-full h-screen overflow-hidden cursor-grab active:cursor-grabbing">
                
                {/* TRANSFORM WRAPPER FOR ZOOM/PAN */}
                <motion.div 
                    drag
                    dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
                    className="w-full h-full flex items-center justify-center"
                    style={{ x: 0, y: 0, scale: 0.85 }}
                >
                    <div className="relative w-[150vw] h-[150vh] flex items-center justify-center">
                    
                        {/* SVG LINES LAYER */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                             <defs>
                                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="rgba(6,182,212,0)" />
                                    <stop offset="50%" stopColor="rgba(6,182,212,0.5)" />
                                    <stop offset="100%" stopColor="rgba(6,182,212,0)" />
                                </linearGradient>
                            </defs>
                            {SKILL_TREE.map(node => {
                                if (!node.dependencies) return null
                                return node.dependencies.map(depId => {
                                    const depNode = SKILL_TREE.find(n => n.id === depId)
                                    if (!depNode) return null
                                    
                                    const isUnlocked = getSkillStatus(node) === "unlocked" && getSkillStatus(depNode) === "unlocked"
                                    // Highlight path if either node is hovered or selected
                                    // For simplicity in this step, purely visual static or generic animated lines
                                    
                                    return (
                                        <motion.line 
                                            key={`${node.id}-${depId}`}
                                            x1={`${depNode.x}%`} 
                                            y1={`${depNode.y}%`} 
                                            x2={`${node.x}%`} 
                                            y2={`${node.y}%`} 
                                            stroke={isUnlocked ? "#22d3ee" : "#1e293b"}
                                            strokeWidth={isUnlocked ? "2" : "1"}
                                            strokeOpacity={isUnlocked ? 0.4 : 0.1}
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 1.5, ease: "easeInOut" }}
                                        />
                                    )
                                })
                            })}
                        </svg>

                        {/* NODES LAYER */}
                        {SKILL_TREE.map((node) => {
                            const status = getSkillStatus(node)
                            const isUnlocked = status === "unlocked"
                            const isSelected = selectedSkill?.id === node.id

                            return (
                                <div 
                                    key={node.id}
                                    className="absolute translate-x-[-50%] translate-y-[-50%] group"
                                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                                >
                                    {/* PULSE EFFECT IF UNLOCKED */}
                                    {isUnlocked && (
                                        <div className="absolute inset-0 -m-8 bg-cyan-500/10 rounded-full blur-2xl animate-pulse pointer-events-none" />
                                    )}

                                    {/* CLICK TRIGGER */}
                                    <button
                                        onClick={() => setSelectedSkill(node)}
                                        className={cn(
                                            "relative w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-20",
                                            isUnlocked 
                                                ? "bg-slate-900/80 border-cyan-400 text-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:scale-110 hover:shadow-[0_0_50px_cyan]" 
                                                : "bg-black/80 border-slate-800 text-slate-800 hover:border-slate-600 hover:text-slate-600",
                                            isSelected && "ring-4 ring-cyan-500/40 scale-125 bg-cyan-950 border-cyan-300"
                                        )}
                                    >
                                        <node.icon className={cn("w-8 h-8 md:w-10 md:h-10 transition-all", isUnlocked ? "drop-shadow-[0_0_10px_cyan]" : "opacity-50")} />
                                    </button>
                                    
                                    {/* LABEL (Always visible but subtle, brighter on hover) */}
                                    <div className={cn(
                                        "absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 rounded-full backdrop-blur-md border transition-all duration-300 pointer-events-none z-30",
                                        isUnlocked 
                                            ? "bg-cyan-950/30 border-cyan-500/30 text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.1)]" 
                                            : "bg-black/40 border-slate-800/50 text-slate-700 opacity-50 group-hover:opacity-100"
                                    )}>
                                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">{node.title}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </motion.div>
            </main>

            {/* --- FLOATING STATS PANEL ("Character Sheet" minimized) --- */}
            <div className="fixed bottom-8 left-8 z-30 hidden md:block">
                 <Card className="bg-slate-950/80 backdrop-blur-xl border-slate-800 w-64 p-4 shadow-2xl">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                         <Hexagon className="w-3 h-3 text-cyan-500" />
                         Attributes
                    </h3>
                    <div className="space-y-4">
                        {(Object.entries(ATTRIBUTES) as [AttributeType, typeof ATTRIBUTES.LOGIC][]).map(([key, config]) => (
                            <div key={key} className="space-y-1">
                                <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400">
                                    <span className="flex items-center gap-1"><config.icon className="w-3 h-3" /> {config.label.split(' ')[0]}</span>
                                    <span className="text-white">{stats[key]}</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(100, (stats[key] / maxStat) * 100)}%` }}
                                        className={cn("h-full rounded-full", config.color)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* --- SKILL DETAIL DIALOG --- */}
            <Dialog open={!!selectedSkill} onOpenChange={() => setSelectedSkill(null)}>
                <DialogContent className="bg-[#0b1121]/95 border-slate-800 text-white max-w-lg backdrop-blur-2xl">
                    <DialogHeader>
                        <div className="flex items-start gap-6">
                            {/* Icon Box */}
                            <div className={cn(
                                "w-20 h-20 rounded-2xl flex items-center justify-center border-2 shrink-0 shadow-2xl",
                                getSkillStatus(selectedSkill) === "unlocked" 
                                    ? "border-cyan-500 bg-cyan-950/30 text-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.2)]" 
                                    : "border-slate-800 bg-black text-slate-700"
                            )}>
                                {selectedSkill && <selectedSkill.icon className="w-10 h-10" />}
                            </div>
                            
                            <div className="space-y-2">
                                <DialogTitle className="text-3xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                                    {selectedSkill?.title}
                                </DialogTitle>
                                <DialogDescription className="text-slate-400 font-light text-base leading-relaxed">
                                    {selectedSkill?.description}
                                </DialogDescription>
                                
                                <div className="flex items-center gap-2 mt-2">
                                     <Badge variant="outline" className={cn(
                                        "uppercase tracking-wider text-[10px]",
                                        getSkillStatus(selectedSkill) === "unlocked" ? "border-cyan-500/30 text-cyan-400 bg-cyan-500/10" : "border-slate-700 text-slate-600"
                                     )}>
                                        Stage {selectedSkill?.stageRequired} Class
                                     </Badge>
                                </div>
                            </div>
                        </div>
                    </DialogHeader>

                    {/* ABILITIES LIST */}
                    <div className="mt-4 p-5 bg-black/40 rounded-xl border border-white/5 space-y-4">
                        <h4 className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                            <Zap className="w-3 h-3 text-yellow-500" />
                            Skill Capabilities
                        </h4>
                        <ul className="grid gap-3">
                            {selectedSkill?.abilities.map((ability, i) => (
                                <motion.li 
                                    key={i} 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-3 text-sm text-slate-300 group"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 mt-1.5 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_cyan] transition-all" />
                                    {ability}
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {getSkillStatus(selectedSkill) === "locked" && (
                         <div className="mt-2 p-3 bg-red-950/20 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-center gap-2">
                             <Lock className="w-4 h-4" />
                             <span>Locked. Complete <strong>Stage {selectedSkill?.stageRequired}</strong> to access this node.</span>
                         </div>
                    )}
                </DialogContent>
            </Dialog>

        </div>
    )
}
