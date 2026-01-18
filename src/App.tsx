import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MobileLayout from './components/Layout/MobileLayout';
import BottomNav from './components/Navigation/BottomNav';
import BookRegister from './pages/BookRegister/BookRegister';
import Matching from './pages/Matching/Matching';
import Chat from './pages/Chat/Chat';
import ProfileDetail from './pages/Profile/ProfileDetail';

function App() {
  return (
    <BrowserRouter>
      <MobileLayout>
        <Routes>
          <Route path="/" element={<Matching />} />
          <Route path="/matching" element={<Matching />} />
          <Route path="/book-register" element={<BookRegister />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile/:userId" element={<ProfileDetail />} />
        </Routes>
        <BottomNav />
      </MobileLayout>
    </BrowserRouter>
  );
}

export default App;
