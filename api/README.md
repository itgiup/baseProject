# Dev
```bash
docker compose up
yarn dev
```

```bash
 yarn add @fastify/autoload @fastify/cors @fastify/jwt @sinclair/typebox dotenv dotenv-expand fastify fastify-plugin fastify-recaptcha ioredis mongodb mongoose path telegraf winston 
```

# Deploy
1. Tạo gg recaptcha

2. Kết nối vps

3. Cài mongodb, redis, nginx, node, pm2

4. Tạo .env cho 3 repo, .env1, .env2 cho repo client, admin ( update port, domain, mongodb name, captcha, ...), tạo token trong admin và dán vào .env của client

6. Run: yarn install, yarn build ở 3 repo

5. Database
  <!-- - Đăng nhập vào db bằng mongosh, với:
    + `-u` là `MONGO_USERNAME` lấy trong file `.env` hoặc `MONGO_INITDB_ROOT_USERNAME` trong `docker-compose.yml`
    + `-p` là `MONGO_PASSWORD` lấy trong file `.env` hoặc `MONGO_INITDB_ROOT_PASSWORD` trong `docker-compose.yml`

```bash
mongosh
```
  - Tạo tài khoản admin, mật khẩu là 123456
```bash
use baseProject
db.users.insert({ username: 'it', password: '$2b$10$YUw9wzDnkgSeh0EGPKa7mObtlSO48r8Mm1F1OVx9E9OrxgT3syRCC' })
``` -->


  - file `src/init.ts` dùng để tạo database với ràng buộc, để chạy khởi tạo ban đầu, dùng lệnh:
```bash
yarn initapp
```
  - Mặc định: `username: admin`, `password: 123456`
  - *Mật khẩu được mã hóa dùng thư viện `bcrypt`*
```typescript
const saltRounds = 10;
const salt = await bcrypt.genSalt(saltRounds);
const hash = await bcrypt.hash(password, salt);
```


7. Tạo file ecosystem.config.json ở cùng thư mục với 3 repo
```json
{
  "apps": [
    {
      "name": "base api",
      "cwd": "./api",
      "script": "npm",
      "args" : "start",
      "env": {
        "PORT": "3001",
        "MONGO_NAME": "baseproject",
        "GROUP_ID": "-1111111111",
        "BOT_TOKEN": "00000000:xxxxxxxxxxxxxxxxxxxxxxxx"
      }
    },
    {
      "name": "base client",
      "cwd": "./client",
      "script": "npx",
      "args" : "serve -s build -p 3000"
    },
    {
      "name": "base admin",
      "cwd": "./admin",
      "script": "npx",
      "args" : "serve -s build -p 3002"
    },
  ]
}
```

8. Run: pm2 start ecosystem.config.json

9. cd /etc/nginx/sites-available/ , tạo file base.config
```yaml
# base api
server{
    listen 80;
    server_name api.baseproject.demo;
    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_pass http://127.0.0.1:3012;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
# base client
server{
    listen 80;
    server_name baseproject.demo;
    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
# base admin
server{
    listen 80;
    server_name admin.baseproject.demo;
    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

10. Khởi động lại nginx
```bash
sudo ln -s /etc/nginx/sites-avaiable/extension.config /et/nginx/sites-enabled/
sudo systemctl restart nginx
```
11. Check ...
