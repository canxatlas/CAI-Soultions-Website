'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

const plans = [
  {
    name: 'Startup',
    description:
      'Perfect for small businesses getting started with AI calling agents.',
    features: [
      'Up to 100 AI calls per month',
      'Basic voice customization',
      'Standard analytics dashboard',
      'Email support',
      '1 AI agent personality',
      'Business hours availability',
    ],
    highlight: false,
    icon: (
      <svg
        className="w-12 h-12"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4.5L3 9L12 13.5L21 9L12 4.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 14L12 18.5L21 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: 'Business',
    description: 'Ideal for growing businesses with moderate call volumes.',
    features: [
      'Custom call volume',
      'Advanced voice customization',
      'Real-time analytics & reporting',
      'Priority support',
      'Multiple AI personalities',
      '24/7 availability',
      'Custom call scripts',
      'API access',
    ],
    highlight: true,
    icon: (
      <svg
        className="w-12 h-12"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: 'Enterprise',
    description: 'For organizations requiring maximum flexibility and support.',
    features: [
      'Unlimited AI calls',
      'Full voice & personality customization',
      'Advanced analytics & API access',
      'Dedicated account manager',
      'Unlimited AI personalities',
      'Custom integration support',
      'SLA guarantees',
      'White-label solution',
      'Custom security requirements',
    ],
    highlight: false,
    icon: (
      <svg
        className="w-12 h-12"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const PricingSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="pricing"
      className="relative py-32 lg:py-48 bg-black overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.12),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-base font-semibold text-purple-500 tracking-wide uppercase">
              Pricing Plans
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Choose Your Perfect Plan
            </p>
            <p className="mt-6 text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Flexible solutions designed to scale with your business. Get in
              touch with our team to find the perfect plan for your needs.
            </p>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-24 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              whileHover={{ scale: 1.02, translateY: -8 }}
              transition={{ duration: 0.2 }}
              className={`relative rounded-2xl ${
                plan.highlight
                  ? 'bg-gradient-to-tl from-purple-600 to-blue-500 text-white shadow-2xl'
                  : 'bg-gray-900/50 backdrop-blur-sm text-white border border-gray-800'
              } p-8 lg:p-10`}
            >
              {plan.highlight && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-400 to-blue-400 px-6 py-2 text-sm font-medium text-white shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-4 mb-8">
                <div
                  className={`${
                    plan.highlight ? 'text-white' : 'text-purple-500'
                  }`}
                >
                  {plan.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p
                    className={`mt-2 ${
                      plan.highlight ? 'text-purple-100' : 'text-gray-400'
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-gray-400/20 to-transparent my-8" />

              <ul className="space-y-5 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckIcon
                      className={`h-6 w-6 mr-3 flex-shrink-0 mt-0.5 ${
                        plan.highlight ? 'text-white' : 'text-purple-500'
                      }`}
                    />
                    <span
                      className={
                        plan.highlight ? 'text-white' : 'text-gray-300'
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <p
                  className={`text-lg mb-6 ${
                    plan.highlight ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  Custom pricing based on your needs
                </p>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group w-full flex items-center justify-center rounded-full px-8 py-4 text-base font-medium transition-all duration-200 ${
                    plan.highlight
                      ? 'bg-white text-purple-600 hover:bg-gray-50'
                      : 'bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90'
                  }`}
                >
                  <span>Schedule a Call</span>
                  <ArrowRightIcon className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-24 text-center"
        >
          <div className="relative rounded-2xl bg-gradient-to-r from-purple-600/10 to-blue-500/10 border border-purple-500/20 p-10 lg:p-16 overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                Our team will work with you to create a tailored plan that
                perfectly fits your organization's needs and budget. Let's
                discuss how we can help you achieve your goals.
              </p>
              <motion.a
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 8px 20px -8px rgba(147, 51, 234, 0.5)',
                }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition-all duration-300"
              >
                <span>Talk to Our Team</span>
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </motion.a>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
