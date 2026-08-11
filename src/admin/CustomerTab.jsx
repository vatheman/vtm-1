import React, { useState, useMemo } from 'react';
import { 
  Users, DollarSign, Award, Gift, Search, Filter, RefreshCw, Eye, PlusCircle, ArrowUpDown 
} from 'lucide-react';
import { CUSTOMERS_DATA } from '../data/dummyData';
import { PointGrantModal, CustomerDetailModal } from './PointGrantModal';

export default function CustomerTab() {
  const [customers, setCustomers] = useState(CUSTOMERS_DATA);

  // 5 Filter States requested by User: 성별, 연령대, 고객등급, 구매빈도, 구매금액
  const [genderFilter, setGenderFilter] = useState('전체');
  const [ageFilter, setAgeFilter] = useState('전체');
  const [tierFilter, setTierFilter] = useState('전체');
  const [freqFilter, setFreqFilter] = useState('전체');
  const [amountFilter, setAmountFilter] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('totalAmount'); // 'totalAmount' | 'purchaseCount' | 'registeredAt'

  // Modals state
  const [selectedPointCustomer, setSelectedPointCustomer] = useState(null);
  const [selectedDetailCustomer, setSelectedDetailCustomer] = useState(null);

  // Point Grant handler
  const handleGrantPoints = (customerId, amount) => {
    setCustomers(prev =>
      prev.map(c => c.id === customerId ? { ...c, points: c.points + amount } : c)
    );
  };

  // Reset Filters
  const handleResetFilters = () => {
    setGenderFilter('전체');
    setAgeFilter('전체');
    setTierFilter('전체');
    setFreqFilter('전체');
    setAmountFilter('전체');
    setSearchQuery('');
  };

  // Filter Engine
  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      // 1. Gender Filter
      if (genderFilter !== '전체' && c.gender !== genderFilter) return false;

      // 2. Age Filter
      if (ageFilter !== '전체' && c.ageGroup !== ageFilter) return false;

      // 3. Tier Filter
      if (tierFilter !== '전체' && c.tier !== tierFilter) return false;

      // 4. Purchase Frequency Filter
      if (freqFilter === '1회' && c.purchaseCount !== 1) return false;
      if (freqFilter === '2-5회' && (c.purchaseCount < 2 || c.purchaseCount > 5)) return false;
      if (freqFilter === '6회 이상' && c.purchaseCount < 6) return false;

      // 5. Purchase Amount Filter
      if (amountFilter === '10만원 이하' && c.totalAmount > 100000) return false;
      if (amountFilter === '10만~30만원' && (c.totalAmount < 100000 || c.totalAmount > 300000)) return false;
      if (amountFilter === '30만~50만원' && (c.totalAmount < 300000 || c.totalAmount > 500000)) return false;
      if (amountFilter === '50만원 이상' && c.totalAmount < 500000) return false;

      // Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = c.name.toLowerCase().includes(q);
        const matchId = c.id.toLowerCase().includes(q);
        const matchPhone = c.phone.includes(q);
        const matchEmail = c.email.toLowerCase().includes(q);
        if (!matchName && !matchId && !matchPhone && !matchEmail) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'totalAmount') return b.totalAmount - a.totalAmount;
      if (sortBy === 'purchaseCount') return b.purchaseCount - a.purchaseCount;
      if (sortBy === 'registeredAt') return new Date(b.registeredAt) - new Date(a.registeredAt);
      return 0;
    });
  }, [customers, genderFilter, ageFilter, tierFilter, freqFilter, amountFilter, searchQuery, sortBy]);

  // Key Overview Aggregations
  const totalCustomerCount = customers.length;
  const totalCumulativeSales = customers.reduce((sum, c) => sum + c.totalAmount, 0);
  const totalPointsIssued = customers.reduce((sum, c) => sum + c.points, 0);

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="warm-card p-6 bg-white flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6E6862] block mb-1">전체 고객 수</span>
            <h3 className="text-2xl font-bold text-[#2C2825] font-serif">{totalCustomerCount} 명</h3>
            <span className="text-[11px] text-[#8C533E]">정품등록 및 자사몰 통합회원</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] text-[#8C533E] border border-[#E8DFD5] flex items-center justify-center">
            <Users size={22} />
          </div>
        </div>

        <div className="warm-card p-6 bg-white flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6E6862] block mb-1">누적 매출액</span>
            <h3 className="text-2xl font-bold text-[#8C533E] font-serif">
              {totalCumulativeSales.toLocaleString()}원
            </h3>
            <span className="text-[11px] text-[#C47B59]">고객 1인당 평균 {(totalCumulativeSales / totalCustomerCount).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FEF3EB] text-[#C47B59] border border-[#FAD1B8] flex items-center justify-center">
            <DollarSign size={22} />
          </div>
        </div>

        <div className="warm-card p-6 bg-white flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6E6862] block mb-1">총 지급 포인트 잔액</span>
            <h3 className="text-2xl font-bold text-[#2A3B50] font-serif">
              {totalPointsIssued.toLocaleString()} P
            </h3>
            <span className="text-[11px] text-[#7A8B7B]">구매 후기 및 등급 혜택 지급분</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] text-[#2A3B50] border border-[#E8DFD5] flex items-center justify-center">
            <Gift size={22} />
          </div>
        </div>
      </div>

      {/* 5 Filter Conditions Control Panel */}
      <div className="warm-card p-6 bg-white space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-4">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-[#8C533E]" />
            <h3 className="text-base font-bold text-[#2C2825]">고객 상세 필터링 조건</h3>
            <span className="text-xs text-[#8C533E] bg-[#FEF3EB] px-2.5 py-0.5 rounded-full font-semibold border border-[#FAD1B8]">
              {filteredCustomers.length}명 조회됨
            </span>
          </div>

          <button
            onClick={handleResetFilters}
            className="text-xs text-[#6E6862] hover:text-[#8C533E] flex items-center gap-1 font-medium transition-colors"
          >
            <RefreshCw size={12} /> 필터 초기화
          </button>
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* 1. 성별 */}
          <div>
            <label className="block text-[11px] font-bold text-[#6E6862] mb-1">성별</label>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#E8DFD5] text-xs bg-[#FAF6F0]/60 text-[#2C2825] focus:outline-none focus:border-[#8C533E]"
            >
              <option value="전체">성별 (전체)</option>
              <option value="여성">여성</option>
              <option value="남성">남성</option>
            </select>
          </div>

          {/* 2. 연령 */}
          <div>
            <label className="block text-[11px] font-bold text-[#6E6862] mb-1">연령대</label>
            <select
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#E8DFD5] text-xs bg-[#FAF6F0]/60 text-[#2C2825] focus:outline-none focus:border-[#8C533E]"
            >
              <option value="전체">연령대 (전체)</option>
              <option value="20대">20대</option>
              <option value="30대">30대</option>
              <option value="40대">40대</option>
              <option value="50대 이상">50대 이상</option>
            </select>
          </div>

          {/* 3. 고객등급 */}
          <div>
            <label className="block text-[11px] font-bold text-[#6E6862] mb-1">고객 등급</label>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#E8DFD5] text-xs bg-[#FAF6F0]/60 text-[#2C2825] focus:outline-none focus:border-[#8C533E]"
            >
              <option value="전체">고객등급 (전체)</option>
              <option value="VVIP">VVIP</option>
              <option value="VIP">VIP</option>
              <option value="GOLD">GOLD</option>
              <option value="SILVER">SILVER</option>
              <option value="BRONZE">BRONZE</option>
            </select>
          </div>

          {/* 4. 구매빈도 */}
          <div>
            <label className="block text-[11px] font-bold text-[#6E6862] mb-1">구매 빈도</label>
            <select
              value={freqFilter}
              onChange={(e) => setFreqFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#E8DFD5] text-xs bg-[#FAF6F0]/60 text-[#2C2825] focus:outline-none focus:border-[#8C533E]"
            >
              <option value="전체">구매빈도 (전체)</option>
              <option value="1회">1회 (신규 구매자)</option>
              <option value="2-5회">2~5회 (재구매 고객)</option>
              <option value="6회 이상">6회 이상 (단골 고객)</option>
            </select>
          </div>

          {/* 5. 구매금액 */}
          <div>
            <label className="block text-[11px] font-bold text-[#6E6862] mb-1">구매 금액 범위</label>
            <select
              value={amountFilter}
              onChange={(e) => setAmountFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#E8DFD5] text-xs bg-[#FAF6F0]/60 text-[#2C2825] focus:outline-none focus:border-[#8C533E]"
            >
              <option value="전체">구매금액 (전체)</option>
              <option value="10만원 이하">10만원 이하</option>
              <option value="10만~30만원">10만 ~ 30만원</option>
              <option value="30만~50만원">30만 ~ 50만원</option>
              <option value="50만원 이상">50만원 이상</option>
            </select>
          </div>
        </div>

        {/* Search Bar & Sorting */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-3 text-[#A0AAB2]" />
            <input
              type="text"
              placeholder="고객명, ID, 전화번호, 이메일 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8DFD5] text-xs focus:outline-none focus:border-[#8C533E]"
            />
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown size={14} className="text-[#8C533E]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-[#E8DFD5] text-xs bg-white text-[#2C2825] font-medium focus:outline-none"
            >
              <option value="totalAmount">누적 구매금액 높은순</option>
              <option value="purchaseCount">구매 빈도 높은순</option>
              <option value="registeredAt">최근 가입순</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer List Table */}
      <div className="warm-card p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-[#2C2825]">고객 명단 리스트</h3>
          <span className="text-xs text-[#6E6862]">
            총 {filteredCustomers.length}개의 데이터 표시 중
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF6F0] text-[#8C533E] border-y border-[#E8DFD5]">
              <tr>
                <th className="py-3 px-4 font-bold">고객 ID</th>
                <th className="py-3 px-4 font-bold">고객명</th>
                <th className="py-3 px-4 font-bold">성별/연령</th>
                <th className="py-3 px-4 font-bold">등급</th>
                <th className="py-3 px-4 font-bold">구매횟수</th>
                <th className="py-3 px-4 font-bold">누적구매액</th>
                <th className="py-3 px-4 font-bold">보유 포인트</th>
                <th className="py-3 px-4 font-bold">선호 염염</th>
                <th className="py-3 px-4 font-bold text-center">관리 액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD5]/60">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-[#6E6862]">
                    조건에 부합하는 고객 데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-[#FAF6F0]/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-[#2A3B50]">{cust.id}</td>
                    <td className="py-3.5 px-4 font-bold text-[#2C2825]">
                      <button 
                        onClick={() => setSelectedDetailCustomer(cust)}
                        className="hover:text-[#C47B59] hover:underline transition-colors"
                      >
                        {cust.name}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-[#6E6862]">{cust.gender} / {cust.ageGroup}</td>
                    <td className="py-3.5 px-4">
                      <span className={`badge-tier badge-${cust.tier.toLowerCase()}`}>{cust.tier}</span>
                    </td>
                    <td className="py-3.5 px-4 font-serif font-bold text-[#2C2825]">{cust.purchaseCount}회</td>
                    <td className="py-3.5 px-4 font-serif font-bold text-[#8C533E]">
                      {cust.totalAmount.toLocaleString()}원
                    </td>
                    <td className="py-3.5 px-4 font-serif font-bold text-[#C47B59]">
                      {cust.points.toLocaleString()} P
                    </td>
                    <td className="py-3.5 px-4 text-[#2A3B50] font-medium">{cust.preferredDye}</td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedPointCustomer(cust)}
                          className="px-2.5 py-1 rounded-md bg-[#FEF3EB] hover:bg-[#8C533E] text-[#8C533E] hover:text-white border border-[#FAD1B8] text-[11px] font-semibold transition-colors flex items-center gap-1"
                          title="포인트 지급"
                        >
                          <Gift size={12} /> 포인트
                        </button>

                        <button
                          onClick={() => setSelectedDetailCustomer(cust)}
                          className="p-1 rounded-md bg-[#FAF6F0] hover:bg-[#2C2825] text-[#6E6862] hover:text-white border border-[#E8DFD5] transition-colors"
                          title="상세 프로필"
                        >
                          <Eye size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <PointGrantModal
        customer={selectedPointCustomer}
        onClose={() => setSelectedPointCustomer(null)}
        onGrant={handleGrantPoints}
      />

      <CustomerDetailModal
        customer={selectedDetailCustomer}
        onClose={() => setSelectedDetailCustomer(null)}
      />
    </div>
  );
}
