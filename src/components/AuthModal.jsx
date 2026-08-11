import React, { useState } from 'react';
import { X, Mail, Lock, User, Sparkles, ArrowRight, Shield } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [noticeMsg, setNoticeMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setNoticeMsg("⚡ 수파베이스(Supabase) 백엔드 연동 버튼 클릭됨. (실제 데이터베이스 연결을 준비 중입니다)");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl border border-[#E8DFD5] relative text-left">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#6E6862] hover:text-[#2C2825] rounded-full hover:bg-[#FAF6F0]"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6 flex flex-col items-center">
          <div className="h-10 overflow-hidden relative flex items-center justify-center mb-2 w-32">
            <img 
              src="/assets/images/logo-blue.png" 
              alt="VATHEMAN" 
              className="h-[170%] w-auto object-cover object-top" 
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>
          <span className="text-[11px] text-[#C47B59] font-medium tracking-widest block mb-3">
            자연빛깔 바더만 멤버십
          </span>

          {/* Supabase Notice Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3EB] border border-[#FAD1B8] text-[#8C533E] text-[11px] font-semibold">
            <Shield size={12} />
            <span>Supabase Auth 연동 준비단계</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#E8DFD5] mb-6">
          <button
            onClick={() => { setTab('login'); setNoticeMsg(''); }}
            className={`flex-1 py-2.5 text-center text-sm font-semibold transition-colors border-b-2 ${
              tab === 'login'
                ? 'border-[#8C533E] text-[#8C533E]'
                : 'border-transparent text-[#6E6862] hover:text-[#2C2825]'
            }`}
          >
            로그인
          </button>
          <button
            onClick={() => { setTab('register'); setNoticeMsg(''); }}
            className={`flex-1 py-2.5 text-center text-sm font-semibold transition-colors border-b-2 ${
              tab === 'register'
                ? 'border-[#8C533E] text-[#8C533E]'
                : 'border-transparent text-[#6E6862] hover:text-[#2C2825]'
            }`}
          >
            회원가입
          </button>
        </div>

        {noticeMsg && (
          <div className="mb-4 p-3 rounded-lg bg-[#FAF6F0] border border-[#E8DFD5] text-xs text-[#8C533E] font-medium animate-fade-in">
            {noticeMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-[#2C2825] mb-1">이름</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-3 text-[#A0AAB2]" />
                <input
                  type="text"
                  placeholder="홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8DFD5] text-xs focus:outline-none focus:border-[#8C533E] bg-[#FAF6F0]/50"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#2C2825] mb-1">이메일 주소</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-3 text-[#A0AAB2]" />
              <input
                type="email"
                placeholder="vatheman@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8DFD5] text-xs focus:outline-none focus:border-[#8C533E] bg-[#FAF6F0]/50"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2C2825] mb-1">비밀번호</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3 text-[#A0AAB2]" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8DFD5] text-xs focus:outline-none focus:border-[#8C533E] bg-[#FAF6F0]/50"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#8C533E] hover:bg-[#72402E] text-white font-medium text-sm transition-colors shadow-md flex items-center justify-center gap-2 mt-2"
          >
            <span>{tab === 'login' ? '로그인 하기' : '회원가입 완료'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Easy Social Login Placeholder */}
        <div className="mt-6 pt-6 border-t border-[#E8DFD5] text-center">
          <span className="text-[11px] text-[#A0AAB2] block mb-3">소셜 계정 간편 간편 연결</span>
          <div className="flex gap-2">
            <button
              onClick={() => setNoticeMsg("네이버 소셜 로그인 (Supabase OAuth 2.0 연동 준비)")}
              className="flex-1 py-2 rounded-lg bg-[#03C75A] text-white text-xs font-bold hover:opacity-90"
            >
              네이버
            </button>
            <button
              onClick={() => setNoticeMsg("카카오 소셜 로그인 (Supabase OAuth 2.0 연동 준비)")}
              className="flex-1 py-2 rounded-lg bg-[#FEE500] text-[#191919] text-xs font-bold hover:opacity-90"
            >
              카카오
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
