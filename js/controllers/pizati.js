// PizatiCtrl
angular
  .module('app')
  .controller('PizatiCtrl', function($http, getEssayType) {
    var vm = this;
    var textEditorColor = '#002b36';
    var essayStructureMap = {};
    vm.test = "Test";
    vm.title = "Pizati";
    vm.currentEssay = "Argumentative Essay";
    vm.authorEssayDataStructure = null;
    vm.essayType = getEssayType;
    console.log(vm.essayType);

    initEditor();

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
      loadFirstEssay();
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

    vm.highlightText = function(essayElementName) {
      var lowercaseName = essayElementName.toLowerCase();
      var editorDivChildren = $("#editor").find("p");
      var redElements = document.querySelectorAll('#editor p');
      console.log('redElements', redElements);

      switch(lowercaseName)
      {
          case "introduction":
            clearAllHighlights(redElements);
            highlightIntro(redElements);
            break;
          case "body":
            essayStructureMap[lowercaseName] = [];
            clearAllHighlights(redElements);
            highLightBody(redElements);
            break;
          case "conclusion":
            clearAllHighlights(redElements);
            highlightConclusion(redElements);
            break;
          default:
            console.log("didn't find associate essay element.");
      }
    }

    function loadFirstEssay() {
        loadEssay(0);
    }

    function loadEssay(index) {
      var dataStr = vm.authorEssayDataStructure;
      inputText(dataStr[index].essay.text);
    }

    function initEditor() {
      setEditorHeight();
    }

    function highlightTextOn(element) {
      element.style.background = "#e0ebff"
    }

    function clearAllHighlights(collection) {
      collection.forEach(function(node) {
        node.removeAttribute('style');
      });
    }

    function highLightBody(collection) {
      if(collection.length <= 1)
        return;

      var start = findFirstIndex(collection);

      var lastIndex = findLastIndex(collection);
      for(var i = start; i < lastIndex; ++i) {
        console.log(collection[i].innerText);
        highlightTextOn(collection[i]);
      }
    }

    function highlightConclusion(collection) {
      var lastIndex = findLastIndex(collection);
      for(var i = lastIndex + 1; i < collection.length; i++) {
          highlightTextOn(collection[i]);
      }
    }

    function highlightIntro(collection) {
      var firstIndex = findFirstIndex(collection);
      console.log(firstIndex);
      for(var i = 0; i < firstIndex - 1; ++i) {
        highlightTextOn(collection[i]);
      }
    }

    function findFirstIndex(collection) {
      var start = 0;
      for(var i = 0; i < collection.length; ++i) {
        if (collection[i].innerText == "\n") {
          start = i + 1;
          break;
        }
      }
      return start;
    }

    function findLastIndex(collection) {
      var lastIndex = collection.length - 3; // last paragraph.
      for(var i = lastIndex; i > 0; i++) {
        console.log(collection[i]);
        if(collection[i].innerText == "\n")
          return i;
      }
      return lastIndex;
    }

});
