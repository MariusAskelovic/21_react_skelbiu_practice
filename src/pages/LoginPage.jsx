import GoogleLogin from '../components/auth/GoogleLogin';
import Login from '../components/auth/Login';

export default function LoginPage() {
  return (
    <div className='container flex items-center justify-center gap-8 mt-10'>
      <Login />
      <GoogleLogin />
    </div>
  );
}
