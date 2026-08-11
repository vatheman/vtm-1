import React from 'react';
import { Users, DollarSign, ShoppingBag, UserPlus, TrendingUp, Clock, ArrowUpRight } from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell 
} from 'recharts';
import { 
  CUSTOMERS_DATA, REALTIME_REGISTRATIONS, SALES_TREND_DATA, TIER_DISTRIBUTION 
} from '../data/dummyData';

export default function DashboardTab({ onNavigateTab }) {
  const totalCustomers = 1280;
  const totalRevenue = "38,900,000원";
  const totalOrders = 265;
  const avgOrderValue = "146,700원";

  const newCustomers = CUSTOMERS_DATA.filter(c => c.status === '신규' || c.registeredAt.startsWith('2026-07'));

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="warm-card p-6 bg-white flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6E6862] block mb-1">전체 고객 수</span>
            <h3 className="text-2xl font-bold text-[#2C2825] font-serif">{totalCustomers.toLocaleString()} 명</h3>
            <span className="text-[11px] text-[#C47B59] font-medium flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> 전월 대비 +14.2% 증가
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] text-[#8C533E] flex items-center justify-center">
            <Users size={22} />
          </div>
        </div>

        <div className="warm-card p-6 bg-white flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6E6862] block mb-1">누적 매출액</span>
            <h3 className="text-2xl font-bold text-[#8C533E] font-serif">{totalRevenue}</h3>
            <span className="text-[11px] text-[#C47B59] font-medium flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> 전월 대비 +22.8% 증가
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FEF3EB] border border-[#FAD1B8] text-[#C47B59] flex items-center justify-center">
            <DollarSign size={22} />
          </div>
        </div>

        <div className="warm-card p-6 bg-white flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6E6862] block mb-1">총 거래 건수</span>
            <h3 className="text-2xl font-bold text-[#2C2825] font-serif">{totalOrders.toLocaleString()} 건</h3>
            <span className="text-[11px] text-[#C47B59] font-medium flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> 당월 목표 달성률 112%
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] text-[#2A3B50] flex items-center justify-center">
            <ShoppingBag size={22} />
          </div>
        </div>

        <div className="warm-card p-6 bg-white flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6E6862] block mb-1">평균 주문 금액</span>
            <h3 className="text-2xl font-bold text-[#2C2825] font-serif">{avgOrderValue}</h3>
            <span className="text-[11px] text-[#7A8B7B] font-medium flex items-center gap-1 mt-1">
              ✓ 세트 및 대량구매 증가
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] text-[#7A8B7B] flex items-center justify-center">
            <UserPlus size={22} />
          </div>
        </div>
      </div>

      {/* Row 2: Realtime Registration & Customer Tier Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Real-time Customer Feed & Trend Graph */}
        <div className="lg:col-span-7 warm-card p-6 bg-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-[#2C2825] flex items-center gap-2">
                <Clock size={18} className="text-[#C47B59]" /> 실시간 고객 등록 현황
              </h3>
              <p className="text-xs text-[#6E6862] font-light">
                자사몰 및 네이버 스마트스토어를 통해 신규 등록된 고객 피드
              </p>
            </div>
            <span className="text-[11px] bg-[#FEF3EB] text-[#C47B59] font-bold px-2.5 py-1 rounded-full border border-[#FAD1B8]">
              LIVE Feed
            </span>
          </div>

          <div className="space-y-3 mb-6">
            {REALTIME_REGISTRATIONS.map((reg) => (
              <div key={reg.id} className="p-3 rounded-xl bg-[#FAF6F0]/60 border border-[#E8DFD5] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#8C533E] text-white flex items-center justify-center text-xs font-bold font-serif">
                    {reg.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#2C2825]">{reg.name}</span>
                      <span className="text-[10px] text-[#6E6862]">({reg.email})</span>
                    </div>
                    <span className="text-[11px] text-[#8C533E] font-medium">{reg.action}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#6E6862] block">{reg.time}</span>
                  <span className={`badge-tier badge-${reg.tier.toLowerCase()}`}>{reg.tier}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Registration Trend Mini Line Chart */}
          <div className="pt-4 border-t border-[#E8DFD5]">
            <span className="text-xs font-bold text-[#2C2825] block mb-2">월별 신규 가입자 추이 (명)</span>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={SALES_TREND_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F5F0E6" />
                  <XAxis dataKey="month" stroke="#6E6862" fontSize={11} />
                  <YAxis stroke="#6E6862" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FAF6F0', borderRadius: '8px', border: '1px solid #E8DFD5', fontSize: '12px' }}
                  />
                  <Line type="monotone" dataKey="주문건수" stroke="#C47B59" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Customer Tier Distribution */}
        <div className="lg:col-span-5 warm-card p-6 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#2C2825]">고객 등급별 분포</h3>
              <button 
                onClick={() => onNavigateTab('customers')}
                className="text-xs text-[#8C533E] hover:underline flex items-center gap-1 font-medium"
              >
                고객 목록 보기 <ArrowUpRight size={12} />
              </button>
            </div>
            <p className="text-xs text-[#6E6862] font-light mb-6">
              누적 구매 금액 기준 5단계 브랜드 멤버십 분포
            </p>

            <div className="h-56 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={TIER_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="count"
                  >
                    {TIER_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FAF6F0', borderRadius: '8px', border: '1px solid #E8DFD5', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-bold font-serif text-[#2C2825]">1,280</span>
                <span className="text-[10px] text-[#6E6862]">전체 고객</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#E8DFD5]">
            {TIER_DISTRIBUTION.map((tier, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tier.color }} />
                  <span className="font-medium text-[#2C2825]">{tier.name}</span>
                </div>
                <span className="font-bold text-[#8C533E]">{tier.count}명 ({tier.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: New Customer List Table */}
      <div className="warm-card p-6 bg-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-[#2C2825]">최근 신규 고객 목록</h3>
            <p className="text-xs text-[#6E6862] font-light">
              최근 30일 이내 바더만 브랜드를 방문하여 가입한 신규 회원 목록
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('customers')}
            className="px-3.5 py-1.5 rounded-lg bg-[#FAF6F0] text-[#8C533E] hover:bg-[#8C533E] hover:text-white border border-[#E8DFD5] text-xs font-semibold transition-colors"
          >
            고객 세부 관리로 이동
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF6F0] text-[#8C533E] border-y border-[#E8DFD5]">
              <tr>
                <th className="py-3 px-4 font-bold">고객ID</th>
                <th className="py-3 px-4 font-bold">이름</th>
                <th className="py-3 px-4 font-bold">성별/연령</th>
                <th className="py-3 px-4 font-bold">등급</th>
                <th className="py-3 px-4 font-bold">구매횟수</th>
                <th className="py-3 px-4 font-bold">누적구매액</th>
                <th className="py-3 px-4 font-bold">가입일자</th>
                <th className="py-3 px-4 font-bold">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD5]/60">
              {newCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-[#FAF6F0]/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-[#2A3B50]">{cust.id}</td>
                  <td className="py-3 px-4 font-bold text-[#2C2825]">{cust.name}</td>
                  <td className="py-3 px-4 text-[#6E6862]">{cust.gender} / {cust.ageGroup}</td>
                  <td className="py-3 px-4">
                    <span className={`badge-tier badge-${cust.tier.toLowerCase()}`}>{cust.tier}</span>
                  </td>
                  <td className="py-3 px-4 font-serif font-bold text-[#2C2825]">{cust.purchaseCount}회</td>
                  <td className="py-3 px-4 font-serif font-bold text-[#8C533E]">{cust.totalAmount.toLocaleString()}원</td>
                  <td className="py-3 px-4 text-[#6E6862]">{cust.registeredAt}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F4EA] text-[#137333]">
                      {cust.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
