// 질환 데이터 타입 정의

export interface Condition {
    // 기본 정보
    slug: string;
    name: string;
    nameEn: string;
    category: ConditionCategory;

    // 클러스터 정보 (선택)
    cluster?: string; // 'infertility' | 'postpartum' 등
    isClusterHub?: boolean; // 허브 페이지 여부

    // 페이지 콘텐츠
    hero: {
        tagline: string;
        title: string;
        subtitle: string;
    };

    // 증상
    symptoms: string[];

    // 원인 (연이재 관점)
    causes: {
        title: string;
        description: string;
    }[];

    // 연이재 치료 방법
    treatment: {
        approach: string;
        methods: string[];
        duration?: string;
    };

    // FAQ
    faq?: {
        question: string;
        answer: string;
    }[];

    // 관련 질환
    relatedConditions?: string[]; // 다른 질환 slug 배열

    // SEO
    seo: {
        title: string;
        description: string;
        keywords: string[];
    };

    // 테마
    theme: 'womens-health' | 'infertility' | 'postpartum' | 'pediatric' | 'skin' | 'digestive' | 'urology' | 'neuro' | 'diet' | 'traffic' | 'default';
}

export type ConditionCategory =
    | 'womens-health'      // 여성 질환
    | 'infertility'        // 난임
    | 'postpartum'         // 출산/산후
    | 'pediatric'          // 소아
    | 'skin'               // 피부
    | 'digestive'          // 소화기
    | 'urology'            // 비뇨기/남성
    | 'neuro'              // 신경·정신/감각
    | 'diet'               // 다이어트/체형
    | 'traffic';           // 교통사고

export interface ConditionCluster {
    slug: string;
    name: string;
    description: string;
    theme: string;
    hub: Condition;
    children: Condition[];
}

// 카테고리 메타 정보
export const CATEGORY_META: Record<ConditionCategory, { name: string; description: string; theme: string }> = {
    'womens-health': {
        name: '여성 질환',
        description: '여성만의 섬세한 건강 문제를 복진 중심으로 치료합니다',
        theme: 'womens-health'
    },
    'infertility': {
        name: '난임 클리닉',
        description: '임신을 준비하는 모든 여정을 함께합니다',
        theme: 'infertility'
    },
    'postpartum': {
        name: '산후케어 센터',
        description: '출산 후 회복과 건강한 육아를 위한 맞춤 케어',
        theme: 'postpartum'
    },
    'pediatric': {
        name: '소아 클리닉',
        description: '아이의 건강한 성장을 위한 한의학적 접근',
        theme: 'pediatric'
    },
    'skin': {
        name: '피부 질환',
        description: '피부 속 원인을 찾아 근본적으로 치료합니다',
        theme: 'skin'
    },
    'digestive': {
        name: '소화기 질환',
        description: '복진으로 소화기 문제의 근원을 진단합니다',
        theme: 'digestive'
    },
    'urology': {
        name: '비뇨기·남성',
        description: '비뇨기와 남성 건강 문제를 세심하게 치료합니다',
        theme: 'urology'
    },
    'neuro': {
        name: '신경·정신·감각',
        description: '불면, 두통, 이명 등 복합적인 증상을 다룹니다',
        theme: 'neuro'
    },
    'diet': {
        name: '다이어트·체형',
        description: '체질에 맞는 건강한 다이어트와 체형 교정',
        theme: 'diet'
    },
    'traffic': {
        name: '교통사고 후유증',
        description: '교통사고 후 만성 통증 전환을 방지합니다',
        theme: 'traffic'
    }
};
