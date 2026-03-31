import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../api/authApi.js'
import { setToken } from '../utils/authStorage.js'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [requestError, setRequestError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const nextErrors = {}

    if (!form.name.trim()) {
      nextErrors.name = 'Введите имя'
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Введите email'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = 'Некорректный формат email'
    }

    if (!form.password) {
      nextErrors.password = 'Введите пароль'
    } else if (form.password.length < 8 || !/[A-Z]/.test(form.password) || !/\d/.test(form.password)) {
      nextErrors.password = 'Пароль: минимум 8 символов, 1 цифра и 1 заглавная буква'
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
      const result = await register({
        name: form.name.trim(),
        login: form.email.trim(),
        password: form.password,
      })

      if (!result?.token) {
        throw new Error('Токен не получен')
      }

      setToken(result.token)
      navigate('/main')
    } catch (error) {
      setRequestError(error.message || 'Не удалось выполнить регистрацию')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page auth">
      <h1 className="section-title">Регистрация</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Имя</label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            placeholder="Иван"
            autoComplete="name"
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          />
          {errors.name ? <div className="field-error">{errors.name}</div> : null}
        </div>

        <div className="field">
          <label htmlFor="email">Эл. почта</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            placeholder="name@example.com"
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
            autoComplete="new-password"
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          />
          {errors.password ? <div className="field-error">{errors.password}</div> : null}
        </div>

        <div className="form__actions">
          <button className="app-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Регистрируем...' : 'Зарегистрироваться'}
          </button>
          <button className="app-btn app-btn--ghost" type="button" onClick={() => navigate('/login')}>
            Войти
          </button>
        </div>
        {requestError ? <div className="request-error">{requestError}</div> : null}
      </form>
    </div>
  )
}

