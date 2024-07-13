import { UserService } from '@/service/UserService';

function handleLogout() {
  UserService.logout();
}

async function profile() {
  const currentUser = await UserService.currentUser();
  console.log('currentUser', currentUser);

  const usernameSpan = document.querySelector('#username');
  usernameSpan.textContent = currentUser.username;

  const logoutButton = document.querySelector('#logout');
  logoutButton.addEventListener('click', handleLogout);

  const logoutButtonSpan = document.querySelector('#logout-button__username');
  logoutButtonSpan.textContent = currentUser.username;
}

profile();
