import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const navigate = useNavigate()

  return (
    <div className="page auth">
      <h1 className="section-title">Регистрация</h1>
      <form
        className="form"
        onSubmit={(e) => {
          // По заданию кнопка "Войти" возвращает на экран входа.
          e.preventDefault()
        }}
      >
        <div className="field">
          <label htmlFor="name">Имя</label>
          <input id="name" type="text" name="name" placeholder="Иван" />
        </div>

        <div className="field">
          <label htmlFor="email">Эл. почта</label>
          <input id="email" type="email" name="email" placeholder="name@example.com" />
        </div>

        <div className="field">
          <label htmlFor="password">Пароль</label>
          <input id="password" type="password" name="password" placeholder="••••••••" />
        </div>

        <div className="form__actions">
          <button className="app-btn app-btn--ghost" type="button" onClick={() => navigate('/login')}>
            Войти
          </button>
        </div>
      </form>
    </div>
  )
}

