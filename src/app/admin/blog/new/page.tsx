'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import styles from './page.module.css';
import { BLOG_CATEGORIES } from '@/types/blog.types';

// Tiptap 에디터는 클라이언트 사이드에서만 로드
const TiptapEditor = dynamic(() => import('@/components/admin/TiptapEditor'), {
    ssr: false,
    loading: () => <div className={styles.editorLoading}>에디터 로딩 중...</div>
});

export default function NewBlogPostPage() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [content, setContent] = useState('');
    const [isPreview, setIsPreview] = useState(false);

    const handleSave = (publish: boolean) => {
        // TODO: Supabase 연동 시 구현
        const postData = {
            title,
            category,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean),
            content,
            status: publish ? 'published' : 'draft',
        };
        console.log('Post data:', postData);
        alert(publish ? '발행되었습니다 (데모)' : '임시저장되었습니다 (데모)');
    };

    return (
        <div className={styles.editorPage}>
            {/* 헤더 */}
            <div className={styles.editorHeader}>
                <div className={styles.headerLeft}>
                    <Link href="/admin/blog" className={styles.backBtn}>
                        ← 목록으로
                    </Link>
                    <h1>새 글 작성</h1>
                </div>
                <div className={styles.headerRight}>
                    <button
                        className={styles.previewBtn}
                        onClick={() => setIsPreview(!isPreview)}
                    >
                        {isPreview ? '편집' : '미리보기'}
                    </button>
                    <button
                        className={styles.saveBtn}
                        onClick={() => handleSave(false)}
                    >
                        임시저장
                    </button>
                    <button
                        className={styles.publishBtn}
                        onClick={() => handleSave(true)}
                    >
                        발행하기
                    </button>
                </div>
            </div>

            {/* 에디터 본문 */}
            <div className={styles.editorBody}>
                {!isPreview ? (
                    <>
                        {/* 메타 정보 */}
                        <div className={styles.metaSection}>
                            <div className={styles.inputGroup}>
                                <label>제목</label>
                                <input
                                    type="text"
                                    placeholder="글 제목을 입력하세요"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={styles.titleInput}
                                />
                            </div>

                            <div className={styles.inputRow}>
                                <div className={styles.inputGroup}>
                                    <label>카테고리</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className={styles.selectInput}
                                    >
                                        <option value="">선택하세요</option>
                                        {BLOG_CATEGORIES.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>태그 (쉼표로 구분)</label>
                                    <input
                                        type="text"
                                        placeholder="태그1, 태그2, 태그3"
                                        value={tags}
                                        onChange={(e) => setTags(e.target.value)}
                                        className={styles.textInput}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* WYSIWYG 에디터 */}
                        <div className={styles.contentSection}>
                            <div className={styles.inputGroup}>
                                <label>본문</label>
                                <TiptapEditor
                                    content={content}
                                    onChange={setContent}
                                    placeholder="내용을 입력하세요..."
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    /* 미리보기 */
                    <div className={styles.previewSection}>
                        <div className={styles.previewHeader}>
                            <h1>{title || '제목 없음'}</h1>
                            <div className={styles.previewMeta}>
                                <span>{BLOG_CATEGORIES.find(c => c.id === category)?.name || '카테고리 없음'}</span>
                                <span>{new Date().toLocaleDateString('ko-KR')}</span>
                            </div>
                            {tags && (
                                <div className={styles.previewTags}>
                                    {tags.split(',').map((tag, i) => (
                                        <span key={i} className={styles.previewTag}>
                                            #{tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div
                            className={styles.previewContent}
                            dangerouslySetInnerHTML={{ __html: content || '<p>내용을 입력하세요</p>' }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
