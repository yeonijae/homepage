'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navigation.module.css';

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 메뉴 열렸을 때 스크롤 방지
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    const closeMenu = () => setMobileMenuOpen(false);

    return (
        <>
            <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
                <Link href="/" className={styles.logo}>
                    연이재
                </Link>

                {/* 데스크톱 메뉴 */}
                <div className={styles.links}>
                    <Link href="/about" className="nav-link">소개</Link>
                    <Link href="/doctors" className="nav-link">의료진</Link>
                    <Link href="/conditions" className="nav-link">질환별 진료</Link>
                    <Link href="/philosophy" className="nav-link">진료철학</Link>
                    <Link href="/visit" className="nav-link">내원안내</Link>
                    <Link href="/reservation" className="btn btn--primary" style={{ padding: '10px 20px', fontSize: '13px' }}>예약</Link>
                </div>

                {/* 모바일 햄버거 버튼 */}
                <button
                    className={`${styles.hamburger} ${mobileMenuOpen ? styles.active : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="메뉴 열기"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>

            {/* 모바일 메뉴 오버레이 */}
            <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
                <div className={styles.mobileMenuContent}>
                    <Link href="/about" className={styles.mobileLink} onClick={closeMenu}>소개</Link>
                    <Link href="/doctors" className={styles.mobileLink} onClick={closeMenu}>의료진</Link>
                    <Link href="/conditions" className={styles.mobileLink} onClick={closeMenu}>질환별 진료</Link>
                    <Link href="/philosophy" className={styles.mobileLink} onClick={closeMenu}>진료철학</Link>
                    <Link href="/visit" className={styles.mobileLink} onClick={closeMenu}>내원안내</Link>
                    <Link href="/reservation" className={styles.mobileReserveBtn} onClick={closeMenu}>예약하기</Link>
                </div>
            </div>
        </>
    );
}

