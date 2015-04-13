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

  $scope.addItem = function(section) {
    var new_item = { title: 'New Item', hours: 0 };
    section.items.push(new_item);
  }

  $scope.removeItem = function(section, item) {
    var index = section.items.indexOf(item);
    section.items.splice(index, 1);
  }

  $scope.addSection = function() {
    var title = prompt("New Section Title");
    var new_section = { title: title, hours: 0, items: [] };
    $scope.addItem(new_section);
    $scope.quote.sections.push(new_section);
  }

  $scope.removeSection = function(section) {
    var index = $scope.quote.sections.indexOf(section);
    $scope.quote.sections.splice(index,1);
  }

  // Section hours calculations

  $scope.sumSectionHours = function(section) {
    var total = 0;
    section.items.forEach(function(item) {
      hours = isNaN(parseInt(item.hours)) ? 0 : parseInt(item.hours);
      total += hours;
    });
    section.hours = total;
  }

  $scope.sectionPmHours = function(section) {
    return section.hours * $scope.quote.pm_ratio;
  }

  $scope.sectionTotalHours = function(section) {
    return section.hours + $scope.sectionPmHours(section);
  }

  // Section totals calculations

  $scope.sectionSubtotal = function(section) {
    return section.hours * $scope.quote.rate;
  }

  $scope.sectionPmTotal = function(section) {
    return $scope.sectionPmHours(section) * $scope.quote.rate;
  }

  $scope.sectionTotal = function(section) {
    return $scope.sectionTotalHours(section) * $scope.quote.rate;
  }

  // Project calculations

  $scope.projectHoursSubtotal = function() {
    var total = 0;
    $scope.quote.sections.forEach(function(section) {
      total += parseInt(section.hours);
    });
    return total;
  }

  $scope.projectPmHours = function() {
    return $scope.projectHoursSubtotal() * $scope.quote.pm_ratio;
  }

  $scope.projectHoursTotal = function  () {
    return $scope.projectHoursSubtotal() + $scope.projectPmHours();
  }

  $scope.projectSubtotal = function() {
    return $scope.projectHoursSubtotal() * $scope.quote.rate;
  }

  $scope.projectPmTotal = function() {
    return $scope.projectPmHours() * $scope.quote.rate;
  }

  $scope.projectTotal = function() {
    return $scope.projectHoursTotal() * $scope.quote.rate;
  }

});