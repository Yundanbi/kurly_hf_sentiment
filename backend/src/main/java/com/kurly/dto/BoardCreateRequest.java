package com.kurly.dto;

public record BoardCreateRequest(String title, String content, Integer sentimentLabel) {}