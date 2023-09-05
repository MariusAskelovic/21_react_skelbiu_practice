import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../store/AuthProvider';

function OneLink(props) {
  return (
    <NavLink className='text-lg px-3 py-2 hover:bg-slate-200' to={props.to}>
      {props.title}
    </NavLink>
  );
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
        <OneLink to='/Ads' title='Ads' />
        {ctx.isUserLoggedIn && (
          <>
            <OneLink to='/my-ads' title='My Ads' />
            <OneLink to='/create-ad' title='Create Ads' />
          </>
        )}
        <OneLink to='/login' title='Login' />
      </nav>
    </header>
  );
}
