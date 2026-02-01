"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, PlayCircle, Rocket, Flame, Award, Zap } from "lucide-react"
import { useGamification } from "@/hooks/use-gamification"
import Link from "next/link"
import { useState, useEffect } from "react"

import { STAGES } from "@/data/study-plan"
import { useLanguage } from "@/contexts/language-context"
import { Progress } from "@/components/ui/progress"


export default function DashboardPage() {
    const { toggleTaskCompletion, profile } = useGamification()
    const { t } = useLanguage()

    // --- REAL DATA CALCULATION ---

    // 1. Pilot Vitals
    const pilotName = profile?.name || "Cadet"
    const pilotLevel = profile?.level || 1
    const pilotRank = pilotLevel < 5 ? "Cadet" : pilotLevel < 10 ? "Pilot" : "Commander"
    
    // XP Logic (Mock levels for now: Level * 1000)
    const xpCurrent = profile?.xp || 0
    const xpNext = pilotLevel * 1000
    // Prevent division by zero if level 0 (shouldn't happen but safety first)
    // If xpCurrent > xpNext (user leveled up logic pending), cap at 100% for display
    const progressPercent = Math.min(100, Math.max(0, (xpCurrent / (xpNext || 1000)) * 100))
    
    const streak = profile?.streak || 0
    const profileProgress = profile?.progress || [] // Array of completed task IDs

    // 2. Determine Current Mission
    // Find the first stage that has at least one uncompleted task
    // If all tasks are done, default to the last stage (or a "Training Complete" state)
    const currentStageIndex = STAGES.findIndex(stage => {
        // Check if ANY task in this stage is NOT in the profile.progress list
        const stageTasks = stage.tasks.map(t => t.id)
        const hasUnfinishedTasks = stageTasks.some(taskId => !profileProgress.includes(taskId))
        return hasUnfinishedTasks
    })

    // If -1 (all done), show last stage. If 0, show first stage.
    const activeIndex = currentStageIndex === -1 ? STAGES.length - 1 : currentStageIndex
    
    const currentStage = STAGES[activeIndex]
    const nextStage = STAGES[activeIndex + 1]

    // 3. Stage Progress Calculation
    const stageTotalTasks = currentStage.tasks.length
    const stageCompletedTasks = currentStage.tasks.filter(t => profileProgress.includes(t.id)).length
    const stageProgressPercent = stageTotalTasks === 0 ? 0 : Math.round((stageCompletedTasks / stageTotalTasks) * 100)

    // Helper to check specific task completion
    const isCompleted = (taskId: string) => profileProgress.includes(taskId)

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header Text */}
                <div className="flex justify-between items-end">
                     <div>
                        <h1 className="text-3xl font-black tracking-tight text-white mb-1">COMMAND DECK</h1>
                        <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">System Status: Online</p>
                     </div>
                     <div className="text-right">
                         <div className="text-2xl font-bold text-blue-500">
                             <ClientDate />
                         </div>
                     </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* LEFT COLUMN: Pilot Vitals & Stats */}
                    <div className="lg:col-span-4 space-y-6">
                        
                        {/* Pilot Card */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-2xl font-bold">
                                    {pilotName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">{pilotName}</h2>
                                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                                        Level {pilotLevel} {pilotRank}
                                    </Badge>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs font-medium text-slate-400 mb-2">
                                        <span>XP Progress</span>
                                        <span>{xpCurrent} / {xpNext}</span>
                                    </div>
                                    <Progress value={progressPercent} className="h-2 bg-slate-800" />
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                                    <div className="bg-black/30 p-3 rounded-lg text-center">
                                        <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                                        <div className="text-xl font-bold">{streak}</div>
                                        <div className="text-[10px] text-slate-500 uppercase">Day Streak</div>
                                    </div>
                                    <div className="bg-black/30 p-3 rounded-lg text-center">
                                        <Award className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                                        <div className="text-xl font-bold">{activeIndex > 0 ? "Top 10%" : "Rookie"}</div>
                                        <div className="text-[10px] text-slate-500 uppercase">Fleet Rank</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity (Mini) */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                                <Zap className="w-4 h-4 inline-block mr-2 text-yellow-500" />
                                Recent Intel
                            </h3>
                            <div className="space-y-4">
                                {stageCompletedTasks > 0 ? (
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <span className="text-slate-300">Progressing on {(currentStage as any).title}</span>
                                        <span className="ml-auto text-slate-600 text-xs">Now</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        <span className="text-slate-300">Mission Started</span>
                                        <span className="ml-auto text-slate-600 text-xs">Now</span>
                                    </div>
                                )}
                                
                                {activeIndex > 0 && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                                        <span className="text-slate-300">Completed Stage {activeIndex - 1}</span>
                                        <span className="ml-auto text-slate-600 text-xs">Past</span>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Current Mission Focus */}
                    <div className="lg:col-span-8">
                         <div className="h-full flex flex-col space-y-6">
                            
                            {/* Priority Alpha Card */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex-1 bg-gradient-to-br from-blue-900/20 to-slate-900/50 border border-blue-500/30 rounded-3xl p-8 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4">
                                     <div className="animate-pulse flex items-center gap-2 text-blue-400 text-xs font-bold uppercase border border-blue-500/30 px-3 py-1 rounded-full bg-blue-500/10">
                                         <span className="relative flex h-2 w-2">
                                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                        </span>
                                        Priority Alpha
                                     </div>
                                </div>

                                <div className="mb-8">
                                    <div className="text-blue-500 font-mono text-sm mb-2">CURRENT MISSION SECTOR</div>
                                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{(currentStage as any).title}</h2>
                                    <p className="text-xl text-slate-400 max-w-2xl">{(currentStage as any).description}</p>
                                </div>

                                <div className="bg-black/40 rounded-xl p-6 border border-white/5 mb-8">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-sm font-medium text-slate-300">Mission Progress</span>
                                        <span className="text-xl font-bold text-white">{stageProgressPercent}%</span>
                                    </div>
                                    <Progress value={stageProgressPercent} className="h-3 bg-slate-800" />
                                    <p className="text-xs text-slate-500 mt-2">
                                        {stageCompletedTasks} of {stageTotalTasks} modules secured
                                    </p>
                                </div>

                                <Link href={`/roadmap/${currentStage.id}`}>
                                    <Button size="lg" className="w-full md:w-auto h-14 px-8 text-lg bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-900/20">
                                        <Rocket className="w-5 h-5 mr-3" />
                                        Resume Flight Path
                                    </Button>
                                </Link>
                            </motion.div>

                            {/* Up Next / Recommendations */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {nextStage ? (
                                    <Link href={`/roadmap/${nextStage.id}`} className="group">
                                        <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                                            <div className="text-xs text-slate-500 uppercase font-bold mb-2">Approaching Sector</div>
                                            <h3 className="text-lg font-bold text-slate-300 group-hover:text-white transition-colors">{nextStage.title}</h3>
                                            <div className="flex items-center gap-2 mt-4 text-xs font-medium text-slate-500">
                                                <Badge variant="outline" className="border-slate-700">Locked</Badge>
                                                <span>Requires Completion of Stage {activeIndex}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 opacity-50">
                                        <div className="text-xs text-slate-500 uppercase font-bold mb-2">End of the Universe</div>
                                        <h3 className="text-lg font-bold text-slate-300">All Sectors Cleared</h3>
                                    </div>
                                )}

                                <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6">
                                    <div className="text-xs text-slate-500 uppercase font-bold mb-2">Daily Challenge</div>
                                    <h3 className="text-lg font-bold text-white">Review Design Patterns</h3>
                                    <div className="flex items-center gap-2 mt-4">
                                        <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-0">+50 XP</Badge>
                                    </div>
                                </div>
                            </div>

                         </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

function ClientDate() {
    const [date, setDate] = useState<string>("")
    useEffect(() => {
        setDate(new Date().toLocaleDateString('pt-BR'))
    }, [])
    
    if (!date) return <span className="opacity-0">00/00/0000</span>
    return <>{date}</>
}
