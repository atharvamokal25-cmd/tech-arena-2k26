import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingScreen from './components/LandingScreen';
import QuizWizard from './components/QuizWizard';
import SummaryScreen from './components/SummaryScreen';
import AdminModal from './components/AdminModal';
import AdminPanel from './components/AdminPanel';
import { DEFAULT_QUESTION_SETS } from './data/defaultQuestions';

export default function App() {
  // Navigation & Authentication state
  const [viewMode, setViewMode] = useState('landing'); // 'landing' | 'quiz' | 'summary' | 'admin'
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Participant details & selection
  const [studentInfo, setStudentInfo] = useState({ name: '', id: '' });
  const [selectedSet, setSelectedSet] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('python'); // 'python' | 'c' | 'java'

  // Question Sets & Submissions from LocalStorage
  const [questionSets, setQuestionSets] = useState(() => {
    try {
      const saved = localStorage.getItem('tech_arena_questions');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved questions', e);
    }
    return DEFAULT_QUESTION_SETS;
  });

  const [submissions, setSubmissions] = useState(() => {
    try {
      const saved = localStorage.getItem('tech_arena_submissions');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved submissions', e);
    }
    return [];
  });

  // Result state for summary screen
  const [quizResult, setQuizResult] = useState(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('tech_arena_questions', JSON.stringify(questionSets));
  }, [questionSets]);

  useEffect(() => {
    localStorage.setItem('tech_arena_submissions', JSON.stringify(submissions));
  }, [submissions]);

  // Handlers
  const handleStartQuiz = () => {
    if (!selectedSet) return;
    setViewMode('quiz');
  };

  const handleCompleteQuiz = (resultData) => {
    // Record submission into log list
    const newSubmission = {
      id: `sub_${Date.now()}`,
      timestamp: new Date().toISOString(),
      studentName: studentInfo.name || 'Anonymous Student',
      studentId: studentInfo.id || 'N/A',
      set: resultData.set,
      language: resultData.language || selectedLanguage || 'python',
      overallSeconds: resultData.overallSeconds,
      questionSeconds: resultData.questionSeconds,
      answers: resultData.answers
    };

    setSubmissions((prev) => [newSubmission, ...prev]);
    setQuizResult(resultData);
    setViewMode('summary');
  };

  const handleResetToHome = () => {
    setSelectedSet('');
    setQuizResult(null);
    setViewMode('landing');
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all question sets to pre-populated default prompt data?')) {
      setQuestionSets(DEFAULT_QUESTION_SETS);
      localStorage.removeItem('tech_arena_questions');
    }
  };

  const activeSetData = questionSets.find((s) => s.set === selectedSet);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-['Outfit',sans-serif]">
      {/* Navbar */}
      <Navbar
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        isAdmin={isAdmin}
        onLogoutAdmin={() => {
          setIsAdmin(false);
          if (viewMode === 'admin') setViewMode('landing');
        }}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {viewMode === 'landing' && (
          <LandingScreen
            questionSets={questionSets}
            selectedSet={selectedSet}
            setSelectedSet={setSelectedSet}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            onStartQuiz={handleStartQuiz}
            studentInfo={studentInfo}
            setStudentInfo={setStudentInfo}
          />
        )}

        {viewMode === 'quiz' && activeSetData && (
          <QuizWizard
            setData={activeSetData}
            language={selectedLanguage}
            onCompleteQuiz={handleCompleteQuiz}
          />
        )}

        {viewMode === 'summary' && quizResult && (
          <SummaryScreen
            resultData={quizResult}
            studentInfo={studentInfo}
            onResetToHome={handleResetToHome}
          />
        )}

        {viewMode === 'admin' && isAdmin && (
          <AdminPanel
            questionSets={questionSets}
            setQuestionSets={setQuestionSets}
            submissions={submissions}
            setSubmissions={setSubmissions}
            onResetDefaults={handleResetDefaults}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Tech Arena Competition. All Rights Reserved. Prepared for AISA Coordinator Verification.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="hover:text-cyan-400 cursor-pointer transition-colors bg-transparent border-0 p-0 text-xs text-slate-500 hover:text-slate-300"
            >
              Coordinator Portal
            </button>
          </div>
        </div>
      </footer>

      {/* Admin Credentials Login Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onLoginSuccess={() => {
          setIsAdmin(true);
          setViewMode('admin');
        }}
      />
    </div>
  );
}
