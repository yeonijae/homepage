/**
 * 블로그 관련 타입 정의
 */

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;  // Markdown
    category: BlogCategory;
    tags: string[];
    author: string;
    publishedAt: string;
    thumbnail?: string;
    readingTime?: number;  // 분 단위
}

export type BlogCategory =
    | 'womens-health'    // 여성건강
    | 'infertility'      // 난임
    | 'digestive'        // 소화기
    | 'skin'             // 피부
    | 'general'          // 일반 건강정보
    | 'clinic-news';     // 한의원 소식

export interface BlogCategoryInfo {
    id: BlogCategory;
    name: string;
    description: string;
}

export const BLOG_CATEGORIES: BlogCategoryInfo[] = [
    { id: 'womens-health', name: '여성건강', description: '여성 질환 및 건강 정보' },
    { id: 'infertility', name: '난임', description: '난임 치료 및 임신 준비' },
    { id: 'digestive', name: '소화기', description: '소화기 질환 및 장 건강' },
    { id: 'skin', name: '피부', description: '피부 질환 및 관리' },
    { id: 'general', name: '건강정보', description: '일반 건강 정보 및 팁' },
    { id: 'clinic-news', name: '한의원 소식', description: '연이재한의원 소식' },
];
