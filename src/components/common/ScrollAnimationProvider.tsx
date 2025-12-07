'use client';

import { useEffect } from 'react';

export default function ScrollAnimationProvider() {
    useEffect(() => {
        // 디버깅 로그
        console.log('[ScrollAnimation] Initializing...');

        // animate-on-scroll 요소 찾기
        const elements = document.querySelectorAll('.animate-on-scroll');
        console.log(`[ScrollAnimation] Found ${elements.length} elements with .animate-on-scroll`);

        if (elements.length === 0) {
            console.warn('[ScrollAnimation] No elements found! Check if components have the class.');
            return;
        }

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

        // Cleanup
        return () => {
            console.log('[ScrollAnimation] Cleaning up...');
            observer.disconnect();
        };
    }, []);

    return null;
}
