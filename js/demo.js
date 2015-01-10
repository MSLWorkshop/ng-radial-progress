angular.module('MSLWorkshopDemo', [
    'ng-radial-progress'
])
.controller('DemoCtrl', ['$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {
    var demoProgress = Math.floor((Math.random() * 100) + 1);
    $scope.data = {
        progress: demoProgress,
        firstProgress: Math.floor((Math.random() * 100) + 1),
        secondProgress: demoProgress
    };
    $scope.updateProgress = function(){
        $scope.data.secondProgress = $scope.data.progress;
    };
    $scope.randomProgress = function(){
        $scope.data.secondProgress = Math.floor((Math.random() * 100) + 1);
    };
    function showUpdatedNumber(event, value){
        $scope.updatedNumber = 'The number is ' + value;
    }
    $rootScope.$on('radialProgressUpdated', showUpdatedNumber);
    function callbackGetData(percentage, isVisible){
        console.log(arguments);
        $scope.labelPercentage = 'percentage: ' + percentage;
        $scope.labelIsVsisible = 'isVisible: ' + isVisible;
    }
    $scope.getData = function(){
        $rootScope.$emit('radialProgressGetData', callbackGetData);
    };
}]);
