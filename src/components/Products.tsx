import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ShieldCheck, Truck, Award, Leaf } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  badges: string;
  category: string;
}

export default function Products() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const badgeIcons: Record<string, typeof ShieldCheck> = {
    'Export Grade': ShieldCheck,
    'Farm Fresh': Leaf,
    'Premium Quality': Award,
    'Fast Delivery': Truck,
    'Organic': Leaf,
    'Certified': ShieldCheck,
  };

  return (
    <section id="" className="py-24 sm:py-32 relative" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-20 w-96 h-96 bg-gold/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-semibold">Our Products</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Export-Grade <span className="gold-gradient">Premium Produce</span>
          </h2>
          <p className="text-white-muted text-lg mt-4 max-w-2xl mx-auto">
            Carefully cultivated and processed to meet international quality standards
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass rounded-3xl h-[500px] animate-pulse shimmer" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
         Array.isArray(products) && products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="group glass rounded-3xl overflow-hidden hover:border-gold/40 transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-wider">
                    {product.category}
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                    {product.name}
                  </h3>
                  <p className="text-white-muted leading-relaxed mb-6">{product.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.badges.split(',').map((badge) => {
                      const trimmed = badge.trim();
                      const Icon = badgeIcons[trimmed] || ShieldCheck;
                      return (
                        <span
                          key={trimmed}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-gold/10 border border-gold/20 text-gold"
                        >
                          <Icon size={12} />
                          {trimmed}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
