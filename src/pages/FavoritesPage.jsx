import { useState, useEffect } from 'react';
import { Star, ArrowLeft, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import MarketCard from '../components/MarketCard';
import { markets } from '../data/markets';

export default function FavoritesPage() {
  const [favoriteMarkets, setFavoriteMarkets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 즐겨찾기 목록 불러오기
    const favorites = JSON.parse(localStorage.getItem('k-market-favorites') || '[]');
    // 해당 시장 필터링
    const filtered = markets.filter(m => favorites.includes(m.id.toString()));
    setFavoriteMarkets(filtered);
  }, []);

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-70px)] md:min-h-[calc(100vh-64px)] flex flex-col pb-12">
      {/* 1. 상단 타이틀 바 */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 md:h-16 flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-700 animate-click"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </button>
          <h1 className="text-base md:text-lg font-black text-gray-900 flex items-center gap-1.5">
            <Star className="text-yellow-500 fill-yellow-500 w-5 h-5 animate-pulse" />
            <span>내가 등록한 즐겨찾기</span>
          </h1>
        </div>
      </div>

      {/* 2. 콘텐츠 컨테이너 */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 pt-6 md:pt-10 flex flex-col">
        {favoriteMarkets.length === 0 ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center py-16 text-center my-auto">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
              <Heart size={32} className="stroke-[1.5]" />
            </div>
            <h3 className="text-base md:text-lg font-black text-gray-800">즐겨찾기한 시장이 없습니다</h3>
            <p className="text-xs md:text-sm text-gray-400 mt-1.5 font-medium leading-relaxed max-w-[280px] md:max-w-md">
              자주 방문하거나 관심 있는 시장을<br className="md:hidden"/> 즐겨찾기에 추가하고 빠르게 확인해 보세요!
            </p>
            <Link 
              to="/" 
              className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs md:text-sm rounded-xl shadow-md transition-colors"
            >
              시장 둘러보러 가기
            </Link>
          </div>
        ) : (
          /* 즐겨찾기 리스트 */
          <div className="flex-1 flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs md:text-sm text-gray-500 font-bold">
                총 <span className="text-blue-600">{favoriteMarkets.length}개</span>의 시장이 등록되어 있습니다.
              </span>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-x-1.5 gap-y-3 md:gap-8 lg:gap-10">
              {favoriteMarkets.map(market => (
                <MarketCard key={market.id} market={market} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
