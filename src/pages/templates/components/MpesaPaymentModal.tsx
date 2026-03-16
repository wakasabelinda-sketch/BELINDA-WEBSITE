
import { useState } from 'react';

interface Template {
  id: string;
  title: string;
  price_kes: number;
  file_url: string;
}

interface MpesaPaymentModalProps {
  template: Template;
  onClose: () => void;
}

export default function MpesaPaymentModal({ template, onClose }: MpesaPaymentModalProps) {
  const [copied, setCopied] = useState<'phone' | 'email' | null>(null);

  const copyToClipboard = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi Belinda, I would like to purchase the template: "${template.title}" (KES ${template.price_kes}). I will send the M-Pesa payment and share the transaction code with you.`
    );
    window.open(`https://wa.me/254758913512?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Template Purchase Request: ${template.title}`);
    const body = encodeURIComponent(
      `Hi Belinda,\n\nI would like to purchase the following template:\n\nTemplate: ${template.title}\nPrice: KES ${template.price_kes}\n\nI will send the M-Pesa payment to your Pochi La Biashara (0758913512) and share the transaction code with you.\n\nThank you.`
    );
    window.open(`mailto:belindawakasa@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-charcoal-dark to-charcoal px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-green-500 rounded-full">
                <i className="ri-smartphone-line text-white text-lg"></i>
              </div>
              <div>
                <h3 className="text-white font-semibold text-base">Purchase Template</h3>
                <p className="text-white/60 text-xs">M-Pesa Payment Instructions</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer">
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Template Info */}
          <div className="flex items-center gap-4 p-4 bg-cream rounded-xl mb-6">
            <div className="w-12 h-12 flex items-center justify-center bg-charcoal-dark/10 rounded-lg shrink-0">
              <i className="ri-file-text-line text-2xl text-charcoal-dark"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-charcoal-dark truncate">{template.title}</p>
              <p className="text-xs text-charcoal/60">Legal Document Template</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg font-bold text-green-600">KES {template.price_kes}</p>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-gold/10 rounded-full shrink-0 mt-0.5">
                <span className="text-sm font-bold text-gold">1</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-charcoal-dark mb-2">Send M-Pesa Payment</h4>
                <p className="text-xs text-charcoal/60 mb-3">
                  Send <strong className="text-green-600">KES {template.price_kes}</strong> to Belinda's Pochi La Biashara:
                </p>
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <i className="ri-smartphone-line text-green-600"></i>
                  <span className="text-sm font-bold text-green-700 flex-1">0758913512</span>
                  <button
                    onClick={() => copyToClipboard('0758913512', 'phone')}
                    className="px-3 py-1.5 bg-white border border-green-300 rounded-md text-xs font-medium text-green-700 hover:bg-green-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {copied === 'phone' ? (
                      <>
                        <i className="ri-check-line"></i> Copied
                      </>
                    ) : (
                      <>
                        <i className="ri-file-copy-line"></i> Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-gold/10 rounded-full shrink-0 mt-0.5">
                <span className="text-sm font-bold text-gold">2</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-charcoal-dark mb-2">Request Your Document</h4>
                <p className="text-xs text-charcoal/60 mb-3">
                  Contact Belinda via WhatsApp or email with your M-Pesa transaction code to receive your template:
                </p>
                
                {/* WhatsApp Button */}
                <button
                  onClick={handleWhatsApp}
                  className="w-full mb-2 px-4 py-3 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <i className="ri-whatsapp-line text-lg"></i>
                  <span>Message on WhatsApp</span>
                </button>

                {/* Email Button */}
                <button
                  onClick={handleEmail}
                  className="w-full px-4 py-3 bg-charcoal-dark text-white rounded-lg text-sm font-semibold hover:bg-gold hover:text-charcoal-dark transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <i className="ri-mail-line text-lg"></i>
                  <span>Send Email Request</span>
                </button>

                {/* Email Display */}
                <div className="flex items-center gap-2 p-3 bg-cream border border-charcoal/10 rounded-lg mt-3">
                  <i className="ri-mail-line text-charcoal/60"></i>
                  <span className="text-xs text-charcoal/70 flex-1">belindawakasa@gmail.com</span>
                  <button
                    onClick={() => copyToClipboard('belindawakasa@gmail.com', 'email')}
                    className="px-2 py-1 text-xs text-charcoal/60 hover:text-charcoal transition-colors cursor-pointer"
                  >
                    {copied === 'email' ? (
                      <i className="ri-check-line"></i>
                    ) : (
                      <i className="ri-file-copy-line"></i>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <i className="ri-information-line text-blue-600 text-lg shrink-0 mt-0.5"></i>
            <div>
              <p className="text-xs text-blue-900 leading-relaxed">
                <strong>Important:</strong> Please include your M-Pesa transaction code when contacting Belinda. You will receive your template document within a few hours during business hours.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-cream/50 border-t border-charcoal/5">
          <div className="flex items-center justify-center gap-2 text-xs text-charcoal/40">
            <i className="ri-shield-check-line"></i>
            <span>Secure M-Pesa Payment &bull; Pochi La Biashara</span>
          </div>
        </div>
      </div>
    </div>
  );
}
