/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * t1 module
 */
define(['ojs/ojcore', 'knockout','data/globData'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function t1ContentViewModel() {
        var self = this;
        self.username = ko.observable();
        self.gender = ko.observable();
        self.personId = ko.observable();
        self.idNumber = ko.observable();
        self.birthDate = ko.observable();
        self.insuredUnit = ko.observable();
        self.insuredStartDate = ko.observable();
        self.insuredStopDate = ko.observable();
        self.payMonth = ko.observable();
        self.payYear = ko.observable();
        self.ciphertext = ko.observable();

        self.initWithValues = function(){

            self.username(glData.credentialsInfo.username);
            self.gender(glData.credentialsInfo.gender);
            self.personId(glData.credentialsInfo.personId);
            self.idNumber(glData.credentialsInfo.idNumber);
            self.birthDate(glData.credentialsInfo.birthDate);
            self.insuredUnit(glData.credentialsInfo.insuredUnit);
            self.insuredStartDate(glData.credentialsInfo.insuredStartDate);
            self.insuredStopDate(glData.credentialsInfo.insuredStopDate);
            self.payMonth(glData.credentialsInfo.payMonth);
            self.payYear(glData.credentialsInfo.payYear);
            self.ciphertext(glData.ciphertext);

        };
    }
    
    return new t1ContentViewModel;
});
