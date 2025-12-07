'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

interface GalleryImage {
    id: string;
    src: string;
    alt: string;
    caption: string;
    order: number;
}

export default function AdminGalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ caption: '', alt: '' });
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadPreview, setUploadPreview] = useState<string | null>(null);
    const [newImageData, setNewImageData] = useState({ caption: '', alt: '' });

    // 데이터 로드
    useEffect(() => {
        loadImages();
    }, []);

    const loadImages = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/gallery');
            if (response.ok) {
                const { data } = await response.json();
                // DB 데이터를 GalleryImage 형식으로 변환
                const formattedImages: GalleryImage[] = data.map((img: {
                    id: number;
                    src: string;
                    alt: string;
                    caption: string;
                    display_order: number;
                }) => ({
                    id: String(img.id),
                    src: img.src,
                    alt: img.alt || '',
                    caption: img.caption || '',
                    order: img.display_order || 0,
                }));
                setImages(formattedImages);
            }
        } catch (error) {
            console.error('Failed to load images:', error);
            alert('이미지를 불러오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    // 편집 시작
    const startEdit = (image: GalleryImage) => {
        setEditingId(image.id);
        setEditForm({ caption: image.caption, alt: image.alt });
    };

    // 편집 저장
    const saveEdit = async (id: string) => {
        try {
            // TODO: PUT API 구현 시 연동
            setImages(prev => prev.map(img =>
                img.id === id ? { ...img, caption: editForm.caption, alt: editForm.alt } : img
            ));
            setEditingId(null);
            alert('수정되었습니다. (현재는 임시 저장)');
        } catch (error) {
            console.error('Failed to save edit:', error);
            alert('수정에 실패했습니다.');
        }
    };

    // 편집 취소
    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({ caption: '', alt: '' });
    };

    // 삭제
    const deleteImage = async (id: string) => {
        if (!confirm('정말 이 이미지를 삭제하시겠습니까?')) {
            return;
        }

        try {
            const response = await fetch(`/api/gallery?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setImages(prev => prev.filter(img => img.id !== id));
                alert('삭제되었습니다.');
            } else {
                const result = await response.json();
                alert(result.error || '삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('Failed to delete image:', error);
            alert('삭제에 실패했습니다.');
        }
    };

    // 순서 변경
    const moveImage = (id: string, direction: 'up' | 'down') => {
        const index = images.findIndex(img => img.id === id);
        if (direction === 'up' && index > 0) {
            const newImages = [...images];
            [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
            setImages(newImages);
            // TODO: 순서 변경 API 호출
        } else if (direction === 'down' && index < images.length - 1) {
            const newImages = [...images];
            [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
            setImages(newImages);
            // TODO: 순서 변경 API 호출
        }
    };

    // 파일 업로드 처리
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 파일 크기 체크 (500KB 제한 - Base64 인코딩 시 약 30% 증가)
        const maxSize = 500 * 1024; // 500KB
        if (file.size > maxSize) {
            alert(`이미지 크기가 너무 큽니다.\n\n현재: ${(file.size / 1024).toFixed(0)}KB\n제한: 500KB\n\n더 작은 이미지를 사용하거나 이미지 압축 후 업로드해주세요.`);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setUploadPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    // 이미지 추가
    const addImage = async () => {
        if (!uploadPreview || !newImageData.caption) {
            return;
        }

        try {
            const response = await fetch('/api/gallery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    src: uploadPreview, // Base64 이미지
                    alt: newImageData.alt || newImageData.caption,
                    caption: newImageData.caption,
                    displayOrder: images.length,
                }),
            });

            if (response.ok) {
                const { data } = await response.json();
                setImages(prev => [...prev, {
                    id: String(data.id),
                    src: data.src,
                    alt: data.alt,
                    caption: data.caption,
                    order: data.display_order,
                }]);
                setShowUploadModal(false);
                setUploadPreview(null);
                setNewImageData({ caption: '', alt: '' });
                alert('이미지가 추가되었습니다.');
            } else {
                const result = await response.json();
                alert(result.error || '이미지 추가에 실패했습니다.');
            }
        } catch (error) {
            console.error('Failed to add image:', error);
            alert('이미지 추가에 실패했습니다.');
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
            {isLoading ? (
                <div className={styles.loading}>
                    <p>갤러리 이미지를 불러오는 중...</p>
                </div>
            ) : images.length === 0 ? (
                <div className={styles.empty}>
                    <p>등록된 이미지가 없습니다.</p>
                    <p>+ 이미지 추가 버튼을 클릭하여 첫 이미지를 등록하세요.</p>
                </div>
            ) : (
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
            )}

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
