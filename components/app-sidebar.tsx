"use client"

import { Home, Map, Trophy, ScrollText, Flame, Zap } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGamification } from "@/hooks/use-gamification"
import { useLanguage } from "@/contexts/language-context" 
import { Skeleton } from "@/components/ui/skeleton"

export function AppSidebar() {
  const { profile, loading } = useGamification()
  const { t } = useLanguage()

  return (
    <Sidebar className="border-r border-border/50 bg-background/50 backdrop-blur">
      <SidebarHeader className="p-4 border-b border-border/10">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-primary/20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-bold truncate w-32">{profile?.name || "Dev Apprentice"}</span>
            <span className="text-xs text-muted-foreground">Full Stack Initiate</span>
          </div>
        </div>
        
        {/* Gamification Stats Card */}
        <div className="mt-4 p-3 bg-secondary/50 rounded-lg border border-border/50 space-y-2">
            <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Level {profile?.level || 1}</span>
                <span className="font-mono text-primary">{profile?.xp || 0} XP</span>
            </div>
            <Progress value={((profile?.xp || 0) % 1000) / 10} className="h-2 bg-background" indicatorClassName="bg-gradient-to-r from-primary to-purple-500" />
            
            <div className="flex items-center gap-1.5 text-xs font-medium text-orange-500 mt-2">
                <Flame className="w-3.5 h-3.5 fill-orange-500" />
                <span>{profile?.streak || 0} {t.sidebar.streak}</span>
            </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
               <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/">
                    <Home className="w-4 h-4" />
                    <span>{t.sidebar.home}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem> 
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <a href="/dashboard">
                    <Home className="w-4 h-4" />
                    <span>{t.sidebar.dashboard}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/roadmap">
                    <Map className="w-4 h-4" />
                    <span>{t.sidebar.roadmap}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/achievements">
                    <Trophy className="w-4 h-4" />
                    <span>{t.sidebar.achievements}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/certificate">
                    <ScrollText className="w-4 h-4" />
                    <span>{t.sidebar.certificate}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-md text-xs text-primary">
            <Zap className="w-3 h-3" />
            <span>{t.sidebar.nextReward}</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
