import styles from './FocusSection.module.css';

const focusItems = [
    {
        number: '01',
        title: '경청',
        description: '충분한 시간을 들여\n환자의 이야기를 듣습니다',
    },
    {
        number: '02',
        title: '촉진',
        description: '손끝으로 몸의\n상태를 읽어냅니다',
    },
    {
        number: '03',
        title: '치료',
        description: '근본 원인에 집중하여\n제대로 치료합니다',
    },
];

export default function FocusSection() {
    return (
        <section className={styles.focus}>
            <div className="animate-on-scroll">
                <p className="section-label" style={{ textAlign: 'center' }}>DEDICATION</p>
            </div>

            <div className="animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
                <h2 className={styles.title}>오롯이, 당신에게만<br />집중하는 시간</h2>
            </div>

            <div className="animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
                <div className="divider" style={{ marginBottom: '60px' }} />
            </div>

            <div className="animate-on-scroll" style={{ transitionDelay: '0.3s' }}>
                <p className={styles.desc}>
                    연이재의 진료실에서는 서두르지 않습니다.<br /><br />
                    환자 한 분 한 분의 이야기에 귀 기울이고,<br />
                    몸 구석구석을 손으로 살피며,<br />
                    그 사람만의 치료 길을 찾아갑니다.
                </p>
            </div>

            <div className={styles.items}>
                {focusItems.map((item, index) => (
                    <div
                        key={item.number}
                        className={`${styles.item} animate-on-scroll`}
                        style={{ transitionDelay: `${0.5 + index * 0.1}s` }}
                    >
                        <span className={styles.number}>{item.number}</span>
                        <h3 className={styles.itemTitle}>{item.title}</h3>
                        <p className={styles.itemDesc}>{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
