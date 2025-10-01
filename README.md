🛒 Kurly Clone Project

Market Kurly 웹사이트를 벤치마킹한 클론 프로젝트입니다.
JWT 기반 인증, 리뷰 감성 분석(HuggingFace), 권한 기반 게시판을 구현했습니다.

📖 프로젝트 개요

프로젝트 기간: 2025.07 ~ 2025.09

목표: 실무 환경을 모사하여 JWT 인증과 AI 감성 분석을 적용한 커머스 플랫폼 구축

담당 역할:

JWT 로그인 & 권한 처리

게시판 CRUD + 페이징

HuggingFace 감성 분석 서버 연동

DB 모델링 및 설계

📊 기술 스택
구분	사용 기술
Backend	Spring Boot, JPA, MySQL, JWT
Frontend	React, Redux, Axios, Styled Components
AI	Flask, HuggingFace Transformers
Infra	GitHub, Postman, IntelliJ, VSCode


✨ 주요 기능
🔑 인증 & 권한

JWT 토큰 기반 로그인 / 회원가입

본인 글만 수정·삭제 가능, 타인의 글은 읽기 전용

📝 게시판

CRUD + 검색 + 페이징

React + Axios API 연동

🤖 감성 분석

HuggingFace 모델로 리뷰 텍스트 감성 점수(긍/부/중립) 계산

Flask 서버와 Spring Boot 연동

🗂 DB 모델링

🚀 실행 방법
# Backend
cd backend
./gradlew bootRun

# Frontend
cd frontend
npm install
npm start

# AI Service
cd kurly_review_app
pip install -r requirements.txt
python app.py

🌟 배운 점 & 개선 사항

JWT 인증 구조와 React 연동의 흐름을 체득

Flask + HuggingFace를 실제 서비스에 적용

ERD 및 규약을 초기에 명확히 정의하는 중요성 체감

추후 개선: 환불 API 연동, CI/CD 파이프라인, 테스트 코드 강화

📸 스크린샷

필요하면 “펼쳐보기”로 접어두면 깔끔합니다.

<details> <summary><b>펼쳐보기 (클릭)</b></summary><br> <img src="https://github.com/user-attachments/assets/28448301-9c4d-4c63-9b44-32be9f8d8310" width="860"/> <img src="https://github.com/user-attachments/assets/2f5c23f7-949f-4069-88a9-c9a6d61a0f7d" width="860"/> <img src="https://github.com/user-attachments/assets/f4e338ea-51d0-4148-ba3e-8bb9a1af60f5" width="860"/> <img src="https://github.com/user-attachments/assets/d183096a-a18e-436c-a80c-fdc5ac8606ab" width="860"/> <img src="https://github.com/user-attachments/assets/899914ae-6418-45cf-9df1-d9afea0f5578" width="860"/> <img src="https://github.com/user-attachments/assets/1e608e75-40e1-46e8-aac1-7d52f2c84c7d" width="860"/> <img src="https://github.com/user-attachments/assets/500072c0-21de-4221-8246-4496337db58c" width="860"/> <img src="https://github.com/user-attachments/assets/cdb19e3c-eb8c-4396-8087-b5208dc1f95c" width="860"/> <img src="https://github.com/user-attachments/assets/0a03418e-f97e-4693-836c-5ee507646d81" width="860"/> <img src="https://github.com/user-attachments/assets/59455695-42ea-45bb-8d36-a003bcc28355" width="860"/> <img src="https://github.com/user-attachments/assets/46d7928f-3b19-4924-8803-6630a77df737" width="860"/> <img src="https://github.com/user-attachments/assets/45e40969-e7f8-4ca4-a3ce-3ef6e923ef3f" width="860"/> <img src="https://github.com/user-attachments/assets/96b510fd-5d37-4f44-841b-ee97d8023a67" width="860"/> <img src="https://github.com/user-attachments/assets/fd58ca1b-1d0a-47d4-af32-863030a61cf9" width="860"/> <img src="https://github.com/user-attachments/assets/11e2123c-13d6-4b4a-ba91-b04582d7acdb" width="860"/> <img src="https://github.com/user-attachments/assets/a6d3dd91-f15a-440c-adea-791b95f959de" width="860"/> <img src="https://github.com/user-attachments/assets/7d44a8e2-6a28-4622-aec5-59bf57748ef6" width="860"/> <img src="https://github.com/user-attachments/assets/a07354f8-7443-4be5-9b0e-3022c7748e22" width="860"/> </details>
