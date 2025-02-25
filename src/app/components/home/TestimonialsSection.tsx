'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    quote: `SamanthaAI has revolutionized our customer service. The AI agents are incredibly natural in conversation, and we've seen a 40% reduction in response times. Our customers often can't tell they're talking to an AI!`,
    author: 'Sarah Johnson',
    position: 'Customer Service Director',
    company: 'TechCorp Solutions',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop',
    stats: {
      improvement: '40%',
      metric: 'Faster Response Time',
      impact: '24/7 Support Coverage',
    },
  },
  {
    id: 2,
    quote: `The integration was seamless, and the results were immediate. We've automated 75% of our routine customer inquiries, allowing our team to focus on complex cases. The ROI has been exceptional.`,
    author: 'Michael Chen',
    position: 'Operations Manager',
    company: 'Global Retail Inc.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop',
    stats: {
      improvement: '75%',
      metric: 'Automation Rate',
      impact: '85% Cost Reduction',
    },
  },
  {
    id: 3,
    quote: `The analytics and insights provided by SamanthaAI have transformed how we understand customer needs. The AI continuously learns and improves, making our service better every day.`,
    author: 'Emily Rodriguez',
    position: 'Head of Innovation',
    company: 'Future Finance',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&auto=format&fit=crop',
    stats: {
      improvement: '95%',
      metric: 'Customer Satisfaction',
      impact: '60% Time Saved',
    },
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative overflow-hidden bg-black py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.08),transparent_50%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Trusted by Industry Leaders
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-400">
            See how businesses are transforming their customer service with
            SamanthaAI
          </p>
        </motion.div>

        <div className="mt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-12 lg:grid-cols-2"
            >
              {/* Testimonial Content */}
              <div className="relative rounded-2xl border border-gray-800 bg-gray-900/50 p-10 backdrop-blur-sm">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-6">
                    <motion.div
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="relative h-24 w-24 overflow-hidden rounded-full"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-50" />
                      <Image
                        src={currentTestimonial.image}
                        alt={currentTestimonial.author}
                        width={96}
                        height={96}
                        className="relative h-full w-full object-cover"
                        priority
                      />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        {currentTestimonial.author}
                      </h3>
                      <p className="text-lg text-gray-400">
                        {currentTestimonial.position}
                      </p>
                      <p className="text-lg text-purple-500">
                        {currentTestimonial.company}
                      </p>
                    </div>
                  </div>
                  <blockquote className="mt-10 text-xl leading-relaxed text-gray-300">
                    "{currentTestimonial.quote}"
                  </blockquote>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8 backdrop-blur-sm"
                >
                  <p className="text-6xl font-bold text-purple-500">
                    {currentTestimonial.stats.improvement}
                  </p>
                  <p className="mt-4 text-xl text-gray-400">
                    {currentTestimonial.stats.metric}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8 backdrop-blur-sm"
                >
                  <p className="text-2xl text-gray-300">
                    {currentTestimonial.stats.impact}
                  </p>
                  <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-gray-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-purple-600 to-blue-500"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="mt-12 flex justify-center space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-12 bg-gradient-to-r from-purple-600 to-blue-500'
                    : 'w-3 bg-gray-700 hover:bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
