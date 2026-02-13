# Game Ad ROI Dashboard

一个用于游戏广告投放分析与回本预测的前端仪表盘项目，基于 React + Vite + TypeScript。

## 功能概览

- ROI 预测曲线（默认 180 天）
- 回本天数计算（Breakeven）
- 渠道对比（ROAS / CPI / 回本天数 / LTV30）
- KPI 总览与模型状态展示
- 参数模拟器（CPI、留存、ARPU、预算等）
- 数据配置面板
- 配置持久化（`localStorage`）
- 配置导入/导出（JSON）
- 一键恢复默认配置

## 技术栈

- React 18
- TypeScript
- Vite 6
- Recharts
- Tailwind CSS
- Lucide Icons

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发环境

```bash
npm run dev
```

默认会输出本地地址（通常是 `http://localhost:5173`）。

### 3. 生产构建

```bash
npm run build
```

构建产物在 `dist/` 目录。

### 4. 本地预览构建产物

```bash
npm run preview
```

## 脚本说明

- `npm run dev`：启动开发服务器
- `npm run build`：TypeScript 检查 + Vite 构建
- `npm run preview`：预览 `dist` 构建结果
- `npm run lint`：运行 ESLint（注意：当前仓库未包含 `eslint.config.js` 时会报错）

## 部署说明（GitHub Pages）

`vite.config.ts` 中已设置：

```ts
base: '/game-ad-roi/'
```

这适用于仓库地址形如：

`https://<username>.github.io/game-ad-roi/`

如果你改了仓库名或部署路径，请同步修改 `base`。

## 数据与配置

- 默认数据来源：`src/data/mockData.ts`
- 本地持久化 key：
  - `game-ad-roi:params`
  - `game-ad-roi:kpi`
  - `game-ad-roi:channels`
  - `game-ad-roi:retention`
- 可在配置面板中：
  - 保存配置
  - 导入 JSON
  - 导出 JSON
  - 恢复默认

## 目录结构

```text
src/
  components/       # 图表、KPI、配置面板等组件
  data/             # 默认 mock 数据与预测逻辑
  pages/            # 页面容器（Dashboard）
  types/            # 类型定义
  App.tsx
  main.tsx
```

## 常见问题

### 1. 页面刷新后数据怎么恢复默认？

配置会保存在浏览器 `localStorage`。你可以：

- 在配置面板点击“恢复默认”
- 清理浏览器站点缓存 / `localStorage`

### 2. 为什么 `npm run lint` 会失败？

如果项目里没有 ESLint v9 的 `eslint.config.js` 配置文件，`lint` 会报错。可以补充配置后再运行。

## License

MIT

