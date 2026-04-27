# Giai đoạn 1: Mượn một máy ảo có sẵn Gradle và Java 17 để Build code
FROM gradle:8.5-jdk17 AS builder
WORKDIR /app
# Copy toàn bộ mã nguồn của bạn vào máy ảo này
COPY . .
# Cấp quyền và đóng gói code thành file .jar
RUN chmod +x gradlew
RUN ./gradlew build -x test

# Giai đoạn 2: Tạo máy ảo thứ 2 siêu nhẹ (chỉ có JRE 17) để chạy App
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Nhặt file .jar đã đóng gói từ Giai đoạn 1 sang đây
COPY --from=builder /app/build/libs/*SNAPSHOT.jar app.jar
# Mở cổng 8080 để giao tiếp
EXPOSE 8080
# Lệnh khởi động server Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]