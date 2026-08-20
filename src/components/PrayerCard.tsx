import React, { useState } from 'react';
import { BookOpen, Eye, Sparkles, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PrayerStep } from '../types';

interface PrayerCardProps {
  step: PrayerStep;
  currentStepIndex: number;
  totalSteps: number;
  language: 'english' | 'latin';
  onToggleLanguage: () => void;
}

export const PrayerCard: React.FC<PrayerCardProps> = ({
  step,
  currentStepIndex,
  totalSteps,
  language,
  onToggleLanguage
}) => {
  const [showLatinSideBySide, setShowLatinSideBySide] = useState(false);

  return (
    <div
      id="prayer-card-container"
      className="relative my-6 overflow-hidden rounded-3xl border border-[#3e3020] bg-[#221a14] p-6 shadow-2xl sm:p-8"
    >
      {/* Background soft ambient halo */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#c6994f]/5 blur-3xl" />

      {/* Top Header Row */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#3e3020]/60 pb-3">
        <div className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c6994f]">
          Step {currentStepIndex + 1} of {totalSteps}
        </div>

        <div className="flex items-center gap-2">
          {step.textLatin && (
            <button
              onClick={() => setShowLatinSideBySide(!showLatinSideBySide)}
              className="flex items-center gap-1 rounded-lg border border-[#3e3020] bg-[#1a1410] px-2.5 py-1 font-sans text-[11px] text-[#b8a892] transition-colors hover:border-[#c6994f] hover:text-[#e7c07f]"
            >
              <Languages className="h-3 w-3 text-[#c6994f]" />
              <span>{showLatinSideBySide ? 'Single View' : 'Latin & English'}</span>
            </button>
          )}

          <button
            onClick={onToggleLanguage}
            className="rounded-lg border border-[#3e3020] bg-[#1a1410] px-2.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-[#e7c07f] transition-colors hover:border-[#c6994f]"
          >
            {language === 'latin' ? 'Latin' : 'English'}
          </button>
        </div>
      </div>

      {/* Fluid Meditative Content Transition */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentStepIndex}
          initial={{ opacity: 0, y: 7 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -7 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          {/* Title & Subtitle */}
          <h2 className="font-garamond text-2xl font-bold tracking-tight text-[#e7c07f] sm:text-3xl">
            {step.title}
          </h2>
          <div className="mt-1 font-sans text-xs italic text-[#857562]">
            {step.sub}
          </div>

          {/* Main Prayer Text Box */}
          <div className="my-6 rounded-2xl border-l-2 border-[#c6994f] bg-[#1a1410]/80 p-5 font-crimson text-lg leading-relaxed text-[#ede2d0] shadow-inner sm:text-xl">
            {showLatinSideBySide && step.textLatin ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <div className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-widest text-[#c6994f]">
                    Latin
                  </div>
                  <p className="italic">{step.textLatin}</p>
                </div>
                <div>
                  <div className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-widest text-[#c6994f]">
                    English
                  </div>
                  <p>{step.text}</p>
                </div>
              </div>
            ) : (
              <p className="whitespace-pre-line">{step.text}</p>
            )}
          </div>

          {/* Fruit of the Mystery Badge */}
          {step.fruit && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#3d4f6e] bg-[#3d4f6e]/20 px-4 py-1.5 font-sans text-xs uppercase tracking-wider text-[#c8d3e6]">
              <Sparkles className="h-3.5 w-3.5 text-[#e7c07f]" />
              <span>
                Fruit of the Mystery: <strong className="text-[#e7c07f]">{step.fruit}</strong>
              </span>
            </div>
          )}

          {/* Reflection Callout */}
          <div className="mb-4 rounded-2xl border-l-2 border-[#c6994f] bg-[#1a1410]/60 p-4">
            <div className="mb-1 flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#c6994f]">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Reflection</span>
            </div>
            <p className="font-crimson text-base italic text-[#b8a892] leading-relaxed">
              {step.note}
            </p>
          </div>

          {/* To Hold in Mind Visual Guide */}
          <div className="rounded-2xl border border-[#3d4f6e]/40 bg-[#3d4f6e]/10 p-4">
            <div className="mb-2 flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#a9bcd8]">
              <Eye className="h-3.5 w-3.5" />
              <span>To Hold in Mind</span>
            </div>
            <ul className="space-y-1.5 font-crimson text-base text-[#b8a892] leading-relaxed">
              {step.visual.map((v, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#c6994f]/70 flex-shrink-0" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
