import React from 'react';
import { ArrowLeft, ArrowRight, Play, Pause, CheckCircle } from 'lucide-react';

interface PrayerControlsProps {
  currentStepIndex: number;
  totalSteps: number;
  isAutoAdvancing: boolean;
  autoAdvanceSeconds: number;
  onPrev: () => void;
  onNext: () => void;
  onToggleAutoAdvance: () => void;
}

export const PrayerControls: React.FC<PrayerControlsProps> = ({
  currentStepIndex,
  totalSteps,
  isAutoAdvancing,
  autoAdvanceSeconds,
  onPrev,
  onNext,
  onToggleAutoAdvance
}) => {
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === totalSteps - 1;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  return (
    <div id="prayer-controls-container" className="space-y-4">
      {/* Progress Bar & Counter */}
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#3e3020]">
          <div
            className="h-full bg-gradient-to-r from-[#c6994f] via-[#e7c07f] to-[#f4deaf] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="font-sans text-xs font-semibold text-[#b8a892] min-w-[65px] text-right">
          {currentStepIndex + 1} / {totalSteps} ({progressPercent}%)
        </span>
      </div>

      {/* Main Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Back */}
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="flex items-center gap-2 rounded-full border border-[#3e3020] bg-[#221a14] px-5 py-3 font-sans text-xs font-medium uppercase tracking-wider text-[#b8a892] transition-all hover:border-[#c6994f] hover:text-[#e7c07f] disabled:opacity-30 disabled:pointer-events-none"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>

        {/* Auto Advance Toggle */}
        <button
          onClick={onToggleAutoAdvance}
          className={`flex items-center gap-2 rounded-full border px-4 py-3 font-sans text-xs font-medium uppercase tracking-wider transition-all ${
            isAutoAdvancing
              ? 'border-[#c6994f] bg-[#c6994f]/20 text-[#e7c07f] ring-1 ring-[#c6994f]'
              : 'border-[#3e3020] bg-[#1a1410] text-[#857562] hover:border-[#c6994f]/50'
          }`}
          title={isAutoAdvancing ? 'Pause Hands-Free Mode' : `Auto Advance every ${autoAdvanceSeconds || 12}s`}
        >
          {isAutoAdvancing ? <Pause className="h-4 w-4 text-[#e7c07f]" /> : <Play className="h-4 w-4 text-[#c6994f]" />}
          <span className="hidden sm:inline">
            {isAutoAdvancing ? 'Auto-Advancing' : 'Hands-Free Timer'}
          </span>
        </button>

        {/* Next / Complete */}
        <button
          onClick={onNext}
          className="flex items-center gap-2 rounded-full border border-[#c6994f] bg-[#c6994f] px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-[#14100d] shadow-lg shadow-[#c6994f]/20 transition-all hover:bg-[#e7c07f] hover:shadow-[#e7c07f]/30"
        >
          <span>{isLast ? 'Complete Decade' : 'Next Prayer'}</span>
          {isLast ? <CheckCircle className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
};
