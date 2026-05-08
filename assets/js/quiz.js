const quizInfo = document.querySelector('#quizInfo');
const questionTitle = document.querySelector('#questionTitle');
const quizOptions = document.querySelector('#quizOptions');
const nextBtn = document.querySelector('#nextBtn');

const questions = [
  {
    question: 'JavaScriptda o‘zgaruvchi yaratish uchun qaysi kalit so‘z ishlatiladi?',
    options: ['let', 'style', 'href', 'meta'],
    answer: 'let'
  },
  {
    question: '=== operatori nimani tekshiradi?',
    options: ['Faqat qiymatni', 'Qiymat va typeni', 'Faqat typeni', 'CSSni'],
    answer: 'Qiymat va typeni'
  },
  {
    question: 'DOM nima?',
    options: ['HTML hujjat modeli', 'Rasm formati', 'Git buyrug‘i', 'CSS property'],
    answer: 'HTML hujjat modeli'
  },
  {
    question: 'localStorage nima qiladi?',
    options: ['Brauzerda ma’lumot saqlaydi', 'Server yaratadi', 'Rasm chizadi', 'HTMLni o‘chiradi'],
    answer: 'Brauzerda ma’lumot saqlaydi'
  }
];

let currentIndex = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  answered = false;
  const current = questions[currentIndex];
  quizInfo.textContent = `Savol ${currentIndex + 1}/${questions.length} | Ball: ${score}`;
  questionTitle.textContent = current.question;
  quizOptions.innerHTML = '';

  current.options.forEach((option) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = option;
    button.addEventListener('click', () => checkAnswer(button, option));
    quizOptions.appendChild(button);
  });
}

function checkAnswer(button, option) {
  if (answered) return;
  answered = true;

  const current = questions[currentIndex];
  const buttons = document.querySelectorAll('.option-btn');

  buttons.forEach((btn) => {
    if (btn.textContent === current.answer) btn.classList.add('correct');
  });

  if (option === current.answer) {
    score++;
    button.classList.add('correct');
  } else {
    button.classList.add('wrong');
  }

  quizInfo.textContent = `Savol ${currentIndex + 1}/${questions.length} | Ball: ${score}`;
}

nextBtn.addEventListener('click', () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    questionTitle.textContent = `Test tugadi! Siz ${questions.length} tadan ${score} ta to‘g‘ri topdingiz.`;
    quizOptions.innerHTML = '';
    nextBtn.textContent = 'Qayta boshlash';
    currentIndex = 0;
    score = 0;
    nextBtn.onclick = () => location.reload();
  }
});

renderQuestion();
