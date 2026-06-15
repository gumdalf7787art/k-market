import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Star, Map, MapPin, Store, ScanLine, ChevronRight, Clock, Phone, Info } from 'lucide-react';
import { markets } from '../data/markets';
import { useState, useEffect } from 'react';

// 시장별 추가 정보 (운영시간, 전화번호, 주소 등)
const marketInfo = {
  1: { hours: "09:00 ~ 19:00", phone: "02-2249-4580", address: "서울특별시 동대문구 왕산로 214", parking: "주차 가능", closed: "매월 첫째·셋째 일요일" },
  2: { hours: "04:00 ~ 21:00", phone: "02-2249-5765", address: "서울특별시 동대문구 왕산로 12", parking: "주차 가능", closed: "일요일" },
  3: { hours: "09:00 ~ 19:00", phone: "02-969-4793", address: "서울특별시 동대문구 왕산로 6", parking: "주차 가능", closed: "일요일" },
  4: { hours: "04:00 ~ 20:00", phone: "02-962-8100", address: "서울특별시 동대문구 왕산로 4", parking: "주차 가능", closed: "일요일" },
  5: { hours: "09:00 ~ 20:00", phone: "02-965-2255", address: "서울특별시 동대문구 왕산로 2", parking: "인근 주차장 이용", closed: "일요일" },
  6: { hours: "08:00 ~ 20:00", phone: "02-961-8080", address: "서울특별시 동대문구 청량리동", parking: "주차 가능", closed: "일요일" },
  7: { hours: "04:00 ~ 19:00", phone: "02-962-0055", address: "서울특별시 동대문구 청량리동", parking: "인근 주차장 이용", closed: "일요일" },
  8: { hours: "09:00 ~ 20:00", phone: "02-966-3100", address: "서울특별시 동대문구 청량리동", parking: "주차 가능", closed: "일요일" },
  9: { hours: "05:00 ~ 18:00", phone: "02-963-7900", address: "서울특별시 동대문구 청량리동", parking: "대형 주차장 완비", closed: "일요일" },
};

// 색상 맵 (시장 번호별 hexColor 조회용)
const colorMap = {
  "bg-blue-600": "#2563eb",
  "bg-green-600": "#16a34a",
  "bg-purple-700": "#7e22ce",
  "bg-orange-500": "#f97316",
  "bg-teal-600": "#0d9488",
  "bg-sky-500": "#0ea5e9",
  "bg-rose-600": "#e11d48",
  "bg-amber-700": "#b45309"
};

export default function MarketDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  // 로컬 스토리지에서 즐겨찾기 목록 불러오기 및 초기화
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('k-market-favorites') || '[]');
    setIsFavorite(favorites.includes(id));
  }, [id]);

  // 즐겨찾기 토글 핸들러
  const handleFavoriteToggle = () => {
    const favorites = JSON.parse(localStorage.getItem('k-market-favorites') || '[]');
    const idStr = id.toString();
    let updatedFavorites;
    if (favorites.includes(idStr)) {
      updatedFavorites = favorites.filter(favId => favId !== idStr);
      setIsFavorite(false);
    } else {
      updatedFavorites = [...favorites, idStr];
      setIsFavorite(true);
    }
    localStorage.setItem('k-market-favorites', JSON.stringify(updatedFavorites));
  };

  // ID에 해당하는 시장 찾기 (기본값은 1번 경동광성상가)
  const marketId = parseInt(id, 10) || 1;
  const market = markets.find((m) => m.id === marketId) || markets[0];
  const info = marketInfo[marketId] || marketInfo[1];
  const hexColor = colorMap[market.color] || "#2563eb";

  // 1줄로 정렬된 시장 이름 (줄바꿈 제거)
  const displayName = market.name.replace('\n', ' ');

  // 다른 시장 목록 (현재 시장 제외)
  const otherMarkets = markets.filter(m => m.id !== marketId);

  // 각 버튼 클릭 시 동작 정의
  const handleMenuClick = (menuName) => {
    alert(`${displayName}의 [${menuName}] 기능은 준비 중입니다.`);
  };

  return (
    <div className="bg-gray-200 h-full md:min-h-[calc(100vh-64px)] flex flex-col relative overflow-y-auto pb-6 md:pb-0 md:bg-gray-200">
      
      {/* PC 버전에서는 중앙 정렬된 와이드 컨테이너 안에서 좌우 스플릿(Split) 뷰 구성 (크기 20% 축소) */}
      <div className="md:max-w-7xl md:mx-auto md:w-full md:px-8 md:pt-12 md:flex md:gap-12 md:items-start md:[zoom:0.8]">
        
        {/* ================= 좌측/상단 영역: 히어로 이미지 및 타이틀 ================= */}
        {/* 모바일: 상단에 390px 높이로 고정, PC: 좌측 절반(w-1/2)을 차지하며 독립된 고품질 이미지 카드로 표현 */}
        <div className="relative w-full h-[390px] md:h-[600px] md:w-1/2 flex-none md:rounded-[32px] md:overflow-hidden md:shadow-2xl md:group">
          {/* 시장 대표 이미지 */}
          <img 
            src={market.image} 
            alt={displayName} 
            className="w-full h-full object-cover object-top md:transition-transform md:duration-700 md:group-hover:scale-105"
          />
          
          {/* 이미지 오버레이: 모바일은 상단 파란색, PC는 이미지 하단에 고급스럽게 검정색 페이드 그라데이션 */}
          <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-blue-950/80 via-blue-950/30 to-transparent h-[200px] z-10 md:hidden"></div>
          <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent h-full z-10"></div>
          
          {/* PC용 시장 번호 배지 */}
          <div className="hidden md:flex absolute top-6 right-6 z-20 w-14 h-14 rounded-2xl items-center justify-center text-white text-xl font-black shadow-lg" style={{ backgroundColor: hexColor }}>
            {market.id}
          </div>

          {/* 헤더 콘텐츠 (타이틀, 버튼 등) */}
          <div className="absolute inset-x-0 top-0 px-4 pt-5 flex flex-col items-center text-white z-20 md:top-auto md:bottom-0 md:px-10 md:pb-16 md:items-start">
            
            {/* 상단 컨트롤 바 (PC에서는 즐겨찾기 버튼의 위치/크기 조정) */}
            <div className="w-full flex justify-end items-center mb-1 md:absolute md:top-8 md:left-8 md:w-[calc(100%-64px)]">
              {/* 즐겨찾기 버튼 */}
              <button 
                onClick={handleFavoriteToggle}
                className="p-1 md:p-3 md:bg-black/20 md:backdrop-blur-md rounded-full active:bg-white/20 hover:bg-black/40 transition-colors"
              >
                <Star 
                  size={22} 
                  className={`transition-all md:w-6 md:h-6 ${isFavorite ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-[2.5] text-white'}`} 
                />
              </button>
            </div>
            
            {/* 시장 이름 및 부제목 컨테이너 (정확히 25px 위로 올림) */}
            <div className="flex flex-col items-center md:items-start transform -translate-y-[25px]">
              {/* 시장 이름 (PC에서는 압도적으로 큰 텍스트 사용) */}
              <h1 className="text-[27px] md:text-[46px] leading-none font-black tracking-tight drop-shadow-md md:mt-auto">
                {displayName}
              </h1>
              
              {/* 시장 슬로건 / 설명 */}
              <p className="text-[14px] md:text-[20px] md:text-gray-200 font-medium tracking-wide mt-[15px] drop-shadow">
                {market.description.replace('\n', ' ')}
              </p>
            </div>
          </div>
        </div>

        {/* ================= 우측/하단 영역: 인터랙티브 메뉴 및 안내 ================= */}
        {/* 모바일: 이미지 아래로 둥근 모서리로 겹침, PC: 우측 절반(w-1/2)에 세련된 카드 목록으로 나열 */}
        <div className="flex-1 bg-gray-100 md:bg-transparent rounded-t-[20px] -mt-5 md:mt-0 relative z-10 px-4 pt-5 md:px-0 md:pt-0 md:w-1/2 flex flex-col gap-4 md:gap-6">
          
          {/* PC용 섹션 타이틀 추가 */}
          <div className="hidden md:block mb-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-6 rounded-full" style={{ backgroundColor: hexColor }}></div>
              <span className="text-[13px] font-bold tracking-widest uppercase" style={{ color: hexColor }}>Quick Menu</span>
            </div>
            <h2 className="text-[29px] font-black text-gray-900 mb-2">무엇을 도와드릴까요?</h2>
            <p className="text-gray-500 font-medium text-[15px]">원하시는 서비스를 선택하여 빠르게 이용해 보세요.</p>
          </div>

          {/* 4칸 그리드 메뉴 버튼 (모바일: 2x2 그리드, PC: 2x2 대형 그리드 및 패딩 확대) */}
          <div className="grid grid-cols-2 gap-3.5 md:gap-4">
            {/* 시장 지도 */}
            <button 
              onClick={() => navigate(`/market/${marketId}/floor`)}
              className="bg-white rounded-[12px] md:rounded-[20px] p-3 md:p-6 flex items-center md:flex-col md:items-start gap-2.5 md:gap-4 shadow-sm border-2 border-gray-400 md:border-gray-100 md:hover:shadow-lg md:hover:border-emerald-200 md:hover:-translate-y-1 active:bg-gray-50 md:transition-all md:duration-300 text-left group"
            >
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors flex items-center justify-center flex-none">
                <Map className="text-emerald-600 md:w-7 md:h-7" size={22} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h4 className="text-[17px] md:text-[17px] font-black text-gray-900 leading-tight flex items-center justify-between">
                  시장 지도
                  <ChevronRight className="hidden md:block w-5 h-5 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </h4>
                <span className="text-[15px] md:text-[13px] font-black md:font-medium text-gray-500 mt-0.5 md:mt-1 block">지도 보기</span>
              </div>
            </button>

            {/* 길찾기 */}
            <button 
              onClick={() => handleMenuClick('길찾기')}
              className="bg-white rounded-[12px] md:rounded-[20px] p-3 md:p-6 flex items-center md:flex-col md:items-start gap-2.5 md:gap-4 shadow-sm border-2 border-gray-400 md:border-gray-100 md:hover:shadow-lg md:hover:border-blue-200 md:hover:-translate-y-1 active:bg-gray-50 md:transition-all md:duration-300 text-left group"
            >
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-blue-50 group-hover:bg-blue-100 transition-colors flex items-center justify-center flex-none">
                <MapPin className="text-blue-600 md:w-7 md:h-7" size={22} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h4 className="text-[17px] md:text-[17px] font-black text-gray-900 leading-tight flex items-center justify-between">
                  길찾기
                  <ChevronRight className="hidden md:block w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </h4>
                <span className="text-[15px] md:text-[13px] font-black md:font-medium text-gray-500 mt-0.5 md:mt-1 block">내 위치 → 시장</span>
              </div>
            </button>

            {/* 점포 안내 */}
            <button 
              onClick={() => navigate(`/market/${marketId}/stores`)}
              className="bg-white rounded-[12px] md:rounded-[20px] p-3 md:p-6 flex items-center md:flex-col md:items-start gap-2.5 md:gap-4 shadow-sm border-2 border-gray-400 md:border-gray-100 md:hover:shadow-lg md:hover:border-orange-200 md:hover:-translate-y-1 active:bg-gray-50 md:transition-all md:duration-300 text-left group"
            >
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-orange-50 group-hover:bg-orange-100 transition-colors flex items-center justify-center flex-none">
                <Store className="text-orange-600 md:w-7 md:h-7" size={22} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h4 className="text-[17px] md:text-[17px] font-black text-gray-900 leading-tight flex items-center justify-between">
                  점포 안내
                  <ChevronRight className="hidden md:block w-5 h-5 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                </h4>
                <span className="text-[15px] md:text-[13px] font-black md:font-medium text-gray-500 mt-0.5 md:mt-1 block">업종별 검색</span>
              </div>
            </button>

            {/* QR 스캔 */}
            <button 
              onClick={() => handleMenuClick('QR 스캔')}
              className="bg-white rounded-[12px] md:rounded-[20px] p-3 md:p-6 flex items-center md:flex-col md:items-start gap-2.5 md:gap-4 shadow-sm border-2 border-gray-400 md:border-gray-100 md:hover:shadow-lg md:hover:border-indigo-200 md:hover:-translate-y-1 active:bg-gray-50 md:transition-all md:duration-300 text-left group"
            >
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-indigo-50 group-hover:bg-indigo-100 transition-colors flex items-center justify-center flex-none">
                <ScanLine className="text-indigo-600 md:w-7 md:h-7" size={22} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h4 className="text-[17px] md:text-[17px] font-black text-gray-900 leading-tight flex items-center justify-between">
                  QR 스캔
                  <ChevronRight className="hidden md:block w-5 h-5 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                </h4>
                <span className="text-[15px] md:text-[13px] font-black md:font-medium text-gray-500 mt-0.5 md:mt-1 block">위치 확인하기</span>
              </div>
            </button>
          </div>

          {/* 3. 시장 안내 섹션 - PC에서는 운영 정보 카드로 업그레이드 */}
          <div className="bg-white md:bg-white rounded-[12px] md:rounded-[20px] p-4 md:p-6 shadow-sm md:shadow-sm border-2 border-gray-400 md:border-gray-100">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Info className="w-5 h-5 text-gray-400" />
              <h3 className="text-[17px] md:text-[17px] font-black text-gray-900">시장 안내</h3>
            </div>
            <p className="text-[15px] md:text-[13px] text-gray-600 leading-relaxed font-bold md:font-medium break-keep mb-4 md:mb-5">
              다양한 상점과 편의시설이 모여 있는 {displayName}입니다. 쾌적한 쇼핑 환경과 넉넉한 인심이 있는 전통시장에서 특별한 추억을 만들어보세요.
            </p>
            
            {/* 상세 정보 그리드 (3줄 구성: 1행 운영/휴무, 2행 전화, 3행 주소 및 높이 절반 감축) */}
            <div className="grid grid-cols-2 gap-2">
              {/* 1번째 줄: 운영시간 */}
              <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-1.5">
                <Clock className="w-4 h-4 text-slate-400 flex-none" />
                <div className="min-w-0">
                  <span className="text-[12px] md:text-[9px] font-bold text-slate-400 block leading-tight">운영시간</span>
                  <span className="text-[14px] md:text-[11px] font-bold text-slate-700 block truncate">{info.hours}</span>
                </div>
              </div>
              
              {/* 1번째 줄: 휴무일 */}
              <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-1.5">
                <Info className="w-4 h-4 text-slate-400 flex-none" />
                <div className="min-w-0">
                  <span className="text-[12px] md:text-[9px] font-bold text-slate-400 block leading-tight">휴무일</span>
                  <span className="text-[14px] md:text-[11px] font-bold text-slate-700 block truncate">{info.closed}</span>
                </div>
              </div>

              {/* 2번째 줄: 전화번호 */}
              <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-1.5 col-span-2">
                <Phone className="w-4 h-4 text-slate-400 flex-none" />
                <div className="min-w-0">
                  <span className="text-[12px] md:text-[9px] font-bold text-slate-400 block leading-tight">전화번호</span>
                  <a href={`tel:${info.phone}`} className="text-[14px] md:text-[11px] font-bold text-slate-700 block truncate hover:underline">{info.phone}</a>
                </div>
              </div>

              {/* 3번째 줄: 주소 */}
              <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-1.5 col-span-2">
                <MapPin className="w-4 h-4 text-slate-400 flex-none" />
                <div className="min-w-0">
                  <span className="text-[12px] md:text-[9px] font-bold text-slate-400 block leading-tight">주소</span>
                  <span className="text-[14px] md:text-[11px] font-bold text-slate-700 block truncate" title={info.address}>{info.address}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ================= PC용 다른 시장 빠른 이동 네비게이션 ================= */}
      <div className="hidden md:block mt-16 border-t border-gray-300">
        <div className="bg-gray-200">
          <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-black text-gray-900">다른 시장도 둘러보세요</h3>
                <p className="text-gray-400 text-sm mt-1 font-medium">동대문구의 다양한 전통시장을 만나보세요</p>
              </div>
              <Link to="/" className="text-sm font-bold text-blue-500 hover:text-blue-700 flex items-center gap-1 transition-colors">
                전체 시장 보기 <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {otherMarkets.slice(0, 4).map(m => {
                const mHex = colorMap[m.color] || "#2563eb";
                return (
                  <Link 
                    key={m.id} 
                    to={`/market/${m.id}`}
                    className="group flex items-center gap-4 bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-lg hover:border-gray-200 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-none shadow-sm">
                      <img src={m.image} alt={m.name.replace('\n', ' ')} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px] font-black flex-none" style={{ backgroundColor: mHex }}>{m.id}</span>
                        <span className="text-sm font-black text-gray-900 truncate">{m.name.replace('\n', ' ')}</span>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">{m.description.split('\n')[0]}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 flex-none" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
