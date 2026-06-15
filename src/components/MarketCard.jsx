import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export default function MarketCard({ market }) {
  // Tailwind v4에서 안전하게 동적 색상을 채우기 위한 헥사코드 맵
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
  const hexColor = colorMap[market.color] || "#2563eb";

  // 이름표 내부에 메인 이름과 소괄호 서브네임을 구분하여 렌더링하는 함수
  const renderMarketName = (name) => {
    const parts = name.split('\n');
    if (parts.length > 1) {
      return (
        <span className="flex flex-col items-center justify-center leading-none">
          <span className="text-[13px] md:text-[18px] font-black">{parts[0]}</span>
          <span className="text-[10px] md:text-[13px] font-bold opacity-85 mt-0.5">{parts[1]}</span>
        </span>
      );
    }
    return <span className="text-[13px] md:text-[18px] font-black block">{name}</span>;
  };

  return (
    <Link to={`/market/${market.id}`} className="relative pt-10 md:pt-14 w-full h-full flex flex-col hover:no-underline group md:hover:-translate-y-2 md:transition-all md:duration-300 md:ease-out">
      {/* 카드 메인 컨테이너 (라운드값 rounded-[3px] md:rounded-[8px]로 조절) */}
      <div className="bg-white rounded-[3px] md:rounded-[8px] shadow-sm border border-gray-100 flex flex-col flex-1 md:group-hover:shadow-xl transition-shadow duration-300 relative">
        
        {/* 1. 지도 위치 핀 배지 (PC버전에서는 핀 아이콘 크기도 비례해서 키움) */}
        <div className="absolute bottom-full mb-[4px] md:mb-[6px] left-1/2 -translate-x-1/2 w-[24px] h-[32px] md:w-[32px] md:h-[42px] z-10 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full drop-shadow-sm" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 19.5 12 28 12 28C12 28 22 19.5 22 12C22 6.48 17.52 2 12 2Z" fill={hexColor} />
          </svg>
          <span className="relative z-10 text-white font-black text-[11px] md:text-[13px] pb-1.5 md:pb-2.5">
            {market.id}
          </span>
        </div>

        {/* 2. 이름표 배지 (가로폭 w-[90%] md:w-[85%]) */}
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 w-[90%] md:w-[85%]">
          <div className={`py-1 md:py-1.5 rounded-[3px] md:rounded-[6px] text-center text-white shadow-sm leading-tight ${market.color}`}>
            {renderMarketName(market.name)}
          </div>
        </div>

        {/* 3. 시장 이미지 (PC 해상도에서 요청에 따라 1:0.8(5:4) 비율 md:aspect-[5/4] 적용) */}
        <div className="w-full flex-1 min-h-[45px] md:aspect-[5/4] md:min-h-0 rounded-t-[3px] md:rounded-t-[8px] rounded-b-none overflow-hidden relative">
          <img 
            src={market.image} 
            alt={market.name.replace('\n', ' ')} 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* 하단 텍스트 및 버튼 영역 (PC버전 패딩 확대) */}
        <div className="p-1.5 pt-1 md:p-3 md:pt-4 flex-none flex flex-col">
          {/* 4. 설명 텍스트 (PC버전 글자 확대) */}
          <div className="px-0.5 text-center mt-0.5 mb-0 md:mb-3">
            <p className="text-[7.5px] md:text-[11.5px] text-gray-500 font-bold leading-tight md:leading-normal break-keep">
              {market.description.split('\n')[0]}
              <br />
              {market.description.split('\n')[1] || ''}
            </p>
          </div>

          {/* 5. 지도 보기 버튼 (PC버전 크기 및 라운딩 스케일업, 모바일은 숨김) */}
          <button className="hidden md:flex w-full py-1 md:py-2 rounded-[3px] md:rounded-[6px] border items-center justify-center gap-0.5 md:gap-1.5 transition-colors hover:bg-gray-200 bg-gray-100 border-gray-200 mt-auto flex-none">
            <span className="text-[8px] md:text-[11.5px] font-black" style={{ color: hexColor }}>지도 보기</span>
            <MapPin size={9} className="md:w-3.5 md:h-3.5" strokeWidth={3} style={{ color: hexColor }} />
          </button>
        </div>
      </div>
    </Link>
  );
}
