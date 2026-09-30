import React, { useState } from 'react';
import { ShieldCheck, X, Key, User, AlertCircle, Eye, EyeOff, Lock, Cpu } from 'lucide-react';

export default function AdminModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate slight auth delay for premium feel
    await new Promise((r) => setTimeout(r, 600));
    
    const validUser = import.meta.env.VITE_ADMIN_USER || 'AISA@TA';
    const validPass = import.meta.env.VITE_ADMIN_PASS || 'AISA261';

    if (username.trim() === validUser && password === validPass) {
      setError('');
      setUsername(''); setPassword('');
      onLoginSuccess();
      onClose();
    } else {
      setError('Invalid coordinator credentials. Access denied.');
    }
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      style={{ background: 'rgba(2,6,23,0.85)', backdropFilter: 'blur(20px)' }}
    >
      <div className="relative w-full max-w-sm glass-elevated rounded-2xl border border-white/[0.09] shadow-2xl overflow-hidden">
        {/* Top gradient line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/70 to-transparent"></div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-7 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-600/20 border border-cyan-500/25 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">Coordinator Login</h3>
              <p className="text-xs text-slate-500">Access Admin Dashboard &amp; CRUD tools</p>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 bg-rose-950/50 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Username</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(''); }}
                  placeholder="Enter username"
                  autoComplete="username"
                  className="w-full bg-slate-950/90 border border-slate-800 focus:border-cyan-500 focus:shadow-[0_0_0_3px_rgba(6,182,212,0.1)] rounded-xl pl-10 pr-4 py-2.5 text-sm font-code text-slate-100 placeholder-slate-700 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="w-full bg-slate-950/90 border border-slate-800 focus:border-cyan-500 focus:shadow-[0_0_0_3px_rgba(6,182,212,0.1)] rounded-xl pl-10 pr-10 py-2.5 text-sm font-code text-slate-100 placeholder-slate-700 outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 transition-colors"
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide btn-primary text-white transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-80' : 'cursor-pointer'}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Authenticating...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Access Dashboard
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

