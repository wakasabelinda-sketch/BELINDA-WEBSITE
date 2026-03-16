
import { useState } from 'react';

interface Template {
  id: string;
  title: string;
  description: string;
  price_kes: number;
  preview_text?: string;
}

interface TemplatePreviewModalProps {
  template: Template;
  onClose: () => void;
  onPurchase: () => void;
}

const DEFAULT_PREVIEW_LINES = [
  'IN THE HIGH COURT OF KENYA AT NAIROBI',
  'CIVIL CASE NO. _______ OF 2024',
  '',
  'BETWEEN',
  '',
  '_________________________ .......................... PLAINTIFF/APPLICANT',
  '',
  'AND',
  '',
  '_________________________ .......................... DEFENDANT/RESPONDENT',
  '',
  '═══════════════════════════════════════════',
  '',
  'APPLICATION FOR USE INTERFACE LOGS',
  '',
  '═══════════════════════════════════════════',
  '',
  'TAKE NOTICE that the Plaintiff/Applicant herein shall on the _____ day',
  'of _____________ 2024 at _____ O\'clock or so soon thereafter as Counsel',
  'for the Applicant may be heard, move this Honourable Court for orders:',
  '',
  '1. THAT the Honourable Court be pleased to grant the Applicant leave',
  '   to amend the Plaint dated _____________ filed herein on _________.',
  '',
  '2. THAT the costs of and incidental to this application be provided',
  '   for in the amended proceedings.',
  '',
  '3. THAT such further or other relief as this Honourable Court may',
  '   deem fit and just be granted.',
  '',
  'THE APPLICATION is based on the following grounds:',
  '',
  'a) The Applicant has discovered new material facts that are',
  '   necessary for the just determination of the real matters',
  '   in controversy between the parties.',
  '',
  'b) The proposed amendments are necessary to determine the real',
  '   questions in controversy between the parties.',
  '',
  'c) The amendments sought will not occasion any prejudice or',
  '   injustice to the Respondent that cannot be compensated',
  '   by way of costs.',
  '',
  'd) The application is made in good faith and at the earliest',
  '   opportunity available to the Applicant.',
  '',
  'THE APPLICATION is supported by the annexed Affidavit of',
  '_________________________ sworn on the _____ day of _____________',
  '2024 and the documents exhibited thereto.',
  '',
  'DATED at NAIROBI this _____ day of _____________ 2024.',
  '',
  '',
  '________________________',
  'ADVOCATES FOR THE APPLICANT',
];

export default function TemplatePreviewModal({
  template,
  onClose,
  onPurchase,
}: TemplatePreviewModalProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  const previewLines = template.preview_text
    ? template.preview_text.split('\n')
    : DEFAULT_PREVIEW_LINES;

  const visibleCount = Math.min(Math.ceil(previewLines.length * 0.4), 20);
  const visibleLines = previewLines.slice(0, visibleCount);
  const blurredLines = previewLines.slice(visibleCount);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 10);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div
          className={`px-6 py-4 border-b border-charcoal/10 flex items-center justify-between shrink-0 transition-shadow duration-300 ${
            isScrolled ? 'shadow-md' : ''
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 flex items-center justify-center bg-gold/10 rounded-lg shrink-0">
              <i className="ri-file-text-line text-xl text-gold"></i>
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-serif font-semibold text-charcoal-dark truncate">
                {template.title}
              </h3>
              <p className="text-xs text-charcoal/50">Document Preview</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-charcoal/40 hover:text-charcoal-dark hover:bg-charcoal/5 rounded-lg transition-colors cursor-pointer shrink-0 ml-3"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Document Preview Area */}
        <div className="flex-1 overflow-y-auto relative" onScroll={handleScroll}>
          {/* Paper-like document */}
          <div className="mx-4 my-6 sm:mx-8 bg-white border border-charcoal/10 rounded-lg shadow-sm">
            {/* Document header bar */}
            <div className="px-6 py-3 bg-cream/80 border-b border-charcoal/5 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-300"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
              <div className="w-3 h-3 rounded-full bg-green-300"></div>
              <span className="ml-2 text-[10px] text-charcoal/40 font-mono truncate">
                {template.title}.docx
              </span>
            </div>

            {/* Visible content */}
            <div className="px-6 sm:px-10 pt-8 pb-0 font-mono text-[13px] leading-6 text-charcoal-dark">
              {visibleLines.map((line, i) => (
                <div
                  key={`visible-${i}`}
                  className={`min-h-[24px] ${line.includes('═') ? 'text-charcoal/30' : ''} ${
                    line === line.toUpperCase() && line.trim().length > 3 ? 'font-semibold text-center' : ''
                  }`}
                >
                  {line || '\u00A0'}
                </div>
              ))}
            </div>

            {/* Blurred content with gradient overlay */}
            <div className="relative px-6 sm:px-10 pb-8">
              <div
                className="font-mono text-[13px] leading-6 text-charcoal-dark select-none"
                style={{ filter: 'blur(4px)', WebkitFilter: 'blur(4px)' }}
              >
                {blurredLines.map((line, i) => (
                  <div
                    key={`blur-${i}`}
                    className={`min-h-[24px] ${
                      line === line.toUpperCase() && line.trim().length > 3 ? 'font-semibold text-center' : ''
                    }`}
                  >
                    {line || '\u00A0'}
                  </div>
                ))}
              </div>

              {/* Gradient overlay on blurred section */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white pointer-events-none"></div>

              {/* Unlock CTA overlay */}
              <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center px-4">
                <div className="w-14 h-14 flex items-center justify-center bg-charcoal-dark rounded-full mb-3 shadow-lg">
                  <i className="ri-lock-line text-2xl text-gold"></i>
                </div>
                <p className="text-sm font-semibold text-charcoal-dark mb-1">Full document is locked</p>
                <p className="text-xs text-charcoal/60 mb-4 text-center max-w-xs">
                  Purchase this template to access the complete document in editable DOCX format
                </p>
                <button
                  onClick={onPurchase}
                  className="px-8 py-3 bg-charcoal-dark text-white rounded-lg font-semibold text-sm hover:bg-gold hover:text-charcoal-dark transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2 shadow-lg"
                >
                  <span>Purchase for KES {template.price_kes}</span>
                  <i className="ri-arrow-right-line"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-cream/50 border-t border-charcoal/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-charcoal/40">
            <i className="ri-eye-line"></i>
            <span>Preview Only &bull; Partial Content Shown</span>
          </div>
          <button
            onClick={onPurchase}
            className="px-4 py-2 bg-gold text-charcoal-dark rounded-lg text-xs font-semibold hover:bg-gold-dark transition-colors cursor-pointer whitespace-nowrap"
          >
            Get Full Template
          </button>
        </div>
      </div>
    </div>
  );
}
