angular.module('starter')
  .service('ProdutosService', function($http, $rootScope, $q) {
    var url = 'http://cozinhapp.sergiolopes.org/produtos?random=1';
    var onSuccess = function(position) {
      var coords = position.coords;
      //console.log("Latitude: " + coords.latitude + ", Longitude: " + coords.longitude);
      //alert("Latitude: "+coords.latitude+", Longitude: "+coords.longitude);

      var isAndroid = ionic.Platform.isAndroid();

      var geocoder = new google.maps.Geocoder,
          latlng = {lat: parseFloat(coords.latitude), lng: parseFloat(coords.longitude)};

      geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if(isAndroid) {
            if (results[1]) {
              sessionStorage.setItem('endereco', results[1].formatted_address);
            } else {
                alert('Sem resultados de endereço!');
            }
          } else {
            if (results[3]) {
                //console.info(results[3].address_components[0].long_name);
                let cep = results[3].address_components[0].long_name;
                    cep = cep.replace(/\.|\-/g, '');

                // cria um elemento javascript
                var script = document.createElement('script');

                // sincroniza com o callback
                script.src = '//viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';
                document.body.appendChild(script);
            } else {
                alert('Sem resultados de endereço!');
            }
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

  function meu_callback(conteudo) {
      if (!("erro" in conteudo)) {
          // cria um identificador na sessionStorage com os dados do endereco
          sessionStorage.setItem('endereco', conteudo.logradouro+', '+conteudo.bairro+', '+conteudo.localidade+'/'+conteudo.uf+' | Informe o número: ');
      } else {
          // se o CEP não for encontrado no webservice
          alert("CEP não encontrado");
      }
  }
