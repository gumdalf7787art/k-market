import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Store, Phone, MapPin, Info } from 'lucide-react';
import { markets } from '../data/markets';
import { floorData } from '../data/floorData';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // 모든 시장의 모든 점포 데이터 평탄화
  const allStores = useMemo(() => {
    const stores = [];
    markets.forEach(market => {
      const data = floorData[market.id];
      if (data && data.floors) {
        data.floors.forEach(floor => {
          floor.categories.forEach(category => {
            category.stores.forEach(store => {
              stores.push({
                ...store,
                marketId: market.id,
                marketName: market.name.replace('\n', ' '),
                floorId: floor.id,
                floorName: floor.name,
                categoryName: category.name,
              });
            });
          });
        });
      }
    });
    return stores;
  }, []);

  // 상호명 검색 (입력값이 없으면 결과 0건 또는 전체 중 일부만 노출할 수도 있으나, 여기선 전체 노출 기반 필터링)
  const filteredStores = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return allStores.filter(store => 
      store.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allStores, searchTerm]);

  return (
    <div className="bg-gray-100 md:bg-gradient-to-b md:from-slate-50 md:to-white min-h-[calc(100vh-70px)] md:min-h-[calc(100vh-64px)] flex flex-col pb-20">
      {/* 상단 헤더 */}
      <div className="sticky top-0 z-40 bg-[#111111]">
        <div className="max-w-[800px] mx-auto px-4 md:px-8 h-14 md:h-16 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 -ml-1.5 rounded-full text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={22} strokeWidth={2.5} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base md:text-lg font-black text-white truncate drop-shadow-sm">통합 검색</h1>
            <p className="text-[11px] md:text-xs text-gray-400 font-bold -mt-0.5">전체 시장 점포 검색</p>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-[800px] mx-auto flex flex-col md:px-8 md:py-6">
        {/* 검색 영역 */}
        <div className="bg-white md:rounded-[24px] rounded-b-[24px] shadow-sm border-b border-gray-200 md:border-slate-200 p-4 pt-5 md:p-6 mb-3 md:mb-6 relative z-30">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full bg-gray-50 border-2 border-gray-300 text-gray-900 text-[15px] font-bold rounded-2xl focus:ring-2 focus:ring-[#111111] focus:border-transparent block pl-11 pr-4 py-3.5 md:py-4 transition-all outline-none"
              placeholder="찾으시는 점포 이름을 입력하세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.target.blur();
                }
              }}
              autoFocus
            />
          </div>
        </div>

        {/* 결과 건수 */}
        {searchTerm.trim() !== '' && (
          <div className="px-4 md:px-0 py-3 flex items-center justify-between">
            <p className="text-sm font-bold text-gray-600">
              총 <span className="text-lg font-black text-[#111111]">{filteredStores.length}</span>개의 점포
            </p>
          </div>
        )}

        {/* 점포 목록 */}
        <div className="px-4 md:px-0 pb-8">
          {searchTerm.trim() === '' ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-gray-100 shadow-sm mt-2">
              <Search className="mx-auto mb-4 text-gray-300 w-12 h-12" />
              <p className="text-gray-500 font-bold text-base">상호명을 검색해보세요.</p>
              <p className="text-gray-400 text-sm mt-1">9개의 시장에 등록된 모든 점포를 검색합니다.</p>
            </div>
          ) : filteredStores.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-gray-100 shadow-sm mt-2">
              <Store className="mx-auto mb-4 text-gray-300 w-12 h-12" />
              <p className="text-gray-500 font-bold text-base">검색 결과가 없습니다.</p>
              <p className="text-gray-400 text-sm mt-1">다른 검색어를 입력해 보세요.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {filteredStores.map((store, idx) => (
                <div 
                  key={idx} 
                  onClick={() => navigate(`/market/${store.marketId}/store/${encodeURIComponent(store.name)}`)}
                  className="bg-white rounded-2xl p-3 md:p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3 md:gap-4 cursor-pointer"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden flex-none bg-slate-100 border border-gray-200 shadow-sm">
                    <img 
                      src={store.image || 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=250&q=80'} 
                      alt={store.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                      <span className="text-[10px] md:text-xs font-black px-2 py-0.5 rounded-md bg-[#111111] text-white">
                        {store.marketName}
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
                      <Phone size={10} className="text-gray-400" />
                      <a href={`tel:${store.phone}`} className="text-[10px] md:text-[11px] font-bold text-gray-500 hover:text-gray-900 transition-colors">
                        {store.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-none mt-1">
                    <button 
                      onClick={(e) => { e.stopPropagation(); alert(`[${store.name}] 상세 정보 페이지는 준비 중입니다.`); }}
                      className="w-7 h-7 md:w-9 md:h-9 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors border border-slate-200"
                      title="업체 정보"
                    >
                      <Info size={14} className="text-gray-600" />
                    </button>
                    <a 
                      href={`tel:${store.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors border border-slate-200"
                      title="전화 걸기"
                    >
                      <Phone size={14} className="text-gray-600" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
