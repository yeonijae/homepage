import Link from 'next/link';
import Navigation from "@/components/common/Navigation";
import Footer from "@/components/common/Footer";
import styles from "./page.module.css";

export const metadata = {
    title: "한의원 소개 | 연이재한의원",
    description: "연이재한의원은 복진 중심의 진료로 병의 근원을 찾아 치료합니다. 차가운 진료에 방치된 환자를 따뜻한 손길로 구한다는 사명을 가지고 있습니다.",
};

export default function AboutPage() {
    return (
        <main>
            <Navigation />

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <p className={styles.label}>ABOUT</p>
                    <h1 className={styles.title}>연이재한의원</h1>
                    <p className={styles.subtitle}>
                        병의 근원을 눌러 보는<br />
                        진정한 한의학
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className={styles.mission}>
                <div className={styles.container}>
                    <div className={styles.missionGrid}>
                        <div className={styles.missionCard}>
                            <h3 className={styles.missionLabel}>사명</h3>
                            <p className={styles.missionText}>
                                차가운 진료에 방치된 환자를<br />
                                따뜻한 손길로 구한다
                            </p>
                        </div>
                        <div className={styles.missionCard}>
                            <h3 className={styles.missionLabel}>미션</h3>
                            <p className={styles.missionText}>
                                병의 근원을 진단하고,<br />
                                오롯이 집중해, 제대로 치료한다
                            </p>
                        </div>
                        <div className={styles.missionCard}>
                            <h3 className={styles.missionLabel}>비전</h3>
                            <p className={styles.missionText}>
                                환자가 비로소 진정한 진료를<br />
                                만났다고 느끼는 한의원
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className={styles.story}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>연이재 이야기</h2>
                    <div className={styles.divider}></div>

                    <div className={styles.storyContent}>
                        <p>
                            연이재한의원의 &apos;연이재(然而齋)&apos;는 &apos;그럼에도 불구하고&apos;라는 의미를 담고 있습니다.
                        </p>
                        <p>
                            현대 의료 시스템에서 환자는 종종 숫자와 데이터로 환원됩니다.
                            3분 진료, 기계적인 검사, 형식적인 상담...
                            그럼에도 불구하고, 우리는 환자 한 명 한 명의 이야기에 귀 기울입니다.
                        </p>
                        <p>
                            복진(腹診)은 손끝으로 환자의 배를 눌러 병의 근원을 찾아가는
                            한의학 고유의 진단법입니다. 이 과정에서 우리는 단순히 증상이 아닌,
                            그 사람의 삶과 체질, 그리고 마음까지 읽어냅니다.
                        </p>
                        <p>
                            &apos;그럼에도 불구하고&apos; 환자를 위한 진료를 포기하지 않는 것,
                            그것이 연이재한의원이 추구하는 가치입니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* Pillars Section */}
            <section className={styles.pillars}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>연이재의 4대 기둥</h2>
                    <div className={styles.divider}></div>

                    <div className={styles.pillarsGrid}>
                        <div className={styles.pillarCard}>
                            <div className={styles.pillarNumber}>01</div>
                            <h3 className={styles.pillarTitle}>복진 중심</h3>
                            <p className={styles.pillarDesc}>
                                손끝으로 보는 진료<br />
                                눌러야 비로소 보이는 것들이 있습니다
                            </p>
                        </div>
                        <div className={styles.pillarCard}>
                            <div className={styles.pillarNumber}>02</div>
                            <h3 className={styles.pillarTitle}>오롯이 집중</h3>
                            <p className={styles.pillarDesc}>
                                한 명 한 명의 세계를 들여다보는 진료<br />
                                당신에게만 집중합니다
                            </p>
                        </div>
                        <div className={styles.pillarCard}>
                            <div className={styles.pillarNumber}>03</div>
                            <h3 className={styles.pillarTitle}>제대로 치료</h3>
                            <p className={styles.pillarDesc}>
                                완성도 · 정교함 · 근거<br />
                                타협 없는 치료를 약속합니다
                            </p>
                        </div>
                        <div className={styles.pillarCard}>
                            <div className={styles.pillarNumber}>04</div>
                            <h3 className={styles.pillarTitle}>따뜻한 손길</h3>
                            <p className={styles.pillarDesc}>
                                인간적인 태도<br />
                                환자를 숫자가 아닌 사람으로 대합니다
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Clinic Info Section */}
            <section className={styles.clinicInfo}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>진료 안내</h2>
                    <div className={styles.divider}></div>

                    <div className={styles.infoGrid}>
                        <div className={styles.infoCard}>
                            <h3>진료 시간</h3>
                            <ul className={styles.infoList}>
                                <li><span>평일</span> 09:30 - 18:30</li>
                                <li><span>토요일</span> 09:30 - 14:00</li>
                                <li><span>점심시간</span> 13:00 - 14:00</li>
                                <li><span>일요일/공휴일</span> 휴진</li>
                            </ul>
                        </div>
                        <div className={styles.infoCard}>
                            <h3>예약 및 문의</h3>
                            <p className={styles.contactNumber}>02-XXX-XXXX</p>
                            <p className={styles.contactNote}>
                                * 예약제로 운영되오니<br />
                                사전 예약 부탁드립니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className={styles.container}>
                    <p className={styles.ctaText}>
                        진정한 진료를 경험하고 싶으신가요?
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
