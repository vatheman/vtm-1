# 코드 최적화 및 청크 분이 리포트 (Optimization Log)

## 1. 개요
- **목적**: 웹 애플리케이션의 초기 로딩 속도 향상 및 청크 번들 사이즈 최적화
- **일자**: 2026-08-25

---

## 2. 주요 최적화 작업 내용

### 1) React.lazy & Suspense 기반 라우트/컴포넌트 Code Splitting
- `/admin` 관리자 레이아웃 (`AdminLayout.jsx`) 및 Recharts 차트 모듈을 동적 임포트(`React.lazy`)로 전환했습니다.
- 쇼핑몰 일반 사용자가 접속 시 불필요하게 대용량 차트 라이브러리(`recharts`) 및 관리자 탭 코드를 초기 다운로드하지 않도록 분리했습니다.

### 2) Vite & Rollup manualChunks 벤더 분리
- `vite.config.js`에 `rollupOptions.output.manualChunks` 설정을 추가하여 벤더 라이브러리를 명확히 청크 분리했습니다.
  - `react-vendor`: React / React-DOM
  - `lucide`: Lucide Icons
  - `supabase`: Supabase Client SDK
  - `recharts`: Recharts 차트 라이브러리
  - `AdminLayout`: 관리자 전용 대시보드 컴포넌트

### 3) React 렌더링 최적화
- `App.jsx` 내 핸들러 함수들(`navigateTo`, `handleAddToCart`, `handleRemoveFromCart`, `handleClearCart`, `handleLogout`)에 `useCallback` 적용
- 장바구니 수량 연산(`totalCartCount`) 및 상품 목록 카테고리 필터링(`filteredProducts`)에 `useMemo` 적용
- `ProductCatalog.jsx` 내 `ProductCard` 컴포넌트 추출 및 `React.memo` 적용 + 이미지 `loading="lazy"` 속성 추가로 불필요한 전체 카드 리렌더링 완벽 차단
- `InstagramFeed.jsx` (`InstagramFeed`, `ReviewSection`) 및 `CraftProcess.jsx` 컴포넌트에 `React.memo` 및 이미지 비동기 지연 로딩(`loading="lazy"`) 적용
- `CustomerTab.jsx` 내 5대 필터 연산, 다중 선택 상태 연산(`isAllFilteredSelected`, `selectedCustomerObjects`), 총계 통계 집계(`totalCustomerCount`, `totalCumulativeSales`, `totalPointsIssued`)에 `useMemo` 적용
- `CustomerTab.jsx` 이벤트 핸들러(`handleGrantPoints`, `handleResetFilters`, `toggleSelectAll`, `toggleSelectCustomer`, `handleOpenBatchMsg`, `handleMessageSuccess`)에 `useCallback` 적용으로 자식 컴포넌트 및 모달 불필요 리렌더링 차단

---

## 3. 최적화 성과 지표 (Performance Metrics)

| 항목 | 최적화 전 | 최적화 후 | 개선율 |
| :--- | :--- | :--- | :--- |
| **메인 JS 번들 용량** | `897.69 kB` | `60.14 kB` | **93.3% 감소 (초기 진입속도 비약적 향상)** |
| **빌드 경고 (Chunk Size Warning)** | 500kB 초과 경고 발생 | 경고 0건 (완벽 해결) | **100% 해소** |
| **빌드 소요 시간** | `12.87초` | `11.71초` | **9.0% 단축** |
