package com.kurly.dto;

import com.kurly.entity.Board;

import java.time.LocalDateTime;

public record BoardResponse(
        Long id,
        String title,
        String content,
        int viewCount,
        LocalDateTime createdDate,
        LocalDateTime updatedDate,
        Long authorId,
        String authorName,
        Integer sentimentLabel
) {
    public static BoardResponse from(Board b) {
        var u = b.getAuthor();
        return new BoardResponse(
                b.getId(),
                b.getTitle(),
                b.getContent(),
                b.getViewCount(),
                b.getCreatedDate(),
                b.getUpdatedDate(),
                (u != null ? u.getId() : null),
                (u != null ? u.getUsername() : null),
                b.getSentimentLabel()
        );
    }
}