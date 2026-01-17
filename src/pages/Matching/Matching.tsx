import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext, type Match, type Book } from '../../contexts/AppContext';
import { mockUsers } from '../../data/mockData';

// 초기 매칭 생성 함수 (컴포넌트 외부)
function createInitialMatches(userBooks: Book[]): Match[] {
  if (userBooks.length === 0) {
    return [];
  }

  const shuffled = [...mockUsers].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 5);
  const timestamp = Date.now();
  
  return selected.map((user) => {
    const commonBooks = user.books.filter((book) =>
      userBooks.some((ub) => ub.id === book.id)
    );
    const matchScore = commonBooks.length > 0 
      ? Math.round((commonBooks.length / userBooks.length) * 100)
      : Math.floor(Math.random() * 30) + 20;

    return {
      id: `match-${user.id}-${timestamp}`,
      user,
      matchScore,
      commonBooks,
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}

function Matching() {
  const navigate = useNavigate();
  const { userBooks, setMatches } = useAppContext();
  
  // 초기값을 함수로 전달하여 한 번만 실행되도록 함
  const [currentMatches, setCurrentMatches] = useState<Match[]>(() => {
    if (userBooks.length === 0) {
      return [];
    }
    const initialMatches = createInitialMatches(userBooks);
    setMatches(initialMatches);
    return initialMatches;
  });

  // 새로운 매칭 생성 함수
  const generateNewMatches = useCallback(() => {
    const newMatches = createInitialMatches(userBooks);
    setCurrentMatches(newMatches);
    setMatches(newMatches);
  }, [userBooks, setMatches]);

  // 프로필 상세 페이지로 이동
  const handleProfileClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  // 책을 등록하지 않은 경우
  if (userBooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="text-center">
          <span className="text-6xl mb-4 block">📚</span>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            먼저 책을 등록해주세요
          </h2>
          <p className="text-gray-500 mb-6">
            읽은 책을 등록하면 매칭을 시작할 수 있어요
          </p>
          <button
            onClick={() => navigate('/book-register')}
            className="bg-gradient-to-r from-pink-500 to-rose-400 text-white px-8 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-500 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            책 등록하러 가기
          </button>
        </div>
      </div>
    );
  }

  // 매칭 생성 중
  if (currentMatches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <p className="text-gray-500 mb-4">매칭을 생성하는 중...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-20">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-400 text-white p-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl font-bold mb-2">💕 오늘의 매칭</h1>
        <p className="text-pink-50">비슷한 책을 읽은 이성을 만나보세요</p>
      </div>

      {/* 매칭 목록 - 컴팩트한 카드 */}
      <div className="p-4 space-y-3 mt-4">
        {currentMatches.map((match, index) => (
          <div
            key={match.id}
            onClick={() => handleProfileClick(match.user.id)}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer border border-gray-100"
          >
            <div className="flex items-center p-4 gap-4">
              {/* 프로필 이미지 - 왼쪽 작은 원형 */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-3xl">
                    {index % 4 === 0 ? '👩' : index % 4 === 1 ? '👩‍🦰' : index % 4 === 2 ? '👩‍🦱' : '👱‍♀️'}
                  </span>
                </div>
              </div>

              {/* 프로필 정보 */}
              <div className="flex-1 min-w-0">
                {/* 이름, 나이, 지역 */}
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-lg font-bold text-gray-800">
                    {match.user.name}
                  </h2>
                  <span className="text-gray-500 text-sm">
                    {match.user.age}세
                  </span>
                  {match.user.location && (
                    <>
                      <span className="text-gray-300">·</span>
                      <span className="text-gray-500 text-sm">
                        {match.user.location}
                      </span>
                    </>
                  )}
                   
                </div>

                {/* 읽은 책 목록 */}
                <div className="flex flex-wrap gap-1.5">
                  {match.user.books.slice(0, 3).map((book) => (
                    <span
                      key={book.id}
                      className="text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-full border border-gray-200"
                    >
                      {book.title}
                    </span>
                  ))}
                  {match.user.books.length > 3 && (
                    <span className="text-xs text-gray-400 px-2 py-1">
                      +{match.user.books.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 새 매칭 버튼 */}
        <button
          onClick={generateNewMatches}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3.5 rounded-2xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-4"
        >
          <span className="text-xl">🔄</span>
          새로운 매칭 보기
        </button>
      </div>
    </div>
  );
}

export default Matching;
