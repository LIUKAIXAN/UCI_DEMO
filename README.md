# UCI Demo — Portal 订单管理系统

基于 **Vite + React + TypeScript + Tailwind CSS** 构建的现代前端项目。

---

## 快速本地运行

### 前置条件

安装 [Node.js](https://nodejs.org/)（v18 或更高版本）。

### 步骤一：安装依赖

```bash
npm install
```

### 步骤二：（可选）配置环境变量

```bash
copy .env.example .env.local
```

编辑 `.env.local`，填入 Gemini API Key（如需要使用 AI 功能）：

```
GEMINI_API_KEY="你的Gemini_API密钥"
```

> 不配置此项不影响 UI 界面显示，仅 AI 功能不可用。

### 步骤三：启动开发服务器

```bash
npm run dev
```

终端输出类似：

```
VITE v6.x.x  ready in xxx ms
  ➜  Local:   http://localhost:3000/
```

用浏览器打开 **http://localhost:3000** 即可看到应用。

---

## 其他常用命令

| 命令 | 用途 |
|------|------|
| `npm run dev` | 启动开发服务器（热更新） |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 本地预览生产构建 |
| `npm run lint` | TypeScript 类型检查 |

---

## 项目结构

```
├── index.html              # 页面入口（由 Vite 处理）
├── package.json            # 项目依赖和脚本
├── vite.config.ts          # Vite 构建配置
├── tsconfig.json           # TypeScript 配置
├── .env.example            # 环境变量模板
├── public/                 # 静态资源
└── src/
    ├── main.tsx            # React 应用入口
    ├── App.tsx             # 路由配置
    ├── index.css           # 全局样式（Tailwind）
    ├── context/            # 全局状态
    ├── data/               # 模拟数据
    ├── layouts/            # 布局组件
    ├── pages/              # 页面组件
    ├── components/         # UI 组件
    └── lib/                # 工具函数
```

> **注意**：本项目不是普通静态 HTML 项目，不能直接双击 `index.html` 运行，必须通过 Vite 开发服务器启动。
