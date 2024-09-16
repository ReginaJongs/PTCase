# Step 1: Build Angular application
FROM node:20 AS build

# 設置工作目錄
WORKDIR /app

# 複製 package.json 並安裝依賴
COPY package*.json ./
RUN npm install

# 複製 Angular 應用檔案
COPY . .

# Build Angular 應用
RUN npm run build

# Step 2: Setup Express server to serve the Angular build
FROM node:20

# 設置工作目錄
WORKDIR /app

# 複製來自 build 步驟的 Angular 檔案
COPY --from=build /app/dist/ptcase ./dist/ptcase

# 複製 Express 伺服器的檔案
COPY app.js ./
COPY package*.json ./

# 安裝 Express 依賴
RUN npm install --only=prod

# Expose port 4200
EXPOSE 4200

# 啟動伺服器
CMD ["node", "app.js"]
