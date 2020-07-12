'use strict';

(function () {
  var ESC = 27;

  var main = document.querySelector('.page__main');

  var successMessagePopup = document.querySelector('#success').content.querySelector('.success');
  var errorMessagePopup = document.querySelector('#error').content.querySelector('.error');

  // отриcовка сообщения об успешной отправке формы

  function addSuccessMessage() {
    main.appendChild(successMessagePopup);
    setRemovePopupButtonHandler(successMessagePopup, successMessagePopup);
    document.addEventListener('keydown', escPressHandler);
  }

  // отрисовка соообщения об ошибке

  function addErrorMessage() {
    main.appendChild(errorMessagePopup);

    var errorButton = errorMessagePopup.querySelector('.error__button');
    setRemovePopupButtonHandler(errorButton, errorMessagePopup);
    document.addEventListener('keydown', escPressHandler);
  }

  function setRemovePopupButtonHandler(block, popup) {
    block.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (popup) {
        popup.remove();
        document.removeEventListener('keydown', escPressHandler);
      }
    });
  }

  function escPressHandler(evt) {
    if (evt.keyCode === ESC) {
      evt.preventDefault();
      errorMessagePopup.remove();
      successMessagePopup.remove();
      document.removeEventListener('keydown', escPressHandler);
    }
  }

  window.message = {
    addSuccessMessage: addSuccessMessage,
    addErrorMessage: addErrorMessage
  };
})();
