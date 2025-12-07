import Link from 'next/link';
import styles from './page.module.css';
import { BLOG_CATEGORIES } from '@/types/blog.types';
import type { BlogPost, BlogCategory } from '@/types/blog.types';

// 블로그 데이터 가져오기
async function getBlogPosts(): Promise<BlogPost[]> {
    const posts = await import('@data/blog/posts.json');
    return posts.default as BlogPost[];
}

export const metadata = {
    title: '건강정보 | 연이재한의원',
    description: '연이재한의원에서 전하는 한의학 건강 정보와 질환 관리 팁',
};

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <div className={styles.blogPage}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>건강정보</h1>
                    <p>연이재한의원에서 전하는 한의학 건강 정보</p>
                </div>
            </section>

            {/* 카테고리 필터 */}
            <section className={styles.filterSection}>
                <div className={styles.container}>
                    <div className={styles.categoryTabs}>
                        <Link href="/blog" className={`${styles.categoryTab} ${styles.active}`}>
                            전체
                        </Link>
                        {BLOG_CATEGORIES.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/blog?category=${cat.id}`}
                                className={styles.categoryTab}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 글 목록 */}
            <section className={styles.postsSection}>
                <div className={styles.container}>
                    <div className={styles.postsGrid}>
                        {posts.map((post) => (
                            <PostCard key={post.slug} post={post} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

function PostCard({ post }: { post: BlogPost }) {
    const category = BLOG_CATEGORIES.find(c => c.id === post.category);

    return (
        <article className={styles.postCard}>
            <Link href={`/blog/${post.slug}`}>
                <div className={styles.postThumbnail}>
                    <div className={styles.thumbnailPlaceholder}>
                        {getCategoryEmoji(post.category)}
                    </div>
                </div>
                <div className={styles.postContent}>
                    <div className={styles.postMeta}>
                        <span className={styles.postCategory}>{category?.name}</span>
                        <span className={styles.postDate}>{formatDate(post.publishedAt)}</span>
                    </div>
                    <h2 className={styles.postTitle}>{post.title}</h2>
                    <p className={styles.postExcerpt}>{post.excerpt}</p>
                    <div className={styles.postFooter}>
                        <span className={styles.readingTime}>{post.readingTime}분 읽기</span>
                    </div>
                </div>
            </Link>
        </article>
    );
}

function getCategoryEmoji(category: BlogCategory): string {
    const emojis: Record<BlogCategory, string> = {
        'womens-health': '🌸',
        'infertility': '👶',
        'digestive': '🍀',
        'skin': '✨',
        'general': '💚',
        'clinic-news': '📢',
    };
    return emojis[category] || '📄';
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
