'use strict';

(function () {
  var DEFAULT_VALUE = 'any';
  var MAX_NUMBER_DISPLAYED_PINS = 5;
  var ESC = 27;

  var housingTypeSelect = document.querySelector('#housing-type');

  // создание нового массива

  function makeFitlerAds(elements, callback) {
    var filterOffers = [];
    for (var i = 0; i < elements.length; i++) {
      while (elements.length !== MAX_NUMBER_DISPLAYED_PINS) {
        if (callback(elements[i])) {
          filterOffers.push(elements[i]);
        }
      }
    }
    return filterOffers;
  }

  function callFilters(element) {
    return filters.every(function (callback) {
      return callback(element);
    });
  }
  // проверка на соответсвие типу жилья

  function checkOfferType(element) {
    return housingTypeSelect.value === element.offer.type || housingTypeSelect.value === DEFAULT_VALUE;
  }

  var filters = [checkOfferType];

  function renderFiltersPins(adverts) {
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
    if (evt.keyCode === ESC) {
      window.card.removeCard();
      document.removeEventListener('keydown', onEscPress);
    }
  }


  function successLoadFilterHandler(offers) {
    window.filter.adsToFilers = offers;
    renderFiltersPins(makeFitlerAds(offers, callFilters));
    window.filter.updatePins();
  }


  function updatePins(offers) {
    renderFiltersPins(makeFitlerAds(offers, callFilters));
  }

  window.filter = {
    updatePins: updatePins,
    adsToFilers: [],
    successLoadFilterHandler: successLoadFilterHandler
  };

})();
