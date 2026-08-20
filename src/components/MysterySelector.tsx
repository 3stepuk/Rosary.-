import React from 'react';
import { MysterySetKey } from '../types';
import { MYSTERY_DATA } from '../data/mysteries';

interface MysterySelectorProps {
  currentSet: MysterySetKey;
  currentMysteryIndex: number;
  onSelectSet: (setKey: MysterySetKey) => void;
  onSelectMysteryIndex: (index: number) => void;
}

export const MysterySelector: React.FC<MysterySelectorProps> = ({
  currentSet,
  currentMysteryIndex,
  onSelectSet,
  onSelectMysteryIndex
}) => {
  const mysteryKeys: MysterySetKey[] = ['joyful', 'sorrowful', 'glorious', 'luminous'];
  const activeSetData = MYSTERY_DATA[currentSet];

  return (
    <div id="mystery-selector-container" className="mb-6 space-y-3">
      {/* Set Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {mysteryKeys.map((key) => {
          const setData = MYSTERY_DATA[key];
          const isActive = key === currentSet;

          return (
            <button
              key={key}
              onClick={() => onSelectSet(key)}
              className={`rounded-full border px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                isActive
                  ? 'border-[#c6994f] bg-[#c6994f] text-[#14100d] font-semibold shadow-lg shadow-[#c6994f]/20'
                  : 'border-[#3e3020] bg-[#221a14] text-[#b8a892] hover:border-[#c6994f]/60 hover:text-[#e7c07f]'
              }`}
            >
              {setData.label}
            </button>
          );
        })}
      </div>

      {/* Specific Mystery Choice (Decade 1-5 within active set) */}
      <div className="rounded-2xl border border-[#3e3020] bg-[#1a1410]/80 p-3 shadow-inner">
        <div className="mb-2 flex items-center justify-between px-1 text-xs">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#c6994f]">
            {activeSetData.label} Mysteries ({activeSetData.days})
          </span>
          <span className="font-sans text-xs text-[#857562]">
            Select Decade
          </span>
        </div>

        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-5">
          {activeSetData.mysteries.map((m, idx) => {
            const isSelected = idx === currentMysteryIndex;

            return (
              <button
                key={idx}
                onClick={() => onSelectMysteryIndex(idx)}
                className={`flex flex-col items-start justify-between rounded-xl border p-2.5 text-left transition-all ${
                  isSelected
                    ? 'border-[#e7c07f] bg-[#2c221a] text-[#e7c07f] shadow-md ring-1 ring-[#e7c07f]/40'
                    : 'border-[#3e3020]/60 bg-[#221a14]/60 text-[#b8a892] hover:border-[#c6994f]/40 hover:bg-[#221a14]'
                }`}
              >
                <div className="font-sans text-[10px] font-medium uppercase tracking-wider opacity-75">
                  Decade {idx + 1}
                </div>
                <div className="line-clamp-2 font-garamond text-sm font-semibold leading-snug">
                  {m.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
