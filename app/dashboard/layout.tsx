"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"

function DashboardContent({ children }: { children: React.ReactNode }) {
    const { t } = useLanguage()
    return (
      <main className="w-full">
        <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex items-center">
                <SidebarTrigger />
                <span className="ml-4 font-bold text-lg">{t.dashboard.learningPath}</span>
            </div>
            <LanguageSwitcher />
        </div>
        <div className="p-6">
            {children}
        </div>
      </main>
    )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  )
}
