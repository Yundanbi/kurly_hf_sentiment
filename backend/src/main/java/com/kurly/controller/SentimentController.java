package com.kurly.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Controller
@Log4j2
@RequestMapping("/sentiment")
public class SentimentController {

    private static final String FLASK_BASE    = "http://127.0.0.1:5000";
    private static final String FLASK_RECENT  = FLASK_BASE + "/api/reviews";
    private static final String FLASK_ANALYZE = FLASK_BASE + "/api/analyze";

    @GetMapping("/form")
    public String showForm(Model model) {
        RestTemplate rt = new RestTemplate();
        try {
            ResponseEntity<Object[]> resp = rt.getForEntity(FLASK_RECENT, Object[].class);
            model.addAttribute("recent_reviews",
                    (resp.getStatusCode() == HttpStatus.OK && resp.getBody()!=null) ? resp.getBody() : new Object[0]);
        } catch (Exception e) {
            log.error("최근 리뷰 가져오기 실패", e);
            model.addAttribute("recent_reviews", new Object[0]);
        }
        return "sentiment/form";
    }

    // 폼 전송(뷰 전환)용
    @PostMapping("/analyze")
    public String analyze(@RequestParam("review") String review, Model model) {
        RestTemplate rt = new RestTemplate();

        // 1) Flask 분석 호출
        try {
            Map<String, String> body = new HashMap<>();
            body.put("review", review);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            ResponseEntity<Map> analyzeResp =
                    rt.postForEntity(FLASK_ANALYZE, new HttpEntity<>(body, headers), Map.class);

            if (analyzeResp.getStatusCode().is2xxSuccessful() && analyzeResp.getBody()!=null) {
                Map<?, ?> payload = analyzeResp.getBody();
                model.addAttribute("review", review);
                model.addAttribute("sentiment", payload.get("sentiment"));             // 0/1/2
                model.addAttribute("recommendations", payload.get("recommendations")); // list
            } else {
                model.addAttribute("error", "감성 분석 결과를 받지 못했습니다. 다시 시도해 주세요.");
            }
        } catch (Exception e) {
            log.error("Flask 분석 호출 실패", e);
            model.addAttribute("error", "감성 분석 요청 실패: " + e.getMessage());
        }

        // 2) 최근 갱신
        try {
            RestTemplate rt2 = new RestTemplate();
            ResponseEntity<Object[]> recentResp = rt2.getForEntity(FLASK_RECENT, Object[].class);
            model.addAttribute("recent_reviews",
                    (recentResp.getStatusCode()==HttpStatus.OK && recentResp.getBody()!=null) ? recentResp.getBody() : new Object[0]);
        } catch (Exception e) {
            log.error("최근 리뷰 가져오기 실패", e);
            model.addAttribute("recent_reviews", new Object[0]);
        }

        return "sentiment/result";
    }

    /* ===== JSON 전용 엔드포인트 ===== */

    // DTO는 static record로 (Jackson 역직렬화 OK, 파일 안 늘어남)
    public static record AnalyzeRequest(String review) {}
    public static record AnalyzeResponse(Object sentiment, Object recommendations, String error) {}

    @PostMapping(
            value = "/analyze/json",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseBody
    public ResponseEntity<AnalyzeResponse> analyzeJson(@RequestBody AnalyzeRequest req) {
        RestTemplate rt = new RestTemplate();
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            Map<String, String> body = Map.of("review", req.review());

            ResponseEntity<Map> resp =
                    rt.postForEntity(FLASK_ANALYZE, new HttpEntity<>(body, headers), Map.class);

            if (resp.getStatusCode().is2xxSuccessful() && resp.getBody()!=null) {
                Map<?, ?> payload = resp.getBody();
                return ResponseEntity.ok(
                        new AnalyzeResponse(payload.get("sentiment"), payload.get("recommendations"), null)
                );
            } else {
                return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                        .body(new AnalyzeResponse(null, null, "감성 분석 결과를 받지 못했습니다."));
            }
        } catch (Exception e) {
            log.error("Flask 분석 호출 실패", e);
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                    .body(new AnalyzeResponse(null, null, "감성 분석 요청 실패: " + e.getMessage()));
        }
    }
}
