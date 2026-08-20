import React from 'react';
import { Sparkles, RotateCcw, ArrowRight, BookOpen } from 'lucide-react';
import { MysterySetKey } from '../types';
import { MYSTERY_DATA } from '../data/mysteries';

interface DecadeCompletionCardProps {
  setKey: MysterySetKey;
  mysteryIndex: number;
  streak: number;
  totalDecadesCompleted: number;
  onRestartDecade: () => void;
  onNextMystery: () => void;
  onOpenJournal: () => void;
}

export const DecadeCompletionCard: React.FC<DecadeCompletionCardProps> = ({
  setKey,
  mysteryIndex,
  streak,
  totalDecadesCompleted,
  onRestartDecade,
  onNextMystery,
  onOpenJournal
}) => {
  const setData = MYSTERY_DATA[setKey];
  const currentMystery = setData.mysteries[mysteryIndex];
  const hasMoreMysteries = mysteryIndex < 4;

  return (
    <div className="relative my-8 overflow-hidden rounded-3xl border border-[#c6994f] bg-[#221a14] p-8 text-center shadow-2xl">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-radial from-[#c6994f]/15 to-transparent blur-2xl" />

      {/* Dove Emblem */}
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#c6994f]/50 bg-[#1a1410] text-[#e7c07f] shadow-inner">
        <Sparkles className="h-8 w-8 text-[#e7c07f] animate-pulse" />
      </div>

      <div className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#c6994f]">
        Decade Completed
      </div>

      <h2 className="mt-2 font-cinzel text-3xl font-semibold text-[#e7c07f] sm:text-4xl">
        Deo Gratias
      </h2>

      <p className="mt-2 font-crimson text-lg italic text-[#b8a892] max-w-md mx-auto">
        You have devoutly prayed the {mysteryIndex + 1}th {setData.label} Mystery:
        <span className="block mt-1 font-semibold text-[#e7c07f] not-italic font-garamond text-xl">
          "{currentMystery.title}"
        </span>
      </p>

      {/* Stats summary banner */}
      <div className="my-6 inline-flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-[#3e3020] bg-[#1a1410]/90 px-6 py-3 font-sans text-xs text-[#b8a892]">
        <div>
          🔥 Prayer Streak: <strong className="text-[#e7c07f]">{streak} day(s)</strong>
        </div>
        <div className="h-4 w-[1px] bg-[#3e3020]" />
        <div>
          🕊️ Total Decades: <strong className="text-[#e7c07f]">{totalDecadesCompleted}</strong>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onRestartDecade}
          className="flex items-center gap-2 rounded-full border border-[#3e3020] bg-[#1a1410] px-5 py-3 font-sans text-xs font-medium uppercase tracking-wider text-[#b8a892] transition-all hover:border-[#c6994f] hover:text-[#e7c07f]"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Pray Again</span>
        </button>

        <button
          onClick={onOpenJournal}
          className="flex items-center gap-2 rounded-full border border-[#3e3020] bg-[#1a1410] px-5 py-3 font-sans text-xs font-medium uppercase tracking-wider text-[#b8a892] transition-all hover:border-[#c6994f] hover:text-[#e7c07f]"
        >
          <BookOpen className="h-4 w-4 text-[#c6994f]" />
          <span>View Journal</span>
        </button>

        {hasMoreMysteries && (
          <button
            onClick={onNextMystery}
            className="flex items-center gap-2 rounded-full border border-[#c6994f] bg-[#c6994f] px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-[#14100d] shadow-lg shadow-[#c6994f]/20 transition-all hover:bg-[#e7c07f]"
          >
            <span>Next Mystery ({mysteryIndex + 2}/5)</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
