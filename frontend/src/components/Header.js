import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("token")
  );
  const [username, setUsername] = useState(
    () => localStorage.getItem("username") || ""
  );

  // username 없으면 토큰 payload에서 username/name/sub를 시도
  const deriveName = useCallback(() => {
    const stored = localStorage.getItem("username");
    if (stored) return stored;
    const t = localStorage.getItem("token");
    if (!t || !t.includes(".")) return "";
    try {
      const payload = JSON.parse(atob(t.split(".")[1] || ""));
      return payload.username || payload.name || payload.sub || "";
    } catch {
      return "";
    }
  }, []);

  const syncAuth = useCallback(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("username");
    console.log("[Header] syncAuth", { t: !!t, u });
    setIsLoggedIn(!!t);
    setUsername(deriveName());
  }, [deriveName]);

  // 같은 탭에서 로그인/로그아웃 시 즉시 반영
  useEffect(() => {
    window.addEventListener("auth:changed", syncAuth);
    return () => window.removeEventListener("auth:changed", syncAuth);
  }, [syncAuth]);

  // 라우트 변경 때도 동기화(로그인 후 navigate 직후 반영)
  useEffect(() => {
    syncAuth();
  }, [syncAuth, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    // 상태 반영 + 리스너 통지
    syncAuth();
    window.dispatchEvent(new Event("auth:changed"));
    navigate("/login");
  };

  return (
    <>
      <div className="coupon-banner">
        <div>지금 가입하고 최대 1만원 할인쿠폰 받아가세요</div>
      </div>

      <div id="banner">
        <div className="login">
          <ul>
            {!isLoggedIn ? (
              <>
                <li>
                  <button onClick={() => navigate("/signup")}>회원가입</button>
                </li>
                <li>|</li>
                <li>
                  <button onClick={() => navigate("/login")}>로그인</button>
                </li>
              </>
            ) : (
              <>
                <li>{username ? `${username}님` : "로그인됨"}</li>
                <li>|</li>
                <li>
                  <button onClick={handleLogout}>로그아웃</button>
                </li>
              </>
            )}
            <li>|</li>
            <li>
              <Nav.Link onClick={() => navigate("/board")}>고객센터</Nav.Link>
            </li>
            <li>|</li>
            <li>
              <Nav.Link onClick={() => navigate("/board")}>게시판</Nav.Link>
            </li>
          </ul>
        </div>

        <div id="middle-banner">
          <div id="middle-container">
            <div className="left-box">
              {/* 경로 대소문자 통일 */}
              <Link to="/home">
                <div className="logo" />
              </Link>
              <ul className="logo-right-name">
                <li className="purple">
                  <Link to="/home">마켓컬리</Link>
                </li>
                <li>|</li>
                <li>
                  <Link to="#">뷰티컬리</Link>
                </li>
              </ul>
            </div>

            <div className="search-box">
              <input type="text" placeholder="검색어를 입력해주세요" />
              <button type="submit">
                <img
                  src={process.env.PUBLIC_URL + "/img/search.svg"}
                  alt="검색"
                />
              </button>
            </div>

            <div className="login-icons">
              {!isLoggedIn ? (
                <>
                  <Link to="/login">
                    <img
                      src={process.env.PUBLIC_URL + "/img/login1.svg"}
                      alt="로그인"
                    />
                  </Link>
                  <Link to="/signup">
                    <img
                      src={process.env.PUBLIC_URL + "/img/login2.svg"}
                      alt="회원가입"
                    />
                  </Link>
                </>
              ) : (
                <>
                  <Link to="#">
                    <img
                      src={process.env.PUBLIC_URL + "/img/login1.svg"}
                      alt="마이페이지"
                    />
                  </Link>
                </>
              )}
              <Link to="/cart">
                <img
                  src={process.env.PUBLIC_URL + "/img/login3.svg"}
                  alt="장바구니"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Navbar className="kurly-navbar">
        <Container className="kurly-container">
          <div className="navbar-center">
            <Nav className="center-menu">
              <img
                src={process.env.PUBLIC_URL + "/img/category.svg"}
                alt="카테고리"
              />
              <Nav.Link href="#">카테고리</Nav.Link>
              <Nav.Link href="#">신상품</Nav.Link>
              <Nav.Link href="#">베스트</Nav.Link>
              <Nav.Link href="#">알뜰쇼핑</Nav.Link>
              <Nav.Link href="#">특가/혜택</Nav.Link>
              <button>
                <span>샛별·하루</span> 배송안내
              </button>
            </Nav>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
