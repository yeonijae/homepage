import styles from './MeaningSection.module.css';

const meaningChars = [
    { hanja: '然', hangul: '연', meaning: '자연, 스스로 그러함' },
    { hanja: '理', hangul: '이', meaning: '이치, 도리' },
    { hanja: '渽', hangul: '재', meaning: '맑은 물' },
];

export default function MeaningSection() {
    return (
        <section id="meaning" className={styles.meaning}>
            <div className={`${styles.bgLeft} hide-mobile`}>然</div>
            <div className={`${styles.bgRight} hide-mobile`}>渽</div>

            <div className="animate-on-scroll">
                <p className={styles.label}>연이재 · 然理渽</p>
            </div>

            <div className="animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
                <h2 className={styles.title}>이름에 담긴 마음</h2>
            </div>

            <div className={`${styles.chars} animate-on-scroll`} style={{ transitionDelay: '0.2s' }}>
                {meaningChars.map((char) => (
                    <div key={char.hangul} className={styles.char}>
                        <div className={styles.hanja}>{char.hanja}</div>
                        <div className={styles.hangul}>{char.hangul}</div>
                        <div className={styles.charMeaning}>{char.meaning}</div>
                    </div>
                ))}
            </div>

            <div className="animate-on-scroll" style={{ transitionDelay: '0.3s' }}>
                <p className={styles.quote}>&ldquo;자연의 이치로 몸을 맑게 하다&rdquo;</p>
            </div>

            <div className="animate-on-scroll" style={{ transitionDelay: '0.4s' }}>
                <p className={styles.desc}>
                    사람의 몸은 본래 스스로 낫는 힘을 가지고 있습니다.<br />
                    연이재는 그 힘을 억누르거나 거스르지 않습니다.<br />
                    자연의 순리를 따르고, 몸 본연의 이치를 회복시켜,<br />
                    탁해진 것을 맑게, 막힌 것을 통하게 합니다.
                </p>
            </div>

            <div className="animate-on-scroll" style={{ transitionDelay: '0.5s' }}>
                <div className={styles.box}>
                    <p>자연의 이치를 담은 맑은 물</p>
                    <p className={styles.boxTitle}>한약 · 약침</p>
                </div>
            </div>
        </section>
    );
}
