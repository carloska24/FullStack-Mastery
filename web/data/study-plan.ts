export const STAGES = [
    {
        id: "stage-0",
        title: "Stage 0: Architecture & Design",
        mode: "ARCHITECT",
        description: "Blueprint the system before a single line of code is written.",
        courseTitle: "Software Design and Architecture Specialization",
        provider: "University of Alberta",
        link: "https://www.coursera.org/specializations/software-design-architecture",
        xp: 300,
        badge: "System Architect",
        color: "from-blue-500 to-cyan-400",
        tasks: [
            { id: "mod-1", title: "Module 1: Object-Oriented Design", description: "Design Patterns & UML" },
            { id: "mod-2", title: "Module 2: Design Patterns", description: "Creational, Structural, Behavioral" },
            { id: "mod-3", title: "Module 3: Software Architecture", description: "Service-Oriented & Microservices" },
            { id: "mod-4", title: "Module 4: SOA & REST", description: "Designing robust APIs" }
        ],
        projects: [
            { 
                id: "capstone-0", 
                title: "Mission 0: The Blueprint", 
                description: "Deliver the C4 Diagrams (Context, Container) and the Entity-Relationship (ER) model for the Industrial Helpdesk. Define the BPMN flow for the Ticket Lifecycle.", 
                xp: 300 
            }
        ]
    },
    {
        id: "stage-1",
        title: "Stage 1: TypeScript Mastery",
        mode: "ENGINEER",
        description: "Establishing strict typing and robust foundations.",
        courseTitle: "Full-Stack Web Development with React Specialization",
        provider: "HKUST",
        link: "https://www.coursera.org/specializations/full-stack-react",
        xp: 500,
        badge: "Type Wizard",
        color: "from-blue-600 to-indigo-600",
        tasks: [
            { id: "mod-1", title: "Module 1: Frontend Web UI", description: "Bootstrap & Responsive Grid" },
            { id: "mod-2", title: "Module 2: React Primitives", description: "Components, Props, State" },
            { id: "mod-3", title: "Module 3: React Native", description: "Cross-platform thinking" },
            { id: "mod-4", title: "Module 4: Server-side Integration", description: "Connecting to NodeJS" }
        ],
        projects: [
            { 
                id: "capstone-1", 
                title: "Mission 1: The Core", 
                description: "Implement the Domain Entities (User, Ticket, Asset) in pure TypeScript. Create strict Interfaces and Type Guards to ensure 0% runtime errors.", 
                xp: 500 
            }
        ]
    },
    {
        id: "stage-2",
        title: "Stage 2: Next.js & React",
        mode: "FRONTEND",
        description: "Building the modern, interactive cockpit.",
        courseTitle: "Meta Front-End Developer Professional Certificate",
        provider: "Meta",
        link: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
        xp: 800,
        badge: "Interface Pilot",
        color: "from-sky-500 to-blue-600",
        tasks: [
            { id: "mod-1", title: "Module 1: React Advanced", description: "Hooks, HOCs, Render Props" },
            { id: "mod-2", title: "Module 2: UX/UI Principles", description: "Figma to Code implementation" },
            { id: "mod-3", title: "Module 3: Frontend Frameworks", description: "Deep dive into App Router" },
            { id: "mod-4", title: "Module 4: Capstone Project", description: "Building the Portfolio" }
        ],
        projects: [
            { 
                id: "capstone-2", 
                title: "Mission 2: The Interface", 
                description: "Construct the Dashboard UI. Implement the 'Ticket Board' and 'Asset Grid' using Next.js Server Components. Ensure pixel-perfect layout and responsive design.", 
                xp: 800 
            }
        ]
    },
    {
        id: "stage-3",
        title: "Stage 3: NestJS Backend",
        mode: "BACKEND",
        description: "Powering the engine with scalable microservices.",
        courseTitle: "IBM Backend Development Professional Certificate",
        provider: "IBM",
        link: "https://www.coursera.org/professional-certificates/ibm-backend-development",
        xp: 1000,
        badge: "Engine Master",
        color: "from-red-600 to-rose-600",
        tasks: [
            { id: "mod-1", title: "Module 1: Python & Flask/Node", description: "Understanding Server Logic" },
            { id: "mod-2", title: "Module 2: Containerization", description: "Intro to Docker for Backend" },
            { id: "mod-3", title: "Module 3: Microservices", description: "Decoupling services" },
            { id: "mod-4", title: "Module 4: Application Security", description: "Secure Headers & OWASP" }
        ],
        projects: [
            { 
                id: "capstone-3", 
                title: "Mission 3: The API", 
                description: "Launch the NestJS API. Create the 'TicketsModule' and 'UsersModule'. Implement DTO validation, Guards, and Swagger documentation for your endpoints.", 
                xp: 1000 
            }
        ]
    },
    {
        id: "stage-4",
        title: "Stage 4: PostgreSQL & Data",
        mode: "DATA",
        description: "Persisting the universe's data structures.",
        courseTitle: "PostgreSQL for Everybody Specialization",
        provider: "University of Michigan",
        link: "https://www.coursera.org/specializations/postgresql-for-everybody",
        xp: 900,
        badge: "Data Keeper",
        color: "from-blue-700 to-indigo-800",
        tasks: [
            { id: "mod-1", title: "Module 1: Database Design", description: "Normalization (3NF)" },
            { id: "mod-2", title: "Module 2: SQL CRUD", description: "Advanced Selects & Joins" },
            { id: "mod-3", title: "Module 3: JSON & Natural Language", description: "Advanced Type handling" },
            { id: "mod-4", title: "Module 4: Database Architecture", description: "Indexing & Performance" }
        ],
        projects: [
            { 
                id: "capstone-4", 
                title: "Mission 4: The Archive", 
                description: "Spin up a Postgres Container. Map your Prisma Schema to the ER Model. Execute Migrations and write a Seeding script to populate the database with test data.", 
                xp: 900 
            }
        ]
    },
    {
        id: "stage-5",
        title: "Stage 5: Security & Auth",
        mode: "SECURITY",
        description: "Defending the colony from external threats.",
        courseTitle: "Cybersecurity Fundamentals Specialization",
        provider: "IBM",
        link: "https://www.coursera.org/specializations/cyber-security-fundamentals",
        xp: 750,
        badge: "Shield Guardian",
        color: "from-emerald-500 to-green-600",
        tasks: [
            { id: "mod-1", title: "Module 1: Introduction to Cybersecurity", description: "CIA Triad & Threats" },
            { id: "mod-2", title: "Module 2: Tools & Attacks", description: "Understanding Vectors" },
            { id: "mod-3", title: "Module 3: Identity IAM", description: "AuthN vs AuthZ" },
            { id: "mod-4", title: "Module 4: Compliance", description: "Standards & Regulations" }
        ],
        projects: [
            { 
                id: "capstone-5", 
                title: "Mission 5: The Shield", 
                description: "Implement JWT Authentication and RBAC. Secure your API endpoints so only 'Commanders' (Admins) can delete assets, while 'Pilots' (Users) can only view their flight logs.", 
                xp: 750 
            }
        ]
    },
    {
        id: "stage-6",
        title: "Stage 6: Docker & DevOps",
        mode: "OPS",
        description: "Automating the supply lines and deployment.",
        courseTitle: "DevOps and Software Engineering Professional Certificate",
        provider: "IBM",
        link: "https://www.coursera.org/specializations/devops-and-software-engineering",
        xp: 600,
        badge: "Fleet Commander",
        color: "from-orange-500 to-amber-600",
        tasks: [
            { id: "mod-1", title: "Module 1: Agile & Scrum", description: "Project Management" },
            { id: "mod-2", title: "Module 2: CI/CD with Jenkins/Actions", description: "Pipelines" },
            { id: "mod-3", title: "Module 3: Containerization (Docker)", description: "Building Images" },
            { id: "mod-4", title: "Module 4: Kubernetes Basics", description: "Orchestration" }
        ],
        projects: [
            { 
                id: "capstone-6", 
                title: "Mission 6: The Factory", 
                description: "Dockerize everything. Write a multi-stage Dockerfile for the App and API. Create a CI Pipeline in GitHub Actions that builds and tests your code on every push.", 
                xp: 600 
            }
        ]
    },
    {
        id: "stage-7",
        title: "Stage 7: Cloud Deployment",
        mode: "DEPLOY",
        description: "Colonizing the Google Cloud Platform.",
        courseTitle: "Google Cloud Engineering Professional Certificate",
        provider: "Google Cloud",
        link: "https://www.coursera.org/professional-certificates/google-cloud-engineer",
        xp: 1200,
        badge: "Galactic Conqueror",
        color: "from-blue-500 to-red-500", // Google colors hint
        tasks: [
            { id: "mod-1", title: "Module 1: Cloud Infrastructure", description: "GCP Core Services" },
            { id: "mod-2", title: "Module 2: Serverless (Cloud Run)", description: "Deploying Containers" },
            { id: "mod-3", title: "Module 3: Data Storage", description: "Cloud SQL & Storage" },
            { id: "mod-4", title: "Module 4: Monitoring", description: "Stackdriver & Logging" }
        ],
        projects: [
            { 
                id: "capstone-7", 
                title: "Mission 7: Liftoff", 
                description: "Deploy the Helpdesk to Production. Use Cloud Run for compute, Cloud SQL for data. Point your custom domain to the Load Balancer. Verify SSL is active. We are live!", 
                xp: 1200 
            }
        ]
    }
]
