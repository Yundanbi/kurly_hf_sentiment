import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "./Signup.css"; // 선택: 스타일 분리 시

function Signup() {
  const navigate = useNavigate();

  // 폼 상태
  const [form, setForm] = useState({
    userid: "",
    password: "",
    password2: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    detailAddress: "",
    gender: "선택안함", // 남자 | 여자 | 선택안함
    birthday: "", // YYYY-MM-DD
    referrer: "", // UI만. 현재는 전송 안 함
  });

  useEffect(() => {
    if (window.daum?.Postcode) return; // 이미 로드됨
    const s = document.createElement("script");
    s.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    s.async = true;
    document.body.appendChild(s);
    return () => {
      // 보통은 유지해도 되지만, 엄격히 정리하려면 제거
      // document.body.removeChild(s);
    };
  }, []);
  const openPostcode = useCallback(() => {
    if (!window.daum?.Postcode) {
      alert("우편번호 스크립트가 아직 로드되지 않았습니다.");
      return;
    }
    new window.daum.Postcode({
      oncomplete: (data) => {
        const roadAddr = data.roadAddress;
        let extra = "";
        if (data.bname && /[동|로|가]$/g.test(data.bname)) extra += data.bname;
        if (data.buildingName && data.apartment === "Y") {
          extra += (extra ? ", " : "") + data.buildingName;
        }
        if (extra) extra = ` (${extra})`;

        // 최종 주소(도로명 없으면 지번)
        const finalAddr = (roadAddr || data.jibunAddress) + (extra || "");

        // 폼에 바로 주입
        setForm((s) => ({
          ...s,
          address: finalAddr,
        }));
      },
    }).open();
  }, []);

  // 약관 동의
  const [agree, setAgree] = useState({
    all: false,
    terms: false, // 이용약관동의(필수)
    privacy: false, // 개인정보 수집·이용 동의(필수)
    over14: false, // 만 14세 이상(필수)
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 입력 핸들러
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  // 동의 핸들러
  const toggleAll = () => {
    const next = !agree.all;
    setAgree({
      all: next,
      terms: next,
      privacy: next,
      over14: next,
    });
  };
  const toggleOne = (key) => {
    const next = !agree[key];
    const nextState = { ...agree, [key]: next };
    nextState.all = nextState.terms && nextState.privacy && nextState.over14;
    setAgree(nextState);
  };

  // 간단 검증
  const validate = () => {
    const id = form.userid.trim();
    const pw = form.password;
    const pw2 = form.password2;
    const nm = form.username.trim();
    const em = form.email.trim();
    const ph = form.phone.replace(/\D/g, "");
    const bd = form.birthday;

    if (!id) return "아이디를 입력해주세요.";
    if (!/^[a-zA-Z0-9_-]{4,20}$/.test(id))
      return "아이디는 4~20자 영문/숫자/_/- 만 가능합니다.";
    if (!pw) return "비밀번호를 입력해주세요.";
    if (pw.length < 6) return "비밀번호는 6자 이상으로 입력해주세요.";
    if (pw !== pw2) return "비밀번호가 일치하지 않습니다.";
    if (!nm) return "이름을 입력해주세요.";
    if (!em || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em))
      return "올바른 이메일을 입력해주세요.";
    if (!ph || ph.length < 9) return "올바른 휴대폰 번호를 입력해주세요.";
    if (!agree.terms || !agree.privacy || !agree.over14)
      return "필수 약관에 동의해주세요.";
    if (bd && !/^\d{4}-\d{2}-\d{2}$/.test(bd))
      return "생년월일은 YYYY-MM-DD 형식입니다.";

    return null;
  };

  const handleSignup = async () => {
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError("");
    setLoading(true);

    try {
      // 백엔드가 소문자 처리 하긴 하지만, 프론트에서 미리 깔끔하게
      const genderMap = { 남자: "MALE", 여자: "FEMALE", 선택안함: "NONE" };
      const payload = {
        userid: form.userid.trim().toLowerCase(),
        password: form.password,
        username: form.username.trim(),
        email: form.email.trim(),
        phone: form.phone.replace(/\D/g, ""),
        address: form.address.trim(),
        detailAddress: form.detailAddress.trim(),
        gender: genderMap[form.gender] || "NONE",
        birthday: form.birthday, // "YYYY-MM-DD" (빈값 허용)
        // referrer: form.referrer  // ← DTO에 추가하면 여기서 전송
      };

      const res = await api.post("/api/auth/signup", payload);
      alert(res?.data || "회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (e) {
      const msg =
        e?.response?.data ||
        e?.response?.data?.message ||
        e?.message ||
        "회원가입에 실패했습니다.";
      setError(typeof msg === "string" ? msg : "회원가입에 실패했습니다.");
      console.error("[signup error]", e);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") handleSignup();
  };

  return (
    <div className="signup-wrap">
      <h2 className="signup-title">회원가입</h2>

      {/* 아이디 */}
      <label className="signup-label">아이디</label>
      <input
        name="userid"
        value={form.userid}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="아이디를 입력해주세요"
        className="signup-input"
      />

      {/* 비밀번호 */}
      <label className="signup-label">비밀번호</label>
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="비밀번호를 입력해주세요"
        className="signup-input"
        autoComplete="new-password"
      />

      {/* 비밀번호 확인 */}
      <label className="signup-label">비밀번호 확인</label>
      <input
        type="password"
        name="password2"
        value={form.password2}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="비밀번호를 다시 입력해주세요"
        className="signup-input"
        autoComplete="new-password"
      />

      {/* 이름 */}
      <label className="signup-label">이름</label>
      <input
        name="username"
        value={form.username}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="이름을 입력해주세요"
        className="signup-input"
      />

      {/* 이메일 */}
      <label className="signup-label">이메일</label>
      <input
        name="email"
        value={form.email}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="예: example@kurly.com"
        className="signup-input"
        autoComplete="email"
      />

      {/* 휴대폰 */}
      <label className="signup-label">휴대폰 번호</label>
      <input
        name="phone"
        value={form.phone}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="숫자만 입력"
        className="signup-input"
        inputMode="numeric"
      />

      {/* 주소 */}
      <label className="signup-label">주소</label>
      <div className="signup-address-row">
        <input
          name="address"
          value={form.address}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="주소를 입력해주세요"
          className="signup-input"
        />
        <input
          name="detailAddress"
          value={form.detailAddress}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="상세주소를 입력해주세요"
          className="signup-input"
        />
        <button type="button" className="signup-btn sub" onClick={openPostcode}>
          주소검색
        </button>
      </div>

      {/* 성별 */}
      <label className="signup-label">성별</label>
      <div className="signup-radio-row">
        {["남자", "여자", "선택안함"].map((g) => (
          <label key={g} className="radio-item">
            <input
              type="radio"
              name="gender"
              checked={form.gender === g}
              onChange={() => setForm((s) => ({ ...s, gender: g }))}
            />
            {g}
          </label>
        ))}
      </div>

      {/* 생년월일 */}
      <label className="signup-label">생년월일</label>
      <input
        type="date"
        name="birthday"
        value={form.birthday}
        onChange={onChange}
        className="signup-input"
        max="2099-12-31"
      />

      {/* 약관 동의 */}
      <div className="agreements">
        <label className="agree-all">
          <input type="checkbox" checked={agree.all} onChange={toggleAll} />
          전체동의합니다.
        </label>

        <label className="agree-item">
          <input
            type="checkbox"
            checked={agree.terms}
            onChange={() => toggleOne("terms")}
          />
          이용약관동의 (필수)
        </label>

        <label className="agree-item">
          <input
            type="checkbox"
            checked={agree.privacy}
            onChange={() => toggleOne("privacy")}
          />
          개인정보 수집·이용 동의 (필수)
        </label>

        <label className="agree-item">
          <input
            type="checkbox"
            checked={agree.over14}
            onChange={() => toggleOne("over14")}
          />
          본인은 만 14세 이상입니다. (필수)
        </label>
      </div>

      {error && <div className="signup-error">{error}</div>}

      <button
        className="signup-btn primary"
        onClick={handleSignup}
        disabled={loading}
      >
        {loading ? "가입 중..." : "가입하기"}
      </button>

      <button
        className="signup-btn ghost"
        onClick={() => navigate("/login")}
        disabled={loading}
      >
        이미 계정이 있으신가요? 로그인
      </button>
    </div>
  );
}

export default Signup;
