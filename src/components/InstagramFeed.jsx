import React, { memo } from 'react';
import { Instagram, Heart, MessageCircle, Star, Quote } from 'lucide-react';
import { INSTAGRAM_POSTS, BRAND_INFO } from '../data/dummyData';

export const InstagramFeed = memo(function InstagramFeed() {
  return (
    <section className="py-20 bg-[#FAF6F0] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C533E] bg-[#F5F0E6] px-3 py-1 rounded-full border border-[#E8DFD5] mb-3">
          <Instagram size={14} /> {BRAND_INFO.instagram}
        </div>
        <h2 className="text-3xl font-bold font-serif text-[#2C2825] mb-3">
          바더만 인스타그램 갤러리
        </h2>
        <p className="text-[#6E6862] text-sm font-light mb-12">
          아틀리에의 일상과 새로운 천연염색 작품의 순회 소식을 실시간으로 확인해보세요.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={BRAND_INFO.smartstoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group rounded-xl overflow-hidden aspect-square border border-[#E8DFD5] shadow-sm bg-white"
            >
              <img
                src={post.image}
                alt="Instagram post"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4">
                <div className="flex items-center gap-4 text-sm font-medium mb-2">
                  <span className="flex items-center gap-1"><Heart size={16} fill="white" /> {post.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle size={16} /> {post.comments}</span>
                </div>
                <span className="text-xs text-[#F5F0E6] text-center font-light">{post.tag}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
});

export const ReviewSection = memo(function ReviewSection() {
  const reviews = [
    {
      id: 1,
      author: "김*서 고객님 (스마트스토어 구매)",
      rating: 5,
      product: "자연빛깔 손염색 감나무 실크 스카프",
      content: "풋감 염색 특유의 짱짱하면서도 고급스러운 빛깔이 압권입니다. 어머니 생신 선물로 드렸는데 너무 귀품있다고 좋아하시네요!",
      date: "2026-07-25"
    },
    {
      id: 2,
      author: "이*진 고객님 (자사몰 구매)",
      rating: 5,
      product: "천연 쪽염색 오가닉 린넨 딥슬립 침구 세트",
      content: "쪽염색 특유의 은은한 향과 항균작용 덕분인지 아토피 피부인데도 자고 일어나면 피부가 뽀송합니다. 평생 쓸 침구 세트예요.",
      date: "2026-07-20"
    },
    {
      id: 3,
      author: "정*진 고객님 (스마트스토어 구매)",
      rating: 5,
      product: "핸드메이드 쑥염 린넨 감성 앞치마",
      content: "은쑥색 색감이 실물이 훨씬 예쁩니다! 원단도 튼튼하고 주방에서 요리할 때 기분이 싱그러워집니다.",
      date: "2026-07-14"
    }
  ];

  return (
    <section id="reviews" className="py-20 bg-[#FDFBF7] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-semibold tracking-widest text-[#C47B59] uppercase block mb-2">
          Customer Stories
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#2C2825] mb-4">
          바더만과 함께한 특별한 후기
        </h2>
        <p className="text-[#6E6862] text-sm font-light mb-14">
          실제 네이버 스마트스토어와 공식 홈페이지를 이용해주신 고객님들의 진솔한 평점과 이야기입니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div key={rev.id} className="warm-card p-8 text-left bg-white relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#D9A05B]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#D9A05B" />
                    ))}
                  </div>
                  <Quote size={24} className="text-[#E8DFD5]" />
                </div>
                <p className="text-xs text-[#8C533E] font-medium mb-2">{rev.product}</p>
                <p className="text-sm text-[#2C2825] leading-relaxed font-light mb-6">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8DFD5] flex items-center justify-between text-xs text-[#6E6862]">
                <span className="font-semibold text-[#2C2825]">{rev.author}</span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
