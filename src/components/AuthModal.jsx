import React, { useState } from 'react';
import { X, Mail, Lock, Shield, ArrowRight } from 'lucide-react';
import SignUp from './SignUp';
import { supabase } from '../lib/supabaseClient';

export default function AuthModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [noticeMsg, setNoticeMsg] = useState({ type: '', text: '' });

  if (!isOpen) return null;

  if (tab === 'register') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto my-6">
        <SignUp
          onSwitchToLogin={() => setTab('login')}
          onClose={onClose}
        />
      </div>
    );
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNoticeMsg({ type: '', text: '' });

    try {
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
      }
      setNoticeMsg({ type: 'success', text: '🎉 로그인 성공! 환영합니다.' });
      setTimeout(() => {
        if (onClose) onClose();
      }, 1200);
    } catch (err) {
      setNoticeMsg({ type: 'error', text: err.message || '로그인에 실패했습니다. 이메일과 비밀번호를 확인해 주세요.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E8DFD5] relative text-left">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 font-bold transition-colors"
        >
          ✕
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
          <span className="text-[11px] text-[#C47B59] font-medium tracking-widest block mb-2">
            자연빛깔 바더만 멤버십
          </span>

          {/* Supabase Notice Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
            <Shield size={12} />
            <span>⚡ Supabase 백엔드 가동 중</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#E8DFD5] mb-6">
          <button
            onClick={() => { setTab('login'); setNoticeMsg({ type: '', text: '' }); }}
            className={`flex-1 py-2.5 text-center text-xs font-bold transition-colors border-b-2 ${
              tab === 'login'
                ? 'border-[#0B318F] text-[#0B318F]'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            로그인
          </button>
          <button
            onClick={() => { setTab('register'); setNoticeMsg({ type: '', text: '' }); }}
            className={`flex-1 py-2.5 text-center text-xs font-bold transition-colors border-b-2 ${
              tab === 'register'
                ? 'border-[#0B318F] text-[#0B318F]'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            회원가입
          </button>
        </div>

        {noticeMsg.text && (
          <div className={`mb-4 p-3 rounded-xl text-xs font-medium ${
            noticeMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}>
            {noticeMsg.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#2C2825] mb-1.5">이메일 주소</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="vatheman@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E8DFD5] text-xs focus:outline-none focus:border-[#0B318F]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2C2825] mb-1.5">비밀번호</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E8DFD5] text-xs focus:outline-none focus:border-[#0B318F]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#0B318F] hover:bg-[#082672] text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 mt-2"
          >
            <span>{loading ? '로그인 중...' : '바더만 로그인하기'}</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

