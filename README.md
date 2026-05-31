# 🚀 Antigravity Onboarding Hub

> 무중력 상태처럼 매끄럽고 똑똑한 AI 코딩 파트너, **Antigravity**의 초보자를 위한 공식 가이드북 & 온보딩 허브입니다.

<p align="center">
  <a href="https://boisterous-concha-ced153.netlify.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-Netlify-00AD9F?style=for-the-badge&logo=netlify&logoColor=white" alt="Live Demo on Netlify" />
  </a>
  <img src="https://img.shields.io/badge/Powered%20By-Google%20DeepMind-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Powered by Google DeepMind" />
  <img src="https://img.shields.io/badge/Frontend-Vite%20%2B%20HTML5%20%2B%20CSS3-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite HTML CSS" />
</p>

---

## 🌌 프로젝트 소개 (Overview)

**Antigravity Onboarding Hub**는 AI 에이전트와 페어 프로그래밍을 처음 시작하는 개발자와 입문자들을 위한 인터랙티브 웹 가이드입니다. 

중력을 극복하고 무중력 공간에 도달하듯, 전통적인 개발의 복잡함과 한계를 극복하고 Antigravity와 함께 스마트하고 매끄럽게 웹 애플리케이션을 창작하고 디버깅하는 여정을 안내합니다.

* **실시간 배포 링크:** [https://boisterous-concha-ced153.netlify.app/](https://boisterous-concha-ced153.netlify.app/)
* **저장소 위치:** [katenote/antigravity-guide](https://github.com/katenote/antigravity-guide)

---

## ✨ 핵심 기능 (Key Features)

1. **🗺️ 4단계 온보딩 로드맵 (Stepper Roadmap)**
   * 작업 공간(Workspace) 준비부터 첫 대화 시작, 파일 생성, 그리고 고급 계획 모드(Planning Mode) 협업까지의 전체 여정을 4개의 인터랙티브 단계로 나누어 단계별 가이드를 제공합니다.

2. **💻 실시간 프롬프트 시뮬레이터 (Prompt Simulator)**
   * 콘솔 환경을 모방한 시뮬레이터 탭을 통해 Antigravity와 나눌 수 있는 대표적인 3가지 가상 시나리오(인사 및 기능 탐색, HTML 카운터 제작, 에러 디버깅 요청)를 실시간 애니메이션 타이핑으로 미리 경험할 수 있습니다.

3. **📕 필수 슬래시 명령어 도감 (Slash Commands Dictionary)**
   * 복잡하고 꼼꼼한 추적을 위한 `/goal`, 백그라운드 스케줄링을 위한 `/schedule`, 외부 웹 검색 및 화면 캡처 분석을 위한 `/browser`, 설계 조율을 위한 `/grill-me` 명령어의 쓰임새와 예시를 한눈에 파악합니다.

4. **🏆 실전 온보딩 퀘스트 & 진척도 트래커 (Quest & Progress Tracker)**
   * 로컬 스토리지(LocalStorage) 연동을 통해 사용자가 직접 수행한 온보딩 미션들을 체크하고, 실시간 진척도 서클 및 등급 변화(무중력 여행자 ➡️ 안티그래비티 마스터 👑)를 시각적으로 추적할 수 있습니다.

---

## 🎨 디자인 시스템 & 디자인 아이덴티티

* **우주 무중력(Cosmic Anti-gravity) 콘셉트:** 어두운 밤하늘과 성운을 연상시키는 보랏빛, 파란색 HSL 그라데이션 및 은은한 백그라운드 발광(Dynamic Cosmic Glow Elements) 효과를 도입했습니다.
* **글래스모피즘(Glassmorphism):** 미려한 반투명 유리 질감 카드를 활용해 UI의 깊이감과 가독성을 고도로 높였습니다.
* **마이크로 애니메이션:** 탭 스위칭, 체크박스 토글, 서클 게이지 애니메이션 등 세련된 트랜지션 및 시뮬레이터 터미널 타이핑 효과를 통해 프리미엄 사용자 경험을 구현하였습니다.

---

## 🛠️ 기술 스택 (Tech Stack)

* **빌드 도구:** [Vite](https://vite.dev/) (초고속 개발 서버 및 에셋 번들러)
* **마크업:** HTML5 (시맨틱 웹 표준 구성)
* **스타일링:** Vanilla CSS3 (Custom Variables, Flex/Grid Layouts, Glassmorphism UI)
* **스크립트:** Modern JavaScript (ES Modules, LocalStorage, Web APIs)

---

## 🚀 로컬 실행 방법 (How to Run Locally)

프로젝트를 로컬 환경에 다운로드하여 직접 실행하고 수정할 수 있습니다.

### 1. 저장소 클론 (Clone the Repository)
```bash
git clone https://github.com/katenote/antigravity-guide.git
cd antigravity-guide
```

### 2. 패키지 설치 (Install Dependencies)
```bash
npm install
```

### 3. 로컬 개발 서버 실행 (Run Dev Server)
```bash
npm run dev
```
실행 후 브라우저에서 `http://localhost:5173`으로 접속해 허브를 확인할 수 있습니다.

### 4. 빌드 (Build for Production)
```bash
npm run build
```
빌드된 정적 에셋은 `dist/` 폴더에 생성됩니다.

---

## 💡 기여 & 문의 (Contribution & Support)

Antigravity는 Google DeepMind의 선진적인 자율 코딩 가이드라인에 맞추어 상호 협력합니다. 온보딩 프로세스를 개선하고 싶거나 새로운 실전 팁을 기여하고 싶으시다면 언제든지 이슈 또는 Pull Request를 보내주세요!
