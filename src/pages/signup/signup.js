import pb from '/api/pocketbase';

function signup() {
  const phoneInput = document.querySelector('#phone-number');
  const verifyButton = document.querySelector('button');
  const phoneRegex = /^\d{10,11}$/;
  let verificationCode;

  /* --------------------------------- 전화번호 검증 -------------------------------- */
  phoneInput.addEventListener('input', () => {
    const isValid = phoneRegex.test(phoneInput.value);
    // 유효하지 않으면 버튼 비활성화
    verifyButton.disabled = !isValid;

    if (isValid) {
      verifyButton.classList.remove('border-contentSecondary', 'text-contentSecondary');
      verifyButton.classList.add('border-black', 'text-black');
    } else {
      verifyButton.classList.remove('border-black', 'text-black');
      verifyButton.classList.add('border-contentSecondary', 'text-contentSecondary');
    }
  });

  verifyButton.addEventListener('click', () => {
    const phoneNumber = phoneInput.value;

    if (!verifyButton.disabled) {
      // 6자리 랜덤 코드
      const verificationCode = Math.floor(100000 + Math.random() * 900000);

      localStorage.setItem('phoneNumber', phoneInput.value);
      localStorage.setItem('verificationCode', verificationCode);

      // 임시
      alert(`인증 코드: ${verificationCode}`);

      // signup2.html로 이동 (인증번호 입력하는 페이지로 이동)
      window.location.href = '/pages/signup/signup2.html';
    }
  });
}

signup();
