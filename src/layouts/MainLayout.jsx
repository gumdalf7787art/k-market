import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Map as MapIcon, ScanLine, Star, Menu } from 'lucide-react';
import Footer from '../components/Footer';

export default function MainLayout() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '홈', icon: Home },
    { path: '/map', label: '지도', icon: MapIcon },
    // QR 스캔은 중앙에 크게 들어가므로 별도 처리
    { path: '/qr', label: 'QR 스캔', icon: ScanLine, isCenter: true },
    { path: '/favorites', label: '즐겨찾기', icon: Star },
    { path: '/menu', label: '메뉴', icon: Menu },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full md:bg-gray-100 bg-gray-50">
      
      {/* 1. PC버전 데스크톱 상단 헤더 (md 이상 해상도에서 노출) */}
      <header className="hidden md:flex bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm flex-none">
        <div className="max-w-6xl w-full mx-auto px-6 h-16 flex items-center justify-between">
          {/* 로고 & 타이틀 */}
          <Link to="/" className="flex items-center gap-2 hover:no-underline -ml-2 md:-ml-6">
            <span className="text-3xl font-black tracking-tight text-gray-900">
              동대문 <span className="text-blue-600">K-전통시장</span>
            </span>
          </Link>
          
          {/* 네비게이션 메뉴 */}
          <div className="flex items-center gap-8">
            {navItems.filter(item => !item.isCenter).map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 font-black text-sm transition-colors hover:no-underline ${
                    isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <item.icon size={18} strokeWidth={2.5} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {/* QR 스캔 버튼 (우측 강조) */}
            <Link
              to="/qr"
              className="flex items-center gap-1.5 font-black text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:no-underline transition-colors shadow-sm"
            >
              <ScanLine size={16} strokeWidth={2.5} />
              <span>QR 스캔</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. 메인 앱 영역 (모바일: max-w-md 중앙정렬 폰 에뮬레이터, PC: 화면 전체 풀사이즈 웹 레이아웃) */}
      <div className="flex-1 flex flex-col w-full mx-auto max-w-md bg-gray-50 h-[100dvh] shadow-xl relative overflow-hidden md:max-w-none md:bg-transparent md:h-auto md:shadow-none md:overflow-visible">
        {/* 콘텐츠 영역 */}
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden md:overflow-visible relative flex flex-col pb-[70px] md:pb-0">
          <Outlet />
        </main>
        
        <Footer />
        
        {/* 하단 네비게이션 바 - 모바일에서만 노출 (md:hidden) */}
        <nav className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 z-50 flex-none rounded-t-2xl shadow-[0_-2px_20px_rgba(0,0,0,0.08)]">
          <div className="flex justify-around items-center h-[70px] px-1 relative">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              
              if (item.isCenter) {
                return (
                  <div key={item.path} className="relative -top-6 flex flex-col items-center">
                    <Link
                      to={item.path}
                      className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full shadow-lg text-white mb-0.5 border-4 border-gray-50"
                    >
                      <ScanLine size={28} strokeWidth={3} />
                    </Link>
                    <span className="text-[11px] text-gray-900 font-black">{item.label}</span>
                  </div>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center justify-center w-14 gap-0.5 font-black ${
                    isActive ? 'text-blue-700' : 'text-gray-600'
                  }`}
                >
                  <item.icon size={22} strokeWidth={2.5} />
                  <span className="text-[11px]">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
