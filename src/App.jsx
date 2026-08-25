import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BrandStory from './components/BrandStory';
import CraftProcess from './components/CraftProcess';
import ProductCatalog from './components/ProductCatalog';
import ProductModal from './components/ProductModal';
import { InstagramFeed, ReviewSection } from './components/InstagramFeed';
import { CartDrawer, Footer } from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import { supabase } from './lib/supabaseClient';

const AdminLayout = React.lazy(() => import('./admin/AdminLayout'));

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  
  // Cart state
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Auth modal state
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Supabase Auth session
  const [session, setSession] = useState(null);

  // Product detail modal state
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Supabase Auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sync window.location.pathname on popstate / routing
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateTo = React.useCallback((path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAddToCart = React.useCallback((product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const handleRemoveFromCart = React.useCallback((id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const handleClearCart = React.useCallback(() => {
    setCartItems([]);
  }, []);

  const handleLogout = React.useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
  }, []);

  const totalCartCount = React.useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // If path starts with /admin, render Admin Panel Layout with Suspense
  if (currentPath.startsWith('/admin')) {
    return (
      <React.Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF6F0]">
          <div className="text-center font-bold text-[#0B318F] flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-[#0B318F] border-t-transparent rounded-full animate-spin"></div>
            <span>관리자 시스템 로딩 중...</span>
          </div>
        </div>
      }>
        <AdminLayout onNavigateHome={() => navigateTo('/')} />
      </React.Suspense>
    );
  }


  // Otherwise, render Brand Homepage
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2C2825]">
      {/* Brand Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentPath={currentPath}
        onNavigate={navigateTo}
        session={session}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero 
          onExploreProducts={() => {
            const el = document.getElementById('products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} 
        />

        {/* Brand Philosophy */}
        <BrandStory />

        {/* Natural Dye Craftsmanship Process */}
        <CraftProcess />

        {/* Products Catalog Grid */}
        <ProductCatalog
          onSelectProduct={setSelectedProduct}
          onAddToCart={handleAddToCart}
        />

        {/* Instagram Showcase */}
        <InstagramFeed />

        {/* Customer Reviews & Testimonials */}
        <ReviewSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Modals & Overlays */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}
