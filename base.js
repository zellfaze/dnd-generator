$(document).ready( function() {
  //Reset advanced log
  $('#advancedOutput').val('');
  
  logToAdvanced('==Application Initialization==');
  logToAdvanced('Determining if application is local or remote...');
  var appLocation;
  if (document.location['protocol'] == 'file:') {
    appLocation = 'local';
  } else {
    appLocation = 'remote';
  }
  logToAdvanced('Application is ' + appLocation);
  
  logToAdvanced('Looking for extra definitions...');
  //We can make these asynchronous, but we can't continue until they are all
  //  done.
  var outstandingRequests = 2;
  if (appLocation == 'local') {
    $.getJSON( "file://C:/wamp/www/dnd/extras/dieties.json", function( data ) {
      logToAdvanced('Found diety definitions');
      window.dietyDefinitions = data;
    }).fail( function() {
      logToAdvanced('No diety definitions found');
      window.dietyDefinitions = null;
    }).always( function() {
      outstandingRequests--;
      completedRequests();
    });
    $.getJSON( "file://C:/wamp/www/dnd/extras/languages.json", function( data ) {
      logToAdvanced('Found language definitions');
      window.languageDefinitions = data;
    }).fail( function() {
      logToAdvanced('No language definitions found');
      window.languageDefinitions = null;
    }).always( function() {
      outstandingRequests--;
      completedRequests();
    });
  } else {
    $.getJSON( "extras/dieties.json", function( data ) {
      logToAdvanced('Found diety definitions');
      window.dietyDefinitions = data;
    }).fail( function() {
      logToAdvanced('No diety definitions found');
      window.dietyDefinitions = null;
    }).always( function() {
      outstandingRequests--;
      completedRequests();
    });
    $.getJSON( "extras/languages.json", function( data ) {
      logToAdvanced('Found language definitions');
      window.languageDefinitions = data;
    }).fail( function() {
      logToAdvanced('No language definitions found');
      window.languageDefinitions = null;
    }).always( function() {
      outstandingRequests--;
      completedRequests();
    });
  }
  
  //This will run once all the requests are done
  function completedRequests() {
      if (outstandingRequests == 0) {
        logToAdvanced('All extra definitions loaded');
        
        //Add sections of interface that were waiting on data here.
        
        //Application is all set up, we can display the generate button now!
        logToAdvanced('Application initialized!');
        $("#generate").show();
      }
  }
});

//Logs information to the advanced section at the bottom of the page
function logToAdvanced(textToLog) {
  var oldText = $('#advancedOutput').val();
  var newText = oldText + textToLog + "\n";
  $('#advancedOutput').val(newText);
}

//Given an array of items and their weights, selects a random item
function weightedRandom(arrayOfWeightedData) {
  
}

