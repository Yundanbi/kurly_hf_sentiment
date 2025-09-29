package com.kurly.service;

import com.kurly.entity.Board;
import com.kurly.repository.BoardRepository;
import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.data.domain.Pageable;

@Service
@Getter
@Setter
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    public void register(Board board) {
        boardRepository.save(board);
    }

    @Transactional
    public Board readAndIncrease(Long id) {
        Board b = boardRepository.findByIdWithAuthor(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        b.setViewCount(b.getViewCount() + 1);
        return b;
    }
    public Page<Board> readAll(Pageable pageable) {
        return boardRepository.findAll(pageable);
    }

    @Transactional
    public Board update(Long boardId, String title, String content) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        board.setTitle(title);
        board.setContent(content);
        return board;
    }

    public Page<Board> search(String keyword, Pageable pageable) {
        if (keyword == null || keyword.isBlank()) {
            return boardRepository.findAll(pageable);
        }
        return boardRepository.findByTitleContainingOrContentContaining(keyword, keyword, pageable);
    }

    public void delete(Long boardId) {
        boardRepository.deleteById(boardId);
    }

    @Transactional
    public Board updateOwned(Long boardId, String title, String content,
                             Integer sentimentLabel, Long currentUserId, boolean isAdmin) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Board not found: " + boardId));

        if (!isAdmin && !board.getAuthor().getId().equals(currentUserId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "수정 권한이 없습니다.");
        }

        board.setTitle(title);
        board.setContent(content);

        // ★ 여기 추가: null 아닐 때만 업데이트 (null이면 기존값 유지)
        if (sentimentLabel != null) {
            board.setSentimentLabel(sentimentLabel);
        }

        return board; // dirty checking
    }


    @Transactional
    public void deleteOwned(Long boardId, Long currentUserId, boolean isAdmin) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Board not found: " + boardId));

        if (!isAdmin && !board.getAuthor().getId().equals(currentUserId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "삭제 권한이 없습니다.");
        }
        boardRepository.delete(board);
    }


}