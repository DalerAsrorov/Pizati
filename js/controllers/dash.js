// PizatiCtrl
angular
  .module('app')
  .controller('DashCtrl', function() {
    var vm = this;
    vm.title = "Pizati";
    console.log("dashboard page...");

    vm.essayTutorials = [
      {
        name: "Argumentative Essay"
      },
      {
        name: "Analysis Essay"
      },
      {
        name: "Persuasive Essay"
      },
      {
        name: "Descriptive Essay"
      },
      {
        name: "Something Else Essay"
      },
      {
        name: "Whatever Essay"
      },
      {
        name: "Summary Essay"
      },
      {
        name: "Perspective Essay"
      }
    ];

    vm.classesList = [
      {
        section: "234324",
        course: "Into to OS",
        professor: "Michael Shindler",
        option: ""
      },
      {
        section: "3424234",
        course: "Artificial Intelligence",
        professor: "Sven Koenig",
        option: ""
      },
      {
        section: "54325435",
        course: "Probability & Statistics",
        professor: "Jeffrey Mendel",
        option: ""
      },
      {
        section: "14325435",
        course: "Art History",
        professor: "Roberto Rodriguez",
        option: ""
      }
    ];

    vm.existingProjectsList = [
      {
        id: "DFF3424",
        "class": "WRIT 340",
        "progress": "80",
        "progressType": "%"
      },
      {
        id: "UIRE3424",
        "class": "ECON 201",
        "progress": "30",
        "progressType": "%"
      }
    ];

    var originalExpandHeight = document.getElementById('tutorialsWrapper').clientHeight;
    vm.expandContract = function() {
      var divID = 'tutorialsWrapper';
      $("#expandEssaysSpan").toggleClass("glyphicon glyphicon-triangle-bottom glyphicon glyphicon-triangle-top");
      var clientHeight = document.getElementById(divID).clientHeight;
      console.log(clientHeight);
      if(clientHeight !== 450) {
        console.log(clientHeight);
        $("#"+divID).animate({
          height: "450px"
        }, 500);
      } else {
        console.log('height', clientHeight);
        $("#"+divID).animate({
          height: originalExpandHeight + "px"
        }, 500);
      }

    }

});
