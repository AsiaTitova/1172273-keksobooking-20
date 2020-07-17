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

  function loadImageElementHandler (fileChooser, preview, callback) {
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
            preview = callback();
          }
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  }

  function createImageElement() {
    var photoItem = document.createElement('img');
    photoItem.width = PHOTO_HOUSE_WIDTH;
    photoItem.height = PHOTO_HOUSE_HEIGHT;
    photoPreview.appendChild(photoItem);
    return photoItem;
  }

  loadImageElementHandler(fileChooserAvatar, avatarPreview);
  loadImageElementHandler(fileChooserPhoto, photoPreview, createImageElement);

  function removeImageElement() {
    avatarPreview.src = DEFAULT_URL_AVATAR;
    photoPreview.innerHTML = '';
  }

  window.removeImageElement = removeImageElement;

})();
