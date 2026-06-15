import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, MessageSquare, ThumbsUp, MoreVertical, Share2 } from 'lucide-react';

export default function PostDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  
  // 라우팅 경로를 통해 공지사항인지 일반 게시판인지 유추
  const isNotice = location.pathname.includes('/notice/');

  // 임시 더미 데이터 렌더링
  const dummyPost = {
    title: isNotice 
      ? '전통시장 스마트 가이드 앱 이용 안내 및 주요 기능 소개' 
      : '오늘 방문 후기 및 주차 꿀팁 공유합니다',
    author: isNotice ? '운영자' : '시장나들이',
    date: '2023.10.18 14:30',
    views: 1250,
    likes: 42,
    comments: 8,
    tabName: isNotice ? '공지사항' : '경동광성상가',
    content: isNotice 
      ? `안녕하세요. 전통시장 스마트 가이드 앱 운영팀입니다.\n\n앱을 찾아주신 모든 분들께 감사드리며, 스마트 가이드 앱의 핵심 기능을 소개해 드립니다.\n\n1. 점포 검색: 시장 내 원하시는 점포를 검색하고 위치를 지도로 바로 확인하세요.\n2. 테마 코스: 혼자 보기 아까운 추천 동선을 확인하고 여행하듯 시장을 즐겨보세요.\n3. 커뮤니티: 상인과 방문객이 실시간으로 소통하는 게시판을 활용해보세요.\n\n앞으로도 더 나은 서비스를 제공하기 위해 노력하겠습니다. 감사합니다.`
      : `오늘 아침 일찍 경동광성상가에 다녀왔습니다.\n\n확실히 오전 시간에 가니까 물건도 제일 신선하고 상인분들도 친절하게 응대해 주셨습니다.\n특히 1층 안쪽에 있는 과일가게에서 산 사과가 정말 달고 맛있네요. 가격도 대형 마트보다 훨씬 저렴해서 다음 주에 한 번 더 방문할 계획입니다.\n\n참고로 주차는 공영주차장 2층 구석 자리가 그나마 자리가 빨리 나는 편이니 주말에 가실 분들은 참고하세요!\n\n질문 있으시면 댓글 남겨주세요~`
  };

  return (
    <div className="bg-[#111111] md:bg-gray-50 min-h-[calc(100vh-70px)] md:min-h-[calc(100vh-64px)] flex flex-col pb-20">
      {/* 상단 헤더 (모바일/PC 공통 흰색) */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm flex-none">
        <div className="max-w-7xl mx-auto px-4 h-14 md:h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)} 
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-700 active:bg-gray-200"
            >
              <ArrowLeft size={20} strokeWidth={2.5} />
            </button>
            <h1 className="text-base md:text-lg font-black text-gray-900">{isNotice ? '공지사항' : '게시물 보기'}</h1>
          </div>
          <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 w-full max-w-4xl mx-auto md:px-4 md:py-6 md:border-x md:border-gray-100 bg-[#111111] md:bg-white">
        {/* 본문 영역 */}
        <div className="px-4 py-5 md:px-6">
          <div className="mb-4">
            <span className={`inline-block px-2.5 py-1 rounded-sm text-xs font-bold mb-3 ${isNotice ? 'bg-[#ffebeb] text-[#ff4b4b] md:bg-red-50 md:text-red-600' : 'bg-[#eef2ff] text-[#4f46e5] md:bg-blue-50 md:text-blue-600'}`}>
              {dummyPost.tabName}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-gray-100 md:text-gray-900 leading-snug break-keep">
              {dummyPost.title}
            </h2>
          </div>
          
          <div className="flex items-center justify-between pb-4 border-b border-[#333333] md:border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#333] md:bg-gray-200 flex items-center justify-center overflow-hidden">
                <span className="text-gray-400 md:text-gray-500 text-xs font-bold">{dummyPost.author.charAt(0)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-200 md:text-gray-800">{dummyPost.author}</span>
                <span className="text-xs text-gray-500 md:text-gray-400">{dummyPost.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
              <span>조회 {dummyPost.views}</span>
              <button className="flex items-center gap-1 hover:text-gray-300 md:hover:text-gray-800 transition-colors">
                <Share2 size={14} /> 공유
              </button>
            </div>
          </div>

          <div className="py-8 min-h-[300px]">
            <p className="text-[15px] leading-relaxed text-[#dddddd] md:text-gray-800 whitespace-pre-wrap">
              {dummyPost.content}
            </p>
          </div>

          <div className="flex justify-center py-6 border-b border-[#333333] md:border-gray-100">
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#444] md:border-gray-200 shadow-sm bg-[#1a1a1a] md:bg-white hover:bg-[#222] md:hover:bg-gray-50 transition-colors font-bold text-gray-300 md:text-gray-700">
              <ThumbsUp size={18} className="text-blue-500" /> 
              <span>공감</span> 
              <span className="text-blue-500">{dummyPost.likes}</span>
            </button>
          </div>
        </div>

        {/* 댓글 영역 */}
        <div className="bg-[#1a1a1a] md:bg-gray-50 px-4 py-6 md:px-6">
          <h3 className="font-bold text-gray-100 md:text-gray-900 mb-4 flex items-center gap-1.5">
            댓글 <span className="text-blue-500">{dummyPost.comments}</span>
          </h3>
          
          {/* 댓글 입력 폼 */}
          <div className="flex gap-2 mb-6">
            <input 
              type="text" 
              placeholder="댓글을 남겨보세요." 
              className="flex-1 bg-[#222] md:bg-white border border-[#444] md:border-gray-200 rounded-md px-4 py-2.5 text-sm outline-none text-gray-200 md:text-gray-800 focus:border-gray-500 md:focus:border-gray-400 transition-all placeholder-gray-600 md:placeholder-gray-400"
            />
            <button className="bg-blue-600 md:bg-gray-900 text-white px-5 rounded-md text-sm font-bold hover:bg-blue-700 md:hover:bg-gray-800 transition-colors">
              등록
            </button>
          </div>

          {/* 댓글 리스트 더미 */}
          <div className="space-y-4">
            {[1, 2, 3].map((reply) => (
              <div key={reply} className="flex gap-3 pb-4 border-b border-[#333] md:border-gray-100 last:border-0">
                <div className="w-8 h-8 rounded-full bg-[#333] md:bg-gray-200 shrink-0 flex items-center justify-center">
                  <span className="text-gray-400 md:text-gray-500 text-[10px] font-bold">익명</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-200 md:text-gray-800">익명{reply}</span>
                    <span className="text-xs text-gray-500 md:text-gray-400">1시간 전</span>
                  </div>
                  <p className="text-sm text-gray-400 md:text-gray-700 leading-snug">
                    좋은 정보 감사합니다! 저도 이번 주말에 꼭 한 번 들려봐야겠네요. 😊
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
