# Portal 订单管理系统

React 前端项目，使用 Nginx 部署。

---

## 环境要求

- Node.js >= 18
- Nginx

---

## 部署

### 1. 构建

```bash
npm install
npm run build
```

### 2. 部署到 Nginx

```bash
sudo cp -r dist/* /usr/share/nginx/html/
sudo cp nginx.conf /etc/nginx/conf.d/portal.conf
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

### 3. 访问

浏览器打开 `http://localhost`

---

## 环境变量

复制 `.env.example` 为 `.env`，填写实际值后重新构建。
