/* global angular, $ */

var contactoLegionApp = angular.module('contactoLegionApp', []);

contactoLegionApp.controller('contactController', ['$scope', '$http',
  function ($scope, $http) {

    $scope.emailForm = {};

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

    // message: optional message text
    // status: request answer status
    $scope.showErrorMessage = function() {
      $('#general-form-messages p.error').show();
      $('#general-form-messages p.success').hide();
      $('#general-form-messages').show();
      console.log(message, status);
    }
    $scope.showSuccessMessage = function() {
      $('#general-form-messages p.success').show();
      $('#general-form-messages p.error').hide();
      $('#general-form-messages').show();
    }
    $scope.hideGeneralMessages = function() {
      $('#general-form-messages p').hide();
    }

    $scope.showSpinner = function() {
      $('#contact.page .spinner').show();
    }
    $scope.hideSpinner = function() {
      $('#contact.page .spinner').hide();
    }

    $scope.hideForm = function() {
      $('#contact-form').hide();
    }
    $scope.showForm = function() {
      $('#contact-form').show();
    };

    $scope.tryAgain = function() {
      $scope.hideGeneralMessages();
      $scope.showForm();
    };

    $scope.formSendInProgress = function() {
      $scope.hideForm();
      $scope.showSpinner();
    };

    $scope.sendEmail = function(emailData) {
      if (emailData.$invalid) { return; }

      var email = $scope.generateEmail(emailData);
      $scope.formSendInProgress();

      $http.post('https://mandrillapp.com/api/1.0/messages/send.json', email).
        success(function(data, status, headers, config) {
          $scope.hideSpinner();
          if(data[0].status === 'error' || data[0].status === 'rejected') {
            $scope.showErrorMessage();
          }
          else if(data[0].status === 'sent') {
            $scope.showSuccessMessage();
          }
        }).
        error(function(data, status, headers, config) {
          $scope.hideSpinner();
          $scope.showErrorMessage();
       });
    };

  }]);
