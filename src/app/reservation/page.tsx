'use client';

import { useState } from 'react';
import Navigation from "@/components/common/Navigation";
import Footer from "@/components/common/Footer";
import styles from "./page.module.css";

export default function ReservationPage() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        visitType: 'first',
        preferredDate: '',
        preferredTime: '',
        symptoms: '',
        message: '',
        agreePrivacy: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    conditionType: formData.symptoms,
                    preferredDate: formData.preferredDate,
                    preferredTime: formData.preferredTime,
                    message: formData.message,
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Reservation error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitStatus === 'success') {
        return (
            <main>
                <Navigation />
                <section className={styles.success}>
                    <div className={styles.successContent}>
                        <div className={styles.successIcon}>✓</div>
                        <h1>예약 신청이 완료되었습니다</h1>
                        <p>
                            빠른 시일 내에 연락드리겠습니다.<br />
                            감사합니다.
                        </p>
                        <div className={styles.successInfo}>
                            <p><strong>예약자명:</strong> {formData.name}</p>
                            <p><strong>연락처:</strong> {formData.phone}</p>
                            <p><strong>희망일시:</strong> {formData.preferredDate} {formData.preferredTime}</p>
                        </div>
                        <a href="/" className="btn btn--primary">
                            홈으로 돌아가기
                        </a>
                    </div>
                </section>
                <Footer />
            </main>
        );
    }

    return (
        <main>
            <Navigation />

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <p className={styles.label}>RESERVATION</p>
                    <h1 className={styles.title}>진료 예약</h1>
                    <p className={styles.subtitle}>
                        온라인으로 간편하게 예약하세요<br />
                        빠른 시일 내에 확인 연락드리겠습니다
                    </p>
                </div>
            </section>

            {/* Reservation Form Section */}
            <section className={styles.formSection}>
                <div className={styles.container}>
                    <div className={styles.formGrid}>
                        {/* Form */}
                        <div className={styles.formWrapper}>
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">이름 *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="이름을 입력해주세요"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="phone">연락처 *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="010-0000-0000"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="email">이메일</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="example@email.com"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="visitType">방문 유형 *</label>
                                    <select
                                        id="visitType"
                                        name="visitType"
                                        value={formData.visitType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="first">초진 (처음 방문)</option>
                                        <option value="return">재진 (재방문)</option>
                                    </select>
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="preferredDate">희망 날짜 *</label>
                                        <input
                                            type="date"
                                            id="preferredDate"
                                            name="preferredDate"
                                            value={formData.preferredDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="preferredTime">희망 시간 *</label>
                                        <select
                                            id="preferredTime"
                                            name="preferredTime"
                                            value={formData.preferredTime}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">선택해주세요</option>
                                            <option value="09:30">09:30</option>
                                            <option value="10:00">10:00</option>
                                            <option value="10:30">10:30</option>
                                            <option value="11:00">11:00</option>
                                            <option value="11:30">11:30</option>
                                            <option value="14:00">14:00</option>
                                            <option value="14:30">14:30</option>
                                            <option value="15:00">15:00</option>
                                            <option value="15:30">15:30</option>
                                            <option value="16:00">16:00</option>
                                            <option value="16:30">16:30</option>
                                            <option value="17:00">17:00</option>
                                            <option value="17:30">17:30</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="symptoms">주요 증상</label>
                                    <select
                                        id="symptoms"
                                        name="symptoms"
                                        value={formData.symptoms}
                                        onChange={handleChange}
                                    >
                                        <option value="">선택해주세요</option>
                                        <optgroup label="여성 질환">
                                            <option value="pcos">다낭성난소증후군</option>
                                            <option value="menstrual">생리불순 / 생리통</option>
                                            <option value="infertility">난임</option>
                                            <option value="menopause">갱년기</option>
                                        </optgroup>
                                        <optgroup label="소화기 질환">
                                            <option value="gerd">역류성 식도염</option>
                                            <option value="ibs">과민성 대장증후군</option>
                                            <option value="indigestion">소화불량</option>
                                        </optgroup>
                                        <optgroup label="피부 질환">
                                            <option value="atopy">아토피</option>
                                            <option value="acne">여드름</option>
                                        </optgroup>
                                        <optgroup label="기타">
                                            <option value="fatigue">만성 피로</option>
                                            <option value="insomnia">불면증</option>
                                            <option value="other">기타</option>
                                        </optgroup>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="message">문의 내용</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="증상이나 궁금한 점을 자유롭게 작성해주세요"
                                    />
                                </div>

                                <div className={styles.formCheckbox}>
                                    <input
                                        type="checkbox"
                                        id="agreePrivacy"
                                        name="agreePrivacy"
                                        checked={formData.agreePrivacy}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="agreePrivacy">
                                        개인정보 수집 및 이용에 동의합니다. *
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className={`btn btn--primary ${styles.submitBtn}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? '예약 신청 중...' : '예약 신청하기'}
                                </button>
                            </form>
                        </div>

                        {/* Info Sidebar */}
                        <div className={styles.sidebar}>
                            <div className={styles.infoCard}>
                                <h3>진료 안내</h3>
                                <ul>
                                    <li>
                                        <strong>초진 진료</strong>
                                        <p>약 40-50분 소요</p>
                                    </li>
                                    <li>
                                        <strong>재진 진료</strong>
                                        <p>약 15-20분 소요</p>
                                    </li>
                                </ul>
                            </div>

                            <div className={styles.infoCard}>
                                <h3>진료 시간</h3>
                                <ul className={styles.hoursList}>
                                    <li>
                                        <span>평일</span>
                                        <span>09:30 - 18:30</span>
                                    </li>
                                    <li>
                                        <span>토요일</span>
                                        <span>09:30 - 14:00</span>
                                    </li>
                                    <li>
                                        <span>점심시간</span>
                                        <span>13:00 - 14:00</span>
                                    </li>
                                </ul>
                            </div>

                            <div className={styles.infoCard}>
                                <h3>빠른 상담</h3>
                                <p className={styles.quickContact}>
                                    급한 문의는 전화로 연락해주세요
                                </p>
                                <a href="tel:02-XXX-XXXX" className={styles.phoneNumber}>
                                    02-XXX-XXXX
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
