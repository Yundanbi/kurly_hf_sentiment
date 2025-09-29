package com.kurly.controller;

import com.kurly.dto.LoginRequest;
import com.kurly.dto.SignupRequest;
import com.kurly.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    private String norm(String s){
        return s == null ? null : s.trim().toLowerCase();
    }

    /*@PostMapping("/login")
    public ResponseEntity<String> login (@RequestBody LoginRequest request){
        try{
            String result = authService.login(request);
            return ResponseEntity.ok(result);
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }*/

   /* @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        String token = authService.login(request);
        System.out.println("발급 토큰"+token);
        return ResponseEntity.ok()
                .header("Authorization","Bearer"+token).body("로그인 성공");
    }*/

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request){
        // userid 정규화(회원가입도 소문자/trim 하셨으니 로그인도 동일하게)
        request.setUserid(norm(request.getUserid()));

        // 1) 토큰 발급
        String token = authService.login(request);

        // 2) 실명 조회 (AuthService에 메서드 하나 추가했다고 가정)
        String username = authService.findUsernameByUserid(request.getUserid());

        // 3) token + username 같이 반환
        return ResponseEntity.ok(
                java.util.Map.of(
                        "token", token,
                        "username", username
                )
        );
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request){
        try{
            request.setUserid(norm(request.getUserid()));
            authService.signup(request);
            return ResponseEntity.ok("회원가입이 완료되었습니다.");
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
