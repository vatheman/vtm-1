import React, { useState } from 'react';
import { Eye, EyeOff, Check, AlertCircle, ShieldCheck, ArrowRight, User, Mail, Lock, Phone } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function SignUp({ onSwitchToLogin, onClose }) {
  // Input fields state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('여성');
  const [phone, setPhone] = useState('');

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showTermsModal, setShowTermsModal] = useState(null); // 'terms' | 'privacy'

  // Terms Agreement states
  const [agreeTerms, setAgreeTerms] = useState(false); // required
  const [agreePrivacy, setAgreePrivacy] = useState(false); // required
  const [agreeMarketing, setAgreeMarketing] = useState(false); // optional
  const [marketingChannels, setMarketingChannels] = useState({
    sms: true,
    email: true,
    kakao: true
  });

  // Master All Agree Toggle
  const agreeAll = agreeTerms && agreePrivacy && agreeMarketing;

  const handleToggleAll = (e) => {
    const checked = e.target.checked;
    setAgreeTerms(checked);
    setAgreePrivacy(checked);
    setAgreeMarketing(checked);
  };

  // Field validations
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const hasMinLength = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/ .test(password);
  const isPasswordValid = hasMinLength && hasSpecialChar;
  const isPasswordMatch = confirmPassword !== '' && confirmPassword === password;
  const isNameValid = name.trim().length >= 2;
  
  const rawPhone = phone.replace(/[^0-9]/g, '');
  const isPhoneValid = rawPhone.length === 10 || rawPhone.length === 11;

  // Form validity check for enabling submit button
  const isFormValid = isEmailValid && isPasswordValid && isPasswordMatch && isNameValid && isPhoneValid && agreeTerms && agreePrivacy;

  // Auto hyphen phone formatter
  const handlePhoneChange = (e) => {
    const numbers = e.target.value.replace(/[^0-9]/g, '');
    let formatted = numbers;
    if (numbers.length > 3 && numbers.length <= 7) {
      formatted = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else if (numbers.length > 7) {
      formatted = `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
    setPhone(formatted);
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              gender: gender,
              phone_number: phone,
              agree_marketing: agreeMarketing,
              marketing_channels: agreeMarketing ? marketingChannels : null
            }
          }
        });
        if (error) throw error;
      }
      
      setMessage({
        type: 'success',
        text: '🎉 회원가입이 성공적으로 완료되었습니다! 가입 승인 또는 이메일 인증 후 로그인하실 수 있습니다.'
      });

      setTimeout(() => {
        if (onSwitchToLogin) onSwitchToLogin();
      }, 2500);

    } catch (err) {
      setMessage({
        type: 'error',
        text: err.message || '회원가입 처리 중 오류가 발생했습니다. 다시 시도해 주세요.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD5] shadow-2xl relative text-left">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl font-bold transition-colors"
        >
          ✕
        </button>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <div className="h-10 overflow-hidden relative flex items-center justify-center mb-2 mx-auto w-32">
          <img
            src="/assets/images/logo-blue.png"
            alt="VATHEMAN"
            className="h-[170%] w-auto object-cover object-top"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>
        <h2 className="text-2xl font-bold font-serif text-[#2C2825]">바더만 회원가입</h2>
        <p className="text-xs text-[#6E6862] mt-1 font-light">자연이 전하는 바른 가치, 바더만의 특별한 혜택을 만나보세요.</p>
      </div>

      {/* Status Banner */}
      {message.text && (
        <div className={`p-4 rounded-2xl mb-6 text-xs leading-relaxed font-medium flex items-start gap-2.5 ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
        }`}>
          {message.type === 'success' ? <Check size={16} className="shrink-0 text-emerald-600 mt-0.5" /> : <AlertCircle size={16} className="shrink-0 text-rose-600 mt-0.5" />}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-[#2C2825] mb-1.5 flex justify-between items-center">
            <span>이메일 주소 <span className="text-rose-500">*</span></span>
            {email && (
              <span className={`text-[11px] font-normal ${isEmailValid ? 'text-emerald-600 font-bold' : 'text-rose-500'}`}>
                {isEmailValid ? '✓ 올바른 이메일 형식' : '✕ 이메일 형식을 확인해 주세요'}
              </span>
            )}
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              required
              placeholder="example@vatheman.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs focus:outline-none transition-all ${
                email
                  ? isEmailValid
                    ? 'border-emerald-500 bg-emerald-50/20'
                    : 'border-rose-400 bg-rose-50/20'
                  : 'border-[#E8DFD5] focus:border-[#0B318F]'
              }`}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-bold text-[#2C2825] mb-1.5">
            비밀번호 <span className="text-rose-500">*</span>
          </label>
          <div className="relative mb-2">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="비밀번호 (8자 이상, 특수문자 포함)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-10 pr-12 py-3 rounded-xl border text-xs focus:outline-none transition-all ${
                password
                  ? isPasswordValid
                    ? 'border-emerald-500 bg-emerald-50/20'
                    : 'border-amber-400 bg-amber-50/20'
                  : 'border-[#E8DFD5] focus:border-[#0B318F]'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0B318F] transition-colors"
              title={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Password Validation Checklist */}
          <div className="flex gap-4 text-[11px]">
            <span className={`flex items-center gap-1 ${hasMinLength ? 'text-emerald-600 font-bold' : 'text-gray-400'}`}>
              <Check size={12} className={hasMinLength ? 'text-emerald-600' : 'text-gray-300'} /> 8자 이상
            </span>
            <span className={`flex items-center gap-1 ${hasSpecialChar ? 'text-emerald-600 font-bold' : 'text-gray-400'}`}>
              <Check size={12} className={hasSpecialChar ? 'text-emerald-600' : 'text-gray-300'} /> 특수문자(!@#$%^&* 등) 포함
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-bold text-[#2C2825] mb-1.5 flex justify-between items-center">
            <span>비밀번호 확인 <span className="text-rose-500">*</span></span>
            {confirmPassword && (
              <span className={`text-[11px] font-normal ${isPasswordMatch ? 'text-emerald-600 font-bold' : 'text-rose-500'}`}>
                {isPasswordMatch ? '✓ 비밀번호가 일치합니다' : '✕ 비밀번호가 일치하지 않습니다'}
              </span>
            )}
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              required
              placeholder="비밀번호 재입력"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full pl-10 pr-12 py-3 rounded-xl border text-xs focus:outline-none transition-all ${
                confirmPassword
                  ? isPasswordMatch
                    ? 'border-emerald-500 bg-emerald-50/20'
                    : 'border-rose-400 bg-rose-50/20'
                  : 'border-[#E8DFD5] focus:border-[#0B318F]'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0B318F] transition-colors"
              title={showConfirmPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Name / Nickname */}
        <div>
          <label className="block text-xs font-bold text-[#2C2825] mb-1.5">
            이름(닉네임) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              required
              placeholder="홍길동"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E8DFD5] text-xs focus:outline-none focus:border-[#0B318F]"
            />
          </div>
        </div>

        {/* Gender Selection */}
        <div>
          <label className="block text-xs font-bold text-[#2C2825] mb-1.5">
            성별 <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['여성', '남성', '선택 안함'].map(g => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  gender === g
                    ? 'bg-[#0B318F] text-white border-[#0B318F] shadow-sm'
                    : 'bg-gray-50 text-[#6E6862] border-[#E8DFD5] hover:border-[#0B318F]'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-bold text-[#2C2825] mb-1.5 flex justify-between items-center">
            <span>휴대폰 번호 <span className="text-rose-500">*</span></span>
            {phone && (
              <span className={`text-[11px] ${isPhoneValid ? 'text-emerald-600 font-bold' : 'text-gray-400'}`}>
                {isPhoneValid ? '✓ 올바른 전화번호' : '숫자만 입력 (하이픈 자동 적용)'}
              </span>
            )}
          </label>
          <div className="relative">
            <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              required
              maxLength={13}
              placeholder="010-1234-5678"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E8DFD5] text-xs focus:outline-none focus:border-[#0B318F]"
            />
          </div>
        </div>

        {/* Terms & Conditions Section */}
        <div className="pt-3 border-t border-[#E8DFD5] space-y-2.5">
          {/* Master Agree All */}
          <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] cursor-pointer hover:bg-[#F5ECE0] transition-colors">
            <input
              type="checkbox"
              checked={agreeAll}
              onChange={handleToggleAll}
              className="w-4 h-4 text-[#0B318F] rounded border-gray-300 focus:ring-[#0B318F]"
            />
            <span className="text-xs font-bold text-[#2C2825]">
              전체 동의하기 (필수 및 선택 약관 전체 포함)
            </span>
          </label>

          {/* Sub Terms Item 1: Terms of Service */}
          <div className="flex items-center justify-between text-xs px-1">
            <label className="flex items-center gap-2 cursor-pointer text-[#2C2825]">
              <input
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 text-[#0B318F] rounded border-gray-300 focus:ring-[#0B318F]"
              />
              <span><strong className="text-[#0B318F]">[필수]</strong> 이용약관 동의</span>
            </label>
            <button
              type="button"
              onClick={() => setShowTermsModal(showTermsModal === 'terms' ? null : 'terms')}
              className="text-[11px] text-gray-400 underline hover:text-[#0B318F]"
            >
              내용보기
            </button>
          </div>

          {/* Sub Terms Item 2: Privacy Policy */}
          <div className="flex items-center justify-between text-xs px-1">
            <label className="flex items-center gap-2 cursor-pointer text-[#2C2825]">
              <input
                type="checkbox"
                required
                checked={agreePrivacy}
                onChange={(e) => setAgreePrivacy(e.target.checked)}
                className="w-4 h-4 text-[#0B318F] rounded border-gray-300 focus:ring-[#0B318F]"
              />
              <span><strong className="text-[#0B318F]">[필수]</strong> 개인정보 수집 및 이용 동의</span>
            </label>
            <button
              type="button"
              onClick={() => setShowTermsModal(showTermsModal === 'privacy' ? null : 'privacy')}
              className="text-[11px] text-gray-400 underline hover:text-[#0B318F]"
            >
              내용보기
            </button>
          </div>

          {/* Sub Terms Item 3: Marketing Agreement */}
          <div className="space-y-1.5 px-1 pt-1 border-t border-gray-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#2C2825]">
              <input
                type="checkbox"
                checked={agreeMarketing}
                onChange={(e) => setAgreeMarketing(e.target.checked)}
                className="w-4 h-4 text-[#0B318F] rounded border-gray-300 focus:ring-[#0B318F]"
              />
              <span><span className="text-gray-500">[선택]</span> 마케팅 정보 수신 동의</span>
            </label>

            {agreeMarketing && (
              <div className="flex items-center gap-4 pl-6 text-[11px] text-[#6E6862]">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={marketingChannels.sms}
                    onChange={(e) => setMarketingChannels({...marketingChannels, sms: e.target.checked})}
                    className="w-3 h-3 text-[#0B318F] rounded"
                  />
                  <span>SMS</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={marketingChannels.email}
                    onChange={(e) => setMarketingChannels({...marketingChannels, email: e.target.checked})}
                    className="w-3 h-3 text-[#0B318F] rounded"
                  />
                  <span>이메일</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={marketingChannels.kakao}
                    onChange={(e) => setMarketingChannels({...marketingChannels, kakao: e.target.checked})}
                    className="w-3 h-3 text-[#0B318F] rounded"
                  />
                  <span>카카오 알림톡</span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Expandable Terms Details Preview Modal */}
        {showTermsModal && (
          <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E8DFD5] text-[11px] leading-relaxed text-[#6E6862] max-h-32 overflow-y-auto">
            {showTermsModal === 'terms' ? (
              <p>
                <strong>[바더만 이용약관]</strong><br />
                제1조(목적) 본 약관은 바더만 공식 자사몰 및 관련 서비스의 이용조건과 절차, 회원 및 당사의 권리·의무를 규정함을 목적으로 합니다.<br />
                제2조(서비스 내용) 당사는 오가닉 텐실 천연염색 스카프 제작 및 관련 생활용품 주문·배송 서비스를 제공합니다.
              </p>
            ) : (
              <p>
                <strong>[개인정보 수집 및 이용 동의]</strong><br />
                1. 수집 항목: 이메일, 비밀번호, 성명, 휴대폰 번호<br />
                2. 수집 목적: 본인 확인, 회원 서비스 제공, 주문 배송 안내<br />
                3. 보유 기간: 회원 탈퇴 시 즉시 파기 (법령에 따른 보존 의무 제외)
              </p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`w-full py-4 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
            isFormValid && !loading
              ? 'bg-[#0B318F] hover:bg-[#082672] text-white cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'
          }`}
        >
          {loading ? (
            <span>회원가입 처리 중...</span>
          ) : (
            <>
              <span>바더만 회원가입 완료하기</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* Switch to Login Link */}
      <div className="mt-6 text-center pt-4 border-t border-[#E8DFD5]">
        <p className="text-xs text-[#6E6862]">
          이미 바더만 계정이 있으신가요?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-[#0B318F] font-bold underline hover:text-[#082672] ml-1"
          >
            로그인하기
          </button>
        </p>
      </div>
    </div>
  );
}
