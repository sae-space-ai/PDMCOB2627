export default function Header() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-teal-600/10 to-blue-600/20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <i className="fas fa-rocket text-2xl text-white"></i>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Deploy Guide
            </h1>
            <p className="text-slate-400 text-sm">GitHub + Vercel · CI/CD Pipeline</p>
          </div>
        </div>
        
        <div className="mt-6 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <i className="fab fa-github text-xl text-white"></i>
              <span className="text-slate-300 font-mono text-sm">programacion-didactica-2026-2027</span>
            </div>
            <div className="h-4 w-px bg-slate-600"></div>
            <div className="flex items-center gap-2">
              <i className="fas fa-code-branch text-emerald-400"></i>
              <span className="text-slate-300 text-sm">main</span>
            </div>
            <div className="h-4 w-px bg-slate-600"></div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">HTML estático</span>
            </div>
            <div className="h-4 w-px bg-slate-600"></div>
            <div className="flex items-center gap-2">
              <i className="fas fa-music text-purple-400"></i>
              <span className="text-slate-300 text-sm">Música de Cámara · Orquesta · Banda</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
