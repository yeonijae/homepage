import styles from './PromiseSection.module.css';

export default function PromiseSection() {
    return (
        <section className={styles.promise}>
            <div className="animate-on-scroll">
                <p className="section-label" style={{ textAlign: 'center' }}>OUR PROMISE</p>
            </div>

            <div className="animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
                <h2 className={styles.title}>우리의 약속</h2>
            </div>

            <div className="animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
                <blockquote className={styles.blockquote}>
                    &ldquo;병의 근원을 눌러 보다&rdquo;
                </blockquote>
            </div>

            <div className="animate-on-scroll" style={{ transitionDelay: '0.3s' }}>
                <p className={styles.desc}>
                    손으로 직접 눌러 진단하고,<br />
                    자연의 이치로 몸을 맑게 하며,<br />
                    끝까지 책임지는 치료.<br /><br />
                    환자가 진료실을 나서며<br />
                    <em>&ldquo;이제야 진짜 진료를 받았구나&rdquo;</em><br />
                    느끼는 그 순간을 위해,<br /><br />
                    연이재는 오늘도 손을 내밉니다.
                </p>
            </div>
        </section>
    );
}
