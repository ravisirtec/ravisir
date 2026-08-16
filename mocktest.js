const subjects = [
  { name: "English", icon: "📚", questions: 100, color: "#2563eb", description: "Poetry, prose, grammar and writing practice" },
  { name: "Hindi", icon: "📝", questions: 100, color: "#14b8a6", description: "Language comprehension and literature" },
  { name: "Physics", icon: "⚛️", questions: 100, color: "#f59e0b", description: "Theory and numerical practice" },
  { name: "Chemistry", icon: "🧪", questions: 100, color: "#ef4444", description: "Conceptual and application-based questions" },
  { name: "Mathematics", icon: "📐", questions: 100, color: "#7c3aed", description: "Short-answer and objective practice" },
  { name: "Biology", icon: "🧬", questions: 100, color: "#0f766e", description: "Cell, genetics, ecology and human physiology" }
];

const baseBanks = {
  English: [
    { question: "Which of the following is a correct sentence?", options: ["She go to school", "She goes to school", "She going school", "She gone school"], answer: 1, explanation: "Use the present simple form 'goes' for third person singular." },
    { question: "The poem 'Sweetest Love I Do Not Goe' is written by", options: ["John Donne", "Walt Whitman", "R. K. Narayan", "A. P. J. Abdul Kalam"], answer: 0, explanation: "John Donne wrote the poem." },
    { question: "A metaphor compares two things", options: ["with 'like' or 'as'", "directly without 'like' or 'as'", "only in poems", "only in drama"], answer: 1, explanation: "A metaphor makes a direct comparison." },
    { question: "The primary purpose of a formal letter is to", options: ["entertain", "persuade or inform", "describe weather", "write a story"], answer: 1, explanation: "Formal letters communicate information or requests." },
    { question: "Select the correct spelling.", options: ["Recieve", "Receive", "Receeve", "Recieive"], answer: 1, explanation: "The correct spelling is receive." }
  ],
  Hindi: [
    { question: "'वचन' किसका अध्ययन है?", options: ["शब्द का", "वाक्य का", "वर्ण का", "उच्चारण का"], answer: 0, explanation: "वचन शब्दों के एकवचन-बहुवचन का ज्ञान देता है।" },
    { question: "'सुमन' शब्द का अर्थ है", options: ["पर्वत", "पुष्प", "पहाड़", "सागर"], answer: 1, explanation: "सुमन का अर्थ फूल या प्रसन्नता है।" },
    { question: "'अमृत' का विलोम है", options: ["जीवन", "मृत", "मधुर", "स्वर्ण"], answer: 1, explanation: "अमृत का विलोम मृत है।" },
    { question: "कविता में भावों को व्यक्त करने वाला प्रमुख तत्व है", options: ["शब्द", "अर्थ", "भाव", "वर्ण"], answer: 2, explanation: "भाव कविता का केंद्रीय तत्व है।" },
    { question: "'कानन' किसका synonym है?", options: ["वन", "नदी", "पर्वत", "आकाश"], answer: 0, explanation: "कानन = वन।" }
  ],
  Physics: [
    { question: "SI unit of force is", options: ["Joule", "Watt", "Newton", "Pascal"], answer: 2, explanation: "Force is measured in newton." },
    { question: "Speed is defined as", options: ["distance / time", "time / distance", "mass / volume", "force / mass"], answer: 0, explanation: "Speed = distance divided by time." },
    { question: "The acceleration due to gravity on Earth is approximately", options: ["8.9 m/s²", "9.8 m/s²", "12.5 m/s²", "15 m/s²"], answer: 1, explanation: "g is approximately 9.8 m/s²." },
    { question: "Ohm's law relates", options: ["current and voltage", "power and energy", "mass and force", "charge and capacitance"], answer: 0, explanation: "V = IR." },
    { question: "The unit of electric current is", options: ["volt", "ampere", "ohm", "coulomb"], answer: 1, explanation: "Ampere is the SI unit for current." }
  ],
  Chemistry: [
    { question: "The symbol of sodium is", options: ["S", "Na", "So", "N"], answer: 1, explanation: "Sodium is Na." },
    { question: "Acids turn blue litmus", options: ["green", "red", "orange", "purple"], answer: 1, explanation: "Acids turn blue litmus red." },
    { question: "The pH of a neutral solution is", options: ["0", "7", "10", "14"], answer: 1, explanation: "Neutral pH is 7." },
    { question: "Which gas is released when acids react with metals?", options: ["Oxygen", "Hydrogen", "Carbon dioxide", "Nitrogen"], answer: 1, explanation: "Metals react with acids to release hydrogen." },
    { question: "The atomic number of carbon is", options: ["6", "8", "10", "12"], answer: 0, explanation: "Carbon has atomic number 6." }
  ],
  Mathematics: [
    { question: "The value of 5² is", options: ["10", "15", "20", "25"], answer: 3, explanation: "5 squared is 25." },
    { question: "The sum of angles in a triangle is", options: ["90°", "180°", "270°", "360°"], answer: 1, explanation: "Triangle angles sum to 180°." },
    { question: "The perimeter of a rectangle is", options: ["length × breadth", "2(length + breadth)", "length + breadth", "length ÷ breadth"], answer: 1, explanation: "Perimeter uses twice the sum of length and breadth." },
    { question: "The value of π is approximately", options: ["2.14", "3.14", "4.14", "5.14"], answer: 1, explanation: "Pi is approximately 3.14." },
    { question: "A right angle measures", options: ["45°", "60°", "90°", "120°"], answer: 2, explanation: "A right angle is 90°." }
  ],
  Biology: [
    { question: "The basic unit of life is", options: ["Atom", "Cell", "Tissue", "Organ"], answer: 1, explanation: "Cells are the basic units of life." },
    { question: "Photosynthesis occurs mainly in", options: ["Roots", "Leaves", "Flowers", "Stem"], answer: 1, explanation: "Leaves contain chlorophyll for photosynthesis." },
    { question: "DNA is present in the", options: ["Cytoplasm", "Nucleus", "Cell wall", "Ribosome"], answer: 1, explanation: "DNA is stored in the nucleus of eukaryotic cells." },
    { question: "The human heart has how many chambers?", options: ["2", "3", "4", "5"], answer: 2, explanation: "The human heart has four chambers." },
    { question: "Which part of a plant absorbs water?", options: ["Leaf", "Stem", "Root", "Flower"], answer: 2, explanation: "Roots absorb water from the soil." }
  ]
};

const state = {
  activeView: "home",
  selectedSubject: null,
  questions: [],
  currentIndex: 0,
  answers: [],
  reviewFlags: [],
  timeLeft: 60 * 60,
  timer: null,
  studentName: localStorage.getItem("bseb-student-name") || "Student",
  authMode: "login"
};

const subjectGrid = document.getElementById("subjectGrid");
const dashboardStats = document.getElementById("dashboardStats");
const recentTests = document.getElementById("recentTests");
const questionText = document.getElementById("questionText");
const optionsList = document.getElementById("optionsList");
const paletteList = document.getElementById("paletteList");
const questionCounter = document.getElementById("questionCounter");
const progressLabel = document.getElementById("progressLabel");
const timerDisplay = document.getElementById("timerDisplay");
const resultContent = document.getElementById("resultContent");
const authModal = document.getElementById("authModal");
const toast = document.getElementById("toast");
const welcomeMessage = document.getElementById("welcomeMessage");
const authBtn = document.getElementById("authBtn");
const testSubjectLabel = document.getElementById("testSubjectLabel");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

function showView(viewName) {
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === viewName));
  document.querySelectorAll(".nav-links button[data-view]").forEach((btn) => btn.classList.toggle("active", btn.dataset.view === viewName));
  state.activeView = viewName;
  const topbar = document.querySelector('.topbar');
  const navToggle = document.querySelector('.nav-toggle');
  if (topbar?.classList.contains('nav-open')) {
    topbar.classList.remove('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }
  if (viewName === "dashboard") renderDashboard();
  if (viewName === "home") renderSubjects();
}

function renderSubjects() {
  subjectGrid.innerHTML = subjects.map((subject) => `
    <article class="subject-card">
      <div class="subject-icon" style="background: ${subject.color}18; color: ${subject.color};">${subject.icon}</div>
      <h3>${subject.name}</h3>
      <p>${subject.description}</p>
      <div class="meta"><span>${subject.questions} Questions</span><button class="btn btn-primary" onclick="startTest('${subject.name}')">Start</button></div>
    </article>
  `).join("");
}

function buildQuestionBank(subjectName, count = 100) {
  const bank = baseBanks[subjectName] || baseBanks.English;
  return Array.from({ length: count }, (_, index) => ({
    ...bank[index % bank.length],
    id: index + 1,
    question: `${bank[index % bank.length].question} (${index + 1})`
  }));
}

function startTest(subjectName) {
  // Redirect to English test series page if English is selected
  if (subjectName === "English") {
    window.location.href = "english-test-series.html";
    return;
  }

  state.selectedSubject = subjectName;
  state.questions = buildQuestionBank(subjectName, 100);
  state.answers = Array(100).fill(null);
  state.reviewFlags = Array(100).fill(false);
  state.currentIndex = 0;
  state.timeLeft = 60 * 60;
  testSubjectLabel.textContent = `${subjectName} Mock Test`;
  showView("test");
  renderQuestion();
  startTimer();
}

function renderQuestion() {
  const q = state.questions[state.currentIndex];
  questionCounter.textContent = `Question ${state.currentIndex + 1} / ${state.questions.length}`;
  questionText.textContent = q.question;
  optionsList.innerHTML = q.options.map((option, index) => `
    <button class="option-btn ${state.answers[state.currentIndex] === index ? "selected" : ""}" onclick="answerQuestion(${index})">${String.fromCharCode(65 + index)}. ${option}</button>
  `).join("");
  progressLabel.textContent = `${state.answers.filter(Boolean).length} answered`;
  renderPalette();
}

function renderPalette() {
  paletteList.innerHTML = state.questions.map((_, index) => {
    const isCurrent = index === state.currentIndex;
    const answered = state.answers[index] !== null;
    const review = state.reviewFlags[index];
    const statusClass = answered && review ? "answered review" : answered ? "answered" : review ? "review" : "";
    return `<button class="${statusClass} ${isCurrent ? "current" : ""}" onclick="jumpToQuestion(${index})">${index + 1}</button>`;
  }).join("");
}

function answerQuestion(optionIndex) {
  state.answers[state.currentIndex] = optionIndex;
  renderQuestion();
  saveProgress();
}

function jumpToQuestion(index) {
  state.currentIndex = index;
  renderQuestion();
}

function clearResponse() {
  state.answers[state.currentIndex] = null;
  renderQuestion();
  saveProgress();
}

function toggleReview() {
  state.reviewFlags[state.currentIndex] = !state.reviewFlags[state.currentIndex];
  renderQuestion();
  saveProgress();
}

function startTimer() {
  clearInterval(state.timer);
  state.timer = setInterval(() => {
    state.timeLeft -= 1;
    updateTimer();
    if (state.timeLeft <= 0) {
      clearInterval(state.timer);
      finishTest();
    }
  }, 1000);
}

function updateTimer() {
  const h = String(Math.floor(state.timeLeft / 3600)).padStart(2, "0");
  const m = String(Math.floor((state.timeLeft % 3600) / 60)).padStart(2, "0");
  const s = String(state.timeLeft % 60).padStart(2, "0");
  timerDisplay.textContent = `${h}:${m}:${s}`;
}

function saveProgress() {
  const saved = { subject: state.selectedSubject, answers: state.answers, reviewFlags: state.reviewFlags, currentIndex: state.currentIndex, timeLeft: state.timeLeft };
  localStorage.setItem("bseb-test-progress", JSON.stringify(saved));
}

function resumeProgress() {
  const saved = JSON.parse(localStorage.getItem("bseb-test-progress") || "null");
  if (saved) {
    state.selectedSubject = saved.subject;
    state.answers = saved.answers;
    state.reviewFlags = saved.reviewFlags;
    state.currentIndex = saved.currentIndex;
    state.timeLeft = saved.timeLeft;
    state.questions = buildQuestionBank(saved.subject, 100);
    testSubjectLabel.textContent = `${saved.subject} Mock Test`;
    renderQuestion();
    updateTimer();
    startTimer();
  }
}

function finishTest() {
  clearInterval(state.timer);
  let correct = 0;
  let wrong = 0;
  let unattempted = 0;
  state.answers.forEach((answer, index) => {
    if (answer === null) unattempted += 1;
    else if (answer === state.questions[index].answer) correct += 1;
    else wrong += 1;
  });
  const score = correct;
  const percentage = Math.round((correct / state.questions.length) * 100);
  const accuracy = Math.round((correct / (correct + wrong)) * 100) || 0;
  const timeTaken = 3600 - state.timeLeft;
  const pass = percentage >= 40;
  const result = { subject: state.selectedSubject, score, percentage, correct, wrong, unattempted, accuracy, timeTaken, pass, date: new Date().toLocaleString() };
  const results = JSON.parse(localStorage.getItem("bseb-results") || "[]");
  results.unshift(result);
  localStorage.setItem("bseb-results", JSON.stringify(results.slice(0, 8)));
  localStorage.removeItem("bseb-test-progress");
  renderResult(result);
  showView("result");
  showToast("Test submitted successfully.");
}

function renderResult(result) {
  resultContent.innerHTML = `
    <div class="panel" style="max-width: 760px; margin: 0 auto;">
      <p class="eyebrow">Result Summary</p>
      <h2>${result.subject} Test Completed</h2>
      <div class="result-score">${result.percentage}%</div>
      <p>You scored <strong>${result.score}</strong> out of <strong>100</strong>. Your accuracy is <strong>${result.accuracy}%</strong>.</p>
      <div class="stats-row">
        <div class="metric-card"><strong>${result.correct}</strong><span>Correct</span></div>
        <div class="metric-card"><strong>${result.wrong}</strong><span>Wrong</span></div>
        <div class="metric-card"><strong>${result.unattempted}</strong><span>Unattempted</span></div>
        <div class="metric-card"><strong>${Math.floor(result.timeTaken / 60)}m</strong><span>Time Taken</span></div>
      </div>
      <div class="hero-actions" style="justify-content:center; margin-top: 16px;">
        <button class="btn btn-primary" onclick="showView('dashboard')">Back to Dashboard</button>
        <button class="btn btn-secondary" onclick="startTest('${result.subject}')">Retake Test</button>
      </div>
    </div>
  `;
}

function renderDashboard() {
  const results = JSON.parse(localStorage.getItem("bseb-results") || "[]");
  const totalTests = results.length;
  const bestScore = results.length ? Math.max(...results.map((item) => item.percentage)) : 0;
  const average = results.length ? Math.round(results.reduce((sum, item) => sum + item.percentage, 0) / results.length) : 0;
  const accuracy = results.length ? Math.round(results.reduce((sum, item) => sum + item.accuracy, 0) / results.length) : 0;
  welcomeMessage.textContent = `Welcome, ${state.studentName}.`;
  dashboardStats.innerHTML = `
    <div class="metric-card"><strong>${totalTests}</strong><span>Total Tests</span></div>
    <div class="metric-card"><strong>${bestScore}%</strong><span>Highest Score</span></div>
    <div class="metric-card"><strong>${average}%</strong><span>Average Score</span></div>
    <div class="metric-card"><strong>${accuracy}%</strong><span>Accuracy</span></div>
  `;
  recentTests.innerHTML = results.length ? results.slice(0, 5).map((item) => `
    <div class="list-item">
      <strong>${item.subject}</strong>
      <div style="color: var(--muted); font-size: 0.92rem;">${item.percentage}% • ${item.correct} correct • ${item.date}</div>
    </div>
  `).join("") : `<div class="list-item">No tests completed yet. Start your first mock test.</div>`;
  if (window.Chart) {
    const ctx = document.getElementById("performanceChart");
    if (ctx) {
      const labels = results.slice(0, 6).map((item) => item.subject).reverse();
      const data = results.slice(0, 6).map((item) => item.percentage).reverse();
      if (window.performanceChartInstance) window.performanceChartInstance.destroy();
      window.performanceChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [{ label: "Score (%)", data, backgroundColor: ["#2563eb", "#14b8a6", "#f59e0b", "#ef4444", "#7c3aed", "#0f766e"] }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
      });
    }
  }
}

function openAuthModal() {
  authModal.classList.add("open");
  authModal.setAttribute("aria-hidden", "false");
}

function closeAuthModal() {
  authModal.classList.remove("open");
  authModal.setAttribute("aria-hidden", "true");
}

function switchAuthMode(mode) {
  state.authMode = mode;
  const loginView = document.getElementById("loginView");
  const registerView = document.getElementById("registerView");
  const authHeading = document.getElementById("authHeading");
  
  if (mode === "login") {
    loginView.style.display = "block";
    registerView.style.display = "none";
    authHeading.textContent = "Login";
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";
    document.getElementById("loginUsername").focus();
  } else {
    loginView.style.display = "none";
    registerView.style.display = "block";
    authHeading.textContent = "Register";
    document.getElementById("registerName").value = "";
    document.getElementById("registerUsername").value = "";
    document.getElementById("registerPassword").value = "";
    document.getElementById("registerConfirm").value = "";
    document.getElementById("registerName").focus();
  }
}

function registerStudent() {
  const name = document.getElementById("registerName").value.trim();
  const username = document.getElementById("registerUsername").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
  const confirm = document.getElementById("registerConfirm").value.trim();
  
  if (!name) {
    showToast("Please enter your full name.");
    return;
  }
  if (!username || username.length < 3) {
    showToast("Username must be at least 3 characters.");
    return;
  }
  if (!password || password.length < 6) {
    showToast("Password must be at least 6 characters.");
    return;
  }
  if (password !== confirm) {
    showToast("Passwords do not match.");
    return;
  }
  
  localStorage.setItem("bseb-student-name", name);
  localStorage.setItem("bseb-student-username", username);
  localStorage.setItem("bseb-student-password", password);
  state.studentName = name;
  authBtn.textContent = `Hi, ${state.studentName}`;
  showToast("Account created! You are now logged in.");
  closeAuthModal();
  renderDashboard();
}

function loginStudent() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  
  if (!username || !password) {
    showToast("Please enter both username and password.");
    return;
  }
  
  const savedUser = localStorage.getItem("bseb-student-username");
  const savedPass = localStorage.getItem("bseb-student-password");
  
  if (savedUser === null) {
    showToast("No account found. Please register first.");
    switchAuthMode("register");
    return;
  }
  
  if (username === savedUser && password === savedPass) {
    state.studentName = localStorage.getItem("bseb-student-name") || "Student";
    authBtn.textContent = `Hi, ${state.studentName}`;
    showToast("Welcome back, " + state.studentName);
    closeAuthModal();
    renderDashboard();
  } else {
    showToast("Invalid username or password.");
  }
}

function init() {
  renderSubjects();
  renderDashboard();
  resumeProgress();
  document.querySelectorAll(".nav-links button[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => showView(btn.dataset.view));
  });
  document.getElementById("startHeroBtn").addEventListener("click", () => startTest("English"));
  document.getElementById("authBtn").addEventListener("click", openAuthModal);
  document.getElementById("closeModalBtn").addEventListener("click", closeAuthModal);
  const navToggle = document.querySelector('.nav-toggle');
  const topbar = document.querySelector('.topbar');
  if (navToggle && topbar) {
    navToggle.addEventListener('click', () => {
      const isOpen = topbar.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
  authModal.addEventListener("click", (event) => { if (event.target === authModal) closeAuthModal(); });
  document.getElementById("switchToRegister").addEventListener("click", (event) => { event.preventDefault(); switchAuthMode("register"); });
  document.getElementById("switchToLogin").addEventListener("click", (event) => { event.preventDefault(); switchAuthMode("login"); });
  document.getElementById("loginUsername").addEventListener("keypress", (e) => { if (e.key === "Enter") loginStudent(); });
  document.getElementById("loginPassword").addEventListener("keypress", (e) => { if (e.key === "Enter") loginStudent(); });
  document.getElementById("registerName").addEventListener("keypress", (e) => { if (e.key === "Enter") document.getElementById("registerUsername").focus(); });
  document.getElementById("registerUsername").addEventListener("keypress", (e) => { if (e.key === "Enter") document.getElementById("registerPassword").focus(); });
  document.getElementById("registerPassword").addEventListener("keypress", (e) => { if (e.key === "Enter") document.getElementById("registerConfirm").focus(); });
  document.getElementById("registerConfirm").addEventListener("keypress", (e) => { if (e.key === "Enter") registerStudent(); });
  document.getElementById("loginBtn").addEventListener("click", loginStudent);
  document.getElementById("registerBtn").addEventListener("click", registerStudent);
  document.getElementById("prevBtn").addEventListener("click", () => { if (state.currentIndex > 0) { state.currentIndex -= 1; renderQuestion(); } });
  document.getElementById("nextBtn").addEventListener("click", () => { if (state.currentIndex < state.questions.length - 1) { state.currentIndex += 1; renderQuestion(); } });
  document.getElementById("clearBtn").addEventListener("click", clearResponse);
  document.getElementById("reviewBtn").addEventListener("click", toggleReview);
  document.getElementById("submitBtn").addEventListener("click", () => { if (confirm("Submit the test now?")) finishTest(); });
  document.getElementById("saveQuestionBtn").addEventListener("click", () => {
    const question = document.getElementById("adminQuestion").value.trim();
    if (!question) { showToast("Enter a question first."); return; }
    showToast("Question saved to the local draft.");
  });
  window.answerQuestion = answerQuestion;
  window.jumpToQuestion = jumpToQuestion;
  window.startTest = startTest;
  window.showView = showView;
  updateTimer();
  if (localStorage.getItem("bseb-student-username")) {
    state.studentName = localStorage.getItem("bseb-student-name") || "Student";
    authBtn.textContent = `Hi, ${state.studentName}`;
  }
}

window.addEventListener("beforeunload", () => saveProgress());
init();