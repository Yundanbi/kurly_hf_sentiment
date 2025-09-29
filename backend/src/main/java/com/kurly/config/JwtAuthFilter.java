package com.kurly.config;

import com.kurly.entity.User;
import com.kurly.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    private static final AntPathMatcher MATCHER = new AntPathMatcher();


    private static final String[] WHITELIST = {
            "/",
            "/error",
            "/favicon.ico",
            "/css/**", "/js/**", "/images/**", "/static/**",
            "/sentiment/**",
            "/api/sentiment/**",
            "/api/auth/**",
            "/api/members/**",
            "/boards/**"
    };

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        // CORS 프리플라이트는 완전 스킵
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) return true;

        // 화이트리스트 경로는 필터 완전 스킵
        String uri = request.getRequestURI();
        for (String p : WHITELIST) {
            if (MATCHER.match(p, uri)) return true;
        }
        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {

        // Authorization 헤더(or 쿠키)에 토큰이 없으면 인증 시도 없이 익명으로 통과
        String token = jwtUtil.resolveToken(req);
        if (!StringUtils.hasText(token)) {
            chain.doFilter(req, res);
            return;
        }

        try {
            // 토큰 무효/만료 → 인증 세팅 없이 통과(보호 URL은 결국 401로 처리됨)
            if (!jwtUtil.validateToken(token)) {
                SecurityContextHolder.clearContext();
                chain.doFilter(req, res);
                return;
            }

            // 유효 토큰이면 사용자 로드 & 권한 부여
            String username = jwtUtil.getUsernameFromToken(token);

            Optional<User> optUser = userRepository.findByUserid(username);
            String grantedRole = "ROLE_USER";
            if (optUser.isPresent()) {
                Object roleObj = optUser.get().getRole();
                String roleName = roleObj == null ? "USER"
                        : (roleObj instanceof Enum<?> e ? e.name() : roleObj.toString());
                grantedRole = roleName.startsWith("ROLE_") ? roleName : "ROLE_" + roleName;
            }

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            username,
                            null,
                            List.of(new SimpleGrantedAuthority(grantedRole))
                    );
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (Exception e) {
            // 예외 시 인증 컨텍스트만 비우고 계속 진행 (직접 403/401 쓰지 않음)
            SecurityContextHolder.clearContext();
        }

        chain.doFilter(req, res);
    }
}
