import React, { useEffect, useState } from "react";
import "./Board.css";
import Header from "./Header";
import Footer from "./Footer";
import api from "../api/axiosConfig";

// 토큰에서 사용자 정보 추출
function getMeFromToken() {
  const t = localStorage.getItem("token");
  if (!t)
    return {
      loggedIn: false,
      meId: null,
      meUserid: null,
      username: null,
      isAdmin: false,
    };
  try {
    const p = JSON.parse(atob(t.split(".")[1]));
    const meId = p.uid ?? p.userId ?? p.id ?? p.user_id ?? null;
    const meUserid = p.userid ?? p.sub ?? p.username ?? null;
    const roles = p.roles ?? p.role ?? p.authorities ?? [];
    const isAdmin = Array.isArray(roles)
      ? roles.includes("ROLE_ADMIN")
      : roles === "ROLE_ADMIN";
    return {
      loggedIn: true,
      meId: meId != null ? String(meId) : null,
      meUserid: meUserid != null ? String(meUserid) : null,
      username: meUserid,
      isAdmin,
    };
  } catch {
    return {
      loggedIn: false,
      meId: null,
      meUserid: null,
      username: null,
      isAdmin: false,
    };
  }
}

const SIZE = 5; // ✅ 항상 5개씩 고정

// 감성값 → 칩 클래스
function chipClass(v) {
  if (v === 0 || v === "0" || v === "NEG" || v === "neg") return "chip neg";
  if (v === 2 || v === "2" || v === "POS" || v === "pos") return "chip pos";
  if (v === 1 || v === "1" || v === "NEU" || v === "neu") return "chip neu";
  return "chip"; // null 또는 '-'
}

const FruitBoard = () => {
  // 화면 스위치
  const [listOk, setListOk] = useState(true);
  const [readOk, setReadOk] = useState(false);
  const [writeOk, setWriteOk] = useState(false);
  const [editOk, setEditOk] = useState(false);

  // 현재 로그인 사용자
  const [me, setMe] = useState({
    loggedIn: false,
    meId: null,
    meUserid: null,
    username: null,
    isAdmin: false,
  });

  // 목록 + 페이지네이션 상태
  const [boardList, setBoardList] = useState([]);
  const [page, setPage] = useState(0); // 0-based
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // 글쓰기/수정용 상태
  const [boardInfo, setBoardInfo] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editNo, setEditNo] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 감성 분석 결과(허깅페이스 → Flask → Spring)
  const [sentiment, setSentiment] = useState(null); // 0/1/2
  const [recs, setRecs] = useState([]); // [{review_text, sentiment_label}, ...]

  useEffect(() => {
    setMe(getMeFromToken());
  }, []);

  // 페이지 변경 시 목록 조회 (SIZE 고정)
  useEffect(() => {
    fetchList(page, SIZE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // 서버 목록 불러오기 (페이지네이션)
  const fetchList = async (p = 0, s = SIZE) => {
    try {
      setLoading(true);
      const res = await api.get("/api/boards", {
        params: { page: p, size: s, sort: "id,desc" },
      });

      // Spring Data Page 응답 또는 배열 응답 모두 대응
      const items = res.data?.content ?? res.data ?? [];
      const mapped = items.map((b) => ({
        no: String(b.id),
        title: b.title,
        description: b.content,
        viewCount: b.viewCount ?? 0,
        authorId: b.authorId ?? b.author?.id ?? null,
        authorUserid: b.authorUserid ?? b.author?.userid ?? null,
        authorName: b.authorName ?? b.author?.username ?? null,
        // 감성 필드 다양한 케이스 호환
        sentimentLabel:
          b.sentimentLabel ??
          b.sentiment ??
          b.sentiment_label ??
          b.score ??
          null,
      }));
      setBoardList(mapped);

      // 페이지 정보 세팅 (없으면 추론)
      const tp = res.data?.totalPages;
      const te = res.data?.totalElements;
      if (typeof tp === "number") setTotalPages(tp);
      else
        setTotalPages(
          Math.ceil((Array.isArray(res.data) ? res.data.length : te || 0) / s)
        );
      if (typeof te === "number") setTotalElements(te);
      else
        setTotalElements(
          Array.isArray(res.data) ? res.data.length : te || mapped.length
        );
    } catch (e) {
      console.error(e);
      setErrorMessage("목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const boardListView = () => {
    setListOk(true);
    setReadOk(false);
    setWriteOk(false);
    setEditOk(false);
    setBoardInfo({});
    setErrorMessage("");
  };

  // 상세 읽기
  const boardRead = async (no) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/api/boards/${no}`);
      setBoardInfo({
        no: String(data.id),
        title: data.title,
        description: data.content,
        viewCount: data.viewCount ?? 0,
        authorId: data.authorId ?? data.author?.id ?? null,
        authorUserid: data.authorUserid ?? data.author?.userid ?? null,
        authorName: data.authorName ?? data.author?.username ?? null,
        sentimentLabel:
          data.sentimentLabel ??
          data.sentiment ??
          data.sentiment_label ??
          data.score ??
          null,
      });
      await fetchList(page, SIZE);
      setListOk(false);
      setReadOk(true);
      setWriteOk(false);
      setEditOk(false);
    } catch (e) {
      console.error(e);
      const msg = e.response?.data?.message || "게시글을 불러오지 못했습니다.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const boardWrite = () => {
    setListOk(false);
    setReadOk(false);
    setWriteOk(true);
    setEditOk(false);
    setTitle("");
    setDescription("");
    setErrorMessage("");
    setSentiment(null);
    setRecs([]);
  };

  // 저장(작성)
  const boardSave = async () => {
    if (title.trim() === "" || description.trim() === "") {
      setErrorMessage("제목과 내용을 입력하세요!");
      return;
    }
    try {
      setLoading(true);
      await api.post("/api/boards", {
        title,
        content: description,
        sentimentLabel: sentiment, // 서버가 무시해도 무해
      });
      setTitle("");
      setDescription("");
      setErrorMessage("");
      setSentiment(null);
      setRecs([]);
      await fetchList(page, SIZE);
      boardListView();
    } catch (e) {
      console.error(e);
      const msg = e.response?.data?.message || "저장 실패!";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  // 삭제
  const boardDelete = async (no) => {
    if (!window.confirm("정말 삭제할까요?")) return;
    try {
      setLoading(true);
      await api.delete(`/api/boards/${no}`);
      await fetchList(page, SIZE);
      boardListView();
    } catch (e) {
      console.error(e);
      const status = e.response?.status;
      if (status === 403) setErrorMessage("삭제 권한이 없습니다.");
      else setErrorMessage("삭제 실패!");
    } finally {
      setLoading(false);
    }
  };

  // 내가 수정/삭제 가능한지 (ADMIN or 작성자)
  const canEditDelete = (board) => {
    if (me.isAdmin) return true;
    if (board.authorId != null && me.meId != null) {
      if (String(board.authorId) === String(me.meId)) return true;
    }
    if (board.authorUserid && me.meUserid) {
      if (String(board.authorUserid) === String(me.meUserid)) return true;
    }
    return false;
  };

  // 수정 화면 열기
  const boardEdit = (no) => {
    const boardToEdit = boardList.find((b) => b.no === no);
    if (!boardToEdit) return;

    if (!canEditDelete(boardToEdit)) {
      alert("수정 권한이 없습니다.");
      return;
    }

    setEditNo(boardToEdit.no);
    setEditTitle(boardToEdit.title);
    setEditDescription(boardToEdit.description);
    setListOk(false);
    setReadOk(false);
    setWriteOk(false);
    setEditOk(true);
    setErrorMessage("");
  };

  // 수정 저장
  const updateBoard = async () => {
    if (editTitle.trim() === "" || editDescription.trim() === "") {
      setErrorMessage("제목/내용을 입력하세요!");
      return;
    }
    try {
      setLoading(true);
      await api.put(`/api/boards/${editNo}`, {
        title: editTitle,
        content: editDescription,
      });
      await fetchList(page, SIZE);
      boardListView();
    } catch (e) {
      console.error(e);
      const status = e.response?.status;
      if (status === 403) setErrorMessage("수정 권한이 없습니다.");
      else setErrorMessage("수정 실패!");
    } finally {
      setLoading(false);
    }
  };

  // ★ 현재 입력(description)으로 감성 분석 호출 (JSON 엔드포인트 + Authorization 제거)
  const analyzeCurrent = async () => {
    const txt = (description || "").trim();
    if (!txt) {
      setErrorMessage("내용을 입력한 뒤 [감성 분석]을 눌러주세요!");
      return;
    }
    try {
      setLoading(true);
      setErrorMessage("");

      const { data } = await api.post(
        "/sentiment/analyze/json",
        { review: txt },
        { headers: { Authorization: "" } } // 이 호출만 토큰 제거
      );

      if (data?.error) throw new Error(data.error);

      const s =
        typeof data?.sentiment === "number"
          ? data.sentiment
          : Number(data?.sentiment ?? NaN);

      setSentiment(Number.isFinite(s) ? s : null);
      setRecs(Array.isArray(data?.recommendations) ? data.recommendations : []);
    } catch (e) {
      console.error(e);
      const msg = e.response?.data?.message || e.message || "감성 분석 실패!";
      setErrorMessage(msg);
      setSentiment(null);
      setRecs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 필요하면 Header/Footer 렌더 */}
      {/* <Header /> */}

      <div className="container">
        <div className="board-header-container">
          <div id="left_side">
            <h2>고객센터</h2>
            <ul>
              <li>
                <button className="inquiry-button">고객 게시판 &gt;</button>
              </li>
              <li>
                <button className="inquiry-button">공지사항 &gt;</button>
              </li>
              <li>
                <button className="inquiry-button">자주하는 질문 &gt;</button>
              </li>
              <li>
                <button className="inquiry-button">1:1 문의 &gt;</button>
              </li>
            </ul>
          </div>

          <div id="center">
            {loading && <div className="loading">로딩중...</div>}
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}

            {listOk && (
              <div className="board-list-section">
                <h2>고객 게시판</h2>

                <table className="board-table">
                  <thead>
                    <tr>
                      <th className="col-no">번호</th>
                      <th className="col-title">제목</th>
                      <th className="col-view">조회수</th>
                      <th className="col-sentiment">감성</th>
                      <th className="col-action">액션</th>
                    </tr>
                  </thead>
                  <tbody>
                    {boardList.map((board) => {
                      const editable = canEditDelete(board);
                      return (
                        <tr key={board.no}>
                          <td>{board.no}</td>
                          <td
                            className="col-title"
                            onClick={() => boardRead(board.no)}
                          >
                            {board.title}
                          </td>
                          <td>{board.viewCount}</td>
                          <td>
                            <span className={chipClass(board.sentimentLabel)}>
                              {board.sentimentLabel ?? "-"}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn-action"
                              onClick={() => boardRead(board.no)}
                            >
                              읽기
                            </button>
                            {editable && (
                              <>
                                <button
                                  className="btn-action"
                                  onClick={() => boardEdit(board.no)}
                                >
                                  수정
                                </button>
                                <button
                                  className="btn-action"
                                  onClick={() => boardDelete(board.no)}
                                >
                                  삭제
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="pagination">
                  <button
                    className="btn-action"
                    disabled={page <= 0}
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                  >
                    ← 이전
                  </button>
                  <span className="page-info">
                    {page + 1} / {Math.max(totalPages, 1)}
                  </span>
                  <button
                    className="btn-action"
                    disabled={page >= totalPages - 1}
                    onClick={() =>
                      setPage((p) => Math.min(totalPages - 1, p + 1))
                    }
                  >
                    다음 →
                  </button>
                </div>

                <button className="puple" onClick={boardWrite}>
                  문의글 작성하기
                </button>
              </div>
            )}

            {readOk && (
              <div className="board-read-section">
                <h5>{boardInfo.title}</h5>
                <div className="meta-row">
                  <span>조회수: {boardInfo.viewCount}</span>
                  <span>
                    감성: <strong>{boardInfo.sentimentLabel ?? "-"}</strong>
                  </span>
                </div>
                <hr />
                <p>{boardInfo.description}</p>
                <div className="button-right">
                  <button onClick={boardListView}>목록으로</button>
                </div>
              </div>
            )}

            {writeOk && (
              <div className="board-write-section">
                <h5>문의글 작성</h5>
                {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
                )}

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목 입력"
                />
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setSentiment(null);
                    setRecs([]);
                  }}
                  placeholder="내용 입력"
                />

                <div style={{ margin: "8px 0" }}>
                  <button
                    className="btn-action"
                    onClick={analyzeCurrent}
                    disabled={loading}
                  >
                    {loading ? "분석중..." : "감성 분석"}
                  </button>
                  {sentiment !== null && (
                    <span style={{ marginLeft: 12 }}>
                      분석 점수: <strong>{sentiment}</strong>
                    </span>
                  )}
                </div>

                {sentiment !== null && (
                  <div className="recommend-box">
                    <h6>유사 문의 추천</h6>
                    {recs.length === 0 ? (
                      <div>추천 결과가 없습니다.</div>
                    ) : (
                      <ul>
                        {recs.map((r, idx) => (
                          <li key={idx}>
                            <span>{r.review_text}</span>
                            {" (점수: "}
                            <strong>{r.sentiment_label}</strong>
                            {")"}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                <div className="button-right">
                  <button onClick={boardSave}>저장</button>
                  <button onClick={boardListView}>목록으로</button>
                </div>
              </div>
            )}

            {editOk && (
              <div className="board-edit-section">
                <h5>게시물 수정</h5>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="수정 제목"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="수정 내용"
                />
                <div className="button-right">
                  <button onClick={updateBoard}>수정</button>
                  <button onClick={boardListView}>목록으로</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default FruitBoard;
