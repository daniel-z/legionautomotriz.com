/* global angular, $ */

var contactoLegionApp = angular.module('contactoLegionApp', ['ngRoute', 'ngAnimate']);

contactoLegionApp.controller('contactController', ['$scope', '$http',
  function ($scope, $http) {
    $.vegas('stop')
      ({
        src:'/images/home-slider/Audired.jpg'
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
      sign = "Legion Automotriz | Web Form ",
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
          "subject": "Legion Automotriz | Web Form",
          "from_email": $scope.emailForm.email,
          "from_name": $scope.emailForm.name,
          "to": [
            {
              "email": "ventas@legionautomotriz.com",
              "name": "Ventas | Legion Automotriz",
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
            console.log(data, status);
          }
          else if(data[0].status === 'sent') {
            $('.alert.alert-success').show();
          }
        }).
        error(function(data, status, headers, config) {
          $('.alert.alert-danger').show();
          console.log(data, status);
        });
    };

  }]);