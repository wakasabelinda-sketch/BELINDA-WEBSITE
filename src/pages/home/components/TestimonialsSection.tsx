
export default function TestimonialsSection() {
  const testimonials = [
    {
      text: 'Belinda provided exceptional legal guidance during our property acquisition. Her attention to detail and professionalism made the entire process seamless. Highly recommended for anyone seeking reliable legal representation in Kenya.',
      name: 'James Mwangi',
      platform: 'Google Reviews',
    },
    {
      text: 'Working with Belinda on our corporate restructuring was a game-changer. She demonstrated deep knowledge of Kenyan corporate law and delivered practical solutions that exceeded our expectations.',
      name: 'Sarah Njeri',
      platform: 'Google Reviews',
    },
    {
      text: 'I engaged Belinda for estate planning services, and her compassionate yet thorough approach gave me peace of mind. She explained complex legal matters in simple terms and ensured everything was properly documented.',
      name: 'David Omondi',
      platform: 'Google Reviews',
    },
  ];

  return (
    <section className="bg-cream py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-gold rounded-full"></div>
            <span className="text-charcoal-dark text-sm font-medium uppercase tracking-widest">
              Client Testimonials
            </span>
          </div>
          <div className="relative">
            <div className="absolute -top-8 -left-4 text-charcoal/20 text-9xl font-serif leading-none select-none">
              &ldquo;
            </div>
            <h2 className="relative font-serif text-5xl lg:text-6xl font-bold text-charcoal-dark max-w-3xl">
              What Clients Say About Working With Us
            </h2>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-12 border border-gray-100 hover:border-charcoal/50 hover:shadow-lg transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-gold text-xl"></i>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="font-serif text-lg text-gray-700 italic leading-relaxed mb-8">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Client Info */}
              <div>
                <p className="font-sans font-bold text-charcoal-dark text-lg mb-2">
                  {testimonial.name}
                </p>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-gold text-base"></i>
                  <span className="text-gray-500 text-sm">{testimonial.platform}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
