import { useParams, useNavigate } from 'react-router-dom';
import { mockUsers } from '../../data/mockData';

function ProfileDetail() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  // userId로 사용자 찾기
  const user = mockUsers.find((u) => u.id === userId);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <p className="text-gray-500">사용자를 찾을 수 없습니다.</p>
        <button
          onClick={() => navigate('/matching')}
          className="mt-4 text-pink-500"
        >
          매칭으로 돌아가기
        </button>
      </div>
    );
  }

  // 책 리뷰 찾기 함수
  const getReview = (bookId: string) => {
    return user.bookReviews?.find((review) => review.bookId === bookId)?.review || '아직 리뷰를 작성하지 않았습니다.';
  };

  return (
    <div className="flex flex-col pb-20">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white p-6 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-4 text-white text-2xl"
        >
          ←
        </button>
        <div className="text-center mt-8">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
            <span className="text-5xl">👩</span>
          </div>
          <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
          <p className="text-orange-50">
            {user.age}세 · {user.location}
          </p>
        </div>
      </div>

      {/* 읽은 책과 평 */}
      <div className="p-4 space-y-4 mt-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📚 읽은 책</h2>
        
        {user.books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
          >
            {/* 책 정보 */}
            <div className="mb-3">
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {book.title}
              </h3>
              <p className="text-sm text-gray-500">
                {book.author} · {book.genre}
              </p>
            </div>

            {/* 책 평 */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                {getReview(book.id)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 쪽지 보내기 버튼 */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 pb-2">
        <button
          onClick={() => {
            alert(`${user.name}님에게 쪽지를 보냈습니다! 💌`);
          }}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white py-4 rounded-2xl font-bold hover:from-orange-600 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          💌 쪽지 보내기
        </button>
      </div>
    </div>
  );
}

export default ProfileDetail;
