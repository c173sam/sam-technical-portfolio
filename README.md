# 徐念齐 / Sam Technical Portfolio

高级暗黑技术作品集网页，面向 Technical Support、IT Support、PMO、Project Intern、Solution Intern 与 FDE 方向探索。

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion

## Run

```bash
npm install
npm run dev
```

默认开发地址：

```text
http://localhost:3000
```

## Build

```bash
npm run type-check
npm run build
```

静态导出目录：

```text
out
```

## Deploy to GitHub Pages

项目已包含 GitHub Actions 工作流：

```text
.github/workflows/deploy.yml
```

上线步骤：

```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

然后在 GitHub 仓库中打开：

```text
Settings -> Pages -> Build and deployment -> Source -> GitHub Actions
```

之后每次 push 到 `main` 分支都会自动更新网站。

## Content

个人信息集中在：

```text
data/profile.ts
```

页面没有编造项目、工作经历、头像或联系方式。`Contact` 区域只保留求职方向和目标城市，联系方式可在投递平台或招聘沟通渠道中补充。

## Design Notes

- 暗黑高级背景：aurora gradient、subtle grid、radial glow、noise texture 和慢速动态变化。
- 首屏：大字号姓名、动态文字入场、职位方向与两个 glow / border beam 按钮。
- 内容区：玻璃拟态卡片、hover lift、轻微 3D tilt、Bento Grid 技能区和职业路线 Timeline。
- 动效：section fade up、卡片 stagger reveal、首屏轻微 parallax。
- 响应式：移动端降低复杂度，保留清晰阅读和可点击区域。
