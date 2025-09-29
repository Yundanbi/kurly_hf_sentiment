package com.kurly.entity;
import com.kurly.domain.AnswerStatus;
import com.kurly.domain.PostStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Table(name = "board")
@Getter
@Setter
@ToString
public class Board {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;   // 질문 제목

    @Lob
    @Column(nullable = false)
    private String content; // 질문 내용

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;    // 질문 작성자

    @OneToOne(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Answer answer;  // 답변 (1:1)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private AnswerStatus answerStatus = AnswerStatus.NONE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PostStatus postStatus = PostStatus.NORMAL;

    private int viewCount = 0;

    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    @Column(name = "sentiment_label")
    private Integer sentimentLabel;

    @PrePersist
    void onCreate() {
        this.createdDate = this.updatedDate = LocalDateTime.now();
    }
    @PreUpdate
    void onUpdate() {
        this.updatedDate = LocalDateTime.now();
    }
}
