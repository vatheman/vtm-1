import React from 'react';
import { X, Star, ShoppingBag, Truck, ShieldCheck, Heart } from 'lucide-react';
import { BRAND_INFO } from '../data/dummyData';

export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E8DFD5] relative flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#2C2825] shadow-md transition-colors"
        >
          <X size={20} />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 bg-[#FAF6F0] relative overflow-hidden flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 md:h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold text-[#8C533E] border border-[#E8DFD5]">
            {product.dyeType}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto text-left">
          <div>
            <span className="text-xs font-semibold tracking-wider text-[#C47B59] uppercase block mb-1">
              {product.category}
            </span>

            <h3 className="text-2xl font-bold font-serif text-[#2C2825] mb-2">
              {product.name}
            </h3>

            <div className="flex items-center gap-2 mb-4 text-xs">
              <div className="flex items-center text-[#D9A05B]">
                <Star size={14} fill="#D9A05B" />
                <span className="font-bold ml-1">{product.rating}</span>
              </div>
              <span className="text-[#A0AAB2]">|</span>
              <span className="text-[#6E6862]">리뷰 {product.reviewsCount}개</span>
            </div>

            <div className="mb-6 pb-6 border-b border-[#E8DFD5]">
              <span className="text-sm text-[#A0AAB2] line-through block">
                {product.originalPrice.toLocaleString()}원
              </span>
              <span className="text-3xl font-bold font-serif text-[#8C533E]">
                {product.price.toLocaleString()}원
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#6E6862] leading-relaxed mb-6 font-light">
              {product.description}
            </p>

            {/* Spec list */}
            {product.details && (
              <div className="space-y-2 text-xs text-[#2C2825] bg-[#FAF6F0] p-4 rounded-xl border border-[#E8DFD5] mb-6">
                <span className="font-bold text-[#8C533E] block mb-1">제품 세부 정보</span>
                {product.details.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C47B59]" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-[#E8DFD5]">
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="w-full py-3.5 rounded-xl bg-[#8C533E] hover:bg-[#72402E] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <ShoppingBag size={18} />
              <span>장바구니 담기</span>
            </button>

            <a
              href={BRAND_INFO.smartstoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#FAF6F0] hover:bg-[#F5F0E6] text-[#2C2825] border border-[#E8DFD5] font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>네이버 스마트스토어에서 결제하기</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
