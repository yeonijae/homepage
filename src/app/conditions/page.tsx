'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navigation from "@/components/common/Navigation";
import Footer from "@/components/common/Footer";
import styles from "./page.module.css";
import conditionsData from "@data/conditions/index.json";
import { CATEGORY_META, ConditionCategory } from "@/lib/conditions";

// 카테고리별로 질환 그룹화
function groupByCategory(conditions: typeof conditionsData.conditions) {
    const groups: Record<string, typeof conditions> = {};

    conditions.forEach(condition => {
        if (!groups[condition.category]) {
            groups[condition.category] = [];
        }
        groups[condition.category].push(condition);
    });

    return groups;
}

// 카테고리 순서 정의
const CATEGORY_ORDER: ConditionCategory[] = [
    'womens-health',
    'infertility',
    'postpartum',
    'pediatric',
    'skin',
    'digestive',
    'urology',
    'neuro',
    'diet',
    'traffic'
];

export default function ConditionsPage() {
    const router = useRouter();
    const grouped = groupByCategory(conditionsData.conditions);
    const [activeCategory, setActiveCategory] = useState<ConditionCategory>('womens-health');

    const activeConditions = grouped[activeCategory] || [];
    const activeMeta = CATEGORY_META[activeCategory];

    // 카테고리 클릭 처리 - 특정 카테고리는 바로 페이지로 이동
    const handleCategoryClick = (categoryKey: ConditionCategory) => {
        if (categoryKey === 'traffic') {
            router.push('/conditions/traffic-accident');
        } else if (categoryKey === 'infertility') {
            router.push('/conditions/infertility');
        } else if (categoryKey === 'postpartum') {
            router.push('/conditions/postpartum');
        } else {
            setActiveCategory(categoryKey);
        }
    };

    return (
        <main>
            <Navigation />

            {/* Hero Section - Compact */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <p className={styles.label}>CONDITIONS</p>
                    <h1 className={styles.title}>질환별 진료 안내</h1>
                    <p className={styles.subtitle}>
                        어떤 증상이 불편하신가요?<br />
                        복진 중심의 진료로 병의 근원을 찾아드립니다
                    </p>
                </div>
            </section>

            {/* Two Column Layout */}
            <section className={styles.twoColumn}>
                {/* Left Sidebar - Categories */}
                <aside className={styles.sidebar}>
                    <h2 className={styles.sidebarTitle}>카테고리</h2>
                    <nav className={styles.categoryNav}>
                        {CATEGORY_ORDER.map(categoryKey => {
                            const meta = CATEGORY_META[categoryKey];
                            const count = (grouped[categoryKey] || []).filter(c => !c.cluster || c.isClusterHub).length;
                            const isActive = activeCategory === categoryKey;

                            return (
                                <button
                                    key={categoryKey}
                                    className={`${styles.categoryBtn} ${isActive ? styles.categoryActive : ''}`}
                                    onClick={() => handleCategoryClick(categoryKey)}
                                >
                                    <span className={styles.categoryName}>{meta.name}</span>
                                    <span className={styles.categoryCount}>{count}</span>
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Right Content - Conditions */}
                <div className={styles.content}>
                    <div className={styles.contentHeader}>
                        <h2 className={styles.contentTitle}>{activeMeta.name}</h2>
                        <p className={styles.contentDesc}>{activeMeta.description}</p>
                    </div>

                    <ul className={styles.conditionList}>
                        {activeConditions
                            .filter(c => {
                                // 난임클리닉: 모든 하위 항목 표시
                                if (activeCategory === 'infertility') return true;
                                // 다른 카테고리: 클러스터 허브만 표시
                                return !c.cluster || c.isClusterHub;
                            })
                            .map(condition => (
                                <li key={condition.slug}>
                                    <Link
                                        href={`/conditions/${condition.slug}`}
                                        className={`${styles.conditionLink} ${condition.isClusterHub ? styles.hubLink : ''}`}
                                    >
                                        <span className={styles.conditionName}>{condition.name}</span>
                                        {condition.isClusterHub && (
                                            <span className={styles.badge}>특설클리닉</span>
                                        )}
                                        <span className={styles.arrow}>→</span>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </section>

            {/* Bokjin CTA */}
            <section className={styles.cta}>
                <div className={styles.container}>
                    <h2>어떤 질환인지 잘 모르시겠다면?</h2>
                    <p>
                        증상이 복합적이거나 원인을 모르는 경우,<br />
                        복진을 통해 정확한 진단을 받아보세요.
                    </p>
                    <Link href="/reservation" className="btn btn--primary">
                        상담 예약하기
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
