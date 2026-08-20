import React from 'react';
import { X, Settings, Volume2, Globe, Palette, Clock, Sparkles } from 'lucide-react';
import { BeadTheme, AmbientSoundOption, AmbientVisualOption } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  language: 'english' | 'latin';
  beadTheme: BeadTheme;
  ambientSound: AmbientSoundOption;
  ambientVisual?: AmbientVisualOption;
  autoAdvanceSeconds: number;
  soundFxEnabled: boolean;
  onClose: () => void;
  onChangeLanguage: (lang: 'english' | 'latin') => void;
  onChangeBeadTheme: (theme: BeadTheme) => void;
  onChangeAmbientSound: (sound: AmbientSoundOption) => void;
  onChangeAmbientVisual?: (visual: AmbientVisualOption) => void;
  onChangeAutoAdvanceSeconds: (sec: number) => void;
  onToggleSoundFx: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  language,
  beadTheme,
  ambientSound,
  ambientVisual = 'particles',
  autoAdvanceSeconds,
  soundFxEnabled,
  onClose,
  onChangeLanguage,
  onChangeBeadTheme,
  onChangeAmbientSound,
  onChangeAmbientVisual,
  onChangeAutoAdvanceSeconds,
  onToggleSoundFx
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#120e0b]/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#3e3020] bg-[#221a14] p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#857562] transition-colors hover:bg-[#1a1410] hover:text-[#e7c07f]"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 flex items-center gap-3 border-b border-[#3e3020] pb-4">
          <Settings className="h-6 w-6 text-[#c6994f]" />
          <div>
            <h2 className="font-cinzel text-xl font-semibold text-[#e7c07f]">
              Prayer Sanctuary Settings
            </h2>
            <p className="font-sans text-xs text-[#857562]">
              Customize your devotional experience
            </p>
          </div>
        </div>

        <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
          {/* Language Toggle */}
          <div>
            <label className="mb-2 flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#c6994f]">
              <Globe className="h-3.5 w-3.5" />
              <span>Prayer Language</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onChangeLanguage('english')}
                className={`rounded-xl border p-3 font-sans text-xs font-semibold transition-all ${
                  language === 'english'
                    ? 'border-[#c6994f] bg-[#c6994f] text-[#14100d]'
                    : 'border-[#3e3020] bg-[#1a1410] text-[#b8a892] hover:border-[#c6994f]/50'
                }`}
              >
                English
              </button>
              <button
                onClick={() => onChangeLanguage('latin')}
                className={`rounded-xl border p-3 font-sans text-xs font-semibold transition-all ${
                  language === 'latin'
                    ? 'border-[#c6994f] bg-[#c6994f] text-[#14100d]'
                    : 'border-[#3e3020] bg-[#1a1410] text-[#b8a892] hover:border-[#c6994f]/50'
                }`}
              >
                Latin (Lingua Latina)
              </button>
            </div>
          </div>

          {/* Bead Material Theme */}
          <div>
            <label className="mb-2 flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#c6994f]">
              <Palette className="h-3.5 w-3.5" />
              <span>Rosary Bead Material</span>
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { id: 'gold_onyx', label: 'Gold & Onyx' },
                { id: 'olive_wood', label: 'Olive Wood' },
                { id: 'sandalwood', label: 'Sandalwood' },
                { id: 'rose_quartz', label: 'Rose Quartz' }
              ].map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => onChangeBeadTheme(theme.id as BeadTheme)}
                  className={`rounded-xl border p-2.5 text-center font-sans text-xs font-medium transition-all ${
                    beadTheme === theme.id
                      ? 'border-[#e7c07f] bg-[#2c221a] text-[#e7c07f] ring-1 ring-[#e7c07f]'
                      : 'border-[#3e3020] bg-[#1a1410] text-[#b8a892] hover:border-[#c6994f]/50'
                  }`}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>

          {/* Audio Chime and Sanctuary Atmosphere */}
          <div>
            <label className="mb-2 flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#c6994f]">
              <Volume2 className="h-3.5 w-3.5" />
              <span>Audio Chime & Sanctuary Atmosphere</span>
            </label>

            <div className="space-y-2">
              <button
                onClick={onToggleSoundFx}
                className={`w-full flex items-center justify-between rounded-xl border p-3 font-sans text-xs transition-all ${
                  soundFxEnabled
                    ? 'border-[#c6994f] bg-[#2c221a] text-[#e7c07f]'
                    : 'border-[#3e3020] bg-[#1a1410] text-[#857562]'
                }`}
              >
                <span>Bead Transition Bell Chime</span>
                <span className="font-semibold">{soundFxEnabled ? 'ON' : 'OFF'}</span>
              </button>

              <div className="pt-2">
                <div className="mb-1 font-sans text-[11px] text-[#857562]">
                  Background Sanctuary Soundscape:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'none', label: 'Silence' },
                    { id: 'chime_drone', label: 'Chapel Drone' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => onChangeAmbientSound(s.id as AmbientSoundOption)}
                      className={`rounded-xl border p-2.5 font-sans text-xs transition-all ${
                        ambientSound === s.id
                          ? 'border-[#c6994f] bg-[#c6994f]/20 text-[#e7c07f]'
                          : 'border-[#3e3020] bg-[#1a1410] text-[#b8a892] hover:border-[#c6994f]/50'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Visual Ambient Atmosphere */}
          {onChangeAmbientVisual && (
            <div>
              <label className="mb-2 flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#c6994f]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Ambient Visual Atmosphere</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'particles', label: 'Light Specks & Aura', desc: 'Floating light & shifting glow' },
                  { id: 'aura', label: 'Soft Aura Only', desc: 'Gentle color shift glow' },
                  { id: 'minimal', label: 'Minimal / Still', desc: 'Dark quiet canvas' }
                ].map((v) => (
                  <button
                    key={v.id}
                    onClick={() => onChangeAmbientVisual(v.id as AmbientVisualOption)}
                    className={`rounded-xl border p-2.5 text-left font-sans transition-all flex flex-col justify-between ${
                      ambientVisual === v.id
                        ? 'border-[#e7c07f] bg-[#2c221a] text-[#e7c07f] ring-1 ring-[#e7c07f]'
                        : 'border-[#3e3020] bg-[#1a1410] text-[#b8a892] hover:border-[#c6994f]/50'
                    }`}
                  >
                    <span className="text-xs font-semibold">{v.label}</span>
                    <span className="text-[10px] text-[#857562] mt-0.5 leading-tight">{v.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Hands-Free Auto Advance Interval */}
          <div>
            <label className="mb-2 flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#c6994f]">
              <Clock className="h-3.5 w-3.5" />
              <span>Hands-Free Timer Speed</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[8, 12, 16, 20].map((sec) => (
                <button
                  key={sec}
                  onClick={() => onChangeAutoAdvanceSeconds(sec)}
                  className={`rounded-xl border p-2.5 font-sans text-xs font-medium transition-all ${
                    autoAdvanceSeconds === sec
                      ? 'border-[#e7c07f] bg-[#2c221a] text-[#e7c07f] ring-1 ring-[#e7c07f]'
                      : 'border-[#3e3020] bg-[#1a1410] text-[#b8a892] hover:border-[#c6994f]/50'
                  }`}
                >
                  {sec}s / bead
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 border-t border-[#3e3020] pt-4 text-right">
          <button
            onClick={onClose}
            className="rounded-full border border-[#c6994f] bg-[#c6994f] px-6 py-2 font-sans text-xs font-semibold text-[#14100d] hover:bg-[#e7c07f]"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};
