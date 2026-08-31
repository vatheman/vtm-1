import React, { useState, useEffect } from 'react';
import { X, Send, Mail, MessageSquare, Smartphone, Check, Sparkles, AlertCircle } from 'lucide-react';

export function BatchMessageModal({ isOpen, onClose, channel = 'kakao', selectedCustomers = [], onSendSuccess }) {
  const [activeChannel, setActiveChannel] = useState(channel);
  const [template, setTemplate] = useState('custom');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  // Sync initial channel prop
  useEffect(() => {
    setActiveChannel(channel);
    setSentSuccess(false);
    setSending(false);
  }, [channel, isOpen]);

  // Handle template selection
  useEffect(() => {
    if (template === 'promo') {
      setTitle('[바더만] 🌿 풋감 손염색 스카프 신상품 론칭 15% 혜택 안내');
      setContent(
        `안녕하세요 {고객명}님, 자연소재·자연빛깔 브랜드 바더만입니다.\n\n` +
        `제주 풋감 수액으로 아틀리에에서 정성껏 발색한 2026 롱텐셀 스카프 신상품이 출시되었습니다.\n` +
        `지금 공식 자사몰 및 스마트스토어에서 단골 고객님만을 위한 15% 특별 할인 쿠폰을 확인해보세요!\n\n` +
        `▶ 자세히 보기: https://vatheman.com/#shop`
      );
    } else if (template === 'thanks') {
      setTitle('[바더만] 🎁 {고객명}님을 위한 감사 적립금 5,000P 지급 완료');
      setContent(
        `안녕하세요 {고객명}님, 바더만을 아껴주셔서 진심으로 감사드립니다.\n\n` +
        `항상 저희 자연염색 스카프를 신뢰해주시는 감사의 마음을 담아 고객님의 계정에 감사 적립금 5,000포인트를 지급해드렸습니다.\n` +
        `다음 구매 시 적립금을 유용하게 사용해보세요!\n\n` +
        `▶ 내 포인트 확인: https://vatheman.com/admin`
      );
    } else if (template === 'care') {
      setTitle('[바더만] 🧺 천연염색 스카프 미온수 손세탁 및 보관 가이드');
      setContent(
        `안녕하세요 {고객명}님, 바더만 아틀리에입니다.\n\n` +
        `구매하신 오가닉 텐셀 천연염색 제품은 미온수(30℃ 이하)에서 중성세제로 단독 손세탁 해주시면 은은한 자연빛깔이 오랫동안 정착 유지됩니다.\n` +
        `햇볕이 부드러운 그늘에서 자연 건조해주시면 더욱 기품 있게 착용하실 수 있습니다.`
      );
    } else if (template === 'custom') {
      setTitle('');
      setContent('');
    }
  }, [template]);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!content.trim()) return;
    setSending(true);

    setTimeout(() => {
      setSending(false);
      setSentSuccess(true);
      setTimeout(() => {
        if (onSendSuccess) {
          onSendSuccess({
            channel: activeChannel,
            count: selectedCustomers.length,
            title: title || '메시지 발송'
          });
        }
        onClose();
      }, 1200);
    }, 1000);
  };

  const channelNames = {
    kakao: '카카오 알림톡',
    sms: 'SMS/LMS 문자',
    email: '이메일 (Email)'
  };

  const channelColors = {
    kakao: 'bg-[#FEE500] text-[#191919] border-[#E6CE00]',
    sms: 'bg-emerald-600 text-white border-emerald-700',
    email: 'bg-[#0B318F] text-white border-[#082672]'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-left">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E8DFD5] relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 font-bold transition-colors"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${channelColors[activeChannel]}`}>
              {channelNames[activeChannel]}
            </span>
            <span className="text-xs text-[#8C533E] font-semibold bg-[#FEF3EB] px-2.5 py-0.5 rounded-full border border-[#FAD1B8]">
              선택 고객 {selectedCustomers.length}명 수신 예정
            </span>
          </div>
          <h2 className="text-xl font-bold font-serif text-[#2C2825]">
            고객 그룹 메시지 일괄 발송
          </h2>
          <p className="text-xs text-[#6E6862] mt-1">
            필터링하여 선택한 target 고객들에게 알림톡, SMS, 이메일을 즉시 발송합니다.
          </p>
        </div>

        {/* Channel Selector Tabs */}
        <div className="flex border-b border-[#E8DFD5] mb-6">
          <button
            onClick={() => setActiveChannel('kakao')}
            className={`flex-1 py-2.5 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border-b-2 ${
              activeChannel === 'kakao'
                ? 'border-[#FEE500] text-[#191919] bg-[#FFFBE6]'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            <MessageSquare size={16} className="text-[#3C1E1E]" />
            <span>카카오 알림톡</span>
          </button>

          <button
            onClick={() => setActiveChannel('sms')}
            className={`flex-1 py-2.5 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border-b-2 ${
              activeChannel === 'sms'
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            <Smartphone size={16} />
            <span>SMS/LMS 문자</span>
          </button>

          <button
            onClick={() => setActiveChannel('email')}
            className={`flex-1 py-2.5 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border-b-2 ${
              activeChannel === 'email'
                ? 'border-[#0B318F] text-[#0B318F] bg-blue-50'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            <Mail size={16} />
            <span>이메일 (Email)</span>
          </button>
        </div>

        {/* Selected Receivers Badges */}
        <div className="mb-6 p-3 rounded-2xl bg-[#FAF6F0] border border-[#E8DFD5]">
          <span className="text-[11px] font-bold text-[#8C533E] block mb-2">
            📋 수신 대상자 명단 ({selectedCustomers.length}명)
          </span>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
            {selectedCustomers.map(c => (
              <span
                key={c.id}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#E8DFD5] text-[11px] text-[#2C2825] font-medium shadow-2xs flex items-center gap-1"
              >
                <span className="font-bold text-[#0B318F]">{c.name}</span>
                <span className="text-gray-400 text-[10px]">
                  ({activeChannel === 'email' ? c.email : c.phone})
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Template Selector */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-[#2C2825] mb-1.5 flex items-center gap-1">
            <Sparkles size={14} className="text-[#D0B579]" />
            <span>추천 메시지 템플릿 불러오기</span>
          </label>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-[#E8DFD5] text-xs bg-[#FAF6F0]/60 text-[#2C2825] focus:outline-none focus:border-[#0B318F]"
          >
            <option value="custom">✏️ 직접 작성하기</option>
            <option value="promo">🌿 [프로모션] 풋감 손염색 롱스카프 신상품 15% 할인 안내</option>
            <option value="thanks">🎁 [감사이벤트] VIP 고객전용 5,000P 지급 알림</option>
            <option value="care">🧺 [세탁가이드] 천연염색 손세탁 및 보관 유의사항</option>
          </select>
        </div>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-[#2C2825] mb-1.5">
            메시지 제목 {activeChannel === 'email' && <span className="text-rose-500">*</span>}
          </label>
          <input
            type="text"
            placeholder="[바더만] 메시지 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD5] text-xs focus:outline-none focus:border-[#0B318F]"
          />
        </div>

        {/* Body Content Input */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-[#2C2825] mb-1.5">
            메시지 본문 내용 <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={5}
            placeholder="고객에게 전달할 메시지 내용을 입력하세요. {고객명} 치환 태그를 사용할 수 있습니다."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-[#E8DFD5] text-xs focus:outline-none focus:border-[#0B318F] font-mono leading-relaxed"
          />
          <span className="text-[11px] text-gray-400 block mt-1">
            * <code className="text-[#0B318F] font-bold">{'{고객명}'}</code> 입력 시 수신 고객의 이름으로 자동 변환됩니다.
          </span>
        </div>

        {/* Live Preview Card */}
        {content && (
          <div className="mb-6 p-4 rounded-2xl border border-[#E8DFD5] bg-[#FAF6F0]">
            <span className="text-[11px] font-bold text-[#6E6862] uppercase tracking-wider block mb-2">
              📱 실시간 수신 화면 미리보기 ({channelNames[activeChannel]})
            </span>

            {activeChannel === 'kakao' && (
              <div className="p-4 rounded-2xl bg-[#FEE500] text-[#191919] text-xs leading-relaxed font-sans shadow-md max-w-sm">
                <div className="flex items-center gap-1.5 font-bold text-[11px] mb-2 text-[#3C1E1E]">
                  <MessageSquare size={14} />
                  <span>[알림톡] 바더만 공식 카카오톡</span>
                </div>
                {title && <div className="font-bold mb-1.5 text-sm">{title.replace('{고객명}', selectedCustomers[0]?.name || '고객')}</div>}
                <div className="whitespace-pre-line text-[#2C2825] text-xs">
                  {content.replace(/\{고객명\}/g, selectedCustomers[0]?.name || '홍길동')}
                </div>
              </div>
            )}

            {activeChannel === 'sms' && (
              <div className="p-4 rounded-2xl bg-white border border-gray-300 text-xs leading-relaxed font-mono shadow-md max-w-sm">
                <div className="text-[10px] text-gray-400 mb-1">[LMS] {selectedCustomers[0]?.phone || '010-0000-0000'}</div>
                {title && <div className="font-bold mb-1 text-[#2C2825]">{title.replace('{고객명}', selectedCustomers[0]?.name || '고객')}</div>}
                <div className="whitespace-pre-line text-gray-700">
                  {content.replace(/\{고객명\}/g, selectedCustomers[0]?.name || '홍길동')}
                </div>
              </div>
            )}

            {activeChannel === 'email' && (
              <div className="p-5 rounded-2xl bg-white border border-[#E8DFD5] text-xs shadow-md">
                <div className="pb-2 mb-3 border-b border-[#E8DFD5] flex items-center justify-between">
                  <span className="font-bold text-[#0B318F]">보낸이: 바더만 (contact@vatheman.com)</span>
                  <span className="text-gray-400 text-[10px]">받는이: {selectedCustomers[0]?.email}</span>
                </div>
                <div className="font-bold text-sm text-[#2C2825] mb-2">{title || '(제목 없음)'}</div>
                <div className="whitespace-pre-line text-[#6E6862] leading-relaxed">
                  {content.replace(/\{고객명\}/g, selectedCustomers[0]?.name || '홍길동')}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        {sentSuccess ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2">
            <Check size={18} className="text-emerald-600" />
            <span>🎉 {selectedCustomers.length}명의 고객에게 {channelNames[activeChannel]} 발송 요청이 완결되었습니다!</span>
          </div>
        ) : (
          <button
            onClick={handleSend}
            disabled={sending || !content.trim() || selectedCustomers.length === 0}
            className={`w-full py-4 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
              !sending && content.trim() && selectedCustomers.length > 0
                ? 'bg-[#0B318F] hover:bg-[#082672] text-white cursor-pointer hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'
            }`}
          >
            {sending ? (
              <span>메시지 전송 중...</span>
            ) : (
              <>
                <Send size={16} />
                <span>선택 고객 {selectedCustomers.length}명에게 {channelNames[activeChannel]} 즉시 발송하기</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
