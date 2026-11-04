import React, { useState, useRef, useEffect } from 'react';
import { BeadType, BeadTheme } from '../types';
import { Circle, Check, ChevronLeft, ChevronRight, LayoutGrid, CircleDot } from 'lucide-react';

interface RosaryStrandProps {
  currentStepIndex: number;
  onSelectStep: (stepIndex: number) => void;
  beadTheme: BeadTheme;
}

// Map 21 prayer steps to 20 physical node positions on the bracelet loop
const stepToNodeMap = [
  0,  // 1. Sign of Cross -> Crucifix
  0,  // 2. Creed -> Crucifix
  1,  // 3. Our Father -> First Large Bead
  2,  // 4. Ave 1 -> Small Ave 1
  3,  // 5. Ave 2 -> Small Ave 2
  4,  // 6. Ave 3 -> Small Ave 3
  5,  // 7. Glory Be -> Gloria ring
  6,  // 8. Mystery -> Miraculous Medal
  7,  // 9. Our Father -> Decade Large Bead
  8,  // 10. Ave 1 -> Decade Ave 1
  9,  // 11. Ave 2 -> Decade Ave 2
  10, // 12. Ave 3 -> Decade Ave 3
  11, // 13. Ave 4 -> Decade Ave 4
  12, // 14. Ave 5 -> Decade Ave 5
  13, // 15. Ave 6 -> Decade Ave 6
  14, // 16. Ave 7 -> Decade Ave 7
  15, // 17. Ave 8 -> Decade Ave 8
  16, // 18. Ave 9 -> Decade Ave 9
  17, // 19. Ave 10 -> Decade Ave 10
  18, // 20. Glory Be -> Decade Gloria
  19  // 21. Fatima Prayer -> Fatima Star
];

export interface BeadInfo {
  nodeIndex: number;
  type: BeadType;
  label: string;
  shortLabel: string;
  sub: string;
  mappedStepIndex: number;
}

const ALL_BEADS: BeadInfo[] = [
  { nodeIndex: 0, type: 'crucifix', label: 'Crucifix', shortLabel: '✝️', sub: 'Sign of Cross & Creed', mappedStepIndex: 0 },
  { nodeIndex: 1, type: 'paternoster', label: 'Intro Our Father', shortLabel: 'Pater', sub: 'Lord\'s Prayer', mappedStepIndex: 2 },
  { nodeIndex: 2, type: 'ave', label: 'Hail Mary (Faith)', shortLabel: 'A1', sub: 'Increase in Faith', mappedStepIndex: 3 },
  { nodeIndex: 3, type: 'ave', label: 'Hail Mary (Hope)', shortLabel: 'A2', sub: 'Increase in Hope', mappedStepIndex: 4 },
  { nodeIndex: 4, type: 'ave', label: 'Hail Mary (Charity)', shortLabel: 'A3', sub: 'Increase in Charity', mappedStepIndex: 5 },
  { nodeIndex: 5, type: 'gloria', label: 'Intro Glory Be', shortLabel: 'Gloria', sub: 'Glory to Trinity', mappedStepIndex: 6 },
  { nodeIndex: 6, type: 'medal', label: 'Miraculous Medal', shortLabel: '🏅', sub: 'Contemplate Mystery', mappedStepIndex: 7 },
  { nodeIndex: 7, type: 'paternoster', label: 'Decade Our Father', shortLabel: 'Pater', sub: 'Opening Decade', mappedStepIndex: 8 },
  { nodeIndex: 8, type: 'ave', label: 'Hail Mary 1', shortLabel: '1', sub: 'Decade Bead 1', mappedStepIndex: 9 },
  { nodeIndex: 9, type: 'ave', label: 'Hail Mary 2', shortLabel: '2', sub: 'Decade Bead 2', mappedStepIndex: 10 },
  { nodeIndex: 10, type: 'ave', label: 'Hail Mary 3', shortLabel: '3', sub: 'Decade Bead 3', mappedStepIndex: 11 },
  { nodeIndex: 11, type: 'ave', label: 'Hail Mary 4', shortLabel: '4', sub: 'Decade Bead 4', mappedStepIndex: 12 },
  { nodeIndex: 12, type: 'ave', label: 'Hail Mary 5', shortLabel: '5', sub: 'Decade Bead 5', mappedStepIndex: 13 },
  { nodeIndex: 13, type: 'ave', label: 'Hail Mary 6', shortLabel: '6', sub: 'Decade Bead 6', mappedStepIndex: 14 },
  { nodeIndex: 14, type: 'ave', label: 'Hail Mary 7', shortLabel: '7', sub: 'Decade Bead 7', mappedStepIndex: 15 },
  { nodeIndex: 15, type: 'ave', label: 'Hail Mary 8', shortLabel: '8', sub: 'Decade Bead 8', mappedStepIndex: 16 },
  { nodeIndex: 16, type: 'ave', label: 'Hail Mary 9', shortLabel: '9', sub: 'Decade Bead 9', mappedStepIndex: 17 },
  { nodeIndex: 17, type: 'ave', label: 'Hail Mary 10', shortLabel: '10', sub: 'Decade Bead 10', mappedStepIndex: 18 },
  { nodeIndex: 18, type: 'gloria', label: 'Decade Glory Be', shortLabel: 'Gloria', sub: 'Closing Doxology', mappedStepIndex: 19 },
  { nodeIndex: 19, type: 'star', label: 'Fatima Star', shortLabel: '⭐', sub: 'O My Jesus', mappedStepIndex: 20 }
];

const THEME_COLORS: Record<BeadTheme, {
  link: string;
  crucifix: string;
  paternoster: string;
  ave: string;
  gloria: string;
  medal: string;
  star: string;
  cardBg: string;
  activeBorder: string;
}> = {
  gold_onyx: {
    link: '#5a4632',
    crucifix: '#d4af37',
    paternoster: '#e7c07f',
    ave: '#2a221a',
    gloria: '#8a2b3d',
    medal: '#607393',
    star: '#e7c07f',
    cardBg: '#1e1711',
    activeBorder: '#c6994f'
  },
  olive_wood: {
    link: '#614933',
    crucifix: '#b38243',
    paternoster: '#d4a259',
    ave: '#a67a42',
    gloria: '#6e4627',
    medal: '#8c765c',
    star: '#d4a259',
    cardBg: '#1e1812',
    activeBorder: '#d4a259'
  },
  sandalwood: {
    link: '#694e3c',
    crucifix: '#d9a05b',
    paternoster: '#e5b878',
    ave: '#c48f51',
    gloria: '#a85b32',
    medal: '#9c816b',
    star: '#e5b878',
    cardBg: '#1f1812',
    activeBorder: '#e5b878'
  },
  rose_quartz: {
    link: '#805d6e',
    crucifix: '#e6b8c4',
    paternoster: '#f2cad3',
    ave: '#e8bac5',
    gloria: '#9e4b6c',
    medal: '#90a0b8',
    star: '#f2cad3',
    cardBg: '#1e1518',
    activeBorder: '#e6b8c4'
  }
};

export const RosaryStrand: React.FC<RosaryStrandProps> = ({
  currentStepIndex,
  onSelectStep,
  beadTheme
}) => {
  const activeNodeIndex = stepToNodeMap[currentStepIndex] ?? 0;
  const activeBeadInfo = ALL_BEADS[activeNodeIndex] || ALL_BEADS[0];
  const theme = THEME_COLORS[beadTheme] || THEME_COLORS.gold_onyx;

  const [viewMode, setViewMode] = useState<'loop' | 'track'>('loop');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the track view to center the active bead
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector(`[data-bead-index="${activeNodeIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeNodeIndex, viewMode]);

  const handleBeadClick = (bead: BeadInfo) => {
    // If clicking same node and it maps to multiple steps (like Crucifix which maps to 0 and 1)
    if (bead.nodeIndex === activeNodeIndex) {
      const mappedSteps = stepToNodeMap
        .map((n, idx) => (n === bead.nodeIndex ? idx : -1))
        .filter((idx) => idx !== -1);

      if (mappedSteps.length > 1) {
        const curIdx = mappedSteps.indexOf(currentStepIndex);
        const nextStep = mappedSteps[(curIdx + 1) % mappedSteps.length];
        onSelectStep(nextStep);
        return;
      }
    }
    onSelectStep(bead.mappedStepIndex);
  };

  // SVG closed bracelet loop coordinate calculations
  const svgWidth = 720;
  const svgHeight = 220;
  const cx = svgWidth / 2;
  const cy = svgHeight / 2 + 5;
  const rx = 300; // horizontal radius of bracelet loop
  const ry = 80;  // vertical radius of bracelet loop

  // 20 beads distributed evenly around an elegant oval loop
  const loopPositions = Array.from({ length: 20 }, (_, i) => {
    // Offset angle so Crucifix (i=0) sits at bottom center
    const angle = (Math.PI / 2) + (i * (2 * Math.PI / 20));
    const x = cx + rx * Math.cos(angle);
    const y = cy + ry * Math.sin(angle);
    return { x, y, angle };
  });

  // Closed SVG path for bracelet wire
  const loopPath = loopPositions.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z';

  return (
    <div
      id="rosary-strand-container"
      className="relative my-6 overflow-hidden rounded-3xl border border-[#3e3020] bg-[#1a1410] p-4 sm:p-6 shadow-2xl backdrop-blur-md"
    >
      {/* Header Bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#3e3020]/60 pb-3">
        <div>
          <div className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c6994f]">
            Rosary Bracelet View
          </div>
          <div className="mt-0.5 font-garamond text-base font-semibold text-[#e7c07f]">
            Active Bead: {activeBeadInfo.label} ({activeNodeIndex + 1}/20)
          </div>
        </div>

        {/* View Mode Switcher */}
        <div
          id="rosary-view-switcher"
          className="flex items-center gap-1 rounded-full border border-[#3e3020] bg-[#120e0b] p-1"
        >
          <button
            onClick={() => setViewMode('loop')}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs font-medium transition-all ${
              viewMode === 'loop'
                ? 'bg-[#c6994f] text-[#14100d] font-semibold shadow-md'
                : 'text-[#b8a892] hover:text-[#e7c07f]'
            }`}
          >
            <CircleDot className="h-3.5 w-3.5" />
            <span>Bracelet Loop</span>
          </button>
          <button
            onClick={() => setViewMode('track')}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs font-medium transition-all ${
              viewMode === 'track'
                ? 'bg-[#c6994f] text-[#14100d] font-semibold shadow-md'
                : 'text-[#b8a892] hover:text-[#e7c07f]'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Bead Track</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: ELEGANT BRACELET LOOP VIEW */}
      {viewMode === 'loop' ? (
        <div className="relative">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="block h-auto w-full touch-manipulation select-none"
          >
            {/* Bracelet Connecting Wire */}
            <path
              d={loopPath}
              fill="none"
              stroke={theme.link}
              strokeWidth="2.5"
              strokeDasharray="6 3"
            />

            {/* Render 20 Nodes along the loop */}
            {loopPositions.map((pos, idx) => {
              const bead = ALL_BEADS[idx];
              const isCurrent = idx === activeNodeIndex;
              const isDone = idx < activeNodeIndex;
              const color = theme[bead.type] || '#c6994f';

              return (
                <g
                  key={idx}
                  onClick={() => handleBeadClick(bead)}
                  className="cursor-pointer group"
                  role="button"
                  tabIndex={0}
                  aria-label={bead.label}
                >
                  {/* GENEROUS INVISIBLE TOUCH TARGET (50px) */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="25"
                    fill="white"
                    opacity="0.001"
                  />

                  {/* Active Pulse Glow Ring */}
                  {isCurrent && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="22"
                      className="animate-pulse-subtle fill-[#c6994f]/25 stroke-[#e7c07f]"
                      strokeWidth="2"
                    />
                  )}

                  {/* Hover Outer Ring */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="18"
                    className="fill-transparent stroke-[#c6994f]/0 transition-all group-hover:stroke-[#e7c07f]/80 group-hover:fill-[#c6994f]/20"
                    strokeWidth="1.5"
                  />

                  {/* Bead Visual Representation */}
                  <g
                    className={`transition-all duration-300 ${
                      isCurrent
                        ? 'scale-125 filter drop-shadow-[0_0_12px_rgba(231,192,127,1)]'
                        : isDone
                        ? 'opacity-85'
                        : 'opacity-45 group-hover:opacity-100 group-hover:scale-110'
                    }`}
                  >
                    {bead.type === 'crucifix' && (
                      <g>
                        <rect x={pos.x - 4} y={pos.y - 14} width="8" height="28" rx="2" fill={color} stroke="#120e0b" strokeWidth="1" />
                        <rect x={pos.x - 12} y={pos.y - 5} width="24" height="8" rx="2" fill={color} stroke="#120e0b" strokeWidth="1" />
                        <circle cx={pos.x} cy={pos.y - 1} r="2.5" fill="#120e0b" opacity="0.7" />
                      </g>
                    )}

                    {bead.type === 'paternoster' && (
                      <circle cx={pos.x} cy={pos.y} r="10" fill={color} stroke="#120e0b" strokeWidth="1.5" />
                    )}

                    {bead.type === 'medal' && (
                      <g>
                        <ellipse cx={pos.x} cy={pos.y} rx="12" ry="15" fill={color} stroke="#e7c07f" strokeWidth="1.5" />
                        {/* A figure, not a cross: the cross belongs on the crucifix only. */}
                        <circle cx={pos.x} cy={pos.y - 5} r="2.4" fill="#120e0b" opacity="0.85" />
                        <path
                          d={`M ${pos.x - 5} ${pos.y + 7} L ${pos.x} ${pos.y - 1} L ${pos.x + 5} ${pos.y + 7} Z`}
                          fill="#120e0b"
                          opacity="0.7"
                        />
                      </g>
                    )}

                    {bead.type === 'gloria' && (
                      <rect x={pos.x - 6} y={pos.y - 6} width="12" height="12" rx="2" fill={color} stroke="#120e0b" strokeWidth="1.5" transform={`rotate(45 ${pos.x} ${pos.y})`} />
                    )}

                    {bead.type === 'star' && (
                      <polygon points={getStarPoints(pos.x, pos.y, 11, 5, 5)} fill={color} stroke="#120e0b" strokeWidth="1" />
                    )}

                    {bead.type === 'ave' && (
                      <circle cx={pos.x} cy={pos.y} r="7" fill={color} stroke={isCurrent ? '#e7c07f' : '#120e0b'} strokeWidth={isCurrent ? '2' : '1'} />
                    )}
                  </g>

                  {/* Bead number badge overlay */}
                  {bead.type === 'ave' && (
                    <text
                      x={pos.x}
                      y={pos.y + 3.5}
                      textAnchor="middle"
                      fill={isCurrent ? '#14100d' : '#ede2d0'}
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                      className="pointer-events-none select-none"
                    >
                      {bead.shortLabel}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Quick Guidance Footer under Loop */}
          <div className="mt-1 flex items-center justify-between text-xs text-[#b8a892]/80">
            <span className="flex items-center gap-1.5 font-sans">
              <span className="inline-block h-2 w-2 rounded-full bg-[#e7c07f] shadow-sm animate-pulse" />
              <span>Current Bead: <strong className="text-[#e7c07f]">{activeBeadInfo.label}</strong></span>
            </span>
            <span className="font-sans italic">Tap any bead on the loop to jump</span>
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: TACTILE BEAD TRACK CAROUSEL */
        <div className="relative">
          {/* Scroll Nav Buttons */}
          <button
            onClick={() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
              }
            }}
            className="absolute -left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[#3e3020] bg-[#221a14] p-2 text-[#e7c07f] shadow-lg hover:border-[#c6994f]"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            onClick={() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
              }
            }}
            className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[#3e3020] bg-[#221a14] p-2 text-[#e7c07f] shadow-lg hover:border-[#c6994f]"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Horizontal Track Container */}
          <div
            ref={scrollContainerRef}
            className="no-scrollbar flex items-center gap-2.5 overflow-x-auto px-6 py-3 scroll-smooth"
          >
            {ALL_BEADS.map((bead, idx) => {
              const isCurrent = idx === activeNodeIndex;
              const isDone = idx < activeNodeIndex;

              return (
                <button
                  key={idx}
                  data-bead-index={idx}
                  onClick={() => handleBeadClick(bead)}
                  className={`flex flex-shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-300 min-w-[140px] text-left ${
                    isCurrent
                      ? 'border-[#e7c07f] bg-[#2c221a] text-[#e7c07f] shadow-xl ring-2 ring-[#e7c07f]/50 scale-105'
                      : isDone
                      ? 'border-[#3e3020]/80 bg-[#1e1711]/80 text-[#b8a892]'
                      : 'border-[#3e3020]/40 bg-[#120e0b]/60 text-[#857562] hover:border-[#c6994f]/50 hover:bg-[#1f1712]'
                  }`}
                >
                  {/* Badge / Status Icon */}
                  <div
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl font-bold ${
                      isCurrent
                        ? 'bg-[#c6994f] text-[#14100d] shadow-md'
                        : isDone
                        ? 'bg-[#3e3020] text-[#e7c07f]'
                        : 'bg-[#1a1410] text-[#857562] border border-[#3e3020]'
                    }`}
                  >
                    {isDone ? (
                      <Check className="h-4 w-4 stroke-[3]" />
                    ) : (
                      <span className="font-sans text-xs">{bead.shortLabel}</span>
                    )}
                  </div>

                  {/* Label & Description */}
                  <div className="overflow-hidden">
                    <div className="font-garamond text-sm font-bold leading-tight truncate">
                      {bead.label}
                    </div>
                    <div className="font-sans text-[10px] text-[#857562] truncate mt-0.5">
                      {bead.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

function getStarPoints(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  points: number
): string {
  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    const a = (Math.PI / points) * i - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(' ');
}
