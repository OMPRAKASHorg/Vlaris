import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, Ship, Plane, FileCheck } from 'lucide-react';

const exportCountries = [
  { name: 'UAE', flag: '🇦🇪' },
  { name: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'Qatar', flag: '🇶🇦' },
  { name: 'Kuwait', flag: '🇰🇼' },
  { name: 'Oman', flag: '🇴🇲' },
  { name: 'Bahrain', flag: '🇧🇭' },
  { name: 'Malaysia', flag: '🇲🇾' },
  { name: 'Singapore', flag: '🇸🇬' },
  { name: 'Bangladesh', flag: '🇧🇩' },
  { name: 'Sri Lanka', flag: '🇱🇰' },
  { name: 'UK', flag: '🇬🇧' },
  { name: 'USA', flag: '🇺🇸' },
];

const logistics = [
  { icon: FileCheck, title: 'Documentation', desc: 'Complete export documentation & compliance' },
  { icon: Ship, title: 'Sea Freight', desc: 'Cost-effective bulk shipping worldwide' },
  { icon: Plane, title: 'Air Freight', desc: 'Express delivery for urgent orders' },
  { icon: Globe, title: 'Global Network', desc: 'Trusted logistics partners worldwide' },
];

export default function Exports() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="exports" className="py-24 sm:py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Background Globe */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
        <div className="w-[800px] h-[800px] rounded-full border-2 border-gold" />
        <div className="absolute w-[600px] h-[600px] rounded-full border border-gold" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-gold" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-semibold">Global Reach</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Exporting <span className="gold-gradient">Across the Globe</span>
          </h2>
          <p className="text-white-muted text-lg mt-4 max-w-2xl mx-auto">
            Trusted by buyers in over 10 countries with reliable shipping & logistics
          </p>
        </motion.div>

        {/* Export Countries Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-8 sm:p-12 mb-12"
        >
          <h3 className="text-xl font-bold mb-8 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
            <Globe className="inline w-5 h-5 text-gold mr-2 mb-1" />
            Our Export Destinations
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {exportCountries.map((country, i) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="glass-light rounded-xl p-4 text-center hover:bg-gold/10 hover:border-gold/30 transition-all duration-300 cursor-default group"
              >
                <span className="text-3xl block mb-2 group-hover:scale-125 transition-transform duration-300">{country.flag}</span>
                <span className="text-sm text-white-muted group-hover:text-gold transition-colors">{country.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Logistics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {logistics.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="glass rounded-2xl p-6 text-center hover:border-gold/30 transition-all duration-500 group"
            >
              <item.icon className="w-10 h-10 text-gold mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-lg mb-2">{item.title}</h4>
              <p className="text-sm text-white-muted">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
