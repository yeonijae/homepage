import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// 이미지 업로드
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: '파일이 필요합니다.' },
                { status: 400 }
            );
        }

        // 파일 크기 체크 (10MB 제한)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: '파일 크기는 10MB 이하여야 합니다.' },
                { status: 400 }
            );
        }

        // 허용된 파일 타입
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'JPG, PNG, GIF, WebP 형식만 지원됩니다.' },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        // 고유 파일명 생성
        const timestamp = Date.now();
        const ext = file.name.split('.').pop();
        const fileName = `gallery/${timestamp}.${ext}`;

        // Supabase Storage에 업로드
        const { data, error } = await supabase.storage
            .from('images')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (error) {
            console.error('Storage upload error:', error);
            return NextResponse.json(
                { error: '이미지 업로드에 실패했습니다: ' + error.message },
                { status: 500 }
            );
        }

        // Public URL 생성
        const { data: urlData } = supabase.storage
            .from('images')
            .getPublicUrl(data.path);

        return NextResponse.json({
            success: true,
            url: urlData.publicUrl,
            path: data.path,
        });

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: '서버 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
