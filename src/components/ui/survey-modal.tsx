'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GHLApi } from '@/lib/ghl-api';

export interface EstimationResult {
  minutesPerMonth: number;
  costPerMonth: number;
  agentsNeeded: number;
}

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phone: string;
}

export const SurveyModal = ({ isOpen, onClose }: SurveyModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    role: '',
    companySize: '',
    useCase: '',
    budget: '',
    timeline: '',
  });
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    phone: '',
  });
  const [estimation, setEstimation] = useState<EstimationResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const questions = [
    {
      title: 'What is your role in the company?',
      field: 'role',
      options: [
        'C-Level Executive',
        'Director/Manager',
        'Team Lead',
        'Individual Contributor',
        'Other',
      ],
    },
    {
      title: 'How many employees are in your company?',
      field: 'companySize',
      options: ['1-10', '11-50', '51-200', '201-1000', '1000+'],
    },
    {
      title: 'What is your primary use case?',
      field: 'useCase',
      options: [
        'Customer Support',
        'Sales Outreach',
        'Lead Generation',
        'Appointment Scheduling',
        'Other',
      ],
    },
    {
      title: 'What is your monthly budget range?',
      field: 'budget',
      options: [
        'Under $1,000',
        '$1,000 - $5,000',
        '$5,000 - $10,000',
        '$10,000 - $50,000',
        '$50,000+',
      ],
    },
    {
      title: 'When are you looking to implement?',
      field: 'timeline',
      options: [
        'Immediately',
        'Within 1 month',
        'Within 3 months',
        'Within 6 months',
        'Just exploring',
      ],
    },
  ];

  const calculateEstimation = (): EstimationResult => {
    const getIndexForValue = (field: string, value: string) => {
      const options = {
        companySize: ['1-10', '11-50', '51-200', '201-1000', '1000+'],
        timeline: ['1 month', '3 months', '6 months', '1 year', '2+ years'],
      };
      return options[field as keyof typeof options].indexOf(value);
    };

    // Calculate minutes per month based on company size and use case
    const companySizeIndex = getIndexForValue(
      'companySize',
      formData.companySize
    );
    const useCaseIndex = getIndexForValue('useCase', formData.useCase);

    const baseMinutes = (companySizeIndex + 1) * 1000;
    const useCaseMultiplier = (useCaseIndex + 1) * 0.5;

    const minutesPerMonth = Math.round(baseMinutes * useCaseMultiplier);

    // Calculate cost per month
    let costPerMinute = 1.0;
    if (minutesPerMonth > 5000) {
      costPerMinute = 0.9;
    } else if (minutesPerMonth > 3000) {
      costPerMinute = 0.95;
    }

    const costPerMonth = Math.round(minutesPerMonth * costPerMinute);

    // Estimate number of agents needed
    const agentsNeeded = Math.ceil(minutesPerMonth / (160 * 60)); // Assuming 160 working hours per month

    return {
      minutesPerMonth,
      costPerMonth,
      agentsNeeded,
    };
  };

  const handleOptionSelect = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      const estimationResult = calculateEstimation();
      setEstimation(estimationResult);
    }
  };

  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await GHLApi.submitSurvey(contactInfo, {
        role: formData.role,
        companySize: formData.companySize,
        useCase: formData.useCase,
        budget: formData.budget,
        timeline: formData.timeline,
        estimation: calculateEstimation(),
      });

      if (result.success) {
        setIsSubmitting(false);
        onClose();
      } else {
        setIsSubmitting(false);
        setSubmitError(
          result.error ||
            'An error occurred while submitting the survey. Please try again.'
        );
        // Handle error here if needed
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      setIsSubmitting(false);
      setSubmitError(
        'An error occurred while submitting the survey. Please try again.'
      );
      // Handle error here if needed
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/90 p-8 shadow-xl backdrop-blur-xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="mb-8">
              <div className="h-1 w-full rounded-full bg-gray-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: estimation
                      ? '100%'
                      : `${((currentStep + 1) / questions.length) * 100}%`,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-500"
                />
              </div>
            </div>

            <div className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {estimation ? (
                    // Contact Information Form
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-white">
                        Almost there! Let us know how to reach you
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={contactInfo.firstName}
                            onChange={handleContactInfoChange}
                            className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={contactInfo.lastName}
                            onChange={handleContactInfoChange}
                            className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                            placeholder="Doe"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-400">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={contactInfo.email}
                            onChange={handleContactInfoChange}
                            className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                            placeholder="john@company.com"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-400">
                            Company Name
                          </label>
                          <input
                            type="text"
                            name="companyName"
                            value={contactInfo.companyName}
                            onChange={handleContactInfoChange}
                            className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                            placeholder="Company Inc."
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-400">
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={contactInfo.phone}
                            onChange={handleContactInfoChange}
                            className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>

                      {submitError && (
                        <p className="text-sm text-red-500">{submitError}</p>
                      )}

                      <div className="flex justify-between">
                        <button
                          onClick={() => setEstimation(null)}
                          className="rounded-lg border border-gray-700 bg-gray-800 px-6 py-2 text-white hover:bg-gray-700"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-2 text-white hover:opacity-90 disabled:opacity-50"
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Survey Questions
                    <>
                      <h3 className="text-2xl font-bold text-white">
                        {questions[currentStep].title}
                      </h3>
                      <div className="space-y-3">
                        {questions[currentStep].options.map((option) => (
                          <motion.button
                            key={option}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              handleOptionSelect(
                                questions[currentStep].field,
                                option
                              )
                            }
                            className={`w-full rounded-xl border border-gray-700 bg-gray-800/50 p-4 text-left text-lg font-medium text-white transition-colors hover:border-purple-500/50 hover:bg-gray-800 ${
                              formData[
                                questions[currentStep]
                                  .field as keyof typeof formData
                              ] === option
                                ? 'border-purple-500 bg-gray-800'
                                : ''
                            }`}
                          >
                            {option}
                          </motion.button>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
