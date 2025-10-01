<!-- 헤더: 타이틀 + 배지 (가운데 정렬) -->
<h1 align="center">🛒 Kurly JWT Hugging Face Project</h1>
<p align="center">
  Market Kurly 웹을 벤치마킹한 <b>클론 프로젝트</b>입니다.<br/>
  <b>JWT 인증</b>, <b>권한 기반 게시판</b>, <b>HuggingFace 감성 분석</b>을 구현했습니다.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white"/>
  <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=flat&logo=springboot&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white"/>
  <img src="https://img.shields.io/badge/HuggingFace-FFD21E?style=flat&logo=huggingface&logoColor=black"/>
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white"/>
</p>

---

## 🔗 Quick Links
- 👉 StayFolio 팀 레포: https://github.com/Spring-team-Project2025/stay_folio_main  
- 👉 시스템 다이어그램/테이블 정의: https://spring-team-project2025.github.io/stay_folio_documents/

---

## 📖 프로젝트 개요
- **프로젝트 기간:** 2025.07 ~ 2025.09  
- **목표:** 실무 환경을 모사하여 <b>JWT 인증</b>과 <b>AI 감성 분석</b>을 적용한 커머스 플랫폼 구축  
- **담당 역할(개인):**
  - JWT 로그인 & 권한 처리
  - 게시판 CRUD + 페이징
  - HuggingFace 감성 분석 서버 연동
  - DB 모델링 및 설계

---

## 🛠 Tech Stack (요약)
**말로 한 줄 요약:**  
Spring Boot + React + MySQL 기반. JWT 인증/인가, Flask(HuggingFace)로 감성 분석, GitHub 협업.

**불릿형:**  
- **Backend:** Spring Boot 3.5.x, JPA, MySQL, JWT  
- **Frontend:** React, Redux, Axios, React Router, Styled Components  
- **AI Service:** Python Flask, HuggingFace Transformers  
- **Infra/Tools:** GitHub, Postman, IntelliJ, VSCode, SourceTree

**표 버전:**

| 구분        | 사용 기술 |
|-------------|-----------|
| **Backend** | Spring Boot, JPA, MySQL, JWT |
| **Frontend** | React, Redux, Axios, Styled Components, React Router |
| **AI** | Flask, HuggingFace Transformers |
| **Infra/Tools** | GitHub, Postman, IntelliJ, VSCode, SourceTree |

---

## ✨ 주요 기능
### 🔑 인증 & 권한
- JWT 토큰 기반 로그인/회원가입  
- **본인 글만 수정·삭제**, 타인의 글은 읽기 전용

### 📝 게시판
- CRUD + 검색 + 페이징  
- React + Axios API 연동

### 🤖 감성 분석
- HuggingFace 모델로 리뷰 텍스트 **긍/부/중립** 점수 산출  
- Flask 서브 서버 ↔ Spring Boot 연동

---

## 🗂 DB/시스템 다이어그램
> 전체 테이블 구조 및 컬럼 정의는 링크에서 확인  
> 👉 https://spring-team-project2025.github.io/stay_folio_documents/

<details>
  <summary><b>다이어그램 (펼쳐보기)</b></summary>
  <br/>
  <img width="1372" height="772" src="https://github.com/user-attachments/assets/90e91772-b9ea-4626-a83d-4da307c483ff" />
  <img width="1370" height="773" src="https://github.com/user-attachments/assets/d574e1a7-b840-43ee-be4f-41f8462f34ea" />
  <img width="1369" height="769" src="https://github.com/user-attachments/assets/913c1b56-9f8d-4caf-b3bf-381f1176c287" />
  <img width="1371" height="770" src="https://github.com/user-attachments/assets/1867a4d6-9691-49fc-a91c-cafd11dc76db" />
  <img width="1371" height="770" src="https://github.com/user-attachments/assets/58244710-cf7c-4434-a0f2-9ec6d7930d8b" />
  <img width="1372" height="769" src="https://github.com/user-attachments/assets/c6e272e9-9b04-4b7b-9b18-8ac75f83b36a" />
</details>

---

## 🖥️ 구현 화면
| 기능 | 화면 |
|---|---|
| 숙소<br/>검색/결과 | ![검색결과](https://github.com/user-attachments/assets/38572938-5657-4464-8519-1830db869487) |
| 회원예약 페이지 | ![회원예약](https://github.com/user-attachments/assets/d9030c84-e6d7-4b4d-9894-b2a0db84650f) |
| 비회원 예약 페이지 | ![비회원예약](https://github.com/user-attachments/assets/d13558b1-1b18-4c29-b64c-5f3957caff70) |
| 비회원 예약확인/취소 | ![비회원취소](https://github.com/user-attachments/assets/6caba93e-0f63-4ccf-ac71-a11346d7af62) |

<details>
  <summary><b>📸 추가 스크린샷 (펼쳐보기)</b></summary><br>
  <img src="https://github.com/user-attachments/assets/28448301-9c4d-4c63-9b44-32be9f8d8310" width="860"/>
  <img src="https://github.com/user-attachments/assets/2f5c23f7-949f-4069-88a9-c9a6d61a0f7d" width="860"/>
  <img src="https://github.com/user-attachments/assets/f4e338ea-51d0-4148-ba3e-8bb9a1af60f5" width="860"/>
  <img src="https://github.com/user-attachments/assets/d183096a-a18e-436c-a80c-fdc5ac8606ab" width="860"/>
  <img src="https://github.com/user-attachments/assets/899914ae-6418-45cf-9df1-d9afea0f5578" width="860"/>
  <img src="https://github.com/user-attachments/assets/1e608e75-40e1-46e8-aac1-7d52f2c84c7d" width="860"/>
  <img src="https://github.com/user-attachments/assets/500072c0-21de-4221-8246-4496337db58c" width="860"/>
  <img src="https://github.com/user-attachments/assets/cdb19e3c-eb8c-4396-8087-b5208dc1f95c" width="860"/>
  <img src="https://github.com/user-attachments/assets/0a03418e-f97e-4693-836c-5ee507646d81" width="860"/>
  <img src="https://github.com/user-attachments/assets/59455695-42ea-45bb-8d36-a003bcc28355" width="860"/>
</details>

---

## 🔑 담당 기능 (상세)
### 1) 예약 로직
- 체크인/체크아웃 처리, 숙박일수 계산  
- 날짜·인원별 요금 계산 + 할인율 적용 → **총 결제 금액 산출**  
- 예약 완료 시 예약번호 자동 생성 (MyBatis `<selectKey>` + Oracle 시퀀스)

### 2) 비회원 예약 조회/취소
- 이메일 인증 기반 비회원 조회  
- **예약완료 & 당일 이전** 조건일 때 취소 버튼 노출/처리

### 3) 숙소 검색
- 카테고리/날짜/인원수 파라미터 기반 검색  
- JSP 페이징 + 검색 조건 유지 (hidden + querystring)

---

## 🚀 실행 방법
```bash
# Backend
cd backend
./gradlew bootRun

# Frontend
cd frontend
npm install
npm start

# AI Service (Flask)
cd kurly_review_app
pip install -r requirements.txt
python app.py

📸 스크린샷

필요하면 “펼쳐보기”로 접어두면 깔끔합니다.

<details> <summary><b>펼쳐보기 (클릭)</b></summary><br> <img src="https://github.com/user-attachments/assets/28448301-9c4d-4c63-9b44-32be9f8d8310" width="860"/> <img src="https://github.com/user-attachments/assets/2f5c23f7-949f-4069-88a9-c9a6d61a0f7d" width="860"/> <img src="https://github.com/user-attachments/assets/f4e338ea-51d0-4148-ba3e-8bb9a1af60f5" width="860"/> <img src="https://github.com/user-attachments/assets/d183096a-a18e-436c-a80c-fdc5ac8606ab" width="860"/> <img src="https://github.com/user-attachments/assets/899914ae-6418-45cf-9df1-d9afea0f5578" width="860"/> <img src="https://github.com/user-attachments/assets/1e608e75-40e1-46e8-aac1-7d52f2c84c7d" width="860"/> <img src="https://github.com/user-attachments/assets/500072c0-21de-4221-8246-4496337db58c" width="860"/> <img src="https://github.com/user-attachments/assets/cdb19e3c-eb8c-4396-8087-b5208dc1f95c" width="860"/> <img src="https://github.com/user-attachments/assets/0a03418e-f97e-4693-836c-5ee507646d81" width="860"/> <img src="https://github.com/user-attachments/assets/59455695-42ea-45bb-8d36-a003bcc28355" width="860"/> <img src="https://github.com/user-attachments/assets/46d7928f-3b19-4924-8803-6630a77df737" width="860"/> <img src="https://github.com/user-attachments/assets/45e40969-e7f8-4ca4-a3ce-3ef6e923ef3f" width="860"/> <img src="https://github.com/user-attachments/assets/96b510fd-5d37-4f44-841b-ee97d8023a67" width="860"/> <img src="https://github.com/user-attachments/assets/fd58ca1b-1d0a-47d4-af32-863030a61cf9" width="860"/> <img src="https://github.com/user-attachments/assets/11e2123c-13d6-4b4a-ba91-b04582d7acdb" width="860"/> <img src="https://github.com/user-attachments/assets/a6d3dd91-f15a-440c-adea-791b95f959de" width="860"/> <img src="https://github.com/user-attachments/assets/7d44a8e2-6a28-4622-aec5-59bf57748ef6" width="860"/> <img src="https://github.com/user-attachments/assets/a07354f8-7443-4be5-9b0e-3022c7748e22" width="860"/> </details>
