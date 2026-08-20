import React from 'react';
import { Volume2, VolumeX, Settings, Cross, Heart, Sparkles, BookOpen, HelpCircle } from 'lucide-react';
import { MysterySetKey, BeadTheme, AmbientSoundOption } from '../types';
import { MYSTERY_DATA } from '../data/mysteries';

interface HeaderProps {
  currentSet: MysterySetKey;
  language: 'english' | 'latin';
  soundFxEnabled: boolean;
  ambientSound: AmbientSoundOption;
  customIntention: string;
  onToggleSoundFx: () => void;
  onOpenSettings: () => void;
  onOpenIntentionModal: () => void;
  onOpenJournal: () => void;
  onStartTour: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSet,
  language,
  soundFxEnabled,
  customIntention,
  onToggleSoundFx,
  onOpenSettings,
  onOpenIntentionModal,
  onOpenJournal,
  onStartTour
}) => {
  // Get today's traditional mystery
  const today = new Date();
  const dayName = today.toLocaleDateString(undefined, { weekday: 'long' });
  const dayNum = today.getDay(); // 0=Sun, 1=Mon...

  let traditionalSetKey: MysterySetKey = 'joyful';
  if (dayNum === 1 || dayNum === 6) traditionalSetKey = 'joyful';
  else if (dayNum === 2 || dayNum === 5) traditionalSetKey = 'sorrowful';
  else if (dayNum === 3 || dayNum === 0) traditionalSetKey = 'glorious';
  else if (dayNum === 4) traditionalSetKey = 'luminous';

  const traditionalSet = MYSTERY_DATA[traditionalSetKey];

  return (
    <header className="mb-6 text-center">
      {/* Top sacred ornament */}
      <div className="mb-2 flex items-center justify-center gap-3">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#c6994f]/50"></div>
        <Cross className="h-5 w-5 text-[#c6994f] stroke-[1.5]" />
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#c6994f]/50"></div>
      </div>

      <div className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-[#c6994f]/90 mb-1">
        Rosary Bracelet Prayer Companion
      </div>

      <h1 className="font-cinzel text-3xl font-semibold tracking-wide text-[#e7c07f] sm:text-4xl">
        One Decade
      </h1>

      <p className="mt-1 font-crimson text-base italic text-[#b8a892]/80 sm:text-lg">
        A quiet sanctuary for praying the Holy Rosary, bead by bead
      </p>

      {/* Today's Traditional Tip Banner */}
      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#3e3020] bg-[#1a1410]/80 px-4 py-1.5 font-sans text-xs text-[#ede2d0]/90 shadow-sm backdrop-blur-sm">
        <Sparkles className="h-3.5 w-3.5 text-[#c6994f]" />
        <span>
          <strong className="font-semibold text-[#e7c07f]">{dayName}:</strong> Traditionally prayed as the{' '}
          <span className="underline decoration-[#c6994f]/50 underline-offset-2">{traditionalSet.label} Mysteries</span>
        </span>
      </div>

      {/* Controls Bar: Settings, Intention, Sound, Journal, Guide */}
      <div
        id="header-controls-container"
        className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs"
      >
        {/* Intention pill */}
        <button
          onClick={onOpenIntentionModal}
          className="flex items-center gap-1.5 rounded-xl border border-[#3e3020] bg-[#221a14] px-3 py-1.5 text-[#e7c07f] transition-all hover:border-[#c6994f] hover:bg-[#2c221a]"
        >
          <Heart className="h-3.5 w-3.5 text-[#8a2b3d]" />
          <span>
            {customIntention ? `Intention: "${customIntention.slice(0, 18)}${customIntention.length > 18 ? '...' : ''}"` : 'Add Prayer Intention'}
          </span>
        </button>

        {/* Journal */}
        <button
          onClick={onOpenJournal}
          className="flex items-center gap-1.5 rounded-xl border border-[#3e3020] bg-[#221a14] px-3 py-1.5 text-[#ede2d0] transition-all hover:border-[#c6994f] hover:bg-[#2c221a]"
        >
          <BookOpen className="h-3.5 w-3.5 text-[#c6994f]" />
          <span>Devotional Journal</span>
        </button>

        {/* Audio Chime Toggle */}
        <button
          onClick={onToggleSoundFx}
          title={soundFxEnabled ? 'Mute Chimes' : 'Enable Chimes'}
          className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 transition-all ${
            soundFxEnabled
              ? 'border-[#c6994f] bg-[#c6994f]/15 text-[#e7c07f]'
              : 'border-[#3e3020] bg-[#221a14] text-[#857562]'
          }`}
        >
          {soundFxEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
          <span>{soundFxEnabled ? 'Chime On' : 'Chime Off'}</span>
        </button>

        {/* Settings */}
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-1.5 rounded-xl border border-[#3e3020] bg-[#221a14] px-3 py-1.5 text-[#ede2d0] transition-all hover:border-[#c6994f] hover:bg-[#2c221a]"
        >
          <Settings className="h-3.5 w-3.5 text-[#c6994f]" />
          <span>Settings ({language === 'latin' ? 'Latin' : 'English'})</span>
        </button>

        {/* Tour / Guide Button */}
        <button
          onClick={onStartTour}
          title="Open interactive tour guide"
          className="flex items-center gap-1.5 rounded-xl border border-[#3e3020] bg-[#221a14] px-3 py-1.5 text-[#c6994f] transition-all hover:border-[#c6994f] hover:bg-[#2c221a]"
        >
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Quick Guide</span>
        </button>
      </div>
    </header>
  );
};
