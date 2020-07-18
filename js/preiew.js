'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_HOUSE_WIDTH = 70;
  var PHOTO_HOUSE_HEIGHT = 70;
  var DEFAULT_URL_AVATAR = 'img/muffin-grey.svg';

  var fileChooserAvatar = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__img');
  var fileChooserPhoto = document.querySelector('#images');
  var photoPreview = document.querySelector('.ad-form__photo');
  var photosContainer = document.querySelector('.ad-form__photo-container');

  function loadImageElementHandler (fileChooser, callback) {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          if (callback) {
            callback(reader.result);
          }
        });

        reader.readAsDataURL(file);
      }
    });
  }

  function createImageElement(src) {
    var photoItem = document.createElement('img');
    photoItem.width = PHOTO_HOUSE_WIDTH;
    photoItem.height = PHOTO_HOUSE_HEIGHT;
    photoItem.src = src;
    photoPreview.appendChild(photoItem);

    var photoContainer = document.createElement('div');
    photosContainer.appendChild(photoContainer);
    photoContainer.classList.add('ad-form__photo');
    photoContainer.appendChild(photoItem);
    return photoContainer;
  }

  loadImageElementHandler(fileChooserAvatar, avatarPreview);
  loadImageElementHandler(fileChooserPhoto, createImageElement);

  function clear() {
    avatarPreview.src = DEFAULT_URL_AVATAR;
    photoPreview.innerHTML = '';
  }

  window.clear = clear;

})();
