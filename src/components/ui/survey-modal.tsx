'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EstimationResult {
  minutesPerMonth: number;
  costPerMonth: number;
  agentsNeeded: number;
}

export const SurveyModal = ({ isOpen, onClose }: SurveyModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    callsPerDay: '',
    avgCallDuration: '',
    operatingHours: '',
    peakHourFactor: '',
    serviceLevel: '',
  });

  const [estimation, setEstimation] = useState<EstimationResult | null>(null);

  const questions = [
    {
      title: 'How many customer calls do you handle per day?',
      options: [
        'Less than 50 calls',
        '50-200 calls',
        '200-500 calls',
        '500-1000 calls',
        'More than 1000 calls',
      ],
      field: 'callsPerDay',
      values: [25, 125, 350, 750, 1500],
    },
    {
      title: 'What is your average call duration?',
      options: [
        '1-3 minutes',
        '3-5 minutes',
        '5-10 minutes',
        '10-15 minutes',
        'More than 15 minutes',
      ],
      field: 'avgCallDuration',
      values: [2, 4, 7.5, 12.5, 20],
    },
    {
      title: 'What are your operating hours?',
      options: [
        'Business hours (8h/day)',
        'Extended hours (12h/day)',
        '24/7 operation',
        'Custom hours',
        'Not sure yet',
      ],
      field: 'operatingHours',
      values: [8, 12, 24, 16, 12],
    },
    {
      title: 'What is your peak hour call volume compared to average?',
      options: [
        '1.5x average',
        '2x average',
        '3x average',
        '4x average',
        'Not sure',
      ],
      field: 'peakHourFactor',
      values: [1.5, 2, 3, 4, 2.5],
    },
    {
      title: 'What service level are you targeting?',
      options: [
        'Basic (80% calls in 30s)',
        'Standard (90% calls in 20s)',
        'Premium (95% calls in 10s)',
        'Custom SLA',
        'Not sure yet',
      ],
      field: 'serviceLevel',
      values: [1, 1.2, 1.5, 1.3, 1.2],
    },
  ];

  const calculateEstimation = (): EstimationResult => {
    const getNumericValue = (field: string, index: number) => {
      const question = questions.find((q) => q.field === field);
      return question?.values[index] || 0;
    };

    const getIndexForValue = (field: string, value: string) => {
      const question = questions.find((q) => q.field === field);
      return question?.options.indexOf(value) || 0;
    };

    // Calculate base metrics
    const callsPerDay = getNumericValue(
      'callsPerDay',
      getIndexForValue('callsPerDay', formData.callsPerDay)
    );
    const avgDuration = getNumericValue(
      'avgCallDuration',
      getIndexForValue('avgCallDuration', formData.avgCallDuration)
    );
    const hoursPerDay = getNumericValue(
      'operatingHours',
      getIndexForValue('operatingHours', formData.operatingHours)
    );
    const peakFactor = getNumericValue(
      'peakHourFactor',
      getIndexForValue('peakHourFactor', formData.peakHourFactor)
    );
    const serviceLevelFactor = getNumericValue(
      'serviceLevel',
      getIndexForValue('serviceLevel', formData.serviceLevel)
    );

    // Calculate monthly minutes
    const minutesPerDay = callsPerDay * avgDuration;
    const minutesPerMonth = minutesPerDay * 22; // Average business days per month
    const costPerMonth = minutesPerMonth * 1; // $1 per minute

    // Calculate required agents based on Erlang C formula (simplified)
    const peakHourCalls = (callsPerDay / hoursPerDay) * peakFactor;
    const agentsNeeded = Math.ceil(
      (peakHourCalls * avgDuration * serviceLevelFactor) / 60
    );

    return {
      minutesPerMonth: Math.round(minutesPerMonth),
      costPerMonth: Math.round(costPerMonth),
      agentsNeeded: agentsNeeded,
    };
  };

  const handleOptionSelect = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // On last question, calculate estimation
      const newFormData = { ...formData, [field]: value };
      setFormData(newFormData);
      setEstimation(calculateEstimation());
    }
  };

  const handleSubmit = async () => {
    console.log('Survey submitted:', formData);
    console.log('Estimation:', estimation);
    onClose();
    setCurrentStep(0);
    setFormData({
      callsPerDay: '',
      avgCallDuration: '',
      operatingHours: '',
      peakHourFactor: '',
      serviceLevel: '',
    });
    setEstimation(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/90 p-8 shadow-xl backdrop-blur-xl"
          >
            {/* Progress bar */}
            <div className="absolute left-0 top-0 h-1 w-full bg-gray-800">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 to-blue-500"
                initial={{ width: '0%' }}
                animate={{
                  width: `${((currentStep + 1) / questions.length) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="mt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {estimation ? (
                    // Show estimation results
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-white mb-6">
                        Your Estimated Costs
                      </h2>
                      <div className="grid gap-6">
                        <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                          <p className="text-4xl font-bold text-purple-500">
                            ${estimation.costPerMonth.toLocaleString()}
                          </p>
                          <p className="text-gray-400 mt-2">
                            Estimated Monthly Cost
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-4">
                            <p className="text-2xl font-bold text-blue-500">
                              {estimation.minutesPerMonth.toLocaleString()}
                            </p>
                            <p className="text-gray-400 mt-2">
                              Minutes per Month
                            </p>
                          </div>
                          <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-4">
                            <p className="text-2xl font-bold text-blue-500">
                              {estimation.agentsNeeded}
                            </p>
                            <p className="text-gray-400 mt-2">
                              AI Agents Needed
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mt-4">
                          This is a base estimation at $1/minute. Contact us for
                          custom pricing and volume discounts.
                        </p>
                      </div>
                    </div>
                  ) : (
                    // Show questions
                    <>
                      <h2 className="text-2xl font-bold text-white">
                        {questions[currentStep].title}
                      </h2>
                      <div className="mt-6 grid gap-4">
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

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => {
                  if (estimation) {
                    setEstimation(null);
                  } else {
                    setCurrentStep((prev) => Math.max(0, prev - 1));
                  }
                }}
                className={`rounded-full bg-gray-800 px-6 py-2 font-medium text-white transition-opacity hover:bg-gray-700 ${
                  currentStep === 0 && !estimation ? 'invisible' : ''
                }`}
              >
                {estimation ? 'Back' : 'Previous'}
              </button>
              {estimation ? (
                <button
                  onClick={handleSubmit}
                  className="rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-2 font-medium text-white shadow-lg shadow-purple-500/20 hover:opacity-90"
                >
                  Contact Us
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (currentStep === questions.length - 1) {
                      setEstimation(calculateEstimation());
                    }
                  }}
                  className="rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-2 font-medium text-white shadow-lg shadow-purple-500/20 hover:opacity-90"
                >
                  {currentStep === questions.length - 1 ? 'Calculate' : 'Skip'}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
