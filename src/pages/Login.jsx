import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="page auth">
      <h1 className="section-title">Вход</h1>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/main')
        }}
      >
        <div className="field">
          <label htmlFor="email">Эл. почта</label>
          <input id="email" type="email" name="email" placeholder="name@example.com" />
        </div>

        <div className="field">
          <label htmlFor="password">Пароль</label>
          <input id="password" type="password" name="password" placeholder="••••••••" />
        </div>

        <div className="form__actions">
          <button className="app-btn" type="submit">
            Войти
          </button>
          <button className="app-btn app-btn--ghost" type="button" onClick={() => navigate('/register')}>
            Регистрация
          </button>
        </div>
      </form>

      <p style={{ marginTop: 12 }}>
        Нет аккаунта? <Link to="/register">Создать</Link>
      </p>
    </div>
  )
}

