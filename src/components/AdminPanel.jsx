import React, { useState, useEffect } from 'react';
import {
  Plus, Edit2, Trash2, RotateCcw, Download, Search,
  Database, Users, FilePlus, Save, X, Bug, Hash, Brain,
  CheckCircle2, AlertTriangle, FileSpreadsheet, XCircle
} from 'lucide-react';
import CodeBlock from './CodeBlock';

const Q_BADGES = {
  'Finding Error': { cls: 'badge-error', icon: Bug },
  'Numerical Output': { cls: 'badge-numerical', icon: Hash },
  'Logical Reasoning': { cls: 'badge-logical', icon: Brain },
};

// Toast helper hook
function useToast() {
  const [toast, setToast] = useState(null); // { msg, type: 'success'|'error'|'info' }
  const show = (msg, type = 'success', duration = 3000) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), duration);
  };
  return { toast, show };
}

export default function AdminPanel({ questionSets, setQuestionSets, submissions, setSubmissions, onResetDefaults }) {
  const [tab, setTab] = useState('questions');
  const [setFilter, setSetFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [isQModal, setIsQModal] = useState(false);
  const [editQ, setEditQ] = useState(null);
  const [qForm, setQForm] = useState({ type: 'Finding Error', text: '', code: '', answer: '', targetSet: 'Set A' });
  const [isNewSet, setIsNewSet] = useState(false);
  const [newSetName, setNewSetName] = useState('');
  const { toast, show: showToast } = useToast();
  const [clearConfirm, setClearConfirm] = useState(false);

  const openAdd = (targetSet = 'Set A') => {
    setEditQ(null);
    setQForm({ type: 'Finding Error', text: '', code: '', answer: '', targetSet });
    setIsQModal(true);
  };

  const openEdit = (setName, q) => {
    setEditQ(q);
    setQForm({ type: q.type, text: q.text, code: q.code || '', answer: q.answer || '', targetSet: setName });
    setIsQModal(true);
  };

  const saveQ = (e) => {
    e.preventDefault();
    if (!qForm.text.trim()) return;
    const obj = { id: editQ?.id || `q_${Date.now()}`, type: qForm.type, text: qForm.text, code: qForm.code, answer: qForm.answer };
    setQuestionSets((prev) => {
      const exists = prev.some((s) => s.set === qForm.targetSet);
      if (!exists) return [...prev, { set: qForm.targetSet, description: 'Custom Set', questions: [obj] }];
      return prev.map((s) => s.set !== qForm.targetSet ? s : {
        ...s,
        questions: editQ ? s.questions.map((q) => q.id === editQ.id ? obj : q) : [...s.questions, obj]
      });
    });
    setIsQModal(false);
  };

  const delQ = (setName, id) => {
    if (!window.confirm('Delete this question?')) return;
    setQuestionSets((prev) => prev.map((s) => s.set !== setName ? s : { ...s, questions: s.questions.filter((q) => q.id !== id) }));
  };

  const delSet = (setName) => {
    if (!window.confirm(`Delete all of "${setName}"?`)) return;
    setQuestionSets((prev) => prev.filter((s) => s.set !== setName));
  };

  const createSet = (e) => {
    e.preventDefault();
    if (!newSetName.trim()) return;
    const name = newSetName.trim().startsWith('Set') ? newSetName.trim() : `Set ${newSetName.trim()}`;
    if (questionSets.some((s) => s.set.toLowerCase() === name.toLowerCase())) { alert('Set already exists!'); return; }
    setQuestionSets([...questionSets, { set: name, description: 'Custom Question Set', questions: [] }]);
    setNewSetName(''); setIsNewSet(false);
  };

  // Export as CSV
  const exportCSV = () => {
    if (!submissions.length) return;

    // Build CSV headers
    const headers = [
      'Submission ID', 'Timestamp', 'Participant Name', 'Roll No / ID',
      'Question Set', 'Language',
      'Q1 Time (mm:ss)', 'Q2 Time (mm:ss)', 'Q3 Time (mm:ss)', 'Total Time (mm:ss)',
      'Q1 Answer', 'Q2 Answer', 'Q3 Answer'
    ];

    const escape = (val) => {
      const str = String(val ?? '').replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = submissions.map((sub) => [
      escape(sub.id || ''),
      escape(sub.timestamp ? new Date(sub.timestamp).toLocaleString() : ''),
      escape(sub.studentName || 'Anonymous'),
      escape(sub.studentId || ''),
      escape(sub.set || ''),
      escape(sub.language ? sub.language.toUpperCase() : 'PYTHON'),
      escape(fmt(sub.questionSeconds?.[0])),
      escape(fmt(sub.questionSeconds?.[1])),
      escape(fmt(sub.questionSeconds?.[2])),
      escape(fmt(sub.overallSeconds)),
      escape(sub.answers?.[0] || ''),
      escape(sub.answers?.[1] || ''),
      escape(sub.answers?.[2] || ''),
    ]);

    const csvContent = [headers.map(h => `"${h}"`).join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(blob),
      download: `tech_arena_submissions_${ts}.csv`
    });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
    showToast(`Exported ${submissions.length} submission${submissions.length > 1 ? 's' : ''} as CSV`, 'success');
  };

  // Clear submissions with confirmation
  const clearSubs = () => {
    if (!clearConfirm) {
      setClearConfirm(true);
      setTimeout(() => setClearConfirm(false), 4000);
      return;
    }
    const count = submissions.length;
    setSubmissions([]);
    setClearConfirm(false);
    showToast(`Cleared ${count} submission log${count > 1 ? 's' : ''}`, 'info');
  };

  const fmt = (s) => {
    if (s == null) return '00:00';
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  };

  const filteredSubs = submissions.filter((s) =>
    (setFilter === 'All' || s.set === setFilter) &&
    (!search || s.studentName?.toLowerCase().includes(search.toLowerCase()) || s.studentId?.toLowerCase().includes(search.toLowerCase()))
  );

  const totalQs = questionSets.reduce((a, s) => a + s.questions.length, 0);

  return (
    <div className="relative flex-1">

      {/* ====== TOAST NOTIFICATION ====== */}
      {toast && (
        <div
          className={`fixed top-20 right-4 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl text-xs font-semibold animate-fadeIn ${
            toast.type === 'success'
              ? 'bg-emerald-950/95 border-emerald-500/40 text-emerald-300 shadow-emerald-500/20'
              : toast.type === 'error'
              ? 'bg-rose-950/95 border-rose-500/40 text-rose-300 shadow-rose-500/20'
              : 'bg-slate-900/95 border-slate-700 text-slate-300'
          }`}
          style={{ backdropFilter: 'blur(12px)' }}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toast.type === 'error' && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
          {toast.type === 'info' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
          <span>{toast.msg}</span>
        </div>
      )}
      {/* Subtle bg */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="bg-grid absolute inset-0 opacity-50"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px]"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%)' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7">

        {/* ====== DASHBOARD HEADER ====== */}
        <div className="glass-elevated rounded-2xl p-6 border border-indigo-500/20 relative overflow-hidden"
          style={{ boxShadow: '0 0 40px -15px rgba(99,102,241,0.2)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-indigo-500/30 uppercase tracking-widest">
                  Coordinator Panel
                </span>
                <span className="text-[11px] text-slate-500">Authorized Coordinator Session</span>
              </div>
              <h1 className="text-2xl font-black text-white">Tech Arena Admin Dashboard</h1>
              <p className="text-xs text-slate-500 mt-0.5">Manage questions, add code snippets, and review submission logs.</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {[
                { label: 'Sets', val: questionSets.length, color: 'text-cyan-400' },
                { label: 'Questions', val: totalQs, color: 'text-indigo-400' },
                { label: 'Submissions', val: submissions.length, color: 'text-emerald-400' },
              ].map(({ label, val, color }) => (
                <div key={label} className="bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-xl text-center min-w-[80px]">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wide">{label}</span>
                  <span className={`text-xl font-black ${color}`}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ====== TABS ====== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.05]">
          <div className="flex items-center gap-2">
            {[
              { id: 'questions', label: 'Question Sets', icon: Database, count: totalQs },
              { id: 'submissions', label: 'Submission Logs', icon: Users, count: submissions.length },
            ].map(({ id, label, icon: Icon, count }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  tab === id
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    : 'glass border border-white/[0.06] text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${tab === id ? 'bg-white/20' : 'bg-slate-800 text-slate-400'}`}>{count}</span>
              </button>
            ))}
          </div>

          {tab === 'questions' && (
            <div className="flex items-center gap-2 flex-wrap">
              <button onClick={() => openAdd('Set A')} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer shine">
                <Plus className="w-4 h-4" /> Add Question
              </button>
              <button onClick={() => setIsNewSet(true)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass border border-white/[0.08] text-slate-300 hover:text-white font-semibold text-xs transition-all cursor-pointer">
                <FilePlus className="w-4 h-4 text-cyan-400" /> New Set
              </button>
              <button onClick={onResetDefaults} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-950/40 border border-rose-800/30 text-rose-400 hover:text-rose-300 font-semibold text-xs transition-all cursor-pointer">
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
          )}

          {tab === 'submissions' && (
            <div className="flex items-center gap-2 flex-wrap">
              {/* Export as CSV */}
              <button
                onClick={exportCSV}
                disabled={!submissions.length}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-900/40 text-slate-950 disabled:text-slate-600 font-bold text-xs shadow-md transition-all disabled:cursor-not-allowed cursor-pointer shine"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Export CSV
              </button>

              {/* Clear button — two-step confirm */}
              <button
                onClick={clearSubs}
                disabled={!submissions.length}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${
                  clearConfirm
                    ? 'bg-rose-600 hover:bg-rose-500 text-white border border-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.4)] animate-pulse'
                    : 'glass border border-white/[0.06] text-slate-400 hover:text-rose-400 hover:border-rose-500/30'
                }`}
                title={clearConfirm ? 'Click again to confirm clear' : 'Clear all logs'}
              >
                {clearConfirm ? (
                  <><AlertTriangle className="w-4 h-4" /> Confirm Clear!</>
                ) : (
                  <><Trash2 className="w-4 h-4" /> Clear Logs</>
                )}
              </button>
            </div>
          )}
        </div>

        {/* New set inline creator */}
        {isNewSet && (
          <form onSubmit={createSet} className="flex items-center gap-3 glass-elevated p-4 rounded-xl border border-cyan-500/30 animate-fadeIn">
            <span className="text-xs font-bold text-cyan-400 whitespace-nowrap">New Set Name:</span>
            <input value={newSetName} onChange={(e) => setNewSetName(e.target.value)} placeholder="e.g. Set E" autoFocus className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white font-code outline-none focus:border-cyan-500 w-40" />
            <button type="submit" className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer">Create</button>
            <button type="button" onClick={() => setIsNewSet(false)} className="px-3 py-1.5 glass border border-white/[0.08] text-slate-400 text-xs rounded-xl cursor-pointer">Cancel</button>
          </form>
        )}

        {/* ====== TAB: QUESTIONS CRUD ====== */}
        {tab === 'questions' && (
          <div className="space-y-7">
            {questionSets.map((setObj) => (
              <div key={setObj.set} className="glass-card rounded-2xl border border-white/[0.06] p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-black text-white">{setObj.set}</h3>
                    <span className="text-[11px] font-bold text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">
                      {setObj.questions.length} Qs
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openAdd(setObj.set)} className="flex items-center gap-1 text-xs font-semibold text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-1.5 rounded-lg border border-cyan-500/25 transition-all cursor-pointer">
                      <Plus className="w-3.5 h-3.5" /> Add Q
                    </button>
                    <button onClick={() => delSet(setObj.set)} className="p-1.5 text-slate-500 hover:text-rose-400 glass border border-white/[0.06] hover:border-rose-500/30 rounded-lg transition-all cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {setObj.questions.length === 0 ? (
                  <p className="text-xs text-slate-600 italic text-center py-6">No questions yet. Click "Add Q" to create one.</p>
                ) : (
                  <div className="space-y-4">
                    {setObj.questions.map((q, qi) => {
                      const qb = Q_BADGES[q.type] || Q_BADGES['Finding Error'];
                      const QIcon = qb.icon;
                      return (
                        <div key={q.id || qi} className="bg-slate-950/70 rounded-xl border border-slate-800/90 hover:border-slate-700 transition-all p-5 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${qb.cls}`}>
                              <QIcon className="w-3.5 h-3.5" />
                              Q{qi + 1} · {q.type}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => openEdit(setObj.set, q)} className="p-1.5 text-slate-500 hover:text-cyan-400 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-all cursor-pointer" title="Edit">
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => delQ(setObj.set, q.id)} className="p-1.5 text-slate-500 hover:text-rose-400 bg-slate-900 hover:bg-rose-950/40 rounded-lg border border-slate-800 transition-all cursor-pointer" title="Delete">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-slate-100 font-semibold leading-snug">{q.text}</p>
                          {q.code && <CodeBlock code={q.code} title={`q${qi + 1}.py`} />}
                          {q.answer && (
                            <div className="bg-amber-950/20 rounded-xl p-3.5 border border-amber-500/15 text-xs">
                              <span className="font-bold text-amber-400 block mb-1">Reference Key:</span>
                              <span className="font-code text-amber-200/85">{q.answer}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ====== TAB: SUBMISSIONS ====== */}
        {tab === 'submissions' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row items-center gap-4 glass-elevated p-4 rounded-xl border border-white/[0.06]">
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold text-slate-400">Set:</label>
                <select value={setFilter} onChange={(e) => setSetFilter(e.target.value)} className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-1.5 outline-none focus:border-cyan-500 font-code">
                  <option value="All">All Sets</option>
                  {questionSets.map((s) => <option key={s.set} value={s.set}>{s.set}</option>)}
                </select>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search participant..." className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-700 outline-none focus:border-cyan-500 font-code w-56" />
              </div>
            </div>

            {filteredSubs.length === 0 ? (
              <div className="glass-card rounded-2xl p-14 text-center text-slate-600 text-xs space-y-3 border border-white/[0.04]">
                <Users className="w-10 h-10 text-slate-800 mx-auto" />
                <p className="text-slate-500">No submissions recorded yet.</p>
                <p>Student responses will automatically appear here after quiz completion.</p>
              </div>
            ) : (
              <div className="glass-card rounded-2xl border border-white/[0.06] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950/90 text-slate-500 font-code text-[11px] uppercase tracking-wider border-b border-slate-800">
                      <tr>
                        {['Timestamp', 'Participant', 'Set', 'Lang', 'Q1', 'Q2', 'Q3', 'Total', 'Responses'].map((h) => (
                          <th key={h} className="px-4 py-3 font-bold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900">
                      {filteredSubs.map((sub, i) => (
                        <tr key={sub.id || i} className="hover:bg-slate-900/50 transition-colors">
                          <td className="px-4 py-3 font-code text-slate-600 text-[11px]">
                            {sub.timestamp ? new Date(sub.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-bold text-white">{sub.studentName || '—'}</div>
                            {sub.studentId && sub.studentId !== 'N/A' && <div className="text-[10px] text-cyan-400 font-code">{sub.studentId}</div>}
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded-lg bg-indigo-500/15 text-indigo-300 font-bold border border-indigo-500/25 font-code">{sub.set}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] uppercase font-code ${
                              (sub.language || 'python').toLowerCase() === 'python'
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : (sub.language || '').toLowerCase() === 'c'
                                ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                                : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            }`}>
                              {sub.language || 'python'}
                            </span>
                          </td>
                          {[0, 1, 2].map((qi) => (
                            <td key={qi} className="px-4 py-3 font-code text-slate-300">{fmt(sub.questionSeconds?.[qi])}</td>
                          ))}
                          <td className="px-4 py-3 font-code font-black text-cyan-400">{fmt(sub.overallSeconds)}</td>
                          <td className="px-4 py-3">
                            <details className="cursor-pointer">
                              <summary className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold">
                                View ({Object.keys(sub.answers || {}).length})
                              </summary>
                              <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 min-w-[200px]">
                                {Object.entries(sub.answers || {}).map(([qi, ans]) => (
                                  <div key={qi}>
                                    <span className="font-code font-bold text-slate-600 text-[10px]">Q{+qi + 1}:</span>
                                    <p className="font-code text-slate-300 bg-slate-900 px-2 py-1 rounded text-[11px] mt-0.5">{ans || <span className="text-slate-600 italic">blank</span>}</p>
                                  </div>
                                ))}
                              </div>
                            </details>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ====== ADD / EDIT QUESTION MODAL ====== */}
      {isQModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn" style={{ background: 'rgba(2,6,23,0.85)', backdropFilter: 'blur(20px)' }}>
          <div className="relative w-full max-w-2xl glass-elevated rounded-2xl border border-white/[0.09] shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent"></div>
            <button onClick={() => setIsQModal(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"><X className="w-5 h-5" /></button>

            <div className="p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center">
                  {editQ ? <Edit2 className="w-5 h-5 text-cyan-400" /> : <Plus className="w-5 h-5 text-cyan-400" />}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">{editQ ? 'Edit Question' : 'Add New Question'}</h3>
                  <p className="text-xs text-slate-500">Configure question, code block &amp; reference answer</p>
                </div>
              </div>

              <form onSubmit={saveQ} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5">Target Set</label>
                    <select value={qForm.targetSet} onChange={(e) => setQForm({ ...qForm, targetSet: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-code outline-none focus:border-cyan-500">
                      {questionSets.map((s) => <option key={s.set} value={s.set}>{s.set}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5">Question Type</label>
                    <select value={qForm.type} onChange={(e) => setQForm({ ...qForm, type: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-code outline-none focus:border-cyan-500">
                      <option>Finding Error</option>
                      <option>Numerical Output</option>
                      <option>Logical Reasoning</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">Question Prompt <span className="text-cyan-500">*</span></label>
                  <textarea rows={2} value={qForm.text} onChange={(e) => setQForm({ ...qForm, text: e.target.value })} placeholder="Identify the line number and error..." required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-cyan-500 resize-none" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">Python Code Block (optional)</label>
                  <textarea rows={5} value={qForm.code} onChange={(e) => setQForm({ ...qForm, code: e.target.value })} placeholder="Line 1: x = [10, 20]&#10;Line 2: print(x)" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-code text-cyan-200 outline-none focus:border-cyan-500 placeholder-slate-700 resize-none leading-relaxed" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">Reference Answer Key</label>
                  <textarea rows={2} value={qForm.answer} onChange={(e) => setQForm({ ...qForm, answer: e.target.value })} placeholder="Coordinator reference answer..." className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-code text-amber-200 outline-none focus:border-cyan-500 placeholder-slate-700 resize-none" />
                </div>

                <div className="flex justify-end gap-3 pt-2 border-t border-white/[0.05]">
                  <button type="button" onClick={() => setIsQModal(false)} className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white glass border border-white/[0.06] cursor-pointer">Cancel</button>
                  <button type="submit" className="flex items-center gap-1.5 px-6 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md cursor-pointer shine">
                    <Save className="w-4 h-4" /> Save Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
