# SecureSight - Full-Stack Developer Intern Technical Assessment

This repository contains the complete submission for the SecureSight technical assessment. The project includes a full-stack CCTV monitoring dashboard and a professional, 3D product landing page, showcasing a wide range of frontend and backend development skills.

**Live URL:** `https://secure-sight-psi.vercel.app/`

---

## Features Implemented

### Mandatory: SecureSight Dashboard

* **Dynamic Incident Player:** A central video player that defaults to a live feed and dynamically displays the relevant footage when an incident is selected.
* **Real-Time Incident List:** A filterable list of all security incidents, separated into "Unresolved" and "Resolved" views.
* **Optimistic UI:** The "Resolve" button provides instant user feedback by fading out the incident row immediately while the API request is processed in the background.
* **Full-Stack Backend:**
    * **Database:** A SQLite database managed with Prisma ORM, featuring `Camera` and `Incident` models.
    * **API Routes:** Secure Next.js API routes for fetching incidents (`GET /api/incidents`) and resolving them (`PATCH /api/incidents/:id/resolve`).
    * **Database Seeding:** A robust seed script to populate the database with realistic, dynamic data for cameras and incidents.
* **Fully Responsive Design:** The entire dashboard, including the navbar and main layout, is fully responsive and functional on all devices from mobile to desktop.

### Optional / Extra Credit

* **Interactive Camera Timeline:** A professional, multi-track timeline component that visualizes all incidents across all cameras over a 24-hour period.
    * Features a draggable scrubber that snaps to the nearest incident.
    * Intelligently adapts its layout for mobile, tablet, and desktop screens for optimal user experience.
* **Professional 3D Product Page:** A stunning, "Apple-style" product landing page built with React Three Fiber to showcase the "MandlacX Edge Processor." (See it live at `https://secure-sight-psi.vercel.app//product-3d`)
    * Features a large, central 3D model with a cinematic entrance animation.
    * Includes a second 3D scene with a different layout and lighting.
    * Uses Framer Motion for premium, scroll-triggered animations and a professional feel.

---

## Tech Decisions

This project was built with a selection of modern web technologies chosen for performance, developer experience, and visual quality.

* **Framework: Next.js (App Router)**
    * **Why:** Provides a robust foundation with a hybrid of server and client components, file-based routing, and API route handling, which is perfect for a full-stack application.
* **Database & ORM: SQLite & Prisma**
    * **Why:** Prisma was chosen for its excellent TypeScript support and developer-friendly API. SQLite was used for its simplicity and file-based nature, making the project easy to set up and run without external dependencies.
* **3D Rendering: React Three Fiber & Drei**
    * **Why:** Instead of using Three.js directly, React Three Fiber allows for a declarative, component-based approach to building 3D scenes within React. The `drei` library provides essential helpers (like `OrbitControls`, `Environment`) that significantly accelerate development.
* **Styling: Tailwind CSS**
    * **Why:** A utility-first CSS framework was chosen for its speed and efficiency in building custom, responsive designs without writing custom CSS files.
* **Animation: Framer Motion**
    * **Why:** For UI animations on the 3D page, Framer Motion offers a simple and powerful API that works seamlessly with React, enabling fluid and professional-looking animations with minimal code.

---

## Deployment Instructions

This is a standard Next.js application. Vercel is the recommended hosting platform.

**Prerequisites:**
* Node.js (v18.x or later)
* npm or yarn

#### 1. Installation
Clone the repository and install the project dependencies:
```bash
git clone <your-repository-url>
cd <project-directory>
npm install
```

#### 2. Set Up the Database
This command will create the SQLite database file, apply the schema, and run the seed script to populate it with data.
```bash
npx prisma migrate dev --name init
```

#### 3. Running Locally
To run the application in development mode:
```bash
npm run dev
```
Open `http://localhost:3000` in your browser to see the main dashboard. The 3D product page is available at `http://localhost:3000/product-3d`.

#### 4. Deploying to Vercel
1.  Push your code to a Git repository (GitHub, GitLab, etc.).
2.  Sign up for a free account at [vercel.com](https://vercel.com).
3.  Import your Git repository into Vercel.
4.  Vercel will automatically detect that it's a Next.js project. It will build and deploy the application. No special configuration is needed.

---

## If I had more time… (Future Improvements)

* **Interactive 3D Hotspots:** Add clickable points on the 3D model that, when clicked, highlight the relevant feature card on the page.
* **Real-Time Dashboard Updates:** Implement WebSockets (e.g., using Socket.io) on the main dashboard to push new incidents to all connected clients in real-time without needing a refresh.
* **"Contact Sales" Form:** Implement a functional "Contact Sales" button on the 3D page with a modal form and email integration.
* **User Authentication:** Add a full authentication layer (e.g., using NextAuth.js) to the main dashboard to protect routes and manage user roles.
* **Advanced Filtering:** Add more advanced filtering options to the Incidents page, such as filtering by date range or camera.
