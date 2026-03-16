
import { useNavigate } from "react-router-dom";

export default function BioSection() {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    // Guard against unexpected failures
    try {
      if (typeof navigate === "function") {
        navigate("/about");
      } else {
        console.error("Navigation function is not available.");
      }
    } catch (err) {
      console.error("Failed to navigate:", err);
    }
  };

  return (
    <section className="bg-white py-32 px-6 lg:px-12 border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="w-16 h-1 bg-gradient-to-r from-gold to-charcoal"></div>
            <h2 className="font-serif text-5xl font-bold text-charcoal-dark">
              About Belinda
            </h2>
            <div className="text-charcoal/20 text-9xl font-serif leading-none select-none">
              &ldquo;
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-3 space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong className="text-charcoal-dark">Belinda Wakasa</strong> is a
              distinguished{" "}
              <strong className="text-charcoal-dark">
                Advocate of the High Court of Kenya
              </strong>{" "}
              currently practicing at{" "}
              <strong className="text-charcoal-dark">
                Daniel and Kenneth Advocates
              </strong>. With extensive experience in providing
              comprehensive legal services across multiple practice areas, she
              has built a reputation for delivering strategic, ethical, and
              results-driven legal representation to individuals and businesses
              throughout Kenya.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Based in{" "}
              <strong className="text-charcoal-dark">Nairobi</strong>, Belinda
              specializes in{" "}
              <strong className="text-charcoal-dark">
                Conveyancing &amp; Property Law
              </strong>
              ,{" "}
              <strong className="text-charcoal-dark">
                Commercial &amp; Corporate Law
              </strong>
              ,{" "}
              <strong className="text-charcoal-dark">Civil Litigation</strong>
              ,{" "}
              <strong className="text-charcoal-dark">
                Succession &amp; Estate Planning
              </strong>
              , and{" "}
              <strong className="text-charcoal-dark">
                Contract Drafting &amp; Review
              </strong>
              . Her approach combines meticulous attention to detail with a
              thorough understanding of Kenyan legal frameworks, ensuring
              clients receive practical and effective legal solutions.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Belinda&apos;s practice is built on the pillars of integrity,
              professionalism, and excellence. She believes in empowering her
              clients through clear communication and personalized legal
              strategies that address their unique needs and objectives. Whether
              navigating complex property transactions, resolving commercial
              disputes, or planning for the future, Belinda provides trusted
              counsel every step of the way.
            </p>

            <button
              onClick={handleLearnMore}
              className="inline-flex items-center gap-2 text-charcoal font-semibold text-base hover:gap-4 hover:text-gold transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              Learn More <i className="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
