
import { useState } from 'react';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  // Validate phone number format (basic check)
  const rawPhoneNumber = '254758913512';
  const phoneNumber = /^\d+$/.test(rawPhoneNumber) ? rawPhoneNumber : null;

  // Encode message safely
  const rawMessage =
    'Hello Belinda, I would like to make a general inquiry about your legal services.';
  const message = encodeURIComponent(rawMessage);

  // Build WhatsApp URL only when we have a valid phone number
  const whatsappUrl = phoneNumber
    ? `https://wa.me/${phoneNumber}?text=${message}`
    : '#';

  // Click handler that prevents navigation when the phone number is invalid
  const handleClick = (e) => {
    if (!phoneNumber) {
      e.preventDefault();
      console.warn('Invalid phone number for WhatsApp link.');
      // You could also show a user‑friendly toast/alert here
    }
  };

  return (
    <a
      href={whatsappUrl}
      onClick={handleClick}
      target="_blank"
      rel="nofollow noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 cursor-pointer group"
      aria-label="Chat on WhatsApp"
    >
      {/* Tooltip */}
      <div
        className={`px-4 py-2.5 bg-white rounded-lg shadow-lg border border-gray-100 transition-all duration-300 whitespace-nowrap ${
          isHovered
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        <p className="text-sm font-medium text-gray-800">Chat with us</p>
        <p className="text-xs text-gray-500">We typically reply instantly</p>
      </div>

      {/* Button */}
      <div className="relative">
        {/* Pulse ring */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>

        <div className="relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-110 transition-all duration-300">
          <i className="ri-whatsapp-line text-white text-2xl"></i>
        </div>
      </div>
    </a>
  );
}
