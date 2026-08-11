import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Filter, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { PRODUCTS_DATA, FAQS_DATA, BRAND_INFO } from '../data/dummyData';

export default function ProductCatalog({ onSelectProduct, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const categories = ["전체", "롱텐실", "사각텐실", "선물세트"];

  const filteredProducts = selectedCategory === "전체"
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(p => p.category === selectedCategory);

  return (
    <div id="shop">
      {/* SHOP SECTION */}
      <section id="shop-all" className="py-20 bg-[#FDFBF7] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#0B318F] uppercase block mb-2">
                VATHEMAN SHOP
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#2C2825]">
                바더만 천연염색 스카프 라인업
              </h2>
            </div>
            <p className="text-[#6E6862] text-sm font-light mt-2 md:mt-0 max-w-md">
              롱텐실과 사각텐실으로 구성된 자연소재 핸드메이드 스카프 컬렉션입니다.
            </p>
          </div>

          {/* Category Tabs (ALL, 롱텐실, 사각텐실, 선물세트) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-[#E8DFD5]">
            <Filter size={16} className="text-[#0B318F] mr-1 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0B318F] text-white shadow-sm'
                    : 'bg-white text-[#6E6862] hover:bg-[#FAF6F0] hover:text-[#2C2825] border border-[#E8DFD5]'
                }`}
              >
                {cat === "전체" ? "ALL (전체보기)" : cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="warm-card group flex flex-col justify-between overflow-hidden relative"
              >
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                  {product.isBest && (
                    <span className="bg-[#D0B579] text-[#2C2825] text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                      BEST
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-[#0B318F] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                      NEW
                    </span>
                  )}
                </div>

                {/* Product Image */}
                <div 
                  className="relative h-72 overflow-hidden bg-[#FAF6F0] cursor-pointer" 
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); onSelectProduct(product); }}
                      className="p-3 bg-white hover:bg-[#F7F2E9] text-[#2C2825] rounded-full shadow-lg transition-transform hover:scale-110"
                      title="상세보기"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                      className="p-3 bg-[#0B318F] hover:bg-[#082672] text-white rounded-full shadow-lg transition-transform hover:scale-110"
                      title="장바구니 담기"
                    >
                      <ShoppingBag size={18} />
                    </button>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#0B318F] font-bold mb-1.5">
                      <span>{product.dyeType}</span>
                      <span className="flex items-center gap-1 text-[#D0B579]">
                        <Star size={12} fill="#D0B579" /> {product.rating} ({product.reviewsCount})
                      </span>
                    </div>
                    <h3 
                      onClick={() => onSelectProduct(product)}
                      className="text-base font-bold text-[#2C2825] mb-2 hover:text-[#0B318F] cursor-pointer transition-colors line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#6E6862] line-clamp-2 font-light mb-4">
                      {product.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="pt-4 border-t border-[#E8DFD5] flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#A0AAB2] line-through block -mb-1">
                        {product.originalPrice.toLocaleString()}원
                      </span>
                      <span className="text-xl font-bold text-[#2C2825] font-serif">
                        {product.price.toLocaleString()}원
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-4 py-2 rounded-lg bg-[#FAF6F0] hover:bg-[#0B318F] text-[#0B318F] hover:text-white text-xs font-bold border border-[#E8DFD5] transition-colors flex items-center gap-1.5"
                    >
                      <ShoppingBag size={14} /> 담기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 bg-[#FAF6F0] border-b border-[#E8DFD5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-left">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest text-[#0B318F] uppercase block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl font-bold font-serif text-[#2C2825]">
              자주 묻는 질문 (FAQ)
            </h2>
            <p className="text-xs text-[#6E6862] font-light mt-2">
              천연염색 제품 관리 및 배송에 관해 자주 묻는 질문 모음입니다.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS_DATA.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E8DFD5] overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-[#2C2825] hover:bg-[#FAF6F0] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[#D0B579] font-serif text-lg">Q.</span>
                    <span>{faq.q}</span>
                  </div>
                  {openFaqIndex === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 pt-2 text-xs text-[#6E6862] leading-relaxed border-t border-[#FAF6F0] bg-[#FAF6F0]/40 font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTICE & SHIPPING SECTION */}
      <section id="notice" className="py-16 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-left">
          <div className="p-6 rounded-2xl bg-[#0B318F] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <span className="text-xs text-[#D0B579] font-bold uppercase tracking-wider block mb-1">
                NOTICE & SHIPPING POLICY
              </span>
              <h3 className="text-lg font-bold">배송 및 고객지원 안내</h3>
              <p className="text-xs text-white/80 font-light mt-1">
                {BRAND_INFO.shippingInfo} | 문의전화 {BRAND_INFO.csPhone}
              </p>
            </div>

            <a
              href={BRAND_INFO.smartstoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white text-[#212121] font-bold text-xs hover:bg-[#F5F5F5] transition-colors shrink-0 shadow-sm"
            >
              네이버 톡톡 문의하기
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
