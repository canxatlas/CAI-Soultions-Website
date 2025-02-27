'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PricingEstimator = () => {
  const [minutes, setMinutes] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [showEnterpriseModal, setShowEnterpriseModal] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const calculatePrice = (minutes: number) => {
    // Base price of $1 per minute
    let pricePerMinute = 1;

    // Volume discounts
    if (minutes > 5000) {
      pricePerMinute = 0.9; // 10% discount for medium volume
    } else if (minutes > 3000) {
      pricePerMinute = 0.95; // 5% discount for small volume
    }

    return minutes * pricePerMinute;
  };

  const handleMinutesChange = (value: number) => {
    setMinutes(value);
    // Show modal when reaching max amount (10000)
    if (value === 10000) {
      setShowEnterpriseModal(true);
    }
  };

  return (
    <section className="relative overflow-hidden bg-black py-24">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.08),transparent_50%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Instant Price Estimation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-gray-400"
          >
            Drag the slider to estimate your monthly cost based on call minutes
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          {/* Price Display */}
          <div className="mb-12 text-center">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: isDragging ? 1.05 : 1 }}
              className="mb-4"
            >
              <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                ${formatNumber(calculatePrice(minutes))}
              </span>
              <span className="ml-2 text-2xl text-gray-400">/month</span>
            </motion.div>
            <p className="text-xl text-gray-300">
              {formatNumber(minutes)} minutes
            </p>
          </div>

          {/* Slider */}
          <div className="relative w-full h-16">
            <input
              type="range"
              min="5"
              max="10000"
              step="5"
              value={minutes}
              onChange={(e) => handleMinutesChange(Number(e.target.value))}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-purple-600 [&::-webkit-slider-thumb]:to-blue-500 [&::-webkit-slider-thumb]:shadow-lg"
            />
            <div className="absolute -bottom-8 left-0 right-0 flex justify-between text-sm text-gray-400">
              <span>5 min</span>
              <span>10K min</span>
            </div>
          </div>

          {/* Volume Discounts */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm"
            >
              <div className="text-purple-500 text-lg font-semibold mb-2">
                Standard Rate
              </div>
              <div className="text-white text-2xl font-bold">$1.00/min</div>
              <div className="text-gray-400 mt-2">Up to 1,000 minutes</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm"
            >
              <div className="text-purple-500 text-lg font-semibold mb-2">
                Growth Plan
              </div>
              <div className="text-white text-2xl font-bold">$0.95/min</div>
              <div className="text-gray-400 mt-2">3,000+ minutes</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm"
            >
              <div className="text-purple-500 text-lg font-semibold mb-2">
                Scale Plan
              </div>
              <div className="text-white text-2xl font-bold">$0.90/min</div>
              <div className="text-gray-400 mt-2">5,000+ minutes</div>
            </motion.div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-3 text-lg font-semibold text-white shadow-lg shadow-purple-500/20 hover:opacity-90"
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Enterprise Modal */}
      <AnimatePresence>
        {showEnterpriseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowEnterpriseModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/90 p-8 shadow-xl backdrop-blur-xl"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6"
                >
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-600/20 to-blue-500/20 p-[2px]">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-900">
                      <svg
                        className="h-10 w-10 text-purple-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-3xl font-bold text-transparent">
                    Ready to Scale Big?
                  </h3>
                </motion.div>
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-300"
                >
                  You&apos;ve reached our enterprise threshold! Let&apos;s
                  create a custom solution for your high-volume needs with:
                </motion.p>
                <motion.ul
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="my-6 space-y-3 text-left"
                >
                  <li className="flex items-center rounded-lg border border-gray-800 bg-gray-900/50 p-3">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/10">
                      <svg
                        className="h-5 w-5 text-purple-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Custom Pricing</h4>
                      <p className="text-sm text-gray-400">
                        Volume-based discounts tailored to your needs
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center rounded-lg border border-gray-800 bg-gray-900/50 p-3">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/10">
                      <svg
                        className="h-5 w-5 text-purple-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Dedicated Support
                      </h4>
                      <p className="text-sm text-gray-400">
                        Personal account manager & priority assistance
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center rounded-lg border border-gray-800 bg-gray-900/50 p-3">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/10">
                      <svg
                        className="h-5 w-5 text-purple-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Enterprise Features
                      </h4>
                      <p className="text-sm text-gray-400">
                        Advanced analytics, API access & custom integrations
                      </p>
                    </div>
                  </li>
                </motion.ul>
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => (window.location.href = '#contact')}
                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 text-lg font-semibold text-white shadow-lg"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-[500%] w-12 animate-[spin_5s_linear_infinite] bg-white/10" />
                    </div>
                    <span className="relative">Contact Us Now</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowEnterpriseModal(false)}
                    className="w-full rounded-xl border border-gray-700 bg-gray-800/50 px-6 py-3 text-lg font-semibold text-gray-300 hover:bg-gray-800"
                  >
                    Maybe Later
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
