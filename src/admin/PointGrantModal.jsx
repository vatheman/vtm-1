import React, { useState } from 'react';
import { X, Award, Gift, Check, User, Phone, Mail, Calendar, Tag, ShieldCheck } from 'lucide-react';

export function PointGrantModal({ customer, onClose, onGrant }) {
  const [pointAmount, setPointAmount] = useState('5000');
  const [reason, setReason] = useState('자연빛깔 구매 감사 적립금');
  const [grantedMsg, setGrantedMsg] = useState(false);

  if (!customer) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onGrant(customer.id, parseInt(pointAmount, 10));
    setGrantedMsg(true);
    setTimeout(() => {
      setGrantedMsg(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-left">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E8DFD5] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#6E6862] hover:text-[#2C2825] rounded-full hover:bg-[#FAF6F0]"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#FEF3EB] text-[#C47B59] flex items-center justify-center font-bold">
            <Gift size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#2C2825]">포인트/적립금 지급</h3>
            <p className="text-xs text-[#6E6862]">대상: {customer.name} ({customer.id})</p>
          </div>
        </div>

        {grantedMsg ? (
          <div className="py-8 text-center text-[#8C533E] font-bold text-sm bg-[#FAF6F0] rounded-xl border border-[#E8DFD5]">
            <Check size={32} className="mx-auto text-[#C47B59] mb-2" />
            <span>{parseInt(pointAmount, 10).toLocaleString()} P 지급이 완료되었습니다!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#E8DFD5] text-xs text-[#6E6862] flex justify-between">
              <span>현재 보유 포인트:</span>
              <span className="font-bold text-[#2C2825]">{customer.points.toLocaleString()} P</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2C2825] mb-1">지급 포인트 금액</label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {['3000', '5000', '10000'].map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => setPointAmount(amt)}
                    className={`py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      pointAmount === amt
                        ? 'bg-[#8C533E] text-white border-[#8C533E]'
                        : 'bg-white text-[#2C2825] border-[#E8DFD5] hover:bg-[#FAF6F0]'
                    }`}
                  >
                    +{parseInt(amt, 10).toLocaleString()} P
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={pointAmount}
                onChange={(e) => setPointAmount(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DFD5] text-xs focus:outline-none focus:border-[#8C533E]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2C2825] mb-1">지급 사유</label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DFD5] text-xs focus:outline-none focus:border-[#8C533E]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#8C533E] hover:bg-[#72402E] text-white text-xs font-bold transition-colors shadow-md"
            >
              포인트 지급 확정
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function CustomerDetailModal({ customer, onClose }) {
  if (!customer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-left">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E8DFD5] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#6E6862] hover:text-[#2C2825] rounded-full hover:bg-[#FAF6F0]"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#E8DFD5]">
          <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] flex items-center justify-center text-lg font-bold text-[#8C533E] font-serif">
            {customer.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-[#2C2825]">{customer.name}</h3>
              <span className={`badge-tier badge-${customer.tier.toLowerCase()}`}>
                {customer.tier}
              </span>
            </div>
            <p className="text-xs text-[#6E6862]">{customer.id} | {customer.gender} · {customer.ageGroup}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#E8DFD5]">
            <span className="text-[11px] text-[#6E6862] block">총 누적 구매액</span>
            <span className="text-lg font-bold text-[#8C533E] font-serif">
              {customer.totalAmount.toLocaleString()}원
            </span>
          </div>
          <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#E8DFD5]">
            <span className="text-[11px] text-[#6E6862] block">총 구매 빈도</span>
            <span className="text-lg font-bold text-[#2C2825] font-serif">
              {customer.purchaseCount}회
            </span>
          </div>
          <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#E8DFD5]">
            <span className="text-[11px] text-[#6E6862] block">현재 보유 포인트</span>
            <span className="text-lg font-bold text-[#C47B59] font-serif">
              {customer.points.toLocaleString()} P
            </span>
          </div>
          <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#E8DFD5]">
            <span className="text-[11px] text-[#6E6862] block">선호 천연염색</span>
            <span className="text-sm font-bold text-[#2A3B50]">
              {customer.preferredDye}
            </span>
          </div>
        </div>

        <div className="space-y-2 text-xs text-[#2C2825] mb-6">
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-[#8C533E]" /> <span>연락처: {customer.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-[#8C533E]" /> <span>이메일: {customer.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-[#8C533E]" /> <span>가입일자: {customer.registeredAt}</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag size={14} className="text-[#8C533E]" /> <span>최근 구매일: {customer.lastPurchasedAt}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#2C2825] text-white text-xs font-semibold hover:bg-[#1A1816] transition-colors"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
