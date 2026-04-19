import { GraphData } from "@/interface/graph.interface";

export const skillsGraphData: GraphData = {
  nodes: [
    { id: "Skills" },

    // Categories
    { id: "Languages & Frameworks" },
    { id: "Frontend Tech" },
    { id: "Tools" },
    { id: "AI & LLM" },

    // Languages & Frameworks
    { id: "JavaScript" },
    { id: "TypeScript" },
    { id: "React.js" },
    { id: "Next.js" },
    { id: "React Native" },
    { id: "Node.js" },

    // Frontend Tech
    { id: "HTML" },
    { id: "CSS" },
    { id: "Redux" },
    { id: "React Testing Library" },
    { id: "Jest" },
    { id: "Styled Components" },
    { id: "Tailwind CSS" },
    { id: "Storybook" },

    // Tools
    { id: "Git" },
    { id: "GitHub" },
    { id: "Docker" },
    { id: "GitHub Actions" },
    { id: "Vim" },
    { id: "Xcode" },
    { id: "Android Studio" },
    { id: "Netlify" },
    { id: "Vercel" },
    { id: "Jenkins" },
    { id: "Mixpanel" },
    { id: "Jira" },
    { id: "Confluence" },
    { id: "Notion" },

    // AI & LLM
    { id: "Prompt Engineering" },
    { id: "Cursor" },
    { id: "Claude Code" },
    { id: "Ollama" },
    { id: "MCP Integration" },
  ],

  links: [
    // Root connections
    { source: "Skills", target: "Languages & Frameworks" },
    { source: "Skills", target: "Frontend Tech" },
    { source: "Skills", target: "Tools" },
    { source: "Skills", target: "AI & LLM" },

    // Languages & Frameworks
    { source: "Languages & Frameworks", target: "JavaScript" },
    { source: "Languages & Frameworks", target: "TypeScript" },
    { source: "Languages & Frameworks", target: "React.js" },
    { source: "Languages & Frameworks", target: "Next.js" },
    { source: "Languages & Frameworks", target: "React Native" },
    { source: "Languages & Frameworks", target: "Node.js" },

    // Frontend Tech
    { source: "Frontend Tech", target: "HTML" },
    { source: "Frontend Tech", target: "CSS" },
    { source: "Frontend Tech", target: "Redux" },
    { source: "Frontend Tech", target: "React Testing Library" },
    { source: "Frontend Tech", target: "Jest" },
    { source: "Frontend Tech", target: "Styled Components" },
    { source: "Frontend Tech", target: "Tailwind CSS" },
    { source: "Frontend Tech", target: "Storybook" },

    // Tools
    { source: "Tools", target: "Git" },
    { source: "Tools", target: "GitHub" },
    { source: "Tools", target: "Docker" },
    { source: "Tools", target: "GitHub Actions" },
    { source: "Tools", target: "Vim" },
    { source: "Tools", target: "Xcode" },
    { source: "Tools", target: "Android Studio" },
    { source: "Tools", target: "Netlify" },
    { source: "Tools", target: "Vercel" },
    { source: "Tools", target: "Jenkins" },
    { source: "Tools", target: "Mixpanel" },
    { source: "Tools", target: "Jira" },
    { source: "Tools", target: "Confluence" },
    { source: "Tools", target: "Notion" },

    // AI & LLM
    { source: "AI & LLM", target: "Prompt Engineering" },
    { source: "AI & LLM", target: "Cursor" },
    { source: "AI & LLM", target: "Claude Code" },
    { source: "AI & LLM", target: "Ollama" },
    { source: "AI & LLM", target: "MCP Integration" },
  ],
};

export type SkillNode = {
  id: string;
  children?: SkillNode[];
};

export const skillsMindMapData: SkillNode = {
  id: "Skills",
  children: [
    {
      id: "Languages & Frameworks",
      children: [
        { id: "JavaScript" },
        { id: "TypeScript" },
        { id: "React.js" },
        { id: "Next.js" },
        { id: "React Native" },
        { id: "Node.js" },
      ],
    },
    {
      id: "Frontend Tech",
      children: [
        { id: "HTML" },
        { id: "CSS" },
        { id: "Redux" },
        { id: "React Testing Library" },
        { id: "Jest" },
        { id: "Styled Components" },
        { id: "Tailwind CSS" },
        { id: "Storybook" },
      ],
    },
    {
      id: "Tools",
      children: [
        { id: "Git" },
        { id: "GitHub" },
        { id: "Docker" },
        { id: "GitHub Actions" },
        { id: "Vim" },
        { id: "Xcode" },
        { id: "Android Studio" },
        { id: "Netlify" },
        { id: "Vercel" },
        { id: "Jenkins" },
        { id: "Mixpanel" },
        { id: "Jira" },
        { id: "Confluence" },
        { id: "Notion" },
      ],
    },
    {
      id: "AI & LLM",
      children: [
        { id: "Prompt Engineering" },
        { id: "Cursor" },
        { id: "Claude Code" },
        { id: "Ollama" },
        { id: "MCP Integration" },
      ],
    },
  ],
};
