import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MyAccountPage from './pages/MyAccountPage';
import Header from './components/layout/Header';

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/my-adds' element={<MyAccountPage />} />
      </Routes>
    </div>
  );
}
