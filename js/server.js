'use strict';

(function () {

  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var URL_UPLOAD = 'https://javascript.pages.academy/keksobooking';
  var METHOD_LOAD = 'GET';
  var METHOD_UPLOAD = 'POST';
  var TIMEOUT_IN_MS = 10000;

  var StatusCode = {
    OK: 200
  };

  function load(url, method, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);
    xhr.send(data);
  }

  function loadData(onSuccess, onError) {
    load(URL_LOAD, METHOD_LOAD, onSuccess, onError);
  }

  function uploadData(onSuccess, onError, data) {
    load(URL_UPLOAD, METHOD_UPLOAD, onSuccess, onError, data);
  }

  window.server = {
    loadData: loadData,
    uploadData: uploadData
  };

})();
