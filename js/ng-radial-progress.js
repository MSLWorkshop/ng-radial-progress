angular.module('ng-radial-progress', [])
.provider('radialProgress', [function () {
    
    config = {
        missingDataMsg: 'No data available.'
    };
    this.$get = [function() {
        return {
            getConfig: function(){
                return config;
            }
        };
    }];
    this.setConfig = function(newConfig){
        config = newConfig;
    };
}])
.directive('radialProgress', ['$rootScope', '$timeout', 'radialProgress', function ($rootScope, $timeout, radialProgress) {
    return {
        restrict: 'A',
        templateUrl: '/js/radialprogress.tpl.html',
        scope: {
            defaultPercentage: '@progress'
        },
        link: function (scope, element, iAttsr) {
            var baseIncrement = 180 / 100;
            scope.progress = {
                isVisible: false,
                showMissingDataMsg: false,
                percentage: 0,
                incrementStyle: {},
                incrementFixStyle: {}
            };
            scope.config = radialProgress.getConfig();
            function calculateIncrement(value){
                $timeout(function(){
                    if (isNaN(value)) {
                        scope.progress.isVisible = false;
                        scope.progress.showMissingDataMsg = true;

                        return false;
                    }
                    scope.progress.showMissingDataMsg = false;
                    scope.progress.isVisible = true;
                    scope.progress.percentage = value;
                    scope.progress.incrementStyle = {
                        '-webkit-transform': 'rotate(' + (baseIncrement * value) +'deg)',
                        '-ms-transform': 'rotate(' + (baseIncrement * value) +'deg)',
                        'transform': 'rotate(' + (baseIncrement * value) +'deg)'
                    };
                    scope.progress.incrementFixStyle = {
                        '-webkit-transform': 'rotate(' + (baseIncrement * value * 2) +'deg)',
                        '-ms-transform': 'rotate(' + (baseIncrement * value * 2) +'deg)',
                        'transform': 'rotate(' + (baseIncrement * value * 2) +'deg)'
                    };
                }, 0, true);
            }
            $rootScope.$on('radialProgressUpdate', function(event, value){
                calculateIncrement(value);
                $rootScope.$emit('radialProgressUpdated', value);
            });
            $rootScope.$on('radialProgressGetData', function(event, callback){
        console.log('radialProgressGetData', arguments);
                if (angular.isDefined(callback)) {
                    callback(scope.progress.percentage, scope.progress.isVisible);
                }
            });
            if (angular.isDefined(scope.defaultPercentage)) {
                $rootScope.$emit('radialProgressUpdate', scope.defaultPercentage);
            }
        }
    };
}]);
