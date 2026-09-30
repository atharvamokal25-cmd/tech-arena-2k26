import React, { useState, useEffect, useRef } from 'react';
import CodeBlock from './CodeBlock';
import {
  Clock, ArrowRight, ArrowLeft, Send, Sparkles,
  Timer, CheckCircle, Bug, Hash, Brain, Zap, AlertCircle
} from 'lucide-react';

const Q_TYPES = {
  'Finding Error': { icon: Bug, color: 'text-rose-400', bg: 'badge-error', glow: 'rgba(244,63,94,0.2)' },
  'Numerical Output': { icon: Hash, color: 'text-sky-400', bg: 'badge-numerical', glow: 'rgba(6,182,212,0.2)' },
  'Logical Reasoning': { icon: Brain, color: 'text-violet-400', bg: 'badge-logical', glow: 'rgba(168,85,247,0.2)' },
};

export default function QuizWizard({ setData, onCompleteQuiz }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [overallSec, setOverallSec] = useState(0);
  const [qSec, setQSec] = useState(0);
  const [accuQSec, setAccuQSec] = useState([0, 0, 0]);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const textareaRef = useRef(null);

  const questions = setData.questions || [];
  const q = questions[currentIdx] || {};
  const qt = Q_TYPES[q.type] || Q_TYPES['Finding Error'];
  const QIcon = qt.icon;

  // Overall timer
  useEffect(() => {
    const id = setInterval(() => setOverallSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Per-question timer
  useEffect(() => {
    setQSec(0);
    const id = setInterval(() => setQSec((s) => s + 1), 1000);
    textareaRef.current?.focus();
    return () => clearInterval(id);
  }, [currentIdx]);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const commitAndGo = (nextIdx) => {
    setAccuQSec((prev) => {
      const u = [...prev];
      u[currentIdx] = (u[currentIdx] || 0) + qSec;
      return u;
    });
    setCurrentIdx(nextIdx);
  };

  const handleSubmit = () => {
    if (!answers[currentIdx]?.trim()) {
      setSubmitAttempted(true);
      return;
    }
    const finalSec = [...accuQSec];
    finalSec[currentIdx] = (finalSec[currentIdx] || 0) + qSec;
    onCompleteQuiz({ set: setData.set, overallSeconds: overallSec, questionSeconds: finalSec, answers, questions });
  };

  const progress = ((currentIdx + 1) / questions.length) * 100;

  return (
    <div className="relative flex-1">
      {/* Atmospheric glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial-cyan opacity-60"></div>
        <div className="bg-grid absolute inset-0"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* ====== TOP HEADER: SET + TIMERS ====== */}
        <div className="glass-elevated rounded-2xl p-4 space-y-4 border border-white/[0.06]">
          {/* Row 1: Set badge + timers */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-black text-sm px-3.5 py-1.5 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                {setData.set}
              </span>
              <span className="text-slate-400 text-xs font-medium">
                Question <span className="text-white font-bold">{currentIdx + 1}</span>
                <span className="text-slate-600"> / {questions.length}</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Q-time */}
              <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
                <Timer className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-500 hidden sm:inline">Q-Time:</span>
                <span className="font-code font-bold text-amber-300">{fmt(qSec)}</span>
              </div>
              {/* Overall timer */}
              <div className="flex items-center gap-2 bg-cyan-950/30 border border-cyan-500/25 px-3 py-1.5 rounded-xl text-xs shadow-[0_0_12px_rgba(6,182,212,0.1)]">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-400 hidden sm:inline">Total:</span>
                <span className="font-code font-black text-cyan-400 text-sm">{fmt(overallSec)}</span>
              </div>
            </div>
          </div>

          {/* Row 2: Progress Bar */}
          <div>
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="timer-bar h-full rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Row 3: Step nav pills */}
          <div className="flex items-center gap-2">
            {questions.map((qItem, idx) => {
              const itemQt = Q_TYPES[qItem.type] || Q_TYPES['Finding Error'];
              const ItemIcon = itemQt.icon;
              const isActive = idx === currentIdx;
              const isAnswered = !!answers[idx]?.trim();
              return (
                <button
                  key={idx}
                  onClick={() => commitAndGo(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : isAnswered
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/15'
                      : 'bg-slate-900/80 text-slate-500 border border-slate-800 hover:text-slate-300'
                  }`}
                >
                  {isAnswered && !isActive ? (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <span className={`w-4.5 h-4.5 flex items-center justify-center rounded-full text-[10px] font-black ${
                      isActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {idx + 1}
                    </span>
                  )}
                  <span className="hidden sm:inline">{qItem.type.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ====== QUESTION CARD ====== */}
        <div
          className="glass-elevated rounded-2xl border border-white/[0.06] overflow-hidden"
          style={{ boxShadow: `0 0 60px -20px ${qt.glow}, 0 20px 40px rgba(0,0,0,0.5)` }}
        >
          {/* Question type header strip */}
          <div className={`px-6 py-3 border-b border-white/[0.05] flex items-center justify-between`}>
            <span className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${qt.color}`}>
              <QIcon className="w-4 h-4" />
              {q.type}
            </span>
            <span className="text-xs text-slate-600 font-code">
              #{q.id || `q_${currentIdx + 1}`}
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Question text */}
            <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {q.text}
            </h3>

            {/* Code block */}
            {q.code && (
              <CodeBlock
                code={q.code}
                title={`tech_arena_${setData.set.toLowerCase().replace(' ', '_')}_q${currentIdx + 1}.py`}
              />
            )}

            {/* Answer textarea */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Your Answer
              </label>
              <textarea
                ref={textareaRef}
                rows={4}
                value={answers[currentIdx] || ''}
                onChange={(e) => {
                  setAnswers({ ...answers, [currentIdx]: e.target.value });
                  if (submitAttempted) setSubmitAttempted(false);
                }}
                placeholder={
                  q.type === 'Finding Error'
                    ? 'State the line number and exact error description...'
                    : q.type === 'Numerical Output'
                    ? 'Enter the exact numerical output (e.g. 44, 6, 64)...'
                    : 'Write your logical reasoning and final answer...'
                }
                className={`w-full bg-slate-950/90 rounded-xl p-4 text-sm font-code text-slate-100 placeholder-slate-700 outline-none transition-all resize-none leading-relaxed ${
                  submitAttempted && !answers[currentIdx]?.trim()
                    ? 'border border-rose-500 shadow-[0_0_0_3px_rgba(244,63,94,0.15)]'
                    : 'border border-slate-800 focus:border-cyan-500 focus:shadow-[0_0_0_3px_rgba(6,182,212,0.1)]'
                }`}
              />
              {submitAttempted && !answers[currentIdx]?.trim() && (
                <p className="text-xs text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Please provide an answer before submitting.
                </p>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
              <button
                onClick={() => commitAndGo(currentIdx - 1)}
                disabled={currentIdx === 0}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentIdx === 0
                    ? 'bg-slate-950/50 text-slate-700 border border-slate-900 cursor-not-allowed'
                    : 'glass border border-white/[0.07] text-slate-300 hover:text-white hover:border-white/[0.15] cursor-pointer'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              {currentIdx < questions.length - 1 ? (
                <button
                  onClick={() => commitAndGo(currentIdx + 1)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-[1.02] transition-all cursor-pointer shine"
                >
                  Next Question
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-7 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-[1.02] transition-all cursor-pointer shine"
                >
                  <Send className="w-4 h-4" />
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
