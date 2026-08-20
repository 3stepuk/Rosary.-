export type MysterySetKey = 'joyful' | 'sorrowful' | 'glorious' | 'luminous';

export interface MysteryItem {
  title: string;
  scripture: string;
  fruit: string;
  reflection: string;
}

export interface MysterySetData {
  label: string;
  days: string;
  description: string;
  mysteries: MysteryItem[];
}

export type BeadType = 'crucifix' | 'paternoster' | 'ave' | 'gloria' | 'medal' | 'star';

export interface PrayerStep {
  beadType: BeadType;
  title: string;
  sub: string;
  text: string;
  textLatin?: string;
  note: string;
  visual: string[];
  fruit?: string;
}

export type BeadTheme = 'gold_onyx' | 'sandalwood' | 'rose_quartz' | 'olive_wood';

export type AmbientSoundOption = 'none' | 'chime_drone' | 'gentle_rain' | 'soft_waves';

export interface PrayerHistoryItem {
  id: string;
  date: string; // ISO date or formatted
  mysterySet: MysterySetKey;
  mysteryTitle: string;
  mysteryIndex: number;
  intention?: string;
}

export type AmbientVisualOption = 'particles' | 'aura' | 'minimal';

export interface AppState {
  set: MysterySetKey;
  mysteryIndex: number;
  step: number;
  language: 'english' | 'latin';
  beadTheme: BeadTheme;
  soundFxEnabled: boolean;
  ambientSound: AmbientSoundOption;
  ambientVolume: number;
  ambientVisual?: AmbientVisualOption;
  customIntention: string;
  decadesCompleted: number;
  streak: number;
  lastCompletedDate: string | null;
  finished: boolean;
  history: PrayerHistoryItem[];
  autoAdvanceSeconds: number; // 0 = off
}

