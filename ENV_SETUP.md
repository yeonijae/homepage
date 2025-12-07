# 연이재한의원 웹사이트 환경 변수 설정

## Supabase 설정
아래 값들을 Supabase 대시보드에서 복사하세요:
- Project Settings > API

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Google Gemini API (AI SEO 최적화용)
Google AI Studio에서 API 키를 발급받으세요:
- https://makersuite.google.com/app/apikey

```
GEMINI_API_KEY=your_gemini_api_key
```

## 설정 방법
1. 프로젝트 루트에 `.env.local` 파일 생성
2. 위 변수들을 복사하여 실제 값으로 교체
