package com.kurly.service;

import com.kurly.config.JwtUtil;
import com.kurly.domain.Role;
import com.kurly.dto.LoginRequest;
import com.kurly.dto.SignupRequest;
import com.kurly.entity.User;
import com.kurly.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service // 서비스 빈 등록
@RequiredArgsConstructor  // 생성자 자동 주입 (final 필드 대상)
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    private String norm(String s) {
        return s == null ? null : s.trim().toLowerCase(); // 가입/로그인 모두 동일 규칙
    }

    // 로그인: userid로 조회
    public String login(LoginRequest request) {
        String userid = norm(request.getUserid());

        User user = userRepository.findByUserid(userid)
                .orElseThrow(() -> new RuntimeException("사용자가 존재하지 않습니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호가 틀렸습니다.");
        }

        // JwtAuthFilter가 username(=userid)을 꺼내 쓰는 구조라면 이대로 OK
        return jwtUtil.createToken(user.getUserid());      // 또는 createToken(user.getUserid(), user.getRole().name())
    }

    // 회원가입: userid를 저장해야 함 (지금은 username에 넣고 있었음)
    public void signup(SignupRequest request) {
        String userid = norm(request.getUserid());

        if (userRepository.existsByUserid(userid)) {
            throw new RuntimeException("이미 존재하는 사용자입니다.");
        }

        User user = new User();
        user.setUserid(userid);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUsername(request.getUsername());                     // 표시용 이름(선택)
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setBirthday(request.getBirthday());
        user.setAddress(request.getAddress());
        user.setDetailaddress(request.getDetailAddress());
        user.setGender(request.getGender());
        user.setRole(Role.ADMIN);


        userRepository.save(user);
    }

    public String findUsernameByUserid(String userid) {
        return userRepository.findByUserid(userid)
                .map(User::getUsername)
                .orElse("");
    }
}