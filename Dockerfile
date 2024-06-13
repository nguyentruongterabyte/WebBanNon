# Sử dụng Node.js image chính thức từ Docker Hub
FROM node:18-alpine AS build

# Đặt thư mục làm việc là /app
WORKDIR /app

# Sao chép file package.json và package-lock.json vào thư mục làm việc
COPY package.json ./
COPY package-lock.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Build ứng dụng cho môi trường production
RUN npm run build

# Sử dụng Nginx image chính thức từ Docker Hub
FROM nginx:alpine

# Sao chép build output từ giai đoạn build vào thư mục Nginx phục vụ
COPY --from=build /app/dist /usr/share/nginx/html

# Sao chép file cấu hình Nginx tùy chỉnh nếu có (tùy chọn)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose cổng mà Nginx sẽ lắng nghe
EXPOSE 80

# Khởi chạy Nginx khi container được chạy
CMD ["nginx", "-g", "daemon off;"]
