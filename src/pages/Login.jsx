import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/authApi.js'
import { setToken } from '../utils/authStorage.js'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [requestError, setRequestError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const nextErrors = {}

    if (!form.email.trim()) {
      nextErrors.email = 'Введите логин или email'
    } else if (form.email.trim().length < 3) {
      nextErrors.email = 'Логин должен быть не короче 3 символов'
    }

    if (!form.password) {
      nextErrors.password = 'Введите пароль'
    } else if (form.password.length < 8) {
      nextErrors.password = 'Пароль должен быть не менее 8 символов'
    }

    return nextErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setRequestError('')

    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    try {
      setIsSubmitting(true)
      const result = await login({
        login: form.email.trim(),
        password: form.password,
      })

      if (!result?.token) {
        throw new Error('Токен не получен')
      }

      setToken(result.token)
      navigate('/main')
    } catch (error) {
      setRequestError(error.message || 'Не удалось выполнить вход')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page auth">
      <h1 className="section-title">Вход</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Логин или эл. почта</label>
          <input
            id="email"
            type="text"
            name="email"
            value={form.email}
            placeholder="admin или name@example.com"
            autoComplete="username"
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          />
          {errors.email ? <div className="field-error">{errors.email}</div> : null}
        </div>

        <div className="field">
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            placeholder="••••••••"
            autoComplete="current-password"
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          />
          {errors.password ? <div className="field-error">{errors.password}</div> : null}
        </div>

        {requestError ? <div className="request-error">{requestError}</div> : null}

        <div className="form__actions">
          <button className="app-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Входим...' : 'Войти'}
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

