"use client"

import { STAGES } from "@/data/study-plan"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Rocket, Database, Code2, Shield, Layout, Server, Cloud, Cpu } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGamification } from "@/hooks/use-gamification" 
import { Button } from "@/components/ui/button"
import { Hexagon } from "@/components/ui/hexagon"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Map icons to stages roughly based on content
const ICONS: Record<string, any> = {
    "stage-0": Cpu,
    "stage-1": Code2,
    "stage-2": Layout,
    "stage-3": Server,
    "stage-4": Database,
    "stage-5": Shield,
    "stage-6": Rocket,
    "stage-7": Cloud,
}

export default function RoadmapPage() {
    const { profile } = useGamification()
    const progress = profile?.progress || []
    const [selectedStage, setSelectedStage] = useState<typeof STAGES[0] | null>(null)
    
    // Status Logic
    const isStageUnlocked = (index: number) => {
        if (index === 0) return true
        const prevStage = STAGES[index - 1]
        return prevStage.tasks.every(task => progress.includes(task.id))
    }
    const isStageCompleted = (stageId: string) => {
         const stage = STAGES.find(s => s.id === stageId)
         if (!stage) return false
         return stage.tasks.every(task => progress.includes(task.id))
    }
    const getStageProgress = (stage: any) => {
        const total = stage.tasks.length
        const completed = stage.tasks.filter((t: any) => progress.includes(t.id)).length
        return total === 0 ? 0 : Math.round((completed / total) * 100)
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative selection:bg-blue-500/30">
            
            {/* Starfield Background (CSS Animation) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-900 via-[#050505] to-black" />
                <div className="absolute top-0 left-0 w-full h-full opacity-30 animate-[pulse_4s_infinite]" 
                     style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
            </div>

            {/* Header */}
            <header className="relative z-20 p-8 flex items-center justify-between pointer-events-none">
                <div className="pointer-events-auto">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="text-slate-400 hover:text-white pl-0">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            COMMAND DECK
                        </Button>
                    </Link>
                </div>
                <div className="text-right hidden md:block">
                    <h1 className="text-3xl font-black tracking-widest uppercase opacity-20 select-none">Galactic Sector Map</h1>
                </div>
            </header>

            {/* Hex Grid Container */}
            <div className="relative z-10 min-h-[80vh] flex items-center justify-center p-8 overflow-x-auto">
                <div className="flex flex-col items-center gap-4 md:gap-8 -ml-16 md:-ml-0 pt-20 pb-20">
                    {/* 
                      Honeycomb Layout Strategy:
                      We render rows manually to create the "Tree" effect.
                      Row 1: Stage 0 (Core)
                      Row 2: Stage 1
                      Row 3: Stage 2 & 3 (Branching)
                      Row 4: Stage 4
                      Row 5: Stage 5 & 6
                      Row 6: Stage 7
                    */}

                    {/* ROW 1: CORE */}
                    <div className="flex justify-center">
                        {renderHex(0)}
                    </div>
                    
                    {/* CONNECTION LINE VERTICAL */}
                    <div className="h-8 w-px bg-white/10" />

                    {/* ROW 2: TYPESCRIPT */}
                    <div className="flex justify-center">
                        {renderHex(1)}
                    </div>

                    {/* BRANCHING SPLIT */}
                    <div className="relative h-12 w-full max-w-[200px]">
                        {/* SVG Splitting Lines */}
                        <svg className="absolute inset-0 w-full h-full" overflow="visible">
                            <path d="M100 0 L100 20 L40 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                            <path d="M100 0 L100 20 L160 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                        </svg>
                    </div>

                    {/* ROW 3: FRONTEND + BACKEND */}
                    <div className="flex justify-center gap-4 md:gap-16">
                        {renderHex(2)} {/* Frontend */}
                        {renderHex(3)} {/* Backend */}
                    </div>

                    {/* MERGING BACK or CONTINUING (Simplifying to linear visual for data flow, but visually branched) */}
                    <div className="relative h-12 w-full max-w-[200px]">
                         <svg className="absolute inset-0 w-full h-full" overflow="visible">
                            <path d="M40 0 L40 20 L100 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                            <path d="M160 0 L160 20 L100 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                        </svg>
                    </div>

                    {/* ROW 4: DATA */}
                    <div className="flex justify-center">
                         {renderHex(4)}
                    </div>

                    <div className="h-8 w-px bg-white/10" />

                     {/* ROW 5: SECURITY + OPS */}
                    <div className="flex justify-center gap-4 md:gap-16">
                         {renderHex(5)} 
                         {renderHex(6)} 
                    </div>

                     <div className="relative h-12 w-full max-w-[200px]">
                         <svg className="absolute inset-0 w-full h-full" overflow="visible">
                            <path d="M40 0 L40 20 L100 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                            <path d="M160 0 L160 20 L100 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                        </svg>
                    </div>

                    {/* ROW 6: DEPLOY */}
                    <div className="flex justify-center">
                         {renderHex(7)}
                    </div>

                </div>
            </div>

            {/* Stage Detail Modal (Holographic) */}
            <Dialog open={!!selectedStage} onOpenChange={() => setSelectedStage(null)}>
                <DialogContent className="bg-slate-900/95 border-blue-500/20 backdrop-blur-xl text-white max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black uppercase tracking-wider flex items-center gap-3">
                            {selectedStage?.mode && (
                                <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                                    {selectedStage.mode}
                                </Badge>
                            )}
                            {selectedStage?.title}
                        </DialogTitle>
                        <DialogDescription className="text-slate-400 text-lg">
                            {selectedStage?.description}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-6 space-y-6">
                        {/* Progress Bar */}
                        {selectedStage && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                                    <span>Sector Colonization</span>
                                    <span>{getStageProgress(selectedStage)}%</span>
                                </div>
                                <Progress value={getStageProgress(selectedStage)} className="h-2 bg-slate-800" />
                            </div>
                        )}

                        {/* Task List Preview */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedStage?.tasks.map((task, i) => (
                                <div key={task.id} className="p-3 bg-black/40 rounded border border-white/5 flex items-start gap-3">
                                    <div className={cn(
                                        "w-2 h-2 mt-1.5 rounded-full shrink-0",
                                        progress.includes(task.id) ? "bg-green-500 shadow-[0_0_8px_limegreen]" : "bg-slate-700"
                                    )} />
                                    <div>
                                        <div className="font-bold text-sm text-slate-300">{task.title}</div>
                                        <div className="text-xs text-slate-500">{task.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <DialogFooter>
                         <Link href={selectedStage ? `/roadmap/${selectedStage.id}` : "#"} className="w-full">
                            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-widest h-12">
                                <Rocket className="w-5 h-5 mr-2" />
                                ENTER SECTOR
                            </Button>
                         </Link>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )

    function renderHex(index: number) {
        const stage = STAGES[index]
        if (!stage) return null
        
        const unlocked = isStageUnlocked(index)
        const completed = isStageCompleted(stage.id)
        const status = completed ? "completed" : unlocked ? "active" : "locked"

        return (
            <Hexagon 
                title={stage.title.split(":")[1] || stage.title} // Shorten title
                icon={ICONS[stage.id] || Code2}
                status={status}
                color={(stage as any).color}
                delay={index * 0.1}
                onClick={() => {
                    if (unlocked) setSelectedStage(stage)
                }}
            />
        )
    }
}
