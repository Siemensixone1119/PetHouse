document.addEventListener('DOMContentLoaded', () => {
  const openLostModalButton = document.getElementById('openLostModal');
  const closeLostModalOverlay = document.getElementById('closeLostModal');
  const modalCloseButton = document.getElementById('modalCloseButton');
  const lostModal = document.getElementById('lostModal');

  const lostPetForm = document.getElementById('lostPetForm');
  const lostPetsList = document.getElementById('lostPetsList');
  const lostFormMessage = document.getElementById('lostFormMessage');

  if (
    !openLostModalButton ||
    !closeLostModalOverlay ||
    !modalCloseButton ||
    !lostModal ||
    !lostPetForm ||
    !lostPetsList ||
    !lostFormMessage
  ) {
    return;
  }

  function openModal() {
    lostModal.classList.add('is-open');
  }

  function closeModal() {
    lostModal.classList.remove('is-open');
  }

  function clearErrors() {
    const errorElements = document.querySelectorAll('.lost-form__error');

    errorElements.forEach((element) => {
      element.textContent = '';
    });

    lostFormMessage.textContent = '';
    lostFormMessage.className = 'lost-form__message';
  }

  function showErrors(errors) {
    Object.keys(errors).forEach((fieldName) => {
      const errorElement = document.querySelector(`[data-error="${fieldName}"]`);

      if (errorElement) {
        errorElement.textContent = errors[fieldName];
      }
    });
  }

  function addLostPetCard(pet) {
    const item = document.createElement('li');
    item.classList.add('lost-board__item');

    item.innerHTML = `
      <h3 class="lost-board__item-title">${pet.petName} — ${pet.pet}</h3>

      <p class="lost-board__item-text">
        <strong>Владелец:</strong> ${pet.owner}
      </p>

      <p class="lost-board__item-text">
        <strong>Город:</strong> ${pet.city}
      </p>

      <p class="lost-board__item-text">
        ${pet.description}
      </p>

      <p class="lost-board__item-contact">
        Контакт: ${pet.contact}
      </p>
    `;

    lostPetsList.prepend(item);
  }

  openLostModalButton.addEventListener('click', openModal);
  closeLostModalOverlay.addEventListener('click', closeModal);
  modalCloseButton.addEventListener('click', closeModal);

  lostPetForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    clearErrors();

    const formData = new FormData(lostPetForm);

    try {
      const response = await fetch('./php/add-lost-pet.php', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!result.success) {
        showErrors(result.errors);

        lostFormMessage.textContent = 'Исправьте ошибки в форме.';
        lostFormMessage.classList.add('is-error');

        return;
      }

      addLostPetCard(result.data);

      lostFormMessage.textContent = 'Объявление успешно добавлено!';
      lostFormMessage.classList.add('is-success');

      lostPetForm.reset();

      setTimeout(() => {
        closeModal();
        clearErrors();
      }, 1000);
    } catch (error) {
      lostFormMessage.textContent = 'Ошибка соединения с сервером.';
      lostFormMessage.classList.add('is-error');
    }
  });
});