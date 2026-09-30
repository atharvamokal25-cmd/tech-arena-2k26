# ⚡ Tech Arena 2k26 - AI & Coding Challenge Platform

A modern, high-performance web application designed for running timed coding competitions, technical error analysis, numerical computation, and logical reasoning challenges.

---

## 🚀 Features

- **⚡ Participant Experience**:
  - Seamless registration & Set selection (Set A, Set B, Set C, or Custom Sets).
  - Real-time per-question timers & total competition stopwatch.
  - Rich code syntax block formatting.
  - Instant submission summaries with confetti celebrations and response receipt download.
- **🛡️ Secure Coordinator / Admin Panel**:
  - Full Question Set CRUD (create, edit, delete questions and sets).
  - Live Submission Logs with search & set filter.
  - **One-Click CSV Export** of participant records with detailed timestamps, per-question times, and answers.
  - Safe log clearing with two-step confirmation.
- **🎨 Modern Dark Aesthetic**:
  - Responsive glassmorphic layout, glowing neon accents, and smooth transitions.
  - Built with React 19, Vite, and Tailwind CSS.

---

## 🛠️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 🌐 Deploy to GitHub & Vercel

### Step 1: Push to GitHub
1. Create a new repository on [GitHub](https://github.com/new) (e.g. `tech-arena-2k26`).
2. Run the following commands in your terminal:
```bash
git add .
git commit -m "feat: complete Tech Arena 2k26 competition platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tech-arena-2k26.git
git push -u origin main
```

---

### Step 2: Deploy to Vercel

1. Log in to [Vercel](https://vercel.com) and click **"Add New..."** > **"Project"**.
2. Select your `tech-arena-2k26` repository from GitHub and click **Import**.
3. Vercel will automatically detect **Vite** as the framework preset.
4. *(Optional)* Under **Environment Variables**, you can add your custom coordinator login credentials:
   - `VITE_ADMIN_USER` (e.g. `AISA@TA`)
   - `VITE_ADMIN_PASS` (e.g. `YourSecurePassword2026`)
5. Click **Deploy**. Your competition platform will be live globally in under a minute!

---

## 🔒 Security & Environment Variables

Credentials are not hardcoded into any visible UI elements or client forms. You can configure coordinator credentials using environment variables:

| Variable | Description | Default Fallback |
| :--- | :--- | :--- |
| `VITE_ADMIN_USER` | Coordinator Admin Login Username | `AISA@TA` |
| `VITE_ADMIN_PASS` | Coordinator Admin Login Password | `AISA261` |

To test locally with custom credentials, create a `.env.local` file:
```env
VITE_ADMIN_USER=AISA@TA
VITE_ADMIN_PASS=YourCustomPassword
```
*(Note: `.env` and `.env.local` are automatically ignored by Git)*
