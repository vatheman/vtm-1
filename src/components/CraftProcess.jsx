import React, { memo } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const CraftProcess = memo(function CraftProcess() {
  const steps = [
    { num: "01", title: "천연 염재 추출 & 발효", desc: "청정 자연에서 수확한 풋감, 쪽, 쑥 등을 아틀리에 고유 방식으로 발효/수액 추출" },
    { num: "02", title: "원단 수작업 다듬기", desc: "100% 오가닉 린넨 및 실크 원사를 천연 성분으로 불순물 세척 후 염색 준비" },
    { num: "03", title: "손염색 & 햇빛 발색", desc: "여러 번 담그고 말리는 과정을 반복하여 깊이 있고 아늑한 자연빛깔 형성" },
    { num: "04", title: "핸드메이드 재단 & 봉제", desc: "전문 장인의 손길로 마감 및 친환경 패키징 후 고객님께 배송" }
  ];

  return (
    <section id="craft" className="py-20 bg-[#F5F0E6] border-b border-[#E8DFD5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image Side */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="/assets/images/craft.png"
                alt="자연염색 공정 장인손길"
                loading="lazy"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute top-4 right-4 bg-[#8C533E] text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5">
                <Sparkles size={14} /> Artisanal Craft
              </div>
            </div>
          </div>

          {/* Text & Steps Side */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#C47B59] uppercase block mb-2">
                Craftsmanship & Process
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#2C2825] mb-4">
                시간과 햇살이 만드는 자연염색의 과정
              </h2>
              <p className="text-[#6E6862] text-sm sm:text-base font-light">
                화학 염료로는 결코 흉내 낼 수 없는 오가닉 천연염색은 자연과의 호흡 속에서 비로소 완성됩니다.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps.map((step, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-[#E8DFD5] shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF6F0] border border-[#E8DFD5] text-[#8C533E] font-bold text-sm flex items-center justify-center shrink-0 font-serif">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#2C2825] mb-1">{step.title}</h4>
                    <p className="text-xs text-[#6E6862] leading-relaxed font-light">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] flex items-center gap-3 text-xs text-[#8C533E] font-medium">
              <CheckCircle2 size={18} className="text-[#C47B59] shrink-0" />
              <span>모든 제품은 피부 자극이 없으며, 은은한 항균·소취 기능이 자연 유지됩니다.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default CraftProcess;
