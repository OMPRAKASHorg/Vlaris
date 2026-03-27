import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Phone, Mail, MapPin, MessageCircle, CheckCircle, Loader2 } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [form, setForm] = useState({ name: '', email: '', country: '', requirement: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try { 
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
      setForm({ name: '', email: '', country: '', requirement: '' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-semibold">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Let's <span className="gold-gradient">Do Business</span>
          </h2>
          <p className="text-white-muted text-lg mt-4 max-w-2xl mx-auto">
            Ready to source premium Indian produce? Send us your requirements.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-3xl p-8 sm:p-12 text-center h-full flex flex-col items-center justify-center"
              >
                <CheckCircle className="w-16 h-16 text-gold mb-6" />
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Inquiry Received!</h3>
                <p className="text-white-muted mb-6">Thank you for reaching out. Our team will contact you within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 border border-gold/40 rounded-full text-gold hover:bg-gold hover:text-dark transition-all"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 sm:p-8 lg:p-10 space-y-5">
                <div>
                  <label className="text-sm text-white-muted mb-2 block">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white focus:border-gold/60 focus:outline-none transition-colors placeholder:text-white-muted/40"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="text-sm text-white-muted mb-2 block">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white focus:border-gold/60 focus:outline-none transition-colors placeholder:text-white-muted/40"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="text-sm text-white-muted mb-2 block">Country *</label>
                  <input
                    type="text"
                    required
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white focus:border-gold/60 focus:outline-none transition-colors placeholder:text-white-muted/40"
                    placeholder="United Arab Emirates"
                  />
                </div>
                <div>
                  <label className="text-sm text-white-muted mb-2 block">Requirement *</label>
value={form.requirement}
                    required
                    rows={4}
                    value={form.requirement::}
                    onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                    className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white focus:border-gold/60 focus:outline-none transition-colors placeholder:text-white-muted/40 resize-none"
                    placeholder="I need 20 tons of premium red onions..."
                  />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 gold-gradient-bg rounded-xl text-dark font-semibold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98] disabled:opacity-50"
                >
                  {submitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={18} /> Send Inquiry</>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-6 hover:border-gold/30 transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gold-gradient-bg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-dark" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Phone / WhatsApp</h4>
                  <a href="tel:+919512195435" className="text-gold hover:text-gold-light transition-colors text-lg">+91 9512195435</a>
                  <p className="text-white-muted text-sm mt-1">Available Mon–Sat, 9 AM – 7 PM IST</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 hover:border-gold/30 transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gold-gradient-bg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-dark" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email</h4>
                  <a href="mailto:dkdhanakvadiya2@gmail.com" className="text-gold hover:text-gold-light transition-colors break-all">dkdhanakvadiya2@gmail.com</a>
                  <p className="text-white-muted text-sm mt-1">We respond within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 hover:border-gold/30 transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gold-gradient-bg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-dark" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Location</h4>
                  <p className="text-white-muted">Gujarat, India</p>
                  <p className="text-white-muted text-sm mt-1">Serving global markets from the heart of India</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/919512195435?text=Hello%20Vlaris%20Agro%20Exports!%20I%20am%20interested%20in%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] rounded-2xl text-white font-semibold text-lg hover:bg-[#20BD5A] transition-colors active:scale-[0.98]"
            >
              <MessageCircle size={22} />
              Chat on WhatsApp
            </a>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-dark-border h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.8504843953!2d72.5714!3d23.0225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sGujarat%2C%20India!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vlaris Agro Exports Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
