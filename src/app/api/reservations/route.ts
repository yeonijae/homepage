import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { name, phone, email, conditionType, preferredDate, preferredTime, message } = body;

        // 필수 필드 검증
        if (!name || !phone) {
            return NextResponse.json(
                { error: '이름과 전화번호는 필수입니다.' },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        const { data, error } = await supabase
            .from('reservations')
            .insert({
                name,
                phone,
                email,
                condition_type: conditionType,
                preferred_date: preferredDate,
                preferred_time: preferredTime,
                message,
                status: 'pending'
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: '예약 접수 중 오류가 발생했습니다.' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: '예약이 성공적으로 접수되었습니다.',
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

export async function GET() {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('reservations')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: '데이터 조회 중 오류가 발생했습니다.' },
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
