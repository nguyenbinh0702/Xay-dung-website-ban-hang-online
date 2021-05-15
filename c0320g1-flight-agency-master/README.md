# Đại lý vé máy bay
### Cấu trúc dự án 
    .
    └── src
        └── main
            ├── java
            │   ├── config                  # Chứa những class cho việc cấu hình server
            │   ├── controller              # REST API Controllers
            │   ├── dto                     # Pojo classes
            │   ├── exception               # Xử lí các ngoại lệ
            │   ├── model                   # Entity classes
            │   ├── repository              # Repository interfaces
            │   ├── security                # Security using JWT
            │   ├── service                 # Service interfaces
            │   │   └── impl                # Implement classes
            │   └── utility                 # Tools and utilities
            └── resources
                └── application.properties  # Giá trị dùng để kết nối database
       
 **Lưu ý:** Tạo file `application.properties` từ file mẫu `application-sample.properties` trước khi chạy!