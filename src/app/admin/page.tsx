import Link from 'next/link';
import styles from './page.module.css';

// 더미 데이터 (나중에 Supabase에서 가져올 예정)
const STATS = [
    { label: '오늘 신규 문의', value: 5, change: '+2', trend: 'up', icon: '📩' },
    { label: '이번 주 예약', value: 12, change: '+3', trend: 'up', icon: '📅' },
    { label: '진행 중 상담', value: 8, change: '0', trend: 'neutral', icon: '💬' },
    { label: '총 환자 리드', value: 156, change: '+12', trend: 'up', icon: '👥' },
];

const TODAY_FOLLOWUPS = [
    { id: 1, name: '김영희', condition: 'PCOS', time: '오전 10:00', priority: 'high' },
    { id: 2, name: '박지민', condition: '역류성식도염', time: '오후 2:00', priority: 'normal' },
    { id: 3, name: '이현우', condition: '생리불순', time: '오후 4:30', priority: 'normal' },
];

const RECENT_INQUIRIES = [
    { id: 1, name: '최수진', condition: '난임', time: '10분 전', status: 'new', message: '시험관 시술 전 상담 받고 싶습니다.' },
    { id: 2, name: '정하나', condition: '생리통', time: '1시간 전', status: 'new', message: '생리통이 너무 심해서 문의드립니다.' },
    { id: 3, name: '강민수', condition: '불면', time: '3시간 전', status: 'contacted', message: '수면제 없이 치료 가능한가요?' },
];

export default function AdminDashboard() {
    return (
        <div className={styles.dashboard}>
            {/* 페이지 헤더 */}
            <div className={styles.pageHeader}>
                <h1>대시보드</h1>
                <p>오늘의 현황을 한눈에 확인하세요</p>
            </div>

            {/* 통계 카드 */}
            <div className={styles.statsGrid}>
                {STATS.map((stat, index) => (
                    <div key={index} className={styles.statCard}>
                        <div className={styles.statIcon}>{stat.icon}</div>
                        <div className={styles.statContent}>
                            <span className={styles.statLabel}>{stat.label}</span>
                            <div className={styles.statValue}>
                                <span className={styles.statNumber}>{stat.value}</span>
                                <span className={`${styles.statChange} ${styles[stat.trend]}`}>
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 메인 그리드 */}
            <div className={styles.mainGrid}>
                {/* 오늘 팔로업 */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>📞 오늘 팔로업</h2>
                        <Link href="/admin/leads" className={styles.cardLink}>
                            전체 보기 →
                        </Link>
                    </div>
                    <div className={styles.cardContent}>
                        {TODAY_FOLLOWUPS.length > 0 ? (
                            <ul className={styles.followupList}>
                                {TODAY_FOLLOWUPS.map((item) => (
                                    <li key={item.id} className={styles.followupItem}>
                                        <div className={styles.followupInfo}>
                                            <span className={`${styles.priorityDot} ${styles[item.priority]}`} />
                                            <div>
                                                <span className={styles.followupName}>{item.name}</span>
                                                <span className={styles.followupCondition}>{item.condition}</span>
                                            </div>
                                        </div>
                                        <span className={styles.followupTime}>{item.time}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className={styles.emptyMessage}>오늘 예정된 팔로업이 없습니다</p>
                        )}
                    </div>
                </div>

                {/* 최근 문의 */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>📩 최근 문의</h2>
                        <Link href="/admin/messenger" className={styles.cardLink}>
                            전체 보기 →
                        </Link>
                    </div>
                    <div className={styles.cardContent}>
                        <ul className={styles.inquiryList}>
                            {RECENT_INQUIRIES.map((item) => (
                                <li key={item.id} className={styles.inquiryItem}>
                                    <div className={styles.inquiryHeader}>
                                        <div className={styles.inquiryInfo}>
                                            <span className={`${styles.statusDot} ${styles[item.status]}`} />
                                            <span className={styles.inquiryName}>{item.name}</span>
                                            <span className={styles.inquiryCondition}>{item.condition}</span>
                                        </div>
                                        <span className={styles.inquiryTime}>{item.time}</span>
                                    </div>
                                    <p className={styles.inquiryMessage}>{item.message}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 퀵 액션 */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>⚡ 퀵 액션</h2>
                    </div>
                    <div className={styles.cardContent}>
                        <div className={styles.quickActions}>
                            <Link href="/admin/leads" className={styles.quickAction}>
                                <span className={styles.quickIcon}>👥</span>
                                <span>리드 관리</span>
                            </Link>
                            <Link href="/admin/messenger" className={styles.quickAction}>
                                <span className={styles.quickIcon}>💬</span>
                                <span>메신저</span>
                            </Link>
                            <Link href="/admin/conditions" className={styles.quickAction}>
                                <span className={styles.quickIcon}>📋</span>
                                <span>질환 페이지</span>
                            </Link>
                            <Link href="/admin/blog" className={styles.quickAction}>
                                <span className={styles.quickIcon}>✏️</span>
                                <span>블로그 작성</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
