import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ExternalLink, Instagram, Youtube, BookOpen } from 'lucide-react';
import { BRAND_INFO } from '../data/dummyData';

export function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem, onClearCart }) {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#E8DFD5] animate-fade-in text-left">
          {/* Header */}
          <div className="p-6 border-b border-[#E8DFD5] flex items-center justify-between bg-[#0B318F] text-white">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#D0B579]" />
              <h3 className="text-lg font-bold font-serif">
                장바구니 ({cartItems.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart List */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-[#6E6862]">
                <ShoppingBag size={48} className="mx-auto text-[#E8DFD5] mb-3" />
                <p className="text-sm font-medium">장바구니가 비어 있습니다.</p>
                <p className="text-xs text-[#A0AAB2] mt-1 font-light">
                  바더만의 자연빛깔 스카프를 담아보세요.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 rounded-xl border border-[#E8DFD5] bg-[#FAF6F0]/50"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg bg-white border border-[#E8DFD5]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#2C2825] truncate mb-1">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-[#0B318F] block mb-1 font-semibold">
                      {item.dyeType}
                    </span>
                    <span className="text-sm font-bold font-serif text-[#2C2825]">
                      {item.price.toLocaleString()}원 × {item.quantity}
                    </span>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-[#A0AAB2] hover:text-red-500 rounded-lg hover:bg-white transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-[#E8DFD5] bg-[#FAF6F0] space-y-4">
              <div className="flex justify-between items-center text-sm font-semibold text-[#2C2825]">
                <span>총 주문 금액</span>
                <span className="text-xl font-bold font-serif text-[#0B318F]">
                  {totalAmount.toLocaleString()}원
                </span>
              </div>
              <p className="text-[11px] text-[#6E6862] font-light">
                * {BRAND_INFO.shippingInfo}
              </p>

              <a
                href={BRAND_INFO.smartstoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#0B318F] hover:bg-[#082672] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <span>스마트스토어 결제하기</span>
                <ExternalLink size={16} className="text-[#D0B579]" />
              </a>

              <button
                onClick={onClearCart}
                className="w-full py-2 text-xs text-[#A0AAB2] hover:text-[#6E6862] text-center"
              >
                장바구니 비우기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#F7F2E9] text-[#424242] py-16 border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Logo & Info */}
          <div className="space-y-4">
            <div className="h-10 overflow-hidden relative flex items-center w-32">
              <img 
                src="/assets/images/logo-blue.png" 
                alt="VATHEMAN" 
                className="h-[170%] w-auto object-cover object-top" 
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
            <p className="text-xs text-[#6E6862] leading-relaxed font-light">
              {BRAND_INFO.slogan}<br />
              {BRAND_INFO.subSlogan}
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-sm font-bold text-[#2C2825] mb-4">SITE MENU</h4>
            <ul className="space-y-2 text-xs text-[#6E6862]">
              <li><a href="#about" className="hover:text-[#0B318F] transition-colors font-medium">ABOUT (브랜드소개)</a></li>
              <li><a href="#shop" className="hover:text-[#0B318F] transition-colors font-medium">SHOP (롱텐실 / 사각텐실)</a></li>
              <li><a href="#faq" className="hover:text-[#0B318F] transition-colors font-medium">FAQ (자주묻는질문)</a></li>
              <li><a href="#notice" className="hover:text-[#0B318F] transition-colors font-medium">NOTICE (공지사항)</a></li>
            </ul>
          </div>

          {/* Col 3: CS & Company Address (Matching vatheman.com JSON-LD) */}
          <div>
            <h4 className="text-sm font-bold text-[#2C2825] mb-4">CS CENTER & LOCATION</h4>
            <div className="space-y-2 text-xs text-[#6E6862] font-light">
              <p className="text-lg font-bold text-[#0B318F] font-serif">{BRAND_INFO.csPhone}</p>
              <p>운영시간: 평일 10:00 - 18:00 (주말/공휴일 휴무)</p>
              <p>주소: {BRAND_INFO.address}</p>
              <p>이메일: {BRAND_INFO.email}</p>
            </div>
          </div>

          {/* Col 4: Official SNS Links */}
          <div>
            <h4 className="text-sm font-bold text-[#2C2825] mb-4">OFFICIAL CHANNELS</h4>
            <div className="flex flex-col gap-2.5 text-xs font-medium">
              <a
                href={BRAND_INFO.smartstoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#03C75A] font-bold hover:underline"
              >
                <span>네이버 스마트스토어</span>
                <ExternalLink size={12} />
              </a>

              <a
                href={BRAND_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#E1306C] font-bold hover:underline"
              >
                <Instagram size={14} />
                <span>공식 인스타그램 (@vatheman_)</span>
              </a>

              <a
                href={BRAND_INFO.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#FF0000] font-bold hover:underline"
              >
                <Youtube size={14} />
                <span>공식 유튜브</span>
              </a>

              <a
                href={BRAND_INFO.blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#03C75A] font-bold hover:underline"
              >
                <BookOpen size={14} />
                <span>공식 네이버 블로그</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E8DFD5] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A0AAB2]">
          <p>© 2026 VATHEMAN. All Rights Reserved.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span className="hover:text-[#2C2825] cursor-pointer">개인정보처리방침</span>
            <span className="hover:text-[#2C2825] cursor-pointer">이용약관</span>
            <span className="hover:text-[#2C2825] cursor-pointer">사업자정보확인</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
