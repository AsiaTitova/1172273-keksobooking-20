'use strict';

(function () {

  var RoomsMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var form = document.querySelector('.ad-form');
  var formFieldset = form.querySelectorAll('.ad-form__element');
  var resetForm = document.querySelector('.ad-form__reset');
  var priceInput = form.querySelector('#price');
  var typeSelect = form.querySelector('select[name="type"]');
  var checkInInput = form.querySelector('#timein');
  var checkOutInput = form.querySelector('#timeout');
  var roomsSelect = form.querySelector('select[name="rooms"]');
  var guestsSelect = form.querySelector('select[name="capacity"]');

  function guestsSelectInputHandler() {
    switch (true) {
      case roomsSelect.value !== '100' && guestsSelect.value === '0':
        return guestsSelect.setCustomValidity('Выберете колличество гостей');

      case roomsSelect.value < guestsSelect.value && guestsSelect.value.value !== '0':
        return guestsSelect.setCustomValidity('Количество гостей не может привышать количество комнат');

      case roomsSelect.value === '100' && guestsSelect.value !== '0':
        return guestsSelect.setCustomValidity('Данный тип жилья не для гостей');

      default:
        return guestsSelect.setCustomValidity('');
    }
  }

  function setMinPrice() {
    priceInput.setAttribute('min', RoomsMinPrice[(typeSelect.value)]);
    priceInput.placeholder = RoomsMinPrice[(typeSelect.value)];
  }

  function typeChangeHandler() {
    setMinPrice();
  }

  function getFormData() {
    return new FormData(form);
  }

  function setSubmitListener(callback) {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      callback();
    });
  }

  function clearForm() {
    form.reset();
  }

  function setResetListener(callback) {
    resetForm.addEventListener('click', function (evt) {
      evt.preventDefault();
      callback();
    });
  }

  function disableForm() {
    form.classList.add('ad-form--disabled');
    window.utils.changeDisableStatus(formFieldset, true);
    clearForm();
    window.clearPreview();
  }

  function activateForm() {
    form.classList.remove('ad-form--disabled');
    window.utils.changeDisableStatus(formFieldset, false);
  }

  function fillAddress(coordinates) {
    var address = form.querySelector('#address');
    address.value = coordinates;
  }

  checkInInput.addEventListener('input', function () {
    checkOutInput.value = checkInInput.value;
  });

  checkOutInput.addEventListener('input', function () {
    checkInInput.value = checkOutInput.value;
  });

  guestsSelect.addEventListener('change', guestsSelectInputHandler);
  roomsSelect.addEventListener('change', guestsSelectInputHandler);
  typeSelect.addEventListener('change', typeChangeHandler);

  window.form = {
    activate: activateForm,
    disable: disableForm,
    fillAddress: fillAddress,
    setSubmitListener: setSubmitListener,
    setResetListener: setResetListener,
    getFormData: getFormData
  };
})();

