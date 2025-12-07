'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

// 더미 데이터
const DUMMY_POSTS = [
    { id: '1', title: 'PCOS, 한방 치료로 근본 원인을 잡다', category: '여성건강', status: 'published', publishedAt: '2024-12-01', views: 234 },
    { id: '2', title: '임신 준비, 한의학적 몸만들기 가이드', category: '난임', status: 'published', publishedAt: '2024-11-25', views: 189 },
    { id: '3', title: '역류성식도염, 약 없이 생활 습관으로 관리하는 법', category: '소화기', status: 'published', publishedAt: '2024-11-18', views: 312 },
    { id: '4', title: '아이 아토피, 부모가 알아야 할 관리법', category: '피부', status: 'published', publishedAt: '2024-11-10', views: 278 },
    { id: '5', title: '복진이란? 배를 눌러 병을 찾는 한의학적 진단법', category: '건강정보', status: 'published', publishedAt: '2024-11-05', views: 456 },
    { id: '6', title: '생리불순, 무시하면 안 되는 이유', category: '여성건강', status: 'draft', publishedAt: null, views: 0 },
];

interface Post {
    id: string;
    title: string;
    category: string;
    status: 'published' | 'draft';
    publishedAt: string | null;
    views: number;
}

export default function AdminBlogPage() {
    const [posts] = useState<Post[]>(DUMMY_POSTS as Post[]);
    const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

    const filteredPosts = posts.filter(post => {
        if (filter === 'all') return true;
        return post.status === filter;
    });

    const publishedCount = posts.filter(p => p.status === 'published').length;
    const draftCount = posts.filter(p => p.status === 'draft').length;

    return (
        <div className={styles.blogAdminPage}>
            {/* 페이지 헤더 */}
            <div className={styles.pageHeader}>
                <div className={styles.headerLeft}>
                    <h1>블로그 관리</h1>
                    <p>글을 작성하고 관리하세요</p>
                </div>
                <div className={styles.headerRight}>
                    <Link href="/admin/blog/new" className={styles.newPostBtn}>
                        + 새 글 작성
                    </Link>
                </div>
            </div>

            {/* 통계 카드 */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>전체 글</span>
                    <span className={styles.statValue}>{posts.length}</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>발행됨</span>
                    <span className={styles.statValue}>{publishedCount}</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>임시저장</span>
                    <span className={styles.statValue}>{draftCount}</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>총 조회수</span>
                    <span className={styles.statValue}>
                        {posts.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
                    </span>
                </div>
            </div>

            {/* 필터 */}
            <div className={styles.filterBar}>
                <div className={styles.filterTabs}>
                    <button
                        className={`${styles.filterTab} ${filter === 'all' ? styles.active : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        전체 ({posts.length})
                    </button>
                    <button
                        className={`${styles.filterTab} ${filter === 'published' ? styles.active : ''}`}
                        onClick={() => setFilter('published')}
                    >
                        발행됨 ({publishedCount})
                    </button>
                    <button
                        className={`${styles.filterTab} ${filter === 'draft' ? styles.active : ''}`}
                        onClick={() => setFilter('draft')}
                    >
                        임시저장 ({draftCount})
                    </button>
                </div>
            </div>

            {/* 글 목록 테이블 */}
            <div className={styles.tableContainer}>
                <table className={styles.postsTable}>
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>카테고리</th>
                            <th>상태</th>
                            <th>발행일</th>
                            <th>조회수</th>
                            <th>작업</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPosts.map((post) => (
                            <tr key={post.id}>
                                <td className={styles.titleCell}>
                                    <span className={styles.postTitle}>{post.title}</span>
                                </td>
                                <td>
                                    <span className={styles.categoryBadge}>{post.category}</span>
                                </td>
                                <td>
                                    <span className={`${styles.statusBadge} ${styles[post.status]}`}>
                                        {post.status === 'published' ? '발행됨' : '임시저장'}
                                    </span>
                                </td>
                                <td className={styles.dateCell}>
                                    {post.publishedAt || '-'}
                                </td>
                                <td className={styles.viewsCell}>
                                    {post.views.toLocaleString()}
                                </td>
                                <td className={styles.actionsCell}>
                                    <button className={styles.actionBtn}>수정</button>
                                    <button className={styles.actionBtn}>미리보기</button>
                                    <button className={`${styles.actionBtn} ${styles.danger}`}>삭제</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
