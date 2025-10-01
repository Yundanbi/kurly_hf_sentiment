<div align="center">
🛒 Kurly HF Sentiment

<sub>React + Spring Boot + Flask(Hugging Face) 기반 고객문의 게시판 & 감성분석 & JWT 권한제어</sub>

</div>
<h2>📌 1. 프로젝트 개요</h2>
<p style="font-size:16px"> <strong>목표</strong>: 마켓컬리 스타일 고객문의 게시판에 <b>AI 감성분석</b>을 적용하고 <b>JWT 기반 작성자/관리자 권한 제어</b>를 구현 </p>

핵심 기능

✅ 회원가입 / 로그인 (JWT 발급)

✅ 게시판 CRUD

✅ 감성 분석 (부정 / 중립 / 긍정) + 유사 문의 추천

✅ 작성자 또는 관리자만 수정·삭제 가능

<h2>🛠️ 2. 기술 스택</h2>
🔹 Frontend

React 18, React Router

Axios (JWT 자동 첨부)

HTML / CSS / JS

🔹 Backend (API)

Spring Boot 3

Spring Security, JPA (Hibernate)

MySQL 8.x

JWT (jjwt)

Lombok, Log4j2

🔹 AI / NLP (ML 서비스)

Flask 2+

Hugging Face Transformers

모델: nlptown/bert-base-multilingual-uncased-sentiment

SQLAlchemy, requests

<h2>🏗️ 3. 아키텍처</h2>
flowchart TD
    A[React UI] -->|POST /sentiment/analyze/json| B(Spring Boot API)
    B -->|HTTP| C[Flask - Hugging Face 모델]
    C -->|감성 점수 + 유사 문의| B
    B --> A


인증/인가:
JWT → JwtAuthFilter → SecurityContext에 ROLE_USER / ROLE_ADMIN 권한 주입

권한 제어:
isAdmin || authorId == currentUserId

<h2>🗄️ 4. DB 구조</h2>

users: 회원 정보 (userid, password, role …)

boards: 문의글 (제목, 내용, 작성자, 감성 점수 …)

answers (예정): 문의글 답변

<h2>🔗 5. API 요약</h2>
<pre> POST /api/auth/login → { token } GET /api/boards → 게시글 목록 GET /api/boards/{id} → 상세 조회 POST /api/boards → 작성 (JWT 필요) PUT /api/boards/{id} → 수정 (작성자/관리자만) DEL /api/boards/{id} → 삭제 (작성자/관리자만) POST /sentiment/analyze/json → { sentiment: 0|1|2, recommendations: [...] } </pre>
<h2>🔒 6. 보안 / 권한</h2>

JWT 토큰 구조:

sub: userid
uid: DB PK
role: ROLE_USER | ROLE_ADMIN


Java 권한 체크 예시:

if (!isAdmin && !board.getAuthor().getId().equals(currentUserId)) {
    throw new ResponseStatusException(HttpStatus.FORBIDDEN, "권한 없음");
}

<h2>⚙️ 7. 설치 & 실행</h2>
① Flask (AI 서버)
cd flask_app
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
flask run --port 5000

② Spring Boot (Backend)

application.yml

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/kurly
    username: root
    password: root


실행:

./mvnw spring-boot:run

③ React (Frontend)
cd frontend
npm install
npm start

<h2>📸 8. 실행 화면</h2>
<div align="center"> <img src="https://github.com/user-attachments/assets/28448301-9c4d-4c63-9b44-32be9f8d8310" width="500"/> <img src="https://github.com/user-attachments/assets/2f5c23f7-949f-4069-88a9-c9a6d61a0f7d" width="500"/> <img src="https://github.com/user-attachments/assets/a07354f8-7443-4be5-9b0e-3022c7748e22" width="500"/> </div>
<h2>🚀 9. 로드맵</h2>

 답변(Answer) CRUD

 JWT Refresh Token

 관리자 대시보드

<h2>📜 10. 라이선스</h2>
<p style="font-size:14px"> 본 프로젝트는 <b>학습 / 포트폴리오 목적</b>으로만 사용됩니다. </p>

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
