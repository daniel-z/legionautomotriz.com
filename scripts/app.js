/* global angular, $ */

var theAutoBodyShopApp = angular.module('theAutoBodyShopApp', ['ngRoute', 'ngAnimate']);

theAutoBodyShopApp.directive('onFinishRender',
  function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        if (scope.$last === true) {
          $timeout(function () {
            scope.$emit('ngRepeatFinished');
          });
        }
      }
    };
  });

theAutoBodyShopApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'homeController'
    }).
    when('/contact', {
      templateUrl: 'partials/contact.html',
      controller: 'contactController'
    }).
    otherwise({
      redirectTo: '/home'
    });
}]);

// HOME PAGE
theAutoBodyShopApp.controller('homeController', ['$scope', '$http',
  function ($scope, $http) {
    var backgroundConfig = $http.get('data/home-slider-data.json');
    $scope.page = "home";

    backgroundConfig.success(function(data) {
      $scope.backgrounds = data;
      $.vegas('destroy')
      ('slideshow', {
        delay:3000,
        backgrounds: $scope.backgrounds
      })('overlay');
    });
  }]);

// CONTACT PAGE
theAutoBodyShopApp.controller('contactController', ['$scope', '$http',
  function ($scope, $http) {
    $.vegas('stop')
      ({
        src:'/images/home-slider/FORDMATTE.jpg'
      })('overlay');

    $scope.emailForm = {};

    $scope.cleanForm = function() {
      $scope.emailForm = {};
    };

    $scope.generateMessage = function(emailData) {
      var
      name = "Nombre: " + emailData.name,
      email = "Email: " + emailData.email,
      telefono = "Teléfono: " + emailData.phone,
      mensaje = "Mensaje: " + emailData.message,
      sign = "Legion | The Auto Body Shop | Web Form ",
      lineBreak = {
        html:"<br/>",
        text: "\n"
      },

      htmlEmailTemplate = "<p>" + name + lineBreak.html + email + lineBreak.html +
      telefono + lineBreak.html + "</p>" + "<p>"+ mensaje + "</p>" + "<p>" + sign +"</p>",

      textEmailTemplate = lineBreak.text +
        name + lineBreak.text + email + lineBreak.text + telefono + lineBreak.text +
        lineBreak.text + mensaje + lineBreak.text +
        lineBreak.text + sign + lineBreak.text;

      return {
        "html": htmlEmailTemplate,
        "text": textEmailTemplate
      };
    };


    $scope.generateEmail = function(emailData) {
      var testKey = 'IUNZeo_PpN26eaINR5HDrw',
      realKey = 'LGI6bAvlRP9LBKpYjwKGFg',
      message = $scope.generateMessage(emailData);

      return {
        "key": realKey,
        "message": {
          "html": message.html || undefined,
          "text": message.text || undefined,
          "subject": "The Auto Body Shop | Web Form",
          "from_email": $scope.emailForm.email,
          "from_name": $scope.emailForm.name,
          "to": [
            {
              "email": "ventas@theautobodyshop.mx",
              "name": "Ventas | The Auto Body Shop",
              "type": "to"
            }
          ],
          "headers": {
            "Reply-To": $scope.emailForm.email
          }
        }
      };
    };

    $scope.sendEmail = function(emailData) {
      if(emailData.$invalid) {
        return;
      }

      var email = $scope.generateEmail(emailData);

      $http.post('https://mandrillapp.com/api/1.0/messages/send.json', email).
      success(function(data, status, headers, config) {
        if(data[0].status === 'error' || data[0].status === 'rejected') {
          $('.alert.alert-danger').show();
        }
        else if(data[0].status === 'sent') {
          $('.alert.alert-success').show();
        }
      }).
      error(function(data, status, headers, config) {
        $('.alert.alert-danger').show();
      });
    };

  }]);