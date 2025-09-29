package com.kurly.service;

import com.kurly.domain.Gender;
import com.kurly.domain.Role;
import com.kurly.entity.User;
import com.kurly.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class AuthServiceTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void insertUserTest() {
        User user = User.builder()
                .userid("test01")
                .password(passwordEncoder.encode("1234"))
                .username("윤단비")
                .email("danbi@example.com")
                .phone("010-1111-2222")
                .address("경기도 안산시")
                .gender(Gender.FEMALE)   // enum 사용
                .birthday("2001-02-21")
                .role(Role.USER)         // enum 사용
                .build();

        userRepository.save(user);
        System.out.println("✅ 회원가입(enum) 테스트 완료!");
    }


}