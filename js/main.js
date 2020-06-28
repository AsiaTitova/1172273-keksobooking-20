'use strict';

(function () {
  var LEFT_MOUSE_BUTTON = 1;
  var ENTER = 13;
  var ESCAPE = 27;

  var submitForm = document.querySelector('.ad-form__submit');

  function deactivationPage() {
    window.map.deactivateMap();
    window.form.disableForm();
    window.form.fillAddress();
  }

  deactivationPage();

  // переводим страницу в активное состояние
  function activatePage() {
    window.map.activateMap();
    window.form.activateForm();
    renderPins(window.announcements);
  }

  // нажатием левой кнопки мыши и кнопки enter на основной пин
  window.map.setMousedownListener(activatePage);
  window.map.setKeydownListener(activatePage);


  function renderPins(adverts) {
    var fragment = document.createDocumentFragment();
    adverts.forEach(function (ad) {
      var pinElement = window.createPin(ad, function (evt) {
        evt.preventDefault();
        window.card.removeCard();
        var card = window.card.createCard(ad, window.card.removeCard);
        document.addEventListener('keydown', onEscPress);
        window.map.addElement(card);
      });
      fragment.appendChild(pinElement);
    });
    window.map.addElement(fragment);
  }

  function onEscPress(evt) {
    if (evt.keyCode === ESCAPE) {
      window.card.removeCard();
      document.removeEventListener('keydown', onEscPress);
    }
  }
  // переход страницы в неактивное состояние после отправки формы

  // нажатием левой кнопки мыши
  submitForm.addEventListener('mousedown', function (evt) {
    if (evt.which === LEFT_MOUSE_BUTTON) {
      evt.preventDefault();
      deactivationPage();
    }
  });

  // нажатием клавиши Enter
  submitForm.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER) {
      evt.preventDefault();
      deactivationPage();
    }
  });

})();

