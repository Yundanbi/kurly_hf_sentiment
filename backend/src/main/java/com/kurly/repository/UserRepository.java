package com.kurly.repository;

import com.kurly.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUserid(String userid);
    boolean existsByUserid(String userid);
}
