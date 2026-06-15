import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, MessageSquare, Star, ChevronRight, Info, Edit3 } from 'lucide-react';
import { markets } from '../data/markets';
import { floorData } from '../data/floorData';

// 임시 데이터 생성기 (점포 이름 기반)
const generateMockData = (storeName) => {
  return {
    description: `${storeName}은(는) 신선하고 좋은 품질의 상품을 정직한 가격으로 제공하는 믿을 수 있는 점포입니다. 언제나 고객님을 최우선으로 생각하며, 최상의 서비스를 제공하기 위해 노력하고 있습니다. 많이 방문해 주세요!`,
    address: '서울특별시 동대문구 고산자로36길 3', // 시장 기본 주소에 맞춤
    menus: [
      {
        id: 1,
        name: '대표 상품 세트 A',
        description: '가장 인기 있는 상품들로 구성된 실속 세트입니다.',
        price: '35,000원',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        name: '프리미엄 상품 세트 B',
        description: '최고급 품질을 자랑하는 프리미엄 선물용 세트입니다.',
        price: '85,000원',
        image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 3,
        name: '일반 상품 (단품)',
        description: '신선한 상태 그대로 제공되는 기본 상품입니다.',
        price: '15,000원',
        image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=400&q=80'
      }
    ],
    reviews: [
      {
        id: 1,
        author: '단골손님',
        rating: 5,
        date: '2023.10.15',
        content: '항상 친절하시고 물건도 너무 좋아요! 벌써 3년째 단골입니다. 앞으로도 번창하세요~',
        comments: [
          { author: '사장님', content: '항상 찾아주셔서 감사합니다. 더 좋은 상품으로 보답하겠습니다!' }
        ]
      },
      {
        id: 2,
        author: '시장방문객',
        rating: 4,
        date: '2023.10.12',
        content: '처음 가봤는데 설명도 잘 해주시고 가격도 저렴해서 좋았어요. 포장도 꼼꼼하게 해주셨네요.',
        comments: []
      }
    ]
  };
};

export default function StoreDetailPage() {
  const { id, storeName: encodedStoreName } = useParams();
  const navigate = useNavigate();
  
  const marketId = parseInt(id, 10);
  const market = markets.find(m => m.id === marketId) || markets[0];
  const colorMap = {
    'bg-blue-600': '#2563eb',
    'bg-green-600': '#16a34a',
    'bg-purple-700': '#7e22ce',
    'bg-orange-500': '#f97316',
    'bg-teal-600': '#0d9488',
    'bg-sky-500': '#0ea5e9',
    'bg-rose-600': '#e11d48',
    'bg-amber-700': '#b45309',
  };
  const hexColor = colorMap[market.color] || '#3b82f6';
  
  const storeName = decodeURIComponent(encodedStoreName);

  // 점포 정보 찾기
  let storeInfo = null;
  let categoryName = '';
  let floorName = '';
  
  const marketData = floorData[marketId];
  if (marketData && marketData.floors) {
    for (const floor of marketData.floors) {
      for (const cat of floor.categories) {
        const found = cat.stores.find(s => s.name === storeName);
        if (found) {
          storeInfo = found;
          categoryName = cat.name;
          floorName = floor.name;
          break;
        }
      }
      if (storeInfo) break;
    }
  }

  // 데이터가 없을 경우 기본값 세팅
  if (!storeInfo) {
    storeInfo = { name: storeName, phone: '02-0000-0000' };
    categoryName = '미분류';
  }

  // 가상 상세 데이터 로드
  const mockData = generateMockData(storeName);

  // 스크롤 참조 및 activeTab 상태 관리
  const homeRef = useRef(null);
  const menuRef = useRef(null);
  const reviewRef = useRef(null);
  const [activeTab, setActiveTab] = useState('home');

  // 사진 갤러리 메인 이미지 관리
  const [mainImageSig, setMainImageSig] = useState(1);

  // Scroll Spy 구현 (Intersection Observer 사용)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-120px 0px -50% 0px', // 헤더(56px) + 탭바(48px)를 감안한 조정
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'home-section') {
            setActiveTab('home');
          } else if (entry.target.id === 'menu-section') {
            setActiveTab('menu');
          } else if (entry.target.id === 'review-section') {
            setActiveTab('review');
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (homeRef.current) observer.observe(homeRef.current);
    if (menuRef.current) observer.observe(menuRef.current);
    if (reviewRef.current) observer.observe(reviewRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (ref, tabName) => {
    if (ref && ref.current) {
      const yOffset = -104; // 헤더(56px) + 탭바(48px) 높이 보정
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveTab(tabName);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-[70px] md:pb-16 md:bg-gray-100 flex-1 flex flex-col">
      {/* 모바일 전용 뒤로가기 헤더 */}
      <div 
        className="md:hidden sticky top-0 z-20 flex items-center h-14 px-4 shadow-sm"
        style={{ backgroundColor: hexColor }}
      >
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 mr-2 text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-white text-[16px] truncate flex-1">
          {storeName}
        </h1>
      </div>

      {/* 데스크톱 전용 네비게이션 헤더 */}
      <div className="hidden md:block sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto h-16 px-8 flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 mr-4 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center text-[13px] text-gray-500 font-bold">
            <span className="cursor-pointer hover:text-gray-900" onClick={() => navigate(`/market/${marketId}`)}>{market.name}</span>
            <ChevronRight size={14} className="mx-2 opacity-60" />
            <span className="cursor-pointer hover:text-gray-900" onClick={() => navigate(`/market/${marketId}/floor`)}>{categoryName}</span>
          </div>
        </div>
      </div>

      {/* PC: 최대 너비 고정 컨테이너 */}
      <div className="w-full max-w-6xl mx-auto md:mt-8 md:px-8">
        
        {/* 2단 레이아웃 최상위 분리 (쇼핑몰 형태) */}
        <div className="flex flex-col md:flex-row md:gap-8 items-start relative">
          
          {/* ======================= 좌측 영역 (이미지 + 본문) ======================= */}
          <div className="flex-1 w-full flex flex-col gap-0 min-w-0">
            
            {/* 1. 쇼핑몰형 이미지 갤러리 */}
            <div className="w-full bg-white md:rounded-2xl overflow-hidden shadow-sm md:shadow-md md:border md:border-gray-200">
              {/* 메인 뷰어 */}
              <div className="w-full aspect-[4/3] md:aspect-[16/10] relative bg-gray-100">
                <img 
                  src={`https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=1200&q=80&sig=${mainImageSig}`} 
                  alt={storeName}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              </div>
              
              {/* 썸네일 리스트 (PC, Mobile 모두 가로 배열 및 클릭 동작 동일) */}
              <div className="bg-white flex gap-2.5 p-3 md:p-4 overflow-x-auto hide-scrollbar border-t border-gray-100">
                {[1, 2, 3, 4, 5].map((idx) => {
                  const isSelected = mainImageSig === idx;
                  return (
                    <div 
                      key={idx} 
                      onClick={() => setMainImageSig(idx)}
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-md md:rounded-lg flex-none overflow-hidden cursor-pointer transition-all border-2 ${
                        isSelected ? 'border-gray-900 opacity-100' : 'border-transparent opacity-60 hover:opacity-100 bg-gray-100'
                      }`}
                      style={isSelected ? { borderColor: hexColor } : {}}
                    >
                      <img 
                        src={`https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=200&q=80&sig=${idx}`} 
                        alt={`${storeName} 사진 ${idx}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. 본문 상세 영역 (흰색 박스) */}
            <div className="w-full bg-white md:rounded-2xl md:shadow-md md:border md:border-gray-200 overflow-hidden">
              
              {/* 모바일 전용 상가 정보 헤더 (PC에서는 우측 사이드바로 이동) */}
              <div className="md:hidden px-4 pt-6 pb-5 border-b border-gray-100 bg-white">
                <div className="flex items-center text-[11px] text-gray-500 mb-1.5 font-medium">
                  <span>{market.name}</span>
                  <ChevronRight size={12} className="mx-1 opacity-60" />
                  <span>{categoryName}</span>
                </div>
                <h2 className="font-black text-gray-900 mb-4 text-[25px]">{storeName}</h2>
                
                <div className="flex gap-2 mb-5">
                  <a 
                    href={`tel:${storeInfo.phone}`}
                    className="flex-1 py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-[13px] font-bold text-white shadow-sm"
                    style={{ backgroundColor: hexColor }}
                  >
                    <Phone size={15} />
                    전화문의
                  </a>
                  <button 
                    onClick={() => alert('길찾기 기능은 준비 중입니다.')}
                    className="flex-1 py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-[13px] font-bold border shadow-sm"
                    style={{ color: hexColor, borderColor: hexColor + '40', backgroundColor: hexColor + '05' }}
                  >
                    <MapPin size={15} />
                    길찾기
                  </button>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex items-start gap-3 pl-0.5">
                    <div className="w-5 h-5 flex items-center justify-center flex-none mt-0.5">
                      <MapPin size={16} className="text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-gray-400 font-semibold mb-0.5">사업체 주소</div>
                      <div className="text-[12.5px] text-gray-800 font-semibold leading-snug">
                        {mockData.address} <span className="text-gray-400 text-[11px] font-normal ml-1.5">({floorName})</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pl-0.5">
                    <div className="w-5 h-5 flex items-center justify-center flex-none mt-0.5">
                      <Phone size={16} className="text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-gray-400 font-semibold mb-0.5">연락처</div>
                      <div className="text-[13px] text-gray-900 font-bold tracking-wide">
                        {storeInfo.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 데스크톱 전용 상가 타이틀 헤더 (탭 바 위에 배치) */}
              <div className="hidden md:block px-8 pt-7 pb-4 bg-white">
                <div className="flex items-center text-[11px] text-gray-400 mb-2 font-bold">
                  <span>{market.name}</span>
                  <ChevronRight size={12} className="mx-1.5 opacity-50" />
                  <span>{categoryName}</span>
                </div>
                <h2 className="font-black text-gray-900 text-[24px] lg:text-[26px]">{storeName}</h2>
              </div>

              {/* 고정 탭 바 */}
              <div className="bg-white flex border-b border-gray-200 shadow-sm sticky top-14 md:top-[64px] z-10">
                <button 
                  onClick={() => scrollToSection(homeRef, 'home')}
                  className="flex-1 pt-2 pb-2.5 text-[14px] font-bold transition-colors relative"
                  style={{ color: activeTab === 'home' ? hexColor : '#6b7280' }}
                >
                  홈
                  {activeTab === 'home' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: hexColor }} />
                  )}
                </button>
                <button 
                  onClick={() => scrollToSection(menuRef, 'menu')}
                  className="flex-1 pt-2 pb-2.5 text-[14px] font-bold transition-colors relative"
                  style={{ color: activeTab === 'menu' ? hexColor : '#6b7280' }}
                >
                  메뉴 및 정보
                  {activeTab === 'menu' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: hexColor }} />
                  )}
                </button>
                <button 
                  onClick={() => scrollToSection(reviewRef, 'review')}
                  className="flex-1 pt-2 pb-2.5 text-[14px] font-bold transition-colors relative"
                  style={{ color: activeTab === 'review' ? hexColor : '#6b7280' }}
                >
                  리뷰
                  {activeTab === 'review' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: hexColor }} />
                  )}
                </button>
              </div>

              <div className="space-y-0">
              
                {/* 1. 홈 섹션 */}
                <div id="home-section" ref={homeRef} className="bg-white px-4 md:px-8 pt-8 md:pt-10 pb-6 md:pb-8 border-b border-gray-100">
                  
                  {/* 점포 소개 (공통) */}
                  <div className="mb-2 pl-0.5 md:pl-0">
                    <h3 className="text-[14px] md:text-[17px] font-bold text-gray-900 mb-3 md:mb-5">점포 소개</h3>
                    <p className="text-[12px] md:text-[13px] leading-relaxed md:leading-[1.8] text-gray-600 md:text-gray-700 whitespace-pre-line">
                      {mockData.description}
                    </p>
                  </div>
                </div>

                {/* 2. 메뉴 및 정보 섹션 */}
                <div id="menu-section" ref={menuRef} className="bg-slate-50 md:bg-white px-4 md:px-8 py-6 md:py-10 border-b border-gray-100">
                  <h3 className="text-[14px] md:text-[16px] font-bold text-gray-900 mb-5 flex items-center gap-2">
                    <Info size={18} style={{ color: hexColor }} className="md:w-5 md:h-5" />
                    메뉴 및 주요 아이템
                  </h3>
                  
                  <div className="flex flex-col gap-3 md:gap-4">
                    {mockData.menus.map((menu) => (
                      <div 
                        key={menu.id} 
                        className="flex rounded-lg md:rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
                        style={{ height: '100px' }}
                      >
                        <div className="flex-1 min-w-0 flex flex-col justify-between p-3 md:p-4">
                          <div className="min-w-0">
                            <h4 className="text-[12px] md:text-[13px] font-bold text-gray-900 truncate leading-none mb-1.5">{menu.name}</h4>
                            <p className="text-[10px] md:text-[11px] text-gray-500 line-clamp-1 md:line-clamp-2 leading-snug">
                              {menu.description}
                            </p>
                          </div>
                          <div className="text-[12px] md:text-[13px] font-black text-gray-950 leading-none mt-1">
                            {menu.price}
                          </div>
                        </div>
                        <div className="flex-none bg-gray-100 w-[100px] h-[100px]">
                          <img src={menu.image} alt={menu.name} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. 리뷰 섹션 */}
                <div id="review-section" ref={reviewRef} className="bg-white px-4 md:px-8 py-6 md:py-10">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h3 className="text-[15px] md:text-[17px] font-bold text-gray-900 flex items-center gap-2">
                      <MessageSquare size={18} style={{ color: hexColor }} className="md:w-5 md:h-5" />
                      방문 리뷰
                    </h3>
                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-bold text-gray-900 text-[13px]">4.5</span>
                      <span className="text-gray-400 text-[11px]">({mockData.reviews.length})</span>
                    </div>
                  </div>

                  {mockData.reviews.length > 0 ? (
                    <div className="mb-8">
                      {mockData.reviews.map((review, rIdx) => (
                        <div 
                          key={review.id} 
                          className="py-5 md:py-6 border-b border-gray-100 last:border-0"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[13px] font-black text-gray-600 shadow-sm border border-gray-200">
                                {review.author.substring(0, 1)}
                              </div>
                              <div>
                                <div className="text-[13px] font-bold text-gray-900 leading-none mb-1.5">{review.author}</div>
                                <div className="text-[11px] font-medium text-gray-400 leading-none">{review.date}</div>
                              </div>
                            </div>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={13} 
                                  className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed pl-1 md:pl-0 mt-1">
                            {review.content}
                          </p>
                          
                          {review.comments.map((comment, cIdx) => (
                            <div 
                              key={cIdx} 
                              className="mt-4 rounded-xl p-4 md:p-5"
                              style={{ 
                                marginLeft: '40px',
                                backgroundColor: '#f8fafc',
                                borderLeft: `4px solid ${hexColor}`
                              }}
                            >
                              <div className="text-[12px] font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                                <span className="text-[13px]" style={{ color: hexColor }}>↳</span>
                                <span>{comment.author}</span>
                              </div>
                              <p className="text-[13px] text-gray-700 leading-relaxed">
                                {comment.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-16 bg-gray-50 rounded-2xl text-center border border-gray-100 mb-8 mt-2">
                      <MessageSquare size={32} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-[14px] text-gray-600 font-bold mb-1">아직 작성된 리뷰가 없습니다.</p>
                      <p className="text-[12px] text-gray-400">첫번째 리뷰의 주인공이 되어 주세요!</p>
                    </div>
                  )}

                  <button 
                    onClick={() => alert('로그인이 필요한 기능입니다.')}
                    className="w-full md:max-w-md md:mx-auto py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-white text-[14px] shadow-md hover:opacity-90 transition-all"
                    style={{ backgroundColor: hexColor }}
                  >
                    <Edit3 size={18} />
                    방문 리뷰 작성하기
                  </button>
                </div>

              </div>
            </div>
            
          </div>

          {/* ======================= 우측 정보 사이드바 (데스크톱 전용) ======================= */}
          {/* 쇼핑몰에서 우측 상단에 위치하는 상품 핵심 정보와 동일한 역할 */}
          <div className="hidden md:block w-80 lg:w-96 flex-none relative">
            <div className="sticky top-24 bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-7 lg:p-8 flex flex-col">
              
              {/* 빵부스러기 및 타이틀 영역 */}
              <div className="flex items-center text-[10px] text-gray-500 mb-3 font-bold">
                <span>{market.name}</span>
                <ChevronRight size={11} className="mx-1.5 opacity-50" />
                <span>{categoryName}</span>
              </div>
              
              <h2 className="font-black text-gray-900 text-[23px] lg:text-[27px] mb-8 leading-tight break-keep tracking-tight">{storeName}</h2>

              {/* 상세 정보 */}
              <div className="space-y-7 mb-10">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-none border border-gray-100 shadow-sm">
                    <MapPin className="text-gray-500" size={18} />
                  </div>
                  <div className="pt-0.5">
                    <p className="text-[10px] font-bold text-gray-400 mb-1">오시는 길</p>
                    <p className="text-[11.5px] font-bold text-gray-800 leading-snug">
                      {mockData.address} <br/>
                      <span className="text-gray-500 font-medium text-[10.5px]">({floorName})</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-none border border-gray-100 shadow-sm">
                    <Phone className="text-gray-500" size={18} />
                  </div>
                  <div className="pt-0.5">
                    <p className="text-[10px] font-bold text-gray-400 mb-1">대표 연락처</p>
                    <p className="text-[17px] font-black tracking-wide" style={{ color: hexColor }}>
                      {storeInfo.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* 가로선 */}
              <div className="w-full h-px bg-gray-100 mb-8" />

              {/* 액션 버튼 */}
              <div className="flex flex-col gap-3.5">
                <a 
                  href={`tel:${storeInfo.phone}`} 
                  className="w-full py-4 rounded-xl flex items-center justify-center gap-2 text-[14px] font-black text-white shadow-md hover:shadow-lg hover:opacity-95 transition-all" 
                  style={{ backgroundColor: hexColor }}
                >
                  <Phone size={18} /> 전화로 문의하기
                </a>
                <button 
                  onClick={() => alert('길찾기 기능 준비중')} 
                  className="w-full py-4 rounded-xl flex items-center justify-center gap-2 text-[14px] font-bold bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all text-gray-700"
                >
                  <MapPin size={18} /> 상세 지도 보기
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
