"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function addXP(amount: number) {
  const session = await auth()
  if (!session?.user?.email) return { error: "Not authenticated" }

  try {
    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        xp: { increment: amount },
      },
    })
    
    // Check level up logic (Simple: Level = XP / 1000 + 1)
    const newLevel = Math.floor(user.xp / 1000) + 1
    if (newLevel > user.level) {
      await prisma.user.update({
        where: { email: session.user.email },
        data: { level: newLevel },
      })
      return { success: true, newLevel, xp: user.xp }
    }

    revalidatePath("/")
    return { success: true, xp: user.xp }
  } catch (error) {
    return { error: "Failed to update XP" }
  }
}

export async function toggleTask(taskId: string, completed: boolean) {
  const session = await auth()
  if (!session?.user?.email || !session?.user?.id) return { error: "Not authenticated" }

  try {
    if (completed) {
      // Mark as completed
      const existing = await prisma.studyProgress.findFirst({
        where: { userId: session.user.id, itemId: taskId }
      })

      if (!existing) {
        await prisma.studyProgress.create({
            data: {
                userId: session.user.id,
                itemId: taskId,
                completed: true,
                completedAt: new Date()
            }
        })
        
        // Award Task XP
        await addXP(50)

        // Check for Stage Completion & Badge
        const { STAGES } = await import("@/data/study-plan") // Dynamic import to avoid circular dep issues if any
        const stage = STAGES.find(s => s.tasks.some((t: any) => t.id === taskId))
        
        if (stage) {
            const completedCount = await prisma.studyProgress.count({
                where: {
                    userId: session.user.id,
                    itemId: { in: stage.tasks.map((t: any) => t.id) },
                    completed: true
                }
            })

            if (completedCount === stage.tasks.length) {
                // Stage Completed!
                const existingBadge = await prisma.userBadge.findFirst({
                    where: { userId: session.user.id, badgeId: stage.id }
                })

                if (!existingBadge) {
                    await prisma.userBadge.create({
                        data: {
                            userId: session.user.id,
                            badgeId: stage.id,
                            awardedAt: new Date()
                        }
                    })
                    await addXP(stage.xp) // Award Stage XP
                    revalidatePath("/")
                    return { success: true, newBadge: stage.badge, xpEarned: 50 + stage.xp }
                }
            }
        }
        
        revalidatePath("/")
        return { success: true, xpEarned: 50 }
      }
    } else {
      // Uncheck task (Remove progress & XP)
      const existing = await prisma.studyProgress.findFirst({
        where: { userId: session.user.id, itemId: taskId }
      })

      if (existing) {
        await prisma.studyProgress.delete({
            where: { id: existing.id }
        })
        // Remove XP
        await addXP(-50)
      }
    }

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { error: "Failed to toggle task" }
  }
}

export async function getGamificationProfile() {
    const session = await auth()
    if (!session?.user?.email) return null

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { badges: true, progress: true }
    })

    return user
}
