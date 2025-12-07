-- ======================================
-- 연이재한의원 Supabase 테이블 생성 스크립트
-- Supabase SQL Editor에서 실행하세요
-- ======================================

-- 1. 상담 예약 테이블
CREATE TABLE IF NOT EXISTS reservations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    condition_type VARCHAR(100),
    preferred_date DATE,
    preferred_time VARCHAR(20),
    message TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 블로그 포스트 테이블
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    thumbnail_url VARCHAR(500),
    category VARCHAR(100),
    tags TEXT[],
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 갤러리 이미지 테이블
CREATE TABLE IF NOT EXISTS gallery_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    src VARCHAR(500) NOT NULL,
    alt VARCHAR(255),
    caption VARCHAR(255),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 리드(잠재고객) 테이블
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    condition_type VARCHAR(100),
    stage VARCHAR(50) DEFAULT 'inquiry',
    priority VARCHAR(20) DEFAULT 'normal',
    notes TEXT,
    source VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) 활성화
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 공개 읽기 정책 (블로그, 갤러리)
CREATE POLICY "Public read access for blog_posts" ON blog_posts
    FOR SELECT USING (is_published = true);

CREATE POLICY "Public read access for gallery_images" ON gallery_images
    FOR SELECT USING (is_active = true);

-- 예약은 누구나 삽입 가능
CREATE POLICY "Anyone can insert reservations" ON reservations
    FOR INSERT WITH CHECK (true);

-- 인덱스 생성
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reservations_created_at ON reservations(created_at DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published, published_at DESC);
CREATE INDEX idx_gallery_images_order ON gallery_images(display_order);
CREATE INDEX idx_leads_stage ON leads(stage);

-- 완료 메시지
SELECT 'Tables created successfully!' as message;
