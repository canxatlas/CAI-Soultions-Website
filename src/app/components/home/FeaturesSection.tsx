'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as THREE from 'three';

const features = [
  {
    title: 'AI Voice Agents',
    description:
      'Intelligent voice agents that handle customer calls with natural conversations, multilingual support, and context awareness.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
        />
      </svg>
    ),
    stats: '40% cost reduction',
  },
  {
    title: 'AI Chat Automation',
    description:
      'Smart chatbots that provide instant support across websites, mobile apps, and messaging platforms with personalized responses.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
    stats: '24/7 availability',
  },
  {
    title: 'Email Automation',
    description:
      'AI-powered email processing that understands, categorizes, and responds to customer inquiries automatically with high accuracy.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    stats: '90% faster response',
  },
  {
    title: 'Process Automation',
    description:
      'End-to-end automation of business processes, from data entry to complex workflow management with AI-driven decision making.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
    stats: '85% automation rate',
  },
  {
    title: 'Document Processing',
    description:
      'Intelligent document analysis and processing that extracts, understands, and acts on information from various document types.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    stats: '99% accuracy',
  },
  {
    title: 'Analytics & Insights',
    description:
      'Advanced analytics and reporting that provide actionable insights into customer interactions and process efficiency.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    stats: 'Real-time insights',
  },
];

const FeaturesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create multiple toruses with different sizes and positions
    const toruses = [
      {
        geometry: new THREE.TorusGeometry(8, 2, 16, 100),
        position: { x: -10, y: 5, z: 0 },
        rotation: { x: 0.01, y: 0.005, z: 0 },
        color: 0x6366f1,
      },
      {
        geometry: new THREE.TorusGeometry(12, 3, 16, 100),
        position: { x: 10, y: -5, z: -10 },
        rotation: { x: 0.005, y: 0.01, z: 0 },
        color: 0x9333ea,
      },
      {
        geometry: new THREE.TorusGeometry(6, 1.5, 16, 100),
        position: { x: 0, y: -8, z: -5 },
        rotation: { x: 0.008, y: 0.008, z: 0 },
        color: 0x3b82f6,
      },
    ];

    const meshes = toruses.map((torus) => {
      const material = new THREE.MeshBasicMaterial({
        color: torus.color,
        wireframe: true,
        transparent: true,
        opacity: 0.1,
      });
      const mesh = new THREE.Mesh(torus.geometry, material);
      mesh.position.set(torus.position.x, torus.position.y, torus.position.z);
      scene.add(mesh);
      return { mesh, rotation: torus.rotation };
    });

    camera.position.z = 30;

    const animate = () => {
      requestAnimationFrame(animate);
      meshes.forEach(({ mesh, rotation }) => {
        mesh.rotation.x += rotation.x;
        mesh.rotation.y += rotation.y;
        mesh.rotation.z += rotation.z;
      });
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (container) {
        window.removeEventListener('resize', handleResize);
        container.removeChild(renderer.domElement);
        meshes.forEach(({ mesh }) => {
          mesh.geometry.dispose();
          (mesh.material as THREE.Material).dispose();
        });
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="features"
      className="relative py-12 sm:py-16 overflow-hidden bg-black"
    >
      <div ref={containerRef} className="absolute inset-0 -z-10" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.08),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-sm text-purple-500 font-semibold tracking-wide uppercase">
              Comprehensive AI Solutions
            </h2>
            <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Transform Your Business with Intelligent Automation
            </p>
            <p className="mt-3 text-base sm:text-lg text-gray-400">
              From customer service to back-office operations, our AI agents
              streamline and optimize every aspect of your business processes.
            </p>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-8 sm:mt-10 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="relative group"
            >
              <div className="h-full flex flex-col bg-black/80 backdrop-blur-sm rounded-xl border border-gray-800 p-4 sm:p-5 hover:bg-gray-900/50 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 p-2 text-white ring-1 ring-purple-500/20">
                    {feature.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-white truncate">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-400 line-clamp-2">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-purple-500 font-semibold">
                      {feature.stats}
                    </p>
                    <motion.div
                      whileHover={{ x: 3 }}
                      className="text-sm text-gray-500 group-hover:text-purple-500 transition-colors duration-200"
                    >
                      →
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 sm:mt-10 text-center"
        >
          <motion.a
            whileHover={{
              scale: 1.05,
              boxShadow: '0 8px 20px -8px rgba(147, 51, 234, 0.5)',
            }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-2 text-sm sm:text-base font-medium rounded-full text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition-all duration-300 ring-1 ring-purple-500/20"
          >
            Start Automating Today
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
