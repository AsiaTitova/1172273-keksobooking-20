'use strict';

(function () {
  var IMG_WIDTH = 45;
  var IMG_HEIGHT = 40;
  var IMG_ALT = 'Фотография жилья';

  var cardTemplate = document.querySelector('#card').content.querySelector('article');

  function createTypeCard(card) {
    switch (true) {
      case card.offer.type === 'bungalo':
        return 'Бунгало';

      case card.offer.type === 'flat':
        return 'Квартира';

      case card.offer.type === 'house':
        return 'Дом';

      default:
        return 'Дворец';
    }
  }

  function createFeatures(container, feature) {
    for (var i = 0; i < feature.length; i++) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature');
      featureItem.classList.add('popup__feature--' + feature[i]);
      container.querySelector('.popup__features').appendChild(featureItem);
    }
  }

  function createPhotos(container, photos) {
    for (var i = 0; i < photos.length; i++) {
      var photosItem = document.createElement('img');
      photosItem.classList.add('popup__photo');
      photosItem.src = photos[i];
      photosItem.width = IMG_WIDTH;
      photosItem.height = IMG_HEIGHT;
      photosItem.alt = IMG_ALT;
      container.querySelector('.popup__photos').appendChild(photosItem);
    }
  }

  function createCard(offer, closeHandler) {
    var cardAd = cardTemplate.cloneNode(true);
    cardAd.querySelector('.popup__avatar').src = offer.author.avatar || 'no value';

    cardAd.querySelector('.popup__title').textContent = offer.offer.title || 'no value';

    cardAd.querySelector('.popup__text--address').textContent = offer.offer.address || 'no value';

    cardAd.querySelector('.popup__text--price').textContent = offer.offer.price + '₽/ночь' || 'no value';

    cardAd.querySelector('.popup__type').textContent = createTypeCard(offer) || 'no value';

    cardAd.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей' || 'no value';

    cardAd.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout || 'no value';

    cardAd.querySelector('.popup__description').textContent = offer.offer.description || 'no value';

    createFeatures(cardAd, offer.offer.features);
    createPhotos(cardAd, offer.offer.photos);

    var childElements = cardAd.querySelectorAll(':scope > *');
    childElements.forEach(function (element) {
      if (element.textContent === 'no value') {
        element.classList.add('hidden');
      }
    });

    if (closeHandler && typeof closeHandler === 'function') {
      cardAd.querySelector('.popup__close').addEventListener('click', closeHandler);
    }

    return cardAd;
  }

  function removeCard() {
    var card = document.querySelector('.popup');
    if (card) {
      card.remove();
    }
  }

  window.card = {
    create: createCard,
    remove: removeCard
  };

})();
