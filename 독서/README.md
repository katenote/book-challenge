# 🪐 북스토리 - 나의 우주 독서 일지

초등학생들이 재미있게 독서 기록을 남기고, 독서 습관을 기를 수 있는 아기자기한 독서 기록 웹앱입니다.
독서 실적에 따라 레벨이 오르고 귀여운 우주 캐릭터들이 진화하며, 멋진 뱃지를 획득할 수 있습니다.

🚀 **실행 중인 웹 앱 링크**: [https://katenote.github.io/book-challenge/](https://katenote.github.io/book-challenge/)

---

## 🎨 주요 기능
- **우주 기지 (대시보드)**: 읽은 책 수, 페이지 수 통계와 함께 레벨업 프로그레스 바 제공. 달성도에 따른 다양한 캐릭터 진화 및 귀여운 뱃지 보관함.
- **나의 책장**: 입체적인 책 카드 그리드 목록. 종류별 필터, 제목/글쓴이 검색, 정렬 기능 지원.
- **독서 기록 등록/수정**: 책 이름, 지은이, 날짜, 읽은 쪽수, 별점 및 책 읽은 소감(느낀 점)을 기록.
- **나의 기분 이모지**: 책을 덮은 직후의 내 마음을 다양한 이모지로 골라 기록 가능.
- **다이어리식 상세 보기**: 스프링노트 필기 감성으로 기록된 내용을 다시 예쁘게 볼 수 있는 상세 화면.
- **로컬 저장소 연동**: 데이터가 `localStorage`에 자동 보관되어 브라우저를 다시 열어도 기록이 안전하게 유지됨.

---

## 🛠️ 사용 기술
- **Frontend**: React (TypeScript) + Vite
- **Styling**: TailwindCSS + Lucide Icons + Google Fonts
- **Deployment**: GitHub Pages (`gh-pages`)

---

## 💻 로컬에서 실행하기

1. 저장소 클론:
```bash
git clone https://github.com/katenote/book-challenge.git
cd book-challenge
```

2. 패키지 설치:
```bash
npm install
```

3. 로컬 개발 서버 시작:
```bash
npm run dev
```
