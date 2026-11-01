# 🚀 Full-Stack MERN Job Application Tracker

A secure, full-stack Job Application Tracker built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring JWT authentication, a responsive dark-mode UI, status management, and PDF resume uploads.

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Vite, Axios
- **Backend:** Node.js, Express.js, Mongoose, Multer (for PDF file handling)
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT), bcryptjs

---

## ✨ Features

- **Secure Authentication:** User registration and login with JWT session protection.
- **Job CRUD Operations:** Add, view, update, and delete job applications.
- **PDF Resume Uploads:** Attach and view resume documents per application using Multer storage.
- **Status Tracking:** Switch job application statuses (Applied, Interviewing, Offer, Rejected).
- **Dark Mode UI:** A clean, modern dark-themed interface built with Tailwind CSS.

---

## ⚙️ Getting Started / Local Installation

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
cd job-tracker-app
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:
```bash
npm run dev
```

### 3. Setup Frontend
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```

---

## 🗺️ Feature Roadmap

- [ ] **Kanban Board Layout (`@hello-pangea/dnd`):** Drag-and-drop job cards across Applied, Interviewing, Offer, and Rejected columns.
- [ ] **Visual Analytics Dashboard (`Recharts`):** Charts and application conversion rate stats.
- [ ] **Search & Filter Controls:** Real-time search by company name, job title, or location.
