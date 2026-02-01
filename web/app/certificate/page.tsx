"use client"

import { CertificateGenerator } from "@/components/certificate-generator"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function CertificatePage() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                 <div className="flex items-center p-4 border-b border-border/50">
                    <SidebarTrigger />
                    <span className="ml-4 font-bold text-lg">My Learning Journey</span>
                </div>
                <div className="p-8 flex justify-center">
                    <CertificateGenerator />
                </div>
            </main>
        </SidebarProvider>
    )
}
