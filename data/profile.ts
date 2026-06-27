export const profile = {
  name: "徐念齐",
  englishName: "Sam",
  school: "山东轻工职业学院",
  major: "现代通信技术",
  graduation: "2027年",
  targetCity: "上海",
  email: "",
  roles: [
    "Technical Support",
    "IT Support",
    "PMO",
    "Project Intern",
    "Solution Intern",
    "FDE方向探索"
  ],
  summary:
    "现代通信技术专业学生，关注技术支持、项目协作、系统部署、企业数字化场景和AI应用落地，希望进入外企或技术型团队积累实习经验。"
};

export const quickFacts = [
  { label: "School", value: profile.school },
  { label: "Major", value: profile.major },
  { label: "Graduation", value: profile.graduation },
  { label: "Target City", value: profile.targetCity }
];

export const skills = [
  {
    title: "通信基础",
    body: "理解现代通信技术专业基础，适合从系统、网络和现场问题的关联处切入。",
    span: "md:col-span-2"
  },
  {
    title: "网络基础",
    body: "持续夯实网络概念、排障思路和设备协同逻辑，为 IT Support 场景做准备。",
    span: ""
  },
  {
    title: "技术支持",
    body: "关注用户问题定位、复现、记录、升级和闭环，重视清晰沟通。",
    span: ""
  },
  {
    title: "项目协作",
    body: "面向 PMO / Project Intern，学习需求拆解、进度同步和跨角色协作。",
    span: "md:col-span-2"
  },
  {
    title: "文档整理",
    body: "适合沉淀部署记录、问题清单、会议纪要、操作步骤和交付材料。",
    span: ""
  },
  {
    title: "Office / Excel",
    body: "用于数据整理、项目表格维护、基础分析和日常办公协同。",
    span: ""
  },
  {
    title: "Git / Linux 学习中",
    body: "正在补齐工程协作和基础运维工具链，服务更真实的技术团队工作流。",
    span: ""
  },
  {
    title: "AI应用落地方向探索",
    body: "关注企业数字化场景中 AI 工具如何进入支持、交付、知识库和流程自动化。",
    span: "md:col-span-2"
  }
];

export const skillGroups = [
  {
    title: "Technical Support",
    summary: "问题理解、复现、排查、记录、升级和闭环。",
    items: ["问题定位", "用户沟通", "排障记录", "知识库意识"]
  },
  {
    title: "Project Support",
    summary: "面向 PMO / Project Intern 的进度、会议和材料协作。",
    items: ["会议纪要", "进度跟踪", "需求拆解", "交付材料"]
  },
  {
    title: "Tools",
    summary: "办公、工程协作和基础运维工具链持续学习。",
    items: ["Office", "Excel", "Git 学习中", "Linux 学习中"]
  },
  {
    title: "Communication",
    summary: "将技术问题翻译成可协作、可追踪、可交付的信息。",
    items: ["文档整理", "跨角色同步", "英文环境适应", "AI应用落地探索"]
  }
];

export const experiments = [
  {
    title: "Learning Projects",
    label: "In progress",
    body: "围绕通信基础、网络基础和技术支持场景整理学习笔记，逐步沉淀为可复用的排障与知识库材料。"
  },
  {
    title: "Web Experiments",
    label: "Exploring",
    body: "通过个人作品集页面练习 Next.js、Tailwind CSS、Framer Motion 与前端动效表达，理解技术内容如何被清晰呈现。"
  },
  {
    title: "Deployment Practice",
    label: "Practical",
    body: "使用 GitHub 与 GitHub Pages 完成静态站点部署，熟悉从本地构建到线上发布的基础流程。"
  }
];

export const timeline = [
  {
    title: "Technical Support",
    body: "从问题理解、复现、排查、记录和反馈开始，建立面向用户和系统的支持能力。"
  },
  {
    title: "IT Support / Helpdesk",
    body: "扩展到办公环境、网络基础、账号权限、终端与常见系统问题处理。"
  },
  {
    title: "PMO / Project Intern",
    body: "参与项目节奏管理、会议纪要、材料整理、进度跟踪和跨团队协作。"
  },
  {
    title: "Solution / Delivery",
    body: "理解客户场景、部署过程和交付文档，把技术支持能力连接到方案落地。"
  },
  {
    title: "FDE方向探索",
    body: "探索面向客户现场、企业系统和 AI 应用落地的复合型技术成长路径。"
  }
];
