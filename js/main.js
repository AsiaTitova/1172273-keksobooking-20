'use strict';

(function () {

  var ESCAPE = 27;

  function deactivationPage() {
    window.map.deactivateMap();
    window.form.disableForm();
    window.form.fillAddress(window.map.getPositionPin());
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
        function removeCard() {
          var card = document.querySelector('.popup');
          if (card) {
            card.remove();
            document.addEventListener('keydown', onEscPress);
          }
        }
        removeCard();
        var card = window.card.createCard(ad, removeCard);
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

  window.form.setSubmitListener(deactivationPage);

})();

