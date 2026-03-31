import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  country: string;
  flag: string;
  rating: number;
  review: string;
}

export default function Testimonials() {
  const ref = useRef(null);
const inView = useInView(ref, { once: true });
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  fetch('/api/testimonials')
    .then(res => res.json())
    .then(data => setTestimonials(Array.isArray(data) ? data : []))
    .catch(() => setTestimonials([]))
    .finally(() => setLoading(false));
}, []);
  return (
    <section id="testimonials" className="py-24 sm:py-32 relative" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute top-40 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-semibold">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Trusted by <span className="gold-gradient">Global Buyers</span>
          </h2>
          <p className="text-white-muted text-lg mt-4 max-w-2xl mx-auto">
            What our international partners say about working with Vlaris Agro Exports
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass rounded-2xl h-64 animate-pulse shimmer" />
            ))}
          </div>
        ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {Array.isArray(testimonials) ? (
    testimonials.map((t, i) => (
      <motion.div
        key={t.id}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 + i * 0.1 }}
        className="glass rounded-2xl p-6"
      >
        <p>{t.review}</p>
        <p>{t.name}</p>
      </motion.div>
    ))
  ) : (
    <p className="text-white">No testimonials</p>
  )}
</div>
              )}
      </div>
   </div>
    </section>
  );
}
