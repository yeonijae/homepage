'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

// 초기 갤러리 데이터 (실제로는 API에서 로드)
const INITIAL_GALLERY = [
    { id: '1', src: '/images/clinic/entrance.jpg', alt: '한의원 입구', caption: '연이재 입구', order: 1 },
    { id: '2', src: '/images/clinic/lobby.jpg', alt: '로비 및 대기실', caption: '로비', order: 2 },
    { id: '3', src: '/images/clinic/waiting-area.jpg', alt: '대기 공간', caption: '대기실', order: 3 },
    { id: '4', src: '/images/clinic/reception.jpg', alt: '접수대', caption: '접수대', order: 4 },
    { id: '5', src: '/images/clinic/consultation-room.jpg', alt: '진료실', caption: '진료실', order: 5 },
    { id: '6', src: '/images/clinic/consultation-room-2.jpg', alt: '상담실', caption: '상담실', order: 6 },
    { id: '7', src: '/images/clinic/treatment-room.jpg', alt: '치료실', caption: '치료실', order: 7 },
    { id: '8', src: '/images/clinic/detail.jpg', alt: '인테리어 디테일', caption: '디테일', order: 8 },
];

interface GalleryImage {
    id: string;
    src: string;
    alt: string;
    caption: string;
    order: number;
}

export default function AdminGalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>(INITIAL_GALLERY);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ caption: '', alt: '' });
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadPreview, setUploadPreview] = useState<string | null>(null);
    const [newImageData, setNewImageData] = useState({ caption: '', alt: '' });

    // 편집 시작
    const startEdit = (image: GalleryImage) => {
        setEditingId(image.id);
        setEditForm({ caption: image.caption, alt: image.alt });
    };

    // 편집 저장
    const saveEdit = (id: string) => {
        setImages(prev => prev.map(img =>
            img.id === id ? { ...img, caption: editForm.caption, alt: editForm.alt } : img
        ));
        setEditingId(null);
    };

    // 편집 취소
    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({ caption: '', alt: '' });
    };

    // 삭제
    const deleteImage = (id: string) => {
        if (confirm('정말 이 이미지를 삭제하시겠습니까?')) {
            setImages(prev => prev.filter(img => img.id !== id));
        }
    };

    // 순서 변경
    const moveImage = (id: string, direction: 'up' | 'down') => {
        const index = images.findIndex(img => img.id === id);
        if (direction === 'up' && index > 0) {
            const newImages = [...images];
            [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
            setImages(newImages);
        } else if (direction === 'down' && index < images.length - 1) {
            const newImages = [...images];
            [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
            setImages(newImages);
        }
    };

    // 파일 업로드 처리
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // 이미지 추가
    const addImage = () => {
        if (uploadPreview && newImageData.caption) {
            const newId = String(Date.now());
            setImages(prev => [...prev, {
                id: newId,
                src: uploadPreview,
                alt: newImageData.alt || newImageData.caption,
                caption: newImageData.caption,
                order: prev.length + 1
            }]);
            setShowUploadModal(false);
            setUploadPreview(null);
            setNewImageData({ caption: '', alt: '' });
        }
    };

    return (
        <div className={styles.container}>
            {/* 헤더 */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>갤러리 관리</h1>
                    <p className={styles.subtitle}>내원 안내 페이지에 표시되는 인테리어 사진을 관리합니다</p>
                </div>
                <button
                    className={styles.addBtn}
                    onClick={() => setShowUploadModal(true)}
                >
                    + 이미지 추가
                </button>
            </div>

            {/* 이미지 목록 */}
            <div className={styles.imageGrid}>
                {images.map((image, index) => (
                    <div key={image.id} className={styles.imageCard}>
                        <div className={styles.imagePreview}>
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={300}
                                height={200}
                                className={styles.image}
                            />
                            <div className={styles.imageOverlay}>
                                <span className={styles.orderBadge}>{index + 1}</span>
                            </div>
                        </div>

                        <div className={styles.imageInfo}>
                            {editingId === image.id ? (
                                <div className={styles.editForm}>
                                    <input
                                        type="text"
                                        value={editForm.caption}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, caption: e.target.value }))}
                                        placeholder="캡션"
                                        className={styles.input}
                                    />
                                    <input
                                        type="text"
                                        value={editForm.alt}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, alt: e.target.value }))}
                                        placeholder="대체 텍스트"
                                        className={styles.input}
                                    />
                                    <div className={styles.editActions}>
                                        <button onClick={() => saveEdit(image.id)} className={styles.saveBtn}>저장</button>
                                        <button onClick={cancelEdit} className={styles.cancelBtn}>취소</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h3 className={styles.caption}>{image.caption}</h3>
                                    <p className={styles.alt}>{image.alt}</p>
                                </>
                            )}
                        </div>

                        <div className={styles.imageActions}>
                            <button
                                onClick={() => moveImage(image.id, 'up')}
                                disabled={index === 0}
                                className={styles.moveBtn}
                                title="위로"
                            >
                                ↑
                            </button>
                            <button
                                onClick={() => moveImage(image.id, 'down')}
                                disabled={index === images.length - 1}
                                className={styles.moveBtn}
                                title="아래로"
                            >
                                ↓
                            </button>
                            <button
                                onClick={() => startEdit(image)}
                                className={styles.editBtn}
                                title="편집"
                            >
                                ✏️
                            </button>
                            <button
                                onClick={() => deleteImage(image.id)}
                                className={styles.deleteBtn}
                                title="삭제"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 저장 안내 */}
            <div className={styles.saveNotice}>
                <p>💡 변경사항은 현재 세션에서만 유지됩니다. Supabase 연동 후 영구 저장이 가능합니다.</p>
            </div>

            {/* 업로드 모달 */}
            {showUploadModal && (
                <div className={styles.modalOverlay} onClick={() => setShowUploadModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>이미지 추가</h2>
                            <button onClick={() => setShowUploadModal(false)} className={styles.closeBtn}>×</button>
                        </div>

                        <div className={styles.modalBody}>
                            <div className={styles.uploadArea}>
                                {uploadPreview ? (
                                    <div className={styles.previewWrapper}>
                                        <img src={uploadPreview} alt="미리보기" className={styles.preview} />
                                        <button
                                            onClick={() => setUploadPreview(null)}
                                            className={styles.removePreview}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ) : (
                                    <label className={styles.uploadLabel}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className={styles.fileInput}
                                        />
                                        <span className={styles.uploadIcon}>📁</span>
                                        <span>클릭하여 이미지 선택</span>
                                    </label>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label>캡션 (필수)</label>
                                <input
                                    type="text"
                                    value={newImageData.caption}
                                    onChange={(e) => setNewImageData(prev => ({ ...prev, caption: e.target.value }))}
                                    placeholder="예: 대기실"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>대체 텍스트 (선택)</label>
                                <input
                                    type="text"
                                    value={newImageData.alt}
                                    onChange={(e) => setNewImageData(prev => ({ ...prev, alt: e.target.value }))}
                                    placeholder="예: 편안한 대기 공간"
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.modalFooter}>
                            <button onClick={() => setShowUploadModal(false)} className={styles.cancelBtn}>
                                취소
                            </button>
                            <button
                                onClick={addImage}
                                disabled={!uploadPreview || !newImageData.caption}
                                className={styles.submitBtn}
                            >
                                추가하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
