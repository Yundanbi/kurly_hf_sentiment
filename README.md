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

## 🔗 ERD
 ![005](https://github.com/user-attachments/assets/7841e313-231c-476b-ac83-59add53275f1)


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

## 🖥️ 구현 화면
| 기능 | 화면 |
|---|---|
| 회원가입 | ![컬리 회원가입](https://github.com/user-attachments/assets/68755205-7a02-4697-843e-97ffca98d267) |
| 로그인 | ![로그인](https://github.com/user-attachments/assets/56c1e4d9-f675-403a-90b6-a0635b606d3e) |
| 허깅페이스 & 문의남기기 | ![허깅페이스 문의남기기](https://github.com/user-attachments/assets/41fb0946-2f83-4710-87a1-58eec46ae1c3) |
| 어드민으로 문의글 보기 | ![고객게시판 어드민](https://github.com/user-attachments/assets/8276f1ba-86ca-4c8d-ab7b-f38af7eef61c) |
| 회원으로 문의글 보기 | ![일반회원 본인거만 수정 삭제 가능](https://github.com/user-attachments/assets/0956d301-1997-4b5a-9eda-fcff36fbdf6f) |
| 어드민/회원 문의 댓글 보기 | ![어드민시 수정삭제가능 비회원시 읽기만 가능](https://github.com/user-attachments/assets/66e840df-ef4f-4cce-8113-e02aab5c2057) |

---


---

## 🔍 트러블슈팅 사례
- **CORS 에러 해결**: React ↔ Spring Boot ↔ Flask 3단 구조에서 발생한 CORS 문제를 `CorsConfigurationSource` 설정으로 해결  
- **Lazy Loading 직렬화 이슈**: `Board` 조회 시 `author` / `answer` Fetch Join, DTO Projection으로 최적화  
- **JWT 401/403**: `JwtAuthFilter`에서 화이트리스트 경로 지정, ROLE prefix 표준화(`ROLE_ADMIN`)  

---



## PPT
![001](https://github.com/user-attachments/assets/d2b93927-3403-40f3-b5e2-671c2e52c22f)
![002](https://github.com/user-attachments/assets/e1705a8d-b064-4832-8ed4-0b0c8c4d108f)
![003](https://github.com/user-attachments/assets/89807741-8804-4356-a81d-fc7bc2139df7)
![004](https://github.com/user-attachments/assets/249de712-7b75-46bb-9b1b-d6b7667261fa)
![005](https://github.com/user-attachments/assets/033b3c63-ed04-496f-88b2-2a4df83252ef)
![006](https://github.com/user-attachments/assets/28a15f9a-6586-40cf-a7a8-099d9f43314a)
![007](https://github.com/user-attachments/assets/d0c48505-ee4f-490a-b966-372d7dce636b)
![008](https://github.com/user-attachments/assets/bca957bc-baa2-4d70-9b29-467585a99cf5)
![009](https://github.com/user-attachments/assets/7ccde844-54fb-4bf4-b1b4-0a88b1b1da6d)
![010](https://github.com/user-attachments/assets/4c61e995-7459-4f7b-abf7-dd4a754df4e3)
![011](https://github.com/user-attachments/assets/9770a8fe-c9ae-494f-b356-7ef41d94740c)
![012](https://github.com/user-attachments/assets/5711b433-ed5a-41ec-a0f5-3a60e27d2904)
![013](https://github.com/user-attachments/assets/8ac5c55a-733c-48ee-9326-e082e37582cf)
![014](https://github.com/user-attachments/assets/a8c99e6a-5626-42cd-8f38-1a288e0f599e)
![015](https://github.com/user-attachments/assets/8f6676a9-1883-4950-8912-8a683fae78a7)
![016](https://github.com/user-attachments/assets/86529541-1a8e-46e7-a6bc-230fb63ba905)
![017](https://github.com/user-attachments/assets/87eea1a6-8797-4ad9-b8e2-891b2a1aed9c)
![018](https://github.com/user-attachments/assets/0b8c590c-0c1b-4c3a-8b6f-3a7ddd3bffca)


