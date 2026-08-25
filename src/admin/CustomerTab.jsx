import React, { useState, useMemo, useCallback } from 'react';
import { 
  Users, DollarSign, Award, Gift, Search, Filter, RefreshCw, Eye, PlusCircle, ArrowUpDown,
  Mail, MessageSquare, Smartphone, Send, CheckSquare, Square, Check, X
} from 'lucide-react';
import { CUSTOMERS_DATA } from '../data/dummyData';
import { PointGrantModal, CustomerDetailModal } from './PointGrantModal';
import { BatchMessageModal } from './BatchMessageModal';

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

  // Multi-Selection State
  const [selectedIds, setSelectedIds] = useState([]);

  // Modals & Batch Messaging State
  const [selectedPointCustomer, setSelectedPointCustomer] = useState(null);
  const [selectedDetailCustomer, setSelectedDetailCustomer] = useState(null);
  const [batchMsgState, setBatchMsgState] = useState({ isOpen: false, channel: 'kakao' });
  const [toastMsg, setToastMsg] = useState('');

  // Point Grant handler
  const handleGrantPoints = useCallback((customerId, amount) => {
    setCustomers(prev =>
      prev.map(c => c.id === customerId ? { ...c, points: c.points + amount } : c)
    );
  }, []);

  // Reset Filters
  const handleResetFilters = useCallback(() => {
    setGenderFilter('전체');
    setAgeFilter('전체');
    setTierFilter('전체');
    setFreqFilter('전체');
    setAmountFilter('전체');
    setSearchQuery('');
    setSelectedIds([]);
  }, []);

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

  // Checkbox Selection Logic
  const isAllFilteredSelected = useMemo(() => {
    return filteredCustomers.length > 0 && filteredCustomers.every(c => selectedIds.includes(c.id));
  }, [filteredCustomers, selectedIds]);

  const toggleSelectAll = useCallback(() => {
    setSelectedIds(prev => {
      const allSelected = filteredCustomers.length > 0 && filteredCustomers.every(c => prev.includes(c.id));
      if (allSelected) {
        return prev.filter(id => !filteredCustomers.some(c => c.id === id));
      } else {
        const filteredIdList = filteredCustomers.map(c => c.id);
        return Array.from(new Set([...prev, ...filteredIdList]));
      }
    });
  }, [filteredCustomers]);

  const toggleSelectCustomer = useCallback((id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  // Get selected customers objects
  const selectedCustomerObjects = useMemo(() => {
    return customers.filter(c => selectedIds.includes(c.id));
  }, [customers, selectedIds]);

  // Open Batch Message Modal for channel
  const handleOpenBatchMsg = useCallback((channel) => {
    setBatchMsgState({ isOpen: true, channel });
  }, []);

  const handleMessageSuccess = useCallback(({ channel, count, title }) => {
    const channelNameMap = { kakao: '카카오 알림톡', sms: 'SMS 문자', email: '이메일' };
    setToastMsg(`🎉 ${count}명의 선택 고객에게 [${channelNameMap[channel]}] 발송 요청이 정상 완료되었습니다!`);
    setSelectedIds([]);
    setTimeout(() => setToastMsg(''), 4000);
  }, []);

  // Key Overview Aggregations
  const totalCustomerCount = useMemo(() => customers.length, [customers]);
  const totalCumulativeSales = useMemo(() => customers.reduce((sum, c) => sum + c.totalAmount, 0), [customers]);
  const totalPointsIssued = useMemo(() => customers.reduce((sum, c) => sum + c.points, 0), [customers]);

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Toast Banner */}
      {toastMsg && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-xl flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <Check size={18} />
            <span>{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg('')} className="p-1 hover:bg-emerald-700 rounded-lg">
            <X size={16} />
          </button>
        </div>
      )}

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
      <div className="warm-card p-6 bg-white space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#E8DFD5] pb-4 gap-3">
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

        {/* PERMANENTLY VISIBLE GROUP MESSAGING TOOLBAR FOR FILTERED CUSTOMERS */}
        <div className="p-4 rounded-2xl bg-[#0B318F] text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg border border-[#1542B3]">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-[#D0B579] text-[#2C2825] font-bold text-sm flex items-center justify-center font-serif shadow-sm">
              {selectedIds.length > 0 ? selectedIds.length : filteredCustomers.length}
            </span>
            <div>
              <span className="font-bold text-sm text-white flex items-center gap-2">
                <span>{selectedIds.length > 0 ? `선택된 ${selectedIds.length}명 고객 그룹` : `필터링된 ${filteredCustomers.length}명 고객 전체`}</span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md font-normal">
                  {selectedIds.length > 0 ? '체크박스 지정' : '조회조건 매칭'}
                </span>
              </span>
              <span className="text-[11px] text-white/80 font-light">
                아래 3가지 전송 채널 버튼을 눌러 메시지를 즉시 일괄 발송할 수 있습니다.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* 1. 카톡 알림톡 버튼 */}
            <button
              onClick={() => handleOpenBatchMsg('kakao')}
              disabled={filteredCustomers.length === 0}
              className="px-4 py-2.5 rounded-xl bg-[#FEE500] hover:bg-[#E6CE00] text-[#191919] text-xs font-bold shadow-md transition-all hover:scale-105 flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare size={16} className="text-[#3C1E1E]" />
              <span>카카오 알림톡 발송</span>
            </button>

            {/* 2. 문자메시지(SMS) 버튼 */}
            <button
              onClick={() => handleOpenBatchMsg('sms')}
              disabled={filteredCustomers.length === 0}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md transition-all hover:scale-105 flex items-center gap-1.5 cursor-pointer"
            >
              <Smartphone size={16} />
              <span>문자메시지(SMS) 발송</span>
            </button>

            {/* 3. 이메일 버튼 */}
            <button
              onClick={() => handleOpenBatchMsg('email')}
              disabled={filteredCustomers.length === 0}
              className="px-4 py-2.5 rounded-xl bg-[#D0B579] hover:bg-[#B89C60] text-[#2C2825] text-xs font-bold shadow-md transition-all hover:scale-105 flex items-center gap-1.5 cursor-pointer"
            >
              <Mail size={16} />
              <span>이메일(Email) 발송</span>
            </button>

            {selectedIds.length > 0 && (
              <button
                onClick={() => setSelectedIds([])}
                className="px-3 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition-colors ml-1"
              >
                선택 해제
              </button>
            )}
          </div>
        </div>

        {/* Search Bar & Sorting */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
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

      {/* BATCH ACTION CONTROLS BAR FOR SELECTED CUSTOMERS */}
      {selectedIds.length > 0 && (
        <div className="warm-card p-4 bg-[#0B318F] text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl border border-[#1542B3] animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#D0B579] text-[#2C2825] font-bold text-xs flex items-center justify-center font-serif">
              {selectedIds.length}
            </span>
            <div>
              <span className="font-bold text-sm text-white block">
                {selectedIds.length}명의 고객이 선택되었습니다
              </span>
              <span className="text-[11px] text-white/70 font-light">
                카카오톡, 문자(SMS), 이메일을 일괄 전송하거나 포인트를 지급할 수 있습니다.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* KakaoTalk Button */}
            <button
              onClick={() => handleOpenBatchMsg('kakao')}
              className="px-3.5 py-2 rounded-xl bg-[#FEE500] hover:bg-[#E6CE00] text-[#191919] text-xs font-bold shadow-md transition-transform hover:scale-105 flex items-center gap-1.5"
            >
              <MessageSquare size={14} className="text-[#3C1E1E]" />
              <span>카카오 알림톡 발송</span>
            </button>

            {/* SMS Button */}
            <button
              onClick={() => handleOpenBatchMsg('sms')}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md transition-transform hover:scale-105 flex items-center gap-1.5"
            >
              <Smartphone size={14} />
              <span>문자(SMS) 발송</span>
            </button>

            {/* Email Button */}
            <button
              onClick={() => handleOpenBatchMsg('email')}
              className="px-3.5 py-2 rounded-xl bg-[#D0B579] hover:bg-[#B89C60] text-[#2C2825] text-xs font-bold shadow-md transition-transform hover:scale-105 flex items-center gap-1.5"
            >
              <Mail size={14} />
              <span>이메일 발송</span>
            </button>

            {/* Clear Selection */}
            <button
              onClick={() => setSelectedIds([])}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
            >
              선택 해제
            </button>
          </div>
        </div>
      )}

      {/* Customer List Table */}
      <div className="warm-card p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-[#2C2825]">고객 명단 리스트</h3>
            {selectedIds.length > 0 && (
              <span className="text-xs text-[#0B318F] font-bold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                {selectedIds.length}명 선택 중
              </span>
            )}
          </div>
          <span className="text-xs text-[#6E6862]">
            총 {filteredCustomers.length}개의 데이터 표시 중
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF6F0] text-[#8C533E] border-y border-[#E8DFD5]">
              <tr>
                <th className="py-3 px-3 text-center w-10">
                  <input
                    type="checkbox"
                    checked={isAllFilteredSelected}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-[#0B318F] rounded border-gray-300 focus:ring-[#0B318F] cursor-pointer"
                    title="전체 선택 / 해제"
                  />
                </th>
                <th className="py-3 px-4 font-bold">고객 ID</th>
                <th className="py-3 px-4 font-bold">고객명</th>
                <th className="py-3 px-4 font-bold">성별/연령</th>
                <th className="py-3 px-4 font-bold">등급</th>
                <th className="py-3 px-4 font-bold">구매횟수</th>
                <th className="py-3 px-4 font-bold">누적구매액</th>
                <th className="py-3 px-4 font-bold">보유 포인트</th>
                <th className="py-3 px-4 font-bold">선호 염색</th>
                <th className="py-3 px-4 font-bold text-center">개별 액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD5]/60">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-12 text-[#6E6862]">
                    조건에 부합하는 고객 데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => {
                  const isSelected = selectedIds.includes(cust.id);
                  return (
                    <tr
                      key={cust.id}
                      className={`transition-colors ${
                        isSelected ? 'bg-[#FFFBE6] border-l-4 border-l-[#D0B579]' : 'hover:bg-[#FAF6F0]/50'
                      }`}
                    >
                      <td className="py-3.5 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectCustomer(cust.id)}
                          className="w-4 h-4 text-[#0B318F] rounded border-gray-300 focus:ring-[#0B318F] cursor-pointer"
                        />
                      </td>
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
                        <div className="flex items-center justify-center gap-1">
                          {/* Kakao Button */}
                          <button
                            onClick={() => {
                              setSelectedIds([cust.id]);
                              setBatchMsgState({ isOpen: true, channel: 'kakao' });
                            }}
                            className="px-2 py-1 rounded bg-[#FEE500] hover:bg-[#E6CE00] text-[#191919] text-[10px] font-bold transition-transform hover:scale-105 flex items-center gap-0.5 shadow-2xs"
                            title="카카오톡 알림톡 발송"
                          >
                            <MessageSquare size={10} /> 카톡
                          </button>

                          {/* SMS Button */}
                          <button
                            onClick={() => {
                              setSelectedIds([cust.id]);
                              setBatchMsgState({ isOpen: true, channel: 'sms' });
                            }}
                            className="px-2 py-1 rounded bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold transition-transform hover:scale-105 flex items-center gap-0.5 shadow-2xs"
                            title="문자메시지(SMS) 발송"
                          >
                            <Smartphone size={10} /> 문자
                          </button>

                          {/* Email Button */}
                          <button
                            onClick={() => {
                              setSelectedIds([cust.id]);
                              setBatchMsgState({ isOpen: true, channel: 'email' });
                            }}
                            className="px-2 py-1 rounded bg-[#D0B579] hover:bg-[#B89C60] text-[#2C2825] text-[10px] font-bold transition-transform hover:scale-105 flex items-center gap-0.5 shadow-2xs"
                            title="이메일(Email) 발송"
                          >
                            <Mail size={10} /> 이메일
                          </button>

                          {/* Point Button */}
                          <button
                            onClick={() => setSelectedPointCustomer(cust)}
                            className="px-2 py-1 rounded bg-[#FEF3EB] hover:bg-[#8C533E] text-[#8C533E] hover:text-white border border-[#FAD1B8] text-[10px] font-semibold transition-colors flex items-center gap-0.5"
                            title="포인트 지급"
                          >
                            <Gift size={10} /> 포인트
                          </button>

                          {/* Detail View Button */}
                          <button
                            onClick={() => setSelectedDetailCustomer(cust)}
                            className="p-1 rounded bg-[#FAF6F0] hover:bg-[#2C2825] text-[#6E6862] hover:text-white border border-[#E8DFD5] transition-colors"
                            title="상세 프로필"
                          >
                            <Eye size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Batch Message Modal */}
      <BatchMessageModal
        isOpen={batchMsgState.isOpen}
        channel={batchMsgState.channel}
        selectedCustomers={selectedCustomerObjects}
        onClose={() => setBatchMsgState({ isOpen: false, channel: 'kakao' })}
        onSendSuccess={handleMessageSuccess}
      />

      {/* Detail & Point Modals */}
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

