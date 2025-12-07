import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.logo}>연이재한의원</div>
            <p className={styles.tagline}>병의 근원을 눌러 보다</p>
            <p className={styles.copyright}>© 2024 연이재한의원. All rights reserved.</p>
        </footer>
    );
}
