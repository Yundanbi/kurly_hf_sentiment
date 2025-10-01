Kurly HF Sentiment 🛒

React + Spring Boot + Flask(Hugging Face)로 만든 문의 게시판 + 감성분석 + JWT 권한제어 프로젝트

1) 개요

목표: 마켓컬리 스타일 고객문의 게시판에 AI 감성분석을 접목하고, JWT 기반 작성자/관리자 권한 제어를 구현

핵심 기능

회원가입/로그인(JWT 발급)

게시판 CRUD

감성 분석(부정/중립/긍정) + 유사 문의 추천

작성자 또는 관리자만 수정·삭제

2) 기술 스택
Frontend

React 18, React Router

Axios(인터셉터로 JWT 자동 첨부)

HTML/CSS/JS

Backend (API)

Spring Boot 3, Spring Web, Spring Security, JPA(Hibernate)

MySQL 8.x

JWT (jjwt)

Lombok, Log4j2

AI/NLP (ML 서비스)

Flask 2+

transformers(Hugging Face), nlptown/bert-base-multilingual-uncased-sentiment (예시)

SQLAlchemy (필요 시), requests

3) 아키텍처
React (사용자 입력)
   ↓  POST /sentiment/analyze/json
Spring Boot (중계 API) ──(HTTP)──> Flask (HF 모델 실행)
   ↑           감성 점수(0/1/2) + 유사 문의 리스트
React (UI 표시, 칩/추천)


인증/인가: JWT를 Authorization 헤더(Bearer <token>)로 전달 → Spring Security 필터(JwtAuthFilter)에서 검증 → SecurityContext에 ROLE_USER/ROLE_ADMIN 권한 주입

권한 제어: 서비스 레벨에서 isAdmin || authorId == currentUserId 최종 체크

4) DB 개요 (간단)

users : 회원 정보(아이디 userid, 비밀번호, role, 등)

boards : 문의글(제목/내용/작성자/감성점수 등)

(선택 예정) answers : 문의글에 대한 답변(아직 기능 미구현)

ERD는 users (1) ── (N) boards 기본 구조.
답변 테이블(answers)은 boards (1) ── (0..1) answers(1:1 또는 1:N 중 선택 설계).

5) API 요약
인증

POST /api/auth/login — { userid, password } → { token }

(선택) POST /api/auth/signup

게시판

GET /api/boards — 목록(페이지네이션)

GET /api/boards/{id} — 상세

POST /api/boards — 작성 (JWT 필요)

PUT /api/boards/{id} — 수정 (작성자/관리자만)

DELETE /api/boards/{id} — 삭제 (작성자/관리자만)

감성 분석

POST /sentiment/analyze/json — { review: string }
→ { sentiment: 0|1|2, recommendations: [...] }
(Spring이 Flask /api/analyze에 중계)

6) 보안/권한 (핵심 로직)

JWT 토큰 구성: sub(userid), uid(DB PK), role(ROLE_USER|ROLE_ADMIN)

필터: 토큰 검증 → ROLE_... 권한으로 SecurityContext에 주입

엔드포인트 보호:

GET /boards/** : 공개

POST/PUT/PATCH/DELETE /boards/** : 인증 필요

서비스 레벨 Gate:

if (!isAdmin && !board.getAuthor().getId().equals(currentUserId)) {
    throw new ResponseStatusException(HttpStatus.FORBIDDEN, "권한 없음");
}


프론트: 토큰 디코딩으로 버튼 노출 제어(보안은 서버가 최종 책임)

7) 설치 & 실행
7-1) AI(Flask)
cd flask_app          # 예시 경로
python -m venv .venv
# Windows: .venv\Scripts\activate
source .venv/bin/activate
pip install -r requirements.txt
# 환경변수(선택): DB_URI, HOST/PORT
export FLASK_APP=app.py
flask run --port 5000

7-2) Backend(Spring Boot)

application.yml 예시:

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/kurly?serverTimezone=Asia/Seoul&characterEncoding=UTF-8
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

7-3) Frontend(React)
cd frontend
npm install
npm start  # http://localhost:3000


CORS: Spring CorsConfigurationSource에 http://localhost:3000 허용,
Flask CORS도 동일 원점 허용.

8) 환경 변수(예시)

Spring

APP_JWT_SECRET : JWT 서명 키(256비트 이상 권장)

APP_FLASK_BASE : Flask 베이스 URL (예: http://127.0.0.1:5000)

Flask

DB_URI : MySQL 연결 문자열 (예: mysql+pymysql://user:pw@localhost:3306/kurly?charset=utf8mb4)

HOST, PORT : 서비스 포트

9) 폴더 구조(예시)
root
├─ backend
│  ├─ src/main/java/com/kurly
│  │  ├─ config (SecurityConfig, JwtAuthFilter, JwtUtil)
│  │  ├─ controller (BoardController, AuthController, SentimentController)
│  │  ├─ entity (User, Board, Answer*)
│  │  ├─ repository
│  │  └─ service
│  └─ resources (application.yml)
├─ flask_app
│  ├─ app.py
│  └─ models/sentiment_model.py
└─ frontend
   └─ src (api, pages, components, ...)

10) 트러블슈팅 메모

관리자인데 버튼이 안 보임?
프론트에서 role === "ADMIN" || "ROLE_ADMIN" 모두 허용 확인, 토큰 디코딩 정확히.

403/401 이슈
Spring Security에서 GET만 permitAll, 나머지 인증 필요인지 확인. 필터에서 ROLE_ prefix 보장.

CORS 오류
Spring/Flask 모두 localhost:3000 허용 + Allow-Credentials 설정.

Flask 응답 느림
모델 최초 로딩 시간 고려. 프로덕션은 모델 미리 로드 또는 서빙 최적화.

11) 로드맵(추가 예정)

답변(Answer) CRUD 완성(관리자 답변 등록/수정/노출)

JWT Refresh Token, 로그아웃/만료 UX 개선

모델 응답 캐싱/서빙 최적화

관리자 대시보드(부정 피드백 모니터링)

12) 라이선스

내부 학습/포트폴리오 목적
![001](https://github.com/user-attachments/assets/28448301-9c4d-4c63-9b44-32be9f8d8310)
![002](https://github.com/user-attachments/assets/2f5c23f7-949f-4069-88a9-c9a6d61a0f7d)
![003](https://github.com/user-attachments/assets/f4e338ea-51d0-4148-ba3e-8bb9a1af60f5)
![004](https://github.com/user-attachments/assets/d183096a-a18e-436c-a80c-fdc5ac8606ab)
![005](https://github.com/user-attachments/assets/899914ae-6418-45cf-9df1-d9afea0f5578)
![006](https://github.com/user-attachments/assets/1e608e75-40e1-46e8-aac1-7d52f2c84c7d)
![007](https://github.com/user-attachments/assets/500072c0-21de-4221-8246-4496337db58c)
![008](https://github.com/user-attachments/assets/cdb19e3c-eb8c-4396-8087-b5208dc1f95c)
![009](https://github.com/user-attachments/assets/0a03418e-f97e-4693-836c-5ee507646d81)
![010](https://github.com/user-attachments/assets/59455695-42ea-45bb-8d36-a003bcc28355)
![011](https://github.com/user-attachments/assets/46d7928f-3b19-4924-8803-6630a77df737)
![012](https://github.com/user-attachments/assets/45e40969-e7f8-4ca4-a3ce-3ef6e923ef3f)
![013](https://github.com/user-attachments/assets/96b510fd-5d37-4f44-841b-ee97d8023a67)
![014](https://github.com/user-attachments/assets/fd58ca1b-1d0a-47d4-af32-863030a61cf9)
![015](https://github.com/user-attachments/assets/11e2123c-13d6-4b4a-ba91-b04582d7acdb)
![016](https://github.com/user-attachments/assets/a6d3dd91-f15a-440c-adea-791b95f959de)
![017](https://github.com/user-attachments/assets/7d44a8e2-6a28-4622-aec5-59bf57748ef6)
![018](https://github.com/user-attachments/assets/a07354f8-7443-4be5-9b0e-3022c7748e22)
