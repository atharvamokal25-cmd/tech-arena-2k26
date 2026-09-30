import React, { useState } from 'react';
import {
  Play, Sparkles, User, Clock, CheckCircle2, FileCode,
  ArrowRight, AlertCircle, Zap, Code2, Brain, Bug, Hash
} from 'lucide-react';

const Q_ICONS = {
  'Finding Error': Bug,
  'Numerical Output': Hash,
  'Logical Reasoning': Brain,
};

const Q_BADGE = {
  'Finding Error': 'badge-error',
  'Numerical Output': 'badge-numerical',
  'Logical Reasoning': 'badge-logical',
};

const SET_COLORS = {
  'Set A': { accent: 'from-cyan-500 to-blue-600', glow: 'rgba(6,182,212,0.35)', ring: 'border-cyan-500' },
  'Set B': { accent: 'from-violet-500 to-indigo-600', glow: 'rgba(139,92,246,0.35)', ring: 'border-violet-500' },
  'Set C': { accent: 'from-rose-500 to-pink-600', glow: 'rgba(244,63,94,0.35)', ring: 'border-rose-500' },
  'Set D': { accent: 'from-amber-500 to-orange-600', glow: 'rgba(245,158,11,0.35)', ring: 'border-amber-500' },
};

export default function LandingScreen({ questionSets, selectedSet, setSelectedSet, onStartQuiz, studentInfo, setStudentInfo }) {
  const [errorMsg, setErrorMsg] = useState('');
  const [focusedField, setFocusedField] = useState('');

  const handleStart = () => {
    if (!selectedSet) { setErrorMsg('Please select a Question Set to proceed.'); return; }
    if (!studentInfo.name.trim()) { setErrorMsg('Please enter your name to register your submission.'); return; }
    setErrorMsg('');
    onStartQuiz();
  };

  return (
    <div className="relative flex-1">
      {/* === ATMOSPHERIC BACKGROUND GLOWS === */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-radial-cyan opacity-80"></div>
        <div className="absolute top-1/3 right-0 w-[600px] h-[400px] bg-radial-indigo"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-radial-purple"></div>
        <div className="bg-grid absolute inset-0 opacity-100"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">

        {/* ============================
            HERO SECTION
        ============================ */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          {/* Category tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-cyan-500/25 text-cyan-400 text-xs font-bold uppercase tracking-widest animate-fadeInUp shadow-[0_0_20px_rgba(6,182,212,0.1)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Annual AI &amp; Algorithmic Challenge</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          </div>

          {/* Main headline */}
          <div className="animate-fadeInUp delay-100 space-y-2">
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-none">
              <span className="text-white">Master the</span>
              <br />
              <span className="text-gradient-cyan">Code Arena</span>
            </h1>
          </div>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto animate-fadeInUp delay-200">
            Identify Python bugs, compute exact numerical outputs, and tackle AI logical reasoning puzzles — all under the clock.
          </p>

          {/* Quick stats bar */}
          <div className="flex items-center justify-center gap-6 animate-fadeInUp delay-300">
            {[
              { label: 'Question Sets', value: '4', icon: FileCode },
              { label: 'Per Set', value: '3 Qs', icon: Zap },
              { label: 'Live Timers', value: 'Yes', icon: Clock },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Icon className="w-3.5 h-3.5 text-cyan-500" />
                  {label}
                </div>
                <span className="text-sm font-black text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ============================
            PARTICIPANT FORM
        ============================ */}
        <div className="max-w-lg mx-auto animate-fadeInUp delay-200">
          <div className="glass-elevated rounded-2xl p-6 relative overflow-hidden">
            {/* Subtle top glow stripe */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              Participant Registration
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {[
                { key: 'name', label: 'Participant Name', required: true, placeholder: 'e.g. Alex Turner' },
                { key: 'id', label: 'Roll No / ID', required: false, placeholder: 'e.g. CS2026-042' },
              ].map(({ key, label, required, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    {label} {required && <span className="text-cyan-500">*</span>}
                  </label>
                  <input
                    type="text"
                    value={studentInfo[key]}
                    onChange={(e) => setStudentInfo({ ...studentInfo, [key]: e.target.value })}
                    onFocus={() => setFocusedField(key)}
                    onBlur={() => setFocusedField('')}
                    placeholder={placeholder}
                    className={`w-full bg-slate-950/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-700 outline-none transition-all font-medium ${
                      focusedField === key
                        ? 'border border-cyan-500 shadow-[0_0_0_3px_rgba(6,182,212,0.15)]'
                        : 'border border-slate-800 hover:border-slate-700'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================
            QUESTION SET GRID
        ============================ */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-white">Select Your Question Set</h2>
              <p className="text-xs text-slate-500 mt-0.5">One set · Three questions · Timed challenge</p>
            </div>
            {selectedSet && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-3 py-1.5 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.15)]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {selectedSet} Selected
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {questionSets.map((setObj, setIdx) => {
              const isSelected = selectedSet === setObj.set;
              const colors = SET_COLORS[setObj.set] || SET_COLORS['Set A'];

              return (
                <div
                  key={setObj.set}
                  onClick={() => { setSelectedSet(setObj.set); setErrorMsg(''); }}
                  className={`relative group cursor-pointer rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 shine ${
                    isSelected
                      ? `glass-elevated ${colors.ring} border-2 scale-[1.02]`
                      : 'glass-card border border-white/[0.06] hover:border-white/[0.12]'
                  }`}
                  style={isSelected ? { boxShadow: `0 0 30px -8px ${colors.glow}, 0 20px 40px rgba(0,0,0,0.4)` } : {}}
                >
                  {/* Active badge */}
                  {isSelected && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className={`bg-gradient-to-r ${colors.accent} text-white text-[10px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg`}>
                        <CheckCircle2 className="w-3 h-3" /> Selected
                      </span>
                    </div>
                  )}

                  {/* Set header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors.accent} flex items-center justify-center font-black text-white text-sm shadow-lg`}>
                        {setObj.set.split(' ')[1]}
                      </div>
                      <div>
                        <span className="font-black text-white text-base leading-tight block">{setObj.set}</span>
                        <span className="text-[11px] text-slate-500 font-medium">{setObj.questions.length} Questions</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[11.5px] text-slate-500 leading-relaxed line-clamp-2 flex-1">
                    {setObj.description}
                  </p>

                  {/* Question type badges */}
                  <div className="space-y-1.5 border-t border-white/[0.05] pt-3">
                    {setObj.questions.map((q, qi) => {
                      const QIcon = Q_ICONS[q.type] || Zap;
                      return (
                        <div key={qi} className="flex items-center gap-2">
                          <span className="text-slate-600 font-mono text-[11px] font-bold w-4">Q{qi + 1}</span>
                          <span className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md ${Q_BADGE[q.type]}`}>
                            <QIcon className="w-3 h-3" />
                            {q.type}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer CTA */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> ~5–10 min
                    </span>
                    <span className={`text-[11px] font-bold flex items-center gap-1 transition-colors ${
                      isSelected ? 'text-cyan-400' : 'text-slate-600 group-hover:text-slate-300'
                    }`}>
                      {isSelected ? 'Ready' : 'Select'}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================
            CTA / ERROR / START BUTTON
        ============================ */}
        <div className="max-w-lg mx-auto text-center space-y-5">
          {errorMsg && (
            <div className="p-3.5 bg-rose-950/50 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-medium flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(244,63,94,0.1)]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {errorMsg}
            </div>
          )}

          <button
            onClick={handleStart}
            disabled={!selectedSet}
            id="start-quiz-btn"
            className={`w-full py-4 rounded-2xl font-black text-base tracking-wide flex items-center justify-center gap-3 transition-all duration-300 ${
              selectedSet
                ? 'btn-primary text-white cursor-pointer shine'
                : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
            }`}
          >
            <Play className={`w-5 h-5 ${selectedSet ? 'fill-white drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]' : 'fill-slate-600'}`} />
            <span>
              {selectedSet ? `START QUIZ — ${selectedSet}` : 'SELECT A SET FIRST'}
            </span>
          </button>

          <p className="text-xs text-slate-600">
            Live timers start immediately · Complete Q1 → Q2 → Q3 sequentially
          </p>
        </div>
      </div>
    </div>
  );
}
