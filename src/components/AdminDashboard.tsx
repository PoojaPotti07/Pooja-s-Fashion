import React, { useState } from 'react';
import {
  X,
  Package,
  ShoppingCart,
  Users,
  Tag,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  RefreshCw,
  Search,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, Category, OrderStatus, Coupon } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminDashboardOpen,
    setIsAdminDashboardOpen,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    coupons,
    addCoupon,
    toggleCoupon,
    resetToDefaultCatalog
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'coupons' | 'customers'>('overview');

  // Search in admin
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  // Add/Edit product form state
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState<Category>('Sarees');
  const [prodPrice, setProdPrice] = useState(2999);
  const [prodOriginalPrice, setProdOriginalPrice] = useState(3999);
  const [prodFabric, setProdFabric] = useState('Pure Chanderi Silk');
  const [prodStock, setProdStock] = useState(15);
  const [prodColors, setProdColors] = useState('Crimson, Gold, Rose');
  const [prodSizes, setProdSizes] = useState('Free Size');
  const [prodImage, setProdImage] = useState('/src/assets/images/cat_saree_banarasi_silk_1790578120499.jpg');
  const [prodDesc, setProdDesc] = useState('Handcrafted pure weave designed with exquisite border work.');

  // New Coupon form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscountPercent, setNewCouponDiscountPercent] = useState(20);
  const [newCouponMinSpend, setNewCouponMinSpend] = useState(1999);
  const [newCouponDesc, setNewCouponDesc] = useState('');

  if (!isAdminDashboardOpen) return null;

  // Key Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const lowStockCount = products.filter((p) => p.stockCount <= 10).length;

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProdName('');
    setProdCategory('Sarees');
    setProdPrice(2999);
    setProdOriginalPrice(3999);
    setProdFabric('Pure Chanderi Silk');
    setProdStock(15);
    setProdColors('Crimson, Gold, Rose');
    setProdSizes('Free Size');
    setProdImage('/src/assets/images/cat_saree_banarasi_silk_1790578120499.jpg');
    setProdDesc('Handcrafted pure weave designed with exquisite border work.');
    setIsProductFormOpen(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProdName(p.name);
    setProdCategory(p.category);
    setProdPrice(p.price);
    setProdOriginalPrice(p.originalPrice || p.price);
    setProdFabric(p.fabric);
    setProdStock(p.stockCount);
    setProdColors(p.colors.join(', '));
    setProdSizes(p.sizes.join(', '));
    setProdImage(p.images[0] || '');
    setProdDesc(p.description);
    setIsProductFormOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) return;

    const colorsArr = prodColors.split(',').map((c) => c.trim()).filter(Boolean);
    const sizesArr = prodSizes.split(',').map((s) => s.trim()).filter(Boolean);

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: prodName.trim(),
        category: prodCategory,
        price: Number(prodPrice),
        originalPrice: Number(prodOriginalPrice),
        fabric: prodFabric.trim(),
        stockCount: Number(prodStock),
        inStock: Number(prodStock) > 0,
        colors: colorsArr.length > 0 ? colorsArr : ['Original'],
        sizes: sizesArr.length > 0 ? sizesArr : ['Free Size'],
        images: [prodImage.trim(), ...editingProduct.images.slice(1)],
        description: prodDesc.trim()
      });
    } else {
      addProduct({
        name: prodName.trim(),
        category: prodCategory,
        price: Number(prodPrice),
        originalPrice: Number(prodOriginalPrice),
        fabric: prodFabric.trim(),
        stockCount: Number(prodStock),
        inStock: Number(prodStock) > 0,
        colors: colorsArr.length > 0 ? colorsArr : ['Original'],
        sizes: sizesArr.length > 0 ? sizesArr : ['Free Size'],
        images: [prodImage.trim() || '/src/assets/images/hero_pooja_fashion_editorial_1790578107709.jpg'],
        description: prodDesc.trim(),
        rating: 5.0,
        reviewCount: 1,
        isNew: true
      });
    }

    setIsProductFormOpen(false);
  };

  const handleAddCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountPercentage: Number(newCouponDiscountPercent),
      minSpend: Number(newCouponMinSpend),
      description: newCouponDesc.trim() || `${newCouponDiscountPercent}% off on minimum spend ₹${newCouponMinSpend}`,
      expiresAt: '2026-12-31',
      isActive: true
    });

    setNewCouponCode('');
    setNewCouponDesc('');
  };

  // Extract unique customers from orders
  const customerMap = new Map<string, { name: string; phone: string; email: string; city: string; totalSpent: number; ordersCount: number }>();
  orders.forEach((o) => {
    const key = o.shippingAddress.email || o.shippingAddress.phone;
    const existing = customerMap.get(key);
    if (existing) {
      existing.totalSpent += o.total;
      existing.ordersCount += 1;
    } else {
      customerMap.set(key, {
        name: o.shippingAddress.fullName,
        phone: o.shippingAddress.phone,
        email: o.shippingAddress.email,
        city: `${o.shippingAddress.city}, ${o.shippingAddress.state}`,
        totalSpent: o.total,
        ordersCount: 1
      });
    }
  });
  const customers = Array.from(customerMap.values());

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm p-2 sm:p-4 flex items-center justify-center animate-in fade-in">
      <div className="bg-[#FDFBF7] rounded-lg max-w-6xl w-full border border-[#DDD5C7] shadow-2xl overflow-hidden my-4 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#EAE3D9] flex items-center justify-between bg-[#1A1818] text-[#FDFBF7]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="font-serif text-xl sm:text-2xl font-normal">
                Pooja Fashion · Store Operations Console
              </h2>
            </div>
            <p className="text-xs text-[#EDE5DC]/70 mt-0.5">
              Live inventory management, order fulfillment, and discount engines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetToDefaultCatalog}
              className="text-xs text-[#E8C5C8] hover:text-white flex items-center gap-1.5 border border-white/20 px-2.5 py-1 rounded transition-colors"
              title="Reset sample catalog and orders"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Demo Store</span>
            </button>
            <button
              onClick={() => setIsAdminDashboardOpen(false)}
              className="p-1.5 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#F7F3EB] border-b border-[#EAE3D9] px-6 flex gap-6 overflow-x-auto text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#8C1D40] text-[#8C1D40]'
                : 'border-transparent text-[#5C5551] hover:text-[#1A1818]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'products'
                ? 'border-[#8C1D40] text-[#8C1D40]'
                : 'border-transparent text-[#5C5551] hover:text-[#1A1818]'
            }`}
          >
            Catalog Inventory ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-[#8C1D40] text-[#8C1D40]'
                : 'border-transparent text-[#5C5551] hover:text-[#1A1818]'
            }`}
          >
            Customer Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`py-3.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'coupons'
                ? 'border-[#8C1D40] text-[#8C1D40]'
                : 'border-transparent text-[#5C5551] hover:text-[#1A1818]'
            }`}
          >
            Discounts & Vouchers ({coupons.length})
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`py-3.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'customers'
                ? 'border-[#8C1D40] text-[#8C1D40]'
                : 'border-transparent text-[#5C5551] hover:text-[#1A1818]'
            }`}
          >
            Customers ({customers.length})
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded border border-[#EAE3D9] shadow-sm">
                  <span className="text-xs uppercase tracking-wider text-[#7A736E] font-semibold">Total Revenue</span>
                  <div className="font-serif text-2xl sm:text-3xl text-[#1A1818] font-normal mt-1 tabular-nums">
                    ₹{totalRevenue.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Realtime gross bookings</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded border border-[#EAE3D9] shadow-sm">
                  <span className="text-xs uppercase tracking-wider text-[#7A736E] font-semibold">Total Orders</span>
                  <div className="font-serif text-2xl sm:text-3xl text-[#1A1818] font-normal mt-1 tabular-nums">
                    {totalOrders}
                  </div>
                  <div className="text-[11px] text-[#5C5551] mt-1">
                    Across India (Express Air)
                  </div>
                </div>

                <div className="bg-white p-5 rounded border border-[#EAE3D9] shadow-sm">
                  <span className="text-xs uppercase tracking-wider text-[#7A736E] font-semibold">Active Products</span>
                  <div className="font-serif text-2xl sm:text-3xl text-[#1A1818] font-normal mt-1 tabular-nums">
                    {products.length}
                  </div>
                  <div className="text-[11px] text-[#5C5551] mt-1">
                    6 Categories Managed
                  </div>
                </div>

                <div className="bg-white p-5 rounded border border-[#EAE3D9] shadow-sm">
                  <span className="text-xs uppercase tracking-wider text-[#7A736E] font-semibold">Low Stock Items</span>
                  <div className="font-serif text-2xl sm:text-3xl text-[#8C1D40] font-normal mt-1 tabular-nums">
                    {lowStockCount}
                  </div>
                  <div className="text-[11px] text-amber-700 font-medium mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Requires artisan restock</span>
                  </div>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="bg-white p-5 rounded border border-[#EAE3D9]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg text-[#1A1818]">Latest Customer Orders</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-[#8C1D40] hover:underline font-medium"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="divide-y divide-[#EAE3D9] text-xs">
                  {orders.slice(0, 3).map((o) => (
                    <div key={o.id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="font-mono text-sm text-[#1A1818]">#{o.id}</strong>
                          <span className="text-[#5C5551]">by {o.shippingAddress.fullName}</span>
                          <span className="text-[10px] text-stone-400">· {o.shippingAddress.city}</span>
                        </div>
                        <div className="text-[#7A736E] mt-0.5">
                          {o.items.length} garments · {o.paymentMethod}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-semibold text-sm tabular-nums text-[#1A1818]">
                          ₹{o.total.toLocaleString('en-IN')}
                        </span>
                        <div className="text-[11px] text-[#8C1D40] font-medium">{o.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: PRODUCTS MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search catalog by name or category..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#DDD5C7] rounded focus:outline-none focus:border-[#8C1D40]"
                  />
                </div>

                <button
                  onClick={handleOpenAddProduct}
                  className="px-4 py-2 bg-[#1A1818] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#8C1D40] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="border border-[#EAE3D9] rounded bg-white overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F7F3EB] text-[#1A1818] uppercase tracking-wider font-semibold border-b border-[#EAE3D9]">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Stock Units</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE3D9]">
                    {products
                      .filter((p) => p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.category.toLowerCase().includes(productSearch.toLowerCase()))
                      .map((prod) => (
                        <tr key={prod.id} className="hover:bg-[#FAF7F0]">
                          <td className="p-3 flex items-center gap-3">
                            <img
                              src={prod.images[0]}
                              alt=""
                              className="w-10 h-12 rounded object-cover border border-[#EAE3D9]"
                            />
                            <div>
                              <strong className="text-[#1A1818] font-serif block text-sm line-clamp-1">{prod.name}</strong>
                              <span className="text-[11px] text-[#7A736E]">{prod.fabric}</span>
                            </div>
                          </td>
                          <td className="p-3 font-medium text-[#4A4543]">{prod.category}</td>
                          <td className="p-3 tabular-nums font-semibold text-[#1A1818]">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </td>
                          <td className="p-3 tabular-nums font-medium">
                            <span className={prod.stockCount <= 10 ? 'text-amber-800 font-bold' : 'text-[#1A1818]'}>
                              {prod.stockCount} in stock
                            </span>
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                                prod.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {prod.inStock ? 'Active' : 'Sold Out'}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEditProduct(prod)}
                                className="p-1.5 text-[#5C5551] hover:text-[#8C1D40] transition-colors"
                                title="Edit Product"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteProduct(prod.id)}
                                className="p-1.5 text-[#9E958E] hover:text-rose-700 transition-colors"
                                title="Delete Product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg text-[#1A1818]">All Placed Orders</h3>
                <span className="text-xs text-[#7A736E]">{orders.length} Records</span>
              </div>

              <div className="space-y-4">
                {orders.map((o) => (
                  <div key={o.id} className="p-4 bg-white rounded border border-[#EAE3D9] space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0EAE1] pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="font-mono text-sm text-[#1A1818]">Order #{o.id}</strong>
                          <span className="text-xs text-[#7A736E]">({new Date(o.createdAt).toLocaleDateString('en-GB')})</span>
                          <span className="text-xs font-semibold text-[#8C1D40] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                            {o.paymentMethod}
                          </span>
                        </div>
                        <div className="text-xs text-[#4A4543] mt-0.5">
                          Recipient: <strong>{o.shippingAddress.fullName}</strong> · {o.shippingAddress.phone} · {o.shippingAddress.city}, {o.shippingAddress.state}
                        </div>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-[#7A736E]">Fulfillment:</span>
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                          aria-label={`Update fulfillment status for order ${o.id}`}
                          className="bg-[#F7F3EB] border border-[#DDD5C7] rounded px-2.5 py-1 text-xs font-semibold text-[#1A1818] focus:outline-none focus:border-[#8C1D40]"
                        >
                          <option value="Order Confirmed">Order Confirmed</option>
                          <option value="Tailoring & Quality Check">Artisan Quality Check</option>
                          <option value="Dispatched">Dispatched (In Transit)</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Ordered Items Preview */}
                    <div className="flex flex-wrap items-center gap-4 text-xs">
                      {o.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-[#FDFBF7] p-1.5 rounded border border-[#EAE3D9]">
                          <img src={item.image} alt="" className="w-8 h-10 object-cover rounded" />
                          <div>
                            <span className="font-medium text-[#1A1818] block max-w-xs truncate">{item.productName}</span>
                            <span className="text-[11px] text-[#7A736E]">
                              {item.size} · {item.color} · Qty: {item.quantity} · ₹{item.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#F0EAE1] flex justify-between items-center text-xs text-[#5C5551]">
                      <span>Airway Bill: <strong className="font-mono">{o.trackingNumber}</strong></span>
                      <span className="text-sm font-semibold text-[#1A1818]">
                        Total Amount: ₹{o.total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: COUPONS & DISCOUNTS */}
          {activeTab === 'coupons' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Add Coupon Form */}
              <div className="p-5 bg-white rounded border border-[#EAE3D9] space-y-4">
                <h3 className="font-serif text-base text-[#1A1818]">Create Promo Voucher</h3>
                <form onSubmit={handleAddCouponSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[#4A4543] mb-1 font-medium">Coupon Code (Uppercase)</label>
                    <input
                      type="text"
                      required
                      value={newCouponCode}
                      onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                      placeholder="e.g. DIWALI30"
                      className="w-full p-2 bg-[#FDFBF7] border border-[#DDD5C7] rounded focus:outline-none focus:border-[#8C1D40] uppercase font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4A4543] mb-1 font-medium">Discount Percentage (%)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={70}
                      value={newCouponDiscountPercent}
                      onChange={(e) => setNewCouponDiscountPercent(Number(e.target.value))}
                      className="w-full p-2 bg-[#FDFBF7] border border-[#DDD5C7] rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4A4543] mb-1 font-medium">Minimum Order Spend (₹)</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={newCouponMinSpend}
                      onChange={(e) => setNewCouponMinSpend(Number(e.target.value))}
                      className="w-full p-2 bg-[#FDFBF7] border border-[#DDD5C7] rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4A4543] mb-1 font-medium">Description</label>
                    <input
                      type="text"
                      value={newCouponDesc}
                      onChange={(e) => setNewCouponDesc(e.target.value)}
                      placeholder="e.g. Festive discount on bridal collection"
                      className="w-full p-2 bg-[#FDFBF7] border border-[#DDD5C7] rounded"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#1A1818] text-white font-medium rounded hover:bg-[#8C1D40] transition-colors"
                  >
                    Create Coupon
                  </button>
                </form>
              </div>

              {/* Coupon List */}
              <div className="md:col-span-2 space-y-3">
                <h3 className="font-serif text-base text-[#1A1818]">Configured Store Vouchers</h3>
                {coupons.map((c) => (
                  <div key={c.code} className="p-4 bg-white rounded border border-[#EAE3D9] flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-[#8C1D40]" />
                        <strong className="font-mono text-sm tracking-wider text-[#1A1818]">{c.code}</strong>
                        <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded font-semibold text-[#5C5551]">
                          Min Spend: ₹{c.minSpend.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-[#5C5551] mt-1">{c.description}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleCoupon(c.code)}
                        className={`px-3 py-1 text-xs rounded font-medium ${
                          c.isActive
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-200 text-stone-600'
                        }`}
                      >
                        {c.isActive ? 'Active' : 'Paused'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CUSTOMERS */}
          {activeTab === 'customers' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg text-[#1A1818]">Registered Patrons & Customers</h3>
                <span className="text-xs text-[#7A736E]">{customers.length} Patrons</span>
              </div>

              <div className="border border-[#EAE3D9] rounded bg-white overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F7F3EB] text-[#1A1818] uppercase tracking-wider font-semibold border-b border-[#EAE3D9]">
                    <tr>
                      <th className="p-3">Customer Name</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Orders</th>
                      <th className="p-3 text-right">Lifetime Spend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE3D9]">
                    {customers.map((c, idx) => (
                      <tr key={idx} className="hover:bg-[#FAF7F0]">
                        <td className="p-3 font-semibold text-[#1A1818] font-serif text-sm">{c.name}</td>
                        <td className="p-3 text-[#5C5551]">
                          <div>{c.email}</div>
                          <div>{c.phone}</div>
                        </td>
                        <td className="p-3 text-[#5C5551]">{c.city}</td>
                        <td className="p-3 tabular-nums font-medium">{c.ordersCount} orders</td>
                        <td className="p-3 text-right tabular-nums font-bold text-[#1A1818]">
                          ₹{c.totalSpent.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Product Add/Edit Modal */}
        {isProductFormOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in">
            <div className="bg-[#FDFBF7] rounded-lg max-w-xl w-full border border-[#DDD5C7] shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#EAE3D9] pb-3">
                <h3 className="font-serif text-xl text-[#1A1818]">
                  {editingProduct ? 'Edit Catalog Product' : 'Add New Clothing Product'}
                </h3>
                <button
                  onClick={() => setIsProductFormOpen(false)}
                  className="text-[#7A736E] hover:text-[#1A1818]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#4A4543] mb-1 font-medium">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder="e.g. Royal Organza Zari Floral Saree"
                    className="w-full p-2 bg-white border border-[#DDD5C7] rounded focus:outline-none focus:border-[#8C1D40]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#4A4543] mb-1 font-medium">Category</label>
                    <select
                      value={prodCategory}
                      onChange={(e) => setProdCategory(e.target.value as Category)}
                      className="w-full p-2 bg-white border border-[#DDD5C7] rounded"
                    >
                      <option value="Sarees">Sarees</option>
                      <option value="Kurtis">Kurtis</option>
                      <option value="Dress Materials">Dress Materials</option>
                      <option value="Ethnic Wear">Ethnic Wear</option>
                      <option value="Casual Wear">Casual Wear</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#4A4543] mb-1 font-medium">Fabric Specification</label>
                    <input
                      type="text"
                      value={prodFabric}
                      onChange={(e) => setProdFabric(e.target.value)}
                      placeholder="e.g. Pure Georgette with Mulmul Slip"
                      className="w-full p-2 bg-white border border-[#DDD5C7] rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#4A4543] mb-1 font-medium">Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={prodPrice}
                      onChange={(e) => setProdPrice(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-[#DDD5C7] rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4A4543] mb-1 font-medium">Original MRP (₹)</label>
                    <input
                      type="number"
                      value={prodOriginalPrice}
                      onChange={(e) => setProdOriginalPrice(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-[#DDD5C7] rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4A4543] mb-1 font-medium">Stock Units</label>
                    <input
                      type="number"
                      value={prodStock}
                      onChange={(e) => setProdStock(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-[#DDD5C7] rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#4A4543] mb-1 font-medium">Available Colors (Comma separated)</label>
                    <input
                      type="text"
                      value={prodColors}
                      onChange={(e) => setProdColors(e.target.value)}
                      placeholder="Pastel Rose, Ivory, Mint"
                      className="w-full p-2 bg-white border border-[#DDD5C7] rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4A4543] mb-1 font-medium">Sizes (Comma separated)</label>
                    <input
                      type="text"
                      value={prodSizes}
                      onChange={(e) => setProdSizes(e.target.value)}
                      placeholder="XS, S, M, L, XL"
                      className="w-full p-2 bg-white border border-[#DDD5C7] rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#4A4543] mb-1 font-medium">Primary Image URL or Asset Path</label>
                  <input
                    type="text"
                    value={prodImage}
                    onChange={(e) => setProdImage(e.target.value)}
                    placeholder="/src/assets/images/... or web URL"
                    className="w-full p-2 bg-white border border-[#DDD5C7] rounded font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-[#4A4543] mb-1 font-medium">Description</label>
                  <textarea
                    rows={3}
                    value={prodDesc}
                    onChange={(e) => setProdDesc(e.target.value)}
                    className="w-full p-2 bg-white border border-[#DDD5C7] rounded"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsProductFormOpen(false)}
                    className="px-4 py-2 text-[#7A736E] hover:text-[#1A1818]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#8C1D40] text-white font-medium rounded hover:bg-[#68142E] transition-colors"
                  >
                    Save to Catalog
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
