import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Exports', href: '#exports' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? 'glass py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button onClick={() => handleClick('#hero')} className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full gold-gradient-bg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-dark font-bold text-lg" style={{ fontFamily: 'var(--font-heading)' }}>V</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold tracking-wider text-white">VLARIS</p>
              <p className="text-[10px] tracking-[0.2em] text-gold/70 uppercase">Agro Exports</p>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleClick(link.href)}
                className="px-3 py-2 text-sm text-white-muted hover:text-gold transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+919512195435"
              className="hidden md:flex items-center gap-2 px-4 py-2 border border-gold/40 rounded-full text-gold text-sm hover:bg-gold hover:text-dark transition-all duration-300"
            >
              <Phone size={14} />
              <span>+91 9512195435</span>
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-gold"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[99] bg-dark/98 backdrop-blur-xl flex flex-col items-center justify-center gap-1 pt-20"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleClick(link.href)}
                className="text-2xl text-white-muted hover:text-gold transition-colors py-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              href="tel:+919512195435"
              className="mt-6 flex items-center gap-2 px-6 py-3 gold-gradient-bg rounded-full text-dark font-semibold"
            >
              <Phone size={16} />
              +91 9512195435
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
