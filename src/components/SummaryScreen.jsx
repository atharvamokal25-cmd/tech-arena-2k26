import React, { useEffect } from 'react';
import { CheckCircle2, Clock, Trophy, RotateCcw, FileText, Bug, Hash, Brain, Sparkles } from 'lucide-react';

const Q_TYPES = {
  'Finding Error': { icon: Bug, color: 'text-rose-400', badge: 'badge-error' },
  'Numerical Output': { icon: Hash, color: 'text-sky-400', badge: 'badge-numerical' },
  'Logical Reasoning': { icon: Brain, color: 'text-violet-400', badge: 'badge-logical' },
};

export default function SummaryScreen({ resultData, studentInfo, onResetToHome }) {
  useEffect(() => {
    // Confetti with dynamic import fallback
    try {
      import('canvas-confetti').then((m) => {
        const confetti = m.default;
        // First burst
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.55 }, colors: ['#06b6d4', '#6366f1', '#a855f7', '#22c55e'] });
        // Second delayed burst
        setTimeout(() => {
          confetti({ particleCount: 80, spread: 55, angle: 60, origin: { x: 0, y: 0.6 } });
          confetti({ particleCount: 80, spread: 55, angle: 120, origin: { x: 1, y: 0.6 } });
        }, 400);
      });
    } catch (e) { /* ignore */ }
  }, []);

  const fmt = (s) => {
    if (!s && s !== 0) return '00:00';
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  };

  const { set, overallSeconds, questionSeconds, answers, questions } = resultData || {};
  const answeredCount = Object.values(answers || {}).filter((a) => a?.trim()).length;

  return (
    <div className="relative flex-1">
      {/* Atmospheric glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px]"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(16,185,129,0.12) 0%, transparent 70%)' }}></div>
        <div className="bg-grid absolute inset-0"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fadeIn">

        {/* ====== SUCCESS HERO ====== */}
        <div className="glass-elevated rounded-2xl border border-emerald-500/20 p-8 text-center relative overflow-hidden"
          style={{ boxShadow: '0 0 60px -20px rgba(16,185,129,0.2), 0 20px 40px rgba(0,0,0,0.5)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent"></div>
          <div className="absolute -right-12 -bottom-12 w-52 h-52 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)' }}></div>

          {/* Trophy / Check icon */}
          <div className="relative inline-flex">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.25)]">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            </div>
            <Trophy className="absolute -top-2 -right-2 w-6 h-6 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
          </div>

          <h1 className="mt-5 text-3xl font-black text-white">
            Quiz Submitted!
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-md mx-auto">
            Your responses have been recorded for Tech Arena 2k26. The coordinator will verify your answers.
          </p>

          {/* Participant meta chip */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 glass border border-white/[0.07] px-5 py-2.5 rounded-full text-xs">
            <span className="text-slate-400">Participant:</span>
            <span className="font-bold text-white">{studentInfo.name || 'Anonymous'}</span>
            {studentInfo.id && <>
              <span className="text-slate-700">·</span>
              <span className="font-code text-cyan-400 font-bold">{studentInfo.id}</span>
            </>}
            <span className="text-slate-700">·</span>
            <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-bold">{set}</span>
            <span className="text-slate-700">·</span>
            <span className="text-emerald-400 font-semibold">{answeredCount}/{questions?.length || 3} answered</span>
          </div>
        </div>

        {/* ====== TIMING ANALYTICS ====== */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            Execution Time Breakdown
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Total */}
            <div className="glass-elevated rounded-xl p-4 border border-cyan-500/20 relative overflow-hidden col-span-2 sm:col-span-1"
              style={{ boxShadow: '0 0 20px -8px rgba(6,182,212,0.2)' }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block mb-2">Total Session</span>
              <div className="text-3xl font-black font-code text-cyan-300">{fmt(overallSeconds)}</div>
              <span className="text-[11px] text-slate-500 block mt-1">Full elapsed time</span>
            </div>

            {/* Per-question */}
            {questions?.map((qItem, idx) => {
              const qt = Q_TYPES[qItem.type] || Q_TYPES['Finding Error'];
              const QIcon = qt.icon;
              return (
                <div key={idx} className="glass-card rounded-xl p-4 border border-white/[0.06]">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2 flex items-center gap-1">
                    <QIcon className={`w-3 h-3 ${qt.color}`} />
                    Q{idx + 1}
                  </span>
                  <div className="text-xl font-black font-code text-slate-200">{fmt(questionSeconds?.[idx] || 0)}</div>
                  <span className="text-[11px] text-slate-600 block mt-1 line-clamp-1">{qItem.type}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ====== RESPONSE REVIEW ====== */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            Submitted Responses &amp; Reference Key
          </h2>

          {questions?.map((qItem, idx) => {
            const qt = Q_TYPES[qItem.type] || Q_TYPES['Finding Error'];
            const QIcon = qt.icon;
            const userAns = answers?.[idx];
            return (
              <div key={idx} className="glass-card rounded-2xl border border-white/[0.06] overflow-hidden">
                {/* Header row */}
                <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/[0.05]">
                  <span className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${qt.color}`}>
                    <QIcon className="w-4 h-4" />
                    Q{idx + 1} · {qItem.type}
                  </span>
                  <span className="text-xs text-slate-500 font-code">
                    <Clock className="inline w-3 h-3 mr-1 text-slate-600" />
                    {fmt(questionSeconds?.[idx] || 0)}
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-sm font-semibold text-slate-200">{qItem.text}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* User's submission */}
                    <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800/80">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Your Submission:</span>
                      <p className="text-xs font-code text-cyan-200 whitespace-pre-wrap leading-relaxed">
                        {userAns?.trim() || <span className="text-slate-600 italic">No answer provided</span>}
                      </p>
                    </div>

                    {/* Reference key */}
                    <div className="bg-amber-950/20 rounded-xl p-4 border border-amber-500/15">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-2 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Coordinator Reference Key:
                      </span>
                      <p className="text-xs font-code text-amber-200/90 whitespace-pre-wrap leading-relaxed">
                        {qItem.answer || 'Refer to coordinator evaluation board.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Return CTA */}
        <div className="text-center pt-2 pb-4">
          <button
            onClick={onResetToHome}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-extrabold text-xs tracking-wider glass border border-white/[0.08] hover:border-cyan-500/30 text-slate-200 hover:text-white transition-all shine shadow-lg cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-cyan-400" />
            RETURN TO ARENA HOME
          </button>
        </div>
      </div>
    </div>
  );
}
