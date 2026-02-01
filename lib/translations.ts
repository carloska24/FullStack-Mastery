export type Language = 'en' | 'pt'

export const translations = {
  en: {
    sidebar: {
      dashboard: "Dashboard",
      roadmap: "Roadmap",
      achievements: "Achievements",
      certificate: "Certificate",
      home: "Home",
      streak: "Day Streak",
      nextReward: "Next Reward: 50 XP to Badge"
    },
    dashboard: {
      currentObjective: "Current Objective",
      learningPath: "My Learning Path",
      learningPathDesc: "Complete tasks to earn XP and unlock new badges.",
      continueCourse: "Continue Course",
      viewMaterial: "View Course Material",
      badgeEarned: "BADGE EARNED"
    },
    roadmap: {
      title: "My Learning Roadmap",
      subtitle: "Visualize your journey to Full Stack Mastery.",
      stage: "Stage",
      modules: "Modules"
    },
    detail: {
      backToRoadmap: "Back to Roadmap",
      stageDetail: "Stage Detail",
      reward: "Reward",
      startCourse: "Start Course",
      complete: "Complete",
      curriculum: "Curriculum Checklist",
      projects: "Hands-on Projects",
      viewSpec: "View Spec",
      noProjects: "No projects assigned for this stage yet."
    },
    gamification: {
        taskCompleted: "Task Completed!",
        badgeUnlocked: "🏆 BADGE UNLOCKED",
        congrats: "Congratulations! You mastered this stage."
    }
  },
  pt: {
    sidebar: {
      dashboard: "Painel",
      roadmap: "Roteiro",
      achievements: "Conquistas",
      certificate: "Certificado",
      home: "Início",
      streak: "Dias de Ofensiva",
      nextReward: "Próx. Recompensa: 50 XP p/ Insígnia"
    },
    dashboard: {
      currentObjective: "Objetivo Atual",
      learningPath: "Minha Jornada de Estudo",
      learningPathDesc: "Complete tarefas para ganhar XP e desbloquear insígnias.",
      continueCourse: "Continuar Curso",
      viewMaterial: "Ver Material",
      badgeEarned: "INSÍGNIA GANHA"
    },
    roadmap: {
      title: "Meu Roteiro de Aprendizado",
      subtitle: "Visualize sua jornada para a Maestria Full Stack.",
      stage: "Fase",
      modules: "Módulos"
    },
    detail: {
      backToRoadmap: "Voltar ao Roteiro",
      stageDetail: "Detalhes da Fase",
      reward: "Recompensa",
      startCourse: "Iniciar Curso",
      complete: "Completo",
      curriculum: "Checklist Curricular",
      projects: "Projetos Práticos",
      viewSpec: "Ver Especificação",
      noProjects: "Nenhum projeto atribuído para esta fase ainda."
    },
    gamification: {
        taskCompleted: "Tarefa Concluída!",
        badgeUnlocked: "🏆 INSÍGNIA DESBLOQUEADA",
        congrats: "Parabéns! Você dominou esta fase."
    }
  }
}
