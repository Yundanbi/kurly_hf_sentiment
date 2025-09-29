package com.kurly.controller;

import com.kurly.dto.BoardCreateRequest;
import com.kurly.dto.BoardResponse;
import com.kurly.dto.BoardUpdateRequest;
import com.kurly.entity.Board;
import com.kurly.entity.User;
import com.kurly.repository.UserRepository;
import com.kurly.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/boards")
public class BoardRestController {
    private final BoardService boardService;
    private final UserRepository userRepository;

    @GetMapping
    public Page<Board> list(Pageable pageable) {
        return boardService.readAll(pageable);
    }

    @GetMapping("/{id}")
    public BoardResponse detail(@PathVariable Long id) {
        return BoardResponse.from(boardService.readAndIncrease(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Board create(@RequestBody BoardCreateRequest req, Authentication auth) {
        String userid = auth.getName();
        User author = userRepository.findByUserid(userid)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다."));

        Board b = new Board();
        b.setTitle(req.title());
        b.setContent(req.content());
        b.setAuthor(author);
        // ★ 감성점수 반영 (null 허용)
        b.setSentimentLabel(req.sentimentLabel());

        boardService.register(b);
        return b;
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable Long id, @RequestBody BoardUpdateRequest req, Authentication auth) {
        String userid = auth.getName();
        Long currentUserId = userRepository.findByUserid(userid)
                .map(User::getId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다."));
        boolean isAdmin = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        // ★ 서비스에 감성점수도 전달
        boardService.updateOwned(id, req.title(), req.content(), req.sentimentLabel(), currentUserId, isAdmin);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id, Authentication auth) {
        String userid = auth.getName();
        Long currentUserId = userRepository.findByUserid(userid)
                .map(User::getId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다."));
        boolean isAdmin = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        boardService.deleteOwned(id, currentUserId, isAdmin);
    }



}
