import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, BarChart3, ArrowLeft, ShieldCheck, Bell, Search, UserCheck, ChevronRight, ExternalLink, ShoppingBag 
} from 'lucide-react';
import DashboardTab from './DashboardTab';
import CustomerTab from './CustomerTab';
import ReportsTab from './ReportsTab';
import { BRAND_INFO } from '../data/dummyData';

export default function AdminLayout({ onNavigateHome }) {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'customers' | 'reports'

  const menuItems = [
    {
      id: 'dashboard',
      label: '대시보드',
      icon: <LayoutDashboard size={18} />,
      desc: '실시간 등록, 지표 & 등급분포'
    },
    {
      id: 'customers',
      label: '고객관리',
      icon: <Users size={18} />,
      desc: '5대 조건 필터링 & 명단'
    },
    {
      id: 'reports',
      label: '통계/리포트',
      icon: <BarChart3 size={18} />,
      desc: '매출, 카테고리 & 채널 분석'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex flex-col md:flex-row text-left">
      {/* Left Sidebar */}
      <aside className="w-full md:w-64 bg-[#2C2825] text-[#E8DFD5] flex flex-col justify-between shrink-0 border-r border-[#3B3632]">
        <div>
          {/* Admin Header / Logo */}
          <div className="p-6 border-b border-[#3B3632]">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C47B59] animate-ping" />
              <span className="text-xs font-bold text-[#C47B59] tracking-widest uppercase">
                ADMIN SYSTEM
              </span>
            </div>
            <div className="h-8 overflow-hidden relative flex items-center my-1 w-28">
              <img 
                src="/assets/images/logo-blue.png" 
                alt="VATHEMAN" 
                className="h-[170%] w-auto object-cover object-top" 
                style={{ filter: 'invert(1) grayscale(1) brightness(2)', mixBlendMode: 'screen' }}
              />
            </div>
            <p className="text-[11px] text-[#A0AAB2]">바더만 고객 & 브랜드 통합 관리자</p>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-2">
            <span className="text-[10px] font-bold text-[#6E6862] tracking-wider uppercase px-3 block mb-2">
              MAIN MENU
            </span>

            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all ${
                  activeTab === item.id
                    ? 'bg-[#8C533E] text-white font-bold shadow-md'
                    : 'text-[#A0AAB2] hover:bg-[#3B3632] hover:text-white font-medium'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <div>
                    <span className="text-sm block">{item.label}</span>
                    <span className={`text-[10px] font-light block ${activeTab === item.id ? 'text-[#FAF6F0]' : 'text-[#6E6862]'}`}>
                      {item.desc}
                    </span>
                  </div>
                </div>
                <ChevronRight size={14} className={activeTab === item.id ? 'opacity-100' : 'opacity-40'} />
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom Switcher & Shop All Direct Link */}
        <div className="p-4 border-t border-[#3B3632] space-y-2">
          {/* vatheman.com/shop_all button */}
          <a
            href={BRAND_INFO.shopAllUrl || "https://vatheman.com/shop_all"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-xl bg-[#C47B59] hover:bg-[#A35C3A] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm border border-[#D98E6C]"
          >
            <ShoppingBag size={15} />
            <span>자사몰 바로가기 (/shop_all)</span>
            <ExternalLink size={12} />
          </a>

          <button
            onClick={onNavigateHome}
            className="w-full py-2.5 rounded-xl bg-[#3B3632] hover:bg-[#4E4742] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-[#524B46]"
          >
            <ArrowLeft size={15} />
            <span>홈페이지 메인 이동</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-[#E8DFD5] px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck size={22} className="text-[#8C533E]" />
            <div>
              <h2 className="text-lg font-bold font-serif text-[#2C2825]">
                {menuItems.find(m => m.id === activeTab)?.label} 모듈
              </h2>
              <span className="text-xs text-[#6E6862] font-light">
                접속 경로: /admin &gt; {menuItems.find(m => m.id === activeTab)?.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* 자사몰 직통 링크 버튼 (vatheman.com/shop_all) */}
            <a
              href={BRAND_INFO.shopAllUrl || "https://vatheman.com/shop_all"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-[#FEF3EB] hover:bg-[#8C533E] text-[#8C533E] hover:text-white border border-[#FAD1B8] text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <ShoppingBag size={14} />
              <span className="hidden md:inline">자사몰 바로가기:</span>
              <span>vatheman.com/shop_all</span>
              <ExternalLink size={12} />
            </a>

            <div className="relative hidden lg:block">
              <Search size={14} className="absolute left-3 top-2.5 text-[#A0AAB2]" />
              <input
                type="text"
                placeholder="통합 관리 검색..."
                className="pl-8 pr-4 py-1.5 rounded-full border border-[#E8DFD5] text-xs bg-[#FAF6F0] focus:outline-none focus:border-[#8C533E] w-44"
              />
            </div>

            <div className="flex items-center gap-3 pl-3 border-l border-[#E8DFD5]">
              <div className="w-8 h-8 rounded-full bg-[#8C533E] text-white flex items-center justify-center text-xs font-bold font-serif">
                V
              </div>
              <div className="hidden sm:block text-xs">
                <span className="font-bold text-[#2C2825] block">바더만 총괄관리자</span>
                <span className="text-[10px] text-[#7A8B7B] font-semibold">최고 권한 계정</span>
              </div>
            </div>
          </div>
        </header>

        {/* Viewport Content */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
          {activeTab === 'dashboard' && <DashboardTab onNavigateTab={setActiveTab} />}
          {activeTab === 'customers' && <CustomerTab />}
          {activeTab === 'reports' && <ReportsTab />}
        </div>
      </main>
    </div>
  );
}
