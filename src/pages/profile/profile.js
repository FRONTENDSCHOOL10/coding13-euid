import { UserService } from '@/service/UserService';

async function profile() {
  const currentUser = await UserService.currentUser();
  console.log('currentUser', currentUser);

  const usernameSpan = document.querySelector('#username');
  usernameSpan.textContent = currentUser.username;
}

profile();
