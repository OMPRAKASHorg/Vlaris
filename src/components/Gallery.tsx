import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const galleryItems = [
  { src: '/images/gallery-farm.jpg', title: 'Our Farmland', category: 'Farm' },
  { src: '/images/gallery-harvest.jpg', title: 'Harvest Season', category: 'Harvesting' },
  { src: '/images/gallery-packaging.jpg', title: 'Export Packaging', category: 'Packaging' },
  { src: '/images/gallery-workers.jpg', title: 'Our Team at Work', category: 'Team' },
  { src: '/images/onion-product.jpg', title: 'Premium Red Onions', category: 'Products' },
  { src: '/images/export-shipping.jpg', title: 'Global Shipping', category: 'Logistics' },
];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 sm:py-32 relative" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-semibold">Gallery</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4" style={{ fontFamily: 'var(--font-heading)' }}>
            A Glimpse Into <span className="gold-gradient">Our World</span>
          </h2>
          <p className="text-white-muted text-lg mt-4 max-w-2xl mx-auto">
            From farm to shipment — see our journey in pictures
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.08 }}
              onClick={() => setSelected(i)}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                i === 0 || i === 5 ? 'md:row-span-2 h-64 md:h-full' : 'h-48 md:h-64'
              }`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6">
                <span className="text-xs text-gold tracking-wider uppercase mb-1">{item.category}</span>
                <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{item.title}</span>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/30 rounded-2xl transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-dark/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={galleryItems[selected].src}
              alt={galleryItems[selected].title}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl"
            />
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full glass flex items-center justify-center text-gold hover:bg-gold hover:text-dark transition-all"
            >
              <X size={24} />
            </button>
            <div className="absolute bottom-8 text-center">
              <p className="text-gold text-sm tracking-wider uppercase">{galleryItems[selected].category}</p>
              <p className="text-xl font-bold mt-1" style={{ fontFamily: 'var(--font-heading)' }}>{galleryItems[selected].title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
