import React from 'react';
import { Cpu, ShieldCheck, LogOut, Home, Award, Zap, ChevronRight } from 'lucide-react';

export default function Navbar({ onOpenAdminModal, isAdmin, onLogoutAdmin, viewMode, setViewMode }) {
  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-white/[0.06]">
      {/* Subtle top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* === BRAND === */}
        <div
          className="flex items-center gap-3 cursor-pointer group shrink-0"
          onClick={() => setViewMode('landing')}
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 shadow-[0_0_20px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.65)] transition-all duration-300">
            <Cpu className="w-5 h-5 text-white drop-shadow" />
            {/* Pulsing dot */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute h-full w-full rounded-full bg-cyan-400 opacity-75 duration-1000"></span>
              <span className="relative flex rounded-full h-3 w-3 bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]"></span>
            </span>
          </div>

          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="font-black text-[19px] tracking-tight">
                <span className="text-white">TECH </span>
                <span className="text-gradient-cyan">ARENA</span>
              </span>
              <span className="bg-cyan-500/15 text-cyan-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-cyan-500/25 tracking-wider">
                2K26
              </span>
            </div>
            <p className="text-[10.5px] text-slate-400 hidden sm:block font-medium tracking-wide">
              AI & Coding Challenge Series
            </p>
          </div>
        </div>

        {/* === CENTER BADGE === */}
        <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/[0.07] text-xs text-slate-400">
          <span className="pulse-dot"></span>
          <span className="font-semibold text-slate-300">Live Competition Mode</span>
          <span className="w-px h-3.5 bg-slate-700 mx-1"></span>
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-400">AISA Official</span>
        </div>

        {/* === RIGHT CONTROLS === */}
        <div className="flex items-center gap-2 shrink-0">
          {viewMode !== 'landing' && (
            <button
              onClick={() => setViewMode('landing')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white glass hover:border-slate-600 border border-white/[0.06] rounded-xl transition-all"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Home</span>
            </button>
          )}

          {isAdmin ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode(viewMode === 'admin' ? 'landing' : 'admin')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shine ${
                  viewMode === 'admin'
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                    : 'glass border border-indigo-500/30 text-indigo-300 hover:border-indigo-400/50'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{viewMode === 'admin' ? 'Exit Panel' : 'Admin Panel'}</span>
              </button>
              <button
                onClick={onLogoutAdmin}
                className="p-2 text-slate-500 hover:text-rose-400 glass border border-white/[0.06] hover:border-rose-500/30 rounded-xl transition-all"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAdminModal}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white glass border border-white/[0.07] hover:border-cyan-500/30 rounded-xl transition-all shine group"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400 group-hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.8)] transition-all" />
              <span>Admin Login</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
