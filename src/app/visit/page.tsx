import Image from 'next/image';
import Navigation from "@/components/common/Navigation";
import Footer from "@/components/common/Footer";
import styles from "./page.module.css";

export const metadata = {
    title: "내원 안내 | 연이재한의원",
    description: "연이재한의원 오시는 길, 진료시간, 주차 안내 등 내원에 필요한 정보를 안내합니다.",
};

// 갤러리 이미지 가져오기 (서버 컴포넌트)
async function getGalleryImages() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/gallery`, {
            cache: 'no-store', // 항상 최신 데이터 가져오기
        });

        if (response.ok) {
            const { data } = await response.json();
            return data.map((img: { id: number; src: string; alt: string; caption: string }) => ({
                src: img.src,
                alt: img.alt || '',
                caption: img.caption || '',
            }));
        }
    } catch (error) {
        console.error('Failed to load gallery images:', error);
    }

    // API 실패 시 빈 배열 반환
    return [];
}

export default async function VisitPage() {
    const galleryImages = await getGalleryImages();

    return (
        <main>
            <Navigation />

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <p className={styles.label}>VISIT US</p>
                    <h1 className={styles.title}>내원 안내</h1>
                    <p className={styles.subtitle}>
                        연이재한의원을 찾아주셔서 감사합니다
                    </p>
                </div>
            </section>

            {/* Gallery Section */}
            <section className={styles.gallery}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>공간 안내</h2>
                    <div className={styles.divider}></div>
                    <p className={styles.galleryIntro}>
                        따뜻하고 편안한 공간에서 정성스러운 진료를 받으실 수 있습니다
                    </p>

                    {galleryImages.length > 0 ? (
                        <div className={styles.galleryGrid}>
                            {galleryImages.map((image: { src: string; alt: string; caption: string }, index: number) => (
                                <div key={index} className={styles.galleryItem}>
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            width={600}
                                            height={400}
                                            className={styles.galleryImage}
                                        />
                                    </div>
                                    <p className={styles.imageCaption}>{image.caption}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyGallery}>
                            <p>갤러리 이미지가 준비 중입니다.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Location Section */}
            <section className={styles.location}>
                <div className={styles.container}>
                    <div className={styles.locationGrid}>
                        {/* Map Placeholder */}
                        <div className={styles.mapWrapper}>
                            <div className={styles.mapPlaceholder}>
                                <span>지도</span>
                                <p>카카오맵 / 네이버맵 연동 예정</p>
                            </div>
                            {/* 실제 구현 시 카카오맵 또는 네이버맵 API 연동 */}
                        </div>

                        {/* Location Info */}
                        <div className={styles.locationInfo}>
                            <h2 className={styles.infoTitle}>오시는 길</h2>

                            <div className={styles.infoItem}>
                                <h3>주소</h3>
                                <p className={styles.address}>
                                    서울특별시 OO구 OO로 123<br />
                                    OO빌딩 3층
                                </p>
                            </div>

                            <div className={styles.infoItem}>
                                <h3>대중교통</h3>
                                <div className={styles.transportList}>
                                    <div className={styles.transportItem}>
                                        <span className={styles.badge}>지하철</span>
                                        <p>OO역 O번 출구에서 도보 5분</p>
                                    </div>
                                    <div className={styles.transportItem}>
                                        <span className={styles.badge}>버스</span>
                                        <p>OO정류장 하차 (간선: 000, 지선: 0000)</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <h3>주차 안내</h3>
                                <p>
                                    건물 내 지하주차장 이용 가능<br />
                                    <span className={styles.highlight}>진료 시 2시간 무료</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hours Section */}
            <section className={styles.hours}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>진료 시간</h2>
                    <div className={styles.divider}></div>

                    <div className={styles.hoursGrid}>
                        <div className={styles.hoursCard}>
                            <table className={styles.hoursTable}>
                                <tbody>
                                    <tr>
                                        <td className={styles.day}>월요일 - 금요일</td>
                                        <td className={styles.time}>09:30 - 18:30</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.day}>토요일</td>
                                        <td className={styles.time}>09:30 - 14:00</td>
                                    </tr>
                                    <tr className={styles.lunchRow}>
                                        <td className={styles.day}>점심시간</td>
                                        <td className={styles.time}>13:00 - 14:00</td>
                                    </tr>
                                    <tr className={styles.closedRow}>
                                        <td className={styles.day}>일요일 · 공휴일</td>
                                        <td className={styles.time}>휴진</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className={styles.noticeCard}>
                            <h3>안내 사항</h3>
                            <ul>
                                <li>
                                    <strong>예약제 운영</strong><br />
                                    충분한 진료 시간 확보를 위해 예약제로 운영됩니다.
                                </li>
                                <li>
                                    <strong>초진 예약</strong><br />
                                    초진의 경우 약 40-50분의 진료 시간이 소요됩니다.
                                </li>
                                <li>
                                    <strong>예약 변경</strong><br />
                                    예약 변경은 최소 하루 전에 연락 부탁드립니다.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className={styles.contact}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitleLight}>연락처</h2>
                    <div className={styles.dividerLight}></div>

                    <div className={styles.contactGrid}>
                        <div className={styles.contactCard}>
                            <div className={styles.contactIcon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                            </div>
                            <h3>전화 예약</h3>
                            <p className={styles.contactNumber}>02-XXX-XXXX</p>
                            <p className={styles.contactNote}>평일 09:30 - 18:00</p>
                        </div>

                        <div className={styles.contactCard}>
                            <div className={styles.contactIcon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                </svg>
                            </div>
                            <h3>카카오톡 상담</h3>
                            <p className={styles.contactNumber}>@연이재한의원</p>
                            <p className={styles.contactNote}>24시간 문의 가능</p>
                        </div>

                        <div className={styles.contactCard}>
                            <div className={styles.contactIcon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>
                            <h3>온라인 예약</h3>
                            <a href="/reservation" className={styles.contactLink}>예약 페이지 바로가기</a>
                            <p className={styles.contactNote}>간편하게 예약하세요</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Preparation Section */}
            <section className={styles.preparation}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>내원 시 준비물</h2>
                    <div className={styles.divider}></div>

                    <div className={styles.prepGrid}>
                        <div className={styles.prepCard}>
                            <div className={styles.prepNumber}>01</div>
                            <h3>신분증</h3>
                            <p>본인 확인을 위해 신분증을 지참해 주세요.</p>
                        </div>
                        <div className={styles.prepCard}>
                            <div className={styles.prepNumber}>02</div>
                            <h3>건강보험증</h3>
                            <p>보험 적용 진료를 위해 필요합니다.</p>
                        </div>
                        <div className={styles.prepCard}>
                            <div className={styles.prepNumber}>03</div>
                            <h3>복용 약 목록</h3>
                            <p>현재 복용 중인 약이 있다면 목록을 가져와 주세요.</p>
                        </div>
                        <div className={styles.prepCard}>
                            <div className={styles.prepNumber}>04</div>
                            <h3>검사 결과지</h3>
                            <p>최근 건강검진이나 검사 결과가 있다면 참고가 됩니다.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className={styles.container}>
                    <p className={styles.ctaText}>
                        궁금한 점이 있으신가요?
                    </p>
                    <div className={styles.ctaButtons}>
                        <a href="tel:02-XXX-XXXX" className="btn btn--primary">
                            전화 문의하기
                        </a>
                        <a href="/reservation" className="btn btn--outline">
                            온라인 예약하기
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
