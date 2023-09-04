import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MyAccountPage from './pages/MyAccountPage';
import Header from './components/layout/Header';
import CreateAdd from './pages/CreateAdd';

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/my-ads' element={<MyAccountPage />} />
        <Route path='/create-ad' element={<CreateAdd />} />
      </Routes>
    </div>
  );
}
