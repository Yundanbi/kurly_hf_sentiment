// src/main/java/com/kurly/dto/BoardListItemResponse.java
package com.kurly.dto;

import com.kurly.entity.Board;

public record BoardListItemResponse(
        Long id,
        String title,
        String content,   // 목록에 본문 일부만 쓰고 싶으면 substring 처리해도 됨
        int viewCount,
        Long authorId,
        String authorUserid,   // 토큰에 uid가 없으면 userid로 비교할 때 사용
        String authorName
) {
    public static BoardListItemResponse from(Board b) {
        var u = b.getAuthor();
        return new BoardListItemResponse(
                b.getId(),
                b.getTitle(),
                b.getContent(),
                b.getViewCount(),
                u != null ? u.getId() : null,
                u != null ? u.getUserid() : null,
                u != null ? u.getUsername() : null
        );
    }
}
