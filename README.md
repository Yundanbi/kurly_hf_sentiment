<div align="center"> <img src="https://img.shields.io/badge/Kurly%20HF%20Sentiment-%20-5f0080?style=for-the-badge&labelColor=5f0080&color=5f0080&logo=github&logoColor=white" height="28"/>
🛒 Kurly HF Sentiment

<sub>React + Spring Boot + Flask(Hugging Face) 기반 고객문의 게시판 · 감성분석 · JWT 권한제어</sub>

<br/>

<a href="#-데모">🎬 Demo</a> •
<a href="#-주요-기능">✨ Features</a> •
<a href="#-기술-스택">🛠 Tech</a> •
<a href="#-아키텍처">🏗 Arch</a> •
<a href="#-설치--실행">⚙ Setup</a> •
<a href="#-스크린샷">📸 Screens</a>

<br/><br/>

</div>
🎬 데모

영상 파일을 저장소 Releases나 user-attachments에 올린 뒤 아래처럼 넣어줘.

<!-- 방법 A: 썸네일 클릭→영상(mp4) 링크 --> <a href="YOUR_DEMO_VIDEO_URL.mp4"> <img src="YOUR_THUMBNAIL_IMAGE_URL.png" alt="Demo" width="820"/> </a> <!-- 방법 B: GIF 미리보기 --> <!-- <img src="YOUR_DEMO_GIF_URL.gif" alt="Demo GIF" width="820"/> -->

Tip
• GitHub는 외부 <video> 스트리밍 제약이 있어요. MP4는 첨부 링크 클릭, 또는 GIF로 미리보기 권장.
• 유튜브 쓸 거면 썸네일 클릭 → 유튜브로 이동 링크 방식을 추천.

✨ 주요 기능

회원가입/로그인 JWT 인증

게시판 CRUD

입력 글 감성 분석(부정/중립/긍정) + 유사 문의 추천

작성자/관리자만 수정·삭제 (JWT 토큰의 사용자 ID ↔ 작성자 ID 검증)

🛠 기술 스택

Frontend

React 18, React Router, Axios(인터셉터)

HTML / CSS / JavaScript

Backend

Spring Boot 3, Spring Web, Spring Security, JPA(Hibernate)

MySQL 8.x, Lombok, Log4j2

JWT (jjwt)

AI / NLP

Flask 2+

Hugging Face transformers
모델: nlptown/bert-base-multilingual-uncased-sentiment

(옵션) SQLAlchemy, requests

🏗 아키텍처
flowchart TD
  A[React UI] -->|POST /sentiment/analyze/json| B(Spring Boot API)
  B -->|HTTP| C[Flask<br/>Hugging Face Model]
  C -->|sentiment(0/1/2), recommendations| B
  B --> A


인증/인가: JWT → JwtAuthFilter 검증 → SecurityContext에 ROLE_USER/ROLE_ADMIN 주입

권한 Gate(서비스 레벨): isAdmin || authorId == currentUserId

⚙ 설치 & 실행
1) Flask (AI)
cd flask_app
python -m venv .venv
# Windows: .venv\Scripts\activate
source .venv/bin/activate
pip install -r requirements.txt
flask run --port 5000

2) Spring Boot (Backend)

application.yml

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/kurly
    username: root
    password: root
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

app:
  jwt:
    secret: mysecretkeymysecretkeymysecretkey1234
  flask:
    base: http://127.0.0.1:5000


실행:

./mvnw spring-boot:run

3) React (Frontend)
cd frontend
npm install
npm start   # http://localhost:3000


CORS: Spring/Flask 모두 http://localhost:3000 허용.
Axios 인터셉터에서 Authorization: Bearer <token> 자동 첨부.

🔗 API 요약

Auth

POST /api/auth/login → { token }

POST /api/auth/signup (옵션)

Board

GET /api/boards, GET /api/boards/{id}

POST /api/boards (JWT)

PUT /api/boards/{id} (작성자/관리자)

DELETE /api/boards/{id} (작성자/관리자)

Sentiment

POST /sentiment/analyze/json → { sentiment: 0|1|2, recommendations: [...] }

🔒 권한/보안 메모
// 서비스 레벨 보루
if (!isAdmin && !board.getAuthor().getId().equals(currentUserId)) {
    throw new ResponseStatusException(HttpStatus.FORBIDDEN, "권한 없음");
}


엔드포인트: GET /boards/** 공개, 그 외 인증 필요

프론트는 버튼 노출 제어(참고용)이고, 최종 보안은 서버에서 강제

📸 스크린샷
<details> <summary><b>펼쳐보기</b></summary> <img src="https://github.com/user-attachments/assets/28448301-9c4d-4c63-9b44-32be9f8d8310" width="840"/> <img src="https://github.com/user-attachments/assets/2f5c23f7-949f-4069-88a9-c9a6d61a0f7d" width="840"/> <img src="https://github.com/user-attachments/assets/f4e338ea-51d0-4148-ba3e-8bb9a1af60f5" width="840"/> <img src="https://github.com/user-attachments/assets/d183096a-a18e-436c-a80c-fdc5ac8606ab" width="840"/> <img src="https://github.com/user-attachments/assets/899914ae-6418-45cf-9df1-d9afea0f5578" width="840"/> <img src="https://github.com/user-attachments/assets/1e608e75-40e1-46e8-aac1-7d52f2c84c7d" width="840"/> <img src="https://github.com/user-attachments/assets/500072c0-21de-4221-8246-4496337db58c" width="840"/> <img src="https://github.com/user-attachments/assets/cdb19e3c-eb8c-4396-8087-b5208dc1f95c" width="840"/> <img src="https://github.com/user-attachments/assets/0a03418e-f97e-4693-836c-5ee507646d81" width="840"/> <img src="https://github.com/user-attachments/assets/59455695-42ea-45bb-8d36-a003bcc28355" width="840"/> <img src="https://github.com/user-attachments/assets/46d7928f-3b19-4924-8803-6630a77df737" width="840"/> <img src="https://github.com/user-attachments/assets/45e40969-e7f8-4ca4-a3ce-3ef6e923ef3f" width="840"/> <img src="https://github.com/user-attachments/assets/96b510fd-5d37-4f44-841b-ee97d8023a67" width="840"/> <img src="https://github.com/user-attachments/assets/fd58ca1b-1d0a-47d4-af32-863030a61cf9" width="840"/> <img src="https://github.com/user-attachments/assets/11e2123c-13d6-4b4a-ba91-b04582d7acdb" width="840"/> <img src="https://github.com/user-attachments/assets/a6d3dd91-f15a-440c-adea-791b95f959de" width="840"/> <img src="https://github.com/user-attachments/assets/7d44a8e2-6a28-4622-aec5-59bf57748ef6" width="840"/> <img src="https://github.com/user-attachments/assets/a07354f8-7443-4be5-9b0e-3022c7748e22" width="840"/> </details>
🧭 로드맵

 답변(Answer) CRUD

 JWT Refresh Token / 로그아웃 UX

 관리자 대시보드(부정 피드백 모니터링)

 모델 응답 최적화 & 캐싱

📄 라이선스

학습 / 포트폴리오 목적
