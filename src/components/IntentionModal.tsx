import React, { useState } from 'react';
import { X, Heart, Sparkles } from 'lucide-react';

interface IntentionModalProps {
  isOpen: boolean;
  currentIntention: string;
  onClose: () => void;
  onSaveIntention: (intention: string) => void;
}

const SAMPLE_INTENTIONS = [
  "For peace in my family and home",
  "For healing and comfort for the sick",
  "For those who are lonely or suffering",
  "For guidance and clarity in decisions",
  "In gratitude for God's blessings and grace",
  "For the souls of departed loved ones"
];

export const IntentionModal: React.FC<IntentionModalProps> = ({
  isOpen,
  currentIntention,
  onClose,
  onSaveIntention
}) => {
  const [value, setValue] = useState(currentIntention);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveIntention(value.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#120e0b]/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#3e3020] bg-[#221a14] p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#857562] transition-colors hover:bg-[#1a1410] hover:text-[#e7c07f]"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4 flex items-center gap-3">
          <Heart className="h-6 w-6 text-[#8a2b3d]" />
          <div>
            <h2 className="font-cinzel text-xl font-semibold text-[#e7c07f]">
              Prayer Intention
            </h2>
            <p className="font-sans text-xs text-[#857562]">
              What grace or concern are you placing before Our Lord today?
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              rows={3}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. For my family's peace, for strength during trials..."
              className="w-full rounded-2xl border border-[#3e3020] bg-[#1a1410] p-4 font-crimson text-base text-[#ede2d0] placeholder-[#857562] focus:border-[#c6994f] focus:outline-none focus:ring-1 focus:ring-[#c6994f]"
            />
          </div>

          {/* Quick Inspirations */}
          <div>
            <div className="mb-2 flex items-center gap-1 font-sans text-xs font-semibold text-[#857562]">
              <Sparkles className="h-3 w-3 text-[#c6994f]" />
              <span>Quick Inspirations:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_INTENTIONS.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setValue(s)}
                  className="rounded-lg border border-[#3e3020] bg-[#1a1410] px-2.5 py-1 font-sans text-xs text-[#b8a892] transition-colors hover:border-[#c6994f] hover:text-[#e7c07f]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#3e3020] pt-4">
            <button
              type="button"
              onClick={() => {
                setValue('');
                onSaveIntention('');
                onClose();
              }}
              className="font-sans text-xs text-[#8a2b3d] hover:underline"
            >
              Clear Intention
            </button>

            <button
              type="submit"
              className="rounded-full border border-[#c6994f] bg-[#c6994f] px-6 py-2.5 font-sans text-xs font-semibold text-[#14100d] hover:bg-[#e7c07f]"
            >
              Save Intention
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
