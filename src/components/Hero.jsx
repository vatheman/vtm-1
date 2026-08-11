import React from 'react';
import { ArrowRight, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { BRAND_INFO } from '../data/dummyData';

export default function Hero({ onExploreProducts }) {
  return (
    <section className="relative overflow-hidden bg-[#FAF6F0] py-20 md:py-28 border-b border-[#E8DFD5]">
      {/* Background Subtle Gradient */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0B318F]/10 rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#D0B579]/20 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Text Banner (Matching vatheman.com headline & slogan) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B318F] text-[#D0B579] text-xs font-semibold tracking-widest uppercase">
              <Sparkles size={14} className="text-[#D0B579]" />
              <span>VATHEMAN NATURAL DYE BRAND</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-[#2C2825] leading-[1.15]">
              자연소재 · 자연빛깔<br />
              <span className="text-[#0B318F]">자연염색 브랜드</span> 바더만
            </h1>

            <p className="text-base sm:text-lg text-[#6E6862] leading-relaxed max-w-2xl font-light">
              풋감, 쪽, 쑥과 황토가 전하는 은은하고 기품 있는 자연빛깔.<br className="hidden sm:inline" />
              100% 오가닉 텐실과 핸드메이드 정성으로 일상 속에 따스한 가치와 선물을 만듭니다.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreProducts}
                className="px-7 py-4 rounded-xl bg-[#0B318F] hover:bg-[#082672] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
              >
                <span>천연염색 스카프 라인업</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#D0B579]" />
              </button>

              <a
                href={BRAND_INFO.smartstoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-xl bg-white border border-[#E8DFD5] text-[#2C2825] hover:border-[#0B318F] hover:text-[#0B318F] font-bold text-sm transition-all flex items-center gap-2 shadow-sm"
              >
                <span>네이버 스마트스토어 공식몰</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Quick Specs */}
            <div className="pt-8 border-t border-[#E8DFD5] grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <div className="text-2xl font-bold text-[#0B318F] font-serif">100%</div>
                <div className="text-xs text-[#6E6862]">천연 텐실 & 오가닉 염재</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#0B318F] font-serif">FREE</div>
                <div className="text-xs text-[#6E6862]">7만원 이상 무료배송</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#0B318F] font-serif">HANDMADE</div>
                <div className="text-xs text-[#6E6862]">아틀리에 수작업 발색</div>
              </div>
            </div>
          </div>

          {/* Right Hero Image Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
              <img
                src="/assets/images/hero.png"
                alt="바더만 자연염색 스카프 비주얼"
                className="w-full h-[420px] sm:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white p-5 rounded-xl bg-[#0B318F]/80 backdrop-blur-md border border-white/20 text-left">
                <span className="text-xs font-bold text-[#D0B579] uppercase tracking-wider block mb-1">
                  VATHEMAN ATELIER
                </span>
                <p className="text-sm font-semibold text-white">
                  제주 풋감 손염색과 햇빛 발색이 만드는 롱텐실 스카프
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
