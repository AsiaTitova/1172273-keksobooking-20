'use strict';

(function () {

  var ESCAPE = 27;

  function deactivatеPage() {
    window.map.deactivateMap();
    window.form.disableForm();
    window.form.fillAddress(window.map.getPositionPin());
  }

  deactivatеPage();

  // переводим страницу в активное состояние
  function activatePage() {
    window.map.activateMap();
    window.form.activateForm();
    window.server.loadData(renderPins, window.message.addErrorMessage);
  }

  // нажатием левой кнопки мыши и кнопки enter на основной пин
  window.map.setClickMainPinListener(activatePage);

  function renderPins(adverts) {
    var fragment = document.createDocumentFragment();
    adverts.forEach(function (ad) {
      var pinElement = window.pin.createPin(ad, function (evt) {
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

  function setSubmitButtonHandler() {
    window.form.sendDataServer();
    window.form.clearForm();
    window.pin.removePins();
    window.card.removeCard();
    window.map.returnMainPinCenterMap();
    deactivatеPage();
  }

  window.form.setSubmitListener(setSubmitButtonHandler);


})();

