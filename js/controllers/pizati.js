// PizatiCtrl
angular
  .module('app')
  .controller('PizatiCtrl', function($http, getEssayType) {
    var vm = this;
    var textEditorColor = '#002b36';
    vm.test = "Test";
    vm.title = "Pizati";
    vm.currentEssay = "Argumentative Essay";
    vm.authorEssayDataStructure = null;
    vm.essayType = getEssayType;
    console.log(vm.essayType);

    setEditorHeight();

    window.addEventListener("resize", function() {
      setEditorHeight();
    });

    function setEditorHeight() {
      var browserHeight = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
      var fixedEditorHeight = browserHeight * 0.90;
      console.log(fixedEditorHeight);
      document.getElementById("superDivEditor").style.height = (fixedEditorHeight + "px").toString();
    };

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

    function getEssay(id, givenArray) {
      givenArray.forEach(function(essay) {
        if(essay.id === id) {
          return essay;
        }
      });
    };

    function inputText(text) {
      console.log('text to input', text);
      quill.deleteText(0, text.length);
      quill.insertText(0, text, {
        'color': textEditorColor
      });
    };

    retrieveEssays(essasyApiUrl, function(response) {
      vm.authorEssayDataStructure = response.data.essays;
    });

    // this methodshow buttons, tooltips, and commands
    vm.startTutorial = function() {
      vm.essayStarted = true;
      quill.enable();
    };

    // shows essay text associated with associated id
    vm.showRespectveEssay = function(essayId) {
      console.log('essay id', essayId);
      var arrayP = vm.authorEssayDataStructure;

      arrayP.forEach(function(element) {
        if(element.id === essayId) {
          console.log(element);
          inputText(element.essay.text);
        }
      });

    };

});
