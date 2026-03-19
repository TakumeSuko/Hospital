# 🏥 Hospital Patient Management System (Realtime)

![Next.js](https://img.shields.io/badge/Next.js-13+-black)
![Supabase](https://img.shields.io/badge/Supabase-Realtime-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-blue)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)

---

## 📌 Overview

ระบบนี้เป็น Web Application สำหรับจัดการข้อมูลผู้ป่วยในรูปแบบ **Real-time** โดยแบ่งออกเป็น 2 ส่วนหลัก:

- 👤 **Patient Form** — สำหรับผู้ป่วยกรอกข้อมูล
- 🧑‍⚕️ **Staff Dashboard** — สำหรับเจ้าหน้าที่ดูข้อมูลแบบ Live

💡 เมื่อผู้ป่วย submit ข้อมูล → Staff จะเห็นข้อมูลทันที **โดยไม่ต้อง refresh หน้า**

---

## 🧠 System Architecture

```text id="l9ccl4"
Patient (Frontend)
        ↓
   Supabase (Database + Realtime)
        ↓
Staff Dashboard (Frontend)
```

---

## ⚡ Key Features

### 👤 Patient Form

- ฟอร์มกรอกข้อมูลผู้ป่วยครบถ้วน:
  - First / Middle / Last Name
  - Date of Birth
  - Gender
  - Phone / Email
  - Address
  - Language / Nationality
  - Emergency Contact
  - Religion

- ✅ Form Validation
  - Required fields
  - Email format
  - Phone number (10 digits)

- 📱 Responsive Design (Mobile + Desktop)

---

### 🧑‍⚕️ Staff Dashboard

- แสดงข้อมูลผู้ป่วยแบบ Card UI
- แสดงข้อมูลครบทุก field
- Realtime Update (ไม่ต้อง refresh)

---

### 🔥 Realtime System

- ใช้ Supabase Realtime (PostgreSQL replication)
- Subscribe event:
  - `INSERT` → แสดงผู้ป่วยใหม่ทันที

---

## 🛠️ Tech Stack

| Layer      | Technology           |
| ---------- | -------------------- |
| Frontend   | Next.js (App Router) |
| Styling    | Tailwind CSS         |
| Backend    | Supabase (BaaS)      |
| Database   | PostgreSQL           |
| Realtime   | Supabase Realtime    |
| Deployment | Vercel               |

---

## 🚀 Getting Started

### 1. Clone Repository

```bash id="cwj2xq"
git clone <your-repo-url>
cd <project-folder>
```

---

### 2. Install Dependencies

```bash id="l07tnl"
npm install
```

---

### 3. Setup Environment Variables

สร้างไฟล์ `.env.local`

```env id="kl49lj"
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

📍 ดูค่าได้ที่:
Supabase → Project Settings → API

---

### 4. Setup Database

รัน SQL นี้ใน Supabase:

```sql id="4gxixk"
CREATE TABLE patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT,
  middle_name TEXT,
  last_name TEXT,
  dateofbirth DATE,
  gender TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  language TEXT,
  nationality TEXT,
  emergency_name TEXT,
  emergency_relation TEXT,
  religion TEXT,
  created_at TIMESTAMP DEFAULT now()
);
```

---

### 5. Enable Realtime

- ไปที่ Supabase Dashboard
- เปิด Realtime สำหรับ table `patients`

---

### 6. Run Project

```bash id="n6r9yv"
npm run dev
```

เปิดที่:

```id="kz68a7"
http://localhost:3000
```

---

## 🌍 Deployment

Deploy ด้วย Vercel:

1. Push code ขึ้น GitHub
2. Import project ใน Vercel
3. ใส่ Environment Variables
4. Deploy ได้ทันที 🚀

---

## 🎨 UI Preview

### 🏥 Patient Form

- ฟอร์มสวยงาม ใช้งานง่าย
- รองรับมือถือ

### 📊 Staff Dashboard

- Card layout
- แสดงข้อมูลครบ
- อัปเดตแบบ Real-time

---

## ⭐ Bonus Features

- ⚡ Real-time data sync (ไม่มี backend server)
- 🎨 Medical UI Theme
- 📱 Fully Responsive
- ✅ Advanced Form Validation
- 🔄 Live Update (Supabase Realtime)
- 🚫 No Page Refresh Needed
- ☁️ Cloud Deployment Ready

---

## 🧠 Design Decisions

- ใช้ **BaaS (Supabase)** แทน backend เพื่อลด complexity
- ใช้ **Realtime subscription** แทน WebSocket server
- แยก role ชัดเจน (Patient vs Staff)
- ใช้ Tailwind เพื่อความเร็วในการพัฒนา UI

---

## 🔮 Future Improvements

- เพิ่มสถานะผู้ป่วย (Waiting / In Progress / Done)
- เพิ่มระบบค้นหา / filter
- เพิ่ม authentication (Staff login)
- เพิ่ม pagination / performance optimization
- เพิ่ม audit log

---

## 📌 Conclusion

โปรเจคนี้แสดงให้เห็นถึง:

- การสร้างระบบ Real-time แบบ end-to-end
- การใช้ Next.js + Supabase อย่างมีประสิทธิภาพ
- การออกแบบ UI/UX สำหรับระบบจริง
- การ deploy พร้อมใช้งานจริง

---

## 👨‍💻 Author

- Developed by: **[Your Name]**
- Role: Frontend Developer / Fullstack (Next.js + Supabase)

---
