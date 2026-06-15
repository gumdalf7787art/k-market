import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import MarketDetailPage from './pages/MarketDetailPage';
import MarketFloorPage from './pages/MarketFloorPage';
import MarketStoresPage from './pages/MarketStoresPage';
import StoreDetailPage from './pages/StoreDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import MenuPage from './pages/MenuPage';
import BoardPage from './pages/BoardPage';
import NoticePage from './pages/NoticePage';
import PostDetailPage from './pages/PostDetailPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="market/:id" element={<MarketDetailPage />} />
          <Route path="market/:id/floor" element={<MarketFloorPage />} />
          <Route path="market/:id/stores" element={<MarketStoresPage />} />
          <Route path="market/:id/store/:storeName" element={<StoreDetailPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="board" element={<BoardPage />} />
          <Route path="notice" element={<NoticePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="post/:id" element={<PostDetailPage />} />
          <Route path="notice/:id" element={<PostDetailPage />} />
          {/* 다른 페이지 라우트들을 여기에 추가할 수 있습니다 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
