'use client';

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function isAuthenticated() {
  return !!getToken();
}

export function logout() {
  localStorage.removeItem('token');
  window.location.href = '/login';
}

// (Opcional) Se quiser decodificar o token JWT
export function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}


// Arquivo de funções utilitárias como pegar token do localStorage, checar login, etc.