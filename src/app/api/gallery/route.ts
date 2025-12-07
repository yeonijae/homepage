import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// 갤러리 이미지 목록 조회
export async function GET() {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('gallery_images')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: '갤러리 이미지를 불러오는 중 오류가 발생했습니다.' },
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

// 갤러리 이미지 추가
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { src, alt, caption, displayOrder } = body;

        if (!src) {
            return NextResponse.json(
                { error: '이미지 URL은 필수입니다.' },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        const { data, error } = await supabase
            .from('gallery_images')
            .insert({
                src,
                alt: alt || '',
                caption: caption || '',
                display_order: displayOrder || 0,
                is_active: true,
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: '이미지 저장 중 오류가 발생했습니다.' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: '이미지가 추가되었습니다.',
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

// 갤러리 이미지 삭제 (soft delete)
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: '이미지 ID가 필요합니다.' },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        const { error } = await supabase
            .from('gallery_images')
            .update({ is_active: false })
            .eq('id', id);

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: '이미지 삭제 중 오류가 발생했습니다.' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: '이미지가 삭제되었습니다.'
        });

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: '서버 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
