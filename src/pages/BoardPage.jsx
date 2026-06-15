import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, ThumbsUp, PenSquare, Bell, Search } from 'lucide-react';
import { markets } from '../data/markets';

// 탭 정의
const TABS = ['전체', ...markets.map(m => m.name.replace('\n', ' '))];

// 더미 게시물 생성 함수
const generateDummyPosts = () => {
  const posts = [];
  
  // 일반 게시물 추가 (각 탭별로 몇 개씩)
  let idCounter = 1;
  const sampleContents = [
    '오늘 여기 시장 방문했는데 너무 친절하시고 물건도 좋네요. 추천합니다!',
    '혹시 근처에 주차할 곳이 있을까요? 처음 가보는데 길이 헷갈리네요.',
    '명절 맞이해서 장보러 가려고 하는데 세일하는 품목 공유 부탁드려요.',
    '맛집 리스트 아시는 분 계신가요? 식사할 곳을 찾고 있어요.'
  ];
  
  TABS.slice(2).forEach(tabName => {
    // 각 시장별로 2~3개의 더미 게시물
    const postCount = Math.floor(Math.random() * 2) + 2;
    for(let i=0; i<postCount; i++) {
      posts.push({
        id: `post-${idCounter++}`,
        tab: tabName,
        title: `[${tabName}] 방문 후기 남겨봅니다.`,
        content: sampleContents[i % sampleContents.length],
        author: `방문자${Math.floor(Math.random() * 1000)}`,
        date: '2023.10.18',
        likes: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 10),
        isNotice: false
      });
    }
  });
  
  return posts.reverse(); // 최신순 느낌으로 뒤집기
};

// 모듈 스코프에 데이터를 고정하여 탭 전환 시에도 데이터가 유지되도록 함
const DUMMY_POSTS = generateDummyPosts();

export default function BoardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('전체');

  // 필터링된 게시물
  const filteredPosts = activeTab === '전체' 
    ? DUMMY_POSTS 
    : DUMMY_POSTS.filter(post => post.tab === activeTab);

  return (
    <div className="bg-[#111111] md:bg-gray-50 min-h-[calc(100vh-70px)] md:min-h-[calc(100vh-64px)] flex flex-col pb-20">
      {/* 상단 헤더 */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm flex-none">
        <div className="max-w-7xl mx-auto px-4 h-14 md:h-16 flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-700 active:bg-gray-200"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </button>
          <h1 className="text-base md:text-lg font-black text-gray-900">게시판</h1>
        </div>
        
        {/* 가로 스크롤 탭 메뉴 */}
        <div className="max-w-7xl mx-auto w-full border-t border-gray-50 bg-white">
          <div className="flex overflow-x-auto hide-scrollbar px-4 py-2 gap-2 snap-x">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`snap-start whitespace-nowrap px-2 py-0.5 text-[9px] md:text-[10px] font-bold rounded-full transition-colors flex-none
                  ${activeTab === tab 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 콘텐츠 축소 래퍼 (PC에서 30% 축소) */}
      <div className="flex-1 flex flex-col md:[zoom:0.7]">
        {/* 유틸리티 바 (리스트 전체보기 및 검색) - PC 전용 */}
        <div className="hidden md:flex max-w-[1100px] w-full mx-auto px-4 mt-8 mb-4 items-end justify-between">
          <div className="flex items-baseline gap-3">
            <h2 className="text-[24px] font-bold text-gray-800 tracking-tight">리스트 전체보기</h2>
            <span className="text-[16px] font-bold text-gray-500">Total <span className="text-blue-500">{filteredPosts.length}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <select className="border border-gray-300 bg-white rounded-sm px-3 py-1.5 text-[16px] text-gray-600 outline-none focus:border-gray-400">
              <option>전체</option>
              <option>제목</option>
              <option>작성자</option>
            </select>
            <div className="flex">
              <input type="text" className="border border-gray-300 bg-white border-r-0 rounded-l-sm px-3 py-1.5 text-[16px] outline-none w-52 focus:border-gray-400" />
              <button className="bg-[#8b8276] hover:bg-[#7a7267] text-white px-3 py-1.5 rounded-r-sm transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* 게시물 목록 */}
        <div className="flex-1 w-full max-w-[1100px] mx-auto md:px-4 pb-10 bg-[#111111] md:bg-transparent">
          {filteredPosts.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-gray-500 md:text-gray-400">
              <MessageSquare size={40} className="mb-4 opacity-50" />
              <p className="font-medium text-[16px]">등록된 게시물이 없습니다.</p>
            </div>
          ) : (
            <>
              {/* --- 모바일용 리스트 뷰 (< md) --- */}
              <div className="md:hidden divide-y divide-[#333333] bg-[#111111]">
                <div className="flex justify-between items-center px-4 py-3 bg-[#1a1a1a] border-b border-[#333333]">
                  <span className="text-[14px] font-bold text-gray-400">Total <span className="text-blue-400">{filteredPosts.length}</span></span>
                  <button className="p-1.5 text-gray-400 hover:bg-[#333] rounded"><Search size={16} /></button>
                </div>
                {filteredPosts.map(post => (
                  <div key={post.id} onClick={() => navigate(`/post/${post.id}`)} className="px-4 py-4 hover:bg-[#1a1a1a] active:bg-[#222222] transition-colors cursor-pointer">
                    <div className="flex items-center gap-1 mb-1.5">
                      <span className={`text-[13px] font-bold ${post.isNotice ? 'text-red-400' : 'text-blue-400'}`}>
                        [{post.tab}]
                      </span>
                      {post.isNotice && <Bell size={12} className="text-red-400" />}
                    </div>
                    <h3 className="font-medium text-gray-100 text-[17px] leading-snug line-clamp-1 mb-2.5">
                      {post.title}
                    </h3>
                    <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-[13px] text-[#999999] font-medium">
                      <span>{post.author}</span>
                      <span className="text-[#555555]">|</span>
                      <span>{post.date}</span>
                      <span className="text-[#555555]">|</span>
                      <span>조회 {post.likes * 13}</span>
                      <span className="text-[#555555]">|</span>
                      <span className="flex items-center gap-1"><ThumbsUp size={10} /> {post.likes}</span>
                      <span className="flex items-center gap-1"><MessageSquare size={10} /> {post.comments}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* --- PC용 클래식 테이블 뷰 (>= md) --- */}
              <div className="hidden md:block w-full border-t-2 border-[#444444]">
                <table className="w-full text-[16px] text-center">
                  <thead className="border-b border-[#dddddd] bg-[#fafafa]">
                    <tr>
                      <th className="py-3.5 px-2 w-[80px] text-[#666666] font-medium">번호</th>
                      <th className="py-3.5 px-4 text-center text-[#666666] font-medium">제목</th>
                      <th className="py-3.5 px-2 w-[120px] text-[#666666] font-medium">작성자</th>
                      <th className="py-3.5 px-2 w-[120px] text-[#666666] font-medium">작성일</th>
                      <th className="py-3.5 px-2 w-[80px] text-[#666666] font-medium">조회수</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPosts.map((post, idx) => (
                      <tr key={post.id} onClick={() => navigate(`/post/${post.id}`)} className="border-b border-[#eeeeee] hover:bg-[#f8f9fa] transition-colors cursor-pointer group">
                        <td className="py-3.5 px-2 text-[#666666]">
                          {post.isNotice ? <span className="text-[14px] font-bold text-red-500">공지</span> : (filteredPosts.length - idx)}
                        </td>
                        <td className="py-3.5 px-4 text-left">
                          <div className="flex items-center gap-2">
                            <span className={`text-[15px] shrink-0 font-bold ${post.isNotice ? 'text-red-500' : 'text-blue-600'}`}>[{post.tab}]</span>
                            <span className="text-[#333333] group-hover:underline line-clamp-1 break-all font-medium">{post.title}</span>
                            {post.comments > 0 && <span className="text-[14px] font-bold text-blue-500 shrink-0">[{post.comments}]</span>}
                          </div>
                        </td>
                        <td className="py-3.5 px-2 text-[#666666]">{post.author}</td>
                        <td className="py-3.5 px-2 text-[#666666]">{post.date}</td>
                        <td className="py-3.5 px-2 text-[#666666]">{post.likes * 13}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="w-full border-t border-[#444444]"></div>
                
                {/* 페이징 (더미) */}
                <div className="flex justify-center mt-8 pb-10">
                  <div className="flex items-center gap-1">
                    <button className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 text-[16px]">&lt;</button>
                    <button className="w-8 h-8 flex items-center justify-center border border-[#444444] bg-[#444444] text-white text-[16px] font-bold">1</button>
                    <button className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 text-[16px]">2</button>
                    <button className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 text-[16px]">&gt;</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 글쓰기 FAB (Floating Action Button) */}
      <div className="fixed bottom-[90px] md:bottom-10 right-4 md:right-10 z-40">
        <button 
          onClick={() => alert('글쓰기 기능은 준비 중입니다.')}
          className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(37,99,235,0.4)] hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all"
        >
          <PenSquare size={24} strokeWidth={2.5} />
        </button>
      </div>

      {/* Tailwind 스크롤바 숨김 유틸리티 스타일 추가 */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
