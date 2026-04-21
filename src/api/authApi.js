import axios from 'axios'

// Для этого курса бекенд расположен на wedev-api.sky.pro.
// Можно переопределить через VITE_API_BASE_URL в .env.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://wedev-api.sky.pro/api'

const client = axios.create({
  baseURL: API_BASE_URL,
})

function normalizeError(error) {
  const data = error?.response?.data
  const message =
    (typeof data === 'object' && (data.error || data.message)) ||
    (typeof data === 'string' && data) ||
    error?.message ||
    'Ошибка запроса'
  return new Error(message)
}

export async function register(payload) {
  try {
    // API ожидает:
    // { login, name, password }
    // API проекта ожидает строку JSON (сервер парсит req.body через JSON.parse).
    const { data } = await client.post('/user', JSON.stringify(payload), {
      headers: { 'Content-Type': 'text/plain' },
    })
    const user = data?.user ?? null
    return { user, token: user?.token ?? data?.token }
  } catch (error) {
    throw normalizeError(error)
  }
}

export async function login(payload) {
  try {
    // API ожидает:
    // { login, password }
    const { data } = await client.post('/user/login', JSON.stringify(payload), {
      headers: { 'Content-Type': 'text/plain' },
    })
    const user = data?.user ?? null
    return { user, token: user?.token ?? data?.token }
  } catch (error) {
    throw normalizeError(error)
  }
}

