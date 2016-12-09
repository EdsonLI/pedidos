angular.module('starter')
  .controller('HomeController', function($scope, ProdutosService) {
    ProdutosService.lista().then(function(dados) {
      $scope.bolos = dados;
    });
    $scope.$on('produtos-atualizados', function(event, dados) {
      $scope.bolos = dados;
    });
  });

angular.module('starter').controller('DetalheController', function($scope, ProdutosService, $stateParams) {
  ProdutosService.lista().then(function(dados) {
    $scope.bolo = dados[$stateParams.boloId];
  });
});

angular.module('starter').controller('PedidoController', function($scope, ProdutosService, $stateParams, $http,
  $state, $ionicPopup, $ionicLoading) {
  ProdutosService.lista().then(function(dados) {
    $scope.bolo = dados[$stateParams.boloId];
    //console.info('sesStor_controller: ', sessionStorage.getItem('endereco'));
    $scope.dados.endereco = sessionStorage.getItem('endereco');
  });
  $scope.dados = {};

  $scope.fecharPedido = function() {
    $ionicLoading.show();

    $http.get('http://cozinhapp.sergiolopes.org/novo-pedido', {
      params: {
        pedido: $scope.bolo.nome,
        info: $scope.dados.nome +
          ' (' + $scope.dados.telefone + ') - ' +
          $scope.dados.endereco
      }
    }).then(function() {
      //caso ok, mostra pop-up confirmando e então navega pra home
      $ionicPopup.alert({
        title: "Pedido confirmado!",
        template: "Daqui a pouco chega :)"
      }).then(function() {
        $state.go('home');
      });
    }).catch(function(erro) {
      //caso de erro mostra alerta com erro
      $ionicPopup.alert({
        title: "Erro no pedido",
        template: erro.data + ". Liga pra gente: 0000-9999"
      });

    }).finally(function() {
      $ionicLoading.hide();
    });
  };

});

  /*.controller('HomeController', function($scope) {
    $scope.bolos = [{
      nome: "Só de Cenoura",
      preco: 18
    }, {
      nome: "Com Nutella",
      preco: 29
    }, {
      nome: "De Brigadeiro",
      preco: 24
    }, {
      nome: "Açucarado",
      preco: 19
    }];
  });*/
