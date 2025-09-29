package com.kurly.dto;

import com.kurly.domain.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String userid;

    @NotBlank
    @Size(min = 4, max = 64)
    private String password;

    private String username;
    @Email(message = "이메일 형식이 아닙니다.")
    private String email;
    private String phone;
    private String address;
    private String detailAddress;
    private Gender gender;
    private String birthday;


}
