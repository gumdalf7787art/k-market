import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScanLine, Map, Navigation, Star, X } from 'lucide-react';
import MarketCard from '../components/MarketCard';
import { markets } from '../data/markets';

export default function HomePage() {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  return (
    <div className="bg-gray-50 md:bg-white flex-1 flex flex-col relative overflow-hidden md:overflow-visible">
      
      {/* 1. 상단 전체 배경 이미지 (가로 비율에 맞춰 최적화 크롭된 hero-desktop.webp 적용 및 이미지를 50px 아래로 이동하기 위해 object-[right_61%] 적용) */}
      <div className="absolute top-0 left-0 right-0 z-0 h-[180px] md:h-[320px] overflow-hidden">
        <div className="relative w-full h-full">
          <img 
            src="/images/hero-desktop.webp" 
            alt="동대문 배경" 
            className="w-full h-full object-cover block opacity-95 object-[center_bottom] md:object-[right_61%]"
          />
          {/* PC에서는 더 짙고 고급스러운 그라데이션 오버레이로 타이틀 가독성을 극대화 */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-80% md:from-black/40 md:via-black/20 md:to-white to-gray-50 md:hidden"></div>
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>
      </div>

      {/* 2. 상단 히어로 섹션 콘텐츠 (PC에서는 320px 높이에 맞춰 컴팩트하게 정렬) */}
      <div className="relative z-10 flex-none pb-1 md:pb-0 md:h-[320px] md:flex md:items-center">
        {/* PC: max-w-7xl 컨테이너 안에서 좌측 정렬 */}
        <div className="px-3 pt-4 md:px-8 md:pt-0 md:max-w-7xl md:mx-auto md:w-full">
          <div className="flex justify-between items-center mb-0.5 md:block">
            <h1 className="text-xl sm:text-2xl md:text-[45px] md:leading-tight font-black tracking-tighter drop-shadow-sm mt-1">
              <span className="text-black md:text-white">동대문</span>{' '}
              <span className="text-blue-600 md:text-blue-400">K-전통시장</span>
            </h1>
            
            {/* 모바일 전용 QR 스캔 버튼 */}
            <button className="md:hidden bg-white/90 text-gray-800 px-1.5 py-1 rounded-md shadow-sm flex items-center gap-0.5 text-[8.5px] sm:text-[9.5px] font-bold border border-gray-100 backdrop-blur-sm flex-none">
              <ScanLine size={11} />
              QR 스캔
            </button>
          </div>
          
          <p className="text-gray-800 md:text-gray-200 text-[8px] sm:text-[9px] md:text-lg mt-1 mb-1.5 md:mt-3 md:mb-6 pr-12 md:pr-0 font-bold break-keep leading-snug">
            스마트폰으로 언제 어디서든 <br className="md:hidden" />
            <span className="hidden md:inline">동대문 K-전통시장의 </span>상세 정보와 위치를 확인하세요.
          </p>

          {/* 퀵 액션 버튼 3개 (PC에서는 큰 가로형 버튼으로 나열) */}
          <div className="flex gap-1.5 md:gap-4 mt-1 md:mt-2 justify-start">
            <button 
              onClick={() => setIsMapModalOpen(true)}
              className="bg-white/90 md:bg-white/10 md:hover:bg-white/20 md:backdrop-blur-md rounded-lg md:rounded-xl flex flex-col md:flex-row items-center justify-center md:px-6 md:py-3 shadow-sm w-[38px] md:w-auto aspect-square md:aspect-auto border border-white/50 hover:bg-white transition-colors backdrop-blur-md flex-none"
            >
              <Map className="text-blue-600 md:text-white mb-0.5 md:mb-0 md:mr-2 md:w-5 md:h-5" size={12} />
              <span className="text-[7px] md:text-sm font-bold text-gray-800 md:text-white leading-none md:leading-normal">전체 지도</span>
            </button>
            <button className="bg-white/90 md:bg-white/10 md:hover:bg-white/20 md:backdrop-blur-md rounded-lg md:rounded-xl flex flex-col md:flex-row items-center justify-center md:px-6 md:py-3 shadow-sm w-[38px] md:w-auto aspect-square md:aspect-auto border border-white/50 hover:bg-white transition-colors backdrop-blur-md flex-none">
              <Navigation className="text-blue-600 md:text-white mb-0.5 md:mb-0 md:mr-2 md:w-5 md:h-5" size={12} />
              <span className="text-[7px] md:text-sm font-bold text-gray-800 md:text-white leading-none md:leading-normal">현재 위치</span>
            </button>
            <Link to="/favorites" className="bg-white/90 md:bg-white/10 md:hover:bg-white/20 md:backdrop-blur-md rounded-lg md:rounded-xl flex flex-col md:flex-row items-center justify-center md:px-6 md:py-3 shadow-sm w-[38px] md:w-auto aspect-square md:aspect-auto border border-white/50 hover:bg-white transition-colors backdrop-blur-md flex-none hover:no-underline">
              <Star className="text-gray-600 md:text-white mb-0.5 md:mb-0 md:mr-2 md:w-5 md:h-5" size={12} />
              <span className="text-[7px] md:text-sm font-bold text-gray-800 md:text-white leading-none md:leading-normal">즐겨찾기</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. 시장 목록 그리드 (PC에서는 세련된 배경과 함께 3열 그리드로 전환) */}
      <div className="relative z-20 overflow-hidden md:overflow-visible flex flex-col flex-1">
        
        {/* PC용 미세 그라데이션 배경 래퍼 */}
        <div className="md:bg-gradient-to-b md:from-white md:via-slate-50/80 md:to-slate-100/60 flex-1 flex flex-col">
          <div className="flex-1 w-[85%] mx-auto pt-1.5 pb-2 md:max-w-7xl md:w-full md:px-8 md:pt-10 md:pb-16 flex flex-col">
            
            {/* PC용 섹션 타이틀 - 장식선과 서브텍스트 추가 */}
            <div className="hidden md:flex flex-col items-center mb-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-blue-400 rounded-full"></div>
                <span className="text-sm font-bold text-blue-500 tracking-widest uppercase">Traditional Markets</span>
                <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-blue-400 rounded-full"></div>
              </div>
              <h2 className="text-3xl font-black text-gray-900 text-center">모든 시장 둘러보기</h2>
              <p className="text-gray-400 text-sm mt-2 font-medium">동대문구 9개 전통시장의 생생한 정보를 한눈에 확인하세요</p>
            </div>
            
            <div className="grid grid-cols-3 grid-rows-3 md:grid-rows-none md:grid-cols-3 lg:grid-cols-3 gap-x-1.5 gap-y-2 md:gap-8 lg:gap-10 flex-1 h-full">
              {markets.map(market => (
                <MarketCard key={market.id} market={market} />
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 전체 지도 이미지 모달 */}
      {isMapModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setIsMapModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl md:rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-none">
              <div>
                <h3 className="font-black text-gray-900 text-base md:text-lg">동대문 K-전통시장 전체 지도</h3>
                <p className="text-xs text-gray-400 font-bold -mt-0.5">9개 시장의 위치를 한눈에 확인하세요!</p>
              </div>
              <button 
                onClick={() => setIsMapModalOpen(false)}
                className="p-1.5 hover:bg-gray-100 text-gray-400 hover:text-gray-800 rounded-full transition-colors"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>
            
            {/* 지도 이미지 영역 (스크롤 가능) */}
            <div className="flex-1 overflow-auto bg-gray-50 flex items-center justify-center p-3">
              <img 
                src="/images/full_map.png" 
                alt="동대문 K-전통시장 전체 지도" 
                className="max-w-full h-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
