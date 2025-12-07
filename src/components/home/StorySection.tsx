import styles from './StorySection.module.css';

export default function StorySection() {
    return (
        <section id="story" className={styles.story}>
            <div className="animate-on-scroll">
                <p className="section-label" style={{ textAlign: 'center' }}>OUR STORY</p>
            </div>

            <div className="animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
                <h2 className={styles.title}>손끝에서 시작되는 진료</h2>
            </div>

            <div className="animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
                <div className="divider" style={{ marginBottom: '60px' }} />
            </div>

            <div className="animate-on-scroll" style={{ transitionDelay: '0.3s' }}>
                <p className={styles.main}>
                    요즘 진료실에서 환자의 몸에 손을 대는 의료인이 얼마나 될까요?
                </p>
            </div>

            <div className="animate-on-scroll" style={{ transitionDelay: '0.4s' }}>
                <p className={styles.sub}>
                    화면 속 숫자와 영상이 진단을 대신하고,<br />
                    짧은 문진 몇 마디가 수년간의 고통을 대변하는 시대.<br />
                    환자들은 어느새 &apos;진료&apos;가 아닌 &apos;처리&apos;를 받는 데 익숙해졌습니다.
                </p>
            </div>

            <div className="animate-on-scroll" style={{ transitionDelay: '0.5s' }}>
                <p className={styles.quote}>
                    &ldquo;언제부터 치료가 이렇게 차가워졌을까?&rdquo;
                </p>
            </div>
        </section>
    );
}
