import { useLocation, useNavigate } from 'react-router-dom'

export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => pathname === path
  const activeClass = (path) => (isActive(path) ? 'app-btn app-btn--active' : 'app-btn app-btn--ghost')

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__brand">SkyproWallet</div>
        <nav className="app-header__nav" aria-label="Навигация">
          <button type="button" className={activeClass('/expenses')} onClick={() => navigate('/expenses')}>
            Мои расходы
          </button>
          <button type="button" className={activeClass('/analysis')} onClick={() => navigate('/analysis')}>
            Анализ расходов
          </button>
          <button type="button" className="app-btn app-btn--ghost" onClick={() => navigate('/login')}>
            Выйти
          </button>
        </nav>
      </div>
    </header>
  )
}

