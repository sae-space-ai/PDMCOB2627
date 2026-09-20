export default function Header() {
  return (
    <header className="relative overflow-hidden border-b border-slate-700/50">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-teal-600/5 to-indigo-600/10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20 shrink-0">
            <i className="fas fa-music text-3xl text-white"></i>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              PDMCOB2627 — Programación Didáctica 2026/2027
            </h1>
            <p className="text-slate-400 mt-1">
              Música de Cámara · Orquesta · Banda — Enseñanzas Profesionales de Música
            </p>
            <p className="text-xs text-slate-500 mt-1">
              <a href="https://github.com/PDMCOB2627/PDMCOB2627" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                <i className="fab fa-github mr-1"></i>Repositorio: PDMCOB2627/PDMCOB2627
              </a>
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2.5 py-1 bg-emerald-500/15 text-emerald-400 rounded-full text-xs font-medium border border-emerald-500/20">
                <i className="fas fa-shield-alt mr-1"></i>Veracidad normativa
              </span>
              <span className="px-2.5 py-1 bg-amber-500/15 text-amber-400 rounded-full text-xs font-medium border border-amber-500/20">
                <i className="fas fa-pause-circle mr-1"></i>Disciplina HOLD
              </span>
              <span className="px-2.5 py-1 bg-indigo-500/15 text-indigo-400 rounded-full text-xs font-medium border border-indigo-500/20">
                <i className="fas fa-code-branch mr-1"></i>CI/CD GitHub + Vercel
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
