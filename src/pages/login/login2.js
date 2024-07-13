import { UserService } from '@/service/UserService';

function login2() {
  const verificationNumberInput = document.querySelector('#verification-number');
  const loginButton = document.querySelector('#login');
  const phoneNumber = localStorage.getItem('phoneNumber');

  loginButton.addEventListener('click', async () => {
    const localStorageVerificationCode = localStorage.getItem('verificationCode');
    const verificationCode = verificationNumberInput.value;

    if (verificationCode && verificationCode === localStorageVerificationCode) {
      try {
        await UserService.login(phoneNumber);
      } catch (error) {
        alert(`오류가 발생했습니다, 다시 시도해주세요: ${error.message}`);
        window.location.href = '/pages/login/';
        return;
      }

      // 로그인 성공 시 자동으로 메인화면으로 이동.
      window.location.href = '/';
    } else {
      alert(`인증 코드: 잘못된 코드입니다.`);
    }
  });
}

login2();
