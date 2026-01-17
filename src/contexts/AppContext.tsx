import { createContext, useContext, useState, type ReactNode } from 'react';

// 타입 정의
export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
}

export interface BookReview {
  bookId: string;
  review: string; // 책에 대한 평 (최대 500자)
}

export interface User {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  location?: string; // 거주지역
  books: Book[];
  bookReviews?: BookReview[]; // 책 평가
  profileImage?: string;
}

export interface Match {
  id: string;
  user: User;
  matchScore: number;
  commonBooks: Book[];
}

export interface Message {
  id: string;
  fromUserId: string;
  toUserId: string;
  content: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  userBooks: Book[];
  setUserBooks: (books: Book[]) => void;
  matches: Match[];
  setMatches: (matches: Match[]) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userBooks, setUserBooks] = useState<Book[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userBooks,
        setUserBooks,
        matches,
        setMatches,
        messages,
        setMessages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
