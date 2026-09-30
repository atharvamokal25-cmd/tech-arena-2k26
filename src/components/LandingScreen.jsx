import React, { useState } from 'react';
import {
  Play, Sparkles, User, Clock, CheckCircle2, FileCode,
  ArrowRight, AlertCircle, Zap, Code2, Brain, Bug, Hash,
  Layers, Terminal, Coffee, Cpu
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

const LANGUAGES = [
  {
    id: 'python',
    name: 'Python',
    version: 'Python 3.x',
    icon: Terminal,
    color: 'from-emerald-500 to-teal-600',
    ring: 'border-emerald-500',
    glow: 'rgba(16,185,129,0.35)',
    tag: 'Dynamic & Concise',
    desc: 'Lists, indexing, string manipulation, and recursion.'
  },
  {
    id: 'c',
    name: 'C',
    version: 'C Standard / C99',
    icon: Cpu,
    color: 'from-blue-500 to-cyan-600',
    ring: 'border-blue-500',
    glow: 'rgba(59,130,246,0.35)',
    tag: 'Pointers & Memory',
    desc: 'Pointers, array offsets, arithmetic precedence, and recursion.'
  },
  {
    id: 'java',
    name: 'Java',
    version: 'Java 17+ / JVM',
    icon: Coffee,
    color: 'from-amber-500 to-orange-600',
    ring: 'border-amber-500',
    glow: 'rgba(245,158,11,0.35)',
    tag: 'OOP & Collections',
    desc: 'Object references, ArrayLists, string methods, and class methods.'
  }
];

export default function LandingScreen({
  questionSets,
  selectedSet,
  setSelectedSet,
  selectedLanguage,
  setSelectedLanguage,
  onStartQuiz,
  studentInfo,
  setStudentInfo
}) {
  const [errorMsg, setErrorMsg] = useState('');
  const [focusedField, setFocusedField] = useState('');

  const handleStart = () => {
    if (!studentInfo.name.trim()) {
      setErrorMsg('Please enter your participant name.');
      return;
    }
    if (!selectedSet) {
      setErrorMsg('Please select a Question Set.');
      return;
    }
    if (!selectedLanguage) {
      setErrorMsg('Please select your preferred programming language.');
      return;
    }
    setErrorMsg('');
    onStartQuiz();
  };

  const selectedLangObj = LANGUAGES.find((l) => l.id === selectedLanguage) || LANGUAGES[0];

  return (
    <div className="relative flex-1">
      {/* Atmospheric Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-radial-cyan opacity-80"></div>
        <div className="absolute top-1/3 right-0 w-[600px] h-[400px] bg-radial-indigo"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-radial-purple"></div>
        <div className="bg-grid absolute inset-0 opacity-100"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* ============================
            HERO SECTION
        ============================ */}
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          {/* Category tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass border border-cyan-500/25 text-cyan-400 text-xs font-bold uppercase tracking-widest animate-fadeInUp shadow-[0_0_20px_rgba(6,182,212,0.1)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Annual AI &amp; Algorithmic Challenge</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          </div>

          {/* Main headline */}
          <div className="animate-fadeInUp delay-100 space-y-2">
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-tight">
              <span className="text-white">Master the </span>
              <span className="text-gradient-cyan">Code Arena</span>
            </h1>
          </div>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto animate-fadeInUp delay-200">
            Identify syntax &amp; logic bugs, compute numerical outputs, and tackle AI logical reasoning puzzles in your language of choice — under the clock.
          </p>

          {/* Quick stats bar */}
          <div className="flex items-center justify-center gap-6 animate-fadeInUp delay-300 pt-2">
            {[
              { label: 'Question Sets', value: `${questionSets.length} Sets`, icon: FileCode },
              { label: 'Languages', value: 'Python · C · Java', icon: Code2 },
              { label: 'Live Timers', value: 'Per-Q & Total', icon: Clock },
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
            STEP 1: PARTICIPANT FORM
        ============================ */}
        <div className="max-w-xl mx-auto animate-fadeInUp delay-200">
          <div className="glass-elevated rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <span>Step 1: Participant Registration</span>
              </h2>
              {studentInfo.name.trim() && (
                <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Registered
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'name', label: 'Participant Full Name', required: true, placeholder: 'e.g. Alex Turner' },
                { key: 'id', label: 'Roll No / Student ID', required: false, placeholder: 'e.g. CS2026-042' },
              ].map(({ key, label, required, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    {label} {required && <span className="text-cyan-400 font-bold">*</span>}
                  </label>
                  <input
                    type="text"
                    value={studentInfo[key]}
                    onChange={(e) => {
                      setStudentInfo({ ...studentInfo, [key]: e.target.value });
                      if (errorMsg) setErrorMsg('');
                    }}
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
            STEP 2: QUESTION SET GRID
        ============================ */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-extrabold flex items-center justify-center border border-cyan-500/30">
                  2
                </span>
                <h2 className="text-xl font-extrabold text-white">Select Your Question Set</h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 ml-7">Select one challenge set (3 questions each)</p>
            </div>
            {selectedSet && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-3.5 py-1.5 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.15)]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {selectedSet} Chosen
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {questionSets.map((setObj) => {
              const isSelected = selectedSet === setObj.set;
              const colors = SET_COLORS[setObj.set] || SET_COLORS['Set A'];

              return (
                <div
                  key={setObj.set}
                  onClick={() => {
                    setSelectedSet(setObj.set);
                    setErrorMsg('');
                  }}
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
                        <CheckCircle2 className="w-3 h-3" /> Selected Set
                      </span>
                    </div>
                  )}

                  {/* Set header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors.accent} flex items-center justify-center font-black text-white text-sm shadow-lg`}>
                        {setObj.set.split(' ')[1] || setObj.set.charAt(0)}
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
                      {isSelected ? 'Active' : 'Select'}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================
            STEP 3: PREFERRED LANGUAGE SELECTOR
        ============================ */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-extrabold flex items-center justify-center border border-cyan-500/30">
                  3
                </span>
                <h2 className="text-xl font-extrabold text-white">Select Preferred Language</h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 ml-7">
                All coding error and numerical output questions will be rendered in your selected language.
              </p>
            </div>
            {selectedLanguage && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3.5 py-1.5 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {selectedLangObj.name} Language Selected
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {LANGUAGES.map((lang) => {
              const isSelected = selectedLanguage === lang.id;
              const LangIcon = lang.icon;

              return (
                <div
                  key={lang.id}
                  onClick={() => {
                    setSelectedLanguage(lang.id);
                    setErrorMsg('');
                  }}
                  className={`relative group cursor-pointer rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 shine ${
                    isSelected
                      ? `glass-elevated ${lang.ring} border-2 scale-[1.02]`
                      : 'glass-card border border-white/[0.06] hover:border-white/[0.15]'
                  }`}
                  style={isSelected ? { boxShadow: `0 0 30px -6px ${lang.glow}, 0 20px 40px rgba(0,0,0,0.4)` } : {}}
                >
                  {/* Top selected ribbon */}
                  {isSelected && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className={`bg-gradient-to-r ${lang.color} text-white text-[10px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg`}>
                        <CheckCircle2 className="w-3 h-3" /> Selected Language
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${lang.color} flex items-center justify-center font-black text-white shadow-lg`}>
                        <LangIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-black text-white text-lg leading-tight">{lang.name}</h3>
                        <span className="text-[11px] text-slate-400 font-mono">{lang.version}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/[0.05] text-slate-300 border border-white/[0.08]">
                      {lang.tag}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {lang.desc}
                  </p>

                  <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono text-[11px]">
                      Syntax &amp; Snippets: <span className="text-slate-300 font-bold">{lang.name}</span>
                    </span>
                    <span className={`font-bold flex items-center gap-1 transition-colors ${
                      isSelected ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'
                    }`}>
                      {isSelected ? 'Ready' : 'Choose'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================
            START BUTTON & VALIDATION
        ============================ */}
        <div className="max-w-xl mx-auto text-center space-y-4 pt-4">
          {errorMsg && (
            <div className="p-3.5 bg-rose-950/50 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-medium flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(244,63,94,0.1)] animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {errorMsg}
            </div>
          )}

          <button
            onClick={handleStart}
            id="start-quiz-btn"
            className="w-full py-4 rounded-2xl font-black text-base tracking-wide flex items-center justify-center gap-3 btn-primary text-white cursor-pointer shine shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300"
          >
            <Play className="w-5 h-5 fill-white drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
            <span>
              {selectedSet
                ? `START QUIZ — ${selectedSet} (${selectedLangObj.name})`
                : 'SELECT A QUESTION SET TO START'}
            </span>
          </button>

          <p className="text-xs text-slate-500">
            Per-question and total live timers will begin once you click Start Quiz.
          </p>
        </div>

      </div>
    </div>
  );
}
