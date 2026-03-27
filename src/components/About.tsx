import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Sprout, Users, MapPin, Award } from 'lucide-react';

function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { icon: Sprout, value: 7, suffix: '+', label: 'Acres of Farmland', color: 'text-green-400' },
  { icon: Users, value: 25, suffix: '+', label: 'Team Members', color: 'text-blue-400' },
  { icon: MapPin, value: 10, suffix: '+', label: 'Export Countries', color: 'text-gold' },
  { icon: Award, value: 3, suffix: '+', label: 'Years Experience', color: 'text-purple-400' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 sm:py-32 relative" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute top-40 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-gold text-sm tracking-[0.3em] uppercase font-semibold">About Us</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Rooted in <span className="gold-gradient">Indian Soil</span>,
              <br />Reaching Global Markets
            </h2>
            <p className="text-white-muted text-lg leading-relaxed mb-6">
              Vlaris Agro Exports is a proud Indian agriculture company with <strong className="text-white">7 acres of fertile farmland</strong> and a dedicated team of <strong className="text-white">25 hardworking professionals</strong>. We specialize in cultivating and exporting premium-quality onions and rice to international markets.
            </p>
            <p className="text-white-muted text-lg leading-relaxed mb-8">
              Our vision is built on <strong className="text-white">quality, trust, and transparency</strong>. From seed to shipment, every step is monitored to ensure our products meet the highest export standards. We believe in direct farm-to-buyer relationships, eliminating middlemen and delivering unmatched value.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Export Quality', 'Farm Fresh', 'Trusted Partner', 'Competitive Pricing'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-sm border border-gold/30 text-gold bg-gold/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass rounded-2xl p-6 text-center hover:border-gold/30 transition-all duration-500 group"
              >
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform`} />
                <p className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-white-muted mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
