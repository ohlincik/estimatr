var seed_quote = {
  title: 'Project',
  customer: 'Customer',
  rate: 100,
  pm_ratio: 0.2,
  sections: [
    {
      title: 'Section 1',
      hours: 16,
      items: [
        {
          title: 'Item 11',
          hours: 10
        },
        {
          title: 'Item 12',
          hours: 6
        }
      ]
    },
    {
      title: 'Section 2',
      hours: 20,
      items: [
        {
          title: 'Item 21',
          hours: 8
        },
        {
          title: 'Item 22',
          hours: 12
        }
      ]
    }
  ]
};

var app = angular.module('estimatr', []);

app.controller('EstimatrController', function($scope) {

  $scope.quote = seed_quote;

});