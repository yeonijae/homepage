import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// 블로그 목록 조회
export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { searchParams } = new URL(request.url);

        const includeUnpublished = searchParams.get('includeUnpublished') === 'true';

        let query = supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (!includeUnpublished) {
            query = query.eq('is_published', true);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: '블로그 목록을 불러오는 중 오류가 발생했습니다.' },
                { status: 500 }
            );
        }

        return NextResponse.json({ data });

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: '서버 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}

// 블로그 포스트 생성
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { title, slug, excerpt, content, category, tags, isPublished } = body;

        if (!title || !content) {
            return NextResponse.json(
                { error: '제목과 내용은 필수입니다.' },
                { status: 400 }
            );
        }

        // slug 자동 생성 (없으면)
        const finalSlug = slug || title
            .toLowerCase()
            .replace(/[^a-z0-9가-힣\s]/g, '')
            .replace(/\s+/g, '-')
            .substring(0, 100) + '-' + Date.now();

        const supabase = await createClient();

        const postData = {
            title,
            slug: finalSlug,
            excerpt: excerpt || content.replace(/<[^>]*>/g, '').substring(0, 200),
            content,
            category,
            tags: tags || [],
            is_published: isPublished || false,
            published_at: isPublished ? new Date().toISOString() : null,
        };

        const { data, error } = await supabase
            .from('blog_posts')
            .insert(postData)
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: '블로그 저장 중 오류가 발생했습니다.' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: isPublished ? '발행되었습니다.' : '임시저장되었습니다.',
            data
        });

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: '서버 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
