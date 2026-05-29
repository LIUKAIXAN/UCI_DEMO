# Portal 订单管理系统

React 前端项目，用 IIS 部署运行。

---

## 快速部署（3 步）

### 1. 启用 IIS

控制面板 → 程序 → 启用或关闭 Windows 功能 → 勾选 **Internet Information Services** → 确定。

### 2. 配置站点

- `Win + R` → 输入 `inetmgr` → 回车
- 右键 **网站** → **添加网站**
- 网站名随便填，物理路径选 `dist/` 文件夹，端口填 `8080` → 确定

### 3. 访问

浏览器打开 `http://localhost:8080`

---

## 修改代码后重新构建

```bash
npm install
npm run build
```

然后刷新浏览器即可。

---

## 常见问题

| 现象 | 解决 |
|------|------|
| 报 500.19 错误 | web.config 已精简，不会出此问题 |
| 页面打不开 | IIS 管理器里确认站点已启动 |
| 样式/JS 404 | `.env` 里 `VITE_BASE="/"` 是否正确 |
