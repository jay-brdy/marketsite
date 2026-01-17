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

export async function loadProfileView() {
  const profileSection = document.querySelector('[data-profile]');
  const authSection = document.querySelector('[data-auth-forms]');
  const profileForm = document.querySelector('[data-profile-form]');
  const profileName = document.querySelector('[data-profile-name]');
  const profileEmail = document.querySelector('[data-profile-email]');
  const profileRole = document.querySelector('[data-profile-role]');

  if (!profileSection || !profileForm) return;

  try {
    const { user } = await api.me();
    if (!user) return;

    if (authSection) authSection.style.display = 'none';
    profileSection.style.display = 'block';

    if (profileName) profileName.textContent = user.displayName || '';
    if (profileEmail) profileEmail.textContent = user.email || '';
    if (profileRole) profileRole.textContent = user.role || '';

    const displayNameInput = profileForm.querySelector('[name="displayName"]');
    const birthdayInput = profileForm.querySelector('[name="birthday"]');
    if (displayNameInput) displayNameInput.value = user.displayName || '';
    if (birthdayInput) birthdayInput.value = user.birthday ? user.birthday.slice(0, 10) : '';
  } catch {
    authSection.style.display = 'block';
  }
}

export async function requireAuthForPage(redirectTo = './login.html') {
  try {
    const { user } = await api.me();
    if (!user) {
      window.location.href = redirectTo;
      return null;
    }
    return user;
  } catch {
    window.location.href = redirectTo;
    return null;
  }
}

export function bindAuthForms() {
  const registerForm = document.querySelector('[data-register-form]');
  const loginForm = document.querySelector('[data-login-form]');
  const logoutButton = document.querySelector('[data-logout]');
  const profileForm = document.querySelector('[data-profile-form]');
  const profileStatus = document.querySelector('[data-profile-status]');

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

  if (profileForm) {
    profileForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(profileForm);
      const payload = {
        displayName: formData.get('displayName'),
        birthday: formData.get('birthday')
      };
      try {
        const { user } = await api.updateProfile(payload);
        if (profileStatus) profileStatus.textContent = 'Profile updated.';
        if (user) {
          const profileName = document.querySelector('[data-profile-name]');
          if (profileName) profileName.textContent = user.displayName || '';
        }
      } catch (err) {
        if (profileStatus) profileStatus.textContent = err.message;
      }
    });
  }
}
