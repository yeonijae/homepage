'use client';

import { useState, useEffect } from 'react';

// 쿠키에서 인증 상태 확인
function isAuthenticated(): boolean {
    if (typeof document === 'undefined') return false;
    return document.cookie.includes('admin_auth=true');
}

// 인증 설정
function setAuthenticated() {
    // 24시간 유효한 쿠키
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `admin_auth=true; expires=${expires}; path=/`;
}

// 간단한 비밀번호 (향후 Supabase Auth로 업그레이드 가능)
const ADMIN_PASSWORD = 'yonyejae2024';

interface AdminAuthGuardProps {
    children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
    const [isAuthed, setIsAuthed] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 컴포넌트 마운트 시 인증 상태 확인
        setIsAuthed(isAuthenticated());
        setIsLoading(false);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (password === ADMIN_PASSWORD) {
            setAuthenticated();
            setIsAuthed(true);
            setError('');
        } else {
            setError('비밀번호가 올바르지 않습니다.');
        }
    };

    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontFamily: 'var(--font-body)',
            }}>
                로딩 중...
            </div>
        );
    }

    if (!isAuthed) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'var(--color-background)',
                fontFamily: 'var(--font-body)',
            }}>
                <div style={{
                    background: 'white',
                    padding: '40px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    maxWidth: '400px',
                    width: '90%',
                }}>
                    <h1 style={{
                        marginBottom: '24px',
                        fontSize: '24px',
                        fontWeight: '400',
                        textAlign: 'center',
                    }}>
                        관리자 로그인
                    </h1>

                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력하세요"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                fontSize: '16px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                marginBottom: '16px',
                                boxSizing: 'border-box',
                            }}
                            autoFocus
                        />

                        {error && (
                            <p style={{
                                color: '#e74c3c',
                                marginBottom: '16px',
                                fontSize: '14px',
                            }}>
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '12px',
                                fontSize: '16px',
                                background: 'var(--gradient-button, linear-gradient(135deg, #8B7355 0%, #6B5344 100%))',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            로그인
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
