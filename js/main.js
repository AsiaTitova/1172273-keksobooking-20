'use strict';

(function () {

  var ESCAPE = 27;

  var debouncedRenderPin = window.debounce(renderPins);

  function deactivatеPage() {
    window.map.deactivateMap();
    window.form.disableForm();
    window.form.fillAddress(window.map.getPositionPin());
    window.pin.removePins();
    window.card.removeCard();
    window.clear();
  }

  deactivatеPage();

  // переводим страницу в активное состояние
  function activatePage() {
    window.map.activateMap();
    window.form.activateForm();
    window.server.loadData(function (adverts) {
      var filterData = window.filter.getFilteredData(adverts);
      window.filter.setChangeListener(function () {
        window.card.removeCard();
        window.pin.removePins();
        var filteredAds = window.filter.getFilteredData(adverts);
        debouncedRenderPin(filteredAds);
      });
      renderPins(filterData);
    }, window.message.addErrorMessage);
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

  window.form.setSubmitListener(function () {
    function onSuccess() {
      window.message.addSuccessMessage();
      deactivatеPage();
    }
    var data = window.form.getFormData();
    window.server.uploadData(data, onSuccess, window.message.addErrorMessage);
  });

  // отчистка формы нажатием на кнопку отчистить
  window.form.setResetListener(deactivatеPage);

})();

