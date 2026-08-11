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
import AdminLayout from './admin/AdminLayout';
import { supabase } from './lib/supabaseClient';

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

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  // If path starts with /admin, render Admin Panel Layout
  if (currentPath.startsWith('/admin')) {
    return <AdminLayout onNavigateHome={() => navigateTo('/')} />;
  }

  // Otherwise, render Brand Homepage
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2C2825]">
      {/* Brand Header */}
      <Header
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
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
