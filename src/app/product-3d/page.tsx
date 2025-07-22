"use client";

import React, { useRef, useEffect, Suspense, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { Group, Vector3, Mesh } from "three";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

// --- ICONS (Replaced lucide-react for portability) ---

const IconShieldCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-green-400"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconTarget = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
const IconShield = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconWifi = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" x2="12.01" y1="20" y2="20" />
  </svg>
);
const IconCpu = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M15 2v2" />
    <path d="M15 20v2" />
    <path d="M9 2v2" />
    <path d="M9 20v2" />
    <path d="M2 15h2" />
    <path d="M2 9h2" />
    <path d="M20 15h2" />
    <path d="M20 9h2" />
  </svg>
);
const IconClock = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// --- 3D MODEL ---
// This is your actual GLB model component.
const ProcessorModel = React.forwardRef<
  Group,
  { scale?: number | [number, number, number] }
>((props, ref) => {
  // NOTE: Make sure the 'processor_model.glb' file is placed in the 'public' directory of your Next.js project.
  const { scene } = useGLTF("/processor_model.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        // You can apply materials or other properties to the model's meshes here.
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene.clone()} ref={ref} {...props} />;
});
ProcessorModel.displayName = "ProcessorModel";
// Preload the model for faster loading.
useGLTF.preload("/processor_model.glb");

// --- 3D SCENE COMPONENTS ---

const HeroScene = () => {
  // Correctly typed the ref to avoid 'never' type errors.
  const modelRef = useRef<Group>(null!);
  // FIX: Significantly increased the target scale for a much larger model.
  const targetScale = new Vector3(80, 80, 80);

  useFrame((state, delta) => {
    if (modelRef.current) {
      // Gentle rotation
      modelRef.current.rotation.y += delta * 0.1;

      // Smooth scaling animation on load
      modelRef.current.scale.lerp(targetScale, 0.05);

      // Add a subtle "breathing" effect for a more dynamic feel
      const pulse = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      modelRef.current.position.y = pulse;
    }
  });

  return (
    <>
      {/* Enhanced lighting for a more dramatic and professional look */}
      <hemisphereLight intensity={0.5} groundColor="black" />
      <spotLight
        position={[20, 20, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Environment preset="city" />
      <Suspense fallback={null}>
        <ProcessorModel ref={modelRef} scale={[0.01, 0.01, 0.01]} />
      </Suspense>
    </>
  );
};

const FeatureScene = () => {
  // Correctly typed the ref.
  const modelRef = useRef<Group>(null!);
  // The useFrame hook has been removed to make the model still.

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="dawn" />
      <Suspense fallback={null}>
        {/* FIX: Set the final scale directly to make the model appear static. */}
        <ProcessorModel ref={modelRef} scale={100} />
      </Suspense>
    </>
  );
};

// --- UI COMPONENTS ---

// Added explicit prop types.
interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}
const FeatureCard = ({ icon, title, children }: FeatureCardProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className="bg-[#1A1A1A] p-6 rounded-2xl border border-gray-800/50 h-full"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      <div className="text-yellow-400 mb-4">{icon}</div>
      <h3 className="font-semibold text-lg text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{children}</p>
    </motion.div>
  );
};

// Added explicit prop types.
interface AnnotationProps {
  position: string;
  title: string;
  children: ReactNode;
  delay?: number;
}
const Annotation = ({
  position,
  title,
  children,
  delay = 1.2,
}: AnnotationProps) => (
  <motion.div
    className={`absolute ${position} max-w-[180px] sm:max-w-xs text-left pointer-events-auto`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: delay }}
  >
    <div className="relative">
      <motion.div
        className="w-8 h-px bg-green-400 mb-2"
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: delay - 0.4 }}
      />
      <motion.h3
        className="font-semibold text-white text-sm sm:text-base"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay - 0.2 }}
      >
        {title}
      </motion.h3>
      {/* FIX: Changed motion.p to motion.div to prevent nesting a <ul> inside a <p> */}
      <motion.div
        className="text-xs sm:text-sm text-gray-400"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay }}
      >
        {children}
      </motion.div>
    </div>
  </motion.div>
);

// --- MAIN PAGE ---

const Product3DPage = () => {
  return (
    <div className="bg-black text-white font-sans overflow-x-hidden antialiased">
      <header className="fixed top-0 left-0 w-full z-20 bg-black/30 backdrop-blur-sm">
        <nav className="container mx-auto p-4 sm:p-6 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <IconShieldCheck />
            <span className="text-xl font-bold">SecureSight</span>
          </Link>
          <button className="px-5 py-2 bg-green-500 hover:bg-green-400 rounded-full text-sm text-black font-bold transition-colors">
            Contact Sales
          </button>
        </nav>
      </header>

      <main>
        <section className="relative h-screen w-full flex flex-col justify-center items-center text-center">
          <div className="absolute top-0 left-0 w-full h-full z-0">
            <Canvas
              shadows
              dpr={[1, 2]}
              camera={{ fov: 45, position: [0, 0, 15] }} // Pulled camera back for the larger model
            >
              <HeroScene />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                minPolarAngle={Math.PI / 2.5}
                maxPolarAngle={Math.PI / 2.5}
              />
            </Canvas>
          </div>

          <div className="relative z-10 container mx-auto px-6 pointer-events-none">
            <motion.p
              className="text-green-400 font-semibold text-sm mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              THE FUTURE OF ON-SITE AI SURVEILLANCE
            </motion.p>
            <motion.h1
              className="text-5xl md:text-8xl font-bold text-white tracking-tighter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              MandlacX Edge Processor
            </motion.h1>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full max-w-7xl h-full relative">
              <Annotation
                position="top-[20%] left-[5%] md:left-[10%]"
                title="MandlacX Edge Processor"
                delay={1.2}
              >
                A multi-domain, AI-powered device for real-time threat
                detection.
              </Annotation>
              <Annotation
                position="top-[20%] right-[5%] md:right-[10%]"
                title="Key Specifications"
                delay={1.4}
              >
                <ul className="list-disc list-inside">
                  <li>USB 3.0 x2 port</li>
                  <li>16GB RAM</li>
                  <li>12 Core AI Processor</li>
                </ul>
              </Annotation>
              <Annotation
                position="bottom-[20%] left-[5%] md:left-[10%]"
                title="Real-Time Threat Detection"
                delay={1.6}
              >
                Detects Intrusions, Firearms, Human Falls, and Aggressive
                Motion.
              </Annotation>
              <Annotation
                position="bottom-[20%] right-[5%] md:right-[10%]"
                title="On-Device Intelligence"
                delay={1.8}
              >
                Engineered for control, speed, and reliability right where you
                need it.
              </Annotation>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#050505]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                MandlacX Over Cloud-Only <br /> Video Analytics
              </h2>
            </div>

            {/* FIX: Restructured the feature section layout */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <FeatureCard
                icon={<IconTarget />}
                title="Bullet-Proof Weapon Detection"
              >
                MandlacX is trained to detect firearms, knives, and other sharp
                threats with precision—no internet required.
              </FeatureCard>
              <FeatureCard icon={<IconShield />} title="Privacy by Design">
                Your footage stays on-site. No cloud syncs, no external
                servers—just full control over your data.
              </FeatureCard>
              <FeatureCard
                icon={<IconWifi />}
                title="Bandwidth You Can Actually Afford"
              >
                No continuous streaming. Just critical events, saving your
                network and your budget.
              </FeatureCard>
              <FeatureCard icon={<IconCpu />} title="Future-Proof AI Stack">
                With modular AI models and local firmware updates, MandlacX is
                built to evolve with your needs.
              </FeatureCard>
            </div>

            {/* FIX: Centered the Canvas container to align with other content blocks */}
            <div className="max-w-4xl mx-auto h-[400px] lg:h-[500px] my-16 lg:my-24">
              <Canvas dpr={[1, 2]} shadows camera={{ fov: 40 }}>
                <FeatureScene />
                <OrbitControls enableZoom={false} enablePan={false} />
              </Canvas>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <FeatureCard
                icon={<IconClock />}
                title="Latency That Saves Seconds—and Lives"
              >
                Instant on-device processing means faster alerts and quicker
                interventions during critical moments.
              </FeatureCard>
              <div className="flex items-center justify-center p-6 text-center">
                <h3 className="text-3xl font-bold text-white tracking-tighter">
                  Built for Speed. <br /> Designed for Action.
                </h3>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Product3DPage;
