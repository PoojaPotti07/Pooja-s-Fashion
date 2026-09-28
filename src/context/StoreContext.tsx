import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Coupon, Order, Review, UserProfile, ShippingAddress, OrderStatus } from '../types';
import { INITIAL_PRODUCTS, INITIAL_COUPONS } from '../data/initialProducts';
import { INITIAL_REVIEWS, INITIAL_SAMPLE_ORDERS } from '../data/storeData';

interface ToastNotification {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  coupons: Coupon[];
  reviews: Review[];
  appliedCoupon: Coupon | null;
  user: UserProfile | null;
  selectedCategory: string;
  searchQuery: string;
  selectedProductForModal: Product | null;
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isCheckoutOpen: boolean;
  isOrderTrackingOpen: boolean;
  isAuthModalOpen: boolean;
  isAdminDashboardOpen: boolean;
  isSizeGuideOpen: boolean;
  sizeGuideCategory: string;
  confirmedOrder: Order | null;
  toasts: ToastNotification[];

  // Actions
  setSelectedCategory: (cat: string) => void;
  setSearchQuery: (query: string) => void;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsOrderTrackingOpen: (open: boolean) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setIsAdminDashboardOpen: (open: boolean) => void;
  openSizeGuide: (category?: string) => void;
  closeSizeGuide: () => void;
  setConfirmedOrder: (order: Order | null) => void;

  // Cart & Wishlist
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  updateCartQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Coupons
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Calculations
  cartSubtotal: number;
  cartDiscount: number;
  shippingFee: number;
  cartTotal: number;
  cartCount: number;

  // Checkout & Orders
  processOrder: (address: ShippingAddress, paymentMethod: 'UPI' | 'Card' | 'Cash on Delivery') => Order;
  trackOrderById: (orderId: string) => Order | undefined;

  // Admin Actions
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addCoupon: (coupon: Coupon) => void;
  toggleCoupon: (code: string) => void;
  resetToDefaultCatalog: () => void;

  // Reviews
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;

  // Auth
  login: (name: string, email: string, phone: string) => void;
  logout: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or fallback to defaults
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('pf_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pf_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pf_wishlist');
      return saved ? JSON.parse(saved) : ['pf-01', 'pf-04'];
    } catch {
      return ['pf-01', 'pf-04'];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('pf_orders');
      return saved ? JSON.parse(saved) : INITIAL_SAMPLE_ORDERS;
    } catch {
      return INITIAL_SAMPLE_ORDERS;
    }
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('pf_coupons');
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('pf_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('pf_user');
      return saved ? JSON.parse(saved) : {
        id: 'u-default',
        name: 'Pooja Pottipati',
        email: 'pottipooja000@gmail.com',
        phone: '+91 98888 77665',
        addresses: [
          {
            fullName: 'Pooja Pottipati',
            phone: '+91 98888 77665',
            email: 'pottipooja000@gmail.com',
            streetAddress: '12th Cross, Indiranagar',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560038'
          }
        ]
      };
    } catch {
      return null;
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  // Modals / Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [sizeGuideCategory, setSizeGuideCategory] = useState('Kurtis');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Toast feedback
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('pf_products', JSON.stringify(products));
    } catch (e) {
      console.warn('Failed saving products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('pf_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed saving cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('pf_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed saving wishlist to localStorage', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('pf_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed saving orders to localStorage', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('pf_coupons', JSON.stringify(coupons));
    } catch (e) {
      console.warn('Failed saving coupons to localStorage', e);
    }
  }, [coupons]);

  useEffect(() => {
    try {
      localStorage.setItem('pf_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.warn('Failed saving reviews to localStorage', e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('pf_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('pf_user');
      }
    } catch (e) {
      console.warn('Failed saving user to localStorage', e);
    }
  }, [user]);

  // Product Modal
  const openProductModal = (product: Product) => {
    setSelectedProductForModal(product);
  };

  const closeProductModal = () => {
    setSelectedProductForModal(null);
  };

  const openSizeGuide = (category = 'Kurtis') => {
    setSizeGuideCategory(category);
    setIsSizeGuideOpen(true);
  };

  const closeSizeGuide = () => {
    setIsSizeGuideOpen(false);
  };

  // Cart operations
  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
      }
    });

    showToast(`Added "${product.name}" (${size}) to your bag`);
  };

  const updateCartQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color)
      )
    );
    showToast('Item removed from shopping bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Cart Totals
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  let cartDiscount = 0;
  if (appliedCoupon && appliedCoupon.isActive) {
    if (cartSubtotal >= appliedCoupon.minSpend) {
      if (appliedCoupon.discountPercentage) {
        cartDiscount = Math.round((cartSubtotal * appliedCoupon.discountPercentage) / 100);
      } else if (appliedCoupon.discountAmount) {
        cartDiscount = Math.min(appliedCoupon.discountAmount, cartSubtotal);
      }
    }
  }

  // Free shipping over ₹1499
  const shippingFee = cartSubtotal === 0 || cartSubtotal >= 1499 ? 0 : 99;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + shippingFee);

  // Apply Coupon
  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === trimmed && c.isActive);

    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }

    if (cartSubtotal < found.minSpend) {
      return {
        success: false,
        message: `Coupon requires a minimum order value of ₹${found.minSpend.toLocaleString('en-IN')}.`
      };
    }

    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied successfully!`);
    return { success: true, message: 'Coupon applied successfully!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Process Order
  const processOrder = (address: ShippingAddress, paymentMethod: 'UPI' | 'Card' | 'Cash on Delivery'): Order => {
    const newOrderId = `PF-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingNumber = `BLUEDART-${Math.floor(1000000 + Math.random() * 9000000)}`;

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    const estimatedDelivery = deliveryDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const newOrder: Order = {
      id: newOrderId,
      createdAt: new Date().toISOString(),
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        image: item.product.images[0],
        size: item.selectedSize,
        color: item.selectedColor,
        quantity: item.quantity,
        price: item.product.price
      })),
      shippingAddress: address,
      paymentMethod,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shippingFee,
      total: cartTotal,
      status: 'Order Confirmed',
      trackingNumber,
      estimatedDelivery,
      appliedCoupon: appliedCoupon?.code
    };

    // Decrement stock in products
    setProducts((prev) =>
      prev.map((p) => {
        const cartMatch = cart.find((c) => c.product.id === p.id);
        if (cartMatch) {
          const updatedStock = Math.max(0, p.stockCount - cartMatch.quantity);
          return {
            ...p,
            stockCount: updatedStock,
            inStock: updatedStock > 0
          };
        }
        return p;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setConfirmedOrder(newOrder);
    setIsCheckoutOpen(false);

    showToast(`Order #${newOrder.id} placed successfully!`);
    return newOrder;
  };

  const trackOrderById = (orderId: string) => {
    const cleaned = orderId.trim().toUpperCase();
    return orders.find(
      (o) =>
        o.id.toUpperCase() === cleaned ||
        o.trackingNumber.toUpperCase() === cleaned ||
        o.shippingAddress.phone.includes(cleaned)
    );
  };

  // Admin Actions
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `pf-${Date.now().toString().slice(-4)}`;
    const fullProduct: Product = {
      ...newProd,
      id
    };
    setProducts((prev) => [fullProduct, ...prev]);
    showToast(`Product "${fullProduct.name}" added to catalog.`);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Product "${updated.name}" updated.`);
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product deleted from catalog.', 'info');
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    showToast(`Order ${orderId} updated to: ${status}`);
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev]);
    showToast(`Coupon ${coupon.code} created.`);
  };

  const toggleCoupon = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const resetToDefaultCatalog = () => {
    setProducts(INITIAL_PRODUCTS);
    setCoupons(INITIAL_COUPONS);
    setOrders(INITIAL_SAMPLE_ORDERS);
    setReviews(INITIAL_REVIEWS);
    localStorage.removeItem('pf_products');
    localStorage.removeItem('pf_coupons');
    localStorage.removeItem('pf_orders');
    localStorage.removeItem('pf_reviews');
    showToast('Catalog & store data reset to default demo collection.');
  };

  // Reviews
  const addReview = (newReview: Omit<Review, 'id' | 'date'>) => {
    const id = `rev-${Date.now()}`;
    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const fullReview: Review = {
      ...newReview,
      id,
      date: today
    };
    setReviews((prev) => [fullReview, ...prev]);

    // Recalculate product rating
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === newReview.productId) {
          const productReviews = [...reviews.filter((r) => r.productId === p.id), fullReview];
          const avg = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
          return {
            ...p,
            rating: Number(avg.toFixed(1)),
            reviewCount: productReviews.length
          };
        }
        return p;
      })
    );

    showToast('Thank you! Your review has been published.');
  };

  // User Auth
  const login = (name: string, email: string, phone: string) => {
    const newUser: UserProfile = {
      id: `u-${Date.now()}`,
      name,
      email,
      phone,
      addresses: [
        {
          fullName: name,
          phone,
          email,
          streetAddress: 'Boutique Residence, 4th Block',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560034'
        }
      ]
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${name}!`);
  };

  const logout = () => {
    setUser(null);
    showToast('You have signed out.', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        coupons,
        reviews,
        appliedCoupon,
        user,
        selectedCategory,
        searchQuery,
        selectedProductForModal,
        isCartOpen,
        isWishlistOpen,
        isCheckoutOpen,
        isOrderTrackingOpen,
        isAuthModalOpen,
        isAdminDashboardOpen,
        isSizeGuideOpen,
        sizeGuideCategory,
        confirmedOrder,
        toasts,
        setSelectedCategory,
        setSearchQuery,
        openProductModal,
        closeProductModal,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsCheckoutOpen,
        setIsOrderTrackingOpen,
        setIsAuthModalOpen,
        setIsAdminDashboardOpen,
        openSizeGuide,
        closeSizeGuide,
        setConfirmedOrder,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        cartDiscount,
        shippingFee,
        cartTotal,
        cartCount,
        processOrder,
        trackOrderById,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        addCoupon,
        toggleCoupon,
        resetToDefaultCatalog,
        addReview,
        login,
        logout,
        showToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
