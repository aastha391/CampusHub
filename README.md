# ⚡ CampusHub — All-in-One College Life Platform

> Your college life, all in one place.

🔗 **Live Demo:** [campus-hub-flax.vercel.app](https://campus-hub-flax.vercel.app)

---

## 🎯 What is CampusHub?

CampusHub is a digital campus ecosystem built to solve the chaos of college life — scattered event info, missed club announcements, unorganized notes, and poor resource sharing. It brings everything under one roof for students, club heads, and admins.

---

## 🚀 Features

### 🎓 Student
- Browse and RSVP to campus events
- Download and rate notes shared by seniors
- Join clubs and get announcements
- Explore hackathons and form teams
- Anonymous Q&A board and Lost & Found
- Personal profile with skills and branch info

### 📢 Club Head
- Post announcements (sent for admin approval)
- Add and manage club events
- View club members and engagement
- Share notes with students

### 🛡️ Admin
- Full event management (add / edit / delete)
- Approve or reject notes and announcements
- View RSVP analytics
- Manage user roles (student, club head, admin)

### 🌐 Platform-wide
- Role-based login (Student / Club Head / Admin)
- Animated 3D login page with intro sequence
- Notification system with unread count
- Search and filter across events, notes, clubs
- Hackathon team formation board with skill tags
- Responsive UI with smooth animations

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | CSS Modules (per-page) |
| State Management | React Context API |
| Routing | Page-based state (no React Router) |
| Deployment | Vercel |

---

## 🔐 Demo Login

On the login page, select your role (Student / Club Head / Admin) — credentials are auto-filled for demo access.

---

## 📁 Project Structure

```
src/
├── components/       # Layout, Sidebar, Toast, Navbar
├── context/
│   └── AppContext.jsx # Global state — auth, events, notes, clubs, etc.
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx  # Role-specific dashboards
│   ├── EventsPage.jsx
│   ├── ClubsPage.jsx
│   ├── NotesPage.jsx
│   ├── HackathonsPage.jsx
│   ├── QnAPage.jsx
│   ├── ResourcesPage.jsx
│   ├── ProfilePage.jsx
│   └── AdminPage.jsx
└── styles/           # Per-page CSS modules
    ├── dashboard.css
    ├── events.css
    ├── clubs.css
    ├── notes.css
    ├── admin.css
    ├── pages.css
    └── Login.css
```

---

## 👩‍💻 Built By

**Aastha Sheoran** — [github.com/aastha391](https://github.com/aastha391)

Built with React + Vite · 2025
