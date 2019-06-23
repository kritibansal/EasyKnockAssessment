

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.houses = [];
    $scope.houseKeys = [];
    $scope.searchResults = [];

    $scope.init = () => {
        $.get('https://api.bridgedataoutput.com/api/v2/OData/test/Property?access_token=6baca547742c6f96a6ff71b138424f21', {}, (data) => {
            $scope.$apply(() => {
                $scope.houses = data.value;
                $scope.houses.forEach(house => {
                    $scope.searchResults.push('');
                })
                Object.keys($scope.houses[0]).forEach(key => {
                    $scope.houseKeys.push(key);
                });
            })
        });
    }

    $("#searchButton").click(() => {
        let searchKey = $("#searchInput").val()
        $scope.houses.forEach((obj) => {
            Object.keys(obj).forEach(key => {
                $scope.houseKeys.push(key);
                console.log($scope.houseKeys);
                let value = obj[key];
                if (key === searchKey) {
                    console.log(value);
                }
            });
        });        
    });



    $scope.search = (searchText, house, index) => {
        Object.keys(house).forEach(key => {
            if (searchText === key) {
                $scope.searchResults[index] = house[key];
            }
        });
    }

});