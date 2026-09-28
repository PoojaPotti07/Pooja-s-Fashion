import { Product, Coupon } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'pf-01',
    name: 'Royal Crimson Banarasi Katan Silk Saree',
    category: 'Sarees',
    price: 4899,
    originalPrice: 6999,
    description: 'An heirloom Banarasi masterpiece handwoven in Varanasi using pure Katan silk threads. Features rich antique gold zari floral jaal with an opulent floral pallu and heavy border. Comes with an unstitched running blouse piece.',
    fabric: 'Pure Katan Silk with Gold Zari',
    colors: ['Crimson Red', 'Royal Gold', 'Wine Maroon'],
    sizes: ['Free Size (5.5m + 0.8m Blouse)'],
    images: [
      '/src/assets/images/cat_saree_banarasi_silk_1790578120499.jpg',
      '/src/assets/images/hero_pooja_fashion_editorial_1790578107709.jpg'
    ],
    rating: 4.9,
    reviewCount: 48,
    inStock: true,
    stockCount: 14,
    isNew: true,
    isBestSeller: true,
    craftsmanship: 'Handloom Weaving (Varanasi, Uttar Pradesh)',
    careInstructions: 'Dry clean only. Store in a muslin cloth with mild camphor.'
  },
  {
    id: 'pf-02',
    name: 'Noor-e-Gul Lucknowi Chikankari Anarkali Kurti',
    category: 'Kurtis',
    price: 2499,
    originalPrice: 3499,
    description: 'Delicately handcrafted pure georgette Anarkali silhouette adorned with classic Bakhiya, Phanda and Keel Kangan embroidery. Layered with soft mulmul lining for supreme comfort and flow.',
    fabric: 'Fine Georgette with Pure Cotton Lining',
    colors: ['Pastel Rose', 'Ivory Cream', 'Powder Blue', 'Mint Green'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: [
      '/src/assets/images/cat_kurti_chikankari_rose_1790578133198.jpg',
      '/src/assets/images/hero_pooja_fashion_editorial_1790578107709.jpg'
    ],
    rating: 4.8,
    reviewCount: 62,
    inStock: true,
    stockCount: 28,
    isNew: true,
    isBestSeller: true,
    craftsmanship: 'Handcrafted Lucknowi Chikankari (Awadh artisan collective)',
    careInstructions: 'Gentle hand wash in cold water or mild eco-friendly dry clean.'
  },
  {
    id: 'pf-03',
    name: 'Aafreen Chanderi Silk Embroidered Dress Material',
    category: 'Dress Materials',
    price: 1999,
    originalPrice: 2899,
    description: 'Bespoke unstitched suit set featuring a Chanderi silk kurta fabric with subtle zari butis, breathable modal cotton bottom fabric, and a sheer woven digital floral organza dupatta.',
    fabric: 'Chanderi Silk Kurta, Modal Cotton Bottom, Woven Organza Dupatta',
    colors: ['Sage Ivory', 'Dusty Rose', 'Mustard Gold'],
    sizes: ['Unstitched Set (Top 2.5m, Bottom 2.5m, Dupatta 2.3m)'],
    images: [
      '/src/assets/images/cat_dress_material_chanderi_1790578146269.jpg',
      '/src/assets/images/cat_kurti_chikankari_rose_1790578133198.jpg'
    ],
    rating: 4.7,
    reviewCount: 39,
    inStock: true,
    stockCount: 19,
    isNew: false,
    isBestSeller: true,
    craftsmanship: 'Handblock & Thread Border Detailing (Madhya Pradesh)',
    careInstructions: 'Dry clean recommended for first two washes.'
  },
  {
    id: 'pf-04',
    name: 'Jahanara Champagne Festive Mirror-Work Lehenga Set',
    category: 'Ethnic Wear',
    price: 8999,
    originalPrice: 12499,
    description: 'A contemporary festive silhouette featuring a voluminous pleated skirt in raw silk with intricate resham and real glass mirror work. Accompanied by a padded sweetheart blouse and hand-embroidered scalloped net dupatta.',
    fabric: 'Raw Silk & Fine Net with Glass Mirror Work',
    colors: ['Champagne Gold', 'Blush Peach', 'Emerald Teal'],
    sizes: ['S (Bust 34)', 'M (Bust 36)', 'L (Bust 38)', 'XL (Bust 40)', 'Semi-Stitched'],
    images: [
      '/src/assets/images/cat_ethnic_lehenga_champagne_1790578156857.jpg',
      '/src/assets/images/hero_pooja_fashion_editorial_1790578107709.jpg'
    ],
    rating: 5.0,
    reviewCount: 31,
    inStock: true,
    stockCount: 8,
    isNew: true,
    isBestSeller: false,
    craftsmanship: 'Hand Zardozi & Mirror Embellishment (Jaipur Atelier)',
    careInstructions: 'Specialist dry clean only. Preserve in protective garment bag.'
  },
  {
    id: 'pf-05',
    name: 'Kanjeevaram Gold Tissue Temple Border Saree',
    category: 'Sarees',
    price: 5999,
    originalPrice: 7999,
    description: 'A radiant Kanchipuram weave crafted in shimmering tissue silk featuring traditional Korvai temple borders, Peacock motifs in heavy zari, and a grand contrast pallu.',
    fabric: 'Tissue Silk with Pure Zari Weave',
    colors: ['Antique Gold', 'Copper Rose', 'Emerald Green'],
    sizes: ['Free Size (5.5m + 0.8m Blouse)'],
    images: [
      '/src/assets/images/hero_pooja_fashion_editorial_1790578107709.jpg',
      '/src/assets/images/cat_saree_banarasi_silk_1790578120499.jpg'
    ],
    rating: 4.9,
    reviewCount: 54,
    inStock: true,
    stockCount: 11,
    isNew: false,
    isBestSeller: true,
    craftsmanship: 'Traditional Korvai Weave (Kanchipuram, Tamil Nadu)',
    careInstructions: 'Dry clean only. Roll fold to protect zari creases.'
  },
  {
    id: 'pf-06',
    name: 'Suhani Handblock Printed Mulmul Straight Kurti',
    category: 'Kurtis',
    price: 1299,
    originalPrice: 1799,
    description: 'Everyday understated elegance crafted in lightweight 100% Bagru handblock printed cotton. Features a sleek Mandarin collar, mother-of-pearl buttons, and side slit accents.',
    fabric: '100% Pure Mulmul Breathable Cotton',
    colors: ['Indigo Blue', 'Terracotta Red', 'Olive Sage'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: [
      '/src/assets/images/cat_kurti_chikankari_rose_1790578133198.jpg',
      '/src/assets/images/cat_dress_material_chanderi_1790578146269.jpg'
    ],
    rating: 4.6,
    reviewCount: 78,
    inStock: true,
    stockCount: 45,
    isNew: false,
    isBestSeller: true,
    craftsmanship: 'Natural Dye Bagru Woodblock Print (Rajasthan)',
    careInstructions: 'Machine wash delicate cycle in cold water. Line dry in shade.'
  },
  {
    id: 'pf-07',
    name: 'Kashmiri Tilla Embroidered Pashmina Dress Material',
    category: 'Dress Materials',
    price: 3299,
    originalPrice: 4599,
    description: 'Sumptuous winter festive unstitched suit in soft Pashmina weave, elevated with exquisite Kashmiri Tilla metallic thread needlework along the neckline and cuffs. Paired with coordinating warm stole.',
    fabric: 'Fine Spun Pashmina Wool-Silk Blend',
    colors: ['Plum Wine', 'Deep Forest', 'Oatmeal Beige'],
    sizes: ['Unstitched Set (Top 2.5m, Bottom 2.5m, Stole 2.2m)'],
    images: [
      '/src/assets/images/cat_dress_material_chanderi_1790578146269.jpg',
      '/src/assets/images/cat_saree_banarasi_silk_1790578120499.jpg'
    ],
    rating: 4.8,
    reviewCount: 27,
    inStock: true,
    stockCount: 16,
    isNew: true,
    isBestSeller: false,
    craftsmanship: 'Kashmiri Tilla Needlework (Srinagar Artisan Guild)',
    careInstructions: 'Professional dry clean only.'
  },
  {
    id: 'pf-08',
    name: 'Riddhi Organza Ruffled Sharara & Peplum Set',
    category: 'Ethnic Wear',
    price: 4999,
    originalPrice: 6999,
    description: 'A youthful modern ethnic silhouette featuring a flirty peplum top adorned with gota patti borders, paired with layered tiered organza sharara pants and a scalloped dupatta.',
    fabric: 'Lightweight Organza and Silk Crepe',
    colors: ['Lilac Bloom', 'Powder Peach', 'Mint Sherbet'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/src/assets/images/cat_ethnic_lehenga_champagne_1790578156857.jpg',
      '/src/assets/images/cat_kurti_chikankari_rose_1790578133198.jpg'
    ],
    rating: 4.7,
    reviewCount: 19,
    inStock: true,
    stockCount: 12,
    isNew: true,
    isBestSeller: false,
    craftsmanship: 'Gota Patti and Cutwork Finishing',
    careInstructions: 'Dry clean only. Steam iron on reverse setting.'
  },
  {
    id: 'pf-09',
    name: 'Breeze Linen Cotton Slub Co-ord Tunic Set',
    category: 'Casual Wear',
    price: 1899,
    originalPrice: 2499,
    description: 'Effortless fusion casual wear combining a relaxed drop-shoulder linen tunic with ankle-length tapered trousers. Minimal, stylish, and perfect for work-to-weekend transitions.',
    fabric: 'Organic Slub Linen-Cotton Blend',
    colors: ['Oatmeal Beige', 'Dusty Coral', 'Olive Khaki'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      '/src/assets/images/cat_kurti_chikankari_rose_1790578133198.jpg',
      '/src/assets/images/cat_dress_material_chanderi_1790578146269.jpg'
    ],
    rating: 4.6,
    reviewCount: 42,
    inStock: true,
    stockCount: 30,
    isNew: false,
    isBestSeller: true,
    craftsmanship: 'Pre-washed artisanal weave with coconut shell buttons',
    careInstructions: 'Machine wash cold with similar colors. Warm iron.'
  },
  {
    id: 'pf-10',
    name: 'Vintage Zardozi Velvet Bridal Potli Bag',
    category: 'Accessories',
    price: 1199,
    originalPrice: 1799,
    description: 'Opulent handcrafted micro-velvet drawstring pouch bag embellished with intricate antique gold dabka, sequins, and pearl bead drops. Features a braided wristlet handle.',
    fabric: 'Silk Micro-Velvet with Pearl & Zardozi Beading',
    colors: ['Maroon Crimson', 'Emerald Green', 'Royal Black'],
    sizes: ['One Size (8" x 9.5")'],
    images: [
      '/src/assets/images/cat_ethnic_lehenga_champagne_1790578156857.jpg',
      '/src/assets/images/cat_saree_banarasi_silk_1790578120499.jpg'
    ],
    rating: 4.9,
    reviewCount: 88,
    inStock: true,
    stockCount: 22,
    isNew: false,
    isBestSeller: true,
    craftsmanship: 'Hand Embroidered Dabka & Zari Work',
    careInstructions: 'Spot clean only with soft dry cloth.'
  },
  {
    id: 'pf-11',
    name: 'Kundan Meenakari Polki Choker & Earring Set',
    category: 'Accessories',
    price: 1699,
    originalPrice: 2499,
    description: 'Festive brass-based choker necklace encrusted with high-grade faux Polki stones, hand-painted meenakari reverse detailing, and layered blush pink bead drops. Includes matching jhumkas.',
    fabric: 'Gold Plated Brass with Kundan & Enamel',
    colors: ['Blush Pink & Gold', 'Ruby Green & Gold', 'Pearl White'],
    sizes: ['Adjustable Dori Length'],
    images: [
      '/src/assets/images/hero_pooja_fashion_editorial_1790578107709.jpg',
      '/src/assets/images/cat_ethnic_lehenga_champagne_1790578156857.jpg'
    ],
    rating: 4.8,
    reviewCount: 53,
    inStock: true,
    stockCount: 15,
    isNew: true,
    isBestSeller: false,
    craftsmanship: 'Traditional Meenakari Enameling (Jaipur)',
    careInstructions: 'Keep away from moisture, perfumes and alcohol sprays.'
  },
  {
    id: 'pf-12',
    name: 'Sandalwood Floral Printed Georgette Tiered Saree',
    category: 'Sarees',
    price: 2799,
    originalPrice: 3899,
    description: 'Contemporary featherweight georgette saree featuring romantic vintage English botanical blooms, subtle micro-pleating, and an embroidered scalloped hemline. Effortless to drape.',
    fabric: 'Pure Georgette with Lace Scallop Hem',
    colors: ['Sandalwood Peach', 'Dusty Lavender', 'Seafoam Mint'],
    sizes: ['Free Size (5.5m + 0.8m Blouse)'],
    images: [
      '/src/assets/images/hero_pooja_fashion_editorial_1790578107709.jpg',
      '/src/assets/images/cat_saree_banarasi_silk_1790578120499.jpg'
    ],
    rating: 4.8,
    reviewCount: 36,
    inStock: true,
    stockCount: 18,
    isNew: true,
    isBestSeller: true,
    craftsmanship: 'Digital Archival Print with Zari Hem',
    careInstructions: 'Mild hand wash or dry clean.'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'POOJA15',
    discountPercentage: 15,
    minSpend: 999,
    description: '15% Flat Off on orders above ₹999 for new patrons',
    expiresAt: '2026-12-31',
    isActive: true
  },
  {
    code: 'UTSAV500',
    discountAmount: 500,
    minSpend: 2999,
    description: 'Flat ₹500 Off on celebratory festive collections above ₹2,999',
    expiresAt: '2026-11-30',
    isActive: true
  },
  {
    code: 'ROYAL1000',
    discountAmount: 1000,
    minSpend: 5999,
    description: 'Flat ₹1,000 Off on Banarasi & Bridal Heritage Weaves above ₹5,999',
    expiresAt: '2026-12-31',
    isActive: true
  }
];
