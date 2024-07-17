import '/components/loading-button/loading-button';

import { UserService } from '@/service/UserService';

const verificationNumberInput = document.querySelector('#verification-number');
const loginButton = document.querySelector('#login');
const inputNumber = document.querySelector('#input-phone-number');
const resendButton = document.querySelector('#resend');

function login2() {
  const phoneNumber = localStorage.getItem('phoneNumber');

  inputNumber.value = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
  inputNumber.classList.add('text-contentTertiary');

  const updateButtonStyle = () => {
    if (verificationNumberInput.value.length === 6) {
      loginButton.classList.add('bg-primary');
      loginButton.classList.remove('bg-contentSecondary');
    } else {
      loginButton.classList.remove('bg-primary');
      loginButton.classList.add('bg-contentSecondary');
    }
  };

  resendButton.addEventListener('click', (e) => {
    e.preventDefault();
    const newVerificationCode = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('verificationCode', newVerificationCode);
    alert(`인증 코드: ${newVerificationCode}`);
  });

  verificationNumberInput.addEventListener('input', () => {
    if (verificationNumberInput.value.length > 6) {
      verificationNumberInput.value = verificationNumberInput.value.slice(0, 6);
    }
    updateButtonStyle();
  });

  loginButton.addEventListener('click', async (e) => {
    e.preventDefault();

    loginButton.toggleAttribute('disabled', true);
    loginButton.classList.add('cursor-not-allowed');
    loginButton.toggleAttribute('loading', true);

    const localStorageVerificationCode = localStorage.getItem('verificationCode');
    const verificationCode = verificationNumberInput.value;

    if (verificationCode && verificationCode === localStorageVerificationCode) {
      try {
        await UserService.login(phoneNumber);
      } catch (error) {
        alert(`오류가 발생했습니다, 다시 시도해주세요: ${error.message}`);
        window.location.href = '/pages/login/';
        return;
      } finally {
        loginButton.toggleAttribute('loading', false);
        loginButton.toggleAttribute('disabled', false);
        loginButton.classList.remove('cursor-not-allowed');
      }

      // 로그인 성공 시 자동으로 메인화면으로 이동.
      window.location.href = '/';
    } else {
      alert(`인증 코드: 잘못된 코드입니다.`);
    }
  });
}

login2();
