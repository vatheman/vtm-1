import React, { useState } from 'react';
import { ShoppingBag, User, Search, ShieldCheck, ExternalLink, Menu, X, ChevronDown } from 'lucide-react';
import { BRAND_INFO, MENU_ITEMS } from '../data/dummyData';

export default function Header({ 
  cartCount, 
  onOpenCart, 
  onOpenAuth, 
  currentPath, 
  onNavigate 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <header className="sticky top-0 z-40 bg-[#0B318F] text-white border-b border-[#1A42A7] shadow-md">
      {/* Top Banner */}
      <div className="bg-[#082672] text-[#E5ECFF] text-xs py-2 px-4 text-center tracking-wide font-light flex justify-center items-center gap-3">
        <span>🌿 자연소재 · 자연빛깔 · 자연염색 브랜드 바더만 (VATHEMAN)</span>
        <span className="hidden md:inline text-white/40">|</span>
        <a 
          href={BRAND_INFO.smartstoreUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1 text-[#D0B579] underline hover:text-white transition-colors font-medium"
        >
          네이버 스마트스토어 공식몰 방문하기 <ExternalLink size={12} />
        </a>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer h-10 sm:h-12 overflow-hidden relative" onClick={() => onNavigate('/')}>
          <img 
            src="/assets/images/logo-blue.png" 
            alt="VATHEMAN" 
            className="h-[170%] w-auto object-cover object-top" 
            style={{ filter: 'invert(1) grayscale(1) brightness(2)', mixBlendMode: 'screen' }}
          />
        </div>

        {/* Center Desktop Navigation Menu (Matching vatheman.com) */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold tracking-wider">
          {MENU_ITEMS.map((menu, idx) => (
            <div
              key={idx}
              className="relative group"
              onMouseEnter={() => setOpenDropdown(menu.title)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <a
                href={menu.link}
                className="py-6 px-2 flex items-center gap-1 hover:text-[#D0B579] transition-colors"
              >
                <span>{menu.title}</span>
                {menu.submenus.length > 0 && <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform" />}
              </a>

              {/* Submenu Dropdown */}
              {menu.submenus.length > 0 && openDropdown === menu.title && (
                <div className="absolute top-full left-0 w-48 bg-[#F7F2E9] text-[#2C2825] rounded-b-xl shadow-xl border border-[#E8DFD5] py-2 animate-fade-in z-50">
                  {menu.submenus.map((sub, sIdx) => (
                    <a
                      key={sIdx}
                      href={sub.link}
                      className="block px-4 py-2.5 text-xs font-semibold hover:bg-[#0B318F] hover:text-white transition-colors"
                    >
                      {sub.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions & Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* STORE Pill Button */}
          <a
            href={BRAND_INFO.smartstoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-white text-[#212121] hover:bg-[#F5F5F5] text-xs font-bold shadow-sm transition-all"
          >
            <span>STORE</span>
            <ExternalLink size={12} className="text-[#0B318F]" />
          </a>

          {/* Admin Switcher */}
          <button
            onClick={() => onNavigate('/admin')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
              currentPath === '/admin'
                ? 'bg-[#D0B579] text-[#2C2825] shadow-sm'
                : 'bg-[#1542B3] text-white hover:bg-[#D0B579] hover:text-[#2C2825] border border-white/20'
            }`}
          >
            <ShieldCheck size={14} />
            <span className="hidden sm:inline">관리자</span> (/admin)
          </button>

          {/* User Login Modal Trigger */}
          <button
            onClick={onOpenAuth}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
            title="로그인 / 회원가입"
          >
            <User size={20} />
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2 hover:bg-white/10 rounded-full transition-colors text-white"
            title="장바구니"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D0B579] text-[#2C2825] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#082672] border-t border-white/10 px-6 py-6 space-y-4 text-left animate-fade-in text-sm">
          {MENU_ITEMS.map((menu, idx) => (
            <div key={idx} className="space-y-1 border-b border-white/10 pb-3">
              <a 
                href={menu.link}
                onClick={() => setMobileMenuOpen(false)}
                className="block font-bold text-[#D0B579] text-base"
              >
                {menu.title}
              </a>
              {menu.submenus.map((sub, sIdx) => (
                <a
                  key={sIdx}
                  href={sub.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block pl-4 py-1 text-xs text-white/80 hover:text-white"
                >
                  └ {sub.title}
                </a>
              ))}
            </div>
          ))}

          <button
            onClick={() => { onNavigate('/admin'); setMobileMenuOpen(false); }}
            className="w-full py-2.5 rounded-xl bg-[#D0B579] text-[#2C2825] font-bold text-xs shadow-md mt-4"
          >
            ⚙️ 관리자페이지 접속 (/admin)
          </button>
        </div>
      )}
    </header>
  );
}
