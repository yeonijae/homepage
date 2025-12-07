import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection() {
    return (
        <section className={styles.hero}>
            {/* Decorative circles */}
            <div className={`${styles.deco1} floating`} />
            <div className={`${styles.deco2} floating`} />

            {/* Side text */}
            <div className={`${styles.sideText} vertical-text pulse-soft hide-mobile`}>
                YEONIJAE KOREAN MEDICINE
            </div>

            {/* Main content */}
            <div className="animate-on-scroll">
                <p className={styles.subtitle}>연이재한의원</p>
            </div>

            <div className="animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
                <h1 className={styles.title}>
                    <span className="brush-stroke">병의 근원</span>을<br />
                    눌러 보다
                </h1>
            </div>

            <div className="animate-on-scroll" style={{ transitionDelay: '0.4s' }}>
                <p className={styles.desc}>
                    손끝으로 읽고, 마음으로 치료하는<br />
                    진정한 한의학을 만나보세요
                </p>
            </div>

            <div className="animate-on-scroll" style={{ transitionDelay: '0.6s' }}>
                <Link href="/reservation" className="btn btn--primary" style={{ marginTop: '50px' }}>
                    진료 예약하기
                </Link>
            </div>

            {/* Scroll indicator */}
            <div className={styles.scrollIndicator}>
                <span>SCROLL</span>
                <div className={styles.line} />
            </div>
        </section>
    );
}

