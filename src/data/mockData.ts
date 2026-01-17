import type { Book, User, Match } from '../contexts/AppContext';

// Mock 책 데이터
export const mockBooks: Book[] = [
  { id: '1', title: '1984', author: '조지 오웰', genre: '소설' },
  { id: '2', title: '어린왕자', author: '생텍쥐페리', genre: '소설' },
  { id: '3', title: '코스모스', author: '칼 세이건', genre: '과학' },
  { id: '4', title: '사피엔스', author: '유발 하라리', genre: '인문' },
  { id: '5', title: '총, 균, 쇠', author: '재레드 다이아몬드', genre: '인문' },
  { id: '6', title: '백년의 고독', author: '가브리엘 가르시아 마르케스', genre: '소설' },
  { id: '7', title: '데미안', author: '헤르만 헤세', genre: '소설' },
  { id: '8', title: '이기적 유전자', author: '리처드 도킨스', genre: '과학' },
  { id: '9', title: '노르웨이의 숲', author: '무라카미 하루키', genre: '소설' },
  { id: '10', title: '호밀밭의 파수꾼', author: 'J.D. 샐린저', genre: '소설' },
];

// Mock 사용자 데이터
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: '김지연',
    age: 28,
    gender: 'female',
    location: '서울',
    books: [mockBooks[0], mockBooks[1], mockBooks[3]],
    bookReviews: [
      {
        bookId: '1',
        review: '디스토피아 사회를 그린 조지 오웰의 걸작입니다. 빅브라더의 감시 사회가 현대 사회와 너무 닮아있어서 소름이 돋았어요. 개인의 자유와 프라이버시에 대해 깊이 생각해보게 되는 책입니다.',
      },
      {
        bookId: '2',
        review: '어른이 되어 다시 읽으니 어릴 때와는 다른 감동이 있네요. "가장 중요한 것은 눈에 보이지 않아"라는 구절이 계속 마음에 남습니다.',
      },
      {
        bookId: '4',
        review: '인류의 역사를 새로운 시각으로 바라볼 수 있게 해준 책입니다. 농업혁명부터 과학혁명까지의 이야기가 정말 흥미진진했어요!',
      },
    ],
  },
  {
    id: 'user2',
    name: '이서현',
    age: 26,
    gender: 'female',
    location: '경기',
    books: [mockBooks[2], mockBooks[4], mockBooks[7]],
    bookReviews: [
      {
        bookId: '3',
        review: '우주의 광대함과 인간의 작음을 느끼게 해주는 책입니다. 칼 세이건의 시적인 문체로 과학이 이렇게 아름다울 수 있다는 걸 알게 되었어요.',
      },
      {
        bookId: '5',
        review: '왜 어떤 문명은 발전하고 어떤 문명은 쇠퇴했는지를 지리적 환경으로 설명한 책입니다. 역사를 바라보는 새로운 관점을 제공해줍니다.',
      },
      {
        bookId: '8',
        review: '유전자의 관점에서 본 진화론이 신선했습니다. 우리는 유전자의 생존 기계일 뿐이라는 개념이 충격적이면서도 설득력 있었어요.',
      },
    ],
  },
  {
    id: 'user3',
    name: '박민지',
    age: 29,
    gender: 'female',
    location: '인천',
    books: [mockBooks[1], mockBooks[6], mockBooks[8]],
    bookReviews: [
      {
        bookId: '2',
        review: '영원한 고전이에요. 사막의 여우와 장미의 이야기가 사랑과 책임에 대해 많은 걸 생각하게 합니다.',
      },
      {
        bookId: '7',
        review: '성장통을 겪는 청소년 싱클레어의 이야기가 공감이 많이 갔어요. "새는 알에서 나오려고 투쟁한다"는 문구가 인상 깊었습니다.',
      },
      {
        bookId: '9',
        review: '무라카미 하루키의 감성이 물씬 느껴지는 소설입니다. 상실과 그리움, 그리고 성장에 대한 이야기가 아름답게 그려져 있어요.',
      },
    ],
  },
  {
    id: 'user4',
    name: '최유진',
    age: 27,
    gender: 'female',
    location: '서울',
    books: [mockBooks[0], mockBooks[3], mockBooks[9]],
    bookReviews: [
      {
        bookId: '1',
        review: '현대 사회의 감시와 통제에 대한 경고서 같은 책입니다. 읽으면 읽을수록 무서워지는 소설이에요.',
      },
      {
        bookId: '4',
        review: '인간이란 무엇인가에 대한 근본적인 질문을 던지는 책입니다. 두껍지만 술술 읽혀요!',
      },
      {
        bookId: '10',
        review: '청소년의 방황과 고뇌를 그린 소설입니다. 홀든의 이야기에서 제 모습을 발견했어요.',
      },
    ],
  },
  {
    id: 'user5',
    name: '정수아',
    age: 25,
    gender: 'female',
    location: '부산',
    books: [mockBooks[5], mockBooks[6], mockBooks[8]],
    bookReviews: [
      {
        bookId: '6',
        review: '마술적 리얼리즘의 정수를 보여주는 소설입니다. 부엔디아 가문의 백년에 걸친 이야기가 환상적이면서도 현실적이에요.',
      },
      {
        bookId: '7',
        review: '자아를 찾아가는 여정이 아름답게 그려진 소설입니다. 헤르만 헤세의 철학이 잘 녹아있어요.',
      },
      {
        bookId: '9',
        review: '사랑과 상실, 청춘의 아픔을 섬세하게 그려낸 작품입니다. 무라카미 하루키의 대표작이라고 생각해요.',
      },
    ],
  },
];

// Mock 매칭 데이터 생성 함수
export function generateMockMatches(userBooks: Book[]): Match[] {
  return mockUsers.map((user) => {
    const commonBooks = user.books.filter((book) =>
      userBooks.some((ub) => ub.id === book.id)
    );
    const matchScore = Math.round((commonBooks.length / userBooks.length) * 100);

    return {
      id: `match-${user.id}`,
      user,
      matchScore,
      commonBooks,
    };
  })
  .filter((match) => match.matchScore > 0)
  .sort((a, b) => b.matchScore - a.matchScore);
}
