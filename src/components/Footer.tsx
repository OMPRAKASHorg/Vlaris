import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full gold-gradient-bg flex items-center justify-center">
                <span className="text-dark font-bold text-lg" style={{ fontFamily: 'var(--font-heading)' }}>V</span>
              </div>
              <div>
                <p className="text-sm font-semibold tracking-wider">VLARIS</p>
                <p className="text-[10px] tracking-[0.2em] text-gold/70 uppercase">Agro Exports</p>
              </div>
            </div>
            <p className="text-white-muted text-sm leading-relaxed">
              Premium Indian agriculture exports. From our farms to global markets with quality and trust.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gold text-sm tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Products', 'Why Us', 'Gallery', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-white-muted hover:text-gold transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4 text-gold text-sm tracking-wider uppercase">Products</h4>
            <ul className="space-y-2">
              {['Red Onions', 'White Onions', 'Basmati Rice', 'Non-Basmati Rice', 'Sapodilla (Chikoo)', 'Seasonal Crops'].map((item) => (
                <li key={item}>
                  <span className="text-sm text-white-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-gold text-sm tracking-wider uppercase">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white-muted">
                <Phone size={14} className="text-gold flex-shrink-0" />
                <a href="tel:+919512195435" className="hover:text-gold transition-colors">+91 9512195435</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white-muted">
                <Mail size={14} className="text-gold flex-shrink-0" />
                <a href="mailto:dkdhanakvadiya2@gmail.com" className="hover:text-gold transition-colors break-all">dkdhanakvadiya2@gmail.com</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white-muted">
                <MapPin size={14} className="text-gold flex-shrink-0" />
                Gujarat, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white-muted">
            © {new Date().getFullYear()} Vlaris Agro Exports. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-dark transition-all"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
