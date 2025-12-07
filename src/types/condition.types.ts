/**
 * 질환 콘텐츠 데이터 타입 정의
 */

export interface SymptomItem {
    text: string;
    description?: string;
}

export interface CauseContent {
    intro: string;
    points: {
        title: string;
        description: string;
    }[];
    conclusion?: string;
}

export interface TreatmentItem {
    title: string;
    description: string;
    icon?: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface ConditionContent {
    slug: string;
    heroDescription?: string;
    symptoms: string[];
    causes: CauseContent;
    treatments: TreatmentItem[];
    bokjinNote?: string;
    faq?: FAQItem[];
}
