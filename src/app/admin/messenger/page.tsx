'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './page.module.css';

// 더미 대화 목록
const DUMMY_CONVERSATIONS = [
    {
        id: '1',
        name: '김영희',
        condition: 'PCOS',
        lastMessage: '시험관 시술 전 상담 받고 싶습니다.',
        time: '10분 전',
        unread: 2,
        status: 'active'
    },
    {
        id: '2',
        name: '박지민',
        condition: '역류성식도염',
        lastMessage: '예약 변경 가능할까요?',
        time: '1시간 전',
        unread: 1,
        status: 'active'
    },
    {
        id: '3',
        name: '최수진',
        condition: '생리통',
        lastMessage: '감사합니다. 다음 주에 방문하겠습니다.',
        time: '3시간 전',
        unread: 0,
        status: 'active'
    },
    {
        id: '4',
        name: '이현우',
        condition: '불면',
        lastMessage: '안녕하세요, 문의드립니다.',
        time: '어제',
        unread: 0,
        status: 'resolved'
    },
    {
        id: '5',
        name: '정하나',
        condition: '난임',
        lastMessage: '부부 동반 상담 문의드립니다.',
        time: '12/04',
        unread: 0,
        status: 'resolved'
    },
];

// 더미 메시지
const DUMMY_MESSAGES: Record<string, Message[]> = {
    '1': [
        { id: '1', sender: 'patient', content: '안녕하세요, 시험관 시술 전 상담 받고 싶습니다.', time: '오전 10:20' },
        { id: '2', sender: 'staff', content: '안녕하세요! 연이재한의원입니다. 시험관 시술 전 한방 치료에 관심 가져주셔서 감사합니다.', time: '오전 10:25' },
        { id: '3', sender: 'staff', content: '혹시 시술 일정이 잡혀 있으신가요?', time: '오전 10:25' },
        { id: '4', sender: 'patient', content: '아직 일정은 정하지 않았는데, 먼저 몸 상태를 점검받고 싶어서요.', time: '오전 10:28' },
        { id: '5', sender: 'patient', content: '난소 기능이 좋지 않다고 해서 걱정이 됩니다.', time: '오전 10:28' },
    ],
    '2': [
        { id: '1', sender: 'patient', content: '안녕하세요, 예약 변경 가능할까요?', time: '오전 9:15' },
        { id: '2', sender: 'staff', content: '안녕하세요! 네, 가능합니다. 어떤 날짜로 변경하시겠어요?', time: '오전 9:20' },
    ],
};

interface Conversation {
    id: string;
    name: string;
    condition: string;
    lastMessage: string;
    time: string;
    unread: number;
    status: string;
}

interface Message {
    id: string;
    sender: 'patient' | 'staff';
    content: string;
    time: string;
}

export default function MessengerPage() {
    const [conversations] = useState<Conversation[]>(DUMMY_CONVERSATIONS);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(DUMMY_CONVERSATIONS[0]);
    const [messages, setMessages] = useState<Message[]>(DUMMY_MESSAGES['1'] || []);
    const [newMessage, setNewMessage] = useState('');
    const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedConversation) {
            setMessages(DUMMY_MESSAGES[selectedConversation.id] || []);
        }
    }, [selectedConversation]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const filteredConversations = conversations.filter(conv => {
        if (filter === 'all') return true;
        return conv.status === filter;
    });

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedConversation) return;

        const newMsg: Message = {
            id: `new-${Date.now()}`,
            sender: 'staff',
            content: newMessage,
            time: '방금 전'
        };

        setMessages(prev => [...prev, newMsg]);
        setNewMessage('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className={styles.messengerPage}>
            {/* 대화 목록 */}
            <div className={styles.conversationList}>
                <div className={styles.listHeader}>
                    <h2>💬 메시지</h2>
                    <div className={styles.filterTabs}>
                        <button
                            className={`${styles.filterTab} ${filter === 'all' ? styles.active : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            전체
                        </button>
                        <button
                            className={`${styles.filterTab} ${filter === 'active' ? styles.active : ''}`}
                            onClick={() => setFilter('active')}
                        >
                            진행 중
                        </button>
                        <button
                            className={`${styles.filterTab} ${filter === 'resolved' ? styles.active : ''}`}
                            onClick={() => setFilter('resolved')}
                        >
                            완료
                        </button>
                    </div>
                </div>
                <div className={styles.listContent}>
                    {filteredConversations.map(conv => (
                        <div
                            key={conv.id}
                            className={`${styles.conversationItem} ${selectedConversation?.id === conv.id ? styles.selected : ''}`}
                            onClick={() => setSelectedConversation(conv)}
                        >
                            <div className={styles.convAvatar}>
                                {conv.name[0]}
                            </div>
                            <div className={styles.convInfo}>
                                <div className={styles.convHeader}>
                                    <span className={styles.convName}>{conv.name}</span>
                                    <span className={styles.convTime}>{conv.time}</span>
                                </div>
                                <span className={styles.convCondition}>{conv.condition}</span>
                                <p className={styles.convMessage}>{conv.lastMessage}</p>
                            </div>
                            {conv.unread > 0 && (
                                <span className={styles.unreadBadge}>{conv.unread}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 채팅창 */}
            <div className={styles.chatArea}>
                {selectedConversation ? (
                    <>
                        {/* 채팅 헤더 */}
                        <div className={styles.chatHeader}>
                            <div className={styles.chatUserInfo}>
                                <div className={styles.chatAvatar}>
                                    {selectedConversation.name[0]}
                                </div>
                                <div>
                                    <span className={styles.chatUserName}>{selectedConversation.name}</span>
                                    <span className={styles.chatCondition}>{selectedConversation.condition}</span>
                                </div>
                            </div>
                            <div className={styles.chatActions}>
                                <button className={styles.chatActionBtn}>📞 전화</button>
                                <button className={styles.chatActionBtn}>👤 프로필</button>
                            </div>
                        </div>

                        {/* 메시지 영역 */}
                        <div className={styles.messagesArea}>
                            {messages.map(msg => (
                                <div
                                    key={msg.id}
                                    className={`${styles.message} ${msg.sender === 'staff' ? styles.sent : styles.received}`}
                                >
                                    <div className={styles.messageBubble}>
                                        {msg.content}
                                    </div>
                                    <span className={styles.messageTime}>{msg.time}</span>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* 입력 영역 */}
                        <div className={styles.inputArea}>
                            <input
                                type="text"
                                placeholder="메시지를 입력하세요..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className={styles.messageInput}
                            />
                            <button
                                className={styles.sendBtn}
                                onClick={handleSendMessage}
                                disabled={!newMessage.trim()}
                            >
                                전송
                            </button>
                        </div>
                    </>
                ) : (
                    <div className={styles.emptyChat}>
                        <span className={styles.emptyChatIcon}>💬</span>
                        <p>대화를 선택해주세요</p>
                    </div>
                )}
            </div>
        </div>
    );
}
