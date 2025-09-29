package com.kurly.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Table(name="answer")
@Getter
@Setter
@ToString(exclude = {"question", "author"})
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false, unique = true)
    private Board question;     // 어떤 질문의 답변인지 (1:1)

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;        // 답변 작성자 (관리자/운영자 등)

    @Lob
    @Column(nullable = false)
    private String content;     // 답변 내용

    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    @PrePersist
    void onCreate() { this.createdDate = this.updatedDate = LocalDateTime.now(); }
    @PreUpdate
    void onUpdate() { this.updatedDate = LocalDateTime.now(); }
}
