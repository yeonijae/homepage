'use client';

import { useState } from 'react';
import styles from './page.module.css';

// 리드 단계 정의
const STAGES = [
    { id: 'new', label: '신규 문의', color: '#22c55e', icon: '📥' },
    { id: 'contacted', label: '연락 완료', color: '#3b82f6', icon: '📞' },
    { id: 'consulting', label: '상담 중', color: '#f59e0b', icon: '💬' },
    { id: 'scheduled', label: '예약 완료', color: '#8b5cf6', icon: '📅' },
    { id: 'visited', label: '내원 완료', color: '#06b6d4', icon: '🏥' },
];

// 더미 데이터 - 각 환자별 상세 타임라인 포함
const DUMMY_LEADS = [
    {
        id: '1',
        name: '김영희',
        phone: '010-1234-5678',
        condition: 'PCOS',
        currentStage: 'consulting',
        priority: 'high',
        timeline: [
            { stage: 'new', date: '2024-12-05 10:30', action: '웹사이트 예약 폼 통해 문의', note: '시험관 준비 중이라 빠른 상담 원함' },
            { stage: 'contacted', date: '2024-12-05 14:00', action: '전화 연락 완료', note: '내일 카카오톡으로 상세 상담 예정' },
            { stage: 'consulting', date: '2024-12-06 10:00', action: '카카오톡 상담 시작', note: 'PCOS 관련 한방 치료 설명, 시험관 전 몸 만들기 문의' },
        ]
    },
    {
        id: '2',
        name: '박지민',
        phone: '010-2345-6789',
        condition: '역류성식도염',
        currentStage: 'new',
        priority: 'normal',
        timeline: [
            { stage: 'new', date: '2024-12-07 09:15', action: '카카오 채널 통해 문의', note: '3개월째 지속되는 역류 증상' },
        ]
    },
    {
        id: '3',
        name: '이현우',
        phone: '010-4567-8901',
        condition: '불면',
        currentStage: 'scheduled',
        priority: 'normal',
        timeline: [
            { stage: 'new', date: '2024-12-01 13:20', action: '네이버 예약 통해 문의', note: '' },
            { stage: 'contacted', date: '2024-12-02 09:00', action: '전화 연락 완료', note: '수면제 의존성 걱정' },
            { stage: 'consulting', date: '2024-12-03 15:00', action: '카카오톡 상담', note: '한방 수면 치료 안내, 침치료 병행 설명' },
            { stage: 'scheduled', date: '2024-12-05 10:00', action: '예약 확정', note: '12/10 오전 10시 초진 예약' },
        ]
    },
    {
        id: '4',
        name: '정하나',
        phone: '010-5678-9012',
        condition: '난임',
        currentStage: 'visited',
        priority: 'high',
        timeline: [
            { stage: 'new', date: '2024-11-20 11:00', action: '전화 문의', note: 'VIP 고객 - 부부 동반 치료 문의' },
            { stage: 'contacted', date: '2024-11-20 11:30', action: '원장님 직접 통화', note: '난임 3년차, 시험관 2회 실패' },
            { stage: 'consulting', date: '2024-11-22 14:00', action: '부부 함께 상담', note: '남녀 모두 한방 치료 결정' },
            { stage: 'scheduled', date: '2024-11-25 10:00', action: '예약 확정', note: '11/28 오전 초진 예약' },
            { stage: 'visited', date: '2024-11-28 10:00', action: '초진 완료', note: '1개월 한약 처방, 침치료 주 2회 시작' },
        ]
    },
    {
        id: '5',
        name: '최수진',
        phone: '010-3456-7890',
        condition: '생리통',
        currentStage: 'contacted',
        priority: 'normal',
        timeline: [
            { stage: 'new', date: '2024-12-06 15:30', action: '인스타그램 DM 문의', note: '매달 진통제 없으면 못 버틴다고 함' },
            { stage: 'contacted', date: '2024-12-07 09:00', action: '카카오톡 연결', note: '다음 생리 전 내원 권유' },
        ]
    },
    {
        id: '6',
        name: '한지우',
        phone: '010-9012-3456',
        condition: 'PCOS',
        currentStage: 'consulting',
        priority: 'high',
        timeline: [
            { stage: 'new', date: '2024-11-28 16:00', action: '웹사이트 문의', note: '한약 복용 문의' },
            { stage: 'contacted', date: '2024-11-29 10:00', action: '전화 연락', note: '상담 일정 조율' },
            { stage: 'consulting', date: '2024-12-01 14:00', action: '카카오톡 상담 시작', note: '보험 적용 관련 질문 많음' },
        ]
    },
];

interface TimelineEvent {
    stage: string;
    date: string;
    action: string;
    note: string;
}

interface Lead {
    id: string;
    name: string;
    phone: string;
    condition: string;
    currentStage: string;
    priority: string;
    timeline: TimelineEvent[];
}

type ViewMode = 'kanban' | 'timeline';

export default function LeadsPage() {
    const [leads] = useState<Lead[]>(DUMMY_LEADS);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>('timeline');

    const filteredLeads = leads.filter(lead =>
        searchQuery === '' ||
        lead.name.includes(searchQuery) ||
        lead.condition.includes(searchQuery)
    );

    const getLeadsByStage = (stageId: string) => {
        return filteredLeads.filter(lead => lead.currentStage === stageId);
    };

    const getStageInfo = (stageId: string) => {
        return STAGES.find(s => s.id === stageId);
    };

    const getCurrentStageIndex = (stageId: string) => {
        return STAGES.findIndex(s => s.id === stageId);
    };

    return (
        <div className={styles.leadsPage}>
            {/* 페이지 헤더 */}
            <div className={styles.pageHeader}>
                <div className={styles.headerLeft}>
                    <h1>환자 여정 관리</h1>
                    <p>환자와의 소통 과정을 한눈에 확인하세요</p>
                </div>
                <div className={styles.headerRight}>
                    {/* 뷰 모드 토글 */}
                    <div className={styles.viewToggle}>
                        <button
                            className={`${styles.viewBtn} ${viewMode === 'timeline' ? styles.active : ''}`}
                            onClick={() => setViewMode('timeline')}
                        >
                            📋 타임라인
                        </button>
                        <button
                            className={`${styles.viewBtn} ${viewMode === 'kanban' ? styles.active : ''}`}
                            onClick={() => setViewMode('kanban')}
                        >
                            📊 칸반
                        </button>
                    </div>
                    <div className={styles.searchBox}>
                        <span className={styles.searchIcon}>🔍</span>
                        <input
                            type="text"
                            placeholder="이름, 질환으로 검색..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                    <button className={styles.addBtn}>+ 환자 추가</button>
                </div>
            </div>

            {/* 타임라인 뷰 */}
            {viewMode === 'timeline' && (
                <div className={styles.timelineContainer}>
                    {/* 진행 단계 헤더 */}
                    <div className={styles.stageHeader}>
                        {STAGES.map((stage, index) => (
                            <div key={stage.id} className={styles.stageHeaderItem}>
                                <div
                                    className={styles.stageIcon}
                                    style={{ background: stage.color }}
                                >
                                    {stage.icon}
                                </div>
                                <span className={styles.stageName}>{stage.label}</span>
                                {index < STAGES.length - 1 && (
                                    <div className={styles.stageConnector} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* 환자별 타임라인 */}
                    <div className={styles.patientList}>
                        {filteredLeads.map(lead => {
                            const currentIndex = getCurrentStageIndex(lead.currentStage);
                            return (
                                <div
                                    key={lead.id}
                                    className={`${styles.patientRow} ${lead.priority === 'high' ? styles.highPriority : ''}`}
                                    onClick={() => setSelectedLead(lead)}
                                >
                                    {/* 환자 정보 */}
                                    <div className={styles.patientInfo}>
                                        <div className={styles.patientName}>
                                            {lead.priority === 'high' && <span className={styles.priorityBadge}>🔥</span>}
                                            {lead.name}
                                        </div>
                                        <div className={styles.patientCondition}>{lead.condition}</div>
                                    </div>

                                    {/* 타임라인 진행 바 */}
                                    <div className={styles.timelineTrack}>
                                        {STAGES.map((stage, index) => {
                                            const hasEvent = lead.timeline.some(t => t.stage === stage.id);
                                            const isCurrent = lead.currentStage === stage.id;
                                            const isPast = index < currentIndex;
                                            const event = lead.timeline.find(t => t.stage === stage.id);

                                            return (
                                                <div key={stage.id} className={styles.timelineCell}>
                                                    {/* 연결선 */}
                                                    {index > 0 && (
                                                        <div
                                                            className={`${styles.connector} ${isPast || isCurrent ? styles.filled : ''}`}
                                                        />
                                                    )}

                                                    {/* 노드 */}
                                                    <div
                                                        className={`${styles.timelineNode} ${isCurrent ? styles.current : ''} ${isPast ? styles.completed : ''} ${!hasEvent ? styles.empty : ''}`}
                                                        style={hasEvent ? { borderColor: stage.color, background: isCurrent ? stage.color : 'white' } : {}}
                                                    >
                                                        {hasEvent && (isCurrent ? '●' : '✓')}
                                                    </div>

                                                    {/* 이벤트 정보 (현재 단계만 표시) */}
                                                    {isCurrent && event && (
                                                        <div className={styles.eventInfo}>
                                                            <span className={styles.eventDate}>
                                                                {formatDate(event.date)}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* 마지막 활동 */}
                                    <div className={styles.lastActivity}>
                                        <span className={styles.lastAction}>
                                            {lead.timeline[lead.timeline.length - 1]?.action}
                                        </span>
                                        <span className={styles.lastDate}>
                                            {formatDate(lead.timeline[lead.timeline.length - 1]?.date)}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* 칸반 보드 뷰 */}
            {viewMode === 'kanban' && (
                <div className={styles.kanbanBoard}>
                    {STAGES.map(stage => {
                        const stageLeads = getLeadsByStage(stage.id);
                        return (
                            <div key={stage.id} className={styles.kanbanColumn}>
                                <div className={styles.columnHeader}>
                                    <div className={styles.columnTitle}>
                                        <span
                                            className={styles.stageDot}
                                            style={{ background: stage.color }}
                                        />
                                        <span>{stage.label}</span>
                                        <span className={styles.columnCount}>{stageLeads.length}</span>
                                    </div>
                                </div>
                                <div className={styles.columnContent}>
                                    {stageLeads.map(lead => (
                                        <div
                                            key={lead.id}
                                            className={`${styles.leadCard} ${lead.priority === 'high' ? styles.highPriority : ''}`}
                                            onClick={() => setSelectedLead(lead)}
                                        >
                                            <div className={styles.leadHeader}>
                                                <span className={styles.leadName}>{lead.name}</span>
                                                {lead.priority === 'high' && (
                                                    <span className={styles.priorityBadge}>🔥</span>
                                                )}
                                            </div>
                                            <span className={styles.leadCondition}>{lead.condition}</span>
                                            {lead.timeline[lead.timeline.length - 1]?.note && (
                                                <p className={styles.leadNote}>
                                                    {lead.timeline[lead.timeline.length - 1].note}
                                                </p>
                                            )}
                                            <div className={styles.leadFooter}>
                                                <span className={styles.leadTime}>
                                                    {formatDate(lead.timeline[lead.timeline.length - 1]?.date)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    {stageLeads.length === 0 && (
                                        <div className={styles.emptyColumn}>
                                            환자 없음
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* 상세 타임라인 모달 */}
            {selectedLead && (
                <div className={styles.modalOverlay} onClick={() => setSelectedLead(null)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <div>
                                <h2>
                                    {selectedLead.priority === 'high' && '🔥 '}
                                    {selectedLead.name}
                                </h2>
                                <span className={styles.modalCondition}>{selectedLead.condition}</span>
                            </div>
                            <button
                                className={styles.closeBtn}
                                onClick={() => setSelectedLead(null)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className={styles.modalContent}>
                            {/* 환자 기본 정보 */}
                            <div className={styles.patientDetails}>
                                <div className={styles.detailRow}>
                                    <span className={styles.detailLabel}>연락처</span>
                                    <span className={styles.detailValue}>{selectedLead.phone}</span>
                                </div>
                                <div className={styles.detailRow}>
                                    <span className={styles.detailLabel}>현재 단계</span>
                                    <span
                                        className={styles.stageBadge}
                                        style={{ background: getStageInfo(selectedLead.currentStage)?.color }}
                                    >
                                        {getStageInfo(selectedLead.currentStage)?.icon} {getStageInfo(selectedLead.currentStage)?.label}
                                    </span>
                                </div>
                            </div>

                            {/* 상세 타임라인 */}
                            <div className={styles.detailTimeline}>
                                <h3>소통 히스토리</h3>
                                <div className={styles.timelineList}>
                                    {selectedLead.timeline.map((event, index) => {
                                        const stageInfo = getStageInfo(event.stage);
                                        return (
                                            <div key={index} className={styles.timelineItem}>
                                                <div
                                                    className={styles.timelineDot}
                                                    style={{ background: stageInfo?.color }}
                                                >
                                                    {stageInfo?.icon}
                                                </div>
                                                {index < selectedLead.timeline.length - 1 && (
                                                    <div className={styles.timelineLine} />
                                                )}
                                                <div className={styles.timelineContent}>
                                                    <div className={styles.timelineTop}>
                                                        <span className={styles.timelineStage}>
                                                            {stageInfo?.label}
                                                        </span>
                                                        <span className={styles.timelineDate}>
                                                            {formatDateTime(event.date)}
                                                        </span>
                                                    </div>
                                                    <div className={styles.timelineAction}>
                                                        {event.action}
                                                    </div>
                                                    {event.note && (
                                                        <div className={styles.timelineNote}>
                                                            💬 {event.note}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className={styles.modalActions}>
                            <button className={styles.actionBtn}>💬 메시지</button>
                            <button className={styles.actionBtn}>📞 전화</button>
                            <button className={styles.actionBtn}>📝 메모 추가</button>
                            <button className={styles.actionBtnPrimary}>➡️ 다음 단계로</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// 날짜 포맷 함수
function formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return '오늘';
    if (days === 1) return '어제';
    if (days < 7) return `${days}일 전`;
    return `${date.getMonth() + 1}/${date.getDate()}`;
}

function formatDateTime(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month}/${day} ${hours}:${minutes}`;
}
