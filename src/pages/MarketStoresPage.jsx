import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Store, Phone, MapPin, Info, X } from 'lucide-react';
import { markets } from '../data/markets';
import { floorData } from '../data/floorData';
import { useState, useMemo, useEffect, useRef } from 'react';

// 색상 맵
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

export default function MarketStoresPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const marketId = parseInt(id, 10) || 1;
  const market = markets.find((m) => m.id === marketId) || markets[0];
  const data = floorData[marketId];
  const hexColor = colorMap[market.color] || "#2563eb";
  const displayName = market.name.replace('\n', ' ');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // 모든 점포 데이터 추출 및 평탄화
  const allStores = useMemo(() => {
    const stores = [];
    if (data && data.floors) {
      data.floors.forEach(floor => {
        floor.categories.forEach(category => {
          category.stores.forEach(store => {
            stores.push({
              ...store,
              floorId: floor.id,
              floorName: floor.name,
              categoryName: category.name,
            });
          });
        });
      });
    }
    return stores;
  }, [data]);

  // 존재하는 카테고리 목록 추출
  const categories = useMemo(() => {
    const cats = new Set(['전체']);
    allStores.forEach(store => cats.add(store.categoryName));
    return Array.from(cats);
  }, [allStores]);

  // 필터링 로직
  const filteredStores = useMemo(() => {
    return allStores.filter(store => {
      const matchesCategory = selectedCategory === '전체' || store.categoryName === selectedCategory;
      const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allStores, selectedCategory, searchTerm]);

  return (
    <div className="bg-gray-100 flex-1 flex flex-col">
      {/* 상단 헤더 */}
      <div 
        className="sticky top-0 z-40"
        style={{ backgroundColor: hexColor }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 md:h-16 flex items-center gap-3">
          <button
            onClick={() => navigate(`/market/${marketId}`)}
            className="p-1.5 -ml-1.5 rounded-full text-white hover:bg-black/10 transition-colors"
          >
            <ArrowLeft size={22} strokeWidth={2.5} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base md:text-lg font-black text-white truncate drop-shadow-sm">{displayName}</h1>
            <p className="text-[11px] md:text-xs text-white/80 font-bold -mt-0.5">점포 안내</p>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col md:px-8 md:py-6 md:[zoom:0.8]">
        {/* 검색 및 필터 영역 (하얀색 패널로 분리하여 입체감 부여) */}
        <div className="bg-white md:rounded-[24px] rounded-b-[24px] shadow-sm border-b border-gray-200 md:border-slate-200 p-4 pt-5 md:p-6 mb-3 md:mb-6 relative z-30">
          
          {/* 검색창 */}
          <div className="relative mb-5">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full bg-gray-50/80 border-2 border-gray-300 text-gray-900 text-[15px] font-medium rounded-2xl focus:ring-2 focus:ring-opacity-50 focus:border-transparent block pl-11 pr-4 py-3.5 md:py-4 transition-all"
              style={{ focusRingColor: hexColor }}
              placeholder="찾으시는 점포 이름을 입력하세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.target.blur();
                }
              }}
            />
          </div>

          {/* 카테고리 필터 (가로 스크롤) */}
          <div className="overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar">
            <div className="flex gap-2 w-max">
              {categories.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2.5 rounded-xl text-[14px] font-black transition-all ${
                      isSelected 
                        ? 'text-white shadow-md border border-transparent' 
                        : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-gray-200 shadow-sm'
                    }`}
                    style={isSelected ? { backgroundColor: hexColor } : {}}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 결과 건수 및 지도 보기 버튼 */}
        <div className="px-4 md:px-0 py-3 flex items-center justify-between">
          <p className="text-sm font-bold text-gray-600">
            총 <span className="text-lg font-black" style={{ color: hexColor }}>{filteredStores.length}</span>개의 점포
          </p>
          
          {filteredStores.length > 0 && (
            <button 
              onClick={() => setIsMapModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black text-white shadow-sm transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: hexColor }}
            >
              <MapPin size={14} strokeWidth={2.5} />
              지도로 보기
            </button>
          )}
        </div>

        {/* 점포 목록 */}
        <div className="px-4 md:px-0 pb-8">
          {filteredStores.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border-2 border-gray-200 shadow-md mt-2">
              <Store className="mx-auto mb-4 text-gray-300 w-12 h-12" />
              <p className="text-gray-500 font-bold text-base">검색 결과가 없습니다.</p>
              <p className="text-gray-400 text-sm mt-1">다른 검색어나 카테고리를 선택해 보세요.</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('전체'); }}
                className="mt-6 px-5 py-2.5 rounded-xl text-sm font-bold bg-slate-100 text-gray-600 hover:bg-slate-200 transition-colors"
              >
                검색 초기화
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
              {filteredStores.map((store, idx) => (
                <div 
                  key={idx} 
                  onClick={() => navigate(`/market/${marketId}/store/${encodeURIComponent(store.name)}`)}
                  className="bg-white rounded-2xl p-4 md:p-5 border-2 border-gray-200 shadow-md hover:shadow-lg hover:border-gray-300 transition-shadow flex items-center gap-3 md:gap-4 cursor-pointer"
                >
                  {/* 스토어 이미지 썸네일 */}
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden flex-none bg-slate-100 border border-gray-200 shadow-sm">
                    <img 
                      src={store.image || 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=250&q=80'} 
                      alt={store.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* 스토어 정보 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                      <span className="text-[11px] md:text-xs font-black px-2 py-0.5 rounded-md bg-slate-100 text-gray-600">
                        {store.categoryName}
                      </span>
                      <span className="text-[11px] md:text-xs font-bold px-2 py-0.5 rounded-md border border-gray-200 text-gray-500 flex items-center gap-0.5">
                        <MapPin size={10} />
                        {store.floorId}
                      </span>
                    </div>
                    <h3 className="text-[13px] md:text-[15px] font-black text-gray-900 truncate mb-1">
                      {store.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Phone size={12} className="text-gray-400" />
                      <a href={`tel:${store.phone}`} className="text-[11px] md:text-[12px] font-bold text-gray-500 hover:text-gray-900 transition-colors">
                        {store.phone}
                      </a>
                    </div>
                  </div>

                  {/* 우측 개별 액션 버튼들 (지도 -> 정보 -> 전화) */}
                  <div className="flex items-center gap-1.5 flex-none mt-1">
                    {/* 지도 보기 (조그맣고 네모난 버튼) */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); alert(`[${store.name}] 지도 보기 기능은 준비 중입니다.`); }}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-colors border hover:opacity-80"
                      style={{ backgroundColor: hexColor + '10', borderColor: hexColor + '20', color: hexColor }}
                      title="지도 보기"
                    >
                      <MapPin size={15} />
                    </button>
                    {/* 업체 정보 (조그맣고 네모난 버튼) */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); alert(`[${store.name}] 상세 정보 페이지는 준비 중입니다.`); }}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors border border-slate-200"
                      title="업체 정보"
                    >
                      <Info size={15} className="text-gray-600" />
                    </button>
                    {/* 전화 걸기 (기존 동그란 버튼) */}
                    <a 
                      href={`tel:${store.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors border border-slate-200"
                      title="전화 걸기"
                    >
                      <Phone size={15} className="text-gray-600" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* CSS: 스크롤바 숨기기 유틸리티 */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* 네이버 지도 모달 렌더링 */}
      {isMapModalOpen && (
        <NaverMapModal 
          stores={filteredStores} 
          onClose={() => setIsMapModalOpen(false)} 
          hexColor={hexColor} 
          marketName={displayName} 
        />
      )}
    </div>
  );
}

// ================= 네이버 지도 모달 컴포넌트 =================
function NaverMapModal({ stores, onClose, hexColor, marketName }) {
  const mapRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    // 이미 윈도우에 naver 객체가 존재하면 바로 활성화
    if (window.naver && window.naver.maps) {
      setScriptLoaded(true);
      return;
    }

    // 네이버 지도 스크립트 로드
    const script = document.createElement('script');
    // 테스트용으로 널리 사용되는 Client ID를 활용하여 localhost 등 테스트 도메인 지원
    script.src = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=subway';
    script.async = true;

    script.onload = () => {
      if (window.naver && window.naver.maps) {
        setScriptLoaded(true);
      } else {
        setLoadError(true);
      }
    };

    script.onerror = () => {
      setLoadError(true);
    };

    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!scriptLoaded || !mapRef.current || !window.naver || !window.naver.maps) return;

    // 경동시장 위도, 경도 좌표
    const centerLat = 37.5796;
    const centerLng = 127.0374;

    const mapOptions = {
      center: new window.naver.maps.LatLng(centerLat, centerLng),
      zoom: 18,
      minZoom: 10,
      zoomControl: true,
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_RIGHT
      }
    };

    const map = new window.naver.maps.Map(mapRef.current, mapOptions);
    const infoWindows = [];

    // 각 점포별 마커 생성
    stores.forEach((store, index) => {
      // 겹치지 않게 미세 궤도 분포 계산
      const angle = index * (Math.PI / 3);
      const radius = 0.00012 + (index * 0.00001);
      const lat = centerLat + Math.sin(angle) * radius;
      const lng = centerLng + Math.cos(angle) * radius;

      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(lat, lng),
        map: map,
        title: store.name,
        animation: index < 5 ? window.naver.maps.Animation.DROP : null
      });

      // 마커 클릭 시의 정보창 스타일링 및 콘텐츠 정의
      const contentString = `
        <div style="padding: 12px; min-width: 170px; font-family: -apple-system, sans-serif; line-height: 1.4;">
          <div style="font-size: 10px; font-weight: bold; color: ${hexColor}; margin-bottom: 2px;">
            ${store.categoryName} (${store.floorName})
          </div>
          <h4 style="margin: 0 0 4px 0; font-size: 14.5px; font-weight: 800; color: #111827;">
            ${store.name}
          </h4>
          <a href="tel:${store.phone}" style="margin: 0; font-size: 12px; color: #6b7280; text-decoration: none; font-weight: 500;">
            📞 ${store.phone}
          </a>
        </div>
      `;

      const infowindow = new window.naver.maps.InfoWindow({
        content: contentString,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: '12px',
        anchorSize: new window.naver.maps.Size(10, 10),
        anchorSkew: true,
        pixelOffset: new window.naver.maps.Point(0, -6)
      });

      infoWindows.push(infowindow);

      window.naver.maps.Event.addListener(marker, 'click', () => {
        infoWindows.forEach(iw => iw.close());
        infowindow.open(map, marker);
      });
    });

    // 지도가 로드된 후 첫 번째 마커에 정보창을 띄워주는 인터랙티브 가이드
    if (stores.length > 0 && infoWindows[0]) {
      setTimeout(() => {
        // 첫 번째 점포 정보창을 띄워 극적인 데모 체험 제공
        // infoWindows[0].open(map, map.getCenter()); // 맵 중앙에 띄울수도 있음
      }, 500);
    }
  }, [scriptLoaded, stores, hexColor]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* 지도 모달 헤더 */}
      <div 
        className="flex items-center justify-between px-4 h-14 text-white shadow-md flex-none"
        style={{ backgroundColor: hexColor }}
      >
        <div className="min-w-0">
          <h3 className="font-black text-[15px] truncate">{marketName} 지도 안내</h3>
          <p className="text-[10px] text-white/85 font-bold -mt-0.5">
            검색 결과 점포 (${stores.length}개) 마커 표시 중
          </p>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
        >
          <X size={22} strokeWidth={2.5} />
        </button>
      </div>

      {/* 지도 영역 */}
      <div className="flex-1 relative bg-slate-50 flex items-center justify-center">
        {!scriptLoaded && !loadError && (
          <div className="text-center p-6">
            <div 
              className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent mx-auto mb-4"
              style={{ borderColor: `${hexColor}20`, borderTopColor: hexColor }}
            />
            <p className="text-sm font-bold text-gray-500">네이버 지도를 불러오는 중입니다...</p>
          </div>
        )}

        {loadError && (
          <div className="text-center p-6 max-w-sm">
            <p className="text-red-500 font-black text-base mb-2">지도 서비스 로드 실패</p>
            <p className="text-sm text-gray-500 mb-4">네이버 지도 API 라이센스 혹은 네트워크 상태를 확인해주세요.</p>
            <button 
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-gray-600 hover:bg-slate-200 transition-colors"
            >
              닫기
            </button>
          </div>
        )}

        {/* 지도 돔 */}
        <div 
          ref={mapRef} 
          className="w-full h-full" 
          style={{ display: scriptLoaded ? 'block' : 'none' }}
        />
      </div>
    </div>
  );
}
