import styles from './PhilosophySection.module.css';

export default function PhilosophySection() {
    return (
        <section id="philosophy" className={styles.philosophy}>
            <div className={styles.grid}>
                {/* Hand circle illustration */}
                <div className="animate-on-scroll">
                    <div className={styles.handCircle}>
                        <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
                            <path
                                d="M50 15 C55 25, 60 30, 55 45 C50 60, 45 70, 50 85"
                                stroke="#8B7355"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                            />
                            <circle cx="50" cy="50" r="8" fill="none" stroke="#C4A77D" strokeWidth="1.5" opacity="0.6" />
                            <circle cx="50" cy="50" r="16" fill="none" stroke="#C4A77D" strokeWidth="1" opacity="0.4" />
                            <circle cx="50" cy="50" r="24" fill="none" stroke="#C4A77D" strokeWidth="0.5" opacity="0.2" />
                            <path d="M35 40 Q50 35, 65 40" stroke="#A69580" strokeWidth="1" fill="none" opacity="0.5" />
                            <path d="M38 55 Q50 50, 62 55" stroke="#A69580" strokeWidth="1" fill="none" opacity="0.5" />
                            <path d="M40 70 Q50 65, 60 70" stroke="#A69580" strokeWidth="1" fill="none" opacity="0.5" />
                        </svg>
                        <div className={`${styles.pulseRing} pulse-soft`} />
                    </div>
                </div>

                {/* Content */}
                <div className={styles.content}>
                    <div className="animate-on-scroll">
                        <p className="section-label">복진 · 腹診</p>
                    </div>

                    <div className="animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
                        <h2 className={styles.title}>눌러야 보이는 것들</h2>
                    </div>

                    <div className="animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
                        <p className={styles.text}>
                            한의학에는 <strong>복진(腹診)</strong>이라는
                            오래된 지혜가 있습니다. 배를 눌러 장부의 상태를 읽고,
                            피부의 온기와 긴장을 손끝으로 감지하는 진단법입니다.
                        </p>
                    </div>

                    <div className="animate-on-scroll" style={{ transitionDelay: '0.3s' }}>
                        <p className={styles.text}>
                            기계가 잡아내지 못하는 미세한 변화,<br />
                            검사 수치로는 설명되지 않는 불편함,<br />
                            환자 스스로도 말로 표현하지 못했던 증상의 실마리—<br /><br />
                            이 모든 것이 <strong>한 번의 촉진</strong>에서 드러납니다.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
