import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Check,
  CircleDot,
  LayoutGrid,
  Sparkles,
  BookOpen,
  Play,
  Heart,
  HelpCircle
} from 'lucide-react';

export interface TourStep {
  id: string;
  targetId: string;
  title: string;
  subtitle: string;
  content: string;
  tip?: string;
  icon: React.ReactNode;
  placement?: 'bottom' | 'top' | 'center';
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'rosary-strand',
    targetId: 'rosary-strand-container',
    title: 'Interactive Rosary Strand',
    subtitle: 'Touch or tap any bead',
    content:
      'Tap any bead around the bracelet to jump directly to that prayer step. The glowing halo marks your active bead, and completed beads show your progress in the decade.',
    tip: 'Each bead transition plays a sacred chime tone.',
    icon: <CircleDot className="h-5 w-5 text-[#c6994f]" />,
    placement: 'bottom'
  },
  {
    id: 'view-mode',
    targetId: 'rosary-view-switcher',
    title: 'Dual Strand Views',
    subtitle: 'Bracelet Loop & Bead Track',
    content:
      'Switch between the traditional circular Bracelet Loop and the horizontal tactile Bead Track for large number badges and swipeable scrolling.',
    tip: 'Switch views anytime without losing your active prayer bead.',
    icon: <LayoutGrid className="h-5 w-5 text-[#c6994f]" />,
    placement: 'bottom'
  },
  {
    id: 'mysteries',
    targetId: 'mystery-selector-container',
    title: 'Mysteries & Decades',
    subtitle: 'Select any mystery set',
    content:
      'Select between Joyful, Sorrowful, Glorious, and Luminous mysteries. Choose any of the 5 decades to meditate upon its Gospel mystery and spiritual fruit.',
    tip: 'The header automatically suggests today\'s traditional mystery set.',
    icon: <Sparkles className="h-5 w-5 text-[#c6994f]" />,
    placement: 'bottom'
  },
  {
    id: 'prayer-card',
    targetId: 'prayer-card-container',
    title: 'Scriptural Devotional Card',
    subtitle: 'English & Latin texts',
    content:
      'Follow each prayer with scriptural reflections and contemplative focus. Toggle to ecclesiastical Latin or view English and Latin side-by-side.',
    tip: 'Tap the Latin toggle button in the card header anytime.',
    icon: <BookOpen className="h-5 w-5 text-[#c6994f]" />,
    placement: 'top'
  },
  {
    id: 'prayer-controls',
    targetId: 'prayer-controls-container',
    title: 'Prayer Controls & Auto-Advance',
    subtitle: 'Hands-free meditation timer',
    content:
      'Advance bead-by-bead with Back/Next buttons, keyboard arrow keys, or enable hands-free Auto-Advance pacing in Settings.',
    tip: 'Keyboard shortcut: Press Right Arrow or Spacebar to advance.',
    icon: <Play className="h-5 w-5 text-[#c6994f]" />,
    placement: 'top'
  },
  {
    id: 'header-controls',
    targetId: 'header-controls-container',
    title: 'Sanctuary & Intentions',
    subtitle: 'Journal, audio & bead themes',
    content:
      'Record your prayer intentions, track your daily streaks in the Devotional Journal, and customize bead materials (Gold & Onyx, Olive Wood, Sandalwood, Rose Quartz).',
    tip: 'All your progress and settings are saved automatically.',
    icon: <Heart className="h-5 w-5 text-[#c6994f]" />,
    placement: 'bottom'
  }
];

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const step = TOUR_STEPS[currentStep];

  // Update target rect whenever step changes or window resizes/scrolls
  const updateTargetRect = useCallback(() => {
    if (!isOpen) return;
    const targetElement = document.getElementById(step.targetId);
    if (targetElement) {
      // Scroll into view if needed
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      const rect = targetElement.getBoundingClientRect();
      setTargetRect(rect);
    } else {
      setTargetRect(null);
    }
  }, [isOpen, step.targetId]);

  useEffect(() => {
    if (!isOpen) return;
    updateTargetRect();

    const handleResizeOrScroll = () => {
      updateTargetRect();
    };

    window.addEventListener('resize', handleResizeOrScroll, { passive: true });
    window.addEventListener('scroll', handleResizeOrScroll, { passive: true });

    // Delay slight check for dynamic renders
    const timer = setTimeout(updateTargetRect, 200);

    return () => {
      window.removeEventListener('resize', handleResizeOrScroll);
      window.removeEventListener('scroll', handleResizeOrScroll);
      clearTimeout(timer);
    };
  }, [isOpen, currentStep, updateTargetRect]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (currentStep < TOUR_STEPS.length - 1) {
          setCurrentStep((prev) => prev + 1);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentStep > 0) {
          setCurrentStep((prev) => prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStep, onClose]);

  if (!isOpen) return null;

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === TOUR_STEPS.length - 1;

  // Calculate tooltip popover positioning
  let tooltipStyle: React.CSSProperties = {};
  if (targetRect) {
    const isMobile = window.innerWidth < 640;
    const padding = 12;

    if (isMobile) {
      // On mobile, stick to bottom of screen for ergonomic tapping
      tooltipStyle = {
        position: 'fixed',
        left: padding,
        right: padding,
        bottom: padding,
        zIndex: 60
      };
    } else {
      // On desktop, calculate relative to target rect
      const placement = step.placement || 'bottom';
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const tooltipWidth = 420;
      let left = Math.max(padding, targetCenterX - tooltipWidth / 2);
      if (left + tooltipWidth > window.innerWidth - padding) {
        left = window.innerWidth - tooltipWidth - padding;
      }

      if (placement === 'bottom' && targetRect.bottom + 280 < window.innerHeight) {
        tooltipStyle = {
          position: 'fixed',
          top: targetRect.bottom + 14,
          left,
          width: tooltipWidth,
          zIndex: 60
        };
      } else if (placement === 'top' && targetRect.top - 280 > 0) {
        tooltipStyle = {
          position: 'fixed',
          bottom: window.innerHeight - targetRect.top + 14,
          left,
          width: tooltipWidth,
          zIndex: 60
        };
      } else {
        // Fallback: place in lower comfortable region or centered
        tooltipStyle = {
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          width: tooltipWidth,
          zIndex: 60
        };
      }
    }
  } else {
    // Fallback centered popover
    tooltipStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'min(90vw, 420px)',
      zIndex: 60
    };
  }

  return (
    <div id="onboarding-tour-portal" className="relative">
      {/* Semi-transparent gentle backdrop with click-to-dismiss */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-[#0a0806]/70 backdrop-blur-[2px] transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Target Element Spotlight Highlight Box */}
      {targetRect && (
        <div
          className="pointer-events-none fixed z-50 rounded-2xl border-2 border-[#e7c07f] shadow-[0_0_25px_rgba(231,192,127,0.45)] transition-all duration-300 ring-4 ring-[#c6994f]/20"
          style={{
            top: Math.max(0, targetRect.top - 6),
            left: Math.max(0, targetRect.left - 6),
            width: targetRect.width + 12,
            height: targetRect.height + 12
          }}
        />
      )}

      {/* Tooltip Content Card */}
      <div
        style={tooltipStyle}
        className="animate-fade-in overflow-hidden rounded-2xl border border-[#c6994f]/60 bg-[#1e1711] p-5 shadow-2xl ring-1 ring-[#c6994f]/30"
        role="dialog"
        aria-modal="true"
        aria-label="Onboarding Tour"
      >
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3 border-b border-[#3e3020]/70 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#3e3020] bg-[#2a2016] shadow-inner">
              {step.icon}
            </div>
            <div>
              <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c6994f]">
                Rosary Guide • Step {currentStep + 1} of {TOUR_STEPS.length}
              </div>
              <h3 className="font-garamond text-lg font-bold leading-tight text-[#e7c07f]">
                {step.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-1 text-[#857562] transition-colors hover:bg-[#2c221a] hover:text-[#e7c07f]"
            aria-label="Close tour"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body Description */}
        <div className="my-3 space-y-2">
          <p className="font-crimson text-sm leading-relaxed text-[#ede2d0]/90">
            {step.content}
          </p>

          {step.tip && (
            <div className="flex items-start gap-1.5 rounded-lg border border-[#3e3020]/70 bg-[#140f0c] p-2 text-[11px] text-[#c6994f]">
              <Sparkles className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
              <span><strong>Helpful Tip:</strong> {step.tip}</span>
            </div>
          )}
        </div>

        {/* Footer Navigation & Dots */}
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#3e3020]/60 pt-3">
          {/* Step Dots indicator */}
          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                aria-label={`Go to tour step ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep
                    ? 'w-5 bg-[#e7c07f]'
                    : 'w-1.5 bg-[#3e3020] hover:bg-[#c6994f]/50'
                }`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {!isFirstStep && (
              <button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="flex items-center gap-1 rounded-xl border border-[#3e3020] bg-[#140f0c] px-2.5 py-1.5 font-sans text-xs text-[#b8a892] transition-all hover:border-[#c6994f] hover:text-[#e7c07f]"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Back</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="rounded-xl px-2.5 py-1.5 font-sans text-xs text-[#857562] transition-colors hover:text-[#b8a892]"
            >
              Skip
            </button>

            <button
              onClick={() => {
                if (isLastStep) {
                  onClose();
                } else {
                  setCurrentStep((prev) => prev + 1);
                }
              }}
              className="flex items-center gap-1.5 rounded-xl bg-[#c6994f] px-3.5 py-1.5 font-sans text-xs font-semibold text-[#14100d] shadow-md transition-all hover:bg-[#d4a259] hover:shadow-lg active:scale-95"
            >
              <span>{isLastStep ? 'Finish Guide' : 'Next'}</span>
              {isLastStep ? (
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
