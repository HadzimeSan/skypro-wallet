import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const client = axios.create({
  baseURL: API_BASE_URL,
})

function normalizeError(error) {
  const message = error?.response?.data?.message || error?.message || 'Ошибка запроса'
  return new Error(message)
}

// Fallback для локальной разработки, когда API URL не задан.
async function mockRegister({ name, email, password }) {
  const fakeToken = `mock-${btoa(`${email}:${password}`)}`
  return {
    user: { name, email },
    token: fakeToken,
  }
}

async function mockLogin({ email, password }) {
  const fakeToken = `mock-${btoa(`${email}:${password}`)}`
  return {
    user: { email },
    token: fakeToken,
  }
}

export async function register(payload) {
  if (!API_BASE_URL) {
    return mockRegister(payload)
  }

  try {
    const { data } = await client.post('/api/auth/register', payload)
    return {
      user: data?.user ?? null,
      token: data?.token,
    }
  } catch (error) {
    throw normalizeError(error)
  }
}

export async function login(payload) {
  if (!API_BASE_URL) {
    return mockLogin(payload)
  }

  try {
    const { data } = await client.post('/api/auth/login', payload)
    return {
      user: data?.user ?? null,
      token: data?.token,
    }
  } catch (error) {
    throw normalizeError(error)
  }
}

