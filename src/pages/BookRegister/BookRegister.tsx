import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext, type Book } from '../../contexts/AppContext';
import { mockBooks } from '../../data/mockData';

function BookRegister() {
  const navigate = useNavigate();
  const { setUserBooks } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);

  const handleAddBook = (book: Book) => {
    if (!selectedBooks.find((b) => b.id === book.id)) {
      setSelectedBooks([...selectedBooks, book]);
    }
  };

  const handleRemoveBook = (bookId: string) => {
    setSelectedBooks(selectedBooks.filter((b) => b.id !== bookId));
  };

  const handleSubmit = () => {
    if (selectedBooks.length > 0) {
      // Context에 선택한 책 저장
      setUserBooks(selectedBooks);
      // 책 등록 완료 후 매칭 페이지로 이동
      navigate('/matching');
    }
  };

  return (
    <div className="flex flex-col h-screen pb-16">
      {/* 헤더 */}
      <div className="bg-pink-500 text-white p-4">
        <h1 className="text-xl font-bold">읽은 책 등록</h1>
        <p className="text-sm mt-1">최소 1권 이상 등록해주세요</p>
      </div>

      {/* 검색 영역 */}
      <div className="p-4 bg-white border-b">
        <input
          type="text"
          placeholder="책 제목을 검색하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
        />
      </div>

      {/* 검색 결과 */}
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="font-semibold text-gray-700 mb-3">검색 결과</h2>
        <div className="space-y-2">
          {mockBooks
            .filter((book) =>
              searchQuery === '' ||
              book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              book.author.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((book) => (
              <div
                key={book.id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div>
                  <h3 className="font-semibold">{book.title}</h3>
                  <p className="text-sm text-gray-600">
                    {book.author} · {book.genre}
                  </p>
                </div>
                <button
                  onClick={() => handleAddBook(book)}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg text-sm hover:bg-pink-600 transition"
                  disabled={selectedBooks.some((b) => b.id === book.id)}
                >
                  {selectedBooks.some((b) => b.id === book.id)
                    ? '추가됨'
                    : '추가'}
                </button>
              </div>
            ))}
        </div>

        {/* 선택된 책 */}
        {selectedBooks.length > 0 && (
          <div className="mt-6">
            <h2 className="font-semibold text-gray-700 mb-3">
              선택한 책 ({selectedBooks.length})
            </h2>
            <div className="space-y-2">
              {selectedBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex justify-between items-center p-4 bg-pink-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold text-pink-700">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600">{book.author}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveBook(book.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="p-4 bg-white border-t">
        <button
          onClick={handleSubmit}
          disabled={selectedBooks.length === 0}
          className={`w-full py-4 rounded-lg font-semibold transition ${
            selectedBooks.length > 0
              ? 'bg-pink-500 text-white hover:bg-pink-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {selectedBooks.length > 0
            ? `${selectedBooks.length}권 등록하고 매칭 시작`
            : '책을 선택해주세요'}
        </button>
      </div>
    </div>
  );
}

export default BookRegister;
