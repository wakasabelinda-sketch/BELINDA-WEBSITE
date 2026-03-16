
import React from "react";

export default function CTASection() {
  // Simple navigation helper – falls back to a full page reload if a router isn’t available.
  const navigateTo = (path: string) => {
    try {
      // If a SPA router (e.g., react‑router) is present it will usually expose a global
      // navigation function. We attempt to call it safely.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (typeof window.REACT_APP_NAVIGATE === "function") {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.REACT_APP_NAVIGATE(path);
      } else {
        // Fallback to a classic navigation
        window.location.href = path;
      }
    } catch (error) {
      // Gracefully log the error without breaking the UI
      console.error("Navigation error:", error);
      // As a last resort, perform a hard navigation
      window.location.href = path;
    }
  };

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://readdy.ai/api/search-image?query=Modern%20elegant%20law%20office%20interior%20with%20wooden%20bookshelves%20filled%20with%20legal%20books%2C%20professional%20workspace%20with%20natural%20lighting%20streaming%20through%20large%20windows%2C%20sophisticated%20charcoal%20grey%20and%20gold%20accents%2C%20polished%20wooden%20desk%2C%20leather%20chairs%2C%20scales%20of%20justice%20symbol%2C%20warm%20ambient%20lighting%20creating%20professional%20atmosphere%2C%20high-end%20legal%20practice%20setting&width=1920&height=600&seq=cta-bg-charcoal-002&orientation=landscape')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-8">
        <h2 className="font-serif text-5xl lg:text-6xl font-bold text-white uppercase tracking-wider">
          Ready to Discuss Your Case?
        </h2>

        <div className="space-y-2">
          <p className="text-white text-xl lg:text-2xl font-light">
            Schedule a confidential consultation today
          </p>
          <p className="text-white text-xl lg:text-2xl font-light">
            Professional legal guidance you can trust
          </p>
        </div>

        <button
          onClick={() => navigateTo("/contact")}
          className="group inline-flex items-center gap-4 px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-gold rounded-full hover:bg-gold transition-all duration-300 cursor-pointer whitespace-nowrap"
        >
          <div className="w-12 h-12 bg-charcoal rounded-full flex items-center justify-center group-hover:bg-charcoal-dark transition-colors">
            <i className="ri-calendar-line text-white text-xl"></i>
          </div>
          <span className="text-white uppercase font-semibold text-base tracking-wide">
            Book Consultation
          </span>
          <i className="ri-arrow-right-up-line text-white text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
        </button>
      </div>
    </section>
  );
}
