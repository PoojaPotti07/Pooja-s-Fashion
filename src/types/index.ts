export type Category = 'Sarees' | 'Kurtis' | 'Dress Materials' | 'Ethnic Wear' | 'Casual Wear' | 'Accessories';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  description: string;
  fabric: string;
  colors: string[];
  sizes: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  craftsmanship?: string;
  careInstructions?: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercentage?: number;
  discountAmount?: number;
  minSpend: number;
  description: string;
  expiresAt: string;
  isActive: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userCity: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBuyer: boolean;
}

export type OrderStatus = 'Order Confirmed' | 'Tailoring & Quality Check' | 'Dispatched' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'UPI' | 'Card' | 'Cash on Delivery';
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  status: OrderStatus;
  trackingNumber: string;
  estimatedDelivery: string;
  appliedCoupon?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: ShippingAddress[];
}
