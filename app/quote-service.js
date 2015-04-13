app.service("quoteService", function($http, $q) {

  // Set authentication headers
  var ParseAuthHeaders = {
    'X-Parse-Application-Id' : '7iUSygrqwXcxm2XhomZX4OHXmn1oNp0yNPORN6pA',
    'X-Parse-REST-API-Key' : 'mvP0oGQXBCgEx3rTVO7AGYAX59blZM46ASMXoD8r'
  }

  // Set the base API URL
  var ApiUrl = 'https://api.parse.com/1/classes/Quote';

  // Return public API
  return ({
    getQuotes: getQuotes,
    getQuote: getQuote,
    createQuote: createQuote,
    updateQuote: updateQuote,
    deleteQuote: deleteQuote
  });

  // ---
  // PUBLIC METHODS
  // ---

  // Get a list of all available quotes
  function getQuotes() {
    var request = $http({
      method: "get",
      url: ApiUrl,
      headers: ParseAuthHeaders,
      params: {
        keys: 'customer,title,template'
      }
    });
    console.log('Getting the list of all quotes from Parse');

    return(request.then(handleSuccess, handleError));
  }

  // Get a specific quote
  function getQuote(objectId) {
    var request = $http({
      method: "get",
      url: ApiUrl + "/" + objectId,
      headers: ParseAuthHeaders
    });
    console.log('Getting the "' + objectId + '" quote from Parse');

    return(request.then(handleSuccess, handleError));
  }

  // Create a brand new quote
  function createQuote(quote) {
    var request = $http({
      method: "post",
      url: ApiUrl,
      headers: ParseAuthHeaders,
      data: {
        customer: quote.customer,
        pm_percent: parseInt(quote.pm_percent),
        rate: parseInt(quote.rate),
        sections: quote.sections,
        title: quote.title
      }
    });
    console.log('Creating new quote on Parse');

    return(request.then(handleSuccess, handleError));
  }

  // Save a specific quote
  function updateQuote(objectId, quote) {
    var request = $http({
      method: "put",
      url: ApiUrl + "/" + objectId,
      headers: ParseAuthHeaders,
      data: {
        customer: quote.customer,
        pm_percent: parseInt(quote.pm_percent),
        rate: parseInt(quote.rate),
        sections: quote.sections,
        title: quote.title
      }
    });
    console.log('Saving the "' + objectId + '" quote on Parse');

    return(request.then(handleSuccess, handleError));
  }

  // Delete a specific quote
  function deleteQuote(objectId) {
    var request = $http({
      method: "delete",
      url: ApiUrl + "/" + objectId,
      headers: ParseAuthHeaders,
    });
    console.log('Deleting the "' + objectId + '" quote on Parse');

    return(request.then(handleSuccess, handleError));
  }

  // ---
  // PRIVATE METHODS
  // ---

  // I transform the error response, unwrapping the application data from the API response payload.
  function handleError(response) {
    // The API response from the server should be returned in a
    // nomralized format. However, if the request was not handled by the
    // server (or what not handles properly - ex. server error), then we
    // may have to normalize it on our end, as best we can.
    console.log('Could not get data from Parse: ' + response.data.error)
    if (!angular.isObject(response.data) || !response.data.error) {
      return( $q.reject( "An unknown error occurred." ) );
    }
    // Otherwise, use expected error message.
    return($q.reject(response.data.error));
  }

  // I transform the successful response, unwrapping the application data from the API response payload.
  function handleSuccess(response) {
    console.log('Got data successfully from Parse.')
    return(response.data);
  }
});