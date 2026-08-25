import React, { useState } from 'react';
import { 
  BarChart3, Download, Calendar, TrendingUp, ShoppingBag, PieChart as PieIcon, ExternalLink, Check 
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, BarChart, Bar, Legend 
} from 'recharts';
import { 
  SALES_TREND_DATA, CATEGORY_STATISTICS, BRAND_INFO 
} from '../data/dummyData';

export default function ReportsTab() {
  const [period, setPeriod] = useState('monthly');
  const [exportNotice, setExportNotice] = useState(false);

  const handleExportReport = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 2500);
  };

  const channelData = [
    { channel: "네이버 스마트스토어", revenue: 8750, share: "52%", color: "#03C75A" },
    { channel: "바더만 공식 자사몰", revenue: 7800, share: "48%", color: "#C47B59" }
  ];

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Top Header & Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E8DFD5] shadow-xs">
        <div>
          <h3 className="text-xl font-bold font-serif text-[#2C2825] flex items-center gap-2">
            <BarChart3 className="text-[#8C533E]" size={22} /> 바더만 통계 & 분석 리포트
          </h3>
          <p className="text-xs text-[#6E6862] font-light">
            스마트스토어와 자사몰 통합 판매 및 매출 실적 분석 데이터
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Period Selector */}
          <div className="bg-[#FAF6F0] p-1 rounded-xl border border-[#E8DFD5] flex text-xs font-semibold">
            <button
              onClick={() => setPeriod('monthly')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${period === 'monthly' ? 'bg-[#8C533E] text-white shadow-xs' : 'text-[#6E6862]'}`}
            >
              월별 분석
            </button>
            <button
              onClick={() => setPeriod('quarterly')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${period === 'quarterly' ? 'bg-[#8C533E] text-white shadow-xs' : 'text-[#6E6862]'}`}
            >
              분기별
            </button>
          </div>

          {/* Export Report CSV Button */}
          <button
            onClick={handleExportReport}
            className="px-4 py-2.5 rounded-xl bg-[#2C2825] hover:bg-[#1A1816] text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-sm"
          >
            <Download size={14} />
            <span>리포트 다운로드 (CSV)</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-4 rounded-xl bg-[#E6F4EA] border border-[#B7E1CD] text-[#137333] text-xs font-bold flex items-center gap-2 animate-fade-in">
          <Check size={18} />
          <span>[바더만_202607_통계리포트.csv] 파일 생성이 완료되어 다운로드 디렉토리에 저장되었습니다!</span>
        </div>
      )}

      {/* Row 1: Revenue & Order Trend Area Chart */}
      <div className="warm-card p-6 bg-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-base font-bold text-[#2C2825]">월별 누적 매출액 & 주문건수 추이</h4>
            <p className="text-xs text-[#6E6862] font-light">단위: 만원 (매출액)</p>
          </div>
          <span className="text-xs font-bold text-[#8C533E] bg-[#FEF3EB] px-3 py-1 rounded-full border border-[#FAD1B8]">
            당월 최고 매출 3,890만원 달성
          </span>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SALES_TREND_DATA}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C47B59" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#C47B59" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5F0E6" />
              <XAxis dataKey="month" stroke="#6E6862" fontSize={12} />
              <YAxis stroke="#6E6862" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FAF6F0', borderRadius: '10px', border: '1px solid #E8DFD5', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="매출액" stroke="#C47B59" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Category Breakdown & Channel Sales Share */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Breakdown */}
        <div className="lg:col-span-6 warm-card p-6 bg-white">
          <h4 className="text-base font-bold text-[#2C2825] mb-2">카테고리별 매출 비중</h4>
          <p className="text-xs text-[#6E6862] font-light mb-6">
            스카프/악세서리 및 침구류 카테고리의 견고한 판매 비중
          </p>

          <div className="h-60 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_STATISTICS}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CATEGORY_STATISTICS.map((cat, i) => (
                    <Cell key={`cat-${i}`} fill={cat.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FAF6F0', borderRadius: '8px', border: '1px solid #E8DFD5', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E8DFD5]">
            {CATEGORY_STATISTICS.map((cat, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-[#FAF6F0]/60 border border-[#E8DFD5] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="font-semibold text-[#2C2825]">{cat.name}</span>
                </div>
                <span className="font-bold text-[#8C533E] font-serif">{cat.value}% ({cat.amount})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Share (Smartstore vs Direct) */}
        <div className="lg:col-span-6 warm-card p-6 bg-white flex flex-col justify-between">
          <div>
            <h4 className="text-base font-bold text-[#2C2825] mb-2">판매 채널별 매출 분포</h4>
            <p className="text-xs text-[#6E6862] font-light mb-6">
              네이버 스마트스토어와 바더만 브랜드 자사몰 비중 분석
            </p>

            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SALES_TREND_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F5F0E6" />
                  <XAxis dataKey="month" stroke="#6E6862" fontSize={11} />
                  <YAxis stroke="#6E6862" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FAF6F0', borderRadius: '8px', border: '1px solid #E8DFD5', fontSize: '12px' }}
                  />
                  <Legend />
                  <Bar dataKey="스마트스토어" fill="#03C75A" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="자사몰" fill="#C47B59" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
            {/* 자사몰 버튼 */}
            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <span className="text-[#6E6862] font-semibold whitespace-nowrap shrink-0">자사몰 바로가기:</span>
              <a
                href="https://vatheman.com/shop_all"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#C47B59] hover:bg-[#8C533E] text-white font-bold transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <span>vatheman.com/shop_all</span>
                <ExternalLink size={13} />
              </a>
            </div>

            {/* 스마트스토어 버튼 */}
            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <span className="text-[#6E6862] font-semibold whitespace-nowrap shrink-0">스마트스토어 연동:</span>
              <a
                href={BRAND_INFO.smartstoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#03C75A] hover:bg-[#02b351] text-white font-bold transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <span>smartstore.naver.com/vatheman</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
