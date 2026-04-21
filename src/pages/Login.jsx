import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/authApi.js'
import { setToken } from '../utils/authStorage.js'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [requestError, setRequestError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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
    setIsSubmitted(true)

    const nextErrors = validate()
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
      navigate('/expenses')
    } catch (error) {
      setRequestError(error.message || 'Не удалось выполнить вход')
    } finally {
      setIsSubmitting(false)
    }
  }

  const liveErrors = validate()
  const hasErrors = Object.keys(liveErrors).length > 0
  const canSubmit = !hasErrors && !isSubmitting
  const showValidationError = isSubmitted && hasErrors

  const emailState = form.email.length === 0 ? 'default' : liveErrors.email ? 'invalid' : 'valid'
  const passwordState = form.password.length === 0 ? 'default' : liveErrors.password ? 'invalid' : 'valid'

  return (
    <div className="page auth">
      <div className="auth-card">
        <h1 className="section-title auth-title">Вход</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <div className="auth-input-wrap">
              <input
                id="email"
                type="text"
                name="email"
                className={emailState === 'valid' ? 'auth-input auth-input--valid' : emailState === 'invalid' ? 'auth-input auth-input--invalid' : 'auth-input'}
                value={form.email}
                placeholder="Эл. почта"
                autoComplete="username"
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              />
              {emailState === 'invalid' ? <span className="auth-input-star">*</span> : null}
            </div>
          </div>

          <div className="field">
            <div className="auth-input-wrap">
              <input
                id="password"
                type="password"
                name="password"
                className={passwordState === 'valid' ? 'auth-input auth-input--valid' : passwordState === 'invalid' ? 'auth-input auth-input--invalid' : 'auth-input'}
                value={form.password}
                placeholder="Пароль"
                autoComplete="current-password"
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              />
              {passwordState === 'invalid' ? <span className="auth-input-star">*</span> : null}
            </div>
          </div>

          {showValidationError ? (
            <div className="request-error">
              Упс! Введенные вами данные некорректны.
              <br />
              Введите данные корректно и повторите попытку.
            </div>
          ) : null}
          {requestError ? <div className="request-error">{requestError}</div> : null}

          <div className="form__actions">
            <button className="auth-submit-btn" type="submit" disabled={!canSubmit}>
              {isSubmitting ? 'Входим...' : 'Войти'}
            </button>
          </div>
        </form>

        <p className="auth-footer-text">
          Нужно зарегистрироваться?
          <br />
          <Link to="/register">Регистрируйтесь здесь</Link>
        </p>
      </div>
    </div>
  )
}

