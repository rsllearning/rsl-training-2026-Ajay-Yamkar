export type ProjectStatus = "Active" | "Completed" | "At risk";

export type Project = {
  id: string; name: string; description: string; status: ProjectStatus;
  progress: number; owner: string; team: string[]; dueDate: string;
  category: string; tasks: { title: string; done: boolean; assignee: string }[];
  activity: { title: string; detail: string; time: string }[];
};

export const projects: Project[] = [
  { id: "p-101", name: "Customer Portal", description: "A unified self-service experience for customers to manage their accounts, requests, and subscriptions.", status: "Active", progress: 72, owner: "Priya Sharma", team: ["Priya Sharma", "Arjun Mehta", "Neha Patel"], dueDate: "Nov 18, 2026", category: "Web platform",
    tasks: [{title:"Finalize account overview",done:true,assignee:"Priya Sharma"},{title:"Implement notifications",done:true,assignee:"Arjun Mehta"},{title:"Accessibility review",done:false,assignee:"Neha Patel"},{title:"Production readiness",done:false,assignee:"Priya Sharma"}],
    activity: [{title:"Design review completed",detail:"Priya shared the updated account dashboard designs.",time:"2 hours ago"},{title:"Pull request merged",detail:"Notifications panel is now in the main branch.",time:"Yesterday"},{title:"Sprint planning",detail:"The team agreed on the next release scope.",time:"2 days ago"}] },
  { id: "p-102", name: "Analytics Workspace", description: "Give teams a clear picture of product performance with real-time dashboards and actionable insights.", status: "Active", progress: 48, owner: "Rahul Desai", team: ["Rahul Desai", "Aditi Rao", "Kabir Singh"], dueDate: "Dec 05, 2026", category: "Data & analytics",
    tasks: [{title:"Define KPI catalogue",done:true,assignee:"Rahul Desai"},{title:"Connect event pipeline",done:false,assignee:"Aditi Rao"},{title:"Build dashboard filters",done:false,assignee:"Kabir Singh"}],
    activity: [{title:"Event schema approved",detail:"Data contracts were approved by the platform team.",time:"4 hours ago"},{title:"Prototype shared",detail:"The first dashboard prototype is ready for feedback.",time:"Monday"}] },
  { id: "p-103", name: "Mobile Experience", description: "Improve the mobile journey with faster navigation, accessible components, and a refreshed design system.", status: "At risk", progress: 34, owner: "Ananya Kulkarni", team: ["Ananya Kulkarni", "Vikram Joshi"], dueDate: "Nov 12, 2026", category: "Mobile",
    tasks: [{title:"Audit current navigation",done:true,assignee:"Ananya Kulkarni"},{title:"Ship reusable components",done:false,assignee:"Vikram Joshi"},{title:"Run device testing",done:false,assignee:"Ananya Kulkarni"}],
    activity: [{title:"Timeline flagged",detail:"Device testing needs additional time.",time:"1 hour ago"},{title:"Component audit started",detail:"The team is reviewing shared UI components.",time:"Friday"}] },
  { id: "p-104", name: "Design System 2.0", description: "Create a consistent, accessible component library for product teams to build experiences faster.", status: "Completed", progress: 100, owner: "Meera Iyer", team: ["Meera Iyer", "Dev Shah", "Ishita Bose"], dueDate: "Oct 10, 2026", category: "Design",
    tasks: [{title:"Publish component library",done:true,assignee:"Meera Iyer"},{title:"Document usage patterns",done:true,assignee:"Dev Shah"},{title:"Run accessibility audit",done:true,assignee:"Ishita Bose"}],
    activity: [{title:"Release published",detail:"Design System 2.0 is available to all teams.",time:"2 weeks ago"},{title:"Accessibility checks passed",detail:"All critical issues have been resolved.",time:"3 weeks ago"}] },
  { id: "p-105", name: "Next.js Migration", description: "Modernize the marketing site using Next.js App Router, server rendering, and improved performance.", status: "Active", progress: 61, owner: "Karan Malhotra", team: ["Karan Malhotra", "Sana Khan", "Rohit Nair"], dueDate: "Nov 28, 2026", category: "Web platform",
    tasks: [{title:"Migrate core routes",done:true,assignee:"Karan Malhotra"},{title:"Add metadata and SEO",done:true,assignee:"Sana Khan"},{title:"Optimize images",done:false,assignee:"Rohit Nair"}],
    activity: [{title:"Route migration merged",detail:"The new App Router structure is in place.",time:"Yesterday"},{title:"Performance review",detail:"Initial Lighthouse results show improvement.",time:"3 days ago"}] },
  { id: "p-106", name: "Internal Help Center", description: "Make internal knowledge easier to find with searchable documentation and curated resources.", status: "Completed", progress: 100, owner: "Simran Gill", team: ["Simran Gill", "Aman Verma"], dueDate: "Sep 30, 2026", category: "Operations",
    tasks: [{title:"Import existing guides",done:true,assignee:"Simran Gill"},{title:"Add search",done:true,assignee:"Aman Verma"}],
    activity: [{title:"Help center launched",detail:"Employees can now browse the new knowledge hub.",time:"Last month"}] }
];

export function getProject(id: string) { return projects.find((project) => project.id === id); }
