const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const apiUrl = (path) => `${API_URL}${path}`

export const authFetch = (path, options = {}) => {
  const token = localStorage.getItem('token')
  const headers = new Headers(options.headers || {})
  if (token) headers.set('Authorization', `Bearer ${token}`)
  return fetch(apiUrl(path), { ...options, headers })
}