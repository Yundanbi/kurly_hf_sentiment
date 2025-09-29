import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <p className="footer-title">고객행복센터</p>
          <p className="footer-phone">
            1644-1107 <span>월~토요일 오전 7시 - 오후 6시</span>
          </p>

          <div className="footer-inquiry">
            <button className="footer-button">카카오톡 문의</button>
            <p className="footer-desc">
              월~토요일 | 오전 7시 - 오후 6시
              <br />
              일/공휴일 | 오전 7시 - 오후 1시
            </p>
          </div>

          <div className="footer-inquiry">
            <button className="footer-button">1:1 문의</button>
            <p className="footer-desc">
              365일 고객센터 운영시간에 순차적으로 답변드리겠습니다.
            </p>
          </div>

          <div className="footer-inquiry">
            <button className="footer-button">대량주문 문의</button>
            <p className="footer-desc">
              월~금요일 | 오전 9시 - 오후 6시
              <br />
              점심시간 | 낮 12시 - 오후 1시
            </p>
          </div>

          <p className="footer-email">비회원 문의 : help@kurlycorp.com</p>
        </div>

        <div className="footer-right">
          <ul className="footer-links">
            <li>컬리소개</li>
            <li>컬리소개영상</li>
            <li>투자정보</li>
            <li>인재채용</li>
            <li>이용약관</li>
            <li>개인정보처리방침</li>
            <li>이용안내</li>
          </ul>

          <div className="footer-company">
            <p>
              법인명 (상호) : 주식회사 컬리 | 사업자등록번호 : 261-81-23567{" "}
              <a href="#">사업자정보 확인</a>
              <br />
              통신판매업 : 제 2018-서울강남-01646 호<br />
              주소 : 서울특별시 강남구 테헤란로 133, 18층(역삼동) | 대표이사 :
              김슬아
              <br />
              채용문의 :{" "}
              <a href="mailto:recruit@kurlycorp.com">recruit@kurlycorp.com</a>
              <br />
              팩스 : 070 - 7500 - 6098
            </p>
          </div>

          <div className="footer-sns">
            <img
              src={process.env.PUBLIC_URL + "/img/footer/1.png"}
              alt="인스타그램"
            />
            <img
              src={process.env.PUBLIC_URL + "/img/footer/2.png"}
              alt="페이스북"
            />
            <img
              src={process.env.PUBLIC_URL + "/img/footer/3.png"}
              alt="블로그"
            />
            <img
              src={process.env.PUBLIC_URL + "/img/footer/4.png"}
              alt="유튜브"
            />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-cert">
          <p>
            [인증정보] 컬리 쇼핑몰 서비스 개발·운영
            <br />
            [유효기간] 2025.01.15 ~ 2028.01.14
          </p>
          <img
            src={process.env.PUBLIC_URL + "/img/footer/5.svg"}
            alt="isms 인증마크"
          />
        </div>
        <div className="footer-bank">
          <p>
            고객님의 안전거래를 위해 현금 등으로 결제 시 저희 쇼핑몰에서 가입한
            우리은행 채무지급보증 서비스를 이용하실 수 있습니다.
          </p>
          <img
            src={process.env.PUBLIC_URL + "/img/footer/6.svg"}
            alt="우리은행 마크"
          />
        </div>
      </div>

      <div className="footer-copy">
        컬리에서 판매되는 상품 중에는 컬리에 입점한 개별 판매자가 판매하는
        마켓플레이스(오픈마켓) 상품이 포함되어 있습니다.
        <br />
        마켓플레이스(오픈마켓) 상품의 경우 컬리는 통신판매중개자로서 통신판매의
        당사자가 아닙니다. 컬리는 해당 상품의 주문, 품질, 교환/환불 등 의무와
        책임을 부담하지 않습니다.
        <br />© KURLY CORP.ALL RIGHTS RESERVED
      </div>
    </footer>
  );
}

export default Footer;
