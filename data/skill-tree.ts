
import { LucideIcon, Code2, Database, Layout, Server, Shield, Cloud, Cpu, PenTool, Zap, Box, Hexagon, Globe } from "lucide-react"

export type AttributeType = "LOGIC" | "DESIGN" | "OPS"

export interface SkillNode {
    id: string
    title: string
    description: string
    icon: LucideIcon
    category: AttributeType
    stageRequired: number // The stage index needed to unlock
    abilities: string[] // Specific perks/knowledge
    x: number // Percentage 0-100 for horizontal position
    y: number // Percentage 0-100 for vertical position
    dependencies: string[] // IDs of nodes that connect TO this node (Lines DRAWN FROM dep TO this)
}

export const SKILL_TREE: SkillNode[] = [
    // 0. ROOT
    {
        id: "system-architect",
        title: "System Architect",
        description: "Blueprinting scalable systems.",
        icon: Hexagon,
        category: "LOGIC",
        stageRequired: 0,
        abilities: [
            "Can visualize C4 Diagrams",
            "Mastery of Design Patterns",
            "See the Matrix (Microservices)"
        ],
        x: 50,
        y: 85, // Moved up from 90
        dependencies: []
    },

    // 1. FOUNDATION (Depends on Architect)
    {
        id: "ts-expert",
        title: "TypeScript Warrior",
        description: "Mastery of static typing and complex interfaces.",
        icon: Code2,
        category: "LOGIC",
        stageRequired: 1,
        abilities: [
            "Cannot be surprised by 'undefined' is not a function",
            "Can wield Generic Types for reusable code",
            "Gains +10 Perception against bugs"
        ],
        x: 50,
        y: 72, // Compacted
        dependencies: ["system-architect"]
    },

    // 2. FRONTEND BRANCH (Depends on TS)
    {
        id: "react-sage",
        title: "React Sage",
        description: "Deep knowledge of the Virtual DOM.",
        icon: Cpu,
        category: "DESIGN",
        stageRequired: 2,
        abilities: [
            "Component Composition Mastery",
            "Custom Hooks Fabrication",
            "State Management Telekinesis"
        ],
        x: 75,
        y: 58,
        dependencies: ["ts-expert"]
    },
    {
        id: "ui-architect",
        title: "Interface Pilot",
        description: "Creating immersive user experiences.",
        icon: Layout,
        category: "DESIGN",
        stageRequired: 2,
        abilities: [
            "Pixel-perfect rendering accuracy",
            "Can animate elements with 60fps smoothness",
            "Mastery of Tailwind utility belts"
        ],
        x: 85,
        y: 45,
        dependencies: ["react-sage"]
    },

    // 3. BACKEND BRANCH (Depends on TS)
    {
        id: "node-master",
        title: "Node.js Artificer",
        description: "Understanding the runtime and event loop.",
        icon: Server,
        category: "LOGIC",
        stageRequired: 3,
        abilities: [
            "Can craft high-performance APIs",
            "Controls the Event Loop flow",
            "Unlocks 'Async/Await' precision strikes"
        ],
        x: 25,
        y: 58,
        dependencies: ["ts-expert"]
    },
    {
        id: "db-architect",
        title: "Data Architect",
        description: "Schema design and normalization.",
        icon: Database,
        category: "LOGIC",
        stageRequired: 4,
        abilities: [
            "Can normalize chaotic data into 3NF",
            "Summons complex SQL Joins instantly",
            "Protects data integrity with Transactions"
        ],
        x: 15,
        y: 45,
        dependencies: ["node-master"]
    },

    // 4. MERGING THE PATHS (Depends on Data & React mostly, effectively Stage 5)
    {
        id: "security-guardian",
        title: "Shield Guardian",
        description: "Defending the system from threats.",
        icon: Shield,
        category: "OPS",
        stageRequired: 5,
        abilities: [
            "JWT Authentication Barrier",
            "Rate Limiting Defense",
            "OWASP Knowledge Buffer"
        ],
        x: 50,
        y: 45,
        dependencies: ["node-master", "react-sage"] // Merges both worlds
    },

    // 5. DEVOPS (Depends on Security)
    {
        id: "docker-captain",
        title: "Container Captain",
        description: "Shipping consistent environments.",
        icon: Box,
        category: "OPS",
        stageRequired: 6,
        abilities: [
            "Wait-for-it Coordination",
            "Multi-stage Build Efficiency",
            "Environment Isolation Field"
        ],
        x: 50,
        y: 32,
        dependencies: ["security-guardian"]
    },
    
    // 6. FINAL FRONTIER
    {
        id: "cloud-ranger",
        title: "Cloud Ranger",
        description: "Deploying to the infinite scale.",
        icon: Cloud,
        category: "OPS",
        stageRequired: 7,
        abilities: [
            "Serverless Invocation",
            "Global CDN Distribution",
            "Zero-Downtime Deployment"
        ],
        x: 50,
        y: 20, // Moved down from 15
        dependencies: ["docker-captain"]
    }
]

export const ATTRIBUTES = {
    LOGIC: { label: "Logic (INT)", color: "bg-blue-500", icon: Cpu },
    DESIGN: { label: "Design (CHA)", color: "bg-purple-500", icon: PenTool },
    OPS: { label: "Operations (DEX)", color: "bg-orange-500", icon: Zap },
}
