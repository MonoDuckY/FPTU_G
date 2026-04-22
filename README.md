Dự án này sử dụng kiến trúc **Client-Server** hiện đại. Khác với cách học cũ (Server render ra toàn bộ giao diện HTML), ở dự án này, chúng ta tách biệt hoàn toàn phần nhìn (Frontend) và phần xử lý logic/dữ liệu (Backend). Hai hệ thống này giao tiếp với nhau qua **RESTful API** (dữ liệu định dạng JSON)

## 🛠 Tech Stack (Công nghệ sử dụng)

* **Frontend (Thư mục `frontend`):**
    * **Core:** React.
    * **Styling:** Tailwind CSS v3.
    * **State Management:** Zustand (Cái này sẽ để sau nhằm phục vụ JWT.
    * **Network:** Axios (để gọi API sang Backend).
* **Backend (Thư mục gốc/Spring Boot):**
    * **Core:** Java Spring Boot.
    * **Database:** MySQL.
    * **ORM:** Spring Data JPA / Hibernate.

---

## ⚙️ Yêu cầu môi trường (Prerequisites)
Để chạy được dự án này trên máy cá nhân, các bạn cần cài đặt sẵn:
1.  **Node.js** (Khuyên dùng bản LTS >= 18.x) - [Tải tại đây](https://nodejs.org/).
2.  **Java JDK** (Phiên bản 17).
3.  **MySQL Server & MySQL Workbench** - Dùng để quản lý cơ sở dữ liệu cục bộ.
4.  **IDE Khuyên dùng:** VS Code (cho Frontend) và IntelliJ IDEA (cho Backend).

---

## 🏃‍♂️ Hướng dẫn cài đặt và chạy dự án (Local Development)

### Bước 1: Khởi tạo Cơ sở dữ liệu (Database)
- Mở MySQL Workbench và chạy câu lệnh SQL sau để tạo database rỗng:
CREATE DATABASE fptu_g_db;
use fptu_g_db

### Bước 2: Cấu hình backend (Spring Boot)
- Tìm đến file cấu hình application.properties
- Chỉnh sửa thông tin kết nối:
spring.datasource.username=root
spring.datasource.password=mật_khẩu_mysql_của_bạn

### Bước 3: Khởi chạy Frontend (React)
- Cài đặt thư viện (chỉ cần làm lần đầu): npm install
- KHởi chạy giao diện: npm run dev

---

## Gudluck <3
