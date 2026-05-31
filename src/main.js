// Import style for Vite hot reloading and bundling
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. STEPPER ROADMAP LOGIC ---
  const stepTabs = document.querySelectorAll('.step-tab');
  const stepContents = document.querySelectorAll('.step-content');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  let currentStep = 1;

  function updateSteps(stepNumber) {
    currentStep = stepNumber;

    // Update tabs
    stepTabs.forEach(tab => {
      if (parseInt(tab.dataset.step) === currentStep) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Update contents
    stepContents.forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(`step-${currentStep}`).classList.add('active');

    // Update buttons
    prevBtn.disabled = currentStep === 1;
    if (currentStep === 4) {
      nextBtn.innerHTML = `시뮬레이터 체험
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`;
    } else {
      nextBtn.innerHTML = `다음 단계
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
    }
  }

  stepTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      updateSteps(parseInt(tab.dataset.step));
    });
  });

  prevBtn.addEventListener('click', () => {
    if (currentStep > 1) updateSteps(currentStep - 1);
  });

  nextBtn.addEventListener('click', () => {
    if (currentStep < 4) {
      updateSteps(currentStep + 1);
    } else {
      // Smooth scroll to simulator section
      document.getElementById('prompt-simulator').scrollIntoView({ behavior: 'smooth' });
    }
  });


  // --- 2. PROMPT SIMULATOR LOGIC ---
  const promptPills = document.querySelectorAll('.prompt-pill');
  const terminalScreen = document.getElementById('terminal-screen');
  
  // Scenarios database
  const scenarios = {
    greeting: [
      { sender: 'user', text: "안녕 Antigravity! 넌 주로 여기서 어떤 작업들을 할 수 있니?" },
      { sender: 'system-log', type: 'info', text: '⚡ Antigravity Agent initialized with Model: Gemini 3.5 Flash.' },
      { sender: 'ai', text: "안녕하세요! 반갑습니다. 🚀\n저는 단순한 대화형 챗봇이 아닌, 사용자의 로컬 환경과 직접 교감하며 코드를 작성하는 강력한 AI 개발 파트너 **Antigravity**입니다.\n\n주로 다음과 같은 작업을 수행할 수 있어요:\n1. 📁 **파일 및 프로젝트 자동 빌드**: HTML, CSS, JS부터 백엔드 코드까지 파일 구조를 직접 설계하고 완벽하게 구축합니다.\n2. 💻 **터미널 커맨드 제안 및 실행**: 개발 환경 설정, 의존성 설치, 서버 구동 작업을 사용자의 확인 아래 즉시 구동합니다.\n3. 🔍 **코드 오류 실시간 진단**: 에러 로그를 분석하여 코드의 문제점을 발견하고, Contiguous Edit 툴로 즉각적인 디버깅을 처리합니다.\n4. 📝 **계획 기반 개발(Planning Mode)**: 복잡한 기능 추가 시 `implementation_plan.md`와 `task.md`를 준비해 체계적으로 접근합니다.", actions: [] }
    ],
    'counter-app': [
      { sender: 'user', text: "여기에 웹 브라우저에서 바로 동작하는 프리미엄 스톱워치 타이머 앱을 싱글 HTML/CSS/JS 파일 형태로 만들어줄 수 있어?" },
      { sender: 'system-log', type: 'info', text: '📝 Planning Mode active: Designing full single-page application...' },
      { sender: 'ai', text: "좋습니다! 스톱워치와 랩 타임 기록이 가능하며 무중력 테마의 미려한 글래스모피즘 UI를 담은 독립형 타이머 웹앱을 구현하겠습니다.\n구현할 컴포넌트를 설계하고 작업 공간에 새 파일을 작성해 볼까요?", actions: [
        { type: 'create', file: 'index.html', desc: 'Creating index.html structure...' },
        { type: 'create', file: 'style.css', desc: 'Writing style.css with beautiful dynamic glow gradients...' },
        { type: 'create', file: 'app.js', desc: 'Writing app.js stopwatch millisecond timer core logic...' }
      ] },
      { sender: 'system-log', type: 'success', text: '🎉 Application created successfully! Open file://index.html to view.' }
    ],
    'debug-issue': [
      { sender: 'user', text: "콘솔 창에 'Uncaught TypeError: Cannot read properties of null (reading \"addEventListener\") at app.js:15' 에러가 떠서 스톱워치 버튼이 안 눌려. 해결해 줘." },
      { sender: 'system-log', type: 'info', text: '🔍 Scanning workspace files... Found discrepancy in DOM selectors.' },
      { sender: 'ai', text: "아! 문제를 찾아냈습니다. `app.js` 15라인에서 `document.getElementById('start-btn')`을 참조해 리스너를 등록하고 있지만, 정작 `index.html` 파일에는 해당 버튼의 ID가 `start-button`으로 설정되어 있어 요소를 찾아오지 못해 발생한 타입 에러입니다.\n\n`index.html`의 버튼 속성 ID를 `start-btn`으로 즉시 교체하여 동기화하겠습니다.", actions: [
        { type: 'modify', file: 'index.html', desc: 'Updating button ID from "start-button" to "start-btn"...' }
      ] },
      { sender: 'system-log', type: 'success', text: '✅ Bug fixed! Event listener successfully attached to button element.' }
    ]
  };

  let typingTimeout = null;

  function runScenario(scenarioKey) {
    // Clear active timeouts and clear terminal screen
    if (typingTimeout) clearTimeout(typingTimeout);
    terminalScreen.innerHTML = '';
    
    const conversation = scenarios[scenarioKey];
    let stepIdx = 0;

    function renderNextBubble() {
      if (stepIdx >= conversation.length) return;
      
      const step = conversation[stepIdx];
      const bubble = document.createElement('div');
      bubble.classList.add('message-bubble');

      if (step.sender === 'user') {
        bubble.innerHTML = `
          <div class="message-label user">▶ User</div>
          <div class="message-text">${step.text}</div>
        `;
        terminalScreen.appendChild(bubble);
        stepIdx++;
        // Add artificial delay before AI starts replying
        showTypingIndicator(() => {
          renderNextBubble();
        });
      } 
      else if (step.sender === 'system-log') {
        const isSuccess = step.type === 'success';
        bubble.innerHTML = `
          <div class="visual-action" style="color: ${isSuccess ? 'var(--success)' : 'var(--accent)'}">
            ${isSuccess ? '✅' : '⚙️'} ${step.text}
          </div>
        `;
        terminalScreen.appendChild(bubble);
        stepIdx++;
        typingTimeout = setTimeout(renderNextBubble, 1200);
      }
      else if (step.sender === 'ai') {
        bubble.innerHTML = `
          <div class="message-label ai">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--primary)"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4M12,18C8.69,18 6,15.31 6,12C6,9.09 8.08,6.67 10.83,6.13C10.32,7.31 10,8.62 10,10C10,14.42 13.58,18 18,18C18,18 15.69,18 12,18Z" /></svg>
            Antigravity
          </div>
          <div class="message-text"></div>
        `;
        terminalScreen.appendChild(bubble);

        const textContainer = bubble.querySelector('.message-text');
        let charIdx = 0;
        const textToType = step.text;

        function typeChar() {
          if (charIdx < textToType.length) {
            textContainer.innerHTML += textToType.charAt(charIdx);
            charIdx++;
            terminalScreen.scrollTop = terminalScreen.scrollHeight;
            typingTimeout = setTimeout(typeChar, 8); // Fast typing speed
          } else {
            // Typing finished. Execute any visual actions if present.
            if (step.actions && step.actions.length > 0) {
              const actionsVisual = document.createElement('div');
              actionsVisual.classList.add('ai-actions-visual');
              bubble.appendChild(actionsVisual);
              
              let actionIdx = 0;
              function renderAction() {
                if (actionIdx < step.actions.length) {
                  const act = step.actions[actionIdx];
                  const actDiv = document.createElement('div');
                  actDiv.classList.add('visual-action');
                  
                  const iconSvg = act.type === 'create' 
                    ? '<svg viewBox="0 0 24 24"><path d="M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z"/></svg>'
                    : '<svg viewBox="0 0 24 24"><path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"/></svg>';
                  
                  actDiv.innerHTML = `
                    ${iconSvg}
                    <span>[${act.type.toUpperCase()}] <strong>${act.file}</strong> - ${act.desc}</span>
                  `;
                  actionsVisual.appendChild(actDiv);
                  terminalScreen.scrollTop = terminalScreen.scrollHeight;
                  
                  actionIdx++;
                  typingTimeout = setTimeout(renderAction, 800);
                } else {
                  stepIdx++;
                  typingTimeout = setTimeout(renderNextBubble, 1000);
                }
              }
              typingTimeout = setTimeout(renderAction, 600);
            } else {
              stepIdx++;
              typingTimeout = setTimeout(renderNextBubble, 1000);
            }
          }
        }
        typeChar();
      }
    }

    renderNextBubble();
  }

  function showTypingIndicator(callback) {
    const indicator = document.createElement('div');
    indicator.classList.add('message-bubble');
    indicator.innerHTML = `
      <div class="message-label ai">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--primary)"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4M12,18C8.69,18 6,15.31 6,12C6,9.09 8.08,6.67 10.83,6.13C10.32,7.31 10,8.62 10,10C10,14.42 13.58,18 18,18C18,18 15.69,18 12,18Z" /></svg>
        Antigravity is typing
      </div>
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    terminalScreen.appendChild(indicator);
    terminalScreen.scrollTop = terminalScreen.scrollHeight;

    typingTimeout = setTimeout(() => {
      indicator.remove();
      callback();
    }, 1500);
  }

  // Handle pill switches
  promptPills.forEach(pill => {
    pill.addEventListener('click', () => {
      promptPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      runScenario(pill.dataset.scenario);
    });
  });

  // Run initial scenario automatically
  runScenario('greeting');


  // --- 3. ONBOARDING QUEST CHECKLIST LOGIC ---
  const questItems = document.querySelectorAll('.checklist-item');
  const progressIndicator = document.getElementById('progress-indicator');
  const progressText = document.getElementById('progress-text');
  const progressTitle = document.getElementById('progress-title');
  const progressDesc = document.getElementById('progress-desc');

  // Total perimeter of circle (2 * PI * r) -> 2 * 3.14159 * 42 = 263.89
  const maxDashOffset = 263.89;

  // Load initial checked states from localStorage
  const savedState = JSON.parse(localStorage.getItem('antigravity_quests')) || {};

  function updateQuestProgress() {
    let completedCount = 0;
    questItems.forEach(item => {
      const id = item.dataset.id;
      if (savedState[id]) {
        item.classList.add('completed');
        completedCount++;
      } else {
        item.classList.remove('completed');
      }
    });

    const percent = Math.round((completedCount / questItems.length) * 100);
    progressText.innerText = `${percent}%`;

    // Visual circular fill
    const offsetValue = maxDashOffset - (percent / 100) * maxDashOffset;
    progressIndicator.style.strokeDashoffset = offsetValue;

    // Update level descriptions dynamically
    if (percent === 0) {
      progressTitle.innerText = "무중력 여행자";
      progressDesc.innerText = "퀘스트 항목을 수행하여 개발 중력을 이겨내고 무중력 궤도에 진입해 보세요!";
    } else if (percent > 0 && percent <= 40) {
      progressTitle.innerText = "은하계 입문자";
      progressDesc.innerText = "준비 작업을 시작하셨군요! 에이전트의 작동 원리를 조금씩 터득하는 중입니다.";
    } else if (percent > 40 && percent <= 80) {
      progressTitle.innerText = "무중력 엔지니어";
      progressDesc.innerText = "실전 시뮬레이션까지 모두 확인하고 핵심 명령어들도 거의 완벽하게 파악하셨습니다!";
    } else if (percent > 80 && percent < 100) {
      progressTitle.innerText = "스타십 캡틴";
      progressDesc.innerText = "훌륭합니다! 우주선을 궤도에 올릴 준비가 거의 끝났습니다. 마지막 미션에 도전해 보세요.";
    } else {
      progressTitle.innerText = "안티그래비티 마스터 👑";
      progressDesc.innerText = "축하합니다! 이제 Antigravity의 성능을 극대화하여 초고속 무중력 코딩을 마음껏 발휘해 보세요!";
    }
  }

  questItems.forEach(item => {
    item.addEventListener('click', () => {
      const id = item.dataset.id;
      savedState[id] = !savedState[id];
      localStorage.setItem('antigravity_quests', JSON.stringify(savedState));
      updateQuestProgress();
    });
  });

  // Run initial calculations
  updateQuestProgress();

});
