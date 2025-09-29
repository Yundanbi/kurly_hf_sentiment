package com.kurly.controller;

import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.ui.Model;
import com.kurly.entity.Board;
import com.kurly.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/board")
@RequiredArgsConstructor
@Log4j2
public class BoardController {
    private final BoardService boardService;

    @GetMapping("/list")
    public String list(
            @PageableDefault(size = 10, sort = "createdDate", direction = Sort.Direction.DESC)
            org.springframework.data.domain.Pageable pageable,
            Model model
    ) {
        var page = boardService.readAll(pageable); // Page<Board>
        model.addAttribute("page", page);
        model.addAttribute("boards", page.getContent());
        log.info("boards: {}", page.getContent());
        return "board/list";
    }
}
