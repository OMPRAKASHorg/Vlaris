import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Leaf, Link2Off, Package, BadgeDollarSign, Clock } from 'lucide-react';

const reasons = [
  {
    icon: Leaf,
    title: 'Farm Fresh Quality',
    description: 'Produce harvested at peak freshness from our own 7-acre farmland, ensuring the highest nutritional value and taste.',
  },
  {
    icon: Link2Off,
    title: 'Direct Supply',
    description: 'No middlemen involved. We connect directly from our farm to your doorstep, ensuring transparency at every step.',
  },
  {
    icon: Package,
    title: 'Export-Grade Packaging',
    description: 'State-of-the-art packaging that meets international standards, ensuring products arrive fresh and intact.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Competitive Pricing',
    description: 'Direct farm sourcing means better prices for you without compromising on quality or service.',
  },
  {
    icon: Clock,
    title: 'Reliable Delivery',
    description: 'Trusted logistics partners and streamlined processes ensure your orders reach on time, every time.',
  },
];

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="why-us" className="py-24 sm:py-32 relative" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.03)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-semibold">Why Choose Us</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4" style={{ fontFamily: 'var(--font-heading)' }}>
            The <span className="gold-gradient">Vlaris Advantage</span>
          </h2>
          <p className="text-white-muted text-lg mt-4 max-w-2xl mx-auto">
            What sets us apart in the global agriculture export industry
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
              className={`glass rounded-2xl p-6 sm:p-8 hover:border-gold/40 transition-all duration-500 group ${
                i === 4 ? 'sm:col-span-2 lg:col-span-1 lg:col-start-2' : ''
              }`}
            >
              <div className="w-14 h-14 rounded-xl gold-gradient-bg flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <reason.icon className="w-7 h-7 text-dark" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                {reason.title}
              </h3>
              <p className="text-white-muted leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
