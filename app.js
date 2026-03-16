// ─── Data ───

const questions = [
  {
    id: 1,
    section: 'Time Horizon',
    text: 'I plan to begin withdrawing money from my investments in:',
    options: [
      { label: 'Less than 3 years', points: 1 },
      { label: '3–5 years', points: 3 },
      { label: '6–10 years', points: 7 },
      { label: '11 years or more', points: 10 },
    ],
  },
  {
    id: 2,
    section: 'Time Horizon',
    text: 'Once I begin withdrawing funds from my investments, I plan to spend all of the funds in:',
    options: [
      { label: 'Less than 3 years', points: 0 },
      { label: '3–5 years', points: 1 },
      { label: '6–10 years', points: 4 },
      { label: '11 years or more', points: 8 },
    ],
  },
  {
    id: 3,
    section: 'Risk Tolerance',
    text: 'I would describe my knowledge of investments as:',
    options: [
      { label: 'None', points: 1 },
      { label: 'Limited', points: 3 },
      { label: 'Good', points: 7 },
      { label: 'Extensive', points: 10 },
    ],
  },
  {
    id: 4,
    section: 'Risk Tolerance',
    text: 'What amount of financial risk are you willing to take when you invest?',
    options: [
      { label: 'Take lower than average risks expecting to earn lower than average returns', points: 0 },
      { label: 'Take average risks expecting to earn average returns', points: 4 },
      { label: 'Take above average risks expecting to earn above average returns', points: 8 },
    ],
  },
  {
    id: 5,
    section: 'Risk Tolerance',
    text: 'Select the investments you currently own or have owned:',
    subtitle: 'Select the highest-risk category that applies. For example, if you own stock funds and have previously purchased emerging market funds, select Emerging Markets.',
    options: [
      { label: 'Bonds and/or bond funds', points: 3 },
      { label: 'Stocks and/or stock funds', points: 6 },
      { label: 'Emerging markets and/or alternative investments', points: 8 },
    ],
  },
  {
    id: 6,
    section: 'Risk Tolerance',
    text: 'Imagine that in the past three months, the overall stock market lost 25% of its value. An individual stock investment you own also lost 25% of its value. What would you do?',
    options: [
      { label: 'Sell all of my shares', points: 0 },
      { label: 'Sell some of my shares', points: 2 },
      { label: 'Do nothing', points: 5 },
      { label: 'Buy more shares', points: 8 },
    ],
  },
  {
    id: 7,
    section: 'Risk Tolerance',
    text: 'Which range of possible outcomes is most acceptable to you?',
    subtitle: 'Review the hypothetical investment plans below. The figures are hypothetical and do not represent the performance of any particular investment.',
    showPlanTable: true,
    options: [
      { label: 'Plan A — Avg. 2.6% return (best +10.8%, worst −5.1%)', points: 0 },
      { label: 'Plan B — Avg. 4.1% return (best +19.2%, worst −10.6%)', points: 3 },
      { label: 'Plan C — Avg. 5.6% return (best +27.6%, worst −16.4%)', points: 6 },
      { label: 'Plan D — Avg. 6.1% return (best +36.0%, worst −21.7%)', points: 8 },
      { label: 'Plan E — Avg. 7.2% return (best +42.5%, worst −25.8%)', points: 10 },
    ],
  },
];

const profiles = [
  {
    name: 'Conservative',
    equity: 20,
    fixed: 80,
    description: 'For investors who seek current income and stability and are less concerned about growth.',
  },
  {
    name: 'Moderately Conservative',
    equity: 40,
    fixed: 60,
    description: 'For investors who seek current income and stability, with modest potential for increase in the value of their investments.',
  },
  {
    name: 'Moderate',
    equity: 60,
    fixed: 40,
    description: 'For long-term investors who don\'t need current income and want some growth potential. Likely to entail some fluctuations in value, but presents less volatility than the overall equity market.',
  },
  {
    name: 'Moderately Aggressive',
    equity: 80,
    fixed: 20,
    description: 'For long-term investors who want good growth potential and don\'t need current income. Entails a fair amount of volatility, but not as much as a portfolio invested exclusively in equities.',
  },
  {
    name: 'Aggressive',
    equity: 100,
    fixed: 0,
    description: 'For long-term investors who want high growth potential and don\'t need current income. May entail substantial year-to-year volatility in value in exchange for potentially high long-term returns.',
  },
];

// Matrix from the PDF: rows = time horizon score ranges, cols = risk tolerance score ranges
// Time horizon rows: 3-4, 5-6, 7-9, 10-12, 14-18
// Risk tolerance cols: 0-10, 11-18, 19-24, 25-31, 32-40
function getProfileIndex(timeScore, riskScore) {
  let tRow;
  if (timeScore <= 4) tRow = 0;
  else if (timeScore <= 6) tRow = 1;
  else if (timeScore <= 9) tRow = 2;
  else if (timeScore <= 12) tRow = 3;
  else tRow = 4;

  let rCol;
  if (riskScore <= 10) rCol = 0;
  else if (riskScore <= 18) rCol = 1;
  else if (riskScore <= 24) rCol = 2;
  else if (riskScore <= 31) rCol = 3;
  else rCol = 4;

  // The matrix from the chart
  const matrix = [
    [0, 0, 0, 0, 0],   // 3-4 points time
    [0, 0, 1, 1, 1],   // 5-6
    [0, 1, 2, 2, 3],   // 7-9
    [0, 1, 2, 3, 4],   // 10-12
    [0, 1, 2, 3, 4],   // 14-18
  ];

  return matrix[tRow][rCol];
}

// ─── State ───

let state = {
  screen: 'welcome', // welcome | question | clientInfo | results
  currentQ: 0,
  answers: {},
  clientName: '',
  animating: false,
};

// ─── Rendering ───

function render() {
  const app = document.getElementById('app');
  let html = '';

  if (state.screen === 'welcome') {
    html = renderWelcome();
  } else if (state.screen === 'question') {
    html = renderProgressBar() + renderHeader() + renderQuestion();
  } else if (state.screen === 'clientInfo') {
    html = renderProgressBar() + renderHeader() + renderClientInfo();
  } else if (state.screen === 'results') {
    html = renderResults();
  }

  app.innerHTML = html;
  bindEvents();

  // Animate donut on results
  if (state.screen === 'results') {
    requestAnimationFrame(() => {
      requestAnimationFrame(animateDonut);
    });
  }
}

function renderProgressBar() {
  const total = questions.length + 1; // +1 for client info
  let current = state.screen === 'clientInfo' ? questions.length + 1 : state.currentQ + 1;
  const pct = (current / total) * 100;
  return `
    <div class="progress-bar-wrapper">
      <div class="progress-bar-fill" style="width:${pct}%"></div>
    </div>
  `;
}

function renderHeader() {
  let stepText = '';
  if (state.screen === 'question') {
    stepText = `Question ${state.currentQ + 1} of ${questions.length}`;
  } else if (state.screen === 'clientInfo') {
    stepText = 'Final Step';
  }
  return `
    <div class="header">
      <div class="header-brand">
        <div class="header-logo">IP</div>
        <div class="header-title">Investor Profile</div>
      </div>
      <div class="header-step">${stepText}</div>
    </div>
  `;
}

function renderWelcome() {
  return `
    <div class="screen">
      <div class="welcome-card">
        <div class="welcome-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <h1>Discover Your Investor Profile</h1>
        <p>Answer 7 quick questions about your investment goals and risk tolerance. We'll recommend a personalized asset allocation that fits your needs.</p>
        <div class="welcome-steps">
          <div class="welcome-step">
            <div class="welcome-step-num">1</div>
            <div class="welcome-step-label">Time Horizon</div>
          </div>
          <div class="welcome-step">
            <div class="welcome-step-num">2</div>
            <div class="welcome-step-label">Risk Tolerance</div>
          </div>
          <div class="welcome-step">
            <div class="welcome-step-num">3</div>
            <div class="welcome-step-label">Your Allocation</div>
          </div>
        </div>
        <button class="btn btn-gold" onclick="startQuiz()">
          Get Started
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  `;
}

function renderQuestion() {
  const q = questions[state.currentQ];
  const selected = state.answers[q.id];
  const isFirst = state.currentQ === 0;

  let planTableHtml = '';
  if (q.showPlanTable) {
    planTableHtml = `
      <div class="plan-table-wrapper">
        <table class="plan-table">
          <thead>
            <tr>
              <th>Plan</th>
              <th>Avg. Annual Return</th>
              <th>Best-case</th>
              <th>Worst-case</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>A</td><td>2.6%</td><td class="best-case">+10.8%</td><td class="worst-case">−5.1%</td></tr>
            <tr><td>B</td><td>4.1%</td><td class="best-case">+19.2%</td><td class="worst-case">−10.6%</td></tr>
            <tr><td>C</td><td>5.6%</td><td class="best-case">+27.6%</td><td class="worst-case">−16.4%</td></tr>
            <tr><td>D</td><td>6.1%</td><td class="best-case">+36.0%</td><td class="worst-case">−21.7%</td></tr>
            <tr><td>E</td><td>7.2%</td><td class="best-case">+42.5%</td><td class="worst-case">−25.8%</td></tr>
          </tbody>
        </table>
      </div>
    `;
  }

  const subtitleHtml = q.subtitle ? `<div class="question-subtitle">${q.subtitle}</div>` : '';

  const optionsHtml = q.options.map((opt, i) => `
    <div class="option-card ${selected === i ? 'selected' : ''}" onclick="selectOption(${q.id}, ${i})">
      <div class="option-radio"></div>
      <div class="option-content">
        <div class="option-label">${opt.label}</div>
      </div>
    </div>
  `).join('');

  return `
    <div class="screen" id="question-screen">
      <div class="question-container">
        <div class="question-section-label"><span class="dot"></span> ${q.section}</div>
        <div class="question-number">Question ${state.currentQ + 1} of ${questions.length}</div>
        <div class="question-text">${q.text}</div>
        ${subtitleHtml}
        ${planTableHtml}
        <div class="options-list">
          ${optionsHtml}
        </div>
        <div class="nav-bar">
          <button class="btn btn-secondary" onclick="goBack()" ${isFirst ? 'disabled' : ''}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
            Back
          </button>
          <button class="btn btn-primary" onclick="goNext()" ${selected === undefined ? 'disabled' : ''}>
            ${state.currentQ === questions.length - 1 ? 'Continue' : 'Next'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderClientInfo() {
  return `
    <div class="screen">
      <div class="client-info-card">
        <h3>Almost done — tell us your name</h3>
        <div class="form-row">
          <div class="form-group full-width">
            <label class="form-label" for="clientName">Full Name</label>
            <input class="form-input" type="text" id="clientName" placeholder="e.g. Jane Smith" value="${state.clientName}" />
          </div>
        </div>
        <div class="nav-bar">
          <button class="btn btn-secondary" onclick="backToLastQuestion()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
            Back
          </button>
          <button class="btn btn-primary" onclick="showResults()">
            View My Results
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderResults() {
  const { timeScore, riskScore, profile } = computeResults();
  const displayName = state.clientName.trim() || 'Investor';

  return `
    <div class="screen">
      <div class="results-container">
        <div class="results-header">
          <div class="results-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
            Profile Complete
          </div>
          <h1>${displayName}'s Investor Profile</h1>
          <p>Based on your responses, your recommended allocation is <span class="results-profile-name">${profile.name}</span>.</p>
        </div>

        <div class="score-cards">
          <div class="score-card">
            <div class="score-card-label">Time Horizon Score</div>
            <div class="score-card-value">${timeScore}</div>
            <div class="score-card-max">out of 18</div>
          </div>
          <div class="score-card">
            <div class="score-card-label">Risk Tolerance Score</div>
            <div class="score-card-value">${riskScore}</div>
            <div class="score-card-max">out of 44</div>
          </div>
        </div>

        <div class="allocation-card">
          <div class="allocation-title">Recommended Asset Allocation</div>
          <div class="allocation-subtitle">${profile.name}</div>
          <div class="allocation-donut-row">
            <div class="donut-chart" id="donut">
              <svg viewBox="0 0 200 200">
                <circle class="donut-bg" />
                <circle class="donut-fixed" id="donut-fixed" />
                <circle class="donut-equity" id="donut-equity" />
              </svg>
              <div class="donut-center-text">
                <div class="profile-label">Profile</div>
                <div class="profile-name">${profile.name.split(' ').length > 1 ? profile.name.split(' ').map(w => w[0]).join('') : profile.name.slice(0, 4)}</div>
              </div>
            </div>
            <div class="allocation-legend">
              <div class="legend-item">
                <div class="legend-swatch equity"></div>
                <div class="legend-label">Equity</div>
                <div class="legend-value">${profile.equity}%</div>
              </div>
              <div class="legend-item">
                <div class="legend-swatch fixed"></div>
                <div class="legend-label">Fixed Income</div>
                <div class="legend-value">${profile.fixed}%</div>
              </div>
            </div>
          </div>
        </div>

        <div class="profile-description">
          <h3>What This Means</h3>
          <p>${profile.description}</p>
        </div>

        <div class="results-actions">
          <button class="btn btn-secondary" onclick="restart()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 105.64-8.36L1 10"/></svg>
            Start Over
          </button>
          <button class="btn btn-primary" onclick="printResults()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Print Results
          </button>
        </div>

        <div class="disclaimer">
          Source: Schwab.com Investor Profile Questionnaire. The information provided is for educational purposes only and does not constitute financial advice. Past performance does not guarantee future results. Please consult a qualified financial advisor before making investment decisions.
        </div>
      </div>
    </div>
  `;
}

// ─── Logic ───

function computeResults() {
  let timeScore = 0;
  let riskScore = 0;

  // Questions 1-2 → time horizon
  for (let qId = 1; qId <= 2; qId++) {
    const ansIdx = state.answers[qId];
    if (ansIdx !== undefined) {
      timeScore += questions.find(q => q.id === qId).options[ansIdx].points;
    }
  }

  // Questions 3-7 → risk tolerance
  for (let qId = 3; qId <= 7; qId++) {
    const ansIdx = state.answers[qId];
    if (ansIdx !== undefined) {
      riskScore += questions.find(q => q.id === qId).options[ansIdx].points;
    }
  }

  const profileIdx = getProfileIndex(timeScore, riskScore);
  return { timeScore, riskScore, profile: profiles[profileIdx] };
}

function animateDonut() {
  const { profile } = computeResults();
  const circumference = 2 * Math.PI * 86; // ~540.35
  const equityLen = (profile.equity / 100) * circumference;
  const fixedLen = (profile.fixed / 100) * circumference;

  const eqEl = document.getElementById('donut-equity');
  const fixEl = document.getElementById('donut-fixed');

  if (eqEl && fixEl) {
    // Equity starts at 0 offset
    eqEl.style.strokeDasharray = `${equityLen} ${circumference}`;
    // Fixed starts after equity
    fixEl.style.strokeDasharray = `${fixedLen} ${circumference}`;
    fixEl.style.strokeDashoffset = `-${equityLen}`;
  }
}

// ─── Event Handlers ───

function startQuiz() {
  state.screen = 'question';
  state.currentQ = 0;
  render();
}

function selectOption(qId, optionIndex) {
  state.answers[qId] = optionIndex;
  render();

  // Auto-advance after a brief pause
  setTimeout(() => {
    if (state.currentQ < questions.length - 1) {
      state.currentQ++;
      render();
    }
  }, 350);
}

function goNext() {
  if (state.currentQ < questions.length - 1) {
    state.currentQ++;
    render();
  } else {
    state.screen = 'clientInfo';
    render();
  }
}

function goBack() {
  if (state.currentQ > 0) {
    state.currentQ--;
    render();
  }
}

function backToLastQuestion() {
  state.screen = 'question';
  state.currentQ = questions.length - 1;
  render();
}

function showResults() {
  const nameInput = document.getElementById('clientName');
  if (nameInput) {
    state.clientName = nameInput.value;
  }
  state.screen = 'results';
  render();
}

function restart() {
  state = {
    screen: 'welcome',
    currentQ: 0,
    answers: {},
    clientName: '',
    animating: false,
  };
  render();
}

function printResults() {
  window.print();
}

function bindEvents() {
  const nameInput = document.getElementById('clientName');
  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      state.clientName = e.target.value;
    });
    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') showResults();
    });
    nameInput.focus();
  }
}

// ─── Init ───
render();
