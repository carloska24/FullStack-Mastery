import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // For the study plan, we'll allow a simple "Name" based login for now 
      // or a real Email/Password system. For simplicity in this demo phase:
      // It's a simulated "Enter your name to start" which creates a user if not exists.
      // BUT user asked for REAL DATA.
      // So we will implement a standard Email/Password credential provider.
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Search for user
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })

        if (!user) {
          // Auto-register for the "Study Plan" demo experience
          const newUser = await prisma.user.create({
            data: {
              email: credentials.email as string,
              password: credentials.password as string, // Basic storage for demo
              name: (credentials.email as string).split('@')[0], // Default name from email
              xp: 0,
              level: 1,
              streak: 0,
            }
          })
          return newUser
        }

        // Verify password (simple comparison for demo)
        if (user.password === credentials.password) {
            return user
        }
        
        return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
    async signIn({ user }) {
        if (!user.email) return true

        try {
            const dbUser = await prisma.user.findUnique({ where: { email: user.email } })
            if (!dbUser) return true

            const now = new Date()
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            
            let lastLoginDate = dbUser.lastLogin ? new Date(dbUser.lastLogin) : null
            if (lastLoginDate) {
                lastLoginDate = new Date(lastLoginDate.getFullYear(), lastLoginDate.getMonth(), lastLoginDate.getDate())
            }

            let newStreak = dbUser.streak
            
            if (!lastLoginDate) {
                // First login ever (or since tracking started)
                newStreak = 1
            } else {
                const diffTime = Math.abs(today.getTime() - lastLoginDate.getTime())
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

                if (diffDays === 1) {
                    // Logged in yesterday -> Increment streak
                    newStreak += 1
                } else if (diffDays > 1) {
                     // Missed a day -> Reset
                    newStreak = 1
                }
                // If diffDays === 0, do nothing (already logged in today)
            }

            await prisma.user.update({
                where: { email: user.email },
                data: {
                    lastLogin: now,
                    streak: newStreak
                }
            })
            
            return true
        } catch (error) {
            console.error("Error updating streak:", error)
            return true
        }
    },
    async jwt({ token, user }) {
        if (user) {
            token.sub = user.id
        }
        return token
    }
  },
})
