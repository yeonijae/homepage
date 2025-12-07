'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { useCallback } from 'react';
import styles from './TiptapEditor.module.css';

interface TiptapEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export default function TiptapEditor({ content, onChange, placeholder }: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3, 4],
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'editor-link',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'editor-image',
                },
            }),
        ],
        content: content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: styles.proseMirror,
            },
        },
    });

    const setLink = useCallback(() => {
        if (!editor) return;

        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL을 입력하세요', previousUrl);

        if (url === null) return;

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    const addImage = useCallback(() => {
        if (!editor) return;

        const url = window.prompt('이미지 URL을 입력하세요');

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    if (!editor) {
        return <div className={styles.loading}>에디터 로딩 중...</div>;
    }

    return (
        <div className={styles.editorWrapper}>
            {/* 툴바 */}
            <div className={styles.toolbar}>
                {/* 텍스트 포맷 */}
                <div className={styles.toolGroup}>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`${styles.toolBtn} ${editor.isActive('bold') ? styles.active : ''}`}
                        title="굵게 (Ctrl+B)"
                    >
                        <strong>B</strong>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`${styles.toolBtn} ${editor.isActive('italic') ? styles.active : ''}`}
                        title="기울임 (Ctrl+I)"
                    >
                        <em>I</em>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={`${styles.toolBtn} ${editor.isActive('strike') ? styles.active : ''}`}
                        title="취소선"
                    >
                        <s>S</s>
                    </button>
                </div>

                {/* 헤딩 */}
                <div className={styles.toolGroup}>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`${styles.toolBtn} ${editor.isActive('heading', { level: 2 }) ? styles.active : ''}`}
                        title="제목 2"
                    >
                        H2
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={`${styles.toolBtn} ${editor.isActive('heading', { level: 3 }) ? styles.active : ''}`}
                        title="제목 3"
                    >
                        H3
                    </button>
                </div>

                {/* 블록 */}
                <div className={styles.toolGroup}>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`${styles.toolBtn} ${editor.isActive('bulletList') ? styles.active : ''}`}
                        title="목록"
                    >
                        •
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`${styles.toolBtn} ${editor.isActive('orderedList') ? styles.active : ''}`}
                        title="번호 목록"
                    >
                        1.
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={`${styles.toolBtn} ${editor.isActive('blockquote') ? styles.active : ''}`}
                        title="인용문"
                    >
                        "
                    </button>
                </div>

                {/* 링크/이미지 */}
                <div className={styles.toolGroup}>
                    <button
                        type="button"
                        onClick={setLink}
                        className={`${styles.toolBtn} ${editor.isActive('link') ? styles.active : ''}`}
                        title="링크 삽입"
                    >
                        🔗
                    </button>
                    <button
                        type="button"
                        onClick={addImage}
                        className={styles.toolBtn}
                        title="이미지 삽입"
                    >
                        🖼️
                    </button>
                </div>

                {/* 실행 취소/다시 실행 */}
                <div className={styles.toolGroup}>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        className={styles.toolBtn}
                        title="실행 취소 (Ctrl+Z)"
                    >
                        ↩
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        className={styles.toolBtn}
                        title="다시 실행 (Ctrl+Y)"
                    >
                        ↪
                    </button>
                </div>
            </div>

            {/* 에디터 본문 */}
            <div className={styles.editorContent}>
                <EditorContent editor={editor} />
                {!content && placeholder && (
                    <div className={styles.placeholder}>{placeholder}</div>
                )}
            </div>
        </div>
    );
}
