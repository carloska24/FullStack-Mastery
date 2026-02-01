"use client"

import { STAGES } from "@/data/study-plan"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, Circle, ExternalLink, Play, Shield, Terminal, Star } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useGamification } from "@/hooks/use-gamification" 
import { useConfetti } from "@/hooks/use-confetti" 
import { useParams } from "next/navigation"

export default function StagePage() {
    const params = useParams()
    const stageId = params?.stageId as string
    const stage = STAGES.find(s => s.id === stageId)
    
    // Hooks should be called unconditionally
    const { toggleTaskCompletion, profile } = useGamification()
    const { fireConfetti } = useConfetti()

    if (!stage) {
        return notFound()
    }

    const progress = profile?.progress || []
    const isCompleted = (taskId: string) => progress.includes(taskId)
    
    // Calculate progress for this stage
    const stageTotal = stage.tasks.length
    const stageCompleted = stage.tasks.filter(t => isCompleted(t.id)).length
    const percent = Math.round((stageCompleted / stageTotal) * 100)

    const handleTaskToggle = (taskId: string, done: boolean) => {
        toggleTaskCompletion(taskId, done)
        if (done) fireConfetti()
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            
            {/* Header / HUD */}
            <div className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/roadmap" className="flex items-center text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        <span className="font-mono font-bold">RETURN TO MAP</span>
                    </Link>

                    <div className="flex items-center gap-6">
                         <div className="hidden md:flex items-center gap-3">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sector Progress</span>
                            <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-blue-500 transition-all duration-500" 
                                    style={{ width: `${percent}%` }}
                                />
                            </div>
                            <span className="text-sm font-mono text-blue-400">{percent}%</span>
                         </div>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative py-20 px-6 border-b border-white/5 overflow-hidden">
                <div className={cn(
                    "absolute inset-0 opacity-10 bg-gradient-to-b",
                    (stage as any).color
                )} />
                
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <Badge variant="outline" className="mb-6 border-white/20 px-4 py-1 text-sm tracking-[0.2em]">{stage.mode} CLASS</Badge>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">{stage.title}</h1>
                    <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                        {stage.description}
                    </p>

                    {/* Primary Action (Course Link) */}
                    <div className="mt-10">
                        <a href={stage.link} target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-slate-200">
                                <Play className="w-5 h-5 mr-3 fill-black" />
                                Initiate Training Module
                                <ExternalLink className="w-4 h-4 ml-2 opacity-50" />
                            </Button>
                        </a>
                        <p className="mt-4 text-xs text-slate-500 uppercase tracking-widest font-bold">
                            Powered by {stage.provider}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Left Column: Flight Path (Curriculum) */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Terminal className="w-6 h-6 text-blue-400" />
                        </div>
                        <h2 className="text-2xl font-bold">Flight Path</h2>
                    </div>

                    <div className="relative border-l border-white/10 ml-3 space-y-12 pb-10">
                        {stage.tasks.map((task, index) => {
                             const done = isCompleted(task.id)
                             return (
                                <div key={task.id} className="relative pl-10 group">
                                    {/* Timeline Node */}
                                    <div 
                                        onClick={() => handleTaskToggle(task.id, !done)}
                                        className={cn(
                                            "absolute -left-[11px] top-0 w-6 h-6 rounded-full border-4 border-black transition-all cursor-pointer hover:scale-110",
                                            done ? "bg-green-500 hover:bg-green-400" : "bg-slate-700 hover:bg-blue-500"
                                        )}
                                    />
                                    
                                    <div className="space-y-2 cursor-pointer" onClick={() => handleTaskToggle(task.id, !done)}>
                                        <div className="flex items-center gap-3">
                                            <h3 className={cn(
                                                "text-lg font-semibold transition-colors",
                                                done ? "text-slate-500 line-through" : "text-white group-hover:text-blue-400"
                                             )}>
                                                {task.title}
                                            </h3>
                                            {done && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                        </div>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            {(task as any).description}
                                        </p>
                                    </div>
                                </div>
                             )
                        })}
                    </div>
                </div>

                {/* Right Column: Mission Objective (Capstone) */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                            <Shield className="w-6 h-6 text-purple-400" />
                        </div>
                        <h2 className="text-2xl font-bold">Mission Objective</h2>
                    </div>

                    {stage.projects && stage.projects.map((project: any) => (
                        <Card key={project.id} className="bg-slate-900/50 border-slate-800 backdrop-blur-sm p-6 relative overflow-hidden group hover:border-slate-600 transition-colors">
                            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                                <Shield className="w-24 h-24 text-purple-900/20 rotate-12" />
                            </div>
                            
                            <div className="relative z-10">
                                <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20 mb-4">
                                    CAPSTONE PROJECT
                                </Badge>
                                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    {project.description}
                                </p>
                                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                                    <span>Reward</span>
                                    <span className="text-yellow-500 flex items-center gap-1">
                                        +{project.xp} XP
                                        <Star className="w-3 h-3 fill-yellow-500" />
                                    </span>
                                </div>
                            </div>
                        </Card>
                    ))}

                    <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-6">
                        <h4 className="font-bold text-blue-300 mb-2">Comms Channel</h4>
                        <p className="text-sm text-slate-400">
                            Stuck on a module? Access the <a href="#" className="text-blue-400 hover:underline">Discord Fleet Frequency</a> to request backup from other pilots.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}
