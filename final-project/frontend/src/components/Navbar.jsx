import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className={pathname === '/' ? 'active' : ''}>Etusivu</Link>
        </li>
        <li>
          <Link to="/form" className={pathname === '/form' ? 'active' : ''}>Yhteydenotto</Link>
        </li>
        <li>
          <Link to="/reservations" className={pathname === '/reservations' ? 'active' : ''}>Varaukset</Link>
        </li>
      </ul>
    </nav>
  )
}



