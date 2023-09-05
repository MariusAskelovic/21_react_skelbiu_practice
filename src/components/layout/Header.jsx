import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../store/AuthProvider';
import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';

function OneLink(props) {
  return (
    <NavLink
      onClick={props.onClick}
      className='text-lg px-3 py-2 hover:bg-slate-200'
      to={props.to}
    >
      {props.title}
    </NavLink>
  );
}

function logoutFire() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      toast.success('Logout successful');
    })
    .catch((error) => {
      // An error happened.
      toast.error('Error while logouting');
    });
}

export default function Header() {
  const ctx = useAuth();
  console.log('ctx ===', ctx);
  return (
    <header className='container flex justify-between items-center'>
      <Link className='text-2xl' to={'/'}>
        Our<strong>Ads</strong>
      </Link>
      <nav>
        <OneLink to='/' title='Ads' />
        {ctx.isUserLoggedIn && (
          <>
            <OneLink to='/my-ads' title='My Ads' />
            <OneLink to='/create-ad' title='Create Ads' />
          </>
        )}
        {!ctx.isUserLoggedIn && <OneLink to='/login' title='Login' />}
        {ctx.isUserLoggedIn && (
          <OneLink onClick={logoutFire} to='/login' title='Logout' />
        )}
        <p className='inline-block uppercase text-xs py-1 px-2 bg-slate-100 rounded-md'>
          {ctx.email}
        </p>
      </nav>
    </header>
  );
}
