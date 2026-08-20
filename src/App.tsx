import { useState, useEffect, useCallback, useRef } from 'react';
import { MysterySetKey, BeadTheme, AmbientSoundOption, AmbientVisualOption, AppState, PrayerHistoryItem } from './types';
import { MYSTERY_DATA } from './data/mysteries';
import { buildPrayerSequence } from './utils/prayerSequence';
import { audioSynth } from './utils/audio';
import { Header } from './components/Header';
import { MysterySelector } from './components/MysterySelector';
import { RosaryStrand } from './components/RosaryStrand';
import { PrayerCard } from './components/PrayerCard';
import { PrayerControls } from './components/PrayerControls';
import { DecadeCompletionCard } from './components/DecadeCompletionCard';
import { DevotionalJournalModal } from './components/DevotionalJournalModal';
import { SettingsModal } from './components/SettingsModal';
import { IntentionModal } from './components/IntentionModal';
import { AmbientBackground } from './components/AmbientBackground';
import { OnboardingTour } from './components/OnboardingTour';

const LOCAL_STORAGE_KEY = 'one_decade_rosary_state_v2';
const ONBOARDING_SEEN_KEY = 'one_decade_rosary_onboarding_seen_v1';

function getInitialSet(): MysterySetKey {
  const day = new Date().getDay();
  if (day === 1 || day === 6) return 'joyful';
  if (day === 2 || day === 5) return 'sorrowful';
  if (day === 3 || day === 0) return 'glorious';
  return 'luminous';
}

export default function App() {
  const [appState, setAppState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          set: parsed.set || getInitialSet(),
          mysteryIndex: parsed.mysteryIndex ?? 0,
          step: parsed.step ?? 0,
          language: parsed.language || 'english',
          beadTheme: parsed.beadTheme || 'gold_onyx',
          soundFxEnabled: parsed.soundFxEnabled ?? true,
          ambientSound: parsed.ambientSound || 'none',
          ambientVolume: parsed.ambientVolume ?? 0.2,
          ambientVisual: parsed.ambientVisual || 'particles',
          customIntention: parsed.customIntention || '',
          decadesCompleted: parsed.decadesCompleted ?? 0,
          streak: parsed.streak ?? 0,
          lastCompletedDate: parsed.lastCompletedDate || null,
          finished: parsed.finished ?? false,
          history: parsed.history || [],
          autoAdvanceSeconds: parsed.autoAdvanceSeconds ?? 12
        };
      }
    } catch {
      // Fallback
    }

    return {
      set: getInitialSet(),
      mysteryIndex: 0,
      step: 0,
      language: 'english',
      beadTheme: 'gold_onyx',
      soundFxEnabled: true,
      ambientSound: 'none',
      ambientVolume: 0.2,
      ambientVisual: 'particles',
      customIntention: '',
      decadesCompleted: 0,
      streak: 0,
      lastCompletedDate: null,
      finished: false,
      history: [],
      autoAdvanceSeconds: 12
    };
  });

  // UI Modals state
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isIntentionOpen, setIsIntentionOpen] = useState(false);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);

  // Auto-advance timer ref
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check first-visit onboarding
  useEffect(() => {
    try {
      const hasSeen = localStorage.getItem(ONBOARDING_SEEN_KEY);
      if (!hasSeen) {
        const timer = setTimeout(() => {
          setIsTourOpen(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleCloseTour = () => {
    setIsTourOpen(false);
    try {
      localStorage.setItem(ONBOARDING_SEEN_KEY, 'true');
    } catch {
      // Ignore
    }
  };

  const handleStartTour = () => {
    setIsTourOpen(true);
  };

  // Save state on change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appState));
    } catch {
      // Ignore
    }
  }, [appState]);

  // Handle ambient soundscape updates
  useEffect(() => {
    audioSynth.setAmbient(appState.ambientSound, appState.ambientVolume);
    return () => {
      audioSynth.stopAmbient();
    };
  }, [appState.ambientSound, appState.ambientVolume]);

  // Build current steps array
  const currentSequence = buildPrayerSequence(
    appState.set,
    appState.mysteryIndex,
    appState.language,
    appState.customIntention
  );

  const currentStep = currentSequence[appState.step] || currentSequence[0];

  // Navigation handlers
  const handleSelectStep = (stepIdx: number) => {
    if (stepIdx >= 0 && stepIdx < currentSequence.length) {
      if (appState.soundFxEnabled) {
        audioSynth.playBeadChime();
      }
      setAppState((prev) => ({
        ...prev,
        step: stepIdx,
        finished: false
      }));
    }
  };

  const markDecadeComplete = useCallback(() => {
    const today = new Date().toDateString();
    let newStreak = appState.streak;

    if (appState.lastCompletedDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (appState.lastCompletedDate === yesterday.toDateString()) {
        newStreak = (appState.streak || 0) + 1;
      } else {
        newStreak = 1;
      }
    }

    const setData = MYSTERY_DATA[appState.set];
    const currentMystery = setData.mysteries[appState.mysteryIndex];

    const historyItem: PrayerHistoryItem = {
      id: `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      date: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      mysterySet: appState.set,
      mysteryTitle: currentMystery.title,
      mysteryIndex: appState.mysteryIndex,
      intention: appState.customIntention || undefined
    };

    if (appState.soundFxEnabled) {
      audioSynth.playCompletionChime();
    }

    setAppState((prev) => ({
      ...prev,
      finished: true,
      streak: newStreak,
      lastCompletedDate: today,
      decadesCompleted: prev.decadesCompleted + 1,
      history: [historyItem, ...prev.history]
    }));
  }, [appState.streak, appState.lastCompletedDate, appState.set, appState.mysteryIndex, appState.customIntention, appState.soundFxEnabled]);

  const handleNext = useCallback(() => {
    if (appState.step < currentSequence.length - 1) {
      if (appState.soundFxEnabled) {
        audioSynth.playBeadChime(appState.step % 3 === 0);
      }
      setAppState((prev) => ({ ...prev, step: prev.step + 1 }));
    } else {
      setIsAutoAdvancing(false);
      markDecadeComplete();
    }
  }, [appState.step, currentSequence.length, appState.soundFxEnabled, markDecadeComplete]);

  const handlePrev = useCallback(() => {
    if (appState.step > 0) {
      if (appState.soundFxEnabled) {
        audioSynth.playBeadChime();
      }
      setAppState((prev) => ({ ...prev, step: prev.step - 1, finished: false }));
    }
  }, [appState.step, appState.soundFxEnabled]);

  // Hands-free auto-advance timer
  useEffect(() => {
    if (isAutoAdvancing && !appState.finished) {
      autoAdvanceTimerRef.current = setInterval(() => {
        handleNext();
      }, (appState.autoAdvanceSeconds || 12) * 1000);
    } else {
      if (autoAdvanceTimerRef.current) {
        clearInterval(autoAdvanceTimerRef.current);
      }
    }

    return () => {
      if (autoAdvanceTimerRef.current) {
        clearInterval(autoAdvanceTimerRef.current);
      }
    };
  }, [isAutoAdvancing, appState.finished, appState.autoAdvanceSeconds, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        isJournalOpen ||
        isSettingsOpen ||
        isIntentionOpen ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (appState.finished) {
          // Reset or next mystery
          setAppState((prev) => ({ ...prev, mysteryIndex: (prev.mysteryIndex + 1) % 5, step: 0, finished: false }));
        } else {
          handleNext();
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [appState.finished, handleNext, handlePrev, isJournalOpen, isSettingsOpen, isIntentionOpen]);

  // Selector handlers
  const handleSelectSet = (setKey: MysterySetKey) => {
    setAppState((prev) => ({
      ...prev,
      set: setKey,
      mysteryIndex: 0,
      step: 0,
      finished: false
    }));
  };

  const handleSelectMysteryIndex = (mIndex: number) => {
    setAppState((prev) => ({
      ...prev,
      mysteryIndex: mIndex,
      step: 0,
      finished: false
    }));
  };

  return (
    <div className="relative min-h-screen bg-[#120e0b] px-4 py-8 text-[#ede2d0] selection:bg-[#c6994f]/30">
      {/* Meditative Ambient Background Effect */}
      <AmbientBackground
        mysterySet={appState.set}
        visualMode={appState.ambientVisual ?? 'particles'}
      />

      <div className="relative z-10 mx-auto max-w-2xl">
        {/* Header */}
        <Header
          currentSet={appState.set}
          language={appState.language}
          soundFxEnabled={appState.soundFxEnabled}
          ambientSound={appState.ambientSound}
          customIntention={appState.customIntention}
          onToggleSoundFx={() =>
            setAppState((prev) => ({ ...prev, soundFxEnabled: !prev.soundFxEnabled }))
          }
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenIntentionModal={() => setIsIntentionOpen(true)}
          onOpenJournal={() => setIsJournalOpen(true)}
          onStartTour={handleStartTour}
        />

        {/* Mystery & Decade Selector */}
        <MysterySelector
          currentSet={appState.set}
          currentMysteryIndex={appState.mysteryIndex}
          onSelectSet={handleSelectSet}
          onSelectMysteryIndex={handleSelectMysteryIndex}
        />

        {/* Rosary Bracelet Strand Visualizer */}
        <RosaryStrand
          currentStepIndex={appState.step}
          onSelectStep={handleSelectStep}
          beadTheme={appState.beadTheme}
        />

        {/* Main Content Area: Completion Card or Active Prayer Card */}
        {appState.finished ? (
          <DecadeCompletionCard
            setKey={appState.set}
            mysteryIndex={appState.mysteryIndex}
            streak={appState.streak}
            totalDecadesCompleted={appState.decadesCompleted}
            onRestartDecade={() =>
              setAppState((prev) => ({ ...prev, step: 0, finished: false }))
            }
            onNextMystery={() =>
              setAppState((prev) => ({
                ...prev,
                mysteryIndex: (prev.mysteryIndex + 1) % 5,
                step: 0,
                finished: false
              }))
            }
            onOpenJournal={() => setIsJournalOpen(true)}
          />
        ) : (
          <>
            <PrayerCard
              step={currentStep}
              currentStepIndex={appState.step}
              totalSteps={currentSequence.length}
              language={appState.language}
              onToggleLanguage={() =>
                setAppState((prev) => ({
                  ...prev,
                  language: prev.language === 'english' ? 'latin' : 'english'
                }))
              }
            />

            <PrayerControls
              currentStepIndex={appState.step}
              totalSteps={currentSequence.length}
              isAutoAdvancing={isAutoAdvancing}
              autoAdvanceSeconds={appState.autoAdvanceSeconds}
              onPrev={handlePrev}
              onNext={handleNext}
              onToggleAutoAdvance={() => setIsAutoAdvancing(!isAutoAdvancing)}
            />
          </>
        )}

        {/* Modals */}
        <DevotionalJournalModal
          isOpen={isJournalOpen}
          history={appState.history}
          streak={appState.streak}
          totalDecades={appState.decadesCompleted}
          onClose={() => setIsJournalOpen(false)}
          onClearHistory={() =>
            setAppState((prev) => ({ ...prev, history: [], decadesCompleted: 0, streak: 0 }))
          }
        />

        <SettingsModal
          isOpen={isSettingsOpen}
          language={appState.language}
          beadTheme={appState.beadTheme}
          ambientSound={appState.ambientSound}
          ambientVisual={appState.ambientVisual ?? 'particles'}
          autoAdvanceSeconds={appState.autoAdvanceSeconds}
          soundFxEnabled={appState.soundFxEnabled}
          onClose={() => setIsSettingsOpen(false)}
          onChangeLanguage={(lang) => setAppState((prev) => ({ ...prev, language: lang }))}
          onChangeBeadTheme={(theme) => setAppState((prev) => ({ ...prev, beadTheme: theme }))}
          onChangeAmbientSound={(sound) => setAppState((prev) => ({ ...prev, ambientSound: sound }))}
          onChangeAmbientVisual={(visual) => setAppState((prev) => ({ ...prev, ambientVisual: visual }))}
          onChangeAutoAdvanceSeconds={(sec) => setAppState((prev) => ({ ...prev, autoAdvanceSeconds: sec }))}
          onToggleSoundFx={() =>
            setAppState((prev) => ({ ...prev, soundFxEnabled: !prev.soundFxEnabled }))
          }
        />

        <IntentionModal
          isOpen={isIntentionOpen}
          currentIntention={appState.customIntention}
          onClose={() => setIsIntentionOpen(false)}
          onSaveIntention={(intention) =>
            setAppState((prev) => ({ ...prev, customIntention: intention }))
          }
        />

        {/* First-Visit Onboarding Tour */}
        <OnboardingTour
          isOpen={isTourOpen}
          onClose={handleCloseTour}
        />
      </div>
    </div>
  );

}
