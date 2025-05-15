# 야구 커뮤니티 프론트엔드 프로젝트

## 🏟️ 프로젝트 소개

이 프로젝트는 React 기반의 야구 커뮤니티 웹앱입니다.  
클린 아키텍처와 DDD(도메인 주도 설계) 구조,  
Spring Boot 백엔드와의 REST API 연동,  
그리고 GitHub Actions를 통한 CI/CD 자동 배포 환경을 모두 적용했습니다.

---

```plaintext
<pre> 
## 📦 프로젝트 아키텍처

src/
├─ domains/                  # 도메인 레이어 (비즈니스 로직)
│  └─ post/
│     ├─ entities/           # Post 엔티티
│     ├─ repositories/       # 추상 인터페이스
│     └─ useCases/           # 비즈니스 유스케이스
├─ infrastructures/
│  ├─ api/                   # API 클라이언트
│  └─ axios/                 # Axios 설정
├─ adapters/
│  ├─ state/                 # Zustand 스토어
│  └─ formatters/            # 날짜 포맷터 등
├─ frameworks/
│  ├─ components/
│  │  ├─ layout/             # Header, Footer, Sidebar 등 공용 레이아웃
│  │  └─ ui/                 # UI 컴포넌트
│  └─ hooks/                 # 커스텀 훅
├─ pages/                    # 페이지 컴포넌트
│  ├─ HomePage.tsx           # 메인 페이지
│  ├─ PostListPage.tsx       # 게시물 목록
│  └─ PostDetailPage.tsx     # 상세 페이지
├─ router/                   # 라우팅
│  ├─ routes.tsx
│  └─ PrivateRoute.tsx
└─ .github/workflows/        # CI/CD
   └─ deploy.yml
 ``` </pre>

---

## 🛠️ 개발 환경 세팅

### 1. Node.js 설치

- [Node.js 공식 홈페이지](https://nodejs.org/)에서 LTS 버전 다운로드 및 설치  
- 설치 후 터미널(명령 프롬프트/PowerShell)에서 아래 명령어로 정상 설치 확인  
node -v
npm -v

### 2. PowerShell에서 npm 실행 오류 해결

윈도우 PowerShell에서 아래 명령어를 한 번만 실행해 주세요:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
(Y 입력 후 엔터)

### 3. Visual Studio Code 설치 및 필수 확장팩

- [VS Code 공식 사이트](https://code.visualstudio.com/)에서 설치
- 추천 확장팩:
    - ES7 React/Redux/GraphQL/React-Native snippets
    - Prettier – Code formatter
    - Bracket Pair Colorizer
    - Auto Rename Tag
    - VSCode React Refactor
    - ESLint
    - npm Intellisense
    - TabOut
    - change-case
    - EditorConfig for VS Code  
  (VSCode 좌측 Extensions 아이콘에서 이름으로 검색 후 설치)

---

## 🚀 프로젝트 시작 방법 (처음 참여하는 개발자용)

### 0. VSCode에서 터미널 여는 법

방법 1:
상단 메뉴에서 [보기(View)] → [터미널(Terminal)] 클릭

방법 2:
단축키 `Ctrl + `` (백틱, 1번 키보드 숫자 1 왼쪽에 있는 키) 누르기

방법 3:
VSCode 좌측 파일 탐색기에서 해당 폴더(예: locker-room-talk-front) 우클릭 →
"통합 터미널에서 열기(Open in Integrated Terminal)" 선택

방법 4:
Ctrl + Shift + P 누르고 "Terminal: New Terminal" 입력 후 엔터

### 1. 레포지토리 클론

git clone https://github.com/BallTalk/locker-room-talk-front.git
cd locker-room-talk-front

### 2. 의존성 자동 설치 세팅

처음 세팅 시 아래 명령어를 한 번만 실행해 주세요:
npm install --save-dev npm-autoinstaller
이후부터는 `git pull` 등으로 `package.json`이 바뀔 때마다 **자동으로 npm install이 실행**됩니다.

### 3. 프로젝트 의존성 설치 (최초 1회)

npm install

### 4. 개발 서버 실행

npm start
- 기본 주소: http://localhost:3000

### 5. Spring Boot 백엔드 연동

- 백엔드(Spring Boot)는 http://localhost:8080 에서 실행
- 프론트엔드에서 `.env` 파일로 API 주소를 설정할 수 있음  
  예시:
  REACT_APP_API_URL=http://localhost:8080/api

  
---

## 🧑‍💻 협업 및 커밋 규칙

- node_modules/는 절대 커밋하지 않습니다.
- 패키지 추가/삭제 시 반드시 package.json, package-lock.json만 커밋
- 브랜치 전략:  
  - 기능 개발은 개인 브랜치(feat/기능명) → dev → main 순으로 머지
- 커밋 메시지 컨벤션:  
  - 예시: feat: 로그인 페이지 추가

---

## ⚙️ CI/CD (자동 배포)

- main 브랜치에 push 시 GitHub Actions가 자동으로 빌드 & GitHub Pages로 배포
- 배포 주소:  
  https://BallTalk.github.io/locker-room-talk-front

---

## 📝 참고 자료

- Node.js 설치 가이드: https://nodejs.org/
- React 프로젝트 구조 참고: https://github.com/yamoo9/cra-template-ko/blob/master/README.md
- VSCode 확장팩 추천: https://dev.to/rohidisdev/top-10-vscode-extensions-for-react-57g6
- GitHub Actions 공식 문서: https://docs.github.com/ko/actions

---

## ❗️ React 처음인 개발자들을 위한 팁

- 컴포넌트 기반으로 개발합니다. 작은 UI 단위부터 만들어보세요.
- 상태 관리는 Zustand로 합니다. (Redux보다 배우기 쉽고 가볍습니다)
- API 연동은 axios로 진행합니다.
- 코드 포맷팅은 Prettier로 자동화되어 있습니다.

---

## 💡 자주 하는 실수/FAQ

- npm install이 안 될 때
  - Node.js, npm 버전 확인
  - PowerShell 실행 정책(위 안내 참고)
- node_modules 커밋 실수
  - .gitignore에 반드시 추가되어 있음
- VSCode에서 경로 자동완성 안 될 때
  - npm Intellisense 확장팩 설치

---
