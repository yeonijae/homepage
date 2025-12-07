import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navigation from "@/components/common/Navigation";
import Footer from "@/components/common/Footer";
import styles from "./page.module.css";
import conditionsData from "@data/conditions/index.json";
import { CATEGORY_META, ConditionCategory } from "@/lib/conditions";
import { getConditionContent } from "@/lib/conditions.utils";
import type { ConditionContent, CauseContent, TreatmentItem, FAQItem } from "@/types/condition.types";

// 카테고리별 이미지 매핑
const CATEGORY_IMAGES: Record<string, string> = {
    'womens-health': '/images/conditions/women-health.png',
    'infertility': '/images/conditions/women-health.png',
    'postpartum': '/images/conditions/women-health.png',
    'pediatric': '/images/conditions/women-health.png',
    'skin': '/images/conditions/skin-health.png',
    'digestive': '/images/conditions/digestive-health.png',
    'urology': '/images/conditions/digestive-health.png',
    'neuro': '/images/conditions/pain-wellness.png',
    'diet': '/images/conditions/pain-wellness.png',
    'traffic': '/images/conditions/pain-wellness.png',
};

interface Props {
    params: Promise<{ slug: string }>;
}

// 정적 경로 생성
export async function generateStaticParams() {
    return conditionsData.conditions.map((condition) => ({
        slug: condition.slug,
    }));
}

// 메타데이터 생성
export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const condition = conditionsData.conditions.find(c => c.slug === slug);

    if (!condition) {
        return { title: '페이지를 찾을 수 없습니다' };
    }

    return {
        title: `${condition.name} 치료 | 연이재한의원`,
        description: `연이재한의원의 ${condition.name} 치료 안내입니다. 복진 중심의 진료로 병의 근원을 찾아 치료합니다.`,
    };
}

export default async function ConditionPage({ params }: Props) {
    const { slug } = await params;
    const condition = conditionsData.conditions.find(c => c.slug === slug);

    if (!condition) {
        notFound();
    }

    const categoryMeta = CATEGORY_META[condition.category as ConditionCategory];
    const categoryImage = CATEGORY_IMAGES[condition.category] || '/images/conditions/women-health.png';

    // 콘텐츠 로드 (없으면 null)
    const content = await getConditionContent(slug);

    // 같은 카테고리의 관련 질환 찾기
    const relatedConditions = conditionsData.conditions.filter(
        c => c.category === condition.category && c.slug !== slug && !c.isClusterHub
    ).slice(0, 4);

    // 클러스터 허브 페이지인 경우 하위 질환 찾기
    const clusterChildren = condition.isClusterHub
        ? conditionsData.conditions.filter(c => c.cluster === slug)
        : [];

    return (
        <main className={styles[condition.theme] || ''}>
            <Navigation />

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroGrid}>
                    <div className={styles.heroContent}>
                        <p className={styles.categoryLabel}>{categoryMeta.name}</p>
                        <h1 className={styles.title}>{condition.name}</h1>
                        <p className={styles.subtitle}>
                            {content?.heroDescription || (
                                <>
                                    복진 중심의 진료로<br />
                                    {condition.name}의 근원을 찾아 치료합니다
                                </>
                            )}
                        </p>
                        <Link href="/reservation" className={styles.heroBtn}>
                            상담 예약하기
                        </Link>
                    </div>
                    <div className={styles.heroImage}>
                        <Image
                            src={categoryImage}
                            alt={`${condition.name} 치료 일러스트`}
                            width={400}
                            height={400}
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* 클러스터 허브인 경우: 하위 메뉴 표시 */}
            {condition.isClusterHub && clusterChildren.length > 0 && (
                <section className={styles.clusterNav}>
                    <div className={styles.container}>
                        <div className={styles.clusterGrid}>
                            {clusterChildren.map(child => (
                                <Link
                                    key={child.slug}
                                    href={`/conditions/${child.slug}`}
                                    className={styles.clusterCard}
                                >
                                    <h3>{child.name}</h3>
                                    <span className={styles.arrow}>→</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Main Content */}
            <section className={styles.content}>
                <div className={styles.container}>
                    <div className={styles.contentGrid}>
                        {/* 왼쪽: 메인 콘텐츠 */}
                        <div className={styles.mainContent}>

                            {/* 증상 섹션 */}
                            <div className={styles.section}>
                                <h2>이런 증상이 있으신가요?</h2>
                                <div className={styles.symptomList}>
                                    {content ? (
                                        <SymptomsContent symptoms={content.symptoms} />
                                    ) : (
                                        <SymptomPlaceholder condition={condition.name} />
                                    )}
                                </div>
                            </div>

                            {/* 원인 섹션 */}
                            <div className={styles.section}>
                                <h2>연이재가 보는 {condition.name}의 원인</h2>
                                <div className={styles.causeContent}>
                                    {content ? (
                                        <CausesContent causes={content.causes} />
                                    ) : (
                                        <CausePlaceholder condition={condition.name} />
                                    )}
                                </div>
                            </div>

                            {/* 복진 섹션 */}
                            <div className={styles.bokjinSection}>
                                <div className={styles.bokjinContent}>
                                    <span className={styles.bokjinLabel}>복진 중심 진료</span>
                                    <h3>눌러봐야 보이는 것들</h3>
                                    <p>
                                        {content?.bokjinNote || (
                                            `검사 결과만으로는 알 수 없는 것들이 있습니다. 복진을 통해 ${condition.name}의 근본 원인을 찾아갑니다.`
                                        )}
                                    </p>
                                    <Link href="/philosophy" className={styles.bokjinLink}>
                                        복진 진료에 대해 자세히 알아보기 →
                                    </Link>
                                </div>
                            </div>

                            {/* 치료 방법 섹션 */}
                            <div className={styles.section}>
                                <h2>연이재의 {condition.name} 치료</h2>
                                <div className={styles.treatmentContent}>
                                    {content ? (
                                        <TreatmentsContent treatments={content.treatments} />
                                    ) : (
                                        <TreatmentPlaceholder condition={condition.name} />
                                    )}
                                </div>
                            </div>

                            {/* FAQ 섹션 (콘텐츠가 있는 경우만) */}
                            {content?.faq && content.faq.length > 0 && (
                                <div className={styles.section}>
                                    <h2>자주 묻는 질문</h2>
                                    <div className={styles.faqContent}>
                                        <FAQContent faq={content.faq} />
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* 오른쪽: 사이드바 */}
                        <aside className={styles.sidebar}>
                            <div className={styles.ctaCard}>
                                <h3>{condition.name} 상담</h3>
                                <p>궁금한 점이 있으시면 상담을 예약해 주세요.</p>
                                <Link href="/reservation" className="btn btn--primary" style={{ width: '100%', textAlign: 'center' }}>
                                    상담 예약하기
                                </Link>
                                <a href="tel:02-XXX-XXXX" className={styles.phoneLink}>
                                    📞 02-XXX-XXXX
                                </a>
                            </div>

                            {/* 클러스터 하위 페이지인 경우 허브로 돌아가기 */}
                            {condition.cluster && (
                                <div className={styles.clusterBackCard}>
                                    <Link href={`/conditions/${condition.cluster}`}>
                                        ← {condition.cluster === 'infertility' ? '난임 클리닉' : '산후케어 센터'} 전체 보기
                                    </Link>
                                </div>
                            )}

                            {/* 관련 질환 */}
                            {relatedConditions.length > 0 && (
                                <div className={styles.relatedCard}>
                                    <h4>관련 질환</h4>
                                    <ul>
                                        {relatedConditions.map(related => (
                                            <li key={related.slug}>
                                                <Link href={`/conditions/${related.slug}`}>
                                                    {related.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className={styles.container}>
                    <p className={styles.ctaText}>
                        {condition.name}, 더 이상 방치하지 마세요<br />
                        연이재에서 근본적인 치료를 시작하세요
                    </p>
                    <Link href="/reservation" className="btn btn--primary">
                        진료 예약하기
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}

// ============ 콘텐츠 컴포넌트 ============

function SymptomsContent({ symptoms }: { symptoms: string[] }) {
    return (
        <ul className={styles.checkList}>
            {symptoms.map((symptom, i) => (
                <li key={i}>✓ {symptom}</li>
            ))}
        </ul>
    );
}

function CausesContent({ causes }: { causes: CauseContent }) {
    return (
        <div className={styles.causeBox}>
            <p className={styles.causeIntro}>{causes.intro}</p>
            <div className={styles.causePoints}>
                {causes.points.map((point, i) => (
                    <div key={i} className={styles.causePoint}>
                        <h4>{point.title}</h4>
                        <p>{point.description}</p>
                    </div>
                ))}
            </div>
            {causes.conclusion && (
                <p className={styles.causeConclusion}>{causes.conclusion}</p>
            )}
        </div>
    );
}

function TreatmentsContent({ treatments }: { treatments: TreatmentItem[] }) {
    return (
        <div className={styles.treatmentGrid}>
            {treatments.map((treatment, i) => (
                <div key={i} className={styles.treatmentItem}>
                    <h4>{treatment.title}</h4>
                    <p>{treatment.description}</p>
                </div>
            ))}
        </div>
    );
}

function FAQContent({ faq }: { faq: FAQItem[] }) {
    return (
        <div className={styles.faqList}>
            {faq.map((item, i) => (
                <div key={i} className={styles.faqItem}>
                    <h4 className={styles.faqQuestion}>Q. {item.question}</h4>
                    <p className={styles.faqAnswer}>{item.answer}</p>
                </div>
            ))}
        </div>
    );
}

// ============ 플레이스홀더 컴포넌트 (폴백용) ============

function SymptomPlaceholder({ condition }: { condition: string }) {
    const symptoms = [
        "만성적인 불편감이 있다",
        "컨디션 저하가 지속된다",
        "일상생활에 지장이 있다",
        "기존 치료에 효과가 없었다",
    ];

    return (
        <ul className={styles.checkList}>
            {symptoms.map((symptom, i) => (
                <li key={i}>✓ {symptom}</li>
            ))}
        </ul>
    );
}

function CausePlaceholder({ condition }: { condition: string }) {
    return (
        <div className={styles.causeBox}>
            <p>
                현대 의학에서는 {condition}을/를 주로 증상 중심으로 접근합니다.
                하지만 연이재한의원에서는 복진을 통해 오장육부의 불균형을 파악하고,
                그 근본 원인을 찾아 치료합니다.
            </p>
            <p>
                특히 {condition}의 경우, 단순히 해당 부위만의 문제가 아닌
                전신적인 기혈 순환과 장부 기능의 조화가 중요합니다.
            </p>
        </div>
    );
}

function TreatmentPlaceholder({ condition }: { condition: string }) {
    return (
        <div className={styles.treatmentGrid}>
            <div className={styles.treatmentItem}>
                <h4>한약 치료</h4>
                <p>개인 체질과 증상에 맞춘 맞춤 처방</p>
            </div>
            <div className={styles.treatmentItem}>
                <h4>침 치료</h4>
                <p>경락 자극을 통한 기혈 순환 개선</p>
            </div>
            <div className={styles.treatmentItem}>
                <h4>뜸 치료</h4>
                <p>온열 자극으로 면역력 강화</p>
            </div>
            <div className={styles.treatmentItem}>
                <h4>생활 관리</h4>
                <p>식이요법 및 생활습관 교정 안내</p>
            </div>
        </div>
    );
}
