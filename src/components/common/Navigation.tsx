'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navigation.module.css';

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
            <Link href="/" className={styles.logo}>
                연이재
            </Link>
            <div className={styles.links}>
                <Link href="/about" className="nav-link">소개</Link>
                <Link href="/doctors" className="nav-link">의료진</Link>
                <Link href="/conditions" className="nav-link">질환별 진료</Link>
                <Link href="/philosophy" className="nav-link">진료철학</Link>
                <Link href="/visit" className="nav-link">내원안내</Link>
                <Link href="/reservation" className="btn btn--primary" style={{ padding: '10px 20px', fontSize: '13px' }}>예약</Link>
            </div>
        </nav>
    );
}
