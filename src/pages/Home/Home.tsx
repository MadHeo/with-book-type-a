import {  useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-pink-50 to-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">📚 With Book</h1>
        <p className="text-gray-600 text-lg">책으로 시작하는 인연</p>
      </div>

      <div className="w-full space-y-4">
        <button
          onClick={() => navigate('/book-register')}
          className="w-full bg-pink-500 text-white py-4 px-6 rounded-lg text-center font-semibold hover:bg-pink-600 transition"
        >
          시작하기
        </button>

        <div className="text-center text-sm text-gray-500">
          <p>읽은 책을 등록하고</p>
          <p>비슷한 취향의 이성을 만나보세요</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
