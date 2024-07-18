import '/components/loading-button/loading-button';
import { UserService } from '/service/UserService';

const selectedCategoriesStorageKey = 'selected_categories';
const verificationNumberInput = document.querySelector('#verification-number');
const agreeButton = document.querySelector('#agree');
const inputNumber = document.querySelector('#input-phone-number');
const resendButton = document.querySelector('#resend');

function signup2() {
  const phoneNumber = localStorage.getItem('phoneNumber');

  inputNumber.value = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
  inputNumber.classList.add('text-contentTertiary');

  const updateButtonStyle = () => {
    if (verificationNumberInput.value.length === 6) {
      agreeButton.classList.add('bg-primary');
      agreeButton.classList.remove('bg-contentSecondary');
    } else {
      agreeButton.classList.remove('bg-primary');
      agreeButton.classList.add('bg-contentSecondary');
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

  agreeButton.addEventListener('click', async (e) => {
    e.preventDefault();

    agreeButton.toggleAttribute('disabled', true);
    agreeButton.classList.add('cursor-not-allowed');
    agreeButton.toggleAttribute('loading', true);

    const localStorageVerificationCode = localStorage.getItem('verificationCode');
    const savedSelectedCategoriesItem = localStorage.getItem(selectedCategoriesStorageKey);
    const selectedCategories = savedSelectedCategoriesItem ? JSON.parse(savedSelectedCategoriesItem) : [];
    const verificationCode = verificationNumberInput.value;

    if (verificationCode && verificationCode === localStorageVerificationCode) {
      try {
        await UserService.registerUser(phoneNumber, selectedCategories);
        await UserService.login(phoneNumber);
        localStorage.removeItem(selectedCategoriesStorageKey);
      } catch (error) {
        if (error?.originalError?.data?.data?.phone_number?.code === 'validation_not_unique') {
          alert(`이미 이 번호로 가입된 사용자가 있습니다. 로그인해주세요.`);
          window.location.href = '/pages/login/';
        } else {
          alert(`오류가 발생했습니다, 다시 시도해주세요: ${error.message}`);
          window.location.href = '/pages/signup/';
        }
        return;
      } finally {
        agreeButton.toggleAttribute('loading', false);
        agreeButton.toggleAttribute('disabled', false);
        agreeButton.classList.remove('cursor-not-allowed');
      }

      // 로그인 성공 시 자동으로 메인화면으로 이동.
      window.location.href = '/';
    } else {
      alert(`인증 코드: 잘못된 코드입니다.`);
      verificationNumberInput.value = '';
    }
  });
}

signup2();
