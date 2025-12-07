import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import { BLOG_CATEGORIES } from '@/types/blog.types';
import type { BlogPost } from '@/types/blog.types';

// 블로그 데이터 가져오기
async function getBlogPosts(): Promise<BlogPost[]> {
    const posts = await import('@data/blog/posts.json');
    return posts.default as BlogPost[];
}

async function getPost(slug: string): Promise<BlogPost | undefined> {
    const posts = await getBlogPosts();
    return posts.find(p => p.slug === slug);
}

// 정적 경로 생성
export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

// 메타데이터
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return { title: '글을 찾을 수 없습니다' };

    return {
        title: `${post.title} | 연이재한의원`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    const category = BLOG_CATEGORIES.find(c => c.id === post.category);
    const posts = await getBlogPosts();
    const relatedPosts = posts
        .filter(p => p.slug !== post.slug && p.category === post.category)
        .slice(0, 3);

    return (
        <div className={styles.postPage}>
            {/* 상단 네비게이션 */}
            <div className={styles.breadcrumb}>
                <div className={styles.container}>
                    <Link href="/blog">← 목록으로</Link>
                </div>
            </div>

            {/* 글 헤더 */}
            <header className={styles.postHeader}>
                <div className={styles.container}>
                    <div className={styles.postMeta}>
                        <span className={styles.category}>{category?.name}</span>
                        <span className={styles.date}>{formatDate(post.publishedAt)}</span>
                        <span className={styles.readingTime}>{post.readingTime}분 읽기</span>
                    </div>
                    <h1 className={styles.title}>{post.title}</h1>
                    <p className={styles.excerpt}>{post.excerpt}</p>
                    <div className={styles.tags}>
                        {post.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>#{tag}</span>
                        ))}
                    </div>
                </div>
            </header>

            {/* 글 본문 */}
            <article className={styles.postContent}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <MarkdownContent content={post.content} />
                    </div>
                </div>
            </article>

            {/* CTA */}
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <div className={styles.ctaBox}>
                        <h3>더 궁금한 점이 있으신가요?</h3>
                        <p>연이재한의원에서 상담받아보세요</p>
                        <Link href="/reservation" className={styles.ctaBtn}>
                            상담 예약하기
                        </Link>
                    </div>
                </div>
            </section>

            {/* 관련 글 */}
            {relatedPosts.length > 0 && (
                <section className={styles.relatedSection}>
                    <div className={styles.container}>
                        <h2>관련 글</h2>
                        <div className={styles.relatedGrid}>
                            {relatedPosts.map((related) => (
                                <Link
                                    key={related.slug}
                                    href={`/blog/${related.slug}`}
                                    className={styles.relatedCard}
                                >
                                    <h3>{related.title}</h3>
                                    <span>{formatDate(related.publishedAt)}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

// 간단한 마크다운 렌더러
function MarkdownContent({ content }: { content: string }) {
    const html = simpleMarkdownToHtml(content);
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function simpleMarkdownToHtml(markdown: string): string {
    let html = markdown
        // Headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        // Lists
        .replace(/^- (.*$)/gim, '<li>$1</li>')
        // Blockquotes
        .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
        // Horizontal rule
        .replace(/^---$/gim, '<hr />')
        // Tables (simplified)
        .replace(/\|(.*)\|/gim, (match) => {
            const cells = match.split('|').filter(c => c.trim());
            if (cells.some(c => c.includes('---'))) return '';
            const cellsHtml = cells.map(c => `<td>${c.trim()}</td>`).join('');
            return `<tr>${cellsHtml}</tr>`;
        })
        // Paragraphs
        .replace(/\n\n/gim, '</p><p>')
        // Line breaks
        .replace(/\n/gim, '<br />');

    // Wrap li elements in ul
    html = html.replace(/(<li>[\s\S]*?<\/li>)/gi, '<ul>$1</ul>');
    // Clean up multiple ul tags
    html = html.replace(/<\/ul><ul>/g, '');

    return `<p>${html}</p>`;
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
