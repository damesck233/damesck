# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 仓库结构

这是一个三层应用：

```
code/    # 主站前端（React SPA）
api/     # 博客后端 API（Express + SQLite）
admin/   # 管理后台（React SPA）
nginx/   # Nginx 配置
```

## 常用命令

### 主站前端（`code/`）
```bash
cd code
pnpm install       # 安装依赖
pnpm run dev       # 启动开发服务器（默认 5173 端口）
pnpm run build     # 构建生产版本（tsc + vite build）
pnpm run lint      # ESLint 检查
```

### 后端 API（`api/`）
```bash
cd api
npm install
npm run dev        # tsx watch 热重载（端口 3001）
npm run build      # tsc 编译到 dist/
npm run db:seed    # 初始化数据库种子数据
```

### 管理后台（`admin/`）
```bash
cd admin
pnpm install
pnpm run dev       # 开发服务器（端口 5174）
pnpm run build     # tsc + vite build
```

### Docker 部署
```bash
# 主站 → 908 端口，管理后台 → 909 端口，API → 3001 端口
docker compose up -d

# 手动更新脚本（仅构建主站前端）
./update.sh
```

## 架构说明

### 主站前端（`code/`）

**框架**：React 19 + TypeScript + Vite + Tailwind CSS 3.4 + Framer Motion 12

**核心设计模式**：
- Apple/iOS 美学：圆角 32px、毛玻璃（`backdrop-blur-xl`）、弹簧物理动画
- 顶部导航使用 `DynamicIslandNav`（灵动岛样式），非传统 Header
- 性能优化：`PerformanceContext` 检测低端设备，低配时禁用动画（`isLowPerf`）
- 页面组件全部 `lazy()` 加载，并在首屏后并行预热
- 卡片展开动画使用 Framer Motion `layoutId`（Morph 过渡）

**主题系统**：
- 亮/暗色通过 `<html>` 的 `dark` class 切换，配合 Tailwind `dark:` 前缀
- Win98 彩蛋：4月1日或 `?win98=true` 时为 `<html>` 添加 `win98` class

**博客数据流**：
- `useBlogPosts.ts` → 优先请求 `VITE_API_URL/api/posts`（5s 超时）
- 失败时 fallback 到 `src/data/blog/data.ts` 静态数据

**CSS 变量**：亮/暗色主题颜色定义在 `src/index.css` 的 `:root` / `.dark` 选择器

### 后端 API（`api/`）

**框架**：Express 4 + better-sqlite3 + JWT（jsonwebtoken + bcryptjs）

**路由结构**：
- `/api/auth/*` → `routes/auth.ts`（登录，获取 JWT）
- `/api/*` → `routes/public.ts`（公开端点：posts、categories）
- `/api/admin/*` → `routes/admin.ts`（受保护 CRUD，需 JWT）

**数据库**：SQLite，路径 `api/data/blog.db`，启动时自动执行 `migrate()`，WAL 模式。表：`users`、`categories`、`posts`、`post_categories`。

**CORS**：允许所有 `localhost:*`、`https://damesck.net`、`https://admin.damesck.net`

**环境变量**：`api/.env`（本地）。`PORT`、`JWT_SECRET`、`ADMIN_USERNAME`、`ADMIN_PASSWORD`、`DB_PATH`（可选）。

### 管理后台（`admin/`）

**框架**：React 19 + Vite + TanStack Query v5 + Tailwind CSS 3 + lucide-react

**环境变量**：`admin/.env`，需配置 `VITE_API_URL=http://localhost:3001/api`

### Nginx 部署

- `nginx/default.conf` → 主站 SPA，所有路由 fallback 到 `index.html`
- `nginx/admin.conf` → 管理后台 SPA + `/api/` 反向代理到 `api_damescknet:3001`

## 环境变量

| 变量 | 位置 | 说明 |
|---|---|---|
| `VITE_API_URL` | `code/.env` | 主站 API 地址，默认 `https://api.damesck.net` |
| `VITE_API_URL` | `admin/.env` | 管理后台 API 地址，本地开发用 `http://localhost:3001/api` |
| `PORT` | `api/.env` | API 端口，默认 3001 |
| `JWT_SECRET` | `api/.env` | JWT 签名密钥 |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | `api/.env` | 初始管理员账号 |
