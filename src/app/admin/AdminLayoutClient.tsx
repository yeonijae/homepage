'use client';

import Link from 'next/link';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import styles from './layout.module.css';

interface AdminLayoutClientProps {
    children: React.ReactNode;
}

export default function AdminLayoutClient({ children }: AdminLayoutClientProps) {
    const handleLogout = () => {
        document.cookie = 'admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.reload();
    };

    return (
        <AdminAuthGuard>
            <div className={styles.adminContainer}>
                {/* 사이드바 */}
                <aside className={styles.sidebar}>
                    <div className={styles.logo}>
                        <Link href="/admin">
                            <span className={styles.logoText}>연이재</span>
                            <span className={styles.logoSub}>Admin</span>
                        </Link>
                    </div>

                    <nav className={styles.nav}>
                        <div className={styles.navSection}>
                            <span className={styles.navLabel}>대시보드</span>
                            <NavItem href="/admin" icon="📊" label="홈" />
                        </div>

                        <div className={styles.navSection}>
                            <span className={styles.navLabel}>환자 관리</span>
                            <NavItem href="/admin/leads" icon="👥" label="리드 관리" />
                            <NavItem href="/admin/messenger" icon="💬" label="메신저" badge={3} />
                        </div>

                        <div className={styles.navSection}>
                            <span className={styles.navLabel}>콘텐츠</span>
                            <NavItem href="/admin/conditions" icon="📋" label="질환 페이지" />
                            <NavItem href="/admin/blog" icon="✏️" label="블로그" />
                            <NavItem href="/admin/gallery" icon="🖼️" label="갤러리" />
                        </div>

                        <div className={styles.navSection}>
                            <span className={styles.navLabel}>설정</span>
                            <NavItem href="/admin/settings" icon="⚙️" label="설정" />
                        </div>
                    </nav>

                    <div className={styles.userSection}>
                        <div className={styles.userInfo}>
                            <div className={styles.userAvatar}>관</div>
                            <div className={styles.userDetails}>
                                <span className={styles.userName}>관리자</span>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#888',
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                        padding: 0,
                                    }}
                                >
                                    로그아웃
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* 메인 콘텐츠 */}
                <main className={styles.main}>
                    <header className={styles.header}>
                        <div className={styles.headerLeft}>
                            <h1 className={styles.headerTitle}>관리 시스템</h1>
                        </div>
                        <div className={styles.headerRight}>
                            <button className={styles.notificationBtn}>
                                🔔
                                <span className={styles.notificationBadge}>2</span>
                            </button>
                            <Link href="/" className={styles.siteLink}>
                                사이트 보기 →
                            </Link>
                        </div>
                    </header>

                    <div className={styles.content}>
                        {children}
                    </div>
                </main>
            </div>
        </AdminAuthGuard>
    );
}

// 네비게이션 아이템 컴포넌트
interface NavItemProps {
    href: string;
    icon: string;
    label: string;
    badge?: number;
}

function NavItem({ href, icon, label, badge }: NavItemProps) {
    return (
        <Link href={href} className={styles.navItem}>
            <span className={styles.navIcon}>{icon}</span>
            <span className={styles.navText}>{label}</span>
            {badge && badge > 0 && (
                <span className={styles.navBadge}>{badge}</span>
            )}
        </Link>
    );
}
