'use strict';

(function () {
  var DEFAULT_VALUE = 'any';
  var MAX_NUMBER_DISPLAYED_PINS = 5;

  var priceValues = {
    low: {
      MIN: 0,
      MAX: 10000
    },
    middle: {
      MIN: 10000,
      MAX: 50000
    },
    high: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  var filterForm = document.querySelector('.map__filters');
  var housingTypeSelect = filterForm.querySelector('#housing-type');
  var housingRoomSelect = filterForm.querySelector('#housing-rooms');
  var housingPriceSelect = filterForm.querySelector('#housing-price');
  var housingGuestSelect = filterForm.querySelector('#housing-guests');

  function checkOfferPrice(element) {
    if (housingPriceSelect.value !== DEFAULT_VALUE) {
      return element.offer.price >= priceValues[housingPriceSelect.value].MIN && element.offer.price <= priceValues[housingPriceSelect.value].MAX;
    }
    return DEFAULT_VALUE;
  }

  function checkOfferType(element) {
    return housingTypeSelect.value === element.offer.type || housingTypeSelect.value === DEFAULT_VALUE;
  }

  function checkOfferRooms(element) {
    return housingRoomSelect.value === String(element.offer.rooms) || housingRoomSelect.value === DEFAULT_VALUE;
  }

  function checkOfferGuests(element) {
    return housingGuestSelect.value === String(element.offer.guests) || housingGuestSelect.value === DEFAULT_VALUE;
  }

  function checkFeatures(element) {
    var checkedFeatures = Array.from(filterForm.querySelectorAll('[type="checkbox"]:checked'));

    return checkedFeatures.every(function (feature) {
      return element.offer.features.includes(feature.value, 0);
    });
  }

  function getFilteredData(offers) {
    return offers.filter(function (offer) {
      return checkOfferType(offer) && checkOfferRooms(offer) && checkOfferGuests(offer) && checkOfferPrice(offer) && checkFeatures(offer);
    }).slice(0, MAX_NUMBER_DISPLAYED_PINS);
  }

  function setChangeListener(onChange) {
    filterForm.addEventListener('change', onChange);
  }

  window.filter = {
    getFilteredData: getFilteredData,
    setChangeListener: setChangeListener
  };

})();
