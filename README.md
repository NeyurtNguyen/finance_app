# 💰 Ví Của Tôi — Quản Lý Tài Chính Cá Nhân

> Ứng dụng theo dõi thu chi cá nhân, tách riêng ví **Tiền mặt** và **Ngân hàng**, giao diện vui tươi và tự chuyển **Sáng/Tối** theo hệ thống.

<p>
  <img src="https://img.shields.io/badge/Expo-SDK%2057-000020?logo=expo&logoColor=white" alt="Expo SDK 57" />
  <img src="https://img.shields.io/badge/React%20Native-Expo%20Router-61DAFB?logo=react&logoColor=white" alt="React Native" />
  <img src="https://img.shields.io/badge/NativeWind-4.x-38BDF8?logo=tailwindcss&logoColor=white" alt="NativeWind 4" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/State-Zustand-593d88" alt="Zustand" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License" />
</p>

---

## 📱 Ảnh chụp màn hình

| Trang chủ (Sáng)                      | Trang chủ (Tối)                      | Thêm giao dịch                                  |
| ------------------------------------- | ------------------------------------ | ----------------------------------------------- |
| ./src/docs/screenshots/home-light.jpg | ./src/docs/screenshots/home-dark.jpg | ./src/docs/screenshots/add-transaction-dark.jpg |

---

## ✨ Tính năng

- 📊 **Tổng số dư tách riêng** — theo dõi độc lập ví **Tiền mặt** và **Ngân hàng**, cộng/trừ tự động theo từng giao dịch
- 🔍 **Lọc nhanh** giao dịch theo Tất cả / Thu / Chi
- 🏷️ **8 danh mục** có sẵn (Lương, Ăn uống, Di chuyển, Hóa đơn...) + danh mục **"Khác" cho phép nhập tên tuỳ ý**
- 🗑️ **Xoá giao dịch an toàn** — luôn có hộp thoại xác nhận trước khi xoá, tránh xoá nhầm
- 🌗 **Dark mode tự động** theo cài đặt hệ thống, không cần bật/tắt thủ công
- 💾 **Lưu offline** — dữ liệu persist qua Zustand + AsyncStorage, mất mạng vẫn dùng được
- 🇻🇳 **Bản địa hoá đầy đủ** — giao diện tiếng Việt, định dạng tiền tệ VNĐ

---

## 🛠️ Tech Stack

| Layer            | Công nghệ                                                                   |
| ---------------- | --------------------------------------------------------------------------- |
| Framework        | [Expo](https://expo.dev) SDK 57                                             |
| Điều hướng       | [Expo Router](https://docs.expo.dev/router/introduction/)                   |
| Styling          | [NativeWind 4](https://www.nativewind.dev/) (Tailwind CSS cho React Native) |
| State management | [Zustand](https://zustand-demo.pmnd.rs/) + middleware `persist`             |
| Lưu trữ local    | `@react-native-async-storage/async-storage`                                 |
| Icon             | `@expo/vector-icons` (Ionicons)                                             |
| Font             | Fredoka (tiêu đề) · Be Vietnam Pro (nội dung, hỗ trợ tiếng Việt)            |
| Ngôn ngữ         | TypeScript (strict)                                                         |

---

## 🚀 Bắt đầu

### Yêu cầu

- Node.js ≥ 18
- Expo Go (thiết bị thật) hoặc iOS Simulator / Android Emulator

### Cài đặt

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
npm install
```

### Chạy ứng dụng

```bash
npx expo start
```

Quét mã QR bằng ứng dụng **Expo Go**, hoặc nhấn `i` / `a` để mở simulator.

---

## 📂 Cấu trúc project

```
src/
├─ app/                    # Màn hình (Expo Router)
│  ├─ _layout.tsx          # Root layout, load font, đăng ký modal
│  ├─ index.tsx            # Trang chủ
│  ├─ add-transaction.tsx  # Thêm giao dịch (modal)
│  └─ global.css           # Tailwind directives
├─ components/
│  ├─ BalanceCard.tsx       # Thẻ số dư Tổng / Tiền mặt / Ngân hàng
│  ├─ SegmentedControl.tsx  # Bộ lọc Tất cả / Thu / Chi
│  ├─ TransactionRow.tsx    # Dòng giao dịch + nút xoá có xác nhận
│  └─ CategoryPicker.tsx    # Chọn danh mục dạng chip cuộn ngang
├─ constants/
│  ├─ categories.ts         # Danh sách danh mục mặc định
│  ├─ theme.ts               # Bảng màu theo danh mục (sáng/tối)
│  └─ format.ts               # Định dạng tiền tệ VNĐ
├─ store/
│  └─ useFinanceStore.ts    # Zustand store, persist AsyncStorage
└─ types/
   └─ finance.ts             # Định nghĩa Transaction, Category
```

---

## 🗺️ Roadmap

- [ ] Màn **Thống kê** — biểu đồ chi tiêu theo danh mục / theo tháng
- [ ] Chỉnh sửa giao dịch đã tạo (hiện chỉ thêm mới hoặc xoá)
- [ ] Đặt hạn mức chi tiêu (budget) theo danh mục
- [ ] Xuất báo cáo thu chi (CSV/PDF)
- [ ] Cho phép người dùng tự chọn theme thay vì chỉ theo hệ thống

---

## 📄 License

Phát hành theo giấy phép [MIT](LICENSE).
