export default function Footer() {
  return (
    <div className="hidden md:block bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 flex-none w-full">
      <div className="max-w-7xl mx-auto px-8 py-10 flex items-center justify-between">
        <div>
          <h3 className="text-white text-xl font-black mb-1">동대문구 전통시장 스마트 가이드</h3>
          <p className="text-slate-400 text-sm font-medium">각 시장을 클릭하면 상세 지도와 점포 정보를 확인할 수 있습니다</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3 text-center">
            <span className="text-2xl font-black text-white block">9</span>
            <span className="text-xs text-slate-400 font-bold">전통시장</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3 text-center">
            <span className="text-2xl font-black text-blue-400 block">1,000+</span>
            <span className="text-xs text-slate-400 font-bold">등록 점포</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3 text-center">
            <span className="text-2xl font-black text-emerald-400 block">QR</span>
            <span className="text-xs text-slate-400 font-bold">스마트 연동</span>
          </div>
        </div>
      </div>
    </div>
  );
}
