(function() {
  angular
    .module('searchDemoApp')
    .controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['$location'];
function homeCtrl ($location) {

  var vm = this
  vm.title = "Search Demo";
  vm.message = "목록을 불러오는 중입니다.";
  vm.currentPath = $location.path();
};
}) ();