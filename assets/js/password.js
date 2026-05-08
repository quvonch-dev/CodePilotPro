const passwordInput = document.querySelector('#passwordInput');
const passwordResult = document.querySelector('#passwordResult');
const strengthFill = document.querySelector('#strengthFill');

passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;
  let score = 0;
  const messages = [];

  if (password.length >= 8) score += 25;
  else messages.push('kamida 8 ta belgi');

  if (/[A-Z]/.test(password)) score += 25;
  else messages.push('katta harf');

  if (/[0-9]/.test(password)) score += 25;
  else messages.push('raqam');

  if (/[^A-Za-z0-9]/.test(password)) score += 25;
  else messages.push('maxsus belgi');

  strengthFill.style.width = `${score}%`;

  if (password.length === 0) {
    passwordResult.textContent = 'Parol yozilmagan.';
    return;
  }

  if (score === 100) {
    passwordResult.textContent = 'Juda kuchli parol ✅';
  } else if (score >= 50) {
    passwordResult.textContent = `O‘rtacha parol. Qo‘shing: ${messages.join(', ')}`;
  } else {
    passwordResult.textContent = `Kuchsiz parol. Kerak: ${messages.join(', ')}`;
  }
});
