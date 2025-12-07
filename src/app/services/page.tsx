import Navigation from "@/components/common/Navigation";
import Footer from "@/components/common/Footer";
import styles from "./page.module.css";

export const metadata = {
    title: "치료 방법 | 연이재한의원",
    description: "연이재한의원의 치료 방법을 소개합니다. 한약, 침, 뜸 등 전통 한의학 치료를 현대적으로 제공합니다.",
};

export default function ServicesPage() {
    return (
        <main>
            <Navigation />

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <p className={styles.label}>SERVICES</p>
                    <h1 className={styles.title}>치료 방법</h1>
                    <p className={styles.subtitle}>
                        전통의 지혜와 현대의 정교함으로<br />
                        제대로 치료합니다
                    </p>
                </div>
            </section>

            {/* Treatment Intro */}
            <section className={styles.intro}>
                <div className={styles.container}>
                    <p className={styles.introText}>
                        연이재한의원에서는 복진을 통해 파악한 개인의 상태에 따라
                        가장 적합한 치료 방법을 선택합니다.
                        모든 치료는 근거에 기반하며, 환자분께 충분히 설명 드린 후 시행합니다.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className={styles.services}>
                <div className={styles.container}>

                    {/* 한약 치료 */}
                    <div className={styles.serviceCard}>
                        <div className={styles.serviceHeader}>
                            <span className={styles.serviceNumber}>01</span>
                            <h2 className={styles.serviceTitle}>한약 치료</h2>
                        </div>
                        <div className={styles.serviceContent}>
                            <p className={styles.serviceDesc}>
                                복진 결과를 바탕으로 개인에게 맞는 처방을 구성합니다.
                                같은 증상이라도 사람마다 다른 처방이 필요할 수 있습니다.
                            </p>
                            <div className={styles.serviceDetails}>
                                <div className={styles.detailItem}>
                                    <h4>탕약 (湯藥)</h4>
                                    <p>개인 맞춤 처방으로 복용하는 전통 방식의 한약입니다. 체질과 증상에 따라 약재를 가감합니다.</p>
                                </div>
                                <div className={styles.detailItem}>
                                    <h4>환제 (丸劑)</h4>
                                    <p>장기 복용이 필요한 경우 편리하게 복용할 수 있는 알약 형태의 한약입니다.</p>
                                </div>
                                <div className={styles.detailItem}>
                                    <h4>첩약 (貼藥)</h4>
                                    <p>급성 증상 치료를 위해 단기간 집중 복용하는 한약입니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 침 치료 */}
                    <div className={styles.serviceCard}>
                        <div className={styles.serviceHeader}>
                            <span className={styles.serviceNumber}>02</span>
                            <h2 className={styles.serviceTitle}>침 치료</h2>
                        </div>
                        <div className={styles.serviceContent}>
                            <p className={styles.serviceDesc}>
                                경락과 경혈을 자극하여 기혈 순환을 촉진하고
                                근육의 긴장을 풀어줍니다.
                            </p>
                            <div className={styles.serviceDetails}>
                                <div className={styles.detailItem}>
                                    <h4>체침 (體鍼)</h4>
                                    <p>전신 경혈을 활용한 일반 침 치료로, 다양한 질환에 폭넓게 적용됩니다.</p>
                                </div>
                                <div className={styles.detailItem}>
                                    <h4>복침 (腹鍼)</h4>
                                    <p>복부 경혈을 활용한 특수 침법으로, 내과 질환 치료에 효과적입니다.</p>
                                </div>
                                <div className={styles.detailItem}>
                                    <h4>약침 (藥鍼)</h4>
                                    <p>한약 성분을 추출하여 경혈에 직접 주입하는 치료법입니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 뜸 치료 */}
                    <div className={styles.serviceCard}>
                        <div className={styles.serviceHeader}>
                            <span className={styles.serviceNumber}>03</span>
                            <h2 className={styles.serviceTitle}>뜸 치료</h2>
                        </div>
                        <div className={styles.serviceContent}>
                            <p className={styles.serviceDesc}>
                                온열 자극을 통해 기혈 순환을 촉진하고
                                몸의 냉기를 몰아내어 면역력을 높입니다.
                            </p>
                            <div className={styles.serviceDetails}>
                                <div className={styles.detailItem}>
                                    <h4>직접구</h4>
                                    <p>피부에 직접 쑥을 올려 시행하는 전통 방식의 뜸 치료입니다.</p>
                                </div>
                                <div className={styles.detailItem}>
                                    <h4>간접구</h4>
                                    <p>생강이나 소금 등을 매개로 하여 부드럽게 온열을 전달합니다.</p>
                                </div>
                                <div className={styles.detailItem}>
                                    <h4>봉독구</h4>
                                    <p>봉독(蜂毒)을 활용한 특수 뜸 치료로, 면역 질환에 활용됩니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 부항 치료 */}
                    <div className={styles.serviceCard}>
                        <div className={styles.serviceHeader}>
                            <span className={styles.serviceNumber}>04</span>
                            <h2 className={styles.serviceTitle}>부항 치료</h2>
                        </div>
                        <div className={styles.serviceContent}>
                            <p className={styles.serviceDesc}>
                                음압을 이용하여 피부와 근육을 자극하고
                                어혈(瘀血)을 제거하며 순환을 개선합니다.
                            </p>
                            <div className={styles.serviceDetails}>
                                <div className={styles.detailItem}>
                                    <h4>건식 부항</h4>
                                    <p>진공 음압만을 이용한 부항 치료로, 근육 이완과 순환 개선에 효과적입니다.</p>
                                </div>
                                <div className={styles.detailItem}>
                                    <h4>습식 부항</h4>
                                    <p>피부에 작은 상처를 낸 후 부항을 적용하여 어혈을 배출합니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Treatment Categories */}
            <section className={styles.categories}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>주요 진료 분야</h2>
                    <div className={styles.divider}></div>

                    <div className={styles.categoryGrid}>
                        <div className={styles.categoryCard}>
                            <h3>여성 질환</h3>
                            <ul>
                                <li>생리불순 · 생리통</li>
                                <li>다낭성난소증후군</li>
                                <li>자궁근종 · 자궁내막증</li>
                                <li>난임 · 습관성 유산</li>
                                <li>갱년기 증후군</li>
                            </ul>
                        </div>
                        <div className={styles.categoryCard}>
                            <h3>소화기 질환</h3>
                            <ul>
                                <li>역류성 식도염</li>
                                <li>기능성 소화불량</li>
                                <li>과민성 대장증후군</li>
                                <li>만성 변비 · 설사</li>
                                <li>위염 · 장염</li>
                            </ul>
                        </div>
                        <div className={styles.categoryCard}>
                            <h3>피부 질환</h3>
                            <ul>
                                <li>아토피 피부염</li>
                                <li>여드름 · 지루성 피부염</li>
                                <li>두드러기 · 습진</li>
                                <li>건선</li>
                                <li>탈모</li>
                            </ul>
                        </div>
                        <div className={styles.categoryCard}>
                            <h3>기타 질환</h3>
                            <ul>
                                <li>만성 피로</li>
                                <li>불면증 · 불안</li>
                                <li>두통 · 어지럼증</li>
                                <li>허리 · 관절 통증</li>
                                <li>체질 개선</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className={styles.container}>
                    <p className={styles.ctaText}>
                        어떤 치료가 필요한지 궁금하신가요?<br />
                        복진을 통해 확인해 드립니다
                    </p>
                    <button className="btn btn--primary">
                        상담 예약하기
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
