"use client"

import { useState, useEffect } from "react"
import { getGamificationProfile, toggleTask } from "@/actions/gamification"
import { toast } from "sonner"

type UserProfile = {
    xp: number
    level: number
    streak: number
    name: string | null
    email: string | null
    progress: string[] // List of completed itemIds
} | null

export function useGamification() {
    const [profile, setProfile] = useState<UserProfile>(null)
    const [loading, setLoading] = useState(true)

    async function refreshProfile() {
        const data = await getGamificationProfile()
        if (data) {
            setProfile({
                xp: data.xp,
                level: data.level,
                streak: data.streak,
                name: data.name,
                email: data.email,
                progress: data.progress.map((p: any) => p.itemId)
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        refreshProfile()
    }, [])

    async function awardXP(amount: number) {
        // Optimistic update
        if (profile) {
            setProfile({ ...profile, xp: profile.xp + amount })
        }
        
        await addXP(amount)
        await refreshProfile() // Re-sync to be sure
    }

    async function toggleTaskCompletion(taskId: string, isCompleted: boolean) {
        // Optimistic update
        if (profile) {
            const newProgress = isCompleted 
                ? [...profile.progress, taskId]
                : profile.progress.filter(id => id !== taskId)
            
            const xpChange = isCompleted ? 50 : -50

            setProfile({ 
                ...profile, 
                progress: newProgress,
                xp: profile.xp + xpChange
            })
        }
        const result = await toggleTask(taskId, isCompleted)
        if (result?.success) {
            if (result.newBadge) {
                toast.success(`🏆 BADGE UNLOCKED: ${result.newBadge}!`, {
                    description: `Congratulations! You mastered this stage.`,
                    duration: 5000,
                })
                // soundEffect.play() // Future idea
            } else if (isCompleted) {
                toast.success(`Task Completed! +${result.xpEarned || 50} XP`)
            }
        }
        await refreshProfile()
    }

    return {
        profile,
        loading,
        awardXP,
        toggleTaskCompletion,
        refreshProfile
    }
}
