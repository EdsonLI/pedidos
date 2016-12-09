angular.module('starter')
  .service('ProdutosService', function($http, $rootScope, $q) {
    var url = 'http://cozinhapp.sergiolopes.org/produtos?random=1';
    var onSuccess = function(position) {
      var coords = position.coords;
      //console.log("Latitude: " + coords.latitude + ", Longitude: " + coords.longitude);
      //alert("Latitude: "+coords.latitude+", Longitude: "+coords.longitude);

      var geocoder = new google.maps.Geocoder,
          latlng = {lat: parseFloat(coords.latitude), lng: parseFloat(coords.longitude)};

      geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            sessionStorage.setItem('endereco', results[1].formatted_address);
          } else {
            alert('No results found');
          }
        } else {
          alert('Geocoder failed due to: ' + status);
        }
      });
    }
    var onError = function(error) {
      //alert("Code: "+error.code+"\nMensagem: "+error.message);
    }

    var promise = $http.get(url).then(function(response) {
      var json = JSON.stringify(response.data);
      localStorage.setItem('cache', json);
      $rootScope.$broadcast('produtos-atualizados', response.data);
      return response.data;
    });

    var cache = localStorage.getItem('cache');
    if (cache != null) {
      promise = $q(function(resolve, reject) {
        resolve(JSON.parse(cache));
      })
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 5000});

    return {
      lista: function() {
        //return $http.get(url).then(function(response) {
        return promise;
        //});
      }
    }
  });
