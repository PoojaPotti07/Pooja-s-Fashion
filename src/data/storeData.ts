import { Review, Order } from '../types';
import { IMAGES } from '../assets/images';

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    productId: 'pf-01',
    userName: 'Ananya Sharma',
    userCity: 'Bangalore',
    rating: 5,
    date: '14 Sep 2026',
    comment: 'The Banarasi Katan silk saree arrived in an exquisite butter-paper and cloth package. The zari has that authentic antique luster without being overly loud. Wore it to my brother\'s reception and received endless compliments!',
    verifiedBuyer: true
  },
  {
    id: 'rev-02',
    productId: 'pf-02',
    userName: 'Priya Patel',
    userCity: 'Ahmedabad',
    rating: 5,
    date: '02 Sep 2026',
    comment: 'Sublime Chikankari craftsmanship! The georgette falls gracefully and the inner cotton mulmul slip makes it completely non-sheer and breathable for daytime festivities.',
    verifiedBuyer: true
  },
  {
    id: 'rev-03',
    productId: 'pf-04',
    userName: 'Sunita Reddy',
    userCity: 'Hyderabad',
    rating: 5,
    date: '28 Aug 2026',
    comment: 'I was hesitant about ordering a lehenga online, but the stitching and real glass mirror accents were impeccable. Customer support on WhatsApp helped me with custom measurements promptly.',
    verifiedBuyer: true
  },
  {
    id: 'rev-04',
    productId: 'pf-03',
    userName: 'Meera Sen',
    userCity: 'Kolkata',
    rating: 5,
    date: '19 Aug 2026',
    comment: 'The Chanderi suit material has a rich natural sheen. The organza dupatta with woven border gives such an elevated boutique look after tailoring. Exceptional value.',
    verifiedBuyer: true
  },
  {
    id: 'rev-05',
    productId: 'pf-06',
    userName: 'Ritika Deshmukh',
    userCity: 'Pune',
    rating: 4,
    date: '10 Aug 2026',
    comment: 'Super soft mulmul cotton kurti. Perfectly tailored for office and casual lunches. The Bagru indigo print hasn\'t bled even after three gentle washes.',
    verifiedBuyer: true
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    handle: '@divya_drapes',
    image: IMAGES.saree,
    caption: 'Draped in pure crimson heirloom magic from @PoojaFashion. Nothing matches the grace of handloom Banarasi silk. #PoojaFashionDiaries',
    taggedProduct: 'Royal Crimson Banarasi Katan Silk Saree',
    productId: 'pf-01',
    likes: 1420
  },
  {
    id: 'ig-2',
    handle: '@aarti_lifestyle',
    image: IMAGES.kurti,
    caption: 'Pastel poetry in motion. When in doubt, wear Lucknowi Chikankari that breathes with you. @PoojaFashion',
    taggedProduct: 'Noor-e-Gul Lucknowi Chikankari Anarkali Kurti',
    productId: 'pf-02',
    likes: 980
  },
  {
    id: 'ig-3',
    handle: '@shreya_vogue',
    image: IMAGES.lehenga,
    caption: 'Golden hour in champagne mirror-work perfection. Sangeet ready thanks to @PoojaFashion!',
    taggedProduct: 'Jahanara Champagne Festive Mirror-Work Lehenga Set',
    productId: 'pf-04',
    likes: 2150
  },
  {
    id: 'ig-4',
    handle: '@neha_couture',
    image: IMAGES.dressMaterial,
    caption: 'Unstitched treasures tailored to my silhouette. The Chanderi silk texture is a dream. #HandcraftedIndia',
    taggedProduct: 'Aafreen Chanderi Silk Embroidered Dress Material',
    productId: 'pf-03',
    likes: 840
  }
];

export const INITIAL_SAMPLE_ORDERS: Order[] = [
  {
    id: 'PF-89241',
    createdAt: '2026-09-24T14:32:00.000Z',
    items: [
      {
        productId: 'pf-01',
        productName: 'Royal Crimson Banarasi Katan Silk Saree',
        image: IMAGES.saree,
        size: 'Free Size (5.5m + 0.8m Blouse)',
        color: 'Crimson Red',
        quantity: 1,
        price: 4899
      }
    ],
    shippingAddress: {
      fullName: 'Sunita Reddy',
      phone: '+91 98450 12345',
      email: 'sunita.reddy@example.com',
      streetAddress: 'Flat 402, Lotus Greens, Banjara Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500034'
    },
    paymentMethod: 'UPI',
    subtotal: 4899,
    discount: 500,
    shippingFee: 0,
    total: 4399,
    status: 'Dispatched',
    trackingNumber: 'BLUEDART-IND-7782190',
    estimatedDelivery: '28 Sep 2026',
    appliedCoupon: 'UTSAV500'
  },
  {
    id: 'PF-89190',
    createdAt: '2026-09-22T10:15:00.000Z',
    items: [
      {
        productId: 'pf-02',
        productName: 'Noor-e-Gul Lucknowi Chikankari Anarkali Kurti',
        image: IMAGES.kurti,
        size: 'M',
        color: 'Pastel Rose',
        quantity: 1,
        price: 2499
      },
      {
        productId: 'pf-10',
        productName: 'Vintage Zardozi Velvet Bridal Potli Bag',
        image: IMAGES.lehenga,
        size: 'One Size (8" x 9.5")',
        color: 'Maroon Crimson',
        quantity: 1,
        price: 1199
      }
    ],
    shippingAddress: {
      fullName: 'Pooja Pottipati',
      phone: '+91 98888 77665',
      email: 'pottipooja000@gmail.com',
      streetAddress: '12th Cross, Indiranagar',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560038'
    },
    paymentMethod: 'Card',
    subtotal: 3698,
    discount: 554,
    shippingFee: 0,
    total: 3144,
    status: 'Delivered',
    trackingNumber: 'DELHIVERY-EXP-440192',
    estimatedDelivery: '25 Sep 2026',
    appliedCoupon: 'POOJA15'
  }
];
