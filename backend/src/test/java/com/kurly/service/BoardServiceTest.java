package com.kurly.service;

import com.kurly.domain.AnswerStatus;
import com.kurly.domain.PostStatus;
import com.kurly.domain.Role;
import com.kurly.entity.Board;
import com.kurly.entity.User;
import com.kurly.repository.BoardRepository;
import com.kurly.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Log4j2
class BoardServiceTest {

    @Autowired
    BoardService boardService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    BoardRepository boardRepository;

    private User author;

    @BeforeEach
    void setUp() {
        User u = new User();
        String uid = "tester_" + System.nanoTime(); // 또는 UUID.randomUUID()
        u.setUserid(uid);
        u.setPassword("123456");
        u.setUsername("윤단비");
        u.setRole(Role.USER);
        author = userRepository.save(u);
        assertNotNull(author.getId());
    }

    @Test
    @org.springframework.transaction.annotation.Transactional
    void testRegister() {
        // given
        Board board = new Board();
        board.setTitle("테스트 제목");
        board.setContent("테스트 내용");
        board.setAuthor(author);
        board.setPostStatus(PostStatus.NORMAL);
        board.setAnswerStatus(AnswerStatus.NONE);

        // when
        boardService.register(board);

        // then
        assertNotNull(board.getId());
        Board saved = boardRepository.findById(board.getId()).orElseThrow();
        assertEquals("테스트 제목", saved.getTitle());
        assertEquals(author.getId(), saved.getAuthor().getId());
        assertEquals(PostStatus.NORMAL, saved.getPostStatus());
        assertEquals(AnswerStatus.NONE, saved.getAnswerStatus());
        assertEquals(Role.USER, saved.getAuthor().getRole());

        log.info("saved board id={}, authorId={}", saved.getId(), saved.getAuthor().getId());
    }

    @Test
    @Transactional  // 테스트 끝나면 롤백되도록
    void testUpdate() {
        // given: 먼저 게시글을 하나 저장
        Board board = new Board();
        board.setTitle("원래 제목");
        board.setContent("원래 내용");
        board.setAuthor(author);
        board.setPostStatus(PostStatus.NORMAL);
        board.setAnswerStatus(AnswerStatus.NONE);

        boardService.register(board);
        Long boardId = board.getId();

        // when: 제목과 내용을 수정
        Board saved = boardRepository.findById(boardId).orElseThrow();
        saved.setTitle("수정된 제목");
        saved.setContent("수정된 내용");
        boardService.register(saved); // save()는 수정도 처리됨

        // then: 다시 조회해서 확인
        Board updated = boardRepository.findById(boardId).orElseThrow();
        assertEquals("수정된 제목", updated.getTitle());
        assertEquals("수정된 내용", updated.getContent());

        log.info("updated board id={}, title={}, content={}",
                updated.getId(), updated.getTitle(), updated.getContent());
    }


    @Test
    @Transactional
    void testReadAllPaging() {
        // given: 여러 개 저장
        for (int i = 0; i < 23; i++) {
            Board b = new Board();
            b.setTitle("title-" + i);
            b.setContent("content-" + i);
            b.setAuthor(author);
            b.setPostStatus(PostStatus.NORMAL);
            b.setAnswerStatus(AnswerStatus.NONE);
            boardRepository.save(b);
        }

        // when: 첫 페이지 10개, 작성일 DESC
        Pageable pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "createdDate"));
        Page<Board> page = boardService.readAll(pageable);

        // then
        assertEquals(10, page.getNumberOfElements());
        assertEquals(3, page.getTotalPages()); // 23개 -> 10/10/3
        assertTrue(page.isFirst());
        assertFalse(page.isLast());
    }

    @Test
    @Transactional // 테스트 끝나면 롤백되게 (원하면 빼도 됨)
    void testDelete_success() {
        // given: 게시글 하나 생성
        Board b = new Board();
        b.setTitle("삭제 테스트");
        b.setContent("내용");
        b.setAuthor(author);
        b.setPostStatus(PostStatus.NORMAL);
        b.setAnswerStatus(AnswerStatus.NONE);

        boardService.register(b);
        Long id = b.getId();
        assertTrue(boardRepository.existsById(id), "사전 저장 실패");

        // when: 삭제
        boardService.delete(id);

        // then: 존재하지 않아야 함
        assertFalse(boardRepository.existsById(id), "삭제 후에도 남아 있음");
    }


}