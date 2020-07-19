'use strict';

(function () {

  var main = document.querySelector('.page__main');
  var successMessagePopup = document.querySelector('#success').content.querySelector('.success');
  var errorMessagePopup = document.querySelector('#error').content.querySelector('.error');

  function addSuccessMessage() {
    main.appendChild(successMessagePopup);
    setRemovePopupButtonHandler(successMessagePopup, successMessagePopup);
    document.addEventListener('keydown', escPressHandler);
  }

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
    if (evt.keyCode === window.utils.esc) {
      evt.preventDefault();
      errorMessagePopup.remove();
      successMessagePopup.remove();
      document.removeEventListener('keydown', escPressHandler);
    }
  }

  window.message = {
    addSuccess: addSuccessMessage,
    addError: addErrorMessage
  };
})();
