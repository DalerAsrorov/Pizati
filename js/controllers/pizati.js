// PizatiCtrl
angular
  .module('app')
  .controller('PizatiCtrl', function($http) {
    var vm = this;
    vm.test = "Test";
    vm.title = "Pizati";
    vm.currentEssay = "Argumentative Essay";

    var options = {
      debug: 'info',
      modules: {
        toolbar: '#toolbar'
      },
      placeholder: 'Compose an epic...',
      readOnly: true,
      theme: 'snow'
    };

    var quill = new Quill('#editor', {
      modules: {
        toolbar: '#toolbar',
        syntax: true,
        history: {
          delay: 2000,
          maxStack: 500,
          userOnly: true
        }
      },
      // placeholder: "Start writing your amazing essay...",
      //readOnly: true,
      theme: 'snow'
    });

    // disable input
    quill.enable(false);

    function retrieveEssays(url, callback) {
      $http({
        method: "GET",
        url: url
      }).then(
        function(data) {
          if(data.statusText === "OK")
            callback(data);
          else
            callback(new Error("data is missing"));
        },
        function(error) {
          return new Error("Couldn't fetch data: ", error);
        })
    };

    var essasyApiUrl = 'essays.json';

    vm.customEssayButtons = [
      {
        name: "Outline",
        performMethod: function() {

        }
      },
      {
        name: "Introduction",
        performMethod: function() {

        }
      },
      {
        name: "Body",
        performMethod: function() {

        }
      },
      {
        name: "Conclusion",
        performMethod: function() {

        }
      },
      {
        name: "Work Cited",
        performMethod: function() {

        }
      }
    ];

    retrieveEssays(essasyApiUrl, function(response) {
      vm.authrEssayDataStructure = response.data.essays;
    });

    // this methodshow buttons, tooltips, and commands
    vm.startTutorial = function() {
      vm.essayStarted = true;
      quill.enable();
    };

});
