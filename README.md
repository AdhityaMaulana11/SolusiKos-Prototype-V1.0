# Domira Prototype

## 🚧 Project Status: Interactive SaaS Prototype (Frontend-Only) 🚧

**Domira** is a high-fidelity web prototype of a boarding house (kos) marketplace platform inspired by Mamikos.

This prototype is built specifically for **P2MW competition purposes** and demonstrates a production-grade SaaS experience using fully simulated (dummy) data.

⚠️ Important:  
This is a frontend-only interactive prototype.  
No backend, no real authentication, no real payment processing.

---

# 🌆 Service Coverage

Domira currently serves the **Rebana Metropolitan** area:

- Kota Cirebon
- Kabupaten Cirebon
- Kuningan
- Majalengka
- Indramayu

The platform is designed to scale to broader regions in future phases.

---

# ✨ Core Features

## 👥 Multi-Role System (Switchable for Demo)

The prototype supports 3 interactive roles:

### 1️⃣ Tenant (Penghuni)

- Search kos by region (Rebana Metropolitan)
- Advanced filtering:
  - Price range
  - Room type
  - Rental period (Weekly / Monthly / Yearly)
  - Gender
  - Facilities
- Property detail page with:
  - Gallery
  - Facilities
  - Owner info
  - Availability
- Enhanced booking system:
  - Move-in date picker
  - Rental duration selector
  - Dynamic price breakdown
  - Admin fee simulation
- Dummy checkout with payment method selection
- In-app notification center
- Q&A feature (“Ask the Owner”)
- Contact Admin modal
- Survey visit scheduling
- Tenant dashboard:
  - Rental summary
  - Payment countdown
  - Status tracking
  - Payment history
  - Survey status

---

### 2️⃣ Boarding House Owner (Penyedia Kos)

- SaaS-style dashboard
- Overview cards:
  - Total rooms
  - Occupied rooms
  - Empty rooms
  - Monthly revenue
  - Pending payments
- Room management table
- Occupancy & payment status
- Survey request management
- Cashflow analytics page
- Revenue chart (dummy data)
- Admin fee breakdown
- Membership comparison & upgrade simulation

---

### 3️⃣ Service Provider

Categories:

- Laundry Service
- Room Cleaning Service
- Repair & Maintenance Service

Features:

- Service request list
- Accept / complete simulation
- Earnings dashboard
- Income chart
- Admin fee deduction summary
- Membership upgrade UI

---

# 🔔 Notification System (UI Simulation)

Includes:

- In-app notification bell
- Badge counter
- Payment success
- Survey booking confirmation
- Q&A reply
- Due reminder
- Membership expiry warning

All notifications are simulated via frontend state.

---

# 💳 Admin Fee System (Simulation)

Each transaction clearly displays:

- Base price
- Rental duration calculation
- Platform admin fee
- Final total

This demonstrates Domira' revenue model.

---

# 🌙 Dark Mode Support

- Fully functional dark mode toggle
- Persisted using localStorage
- Clean SaaS dark theme
- Optimized contrast & accessibility

---

# 🔄 Role Switching (For Demo)

Includes instant role switching:

- Tenant View
- Owner View
- Service Provider View

Designed for smooth P2MW presentation flow.

---

# 📱 Responsive Design

- Mobile-first approach
- Optimized for:
  - Desktop
  - Tablet
  - Mobile
- Dashboard adapts responsively
- Booking flow feels mobile-app ready

---

# 🛡 Deployment Safe

This prototype:

- Uses static/mock data only
- Has no backend dependency
- No secret keys
- No payment SDK integration
- Fully deployable on Vercel

---

# 🛠️ Technology Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Charts:** Recharts
- **Animation:** Framer Motion

---

# 🚀 Getting Started

## Prerequisites

- Node.js (v18+ recommended)
- npm / pnpm / yarn

## Installation

```bash
git clone https://github.com/AdhityaMaulana11/Domira-Prototype-V1.0.git
cd domira-prototype-v1-0
npm install
```

## Run Development Server

```bash
npm run dev
```

Open:
http://localhost:3000

---

# 🎯 Vision

Domira aims to:

- Digitize kos management in regional Indonesia
- Simplify rental discovery
- Empower local property owners
- Create a digital service ecosystem around boarding houses
- Scale into a mobile application in future phases
