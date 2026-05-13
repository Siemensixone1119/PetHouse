const form = document.querySelector(".register__form");

form.addEventListener('submit', registerValidate)

function registerValidate() {
  const errors = {};

  const login = form.login.value.trim()
  const email = form.email.value.trim()
  const password = form.password.value.trim()

  if (login === '') {
    errors.login = 'Логин не может быть пустым'
  }

  if (email === '') {
    errors.email = 'Почта не может быть пустоц'
  } else if (!email.includes('@')) {
    errors.email = ' Некорректный формат почты'
  }

  if (password === '') {
    errors.password = 'Пароль не может быть пустым'
  }

  return errors;
}

function clearErrors() {
  const errorElements = document.querySelectorAll('.form__error');

  errorElements.forEach((element) => {
    element.textContent = '';
  });

  lostFormMessage.textContent = '';
  lostFormMessage.className = 'form__message';
}

function submitForm() {

}