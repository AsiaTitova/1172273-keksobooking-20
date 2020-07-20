'use strict';

(function () {

  var main = document.querySelector('.page__main');
  var successMessagePopup = document.querySelector('#success').content.querySelector('.success');
  var errorMessagePopup = document.querySelector('#error').content.querySelector('.error');

  function addSuccessMessage() {
    main.appendChild(successMessagePopup);
    setRemovePopupButtonHandler(successMessagePopup, successMessagePopup);
    document.addEventListener('keydown', escPressMessageRemoveHandler);
  }

  function addErrorMessage() {
    main.appendChild(errorMessagePopup);

    var errorButton = errorMessagePopup.querySelector('.error__button');
    setRemovePopupButtonHandler(errorButton, errorMessagePopup);
    document.addEventListener('keydown', escPressMessageRemoveHandler);
  }

  function setRemovePopupButtonHandler(block, popup) {
    block.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (popup) {
        popup.remove();
        document.removeEventListener('keydown', escPressMessageRemoveHandler);
      }
    });
  }

  function escPressMessageRemoveHandler(evt) {
    if (evt.keyCode === window.utils.esc) {
      evt.preventDefault();
      errorMessagePopup.remove();
      successMessagePopup.remove();
      document.removeEventListener('keydown', escPressMessageRemoveHandler);
    }
  }

  window.message = {
    addSuccess: addSuccessMessage,
    addError: addErrorMessage
  };
})();
