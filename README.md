# 404Game-Web

Panel web cho **Tu Tiên Bot** của 404 Game Studio. Giao diện chạy độc lập bằng HTML/CSS/JS thuần để có thể nối vào Fastify API hiện có mà không thêm dependency frontend.

## Chạy local

```powershell
cd E:\404GameStudio\404Game-Web
python -m http.server 4173
```

Mở http://localhost:4173.

## Luồng đã có trong UI

- Dashboard trạng thái bot, latency, uptime, thành viên và lệnh phổ biến.
- Cấu hình theo máy chủ: tên tông môn, đồng bộ thành viên, chào mừng, bảng xếp hạng.
- Wiki hướng dẫn và change log.
- Admin Studio cho owner: health check, audit trail và số liệu API.
- Discord-only authentication gate cho Login, Control và luồng mời bot; backend OAuth sẽ trỏ tới `/auth/discord`.

## Nối backend

Frontend không giữ PANEL_API_KEY. Backend cần xác thực Discord OAuth, kiểm tra quyền guild rồi gọi API Fastify hiện có tại /api/v1. Các endpoint hiện tại nằm trong TuTien-Bot/docs/api.md.


## Giao diện

- Song ngữ Việt/Anh bằng nút `VI / EN`, lưu lựa chọn trong `localStorage`.
- Dark mode và light mode bằng cùng design tokens, lưu lựa chọn trong `localStorage`.
- Tất cả card, button, input, tab, focus state và responsive breakpoint dùng chung hệ token trong `styles.css`.

## Routes UI

- `/` — Landing Page giới thiệu 404 Game Studio và các game.
- `/login.html` — Login Page chỉ có Discord OAuth, không có đăng ký hoặc mật khẩu riêng.
- `/panel.html` — Panel quản trị bot, yêu cầu xác thực Discord trước khi mở.
