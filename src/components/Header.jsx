import { useLocation, useNavigate } from 'react-router-dom'
import { clearToken } from '../utils/authStorage.js'

export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => pathname === path
  const navClass = (path) => (isActive(path) ? 'app-header__link app-header__link--active' : 'app-header__link')

  const handleLogout = () => {
    clearToken()
    navigate('/login')
  }

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__brand">SkyproWallet</div>
        <nav className="app-header__nav" aria-label="Навигация">
          <button type="button" className={navClass('/expenses')} onClick={() => navigate('/expenses')}>
            Мои расходы
          </button>
          <button type="button" className={navClass('/analysis')} onClick={() => navigate('/analysis')}>
            Анализ расходов
          </button>
          <button type="button" className="app-header__link" onClick={handleLogout}>
            Выйти
          </button>
        </nav>
      </div>
    </header>
  )
}

