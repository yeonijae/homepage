'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollAnimationProvider() {
    const pathname = usePathname();

    useEffect(() => {
        // 디버깅 로그
        console.log('[ScrollAnimation] Initializing for path:', pathname);

        // 약간의 지연 후 실행 (DOM이 완전히 렌더링될 때까지)
        const initTimeout = setTimeout(() => {
            // animate-on-scroll 요소 찾기
            const elements = document.querySelectorAll('.animate-on-scroll');
            console.log(`[ScrollAnimation] Found ${elements.length} elements with .animate-on-scroll`);

            if (elements.length === 0) {
                console.warn('[ScrollAnimation] No elements found! Check if components have the class.');
                return;
            }

            // 기존 visible 클래스 제거 (페이지 전환 시 리셋)
            elements.forEach((el) => {
                el.classList.remove('visible');
            });

            // Intersection Observer 옵션
            const options: IntersectionObserverInit = {
                root: null,
                rootMargin: '0px 0px -50px 0px',
                threshold: 0.1,
            };

            // Observer 콜백
            const callback: IntersectionObserverCallback = (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        console.log('[ScrollAnimation] Element visible:', entry.target);
                        entry.target.classList.add('visible');
                    }
                });
            };

            // Observer 생성 및 요소 관찰
            const observer = new IntersectionObserver(callback, options);

            elements.forEach((el, index) => {
                console.log(`[ScrollAnimation] Observing element ${index}:`, el.className);
                observer.observe(el);
            });

            // 초기 화면에 보이는 요소들 즉시 표시 (fallback)
            setTimeout(() => {
                elements.forEach((el) => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight) {
                        console.log('[ScrollAnimation] Initial visible element:', el);
                        el.classList.add('visible');
                    }
                });
            }, 100);

            console.log('[ScrollAnimation] Setup complete!');

            // Cleanup 함수를 저장
            (window as unknown as { __scrollObserver?: IntersectionObserver }).__scrollObserver = observer;
        }, 50);

        // Cleanup
        return () => {
            console.log('[ScrollAnimation] Cleaning up...');
            clearTimeout(initTimeout);
            const observer = (window as unknown as { __scrollObserver?: IntersectionObserver }).__scrollObserver;
            if (observer) {
                observer.disconnect();
            }
        };
    }, [pathname]); // pathname이 변경될 때마다 다시 실행

    return null;
}

