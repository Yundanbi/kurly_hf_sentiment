package com.kurly.repository;

import com.kurly.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {

    @EntityGraph(attributePaths = "author")
    Page<Board> findAll(Pageable pageable);

    @EntityGraph(attributePaths = "author")
    Page<Board> findByTitleContainingOrContentContaining(String title, String content, Pageable pageable);


    @Query("select b from Board b join fetch b.author where b.id = :id")
    Optional<Board> findByIdWithAuthor(@Param("id") Long id);
}
