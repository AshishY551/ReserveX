## **ReserveX – Online Booking Platform**

### **Overview**

ReserveX is a **robust, full-stack online booking platform** designed to handle service reservations, real-time slot availability, and a scalable admin dashboard. Built with **Next.js (TypeScript)**, **Supabase (Postgres + Auth)**, and **Tailwind CSS**, ReserveX is architected for multiple launches with advanced features like payments, notifications, multi-vendor support, and analytics in future updates.

---

### **Key Features (Launch‑1)**

- **User Authentication:** Secure sign up, login, and role-based access (User/Admin).
- **Service Catalog:** Browse available services with descriptions, duration, and pricing.
- **Real-Time Slot Availability:** View available time slots and prevent double bookings with transactional checks.
- **Booking Management:** Users can book, view, and cancel bookings.
- **Admin Dashboard:** Create and manage services, generate time slots, and view bookings.
- **Responsive Design:** Works seamlessly across desktop and mobile devices.

---

### **Future Launch Features (Planned)**

- Payment Gateway Integration (Razorpay/Stripe)
- Email/SMS reminders and booking confirmations
- Google/Outlook Calendar Sync
- Reviews & Ratings for services
- Multi-vendor support (SaaS model)
- Dynamic Pricing and Coupons
- Full PWA (offline support & push notifications)

---

### **Tech Stack**

- **Frontend & Server:** [Next.js 14](https://nextjs.org/) (TypeScript, App Router)
- **Backend & Database:** [Supabase](https://supabase.com/) (Postgres + Auth + RLS)
- **UI:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **State & Data:** React Query (TanStack), Zod for validation
- **Deployment:** [Vercel](https://vercel.com/) for frontend/backend, Supabase hosted database

---

### **Getting Started (Local Setup)**

#### **1. Clone the repository**

#### **2. Install dependencies**`

#### **3. Setup environment variables**

#### **4. Run locally**

```
npm run dev
```

Visit: `http://localhost:3000`

---

### **Deployment**

- **Frontend & Backend:** Deployed on **Vercel**
- **Database & Auth:** Hosted on **Supabase**

**Vercel Deploy:**

```
vercel
```

---

### **License**

This project is developed as part of an advanced internship task and future open-source plans.

---
