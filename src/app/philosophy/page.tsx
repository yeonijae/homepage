import Link from 'next/link';
import Navigation from "@/components/common/Navigation";
import Footer from "@/components/common/Footer";
import styles from "./page.module.css";

export const metadata = {
    title: "진료 철학 | 연이재한의원",
    description: "연이재한의원의 진료 철학을 소개합니다. 복진 중심의 진료로 병의 근원을 찾아 치료합니다.",
};

export default function PhilosophyPage() {
    return (
        <main>
            <Navigation />

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <p className={styles.label}>PHILOSOPHY</p>
                    <h1 className={styles.title}>진료 철학</h1>
                    <p className={styles.subtitle}>
                        눌러야 비로소 보이는 것들<br />
                        복진 중심의 한의학
                    </p>
                </div>
            </section>

            {/* Main Philosophy */}
            <section className={styles.mainPhilosophy}>
                <div className={styles.container}>
                    <div className={styles.quoteWrapper}>
                        <p className={styles.quote}>
                            &ldquo;현대 의학의 검사 결과는 객관적이고 정확합니다.<br />
                            하지만, 그것만으로는 보이지 않는 것들이 있습니다.&rdquo;
                        </p>
                    </div>

                    <div className={styles.philosophyText}>
                        <p>
                            복진(腹診)은 손끝으로 환자의 배를 눌러
                            오장육부의 상태를 읽어내는 한의학 고유의 진단법입니다.
                        </p>
                        <p>
                            CT나 MRI로는 볼 수 없는 것, 혈액검사 수치로는 설명되지 않는 것들이 있습니다.
                            왜 같은 병명을 가진 환자들이 다른 경과를 보이는지,
                            왜 어떤 환자는 치료에 반응하고 어떤 환자는 그렇지 않은지—
                            그 답은 종종 눌러봐야 알 수 있습니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* Bokjin Section */}
            <section className={styles.bokjin}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitleLight}>복진이란?</h2>
                    <div className={styles.dividerLight}></div>

                    <div className={styles.bokjinGrid}>
                        <div className={styles.bokjinInfo}>
                            <h3>腹診 · 복진</h3>
                            <p>
                                복진은 배를 손으로 눌러 오장육부의 상태,
                                기혈(氣血)의 흐름, 그리고 병의 원인을 파악하는
                                한의학 전통 진단법입니다.
                            </p>
                            <p>
                                장중경(張仲景)의 &lt;상한론&gt;에서 시작되어
                                2천 년간 발전해온 임상 기술로,
                                현대에도 질병의 본질을 파악하는
                                중요한 진단 도구입니다.
                            </p>
                        </div>
                        <div className={styles.bokjinSteps}>
                            <div className={styles.step}>
                                <span className={styles.stepNumber}>01</span>
                                <div className={styles.stepContent}>
                                    <h4>복부의 긴장도 확인</h4>
                                    <p>배가 딱딱한지, 부드러운지, 어디가 긴장되어 있는지를 살핍니다.</p>
                                </div>
                            </div>
                            <div className={styles.step}>
                                <span className={styles.stepNumber}>02</span>
                                <div className={styles.stepContent}>
                                    <h4>압통점 탐색</h4>
                                    <p>특정 부위를 누를 때 통증이 있는지, 어떤 양상의 통증인지를 확인합니다.</p>
                                </div>
                            </div>
                            <div className={styles.step}>
                                <span className={styles.stepNumber}>03</span>
                                <div className={styles.stepContent}>
                                    <h4>오장육부 상태 파악</h4>
                                    <p>복부의 각 영역이 해당 장기의 상태를 반영합니다.</p>
                                </div>
                            </div>
                            <div className={styles.step}>
                                <span className={styles.stepNumber}>04</span>
                                <div className={styles.stepContent}>
                                    <h4>치료 방향 결정</h4>
                                    <p>복진 결과를 바탕으로 개인에게 맞는 치료 방침을 세웁니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Bokjin */}
            <section className={styles.whyBokjin}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>왜 복진인가?</h2>
                    <div className={styles.divider}></div>

                    <div className={styles.reasonsGrid}>
                        <div className={styles.reasonCard}>
                            <div className={styles.reasonIcon}>💡</div>
                            <h3>검사 결과로 설명되지 않는 증상</h3>
                            <p>
                                &ldquo;검사 결과는 정상인데 불편해요&rdquo;라는 호소를
                                자주 듣습니다. 복진은 수치로 드러나지 않는
                                신체의 불균형을 감지합니다.
                            </p>
                        </div>
                        <div className={styles.reasonCard}>
                            <div className={styles.reasonIcon}>🎯</div>
                            <h3>개인 맞춤형 진단</h3>
                            <p>
                                같은 병명이라도 사람마다 원인과 양상이 다릅니다.
                                복진을 통해 당신만의 치료 방향을 찾습니다.
                            </p>
                        </div>
                        <div className={styles.reasonCard}>
                            <div className={styles.reasonIcon}>🔄</div>
                            <h3>치료 경과 확인</h3>
                            <p>
                                복진 소견의 변화는 치료 효과를 객관적으로
                                보여줍니다. 환자와 의료진 모두 경과를
                                확인할 수 있습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Treatment Process */}
            <section className={styles.process}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>연이재의 진료 과정</h2>
                    <div className={styles.divider}></div>

                    <div className={styles.processTimeline}>
                        <div className={styles.processStep}>
                            <div className={styles.processNumber}>01</div>
                            <div className={styles.processContent}>
                                <h3>문진(問診)</h3>
                                <p>증상, 생활습관, 과거력을 충분히 경청합니다.</p>
                            </div>
                        </div>
                        <div className={styles.processStep}>
                            <div className={styles.processNumber}>02</div>
                            <div className={styles.processContent}>
                                <h3>복진(腹診)</h3>
                                <p>배를 눌러 오장육부의 상태와 병의 근원을 파악합니다.</p>
                            </div>
                        </div>
                        <div className={styles.processStep}>
                            <div className={styles.processNumber}>03</div>
                            <div className={styles.processContent}>
                                <h3>진단 및 설명</h3>
                                <p>발견한 내용을 환자분께 알기 쉽게 설명드립니다.</p>
                            </div>
                        </div>
                        <div className={styles.processStep}>
                            <div className={styles.processNumber}>04</div>
                            <div className={styles.processContent}>
                                <h3>치료</h3>
                                <p>한약, 침, 뜸 등 개인에게 맞는 치료를 시행합니다.</p>
                            </div>
                        </div>
                        <div className={styles.processStep}>
                            <div className={styles.processNumber}>05</div>
                            <div className={styles.processContent}>
                                <h3>경과 관찰</h3>
                                <p>복진을 통해 치료 효과를 확인하고 필요시 조정합니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className={styles.container}>
                    <p className={styles.ctaText}>
                        눌러봐야 보이는 것들,<br />
                        연이재에서 확인하세요
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
