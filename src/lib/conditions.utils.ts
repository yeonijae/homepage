/**
 * 질환 콘텐츠 로드 유틸리티
 */

import type { ConditionContent } from '@/types/condition.types';

// 사용 가능한 콘텐츠 파일 목록 (빌드 시 정적으로 로드)
const AVAILABLE_CONTENT: Record<string, boolean> = {
    // 여성질환
    'dysmenorrhea': true,
    'irregular-menstruation': true,
    'pcos': true,
    'uterine-fibroid': true,
    'adenomyosis': true,
    'menopause': true,
    'thyroid': true,

    // 난임클리닉
    'infertility': true,
    'couple-preparation': true,
    'female-infertility': true,
    'male-infertility': true,
    'ivf-support': true,
    'pregnancy-care': true,

    // 산후케어
    'postpartum': true,
    'postpartum-tonic': true,
    'postpartum-wind': true,
    'postpartum-depression': true,
    'postpartum-bodycare': true,
    'postpartum-diet': true,
    'parenting-syndrome': true,

    // 소아청소년
    'growth-tonic': true,
    'precocious-puberty': true,
    'child-immunity': true,
    'concentration': true,

    // 피부
    'atopy': true,
    'psoriasis': true,
    'urticaria': true,
    'eczema': true,
    'dyshidrosis': true,
    'molluscum': true,
    'hyperhidrosis': true,

    // 소화기
    'gerd': true,
    'chronic-gastritis': true,
    'leaky-gut': true,
    'damjeok': true,
    'ibs': true,
    'ulcerative-colitis': true,
    'crohns': true,

    // 비뇨기
    'overactive-bladder': true,
    'incontinence': true,
    'prostate': true,

    // 신경정신
    'insomnia': true,
    'sleep-quality': true,
    'headache': true,
    'dizziness': true,
    'bppv': true,
    'tinnitus': true,

    // 다이어트
    'diet': true,
    'body-correction': true,

    // 교통사고
    'traffic-accident': true,
};

/**
 * 특정 질환의 콘텐츠를 로드합니다.
 * 콘텐츠가 없으면 null을 반환합니다.
 */
export async function getConditionContent(slug: string): Promise<ConditionContent | null> {
    if (!AVAILABLE_CONTENT[slug]) {
        return null;
    }

    try {
        // Dynamic import for JSON content
        const content = await import(`@data/conditions/content/${slug}.json`);
        return content.default as ConditionContent;
    } catch (error) {
        console.warn(`Failed to load content for ${slug}:`, error);
        return null;
    }
}

/**
 * 콘텐츠가 있는 질환인지 확인합니다.
 */
export function hasConditionContent(slug: string): boolean {
    return !!AVAILABLE_CONTENT[slug];
}
