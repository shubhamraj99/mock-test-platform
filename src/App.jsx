// ==========================================
// 1. IMPORTS & UTILITIES
// ==========================================
import React, { useState, useEffect, useCallback } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { questions as defaultQuestions } from './questions'; 
import './app.css';

/**
 * Utility Function: True Fisher-Yates Array Shuffle
 * Ensures a perfectly randomized, mathematically unbiased question order.
 */
const trueShuffle = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// ==========================================
// 2. CONSTANTS & CONFIGURATION
// ==========================================
const PIE_COLORS = ['#10b981', '#f43f5e']; 
const BAR_COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b'];

// ==========================================
// 3. MAIN APP COMPONENT
// ==========================================
function App() {
  
  // ------------------------------------------
  // SECTION A: STATE MANAGEMENT
  // ------------------------------------------

  // A1. Authentication & Routing States
  const [activeTab, setActiveTab] = useState('student'); 
  const [isRegistering, setIsRegistering] = useState(false);
  const [userRole, setUserRole] = useState(null); 
  
  // A2. Simulated Database States (LocalStorage)
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('examiner_users');
    return saved ? JSON.parse(saved) : [];
  });
  const [customQuestions, setCustomQuestions] = useState(() => {
    const saved = localStorage.getItem('examiner_custom_questions');
    return saved ? JSON.parse(saved) : [];
  });

  // A3. Form Input States
  const [regName, setRegName] = useState('');
  const [regRollNumber, setRegRollNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [facultyPin, setFacultyPin] = useState('');

  // A4. Faculty Question Builder States
  const [newQuestion, setNewQuestion] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('A');
  const [category, setCategory] = useState('Aptitude');

  // A5. Student Test Environment States
  const [instructionsAccepted, setInstructionsAccepted] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState([]); 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [markedForReview, setMarkedForReview] = useState([]);
  const [timer, setTimer] = useState(600); // 10 minutes
  
  // A6. UI Transitions & Analytics States
  const [transitionCategory, setTransitionCategory] = useState(null);
  const [showReviewScreen, setShowReviewScreen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [sectionResults, setSectionResults] = useState(null); 


  // ------------------------------------------
  // SECTION B: FACULTY BUSINESS LOGIC
  // ------------------------------------------

  const handleFacultyLogin = (e) => {
    e.preventDefault();
    if (facultyPin === '778899') setUserRole('faculty');
    else alert("Invalid Faculty PIN.");
  };

  const handleFacultyLogout = () => {
    setUserRole(null);
    setFacultyPin('');
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    let answerText = '';
    if (correctAnswer === 'A') answerText = optA;
    if (correctAnswer === 'B') answerText = optB;
    if (correctAnswer === 'C') answerText = optC;
    if (correctAnswer === 'D') answerText = optD;

    const questionObj = { category, question: newQuestion, options: [optA, optB, optC, optD], answer: answerText };
    const updatedQuestions = [...customQuestions, questionObj];
    setCustomQuestions(updatedQuestions);
    localStorage.setItem('examiner_custom_questions', JSON.stringify(updatedQuestions));

    alert("Question added successfully to the test pool!");
    setNewQuestion(''); setOptA(''); setOptB(''); setOptC(''); setOptD('');
  };


  // ------------------------------------------
  // SECTION C: STUDENT AUTHENTICATION LOGIC
  // ------------------------------------------

  const handleRegister = (e) => {
    e.preventDefault();
    const nameParts = regName.trim().split(/\s+/);
    if (nameParts.length !== 2) return alert("Please enter exactly First and Last Name.");
    if (!/^\d{5}$/.test(regRollNumber.trim())) return alert("Roll Number must be exactly 5 digits.");

    if (registeredUsers.some(user => user.rollNumber === regRollNumber.trim())) {
      return alert("An account with this Roll Number already exists. Please log in.");
    }

    const updatedUsers = [...registeredUsers, { name: regName.trim(), rollNumber: regRollNumber.trim() }];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('examiner_users', JSON.stringify(updatedUsers));
    
    alert("Registration Successful! You can now log in.");
    setIsRegistering(false);
    setRegName(''); setRegRollNumber('');
  };

  const handleStudentLogin = (e) => {
    e.preventDefault();
    const foundUser = registeredUsers.find(
      user => user.rollNumber === rollNumber.trim() && user.name.toLowerCase() === studentName.trim().toLowerCase()
    );

    if (!foundUser) return alert("Account not found. Please Register first.");

    // Dynamic Test Generation: Merge default and custom questions
    const allQuestions = [...defaultQuestions, ...customQuestions];
    const groupedQuestions = {};
    allQuestions.forEach(q => {
      if (!groupedQuestions[q.category]) groupedQuestions[q.category] = [];
      groupedQuestions[q.category].push(q);
    });

    // Smart Randomizer: Pick 4 questions per category
    let smartSelected20 = [];
    Object.keys(groupedQuestions).forEach(cat => {
      const shuffledCategory = trueShuffle(groupedQuestions[cat]); 
      smartSelected20 = [...smartSelected20, ...shuffledCategory.slice(0, 4)];
    });

    setSessionQuestions(smartSelected20);
    setUserAnswers(new Array(smartSelected20.length).fill(null));
    setMarkedForReview(new Array(smartSelected20.length).fill(false));
    setUserRole('student');
  };


  // ------------------------------------------
  // SECTION D: CORE EXAM ENGINE LOGIC
  // ------------------------------------------

  // Triggers the proctored full-screen environment
  const handleStartAssessment = () => {
    if (hasAgreed) {
      setInstructionsAccepted(true);
      const elem = document.documentElement;
      if (elem.requestFullscreen) elem.requestFullscreen();
      else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
      else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    }
  };

  // Calculates final score and generates detailed section-by-section analytics
  const calculateScoreAndSubmit = useCallback(() => {
    let finalScore = 0;
    const categoryStats = {};

    sessionQuestions.forEach((q, index) => {
      const cat = q.category;
      if (!categoryStats[cat]) categoryStats[cat] = { total: 0, correct: 0 };
      categoryStats[cat].total += 1;
      if (userAnswers[index] === q.answer) {
        finalScore += 1;
        categoryStats[cat].correct += 1;
      }
    });

    const breakdown = Object.keys(categoryStats).map(cat => {
      const total = categoryStats[cat].total;
      const correct = categoryStats[cat].correct;
      const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);
      return { category: cat, correct, total, percentage };
    });

    setScore(finalScore);
    setSectionResults(breakdown);
    setShowReviewScreen(false); 
    setShowResults(true);
  }, [userAnswers, sessionQuestions]);

  // Anti-Cheat Protocol: Monitors if student exits full-screen mode
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement && userRole === 'student' && instructionsAccepted && !showResults) {
        alert("SECURITY WARNING: You exited full-screen mode. Your test has been automatically submitted.");
        calculateScoreAndSubmit();
      }
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, [userRole, instructionsAccepted, showResults, calculateScoreAndSubmit]);

  // Global Assessment Countdown Timer
  useEffect(() => {
    if (userRole === 'student' && instructionsAccepted && timer > 0 && !showResults && !transitionCategory && !showReviewScreen) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !showResults && userRole === 'student') {
      calculateScoreAndSubmit(); 
    }
  }, [timer, showResults, userRole, instructionsAccepted, transitionCategory, showReviewScreen, calculateScoreAndSubmit]);


  // ------------------------------------------
  // SECTION E: QUESTION NAVIGATION LOGIC
  // ------------------------------------------

  const handleClearResponse = () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = null;
    setUserAnswers(updatedAnswers);
  };

  const toggleMarkForReview = () => {
    const updatedMarks = [...markedForReview];
    updatedMarks[currentQuestion] = !updatedMarks[currentQuestion];
    setMarkedForReview(updatedMarks);
  };

  // Real-time tracking for the Review Dashboard
  const answeredCount = userAnswers ? userAnswers.filter(ans => ans !== null).length : 0;
  const unansweredCount = sessionQuestions.length - answeredCount;
  const reviewCount = markedForReview ? markedForReview.filter(marked => marked === true).length : 0;


  // ==========================================
  // 4. RENDERER DIRECTORY
  // ==========================================

  // --- RENDER VIEW 1: FACULTY DASHBOARD ---
  if (userRole === 'faculty') {
    return (
      <div className="app-container">
        <div className="faculty-dashboard">
          
          {/* Header */}
          <div className="faculty-header">
            <h2>Faculty Portal</h2>
            <button onClick={handleFacultyLogout} className="clear-btn">Secure Logout</button>
          </div>
          
          {/* Database Statistics */}
          <div className="stats-banner">
            <p>Total Questions in Master Pool: <strong>{defaultQuestions.length + customQuestions.length}</strong></p>
            <p>Custom Questions Added by Faculty: <strong>{customQuestions.length}</strong></p>
          </div>
          
          {/* Add Question Form */}
          <h3>Add a New Question</h3>
          <form onSubmit={handleAddQuestion} className="faculty-form">
            <div className="input-group">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="Aptitude">Aptitude</option>
                <option value="DSA">DSA</option>
                <option value="Frontend">Frontend</option>
                <option value="Programming">Programming</option>
                <option value="Fundamentals">Fundamentals</option>
              </select>
            </div>
            <div className="input-group">
              <label>Question Text</label>
              <textarea placeholder="Type the question here..." value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} required />
            </div>
            <div className="options-grid">
              <div className="input-group"><label>Option A</label><input type="text" value={optA} onChange={(e) => setOptA(e.target.value)} required /></div>
              <div className="input-group"><label>Option B</label><input type="text" value={optB} onChange={(e) => setOptB(e.target.value)} required /></div>
              <div className="input-group"><label>Option C</label><input type="text" value={optC} onChange={(e) => setOptC(e.target.value)} required /></div>
              <div className="input-group"><label>Option D</label><input type="text" value={optD} onChange={(e) => setOptD(e.target.value)} required /></div>
            </div>
            <div className="input-group">
              <label>Correct Answer</label>
              <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} required>
                <option value="A">Option A</option>
                <option value="B">Option B</option>
                <option value="C">Option C</option>
                <option value="D">Option D</option>
              </select>
            </div>
            <button type="submit" className="start-test-btn">Save Question to Database</button>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDER VIEW 2: AUTHENTICATION PORTALS ---
  if (!userRole) {
    return (
      <div className="app-container">
        <div className="login-card">
          
          {/* Logo & Tab Switcher */}
          <div className="login-header">
            <h1 className="brand-logo">The Examiner</h1>
            <p>Select your portal to continue</p>
          </div>
          <div className="role-tabs">
            <button className={activeTab === 'student' ? 'active' : ''} onClick={() => { setActiveTab('student'); setIsRegistering(false); }}>Student Portal</button>
            <button className={activeTab === 'faculty' ? 'active' : ''} onClick={() => setActiveTab('faculty')}>Faculty Portal</button>
          </div>

          {/* Conditional Forms based on selected Tab */}
          {activeTab === 'faculty' ? (
             <form onSubmit={handleFacultyLogin} className="login-form">
               <div className="input-group"><label>Admin Access PIN</label><input type="password" placeholder="Enter secure PIN..." value={facultyPin} onChange={(e) => setFacultyPin(e.target.value)} required/></div>
               <button type="submit" className="start-test-btn" style={{marginTop: "10px", backgroundColor: "var(--warning)"}}>Enter Faculty Dashboard</button>
             </form>
          ) : isRegistering ? (
             <form onSubmit={handleRegister} className="login-form">
                <div className="input-group"><label>Full Name</label><input type="text" placeholder="e.g. Shubham Raj" value={regName} onChange={(e) => setRegName(e.target.value)} required/></div>
                <div className="input-group"><label>Create Roll Number (5 Digits)</label><input type="text" placeholder="e.g. 12345" value={regRollNumber} onChange={(e) => setRegRollNumber(e.target.value)} required/></div>
                <button type="submit" className="start-test-btn" style={{marginTop: "10px", backgroundColor: "var(--success)"}}>Create Account</button>
                <div className="auth-toggle">Already registered? <span onClick={() => setIsRegistering(false)}>Log in here</span></div>
             </form>
          ) : (
            <form onSubmit={handleStudentLogin} className="login-form">
              <div className="input-group"><label>Full Name</label><input type="text" placeholder="e.g. Shubham Raj" value={studentName} onChange={(e) => setStudentName(e.target.value)} required/></div>
              <div className="input-group"><label>Roll Number</label><input type="text" placeholder="e.g. 12345" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} required/></div>
              <button type="submit" className="start-test-btn" style={{marginTop: "10px"}}>Log In to Assessment</button>
              <div className="auth-toggle">Don't have an account? <span onClick={() => setIsRegistering(true)}>Register here</span></div>
            </form>
          )}
        </div>
      </div>
    );
  }
  
  // --- RENDER VIEW 3: PRE-EXAM INSTRUCTIONS ---
  if (!instructionsAccepted) {
    return (
      <div className="app-container">
        <div className="instructions-card">
          <h2>General Instructions</h2>
          <p className="welcome-text">Welcome, <strong>{studentName}</strong>. Please read the instructions carefully before beginning.</p>
          <div className="instructions-content">
            <ul className="instructions-list">
              <li><strong>Duration:</strong> The total duration of the examination is 10 minutes.</li>
              <li><strong>Sections:</strong> You will be given 20 random questions across 5 technical categories.</li>
              <li><strong>Scoring:</strong> Each correct answer carries 1 mark. There is no negative marking.</li>
              <li><strong>Status Colors:</strong> 
                <span className="dot gray"></span> Unanswered &nbsp;
                <span className="dot green"></span> Answered &nbsp;
                <span className="dot orange"></span> Marked for Review
              </li>
            </ul>
            <div className="security-warning">
              <strong>⚠️ SECURITY WARNING:</strong> This is a proctored environment. Once you start the test, your browser will enter Full-Screen mode. <strong>Do not press the ESC key or exit full-screen.</strong> Doing so will automatically and instantly submit your test without warning!
            </div>
            <label className="agreement-section">
              <input type="checkbox" checked={hasAgreed} onChange={() => setHasAgreed(!hasAgreed)} /> 
              I have read and understood the instructions and agree to adhere to the security protocols.
            </label>
          </div>
          <button className="start-test-btn" onClick={handleStartAssessment} disabled={!hasAgreed} style={{ opacity: hasAgreed ? 1 : 0.5 }}>Start Assessment</button>
        </div>
      </div>
    );
  }

  // --- RENDER VIEW 4: FINAL RESULTS & ANALYTICS DASHBOARD ---
  if (showResults) {
    const pieData = [
      { name: 'Correct', value: score },
      { name: 'Incorrect', value: sessionQuestions.length - score }
    ];

    return (
      <div className="app-container">
        <div className="white-results-card">
          
          {/* Header Info */}
          <div className="results-header">
            <h1>Assessment Complete</h1>
            <p className="student-greeting">Candidate: <strong>{studentName}</strong> | ID: <strong>{rollNumber}</strong></p>
          </div>
          
          {/* Main Visual Data Visualizations */}
          <div className="charts-grid">
            
            {/* Donut Chart Component */}
            <div className="chart-box">
              <h3>Overall Accuracy</h3>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={pieData} innerRadius={65} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}/>
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
                <div className="pie-center-text" style={{top: '42%'}}>
                  <span className="big-score">{score}</span>
                  <span className="small-total">/ {sessionQuestions.length}</span>
                </div>
              </div>
            </div>

            {/* Horizontal Bar Chart Component */}
            <div className="chart-box">
              <h3>Performance by Category</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={sectionResults} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                  <XAxis type="number" hide={true} />
                  <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#475569', fontWeight: 600 }} width={100} />
                  <Tooltip cursor={{fill: 'rgba(99,102,241,0.05)'}} contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}/>
                  <Bar dataKey="percentage" radius={[0, 6, 6, 0]} barSize={22} background={{ fill: '#f1f5f9', radius: [0, 6, 6, 0] }}>
                    {sectionResults.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detailed Text Breakdown Cards */}
          <div className="section-breakdown" style={{marginTop: '20px'}}>
            <h3>Detailed Feedback</h3>
            <div className="breakdown-grid">
              {sectionResults && sectionResults.map((sec, idx) => (
                <div key={idx} className="breakdown-card">
                  <h4>{sec.category}</h4>
                  <div className="breakdown-stats">
                    <span className="marks">{sec.correct} / {sec.total} pts</span>
                    <span className={`percent ${sec.percentage >= 70 ? 'good' : sec.percentage >= 40 ? 'avg' : 'poor'}`}>{sec.percentage}%</span>
                  </div>
                  <div className="mini-bar-bg">
                    <div className={`mini-bar-fill ${sec.percentage >= 70 ? 'bg-good' : sec.percentage >= 40 ? 'bg-avg' : 'bg-poor'}`} style={{width: `${sec.percentage}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="restart-btn" onClick={() => window.location.reload()} style={{marginTop: '20px'}}>Exit Portal & Restart</button>
        </div>
      </div>
    );
  }

  // --- RENDER VIEW 5: SUMMARY & REVIEW DASHBOARD ---
  if (showReviewScreen) {
    return (
      <div className="app-container">
        <div className="review-dashboard">
          <h2>Exam Summary</h2>
          <div className="summary-grid">
            <div className="summary-box total"><h3>{sessionQuestions.length}</h3><span>Total Questions</span></div>
            <div className="summary-box answered"><h3>{answeredCount}</h3><span>Answered</span></div>
            <div className="summary-box unanswered"><h3>{unansweredCount}</h3><span>Not Answered</span></div>
            <div className="summary-box marked"><h3>{reviewCount}</h3><span>Marked for Review</span></div>
          </div>
          <div className="review-actions">
            <button className="back-btn" onClick={() => setShowReviewScreen(false)}>Back to Assessment</button>
            <button className="final-submit-btn" onClick={calculateScoreAndSubmit}>Confirm & Submit Test</button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER VIEW 6: CATEGORY TRANSITION SCREEN ---
  if (transitionCategory) {
    return (
      <div className="app-container">
        <div className="transition-card">
          <h2>Section Completed!</h2>
          <h1>Next Up: <span>{transitionCategory}</span></h1>
          <button onClick={() => { setCurrentQuestion(currentQuestion + 1); setTransitionCategory(null); }} className="start-test-btn" style={{marginTop: "30px"}}>Start {transitionCategory} Section</button>
        </div>
      </div>
    );
  }

  // --- RENDER VIEW 7: THE MAIN ASSESSMENT UI ---
  return (
    <div className="app-container">
      <div className="quiz-card">
        
        {/* Top Information Bar */}
        <div className="quiz-header">
          <span className="category-tag">{sessionQuestions[currentQuestion]?.category}</span>
          <div className="timer-box">Time Left: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</div>
        </div>
        
        {/* Question Numbers Palette Grid */}
        <div className="question-palette">
          {sessionQuestions.map((_, index) => {
            let statusClass = "unanswered";
            if (markedForReview[index]) statusClass = "marked";
            else if (userAnswers[index]) statusClass = "answered";
            return (
              <button key={index} className={`palette-btn ${statusClass} ${currentQuestion === index ? 'active-question' : ''}`} onClick={() => setCurrentQuestion(index)} title={`Go to Question ${index + 1}`}>
                {index + 1}
              </button>
            );
          })}
        </div>
        
        {/* Current Question and Options */}
        <div className="progress-bar">Question {currentQuestion + 1} of {sessionQuestions.length}</div>
        <div className="question-section"><h2>{sessionQuestions[currentQuestion]?.question}</h2></div>
        
        <div className="options-section">
          {sessionQuestions[currentQuestion]?.options.map((option, index) => {
            const isSelected = userAnswers[currentQuestion] === option; 
            return (
              <button key={index} className={`option-button ${isSelected ? 'selected' : ''}`} onClick={() => {
                const updatedAnswers = [...userAnswers];
                updatedAnswers[currentQuestion] = option;
                setUserAnswers(updatedAnswers);
              }}>
                <span className="option-letter">{String.fromCharCode(65 + index)}.</span>
                <span className="option-text">{option}</span>
              </button>
            );
          })}
        </div>
        
        {/* Assessment Navigation Buttons */}
        <div className="action-footer">
          <button className="prev-btn" onClick={() => setCurrentQuestion(currentQuestion - 1)} disabled={currentQuestion === 0}>Previous</button>
          
          <div className="center-actions">
            <label className="mark-review-toggle">
              <input type="checkbox" checked={markedForReview[currentQuestion] || false} onChange={toggleMarkForReview} />
              <span className="checkmark"></span>Mark for Review
            </label>
            <button className="clear-btn" onClick={handleClearResponse} disabled={!userAnswers[currentQuestion]}>Clear Response</button>
          </div>
          
          {currentQuestion === sessionQuestions.length - 1 ? (
            <button className="submit-btn" onClick={() => setShowReviewScreen(true)}>Review & Submit</button>
          ) : (
            <button className="next-btn" onClick={() => {
              const currentCat = sessionQuestions[currentQuestion].category;
              const nextCat = sessionQuestions[currentQuestion + 1].category;
              if (currentCat !== nextCat) setTransitionCategory(nextCat);
              else setCurrentQuestion(currentQuestion + 1);
            }}>Next Question</button>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
