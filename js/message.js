'use strict';

(function () {
  var ESC = 27;

  var main = document.querySelector('.page__main');

  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var success = document.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  // отриcовка сообщения об успешной отправке формы

  function adSuccessMessage() {
    successMessageTemplate.cloneNode(true);
    main.appendChild(successMessageTemplate);
    setRemoveSuccessPopup();
  }

  // закрытие сообщения об успешной отправке формы

  function setRemoveSuccessPopup() {
    success.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC) {
        evt.preventDefault();
        if (success) {
          success.remove();
        }
      }
    });
  }

  // отрисовка соообщения об ошибке

  function adErrorMessage() {
    var errorMessage = errorMessageTemplate.cloneNode(true);
    main.appendChild(errorMessage);

    var errorBlock = errorMessage.querySelector('.error');
    var errorButton = errorMessage.querySelector('.error__button');

    setRemoveErrorMessageButtonHandler(errorButton, errorBlock);
    setRemoveErrorMessageEscHandler(errorButton, errorBlock);
  }

  function setRemoveErrorMessageButtonHandler(error, block) {
    error.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (block) {
        block.remove();
      }
    });
  }

  function setRemoveErrorMessageEscHandler(error, block) {
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC) {
        evt.preventDefault();
        if (block) {
          block.remove();
        }
      }
    });
  }

  window.message = {
    adSuccessMessage: adSuccessMessage,
    adErrorMessage: adErrorMessage
  };
})();
