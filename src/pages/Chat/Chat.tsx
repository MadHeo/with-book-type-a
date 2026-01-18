function Chat() {
  // UI 샘플 데이터 (실제 로직 구현 없음)
  const chatList = [
    {
      id: '1',
      userName: '김지연',
      age: 28,
      location: '서울',
      status: 'sent', // 내가 보낸 경우
      lastMessage: '안녕하세요! 같은 책을 읽으셨네요 😊',
      time: '2시간 전',
    },
    {
      id: '2',
      userName: '박민지',
      age: 29,
      location: '인천',
      status: 'received', // 내가 받은 경우
      lastMessage: '반갑습니다~ 저도 그 책 좋아해요!',
      time: '30분 전',
    },
    {
      id: '3',
      userName: '이서현',
      age: 26,
      location: '경기',
      status: 'chatting', // 채팅 중
      lastMessage: '네, 저도 그 부분이 정말 인상 깊었어요!',
      time: '방금 전',
      unreadCount: 2,
    },
    {
      id: '4',
      userName: '최유진',
      age: 27,
      location: '서울',
      status: 'chatting', // 채팅 중
      lastMessage: '그 책 정말 좋았어요 ㅎㅎ',
      time: '1일 전',
      unreadCount: 0,
    },
  ];

  // 상태별 메시지 반환
  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'sent':
        return { text: '상대방의 응답을 기다리고 있어요', icon: '⏳', color: 'text-orange-600' };
      case 'received':
        return { text: '새로운 쪽지가 도착했어요', icon: '📮', color: 'text-blue-600' };
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col pb-20">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white p-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl font-bold mb-2">💬 채팅</h1>
        <p className="text-orange-50">매칭된 상대와 대화하세요</p>
      </div>

      <div className="p-4 space-y-3 mt-4">
        {chatList.map((chat) => {
          const statusMsg = getStatusMessage(chat.status);

          return (
            <div
              key={chat.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-3">
                {/* 프로필 이미지 */}
                <div className="flex-shrink-0 relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👩</span>
                  </div>
                  {/* 채팅 중일 때만 온라인 표시 */}
                  {chat.status === 'chatting' && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                {/* 정보 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-800">
                        {chat.userName}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {chat.age}세 · {chat.location}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">{chat.time}</span>
                  </div>

                  {/* 마지막 메시지 또는 상태 메시지 */}
                  <div className="flex items-center justify-between">
                    {statusMsg ? (
                      <div className={`flex items-center gap-1 ${statusMsg.color} text-sm`}>
                        <span>{statusMsg.icon}</span>
                        <span className="font-medium">{statusMsg.text}</span>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600 line-clamp-1 flex-1">
                        {chat.lastMessage}
                      </p>
                    )}
                    {chat.status === 'chatting' && chat.unreadCount > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full font-medium">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* 빈 상태 */}
        {chatList.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-6xl mb-4">💬</span>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              아직 대화가 없어요
            </h3>
            <p className="text-gray-500 text-sm">
              매칭 페이지에서 마음에 드는 이성에게
              <br />
              쪽지를 보내보세요!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
