import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Footer from "./Footer";
import Header from "./Header";
import api from "../api/axiosConfig";

function Login() {
  const [userid, setUserid] = useState(""); // id → userid
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!userid || !password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/api/auth/login", { userid, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username || "사용자");

      navigate("/home");
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        "로그인에 실패했습니다. 아이디/비밀번호를 확인해주세요.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <>
      <div className="login-container">
        <h2 className="login-title">로그인</h2>

        <input
          type="text"
          placeholder="아이디를 입력해주세요"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
          onKeyDown={onKeyDown}
          className="login-input"
          autoComplete="username"
        />

        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={onKeyDown}
          className="login-input"
          autoComplete="current-password"
        />

        {error && <div className="login-error">{error}</div>}

        <div className="login-links">
          <span>아이디 찾기</span> | <span>비밀번호 찾기</span>
        </div>

        <button className="login-btn" onClick={handleLogin} disabled={loading}>
          {loading ? "로그인 중..." : "로그인"}
        </button>

        <button
          className="signup-btn"
          onClick={() => navigate("/signup")}
          disabled={loading}
        >
          회원가입
        </button>
      </div>
    </>
  );
}

export default Login;
