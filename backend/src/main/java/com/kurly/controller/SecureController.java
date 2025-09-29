package com.kurly.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/secure")
public class SecureController {
    @GetMapping("/hello")
    public String hello(){
        return "jwt 인증된 사용자만 접근 가능!";
    }
}
