import React from 'react';
import { Leaf, Sun, HeartHandshake, Award, Clock } from 'lucide-react';
import { HISTORY_TIMELINE } from '../data/dummyData';

export default function BrandStory() {
  const pillars = [
    {
      icon: <Leaf className="text-[#0B318F]" size={28} />,
      title: "100% 오가닉 텐실 소재",
      desc: "피부에 닿았을 때 자극 없이 미끄러지듯 부드러운 100% 텐실(Tencel) 원사를 엄선하여 만듭니다."
    },
    {
      icon: <Sun className="text-[#D0B579]" size={28} />,
      title: "풋감·쪽·쑥·황토 천연염재",
      desc: "인공 화학염료 대신 풋감, 쪽, 강화 쑥, 보성 황토 등 자연에서 수확한 고유의 염재로 단아한 빛깔을 입힙니다."
    },
    {
      icon: <HeartHandshake className="text-[#0B318F]" size={28} />,
      title: "바른 가치의 핸드메이드",
      desc: "경기도일자리재단 입주 아틀리에에서 장인의 손길로 조색부터 햇볕 발색까지 정성을 담아 선물합니다."
    }
  ];

  return (
    <div id="about">
      {/* BRAND Section */}
      <section id="about-brand" className="py-20 bg-[#FDFBF7] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold tracking-widest text-[#0B318F] uppercase block mb-2">
            ABOUT VATHEMAN
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#2C2825] mb-4">
            자연이 건넨 깊은 빛깔, 사람의 정성
          </h2>
          <p className="text-[#6E6862] text-sm sm:text-base max-w-2xl mx-auto font-light mb-14">
            '바른 가치를 더해 만드는 선물'을 지향하는 바더만은 자연소재와 전통 염색 기법을 현대적 생활용품으로 탄생시킵니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((item, idx) => (
              <div key={idx} className="warm-card p-8 text-left bg-white relative group">
                <div className="w-14 h-14 rounded-2xl bg-[#FAF6F0] border border-[#E8DFD5] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2C2825] mb-3">{item.title}</h3>
                <p className="text-sm text-[#6E6862] leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HISTORY Section */}
      <section id="about-history" className="py-16 bg-[#FAF6F0] border-b border-[#E8DFD5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-semibold tracking-widest text-[#D0B579] uppercase block mb-2">
            BRAND HISTORY
          </span>
          <h3 className="text-2xl font-bold font-serif text-[#2C2825] mb-8">
            바더만이 걸어온 발자취
          </h3>

          <div className="space-y-4 text-left">
            {HISTORY_TIMELINE.map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white border border-[#E8DFD5] flex items-center gap-4 shadow-xs">
                <span className="px-3 py-1 rounded-lg bg-[#0B318F] text-white text-xs font-bold font-serif shrink-0">
                  {item.year}
                </span>
                <span className="text-sm font-semibold text-[#2C2825]">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
