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

  $scope.sumSectionHours = function(section) {
    var total = 0;
    section.items.forEach(function(item) {
      hours = isNaN(parseInt(item.hours)) ? 0 : parseInt(item.hours);
      total += hours;
    });
    section.hours = total;
  }

  $scope.sumProjectHours = function() {
    var total = 0;
    $scope.quote.sections.forEach(function(section) {
      total += parseInt(section.hours);
    });
    return total;
  }

  $scope.addItem = function(section) {
    var new_item = { title: 'New Item', hours: 0 };
    section.items.push(new_item);
  }

  $scope.removeItem = function(section, item) {
    var index = section.items.indexOf(item);
    section.items.splice(index, 1);
  }

});