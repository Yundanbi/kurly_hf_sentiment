package com.kurly.dto;

public record BoardUpdateRequest(String title, String content, Integer sentimentLabel) {}
