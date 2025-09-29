package com.kurly.entity;

import com.kurly.domain.Gender;
import com.kurly.domain.Role;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)   // enum → DB에는 문자열로 저장
    private Role role;             // 관리자, 회원

    @Column(unique = true, nullable = false)
    private String userid;         // 아이디

    @Column(nullable = false)
    private String password;       // 비밀번호

    private String username;       // 이름
    private String email;          // 이메일
    private String phone;          // 전화번호
    private String address;        // 주소
    private String detailaddress;   //상세주소

    @Enumerated(EnumType.STRING)   // enum → DB에는 문자열로 저장
    private Gender gender;         // 성별

    private String birthday;       // 생년월일
}
