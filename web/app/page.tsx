"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Users, Trophy, Target, ArrowRight, Rocket, Star, Shield } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-blue-500/30 overflow-hidden relative">
      
      {/* Dynamic Starfield Background (CSS) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black -z-20" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 -z-10 pointer-events-none" />

      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2 font-black text-xl tracking-tighter">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <Rocket className="w-4 h-4 text-white fill-white" />
            </div>
            <span>FS<span className="text-blue-500">Mastery</span></span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-slate-400 hover:text-white">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-white text-black hover:bg-slate-200 rounded-full px-6 font-bold">
                Join the Fleet
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto relative py-24 md:py-32 flex flex-col items-center text-center px-4">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Accepting New Cadets
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 max-w-5xl relative z-10"
          >
            <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none">
              BECOME A <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 drop-shadow-2xl">
                FULL STACK PILOT
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              The universe needs builders. Chart your course from <span className="text-white font-medium">TypeScript Cadet</span> to <span className="text-white font-medium">NestJS Admiral</span> in a gamified mission control system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-10">
              <Link href="/dashboard">
                <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] transition-all hover:scale-105">
                  Initialize Sequence <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </Link>
              <Link href="/roadmap">
                <Button size="lg" variant="outline" className="h-16 px-10 text-xl rounded-full border-slate-700 hover:bg-slate-800 text-slate-300">
                  Explore Star Map
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Feature Grid (Holographic Cards) */}
        <section className="container mx-auto py-24 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Target, 
                title: "Precision Curriculum", 
                desc: "No fluff. Only the highest-rated Specializations from Coursera, integrated into a streamlined flight path.",
                color: "text-red-400",
                bg: "bg-red-500/10"
              },
              { 
                icon: Trophy, 
                title: "Rank Up System", 
                desc: "Earn XP, unlock badges, and climb the ranks from Junior to Senior Architect. Your progress is your reputation.",
                color: "text-yellow-400",
                bg: "bg-yellow-500/10"
              },
              { 
                icon: Shield, 
                title: "Battle Tested", 
                desc: "Validate your skills with Capstone Missions that mimic real-world enterprise scenarios.",
                color: "text-purple-400",
                bg: "bg-purple-500/10"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="group relative p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:border-white/20 transition-all"
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-tr from-transparent to-white`} />
                
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.bg}`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-white/10 py-12 bg-black">
        <div className="container mx-auto text-center text-sm text-slate-600">
            <div className="flex items-center justify-center gap-2 mb-4">
                <Rocket className="w-5 h-5 text-slate-700" />
                <span className="font-bold text-slate-700">FSMASTERY SYSTEM v2.0</span>
            </div>
            <p>© 2026 Galactic Education Division. Authorized Personnel Only.</p>
        </div>
      </footer>
    </div>
  )
}
