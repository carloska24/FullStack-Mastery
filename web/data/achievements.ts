
export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string; // Lucide icon name or emoji
    rarity: "COMMON" | "RARE" | "LEGENDARY" | "MYTHIC";
    unlocked: boolean;
    condition: string;
}

export const BADGES_DATA: Badge[] = [
    {
        id: "architect",
        name: "Architect Mindset",
        description: "Completed Stage 0: System Design",
        icon: "Hexagon", 
        rarity: "LEGENDARY",
        unlocked: true,
        condition: "Complete Module 0"
    },
    {
        id: "ts-warrior",
        name: "TypeScript Warrior",
        description: "Zero runtime errors in Stage 1 Capstone.",
        icon: "Shield", 
        rarity: "RARE",
        unlocked: true,
        condition: "Complete Module 1"
    },
    {
        id: "first-blood",
        name: "First Blood",
        description: "Completed your first task.",
        icon: "Sword", 
        rarity: "COMMON",
        unlocked: true,
        condition: "First Task"
    },
    {
        id: "streak-7",
        name: "Hyperdrive Engaged",
        description: "Maintain a 7-day study streak.",
        icon: "Flame", 
        rarity: "RARE",
        unlocked: true,
        condition: "7 Day Streak"
    },
    {
        id: "db-master",
        name: "Data Keeper",
        description: "Design a normalized database schema.",
        icon: "Database", 
        rarity: "LEGENDARY",
        unlocked: false,
        condition: "Complete Stage 4"
    },
    {
        id: "deploy-prod",
        name: "Galactic Conqueror",
        description: "Deploy an application to production (GCP).",
        icon: "Rocket", 
        rarity: "MYTHIC",
        unlocked: false,
        condition: "Complete Stage 7"
    },
    {
        id: "bug-hunter",
        name: "Bug Hunter",
        description: "Resolve 50 issues in the tracker.",
        icon: "Bug", 
        rarity: "COMMON",
        unlocked: false,
        condition: "Fix 50 Bugs"
    },
    {
        id: "social-net",
        name: "Hive Mind",
        description: "Join the community Discord.",
        icon: "Users", 
        rarity: "COMMON",
        unlocked: false,
        condition: "Link Discord"
    }
]
