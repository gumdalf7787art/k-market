import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, MapPin, Phone, X, Map, ArrowRight } from 'lucide-react';
import { markets } from '../data/markets';
import { floorData } from '../data/floorData';
import { useState } from 'react';

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

export default function MarketFloorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const marketId = parseInt(id, 10) || 1;
  const market = markets.find((m) => m.id === marketId) || markets[0];
  const data = floorData[marketId];
  const hexColor = colorMap[market.color] || "#2563eb";
  const displayName = market.name.replace('\n', ' ');

  // 모바일: 아코디언 열림/닫힘
  const [openFloors, setOpenFloors] = useState(
    data?.floors?.length > 0 ? [data.floors[0].id] : []
  );
  // PC: 선택된 층 (좌측 클릭 시 우측에 표시)
  const [selectedFloor, setSelectedFloor] = useState(
    data?.floors?.length > 0 ? data.floors[0].id : null
  );
  // 지도 모달 상태
  const [mapModal, setMapModal] = useState(null);

  const toggleFloor = (floorId) => {
    setOpenFloors(prev =>
      prev.includes(floorId)
        ? prev.filter(id => id !== floorId)
        : [...prev, floorId]
    );
  };

  // 전체 업체 수 계산
  const totalStores = data?.floors?.reduce((sum, floor) =>
    sum + floor.categories.reduce((catSum, cat) => catSum + cat.stores.length, 0), 0
  ) || 0;

  // PC에서 선택된 층 데이터
  const selectedFloorData = data?.floors?.find(f => f.id === selectedFloor);

  return (
    <div className="bg-gray-100 flex-1 flex flex-col">

      {/* 상단 헤더 */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-14 md:h-16 flex items-center gap-3">
          <button
            onClick={() => navigate(`/market/${marketId}`)}
            className="p-1.5 -ml-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={22} strokeWidth={2.5} className="text-gray-700" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base md:text-lg font-black text-gray-900 truncate">{displayName}</h1>
            <p className="text-[11px] md:text-xs text-gray-400 font-bold -mt-0.5">층별 안내</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold" style={{ backgroundColor: hexColor + '15', color: hexColor }}>
            <Map size={14} />
            {data?.floors?.length || 0}개 층 · {totalStores}개 점포
          </div>
        </div>
      </div>

      {!data || data.floors.length === 0 ? (
        <div className="text-center py-20">
          <Map className="mx-auto mb-4 text-gray-300" size={48} />
          <p className="text-gray-400 font-bold text-lg">층별 안내 정보가 준비 중입니다</p>
        </div>
      ) : (
        <>
          {/* ==================== 모바일: 아코디언 레이아웃 ==================== */}
          <div className="md:hidden flex-1 px-3 py-4">
            <div className="flex flex-col gap-3">
              {data.floors.map((floor) => {
                const isOpen = openFloors.includes(floor.id);
                const storeCount = floor.categories.reduce((sum, cat) => sum + cat.stores.length, 0);

                return (
                  <div key={floor.id} className={`rounded-2xl shadow-sm border overflow-hidden transition-colors ${isOpen ? 'bg-white border-gray-300' : 'bg-white border-gray-100'}`}>
                    {/* 층 헤더 */}
                    <div className="w-full px-4 py-4 flex items-center gap-3 bg-white">
                      <button
                        onClick={() => toggleFloor(floor.id)}
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg flex-none shadow-sm"
                        style={{ backgroundColor: hexColor }}
                      >
                        {floor.id}
                      </button>
                      <button
                        onClick={() => toggleFloor(floor.id)}
                        className="flex-1 min-w-0 text-left"
                      >
                        <h3 className="text-[15px] font-black text-gray-900">{floor.summary}</h3>
                        <span className="text-xs text-gray-400 font-bold">{storeCount}개 점포</span>
                      </button>
                      <button
                        onClick={() => setMapModal({ floorId: floor.id, floorName: floor.name, summary: floor.summary })}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold flex-none"
                        style={{ backgroundColor: hexColor + '15', color: hexColor }}
                      >
                        <MapPin size={13} />
                        지도
                      </button>
                      <button onClick={() => toggleFloor(floor.id)} className="p-1 flex-none">
                        <ChevronDown size={18} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {/* 업체 목록 */}
                    {isOpen && (
                      <div className="border-t border-gray-100 px-4 pb-4 bg-white">
                        {floor.categories.map((category, catIdx) => (
                          <div key={catIdx} className="mt-4">
                            <div className="flex items-center gap-2 mb-2.5">
                              <h4 className="text-sm font-black text-gray-800">{category.name}</h4>
                              <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{category.stores.length}</span>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                              {category.stores.map((store, storeIdx) => (
                                <div
                                  key={storeIdx}
                                  onClick={() => navigate(`/market/${marketId}/store/${encodeURIComponent(store.name)}`)}
                                  className="flex items-center justify-between bg-gray-50 border border-gray-200/80 rounded-xl px-3.5 py-3 cursor-pointer hover:bg-gray-100 transition-colors shadow-sm gap-2"
                                >
                                  <div className="flex-1 min-w-0">
                                    <span className="text-[11px] font-black text-gray-800 block truncate">{store.name}</span>
                                    <span className="text-[10px] text-gray-400 font-bold block mt-0.5">{store.phone}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 flex-none">
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); navigate(`/market/${marketId}/store/${encodeURIComponent(store.name)}`); }}
                                      className="w-7 h-7 flex items-center justify-center bg-white hover:bg-gray-50 rounded-lg shadow-sm border border-gray-200 text-gray-700 active:scale-95 transition-colors"
                                    >
                                      <ArrowRight size={13} />
                                    </button>
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); alert('길찾기 기능은 준비 중입니다.'); }}
                                      className="w-7 h-7 flex items-center justify-center bg-white hover:bg-gray-50 rounded-lg shadow-sm border border-gray-200 text-gray-700 active:scale-95 transition-colors"
                                    >
                                      <MapPin size={13} />
                                    </button>
                                    <a 
                                      href={`tel:${store.phone}`}
                                      onClick={(e) => e.stopPropagation()}
                                      className="w-7 h-7 flex items-center justify-center rounded-lg shadow-sm text-white active:scale-95 transition-colors hover:opacity-90"
                                      style={{ backgroundColor: hexColor }}
                                    >
                                      <Phone size={13} />
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ==================== PC: 좌우 분할 레이아웃 ==================== */}
          <div className="hidden md:flex flex-1 max-w-6xl mx-auto w-full px-8 py-8 gap-8">
            
            {/* 좌측: 층별 목록 (전체 표시) */}
            <div className="w-80 flex-none">
              <div className="sticky top-24 bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-lg font-black text-gray-900 mb-5">층별 안내</h2>
                <div className="flex flex-col gap-2.5">
                  {data.floors.map((floor) => {
                    const isSelected = selectedFloor === floor.id;
                    const storeCount = floor.categories.reduce((sum, cat) => sum + cat.stores.length, 0);

                    return (
                      <button
                        key={floor.id}
                        onClick={() => setSelectedFloor(floor.id)}
                        className={`w-full px-4 py-4 rounded-2xl flex items-center gap-3 text-left transition-all duration-200 border-2 ${
                          isSelected
                            ? 'bg-gray-200 shadow-inner border-transparent'
                            : 'bg-white hover:bg-gray-50 border-gray-100 hover:border-gray-200'
                        }`}
                        style={isSelected ? { borderColor: hexColor + '60' } : {}}
                      >
                        {/* 층 번호 배지 */}
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg flex-none shadow-sm transition-all ${
                            isSelected ? 'text-white' : 'text-gray-500'
                          }`}
                          style={{ backgroundColor: isSelected ? hexColor : '#f1f5f9' }}
                        >
                          {floor.id}
                        </div>

                        {/* 층 정보 */}
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-sm font-black truncate transition-colors ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
                            {floor.summary}
                          </h3>
                          <span className="text-xs text-gray-400 font-bold">{storeCount}개 점포</span>
                        </div>

                        {/* 선택 표시 마커 */}
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full flex-none" style={{ backgroundColor: hexColor }}></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 우측: 선택된 층의 매장 상세 */}
            <div className="flex-1 min-w-0">
              {selectedFloorData && (
                <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
                  {/* 층 상세 헤더 */}
                  <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-md"
                        style={{ backgroundColor: hexColor }}
                      >
                        {selectedFloorData.id}
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-gray-900">{selectedFloorData.summary}</h2>
                        <p className="text-sm text-gray-400 font-bold mt-0.5">
                          {selectedFloorData.name} · {selectedFloorData.categories.reduce((sum, cat) => sum + cat.stores.length, 0)}개 점포
                        </p>
                      </div>
                    </div>

                    {/* 지도 보기 버튼 */}
                    <button
                      onClick={() => setMapModal({ floorId: selectedFloorData.id, floorName: selectedFloorData.name, summary: selectedFloorData.summary })}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:shadow-lg"
                      style={{ backgroundColor: hexColor + '15', color: hexColor }}
                    >
                      <MapPin size={16} />
                      지도 보기
                    </button>
                  </div>

                  {/* 카테고리별 업체 목록 */}
                  <div className="px-8 py-6">
                    {selectedFloorData.categories.map((category, catIdx) => (
                      <div key={catIdx} className={catIdx > 0 ? 'mt-8' : ''}>
                        {/* 카테고리 헤더 */}
                        <div className="flex items-center gap-2.5 mb-4">
                          <div className="w-1 h-5 rounded-full" style={{ backgroundColor: hexColor }}></div>
                          <h3 className="text-base font-black text-gray-800">{category.name}</h3>
                          <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full">{category.stores.length}</span>
                        </div>

                        {/* 업체 그리드 */}
                        <div className="grid grid-cols-2 gap-3">
                          {category.stores.map((store, storeIdx) => (
                            <div
                              key={storeIdx}
                              onClick={() => navigate(`/market/${marketId}/store/${encodeURIComponent(store.name)}`)}
                              className="flex items-center justify-between bg-gray-100 border border-gray-200 hover:bg-gray-200 rounded-xl px-4 py-3.5 transition-colors cursor-pointer group shadow-sm gap-3"
                            >
                              <div className="flex-1 min-w-0">
                                <span className="text-[13px] font-black text-gray-800 block truncate group-hover:text-blue-600 transition-colors">{store.name}</span>
                                <span className="text-[11px] text-gray-400 font-bold block mt-0.5">{store.phone}</span>
                              </div>
                              <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity flex-none">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); navigate(`/market/${marketId}/store/${encodeURIComponent(store.name)}`); }}
                                  className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-50 rounded-lg shadow-sm border border-gray-200 text-gray-700 transition-colors"
                                >
                                  <ArrowRight size={14} />
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); alert('길찾기 기능은 준비 중입니다.'); }}
                                  className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-50 rounded-lg shadow-sm border border-gray-200 text-gray-700 transition-colors"
                                >
                                  <MapPin size={14} />
                                </button>
                                <a 
                                  href={`tel:${store.phone}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-8 h-8 flex items-center justify-center rounded-lg shadow-sm text-white transition-opacity hover:opacity-90"
                                  style={{ backgroundColor: hexColor }}
                                >
                                  <Phone size={14} />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* 지도 모달 */}
      {mapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMapModal(null)}
          ></div>
          <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm"
                  style={{ backgroundColor: hexColor }}
                >
                  {mapModal.floorId}
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-black text-gray-900">{mapModal.summary}</h3>
                  <p className="text-xs text-gray-400 font-bold">{displayName} · {mapModal.floorName}</p>
                </div>
              </div>
              <button
                onClick={() => setMapModal(null)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-inner">
                <div className="w-full aspect-[4/3] md:aspect-[16/9] flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-50 p-8">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: hexColor + '15' }}>
                    <Map size={36} className="md:w-12 md:h-12" style={{ color: hexColor }} />
                  </div>
                  <p className="text-lg md:text-xl font-black text-gray-800 mb-1">{mapModal.floorId} 층 안내도</p>
                  <p className="text-sm text-gray-400 font-medium text-center break-keep">
                    {displayName}의 {mapModal.floorName} 안내도입니다.<br />
                    상세 지도 이미지가 곧 업데이트될 예정입니다.
                  </p>
                </div>
              </div>
              <p className="text-center text-xs text-gray-400 font-bold mt-4">
                지도를 확대하려면 화면을 두 손가락으로 벌리세요
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
