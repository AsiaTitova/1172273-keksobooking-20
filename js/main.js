'use strict';

(function () {

  // var debouncedRenderPins = window.debounce(function () {
  //   window.card.remove();
  //   window.pin.remove();
  //   var filteredAds = window.filter.getFilteredData(adverts);
  //   renderPins(filteredAds);
  // });

  function deactivatеPage() {
    window.map.deactivate();
    window.form.disable();
    window.form.fillAddress(window.map.getPositionPin());
    window.pin.remove();
    window.card.remove();
  }

  function activatePage() {
    window.map.activate();
    window.form.activate();
    window.server.loadData(function (adverts) {
      var filterData = window.filter.getFilteredData(adverts);
      var debouncedRenderPins = window.debounce(function () {
        window.card.remove();
        window.pin.remove();
        var filteredAds = window.filter.getFilteredData(adverts);
        renderPins(filteredAds);
      });
      window.filter.setChangeListener(debouncedRenderPins);
      renderPins(filterData);
    }, window.message.addError);
  }

  function renderPins(adverts) {
    var fragment = document.createDocumentFragment();
    adverts.forEach(function (ad) {
      var pinElement = window.pin.create(ad, function (evt) {
        evt.preventDefault();
        window.card.remove();
        var card = window.card.create(ad, window.card.remove);
        document.addEventListener('keydown', escPressСardRemoveHandler);
        window.map.addElement(card);
      });
      fragment.appendChild(pinElement);
    });
    window.map.addElement(fragment);
  }

  function escPressСardRemoveHandler(evt) {
    if (evt.keyCode === window.utils.esc) {
      window.card.remove();
      document.removeEventListener('keydown', escPressСardRemoveHandler);
    }
  }

  deactivatеPage();

  window.map.setClickMainPinListener(activatePage);

  window.form.setSubmitListener(function () {
    function onSuccess() {
      window.message.addSuccess();
      deactivatеPage();
    }
    var data = window.form.getFormData();
    window.server.uploadData(data, onSuccess, window.message.addError);
  });

  window.form.setResetListener(deactivatеPage);

})();

