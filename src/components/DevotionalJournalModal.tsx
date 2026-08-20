import React from 'react';
import { X, BookOpen, Trash2, Calendar, Heart, Download, FileText, FileCode } from 'lucide-react';
import { PrayerHistoryItem } from '../types';
import { MYSTERY_DATA } from '../data/mysteries';

interface DevotionalJournalModalProps {
  isOpen: boolean;
  history: PrayerHistoryItem[];
  streak: number;
  totalDecades: number;
  onClose: () => void;
  onClearHistory: () => void;
}

export const DevotionalJournalModal: React.FC<DevotionalJournalModalProps> = ({
  isOpen,
  history,
  streak,
  totalDecades,
  onClose,
  onClearHistory
}) => {
  if (!isOpen) return null;

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadMarkdown = () => {
    if (history.length === 0) return;

    const dateStr = new Date().toLocaleDateString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short'
    });

    const lines: string[] = [
      '# 🕊️ Devotional Prayer Journal — One Decade Rosary',
      '',
      `> **Exported:** ${dateStr}  `,
      `> **Current Streak:** ${streak} ${streak === 1 ? 'day' : 'days'} 🔥  `,
      `> **Total Decades Prayed:** ${totalDecades}  `,
      '',
      '---',
      '',
      '## Prayer History',
      ''
    ];

    history.forEach((item, index) => {
      const setData = MYSTERY_DATA[item.mysterySet];
      lines.push(`### ${index + 1}. ${item.mysteryTitle}`);
      lines.push(`- **Date:** ${item.date}`);
      lines.push(`- **Mystery Set:** ${setData?.label || item.mysterySet}`);
      if (item.intention) {
        lines.push(`- **Prayer Intention:** *"${item.intention}"*`);
      }
      lines.push('');
    });

    lines.push('---');
    lines.push('*Ad Majorem Dei Gloriam — To the Greater Glory of God*');

    downloadFile(
      lines.join('\n'),
      `rosary-devotional-journal-${new Date().toISOString().slice(0, 10)}.md`,
      'text/markdown'
    );
  };

  const handleDownloadPlainText = () => {
    if (history.length === 0) return;

    const lines: string[] = [
      '=====================================================',
      '      DEVOTIONAL PRAYER JOURNAL - ONE DECADE ROSARY',
      '=====================================================',
      `Export Date: ${new Date().toLocaleDateString('en-US', { dateStyle: 'full', timeStyle: 'short' })}`,
      `Current Daily Streak: ${streak} ${streak === 1 ? 'day' : 'days'}`,
      `Total Decades Prayed: ${totalDecades}`,
      '',
      '-----------------------------------------------------',
      '                   PRAYER LOGS',
      '-----------------------------------------------------',
      ''
    ];

    history.forEach((item, index) => {
      const setData = MYSTERY_DATA[item.mysterySet];
      lines.push(`[${index + 1}] Date:        ${item.date}`);
      lines.push(`    Mystery Set: ${setData?.label || item.mysterySet}`);
      lines.push(`    Decade:      ${item.mysteryTitle}`);
      if (item.intention) {
        lines.push(`    Intention:   "${item.intention}"`);
      }
      lines.push('-----------------------------------------------------');
    });

    lines.push('');
    lines.push('Ad Majorem Dei Gloriam — To the Greater Glory of God');

    downloadFile(
      lines.join('\n'),
      `rosary-devotional-journal-${new Date().toISOString().slice(0, 10)}.txt`,
      'text/plain'
    );
  };

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

        {/* Modal Title */}
        <div className="mb-6 flex items-center gap-3 border-b border-[#3e3020] pb-4">
          <BookOpen className="h-6 w-6 text-[#c6994f]" />
          <div>
            <h2 className="font-cinzel text-xl font-semibold text-[#e7c07f]">
              Devotional Prayer Journal
            </h2>
            <p className="font-sans text-xs text-[#857562]">
              A quiet record of your decades prayed
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[#3e3020] bg-[#1a1410] p-4 text-center">
            <div className="font-sans text-[10px] font-semibold uppercase tracking-wider text-[#857562]">
              Current Streak
            </div>
            <div className="mt-1 font-cinzel text-2xl font-bold text-[#e7c07f]">
              🔥 {streak} {streak === 1 ? 'day' : 'days'}
            </div>
          </div>
          <div className="rounded-2xl border border-[#3e3020] bg-[#1a1410] p-4 text-center">
            <div className="font-sans text-[10px] font-semibold uppercase tracking-wider text-[#857562]">
              Decades Prayed
            </div>
            <div className="mt-1 font-cinzel text-2xl font-bold text-[#e7c07f]">
              🕊️ {totalDecades}
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="max-h-64 overflow-y-auto space-y-2.5 pr-1">
          {history.length === 0 ? (
            <div className="py-8 text-center font-crimson italic text-[#857562]">
              No prayer decades recorded yet. Complete a decade to log it here.
            </div>
          ) : (
            history.map((item) => {
              const setData = MYSTERY_DATA[item.mysterySet];
              return (
                <div
                  key={item.id}
                  className="rounded-xl border border-[#3e3020]/60 bg-[#1a1410]/80 p-3.5"
                >
                  <div className="flex items-center justify-between text-xs text-[#857562]">
                    <span className="flex items-center gap-1 font-sans">
                      <Calendar className="h-3 w-3 text-[#c6994f]" />
                      {item.date}
                    </span>
                    <span className="font-sans font-semibold uppercase tracking-wider text-[#c6994f]">
                      {setData?.label}
                    </span>
                  </div>

                  <div className="mt-1 font-garamond text-base font-semibold text-[#e7c07f]">
                    {item.mysteryTitle}
                  </div>

                  {item.intention && (
                    <div className="mt-1 flex items-center gap-1.5 font-crimson text-xs italic text-[#b8a892]">
                      <Heart className="h-3 w-3 text-[#8a2b3d] flex-shrink-0" />
                      <span>Intention: "{item.intention}"</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#3e3020] pt-4">
          <div className="flex flex-wrap items-center gap-2">
            {history.length > 0 && (
              <>
                <button
                  onClick={handleDownloadMarkdown}
                  className="flex items-center gap-1.5 rounded-xl border border-[#3e3020] bg-[#1a1410] px-3 py-1.5 font-sans text-xs text-[#e7c07f] transition-all hover:border-[#c6994f] hover:bg-[#2c221a]"
                  title="Download prayer history as formatted Markdown (.md) for Obsidian, Notion, or Notes"
                >
                  <FileCode className="h-3.5 w-3.5 text-[#c6994f]" />
                  <span>Download .md</span>
                </button>

                <button
                  onClick={handleDownloadPlainText}
                  className="flex items-center gap-1.5 rounded-xl border border-[#3e3020] bg-[#1a1410] px-3 py-1.5 font-sans text-xs text-[#c6994f] transition-all hover:border-[#c6994f] hover:bg-[#2c221a]"
                  title="Download prayer history as plain text (.txt)"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Download .txt</span>
                </button>

                <button
                  onClick={onClearHistory}
                  className="flex items-center gap-1.5 font-sans text-xs text-[#8a2b3d] hover:underline ml-1"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Clear</span>
                </button>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-[#c6994f] bg-[#c6994f] px-5 py-2 font-sans text-xs font-semibold text-[#14100d] hover:bg-[#e7c07f] transition-colors"
          >
            Close Journal
          </button>
        </div>
      </div>
    </div>
  );
};
