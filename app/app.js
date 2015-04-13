var blank_quote = {
  title: 'Project',
  customer: 'Customer',
  rate: 105,
  pm_percent: 20,
  template: false,
  sections: []
};

var app = angular.module('estimatr', []);

app.controller('EstimatrController', function($scope, quoteService) {

  $scope.quote = blank_quote;
  $scope.availableQuotes = [];
  $scope.currentQuote = '';
  $scope.activeQuote = false;

  loadAvailableQuotes();

  // ---
  // PUBLIC METHODS.
  // ---

  $scope.getQuotes = function() {
    loadAvailableQuotes();
  }

  $scope.getQuote = function() {
    quoteService.getQuote($scope.currentQuote)
      .then(function(quote) {
        $scope.quote = quote;
        $scope.quote.pm_ratio = ($scope.quote.pm_percent / 100);
        $scope.activeQuote = true;
      });
  }

  $scope.saveQuote = function() {
    if ($scope.quote.template) {
      alert('This is a template. Please save as a new quote.');
    } else {
      quoteService.updateQuote($scope.currentQuote, $scope.quote)
        .then(function(response) {
          $scope.quote.updatedAt = response.updatedAt;
          loadAvailableQuotes();
      });
    };
  }

  $scope.saveNewQuote = function() {
    $scope.quote.template = false;
    quoteService.createQuote($scope.quote)
      .then(function(response) {
        $scope.currentQuote = response.objectId;
        loadAvailableQuotes();
    });
  }

  $scope.deleteQuote = function() {
    if ($scope.quote.template) {
      alert('Sorry, it is not possible to delete a template.');
    } else {
      quoteService.deleteQuote($scope.currentQuote)
        .then(function(response) {
          $scope.currentQuote = '';
          $scope.quote = blank_quote;
          $scope.activeQuote = false;
          loadAvailableQuotes();
      });
    };
  }

  // Quote settings

  $scope.adjustRate = function() {
    var rate = prompt("Hourly Rate ($)", $scope.quote.rate);
    $scope.quote.rate = rate;
  }

  $scope.adjustPmPercent = function() {
    var pm_percent = prompt("PM Ration (%)", $scope.quote.pm_percent);
    $scope.quote.pm_percent = pm_percent;
    $scope.quote.pm_ratio = ($scope.quote.pm_percent / 100);
  }

  $scope.adjustCustomer = function() {
    var customer = prompt("Customer Name", $scope.quote.customer);
    if (customer != null && customer.length > 0) {
      $scope.quote.customer = customer;
    };
  }

  $scope.adjustTitle = function() {
    var title = prompt("Title", $scope.quote.title);
    if (title != null && title.length > 0) {
      $scope.quote.title = title;
    };
  }

  // Quote content manipulation

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

  $scope.editSectionTitle = function(section_index) {
    var title = prompt("Section Title", $scope.quote.sections[section_index].title);
    $scope.quote.sections[section_index].title = title;
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

  // ---
  // PRIVATE METHODS
  // ---

  function loadAvailableQuotes() {
    quoteService.getQuotes()
      .then(function(response) {
        var label = '';
        var options = response.results.map(function(quote) {
          label = quote.customer + ' - ' + quote.title
          if (quote.template) {
            label = '(TPL) ' + label;
          }
          return {
            id: quote.objectId,
            title: label
          }
      });

      $scope.availableQuotes = options;
    });
  }

});
