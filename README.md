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
| 회원가입 | ![컬리 회원가입](https://github.com/user-attachments/assets/68755205-7a02-4697-843e-97ffca98d267) |
| 로그인 | ![로그인](https://github.com/user-attachments/assets/56c1e4d9-f675-403a-90b6-a0635b606d3e) |
| 허깅페이스 & 문의남기기 | ![허깅페이스 문의남기기](https://github.com/user-attachments/assets/41fb0946-2f83-4710-87a1-58eec46ae1c3) |
| 어드민으로 문의글 보기 | ![고객게시판 어드민](https://github.com/user-attachments/assets/8276f1ba-86ca-4c8d-ab7b-f38af7eef61c) |
| 회원으로 문의글 보기 | ![일반회원 본인거만 수정 삭제 가능](https://github.com/user-attachments/assets/0956d301-1997-4b5a-9eda-fcff36fbdf6f) |
| 어드민/회원 문의 댓글 보기 | ![어드민시 수정삭제가능 비회원시 읽기만 가능](https://github.com/user-attachments/assets/66e840df-ef4f-4cce-8113-e02aab5c2057) |

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



---


## PPT
![001](https://github.com/user-attachments/assets/ddb962d0-5b58-4438-a7f4-22c5bd8fd37d)
![002](https://github.com/user-attachments/assets/47f3793a-401f-4212-aed2-31e94a5e9890)
![003](https://github.com/user-attachments/assets/f1e20018-1632-455d-a125-0f6e8ee64204)
![004](https://github.com/user-attachments/assets/a58bd494-c1ad-4a9e-ada0-d96dd65a42ca)
![005](https://github.com/user-attachments/assets/7841e313-231c-476b-ac83-59add53275f1)
![006](https://github.com/user-attachments/assets/22f6bfaf-a8d9-43e6-84c1-36c2e99ff7b9)
![007](https://github.com/user-attachments/assets/87928782-3f96-4fa7-88ac-3119ebc0fb90)
![008](https://github.com/user-attachments/assets/e0e36d32-f47c-45af-abe7-88479ea8585b)
![009](https://github.com/user-attachments/assets/bf6a7efd-e00a-4b3b-becb-3932a977adef)
![010](https://github.com/user-attachments/assets/b5d4a7ea-874c-47fb-b71d-c996e0991a9e)
![011](https://github.com/user-attachments/assets/87e46ad8-5273-48a6-b4e3-c7370c175abc)
![012](https://github.com/user-attachments/assets/a4ab1a4f-1f3e-4bb4-9aca-9bb693441bb9)
![013](https://github.com/user-attachments/assets/947d0046-3339-4b30-a01a-3543428199ad)
![014](https://github.com/user-attachments/assets/a2811a30-ae3e-4075-a610-ea3385d75559)
![015](https://github.com/user-attachments/assets/02d4cb23-0161-4228-9b8e-cac2f3ea4951)
![016](https://github.com/user-attachments/assets/e58a11ca-ef21-45d3-a87a-034380f9b50d)
![017](https://github.com/user-attachments/assets/96d8955a-1891-4d01-89e4-d74f38603b47)
![018](https://github.com/user-attachments/assets/367e4e16-26c5-42bb-a700-b92f3f118e4c)


