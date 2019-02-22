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
    function t3ContentViewModel() {
        var self = this;

        self.name = ko.observable();
        self.address = ko.observable();
        self.registrationNumber = ko.observable();
        self.legalPerson = ko.observable();
        self.registeredCapital = ko.observable();
        self.businessScope = ko.observable();
        self.companyType = ko.observable();
        self.operatingPeriodStart = ko.observable();
        self.issueDate = ko.observable();
        self.ciphertext = ko.observable();


        self.initWithValues = function(){
            self.name(glData.credentialsInfo.name);
            self.address(glData.credentialsInfo.address);
            self.registrationNumber(glData.credentialsInfo.registrationNumber);
            self.legalPerson(glData.credentialsInfo.legalPerson);
            self.registeredCapital(glData.credentialsInfo.registeredCapital);
            self.businessScope(glData.credentialsInfo.businessScope);
            self.companyType(glData.credentialsInfo.companyType);
            self.operatingPeriodStart(glData.credentialsInfo.operatingPeriodStart);
            self.issueDate(glData.credentialsInfo.issueDate);
            self.ciphertext(glData.ciphertext);
        };
    }
    
    return new t3ContentViewModel;
});
