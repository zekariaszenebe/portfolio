# Zekarias Zenebe Ababu — Professional Portfolio Website

Official personal portfolio website for **Zekarias Zenebe Ababu**, a **Management Graduate** and **Customer Support Professional** at **Ethiopian Electric Utility (EEU)**, based in Addis Ababa, Ethiopia.

---

## 🌟 Key Highlights & Features

- **Executive Visual Identity**: Premium dark design with deep navy backgrounds (`#080C14`, `#0B111E`), primary orange accent (`#F4984A`), secondary green accent (`#59A650`), and Inter typography.
- **Hero Section**: Animated rotating titles typing effect, custom ZZA initials badge, status indicators, profile portrait, and authentic statistics.
- **Authentic Credentials**:
  - **Work Experience**: Ethiopian Electric Utility (EEU) Junior Customer Support Officer & Commercial Bank of Ethiopia (CBE) Customer Service Internship.
  - **Education**: BSc in Management from Mekdela Amba University.
  - **Core Skills**: Customer Service, CRM, Communication, Problem-solving, Teamwork, Microsoft Office, Time Management, Organizational Skills.
  - **Certificates**: Employability and Job Readiness Skills, Entrepreneurship Skills with document preview & verification modal.
- **Interactive Operational Prototypes**:
  1. **EEU Feeder Interruption Dashboard**: Live substation feeder monitoring simulator with customer premises lookup and automated outage SMS dispatch drafting.
  2. **Smart Meter Bill Calculator**: Progressive electricity tariff calculator tailored for Ethiopian tariffs in Ethiopian Birr (ETB), including kWh tier breakdown, service charges, VAT, and simulated prepaid smart meter tokens.
- **Real Contact Integration**: Direct Email, WhatsApp click-to-chat, LinkedIn, and functional contact form connected to an Express backend API, Firestore persistence, and mailto fallback.
- **Curriculum Vitae (CV) Viewer**: Built-in resume viewer with clean print/PDF generation and uploaded document support.
- **Private Administrator Panel (`/admin` or `#admin`)**:
  - Secure authentication.
  - Dashboard analytics overview.
  - Full CRUD operations for Homepage, About Me, Work Experience, Education, Skills, Certificates, Projects, and CV.
  - Live Preview toggle before publishing.
  - Visitor contact inquiries inbox with delete/reply actions.
  - Firebase configuration tester and manager.

---

## 🚀 Quick Start & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
The application will launch at `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```

---

## 🌐 Deploying to GitHub Pages

This portfolio is built to work seamlessly on **GitHub Pages** using client-side hash routing (`#home`, `#about`, `#experience`, `#education`, `#skills`, `#certificates`, `#projects`, `#contact`, `#admin`).

### Option A: Using GitHub Pages with GitHub Actions (Recommended)

1. Create a repository on GitHub (e.g., `zekarias-portfolio` or `zekariaszenebe.github.io`).
2. Push your project files to the `main` branch.
3. In your GitHub repository, go to **Settings** > **Pages**.
4. Under **Build and deployment** > **Source**, select **GitHub Actions**.
5. Add `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build app
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Option B: Custom Domain Configuration
To bind a custom domain (e.g. `zekariaszenebe.com`):
1. In repository settings > **Pages**, add your custom domain.
2. In your DNS provider (e.g. Cloudflare, Namecheap, GoDaddy), point an `A` record to GitHub's IPs or a `CNAME` record to `username.github.io`.

---

## 🔒 Firebase Integration Guide

The application is architected with dual-mode storage:
- **Offline / Static Mode**: Persists immediately in `localStorage` and memory so it works 100% out of the box even before Firebase is provisioned.
- **Cloud Firestore & Storage Mode**: Connects to your own Firebase project for multi-device sync and admin authorization.

### Step 1: Create a Project in Firebase Console
1. Go to [https://console.firebase.google.com/](https://console.firebase.google.com/) and create a new project.
2. Under **Build** > **Authentication**, enable:
   - **Email/Password**
   - **Google**
3. Under **Build** > **Firestore Database**, click **Create Database** (start in production mode).
4. Under **Build** > **Storage**, enable Firebase Storage.

### Step 2: Configure Security Rules
- Copy the rules from `firestore.rules` into your Firestore Rules tab.
- Copy the rules from `storage.rules` into your Storage Rules tab.

### Step 3: Connect Credentials
You can either:
- Set environment variables in `.env`:
  ```env
  VITE_FIREBASE_API_KEY="AIzaSy..."
  VITE_FIREBASE_PROJECT_ID="your-project-id"
  VITE_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
  VITE_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
  ```
- Or open the website, navigate to `#admin`, select the **Firebase & Rules** tab, paste your credentials, and click **Save & Test Connection**.

---

## 🛡️ Security & Architecture

- Zero-trust Firestore rules enforce that public visitors can read published portfolio content and submit validated contact inquiries, while only verified administrators can modify database records.
- File uploads are validated and restricted to the administrator.
- No private API keys or secrets are leaked to the client.

© 2026 Zekarias Zenebe Ababu. All rights reserved.
