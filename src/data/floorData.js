// 9개 시장별 층별 안내 데이터
// 각 시장은 floors 배열을 가지며, 각 층은 categories 배열을 가짐
// 각 카테고리는 업체(stores) 배열을 가짐

export const floorData = {
  // 1번: 경동광성상가
  1: {
    floors: [
      {
        id: "3F",
        name: "3층",
        summary: "의류 · 패션잡화",
        categories: [
          {
            name: "여성의류",
            stores: [
              { name: "미래패션", phone: "02-2249-1001" },
              { name: "한빛의류", phone: "02-2249-1002" },
              { name: "진주상회", phone: "02-2249-1003" },
              { name: "동화패션", phone: "02-2249-1004" },
            ]
          },
          {
            name: "남성의류",
            stores: [
              { name: "신사복장", phone: "02-2249-1011" },
              { name: "멋쟁이양복", phone: "02-2249-1012" },
              { name: "클래식정장", phone: "02-2249-1013" },
            ]
          },
          {
            name: "잡화",
            stores: [
              { name: "보석함", phone: "02-2249-1021" },
              { name: "행운시계", phone: "02-2249-1022" },
            ]
          }
        ]
      },
      {
        id: "2F",
        name: "2층",
        summary: "생활용품 · 가전",
        categories: [
          {
            name: "생활용품",
            stores: [
              { name: "다이소플러스", phone: "02-2249-2001" },
              { name: "만물상회", phone: "02-2249-2002" },
              { name: "홈리빙", phone: "02-2249-2003" },
              { name: "생활천국", phone: "02-2249-2004" },
              { name: "주방명가", phone: "02-2249-2005" },
            ]
          },
          {
            name: "가전제품",
            stores: [
              { name: "전자랜드", phone: "02-2249-2011" },
              { name: "디지털프라자", phone: "02-2249-2012" },
            ]
          }
        ]
      },
      {
        id: "1F",
        name: "1층",
        summary: "식품 · 농산물 · 반찬",
        categories: [
          {
            name: "농산물",
            stores: [
              { name: "시골농산", phone: "02-2249-3001" },
              { name: "청정농원", phone: "02-2249-3002" },
              { name: "햇살농장", phone: "02-2249-3003" },
              { name: "산들농산", phone: "02-2249-3004" },
            ]
          },
          {
            name: "반찬",
            stores: [
              { name: "엄마손반찬", phone: "02-2249-3011" },
              { name: "정성반찬", phone: "02-2249-3012" },
              { name: "고향반찬", phone: "02-2249-3013" },
            ]
          },
          {
            name: "정육",
            stores: [
              { name: "한우명가", phone: "02-2249-3021" },
              { name: "프리미엄정육", phone: "02-2249-3022" },
            ]
          }
        ]
      },
      {
        id: "B1",
        name: "지하 1층",
        summary: "수산물 · 건어물",
        categories: [
          {
            name: "수산물",
            stores: [
              { name: "바다왕횟집", phone: "02-2249-4001" },
              { name: "동해수산", phone: "02-2249-4002" },
              { name: "싱싱수산", phone: "02-2249-4003" },
              { name: "제주해녀", phone: "02-2249-4004" },
            ]
          },
          {
            name: "건어물",
            stores: [
              { name: "남해건어물", phone: "02-2249-4011" },
              { name: "황금건어물", phone: "02-2249-4012" },
            ]
          }
        ]
      }
    ]
  },

  // 2번: 경동시장
  2: {
    floors: [
      {
        id: "2F",
        name: "2층",
        summary: "한약재 · 건강식품",
        categories: [
          {
            name: "한약재",
            stores: [
              { name: "동의한약방", phone: "02-2249-5001" },
              { name: "보령약재", phone: "02-2249-5002" },
              { name: "산삼당", phone: "02-2249-5003" },
              { name: "약초명가", phone: "02-2249-5004" },
            ]
          },
          {
            name: "건강식품",
            stores: [
              { name: "자연건강", phone: "02-2249-5011" },
              { name: "꿀벌농원", phone: "02-2249-5012" },
              { name: "녹용전문", phone: "02-2249-5013" },
            ]
          }
        ]
      },
      {
        id: "1F",
        name: "1층",
        summary: "농산물 · 과일 · 잡곡",
        categories: [
          {
            name: "과일",
            stores: [
              { name: "열대과일", phone: "02-2249-5101" },
              { name: "사계절과일", phone: "02-2249-5102" },
              { name: "과일나라", phone: "02-2249-5103" },
              { name: "달콤과수원", phone: "02-2249-5104" },
              { name: "제주감귤", phone: "02-2249-5105" },
            ]
          },
          {
            name: "잡곡·견과류",
            stores: [
              { name: "오곡창고", phone: "02-2249-5111" },
              { name: "견과류마트", phone: "02-2249-5112" },
              { name: "영양잡곡", phone: "02-2249-5113" },
            ]
          },
          {
            name: "채소",
            stores: [
              { name: "무공해채소", phone: "02-2249-5121" },
              { name: "유기농텃밭", phone: "02-2249-5122" },
            ]
          }
        ]
      },
      {
        id: "B1",
        name: "지하 1층",
        summary: "수산물 · 젓갈 · 김치",
        categories: [
          {
            name: "수산물",
            stores: [
              { name: "속초수산", phone: "02-2249-5201" },
              { name: "원양수산", phone: "02-2249-5202" },
              { name: "해양수산", phone: "02-2249-5203" },
            ]
          },
          {
            name: "젓갈·김치",
            stores: [
              { name: "강경젓갈", phone: "02-2249-5211" },
              { name: "김치명인", phone: "02-2249-5212" },
              { name: "전통젓갈", phone: "02-2249-5213" },
            ]
          }
        ]
      }
    ]
  },

  // 3번: 서울약령시
  3: {
    floors: [
      {
        id: "1F",
        name: "1층",
        summary: "한약재 · 약초 · 건강원",
        categories: [
          {
            name: "한약재",
            stores: [
              { name: "동의보감약재", phone: "02-969-0001" },
              { name: "약령시한약방", phone: "02-969-0002" },
              { name: "인삼명가", phone: "02-969-0003" },
              { name: "한방약초원", phone: "02-969-0004" },
              { name: "천년본초", phone: "02-969-0005" },
              { name: "산삼마을", phone: "02-969-0006" },
            ]
          },
          {
            name: "건강원",
            stores: [
              { name: "보약건강원", phone: "02-969-0011" },
              { name: "한방건강원", phone: "02-969-0012" },
              { name: "약초즙전문", phone: "02-969-0013" },
            ]
          },
          {
            name: "건강식품",
            stores: [
              { name: "벌꿀농원", phone: "02-969-0021" },
              { name: "녹용마을", phone: "02-969-0022" },
            ]
          }
        ]
      }
    ]
  },

  // 4번: 청량리농수산물시장
  4: {
    floors: [
      {
        id: "1F",
        name: "1층",
        summary: "농산물 · 수산물 · 축산물",
        categories: [
          {
            name: "농산물",
            stores: [
              { name: "풍년농산", phone: "02-962-0001" },
              { name: "햇살농원", phone: "02-962-0002" },
              { name: "산지직송", phone: "02-962-0003" },
              { name: "오늘의채소", phone: "02-962-0004" },
            ]
          },
          {
            name: "수산물",
            stores: [
              { name: "동해바다", phone: "02-962-0011" },
              { name: "서해수산", phone: "02-962-0012" },
              { name: "남해횟집", phone: "02-962-0013" },
              { name: "활어센터", phone: "02-962-0014" },
              { name: "전복마을", phone: "02-962-0015" },
            ]
          },
          {
            name: "축산물",
            stores: [
              { name: "한우프라자", phone: "02-962-0021" },
              { name: "고기명인", phone: "02-962-0022" },
              { name: "축산왕", phone: "02-962-0023" },
            ]
          }
        ]
      }
    ]
  },

  // 5번: 청량리전통시장
  5: {
    floors: [
      {
        id: "2F",
        name: "2층",
        summary: "의류 · 침구",
        categories: [
          {
            name: "의류",
            stores: [
              { name: "패션타운", phone: "02-965-0001" },
              { name: "옷사랑", phone: "02-965-0002" },
              { name: "보세마트", phone: "02-965-0003" },
            ]
          },
          {
            name: "침구",
            stores: [
              { name: "이불나라", phone: "02-965-0011" },
              { name: "좋은잠침구", phone: "02-965-0012" },
            ]
          }
        ]
      },
      {
        id: "1F",
        name: "1층",
        summary: "먹거리 · 반찬 · 분식",
        categories: [
          {
            name: "먹거리",
            stores: [
              { name: "왕만두", phone: "02-965-1001" },
              { name: "칼국수집", phone: "02-965-1002" },
              { name: "족발보쌈", phone: "02-965-1003" },
              { name: "순대국밥", phone: "02-965-1004" },
            ]
          },
          {
            name: "반찬",
            stores: [
              { name: "어머니반찬", phone: "02-965-1011" },
              { name: "맛있는반찬", phone: "02-965-1012" },
              { name: "오늘의반찬", phone: "02-965-1013" },
            ]
          },
          {
            name: "분식",
            stores: [
              { name: "튀김천국", phone: "02-965-1021" },
              { name: "떡볶이명가", phone: "02-965-1022" },
            ]
          }
        ]
      }
    ]
  },

  // 6번: 청량리종합시장
  6: {
    floors: [
      {
        id: "2F",
        name: "2층",
        summary: "생활용품 · 잡화",
        categories: [
          {
            name: "생활용품",
            stores: [
              { name: "만물백화", phone: "02-961-0001" },
              { name: "리빙마트", phone: "02-961-0002" },
              { name: "홈플러스", phone: "02-961-0003" },
            ]
          },
          {
            name: "잡화",
            stores: [
              { name: "문구세상", phone: "02-961-0011" },
              { name: "선물의전당", phone: "02-961-0012" },
            ]
          }
        ]
      },
      {
        id: "1F",
        name: "1층",
        summary: "식품 · 과일 · 정육",
        categories: [
          {
            name: "과일",
            stores: [
              { name: "과일왕국", phone: "02-961-1001" },
              { name: "신선과일", phone: "02-961-1002" },
              { name: "달콤마트", phone: "02-961-1003" },
              { name: "계절과일", phone: "02-961-1004" },
            ]
          },
          {
            name: "정육",
            stores: [
              { name: "소고기명가", phone: "02-961-1011" },
              { name: "돼지왕", phone: "02-961-1012" },
            ]
          },
          {
            name: "떡·빵",
            stores: [
              { name: "전통떡집", phone: "02-961-1021" },
              { name: "수제빵마을", phone: "02-961-1022" },
            ]
          }
        ]
      }
    ]
  },

  // 7번: 청량리청과물시장 (동서시장)
  7: {
    floors: [
      {
        id: "1F",
        name: "1층",
        summary: "과일 · 채소 · 건과류",
        categories: [
          {
            name: "과일",
            stores: [
              { name: "대한과일", phone: "02-962-1001" },
              { name: "충남사과", phone: "02-962-1002" },
              { name: "성주참외", phone: "02-962-1003" },
              { name: "나주배농원", phone: "02-962-1004" },
              { name: "제주한라봉", phone: "02-962-1005" },
              { name: "수박천국", phone: "02-962-1006" },
            ]
          },
          {
            name: "채소",
            stores: [
              { name: "무공해야채", phone: "02-962-1011" },
              { name: "초록채소", phone: "02-962-1012" },
              { name: "버섯마을", phone: "02-962-1013" },
              { name: "나물전문", phone: "02-962-1014" },
            ]
          },
          {
            name: "건과류",
            stores: [
              { name: "호두마을", phone: "02-962-1021" },
              { name: "건과류센터", phone: "02-962-1022" },
            ]
          }
        ]
      }
    ]
  },

  // 8번: 청량리현대시장
  8: {
    floors: [
      {
        id: "2F",
        name: "2층",
        summary: "의류 · 액세서리",
        categories: [
          {
            name: "의류",
            stores: [
              { name: "현대패션", phone: "02-966-0001" },
              { name: "뉴트렌드", phone: "02-966-0002" },
              { name: "스타일숍", phone: "02-966-0003" },
            ]
          },
          {
            name: "액세서리",
            stores: [
              { name: "쥬얼리박스", phone: "02-966-0011" },
              { name: "헤어소품", phone: "02-966-0012" },
            ]
          }
        ]
      },
      {
        id: "1F",
        name: "1층",
        summary: "먹거리 · 식품 · 반찬",
        categories: [
          {
            name: "먹거리",
            stores: [
              { name: "현대분식", phone: "02-966-1001" },
              { name: "김밥천국", phone: "02-966-1002" },
              { name: "우동마을", phone: "02-966-1003" },
              { name: "치킨호프", phone: "02-966-1004" },
            ]
          },
          {
            name: "식품·반찬",
            stores: [
              { name: "현대반찬", phone: "02-966-1011" },
              { name: "두부공방", phone: "02-966-1012" },
              { name: "건강도시락", phone: "02-966-1013" },
            ]
          }
        ]
      }
    ]
  },

  // 9번: 청량리종합도매시장
  9: {
    floors: [
      {
        id: "3F",
        name: "3층",
        summary: "사무실 · 창고",
        categories: [
          {
            name: "사무실",
            stores: [
              { name: "시장관리사무소", phone: "02-963-7900" },
              { name: "상인회사무실", phone: "02-963-7901" },
            ]
          }
        ]
      },
      {
        id: "2F",
        name: "2층",
        summary: "건어물 · 가공식품",
        categories: [
          {
            name: "건어물",
            stores: [
              { name: "국산건어물", phone: "02-963-2001" },
              { name: "명태마을", phone: "02-963-2002" },
              { name: "오징어센터", phone: "02-963-2003" },
              { name: "해풍건어물", phone: "02-963-2004" },
            ]
          },
          {
            name: "가공식품",
            stores: [
              { name: "도매식품", phone: "02-963-2011" },
              { name: "대한무역", phone: "02-963-2012" },
              { name: "만물도매", phone: "02-963-2013" },
            ]
          }
        ]
      },
      {
        id: "1F",
        name: "1층",
        summary: "농산물 · 과일 · 도매",
        categories: [
          {
            name: "농산물 도매",
            stores: [
              { name: "전국농산", phone: "02-963-1001" },
              { name: "충청도매", phone: "02-963-1002" },
              { name: "경상도매", phone: "02-963-1003" },
              { name: "전라도매", phone: "02-963-1004" },
              { name: "강원도매", phone: "02-963-1005" },
            ]
          },
          {
            name: "과일 도매",
            stores: [
              { name: "사과도매", phone: "02-963-1011" },
              { name: "수입과일", phone: "02-963-1012" },
              { name: "바나나왕국", phone: "02-963-1013" },
              { name: "열대과일도매", phone: "02-963-1014" },
            ]
          }
        ]
      },
      {
        id: "B1",
        name: "지하 1층",
        summary: "수산물 · 냉동식품 도매",
        categories: [
          {
            name: "수산물 도매",
            stores: [
              { name: "전국수산도매", phone: "02-963-4001" },
              { name: "활어도매센터", phone: "02-963-4002" },
              { name: "냉동수산", phone: "02-963-4003" },
              { name: "새우도매", phone: "02-963-4004" },
            ]
          },
          {
            name: "냉동식품",
            stores: [
              { name: "냉동왕국", phone: "02-963-4011" },
              { name: "만두도매", phone: "02-963-4012" },
            ]
          }
        ]
      }
    ]
  }
};
