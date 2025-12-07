import Navigation from "@/components/common/Navigation";
import Footer from "@/components/common/Footer";
import styles from "./page.module.css";

export const metadata = {
    title: "의료진 소개 | 연이재한의원",
    description: "연이재한의원의 의료진을 소개합니다. 복진 중심의 진료로 환자 한 명 한 명에게 오롯이 집중하는 한의사입니다.",
};

export default function DoctorsPage() {
    return (
        <main>
            <Navigation />

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <p className={styles.label}>DOCTORS</p>
                    <h1 className={styles.title}>의료진 소개</h1>
                    <p className={styles.subtitle}>
                        손끝으로 읽고, 마음으로 치료하는<br />
                        연이재의 의료진입니다
                    </p>
                </div>
            </section>

            {/* Doctor Profile Section */}
            <section className={styles.profile}>
                <div className={styles.container}>
                    <div className={styles.profileGrid}>
                        {/* Doctor Image */}
                        <div className={styles.imageWrapper}>
                            <div className={styles.imagePlaceholder}>
                                <span className={styles.imagePlaceholderText}>원장<br />사진</span>
                            </div>
                            {/* <Image 
                                src="/images/doctor.jpg" 
                                alt="원장님 사진"
                                width={400}
                                height={500}
                                className={styles.doctorImage}
                            /> */}
                        </div>

                        {/* Doctor Info */}
                        <div className={styles.info}>
                            <p className={styles.position}>대표원장</p>
                            <h2 className={styles.name}>홍길동</h2>

                            <div className={styles.philosophy}>
                                <p>
                                    &ldquo;진료실에서 환자를 마주할 때마다<br />
                                    저는 한 명의 세계를 들여다봅니다.&rdquo;
                                </p>
                            </div>

                            <div className={styles.credentials}>
                                <h3>학력 및 경력</h3>
                                <ul>
                                    <li>OO대학교 한의과대학 졸업</li>
                                    <li>OO대학교 한방부인과 석사</li>
                                    <li>OO한방병원 전공의 수료</li>
                                    <li>대한한방부인과학회 정회원</li>
                                    <li>대한복진연구회 정회원</li>
                                </ul>
                            </div>

                            <div className={styles.specialties}>
                                <h3>전문 진료 분야</h3>
                                <div className={styles.tags}>
                                    <span className={styles.tag}>생리불순</span>
                                    <span className={styles.tag}>다낭성난소증후군</span>
                                    <span className={styles.tag}>자궁근종</span>
                                    <span className={styles.tag}>난임</span>
                                    <span className={styles.tag}>갱년기</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Doctor&apos;s Message */}
            <section className={styles.message}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>원장님 인사말</h2>
                    <div className={styles.divider}></div>

                    <div className={styles.messageContent}>
                        <p>
                            안녕하세요, 연이재한의원 원장 홍길동입니다.
                        </p>
                        <p>
                            저는 &apos;복진(腹診)&apos;이라는 전통적인 진단법을 통해
                            환자분들을 진료하고 있습니다. 손끝으로 배를 눌러
                            오장육부의 상태를 읽어내는 이 방법은, 현대 의학의
                            검사 결과만으로는 알 수 없는 것들을 보여줍니다.
                        </p>
                        <p>
                            많은 환자분들이 &ldquo;여기저기 다녀봤는데 원인을 모르겠다&rdquo;며
                            찾아오십니다. 그런 분들에게 제가 드리고 싶은 말씀은
                            이것입니다: &ldquo;아직 눌러보지 않은 곳이 있습니다.&rdquo;
                        </p>
                        <p>
                            연이재한의원은 빠른 진료를 추구하지 않습니다.
                            한 분 한 분의 이야기를 충분히 듣고, 몸의 신호를
                            세심하게 읽어, 근본적인 치료를 해나가는 것이
                            저희의 방식입니다.
                        </p>
                        <p>
                            &apos;그럼에도 불구하고&apos; 포기하지 않고 찾아와 주신 분들께,
                            비로소 진정한 진료를 만났다고 느끼실 수 있도록
                            최선을 다하겠습니다.
                        </p>
                        <p className={styles.signature}>
                            연이재한의원 원장 홍길동 드림
                        </p>
                    </div>
                </div>
            </section>

            {/* Treatment Approach */}
            <section className={styles.approach}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitleLight}>진료 철학</h2>
                    <div className={styles.dividerLight}></div>

                    <div className={styles.approachGrid}>
                        <div className={styles.approachCard}>
                            <div className={styles.approachIcon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
                                    <path d="M12 8v8M8 12h8" />
                                </svg>
                            </div>
                            <h3>복진 중심</h3>
                            <p>
                                손으로 배를 눌러 오장육부를 읽습니다.
                                눌러야 비로소 보이는 것들이 있습니다.
                            </p>
                        </div>
                        <div className={styles.approachCard}>
                            <div className={styles.approachIcon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                                </svg>
                            </div>
                            <h3>오롯이 집중</h3>
                            <p>
                                충분한 시간을 들여 환자분의 이야기를 듣습니다.
                                한 명의 세계에 온전히 집중합니다.
                            </p>
                        </div>
                        <div className={styles.approachCard}>
                            <div className={styles.approachIcon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M9 12l2 2 4-4" />
                                    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                            <h3>제대로 치료</h3>
                            <p>
                                근거에 기반한 정확한 진단과 처방.
                                타협 없는 치료를 약속합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className={styles.container}>
                    <p className={styles.ctaText}>
                        궁금한 점이 있으신가요?
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
