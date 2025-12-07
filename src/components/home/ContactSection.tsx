import styles from './ContactSection.module.css';

export default function ContactSection() {
    return (
        <section id="contact" className={styles.contact}>
            <div className="animate-on-scroll">
                <p className="section-label" style={{ textAlign: 'center' }}>CONTACT</p>
            </div>

            <div className="animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
                <h2 className={styles.title}>진료 예약 및 문의</h2>
            </div>

            <div className={`${styles.info} animate-on-scroll`} style={{ transitionDelay: '0.2s' }}>
                <div className={styles.item}>
                    <p className={styles.itemLabel}>전화예약</p>
                    <p className={styles.phone}>031-0000-0000</p>
                </div>
                <div className={styles.item}>
                    <p className={styles.itemLabel}>진료시간</p>
                    <p className={styles.itemText}>평일 10:00 - 19:00<br />토요일 10:00 - 15:00</p>
                </div>
                <div className={styles.item}>
                    <p className={styles.itemLabel}>오시는 길</p>
                    <p className={styles.itemText}>경기도 화성시<br />○○로 00길 00</p>
                </div>
            </div>

            <div className="animate-on-scroll" style={{ transitionDelay: '0.3s' }}>
                <button className="btn btn--primary">온라인 예약하기</button>
            </div>
        </section>
    );
}
