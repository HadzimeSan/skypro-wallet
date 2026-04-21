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
  const [requestError, setRequestError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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
    setIsSubmitted(true)

    const nextErrors = validate()
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
      navigate('/expenses')
    } catch (error) {
      setRequestError(error.message || 'Не удалось выполнить регистрацию')
    } finally {
      setIsSubmitting(false)
    }
  }

  const liveErrors = validate()
  const hasErrors = Object.keys(liveErrors).length > 0
  const canSubmit = !hasErrors && !isSubmitting
  const showValidationError = isSubmitted && hasErrors

  const nameState = form.name.length === 0 ? 'default' : liveErrors.name ? 'invalid' : 'valid'
  const emailState = form.email.length === 0 ? 'default' : liveErrors.email ? 'invalid' : 'valid'
  const passwordState = form.password.length === 0 ? 'default' : liveErrors.password ? 'invalid' : 'valid'

  return (
    <div className="page auth">
      <div className="auth-card">
        <h1 className="section-title auth-title">Регистрация</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <div className="auth-input-wrap">
              <input
                id="name"
                type="text"
                name="name"
                className={nameState === 'valid' ? 'auth-input auth-input--valid' : nameState === 'invalid' ? 'auth-input auth-input--invalid' : 'auth-input'}
                value={form.name}
                placeholder="Имя"
                autoComplete="name"
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              />
              {nameState === 'invalid' ? <span className="auth-input-star">*</span> : null}
            </div>
          </div>

          <div className="field">
            <div className="auth-input-wrap">
              <input
                id="email"
                type="email"
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
                autoComplete="new-password"
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
              {isSubmitting ? 'Регистрируем...' : 'Зарегистрироваться'}
            </button>
          </div>
        </form>

        <p className="auth-footer-text">
          Уже есть аккаунт?
          <br />
          <button className="auth-link-btn" type="button" onClick={() => navigate('/login')}>
            Войдите здесь
          </button>
        </p>
      </div>
    </div>
  )
}

