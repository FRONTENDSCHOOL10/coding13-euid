import pb from '/api/pocketbase';

const phoneInput = document.querySelector('#phone-number');
const verifyButton = document.querySelector('#verify');

function login() {
  // 한국 전화번호 형식인지 검사
  const phoneRegex = /^01[016789]\d{7,8}$/;
  let verificationCode;
  verifyButton.disabled = true;

  // 전화번호 검증
  phoneInput.addEventListener('input', (e) => {
    // 사용자가 입력한 값에서 숫자가 아닌 모든 문자 제거
    let value = e.target.value.replace(/[^\d]/g, '');

    // 숫자 길이가 10 이상일 때 전화번호 포맷
    if (value.length >= 10) {
      value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
    }

    // 포맷된 값을 입력 필드에 다시 설정
    e.target.value = value;

    // 공백 제거 후 전화번호 유효성 검사
    const isValid = phoneRegex.test(value.replace(/\s/g, ''));
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
  verifyButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (!verifyButton.disabled) {
      const phoneNumber = phoneInput.value.replace(/\s/g, '');
      // 6자리 랜덤 코드
      const verificationCode = Math.floor(100000 + Math.random() * 900000);

      localStorage.setItem('phoneNumber', phoneNumber);
      localStorage.setItem('verificationCode', verificationCode);

      // 임시
      alert(`인증 코드: ${verificationCode}`);

      // login2.html로 이동 (인증번호 입력하는 페이지로 이동)
      window.location.href = '/pages/login/login2.html';
    }
  });
}

login();
