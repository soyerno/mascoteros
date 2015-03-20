'use strict';

angular.module('pets').directive('qr',[ '$http',
	function($http) {
		return {
			templateUrl: '/modules/pets/views/qr.client.view.html',
			restrict: 'E',
			replace: true,
			scope: {
				pet: '='
			},
			link: function postLink(scope, element, attr) {

        element.bind('click', function() {
          alert('hola');
          //var printContents = document.getElementById(divName).innerHTML;
          var popupWin = window.open('', '_blank', 'width=300,height=300');
          popupWin.document.open()
          popupWin.document.write('<html><head>' +
          '<link rel="stylesheet" type="text/css" href="public/modeules/core/css/core.css" /> <link rel="stylesheet" type="text/css" href="public/modeules/core/css/datePicker.css" /> <link rel="stylesheet" type="text/css" href="public/modeules/core/css/landing.css" /> <link rel="stylesheet" type="text/css" href="public/modeules/core/css/pets.css" /> <link rel="stylesheet" type="text/css" href="public/modeules/core/css/offsidebar-tab-1.css" /> <link rel="stylesheet" type="text/css" href="public/application.min.css" /> <link rel="stylesheet" type="text/css" href="public/modules/pets/css/qr.css" /></head><body style=\'background-color: #f00\' onload="window.print()">' + element.html() + '</html>');
          popupWin.document.close();
        });


          scope.svg = "";

				$http.get('/qr/' + scope.pet.slug).
					success(function(data, status, headers, config) {
						// this callback will be called asynchronously
						// when the response is available
						scope.svg = data;
					}).
					error(function(data, status, headers, config) {
						// called asynchronously if an error occurs
						// or server returns response with an error status.
						console.log('ERROR');
					});

			}
		};
	}
]);

(function (angular) {
  'use strict';
  function printDirective() {
    var printSection = document.getElementById('printSection');
    // if there is no printing section, create one
    if (!printSection) {
      printSection = document.createElement('div');
      printSection.id = 'printSection';
      document.body.appendChild(printSection);
    }
    function link(scope, element, attrs) {
      element.on('click', function () {
        var elemToPrint = document.getElementById(attrs.printElementId);
        if (elemToPrint) {
          printElement(elemToPrint);
        }
      });
      window.onafterprint = function () {
        // clean the print section before adding new content
        printSection.innerHTML = '';
      }
    }
    function printElement(elem) {
      // clones the element you want to print
      var domClone = elem.cloneNode(true);
      printSection.appendChild(domClone);
      window.print();
    }
    return {
      link: link,
      restrict: 'A'
    };
  }
  angular.module('app').directive('ngPrint', [printDirective]);
}(window.angular));;
