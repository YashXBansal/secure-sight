SecureSight - MandlacX Edge Processor Showcase
This is a modern, visually-rich product landing page designed to showcase the "MandlacX Edge Processor." It features a dynamic 3D model of the product, smooth animations, and a sleek, dark-themed interface. The project is built with Next.js and leverages React Three Fiber for its 3D rendering capabilities.

Tech Stack & Key Decisions
This project was built with a selection of modern web technologies chosen for performance, developer experience, and visual quality.

Framework: Next.js (React)

Why: Next.js provides a robust foundation with server-side rendering (SSR) and static site generation (SSG) for fast initial page loads, which is crucial for a public-facing product page. Its file-based routing and built-in optimizations simplify development.

3D Rendering: React Three Fiber & Drei

Why: Instead of using Three.js directly, React Three Fiber allows for a declarative, component-based approach to building 3D scenes within React. This integrates seamlessly with the rest of the application's state and logic. The drei library was used to provide helpful abstractions and components (like OrbitControls, Environment, useGLTF) that significantly speed up development.

Styling: Tailwind CSS

Why: A utility-first CSS framework was chosen for its speed and efficiency in building custom designs without writing custom CSS. It ensures consistency and makes the layout responsive and easy to maintain.

Animation: Framer Motion

Why: For UI animations (like the fade-in and slide-up effects on cards and text), Framer Motion offers a simple and powerful API that works seamlessly with React components. It enables the creation of fluid and professional-looking animations with minimal code.

Deployment Instructions
This project is a standard Next.js application and can be deployed to any platform that supports Node.js. Vercel (the creators of Next.js) is the recommended hosting platform for optimal performance.

Prerequisites
Node.js (v18.x or later)

npm, yarn, or pnpm

1. Installation
Clone the repository and install the project dependencies:

git clone <your-repository-url>
cd <project-directory>
npm install

2. Running Locally
To run the application in development mode:

npm run dev

Open http://localhost:3000 in your browser to see the result.

3. Building for Production
To create a production-ready build of the application:

npm run build

This will create an optimized build in the .next folder. You can then run the production server with npm start.

4. Deploying to Vercel
Push your code to a Git repository (GitHub, GitLab, etc.).

Sign up for a free account at vercel.com.

Import your Git repository into Vercel.

Vercel will automatically detect that it's a Next.js project, configure the build settings, and deploy.

If I had more time… (Future Improvements)
Given more time, the following features and optimizations could be implemented:

Interactive 3D Hotspots: Add clickable points on the 3D model that, when clicked, scroll to the relevant feature card or display a modal with more information.

Advanced Post-Processing: Re-integrate a post-processing library to add more advanced visual effects like depth of field, realistic bloom, and screen-space reflections to the 3D scenes.

Model Optimization: Further optimize the .glb model file using tools like gltf-pipeline to reduce its size for even faster loading times on slower connections.

"Contact Sales" Form: Implement a functional "Contact Sales" button