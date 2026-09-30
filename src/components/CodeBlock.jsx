import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

// Minimal token-based syntax highlighter
const tokenize = (line) => {
  const KEYWORDS = new Set(['def', 'if', 'else', 'elif', 'for', 'while', 'in', 'return', 'not', 'and', 'or', 'is', 'True', 'False', 'None', 'import', 'from', 'as', 'class', 'pass', 'break', 'continue', 'lambda', 'with', 'try', 'except', 'finally', 'raise', 'del', 'global', 'assert']);
  const BUILTINS = new Set(['range', 'len', 'print', 'append', 'remove', 'count', 'sum', 'min', 'max', 'sorted', 'list', 'dict', 'set', 'tuple', 'int', 'str', 'float', 'bool', 'type', 'input', 'enumerate', 'zip', 'map', 'filter', 'abs', 'round', 'factorial']);

  const result = [];
  let i = 0;
  const s = line;

  while (i < s.length) {
    // String literals
    if (s[i] === '"' || s[i] === "'") {
      const q = s[i];
      let end = i + 1;
      while (end < s.length && s[end] !== q) end++;
      result.push({ type: 'string', val: s.slice(i, end + 1) });
      i = end + 1;
      continue;
    }
    // Numbers
    if (/\d/.test(s[i]) && (i === 0 || !/\w/.test(s[i - 1]))) {
      let end = i;
      while (end < s.length && /[\d.]/.test(s[end])) end++;
      result.push({ type: 'number', val: s.slice(i, end) });
      i = end;
      continue;
    }
    // Words (keywords / builtins / identifiers)
    if (/[a-zA-Z_]/.test(s[i])) {
      let end = i;
      while (end < s.length && /\w/.test(s[end])) end++;
      const word = s.slice(i, end);
      if (KEYWORDS.has(word)) result.push({ type: 'keyword', val: word });
      else if (BUILTINS.has(word)) result.push({ type: 'builtin', val: word });
      else result.push({ type: 'ident', val: word });
      i = end;
      continue;
    }
    // Operators
    if (/[=!<>+\-*/%&|^~]/.test(s[i])) {
      let end = i + 1;
      if (i + 1 < s.length && /[=<>]/.test(s[i + 1])) end++;
      result.push({ type: 'op', val: s.slice(i, end) });
      i = end;
      continue;
    }
    // Comments
    if (s[i] === '#') {
      result.push({ type: 'comment', val: s.slice(i) });
      break;
    }
    result.push({ type: 'other', val: s[i] });
    i++;
  }

  return result;
};

const TOKEN_COLORS = {
  keyword: 'text-pink-400 font-semibold',
  builtin: 'text-sky-400',
  string: 'text-emerald-300',
  number: 'text-amber-300',
  op: 'text-cyan-400 font-medium',
  comment: 'text-slate-500 italic',
  ident: 'text-slate-200',
  other: 'text-slate-300',
};

export default function CodeBlock({ code, title = 'snippet.py' }) {
  const [copied, setCopied] = useState(false);
  if (!code) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const lines = code.split('\n');

  const renderLine = (raw, lineIdx) => {
    // Check if line has "Line X:" prefix (tech arena format)
    const prefixMatch = raw.match(/^(Line \d+:\s*)(.*)/);
    const prefix = prefixMatch ? prefixMatch[1] : '';
    const content = prefixMatch ? prefixMatch[2] : raw;
    const tokens = tokenize(content);

    return (
      <div
        key={lineIdx}
        className="flex group/line hover:bg-white/[0.025] transition-colors rounded"
      >
        {/* Gutter line number */}
        <span className="select-none w-10 text-right pr-4 text-slate-700 font-code text-xs leading-7 shrink-0 group-hover/line:text-slate-500 transition-colors">
          {lineIdx + 1}
        </span>

        {/* Line content */}
        <div className="flex-1 whitespace-pre font-code text-[13px] leading-7 overflow-x-visible">
          {prefix && (
            <span className="text-indigo-400 font-bold mr-1 select-none">{prefix}</span>
          )}
          {tokens.map((tok, ti) => (
            <span key={ti} className={TOKEN_COLORS[tok.type] || 'text-slate-200'}>
              {tok.val}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="terminal-window my-4 group/terminal">
      {/* macOS-style header bar */}
      <div className="terminal-header">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(239,68,68,0.6)] hover:bg-rose-400 cursor-pointer transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)] hover:bg-amber-400 cursor-pointer transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)] hover:bg-emerald-400 cursor-pointer transition-colors"></div>
          </div>
          <span className="text-slate-400 text-xs font-medium flex items-center gap-1.5 ml-2 font-code">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            {title}
            <span className="cursor-blink text-cyan-400 ml-0.5 text-base leading-none">▋</span>
          </span>
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all font-medium ${
            copied
              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
              : 'bg-slate-800/60 text-slate-400 border-slate-700/50 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-800'
          }`}
        >
          {copied ? (
            <><Check className="w-3.5 h-3.5" /><span>Copied!</span></>
          ) : (
            <><Copy className="w-3.5 h-3.5" /><span>Copy</span></>
          )}
        </button>
      </div>

      {/* Code body */}
      <div className="terminal-body">
        {lines.map((line, idx) => renderLine(line, idx))}
        <div className="mt-2 flex items-center gap-1 text-xs text-slate-600 font-code">
          <span className="text-emerald-500">$</span>
          <span className="text-slate-600">python</span>
          <span className="text-slate-500">{title}</span>
          <span className="cursor-blink text-slate-600 ml-1">▋</span>
        </div>
      </div>
    </div>
  );
}
