
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://readdy.ai/api/search-image?query=Elegant%20abstract%20dark%20charcoal%20grey%20textured%20background%20with%20subtle%20golden%20light%20streaks%20and%20bokeh%2C%20sophisticated%20moody%20atmosphere%20with%20warm%20gold%20accents%20on%20dark%20grey%20surface%2C%20luxury%20minimalist%20aesthetic%2C%20soft%20golden%20particles%20floating%20in%20dark%20smoky%20environment%2C%20professional%20premium%20feel%20with%20charcoal%20tones%20and%20amber%20gold%20highlights%2C%20artistic%20abstract%20wallpaper&width=1920&height=1080&seq=hero-bg-charcoal-gold-001&orientation=landscape')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      </div>

      {/* Animated Background Elements */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-30px) translateX(15px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-40px) translateX(5px); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(20px) translateX(-20px); }
          50% { transform: translateY(-15px) translateX(10px); }
          75% { transform: translateY(25px) translateX(-5px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.15); opacity: 0.05; }
          100% { transform: scale(1); opacity: 0.15; }
        }
        @keyframes drift-up {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-20vh) scale(1); opacity: 0; }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.08; transform: scale(1); }
          50% { opacity: 0.18; transform: scale(1.1); }
        }
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* Pulsing Rings */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-16 right-16 w-96 h-96 border border-gold/15 rounded-full"
          style={{ animation: "pulse-ring 6s ease-in-out infinite" }}
        />
        <div
          className="absolute top-16 right-16 w-96 h-96 border border-gold/8 rounded-full"
          style={{ animation: "pulse-ring 6s ease-in-out infinite 1s" }}
        />
        <div
          className="absolute bottom-24 left-16 w-72 h-72 border border-white/10 rounded-full"
          style={{ animation: "pulse-ring 8s ease-in-out infinite 2s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-48 h-48 border border-gold/8 rounded-full"
          style={{ animation: "pulse-ring 7s ease-in-out infinite 1.5s" }}
        />
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-gold/8 rounded-full blur-3xl"
          style={{ animation: "float-slow 12s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-charcoal/20 rounded-full blur-3xl"
          style={{ animation: "float-reverse 14s ease-in-out infinite" }}
        />
        <div
          className="absolute top-1/3 left-2/3 w-48 h-48 bg-gold/5 rounded-full blur-2xl"
          style={{ animation: "glow-pulse 5s ease-in-out infinite 1s" }}
        />
      </div>

      {/* Rising Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${3 + (i % 4) * 2}px`,
              height: `${3 + (i % 4) * 2}px`,
              left: `${8 + i * 7.5}%`,
              backgroundColor:
                i % 3 === 0 ? "rgba(198,168,91,0.4)" : "rgba(255,255,255,0.15)",
              animation: `drift-up ${10 + (i % 5) * 3}s linear infinite`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}
      </div>

      {/* Slow Rotating Accent */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div
          className="w-[600px] h-[600px] border border-dashed border-gold/5 rounded-full"
          style={{ animation: "rotate-slow 60s linear infinite" }}
        />
        <div
          className="absolute w-[400px] h-[400px] border border-dashed border-white/5 rounded-full"
          style={{ animation: "rotate-slow 45s linear infinite reverse" }}
        />
      </div>

      {/* Shimmer Line */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(198,168,91,0.3), transparent)",
          backgroundSize: "200% 100%",
          animation: "shimmer 4s linear infinite",
        }}
      />

      <div className="relative z-10 w-full px-6 lg:px-12 py-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-gold/30 rounded-full">
              <span className="text-gold text-xs font-medium tracking-wide">
                Advocate of the High Court of Kenya
              </span>
            </div>

            <h1 className="font-serif text-6xl lg:text-7xl font-bold text-white leading-tight tracking-wide">
              Belinda Wakasa
            </h1>

            <p className="text-xl lg:text-2xl text-white/85 leading-relaxed max-w-xl">
              Providing Strategic, Ethical, and Results-Driven Legal Representation
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => {
                  if (typeof window !== "undefined" && typeof window.location !== "undefined") {
                    window.location.href = "/contact";
                  }
                }}
                className="px-8 py-4 bg-gold text-charcoal-dark rounded-lg font-semibold text-base hover:scale-105 hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Book Consultation
              </button>
              <button
                onClick={() => {
                  if (typeof window !== "undefined" && typeof window.location !== "undefined") {
                    window.location.href = "/services";
                  }
                }}
                className="px-8 py-4 border-2 border-white/30 text-white rounded-lg font-semibold text-base hover:bg-white/10 hover:border-white/50 transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Our Services
              </button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gold/15 rounded-2xl blur-2xl"></div>
              <div className="absolute -inset-1 bg-gradient-to-br from-gold/20 to-transparent rounded-2xl"></div>
              <img
                src="https://static.readdy.ai/image/b92b61a178bbadc2f7e64b37b3c92766/6d13cf5d6318d9344aded042172edd3c.jpeg"
                alt="Belinda Wakasa - Advocate of the High Court of Kenya"
                title="Belinda Wakasa - Advocate of the High Court of Kenya"
                className="relative w-full max-w-md rounded-2xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <i className="ri-arrow-down-line text-gold text-3xl"></i>
      </div>
    </section>
  );
}
