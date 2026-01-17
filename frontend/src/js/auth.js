import { api } from './api.js';
import { setNavUser } from './ui.js';

export async function initAuth() {
  try {
    const { user } = await api.me();
    setNavUser(user);
  } catch {
    setNavUser(null);
  }
}

export function bindAuthForms() {
  const registerForm = document.querySelector('[data-register-form]');
  const loginForm = document.querySelector('[data-login-form]');
  const logoutButton = document.querySelector('[data-logout]');

  if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(registerForm);
      const payload = {
        displayName: formData.get('displayName'),
        email: formData.get('email'),
        password: formData.get('password')
      };
      await api.register(payload);
      window.location.href = './orders.html';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(loginForm);
      const payload = {
        email: formData.get('email'),
        password: formData.get('password')
      };
      await api.login(payload);
      window.location.href = './orders.html';
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
      await api.logout();
      window.location.href = './index.html';
    });
  }
}
