'use strict';

(function () {
  var DEFAULT_VALUE = 'any';
  var MAX_NUMBER_DISPLAYED_PINS = 5;

  var filterForm = document.querySelector('.map__filters');
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingRoomSelect = document.querySelector('#housing-rooms');
  var housingPriceSelect = document.querySelector('#housing-price');
  var housingGuestSelect = document.querySelector('#housing-guests');

  // создание нового массива

  function makeFilterAds(offers) {
    return offers.filter(function (offer) {
      return checkOfferType(offer) && checkOfferRooms(offer) && checkOfferGuests(offer) && checkOfferPrice(offer) && checkFeatures(checkOfferPrice);
    }).slice(0, MAX_NUMBER_DISPLAYED_PINS);
  }

  // ценовые диапозоны для фильтрации

  var priceValues = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  function checkOfferPrice(element) {
    if (housingPriceSelect.value !== DEFAULT_VALUE) {
      return element.offer.price >= priceValues[housingPriceSelect.value].min && element.offer.price <= priceValues[housingPriceSelect.value].max;
    }
    return DEFAULT_VALUE;
  }

  // проверка на соответсвие ценовому диапозону

  // проверка на соответсвие типу жилья

  function checkOfferType(element) {
    return housingTypeSelect.value === element.offer.type || housingTypeSelect.value === DEFAULT_VALUE;
  }

  // проверка на соответствие количеству комнат

  function checkOfferRooms(element) {
    return housingRoomSelect.value === element.offer.rooms || housingRoomSelect.value === DEFAULT_VALUE;
  }

  // проверка на сообтвествия количества гостей

  function checkOfferGuests(element) {
    return housingGuestSelect.value === element.offer.guests || housingGuestSelect.value === DEFAULT_VALUE;
  }

  function checkFeatures(element) {
    var checkedFeatures = Array.from(filterForm.querySelectorAll('[type="checkbox"]:checked'));

    return checkedFeatures.every(function (feature) {
      return element.offer.features.includes(feature.value, 0);
    });
  }

  function getFilteredData(offers) {
    return makeFilterAds(offers);
  }

  function setChangeListener(onChange) {
    filterForm.addEventListener('change', onChange);
  }

  window.filter = {
    getFilteredData: getFilteredData,
    setChangeListener: setChangeListener
  };

})();
