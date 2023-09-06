import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MyAccountPage from './pages/MyAccountPage';
import Header from './components/layout/Header';
import CreateAdd from './pages/CreateAdd';
import LoginPage from './pages/LoginPage';
import { useAuth } from './store/AuthProvider';
import { Toaster } from 'react-hot-toast';
import SingleAd from './pages/SingleAd';

export default function App() {
  const ctx = useAuth();
  ctx.isUserLoggedIn;
  return (
    <div>
      <Toaster />
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/my-ads'
          element={
            ctx.isUserLoggedIn ? <MyAccountPage /> : <Navigate to={'/login'} />
          }
        />
        <Route path='/my-ads/:adID' element={<SingleAd />} />
        <Route
          path='/create-ad'
          element={
            ctx.isUserLoggedIn ? <CreateAdd /> : <Navigate to={'/login'} />
          }
        />
        {!ctx.isUserLoggedIn && <Route path='/login' element={<LoginPage />} />}
        <Route
          path='*'
          element={
            <div>
              <h1
                className='text-9xl ml-auto
              mr-auto text-red-800'
              >
                404
              </h1>
              <p className='uppercase'>Page not found</p>
            </div>
          }
        />
      </Routes>
    </div>
  );
}
