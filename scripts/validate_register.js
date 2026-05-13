const form = document.querySelector(".register__form");

form.addEventListener('submit', submitForm)

function registerValidate() {
  const errors = {};

  const login = form.login.value.trim()
  const email = form.email.value.trim()
  const password = form.password.value.trim()
  const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

  if (login === '') {
    errors.login = 'Логин не может быть пустым'
  }

  if (email === '') {
    errors.email = 'Почта не может быть пустой'
  } else if (!emailValidator.test(String(email).toLowerCase())) {
    errors.email = ' Некорректный формат почты'
  }

  if (password === '') {
    errors.password = 'Пароль не может быть пустым'
  } else if (!passwordValidator.test(String(password))) {
    errors.password = 'Пароль должен сожержать минимум одну строчную и заглавную букву, цыфры и спецсимволы, в сумме не менее 8 символов'
  }

  return errors;
}

function clearErrors() {
  const errorElements = document.querySelectorAll('.form__error');

  errorElements.forEach((element) => {
    element.textContent = '';
  });
}

function showErrors(errors) {
  Object.keys(errors).forEach((fieldName) => {
    const errorElement = document.querySelector(`[data-error="${fieldName}"]`);

    if (errorElement) {
      errorElement.textContent = errors[fieldName];
    }
  });
}

function submitForm(event) {
  event.preventDefault();

  clearErrors();

  const errors = registerValidate();

  if (Object.keys(errors).length > 0) {
    showErrors(errors);
    return;
  }

  window.location.href = 'index.html';
}