import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, ThumbsUp, Bell, Search } from 'lucide-react';

const NOTICE_POSTS = [
  {
    id: 'notice-5',
    tab: '공지사항',
    title: '[안내] 추석 명절 연휴 전통시장 운영시간 안내',
    content: '추석 연휴 기간 각 시장별 운영시간을 안내해 드립니다.',
    author: '운영자',
    date: '2023.09.25',
    likes: 345,
    comments: 20,
    isNotice: true
  },
  {
    id: 'notice-4',
    tab: '공지사항',
    title: '[이벤트] 시장 방문 후기 남기고 온누리 상품권 받자!',
    content: '방문 후기를 남겨주신 분들 중 추첨을 통해 상품권을 드립니다.',
    author: '운영자',
    date: '2023.09.10',
    likes: 512,
    comments: 45,
    isNotice: true
  },
  {
    id: 'notice-3',
    tab: '공지사항',
    title: '[점검] 서버 정기 점검에 따른 서비스 일시 중지 안내 (9/5 새벽 2시)',
    content: '서버 안정화를 위한 정기 점검이 진행될 예정입니다.',
    author: '시스템관리자',
    date: '2023.09.01',
    likes: 88,
    comments: 5,
    isNotice: true
  },
  {
    id: 'notice-2',
    tab: '공지사항',
    title: '[안내] 일부 시장 주차장 공사로 인한 우회도로 안내',
    content: '경동시장 인근 공영주차장 진입로 공사가 진행중입니다.',
    author: '운영자',
    date: '2023.08.15',
    likes: 120,
    comments: 12,
    isNotice: true
  },
  {
    id: 'notice-1',
    tab: '공지사항',
    title: '[안내] 동대문 K-전통시장 스마트 가이드 앱 오픈 안내',
    content: '안녕하세요. 새롭게 오픈한 전통시장 스마트 가이드 앱입니다. 점포 검색부터 층별 안내까지 다양한 서비스를 이용해보세요.',
    author: '운영자',
    date: '2023.08.01',
    likes: 856,
    comments: 102,
    isNotice: true
  }
];

export default function NoticePage() {
  const navigate = useNavigate();

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
          <h1 className="text-base md:text-lg font-black text-gray-900">공지사항</h1>
        </div>
      </div>

      {/* 콘텐츠 축소 래퍼 (PC에서 30% 축소) */}
      <div className="flex-1 flex flex-col md:[zoom:0.7]">
        {/* 유틸리티 바 (리스트 전체보기 및 검색) - PC 전용 */}
        <div className="hidden md:flex max-w-[1100px] w-full mx-auto px-4 mt-8 mb-4 items-end justify-between">
          <div className="flex items-baseline gap-3">
            <h2 className="text-[24px] font-bold text-gray-800 tracking-tight">공지사항</h2>
            <span className="text-[16px] font-bold text-gray-500">Total <span className="text-blue-500">{NOTICE_POSTS.length}</span></span>
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
          {NOTICE_POSTS.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-gray-500 md:text-gray-400">
              <MessageSquare size={40} className="mb-4 opacity-50" />
              <p className="font-medium text-[16px]">등록된 공지사항이 없습니다.</p>
            </div>
          ) : (
            <>
              {/* --- 모바일용 리스트 뷰 (< md) --- */}
              <div className="md:hidden divide-y divide-[#333333] bg-[#111111]">
                <div className="flex justify-between items-center px-4 py-3 bg-[#1a1a1a] border-b border-[#333333]">
                  <span className="text-[14px] font-bold text-gray-400">Total <span className="text-blue-400">{NOTICE_POSTS.length}</span></span>
                  <button className="p-1.5 text-gray-400 hover:bg-[#333] rounded"><Search size={16} /></button>
                </div>
                {NOTICE_POSTS.map(post => (
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
                    {NOTICE_POSTS.map((post, idx) => (
                      <tr key={post.id} onClick={() => navigate(`/post/${post.id}`)} className="border-b border-[#eeeeee] hover:bg-[#f8f9fa] transition-colors cursor-pointer group">
                        <td className="py-3.5 px-2 text-[#666666]">
                          {post.isNotice ? <span className="text-[14px] font-bold text-red-500">공지</span> : (NOTICE_POSTS.length - idx)}
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
    </div>
  );
}
