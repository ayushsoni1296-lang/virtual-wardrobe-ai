import React, { useEffect, useState } from 'react';
import { Check, Loader2, Shirt } from 'lucide-react';
import { StatusBar } from '../common/Header';
import { motion } from 'motion/react';

interface AiProcessingScreenProps {
  onComplete: () => void;
}

export const AiProcessingScreen: React.FC<AiProcessingScreenProps> = ({ onComplete }) => {
  const [completedSteps, setCompletedSteps] = useState<number>(0);

  const steps = [
    'Removing background',
    'Identifying clothing',
    'Detecting colors',
    'Understanding style',
    'Almost done...',
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCompletedSteps(1), 600);
    const timer2 = setTimeout(() => setCompletedSteps(2), 1200);
    const timer3 = setTimeout(() => setCompletedSteps(3), 1800);
    const timer4 = setTimeout(() => setCompletedSteps(4), 2400);
    const timer5 = setTimeout(() => {
      setCompletedSteps(5);
      setTimeout(onComplete, 800);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete]);

  return (
    <div className="w-full h-full bg-[#F8FAFC] flex flex-col justify-between overflow-hidden select-none">
      <StatusBar dark={false} />

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Animated Circular Progress Indicator */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-8">
          {/* Outer rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-4 border-dashed border-indigo-200 border-t-indigo-600"
          />
          {/* Inner pulse */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-24 h-24 rounded-3xl bg-white border border-slate-200 shadow-lg shadow-indigo-600/10 flex items-center justify-center text-indigo-600"
          >
            <Shirt className="w-10 h-10 stroke-[1.7]" />
          </motion.div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">
          Processing Your Item
        </h2>

        {/* Step List */}
        <div className="w-full max-w-[260px] space-y-3.5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          {steps.map((step, idx) => {
            const isDone = completedSteps > idx;
            const isCurrent = completedSteps === idx;

            return (
              <div
                key={step}
                className="flex items-center gap-3 text-xs transition-opacity duration-300"
                style={{
                  opacity: completedSteps >= idx ? 1 : 0.4,
                }}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isDone
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : isCurrent
                      ? 'bg-indigo-50 border border-indigo-400 text-indigo-600'
                      : 'border border-slate-300 text-transparent'
                  }`}
                >
                  {isDone ? (
                    <Check className="w-3 h-3 stroke-[3]" />
                  ) : isCurrent ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : null}
                </div>
                <span
                  className={`font-semibold ${
                    isDone
                      ? 'text-slate-800'
                      : isCurrent
                      ? 'text-indigo-600 font-bold'
                      : 'text-slate-400'
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skip / Direct proceed button if in demo */}
      <div className="p-6">
        <button
          onClick={onComplete}
          className="w-full py-2.5 text-xs text-indigo-600 font-semibold hover:bg-slate-100 rounded-2xl transition-colors"
        >
          Skip animation
        </button>
      </div>
    </div>
  );
};
