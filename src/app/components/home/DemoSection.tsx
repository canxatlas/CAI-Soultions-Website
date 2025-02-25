'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';

const demoConversations = [
  {
    title: 'Outbound Call Flow',
    description: 'Automated lead qualification and meeting scheduling',
    audioSrc: '/audio/demo-outbound.mp3',
    transcript: [
      {
        speaker: 'System',
        text: 'Starting outbound campaign → Analyzing prospect data',
        type: 'status',
      },
      {
        speaker: 'AI Agent',
        text: 'Hi [Name], I noticed your company is scaling. Would you like to learn how AI can reduce costs by 60%?',
        type: 'output',
      },
      {
        speaker: 'System',
        text: 'Lead qualified → Meeting scheduled → CRM updated',
        type: 'process',
      },
    ],
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
  },
  {
    title: 'Inbound Support Flow',
    description: 'Automated appointment scheduling and support',
    audioSrc: '/audio/demo-inbound.mp3',
    transcript: [
      {
        speaker: 'System',
        text: 'Call received → Customer identified → History retrieved',
        type: 'status',
      },
      {
        speaker: 'AI Agent',
        text: 'Found your appointment. Checking available slots for next week...',
        type: 'process',
      },
      {
        speaker: 'System',
        text: 'Appointment rescheduled → Calendar synced → Confirmation sent',
        type: 'status',
      },
    ],
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: 'Marketing Flow',
    description: 'Automated campaign optimization and follow-ups',
    audioSrc: '/audio/demo-marketing.mp3',
    transcript: [
      {
        speaker: 'System',
        text: 'Campaign started → Segments analyzed → Content optimized',
        type: 'status',
      },
      {
        speaker: 'AI Marketing',
        text: 'A/B testing complete: Version B shows 45% higher engagement',
        type: 'analysis',
      },
      {
        speaker: 'System',
        text: 'ROI: 380% → Leads qualified → Pipeline updated',
        type: 'process',
      },
    ],
    icon: (
      <svg
        className="w-6 h-6"
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
  },
];

const ProcessVisualizer = ({ type }: { type: string }) => {
  const getAnimation = () => {
    switch (type) {
      case 'status':
        return {
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5],
        };
      case 'process':
        return {
          rotate: [0, 360],
          borderRadius: ['50% 50% 50% 50%', '30% 70% 70% 30%'],
        };
      case 'analysis':
        return {
          scaleY: [0.5, 1.2, 0.5],
          scaleX: [1, 0.8, 1],
        };
      default:
        return {
          scale: 1,
        };
    }
  };

  return (
    <motion.div
      className={`absolute -left-3 w-6 h-6 rounded-full ${
        type === 'status'
          ? 'bg-blue-500'
          : type === 'process'
          ? 'bg-purple-500'
          : type === 'analysis'
          ? 'bg-green-500'
          : 'bg-gray-500'
      }`}
      animate={getAnimation()}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

const AudioVisualizer = ({ isPlaying }: { isPlaying: boolean }) => {
  const bars = 30;
  return (
    <div className="flex items-center justify-center space-x-1 h-16">
      {[...Array(bars)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-1 rounded-full ${
            i % 3 === 0
              ? 'bg-gradient-to-t from-purple-600 to-blue-500'
              : i % 3 === 1
              ? 'bg-gradient-to-t from-blue-500 to-purple-600'
              : 'bg-gradient-to-t from-indigo-500 to-purple-500'
          }`}
          animate={{
            height: isPlaying
              ? [
                  '20%',
                  `${Math.random() * 100}%`,
                  '60%',
                  `${Math.random() * 100}%`,
                  '20%',
                ][i % 5]
              : '20%',
            opacity: isPlaying ? 1 : 0.5,
          }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: i * 0.03,
          }}
        />
      ))}
    </div>
  );
};

const DemoSection = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  const playAudio = (audioSrc: string) => {
    if (soundRef.current) {
      soundRef.current.stop();
    }

    soundRef.current = new Howl({
      src: [audioSrc],
      html5: true,
      onplay: () => setIsPlaying(true),
      onend: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
    });

    soundRef.current.play();
  };

  const stopAudio = () => {
    if (soundRef.current) {
      soundRef.current.stop();
    }
  };

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
      }
    };
  }, []);

  return (
    <section id="demo" className="py-20 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.08),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            See Our AI in Action
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto text-xl text-gray-400"
          >
            Explore our automated workflows and see how they streamline your
            operations
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-5">
            {demoConversations.map((demo, index) => (
              <motion.button
                key={demo.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => {
                  setActiveDemo(index);
                  stopAudio();
                }}
                className={`w-full text-left p-5 rounded-xl transition-all duration-300 ${
                  activeDemo === index
                    ? 'bg-gradient-to-r from-purple-600/20 to-blue-500/20 border border-purple-500/20'
                    : 'bg-gray-900/50 hover:bg-gray-900/80 border border-gray-800'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-lg ${
                      activeDemo === index
                        ? 'bg-gradient-to-r from-purple-600 to-blue-500'
                        : 'bg-gray-800'
                    }`}
                  >
                    {demo.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">
                      {demo.title}
                    </h3>
                    <p className="mt-2 text-base text-gray-400">
                      {demo.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-8"
            >
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  {demoConversations[activeDemo].transcript.map(
                    (line, index) => (
                      <motion.div
                        key={`${activeDemo}-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex relative pl-8"
                      >
                        <ProcessVisualizer type={line.type} />
                        <motion.div
                          className={`w-full rounded-xl p-4 ${
                            line.speaker.includes('AI')
                              ? 'bg-gradient-to-r from-purple-600/20 to-blue-500/20 border border-purple-500/20 ml-auto'
                              : line.type === 'status'
                              ? 'bg-blue-900/20 border border-blue-500/20'
                              : line.type === 'analysis'
                              ? 'bg-green-900/20 border border-green-500/20'
                              : 'bg-gray-800 border border-gray-700'
                          }`}
                        >
                          <p className="text-white text-base">{line.text}</p>
                        </motion.div>
                      </motion.div>
                    )
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-8">
                <AudioVisualizer isPlaying={isPlaying} />
                <div className="mt-6 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (isPlaying) {
                        stopAudio();
                      } else {
                        playAudio(demoConversations[activeDemo].audioSrc);
                      }
                    }}
                    className="flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3 rounded-full text-base"
                  >
                    {isPlaying ? (
                      <>
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                          />
                        </svg>
                        <span>Stop Preview</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Play Preview</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
