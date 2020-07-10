'use strict';

(function () {
  var ESC = 27;

  var main = document.querySelector('.page__main');

  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  // отриcовка сообщения об успешной отправке формы

  function adSuccessMessage() {
    var successMessage = successMessageTemplate.cloneNode(true);
    main.appendChild(successMessage);
    setRemovePopupHandler(successMessage);
  }

  // отрисовка соообщения об ошибке

  function adErrorMessage() {
    var errorMessage = errorMessageTemplate.cloneNode(true);
    main.appendChild(errorMessage);

    var errorButton = errorMessage.querySelector('.error__button');

    setRemoveErrorPopupButtonHandler(errorButton, errorMessage);
    setRemovePopupHandler(errorMessage);
  }

  function setRemoveErrorPopupButtonHandler(error, block) {
    error.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (block) {
        block.remove();
      }
    });
  }

  // функция закрытия popup нажатием кнопки Esc

  function setRemovePopupHandler(block) {
    document.addEventListener('keydown', function setEscPressHandler(evt) {
      if (evt.keyCode === ESC) {
        evt.preventDefault();
        if (block) {
          block.remove();
          document.removeEventListener('keydown', setEscPressHandler);
        }
      }
    });
  }

  window.message = {
    adSuccessMessage: adSuccessMessage,
    adErrorMessage: adErrorMessage
  };
})();
