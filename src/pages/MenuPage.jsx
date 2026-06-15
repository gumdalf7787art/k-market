import React from 'react';
import { ArrowLeft, User, MessageSquare, Search, Compass, LogIn, UserPlus, ChevronRight, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MenuPage() {
  const navigate = useNavigate();

  const menuItems = [
    { name: '공지사항', icon: Bell, path: '/notice', desc: '시장 관련 최신 소식 및 안내' },
    { name: '게시판', icon: MessageSquare, path: '/board', desc: '상인 및 방문객 소통 게시판' },
    { name: '통합검색', icon: Search, path: '/search', desc: '점포 및 시장 상세 검색' },
    { name: '테마코스', icon: Compass, path: '/theme', desc: '추천 전통시장 테마 투어 코스' },
  ];

  const handleAuth = (action) => {
    alert(`${action} 기능은 현재 준비 중입니다.`);
  };

  const handleMenuClick = (item) => {
    if (item.path === '/board' || item.path === '/notice' || item.path === '/search') {
      navigate(item.path);
    } else {
      alert(`${item.name} 페이지는 준비 중입니다.`);
    }
  };

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-70px)] md:min-h-[calc(100vh-64px)] flex flex-col pb-12 md:pb-20">
      {/* 상단 헤더 (모바일 전용이거나 PC에서도 타이틀 용도) */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 md:h-20 flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-700 animate-click md:hidden"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </button>
          <h1 className="text-base md:text-2xl font-black text-gray-900 md:tracking-tight">전체 메뉴</h1>
        </div>
      </div>

      {/* 전체 메뉴 콘텐츠 (PC: 그리드 레이아웃, 모바일: 세로 스택) */}
      <div className="flex-1 max-w-md md:max-w-6xl w-full mx-auto px-4 pt-6 md:pt-10 flex flex-col md:flex-row gap-6 md:gap-8">
        
        {/* 왼쪽 섹션: 프로필 및 배너 (PC에서는 왼쪽 사이드바로 고정폭 사용) */}
        <div className="flex flex-col gap-6 md:w-80 flex-none">
          {/* 프로필 로그인 카드 */}
          <div className="bg-white rounded-2xl p-5 md:p-8 shadow-xl border-2 border-gray-300 flex flex-col items-center justify-center text-center md:h-full">
            <div className="w-14 h-14 md:w-20 md:h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 md:mb-5">
              <User size={28} className="stroke-[2] md:w-10 md:h-10" />
            </div>
            <h2 className="text-sm md:text-lg font-bold text-gray-800">로그인이 필요합니다</h2>
            <p className="text-[11px] md:text-[13px] text-gray-400 mt-1 md:mt-2 font-medium max-w-[240px] md:max-w-none md:leading-relaxed">
              로그인하시면 단골 시장 즐겨찾기 관리 및 게시판 이용이 가능합니다.
            </p>
            
            <div className="flex flex-col md:flex-row gap-2 w-full mt-4 md:mt-6">
              <button 
                onClick={() => handleAuth('로그인')}
                className="flex-1 py-2.5 md:py-3 bg-blue-600 text-white rounded-xl text-xs md:text-sm font-black flex items-center justify-center gap-1.5 hover:bg-blue-700 shadow-md active:scale-95 transition-transform"
              >
                <LogIn size={16} strokeWidth={2.5} />
                로그인
              </button>
              <button 
                onClick={() => handleAuth('회원가입')}
                className="flex-1 py-2.5 md:py-3 bg-gray-100 text-gray-700 rounded-xl text-xs md:text-sm font-black flex items-center justify-center gap-1.5 hover:bg-gray-200 active:scale-95 transition-transform"
              >
                <UserPlus size={16} strokeWidth={2.5} />
                회원가입
              </button>
            </div>
          </div>


        </div>

        {/* 오른쪽 섹션: 주요 메뉴 영역 */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-300 overflow-hidden md:overflow-visible md:bg-transparent md:border-none md:shadow-none">
            {/* 모바일용 타이틀 바 */}
            <div className="px-4 py-3 border-b-2 border-gray-100 md:hidden">
              <span className="text-[11px] text-blue-600 font-bold uppercase tracking-wider">주요 서비스</span>
            </div>
            
            {/* 메뉴 아이템 렌더링: 모바일은 리스트, PC는 그리드 카드 */}
            <div className="divide-y divide-gray-100 md:divide-none md:grid md:grid-cols-2 md:gap-4 md:auto-rows-fr">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleMenuClick(item)}
                    className="w-full px-4 py-4 md:p-6 flex items-center md:items-start justify-between md:justify-start hover:bg-gray-50 active:bg-gray-100 md:active:scale-[0.98] transition-all text-left md:bg-white md:rounded-2xl md:shadow-xl md:border-2 md:border-gray-300 md:hover:shadow-2xl md:hover:-translate-y-1 group"
                  >
                    <div className="flex items-center md:flex-col md:items-start gap-3 md:gap-5 w-full">
                      <div className="w-9 h-9 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-slate-50 md:bg-blue-50 text-slate-600 md:text-blue-600 flex items-center justify-center flex-none group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <Icon className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" strokeWidth={2.5} />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs md:text-[17px] font-black text-gray-800 block leading-tight md:mb-1.5 group-hover:text-blue-600 transition-colors">
                          {item.name}
                        </span>
                        <span className="text-[10px] md:text-[13px] text-gray-400 font-medium block mt-0.5 md:leading-relaxed">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                    {/* 모바일에서는 우측 화살표 표시, PC에서는 숨김 (카드 디자인이므로) */}
                    <ChevronRight size={16} className="text-gray-400 stroke-[2.5] md:hidden" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 안내 푸터 */}
      <div className="text-center text-[10px] md:text-xs text-gray-400 font-medium pb-6 pt-10 mt-auto">
        <p>© {new Date().getFullYear()} 동대문 K-전통시장 스마트 가이드</p>
        <p className="mt-0.5 md:mt-1">고객센터 1588-0000 | v1.0.0</p>
      </div>

    </div>
  );
}
