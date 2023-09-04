import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className='container flex justify-between items-center'>
      <Link className='text-2xl' to={'/'}>
        Our<strong>Ads</strong>
      </Link>
      <nav>
        <NavLink className='text-lg px-3 py-2 hover:bg-slate-200' to={'/'}>
          Ads
        </NavLink>
        <NavLink
          className='text-lg px-3 py-2 hover:bg-slate-200'
          to={'/my-ads'}
        >
          My ads
        </NavLink>
        <NavLink
          className='text-lg px-3 py-2 hover:bg-slate-200'
          to={'/create-ad'}
        >
          Create an Ad
        </NavLink>
        <NavLink className='text-lg px-3 py-2 hover:bg-slate-200' to={'/login'}>
          Login
        </NavLink>
      </nav>
    </header>
  );
}
