/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * t1 module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojarraydataprovider', 'data/globData', 'ojs/ojknockout', 'promise', 'ojs/ojtable','ojs/ojcollectiontabledatasource'
], function (oj, ko, $, ArrayDataProvider) {
    /**
     * The view model for the main content view template
     */
    function t2ContentViewModel() {
        var self = this;
        self.username = ko.observable();
        self.gender = ko.observable();
        self.personId = ko.observable();
        self.idNumber = ko.observable();
        self.curPayStatus = ko.observable();
        self.payMonth = ko.observable();
        self.nowInsuredUnit = ko.observable();
        self.insuredStartDate = ko.observable();
        self.insuredUnit = ko.observable();
        self.managementInstitution = ko.observable();
        self.insuranceType = ko.observable();
        self.ciphertext = ko.observable();

        // self.allItems = ko.observable([]);
        // self.collection = ko.observable(new oj.Collection(self.allItems()));
        // self.dataSource = ko.observable(new oj.CollectionTableDataSource(self.collection()));

        self.deptArray = ko.observableArray([]);
        self.columns = ko.observableArray([
            {
                headerText: '年',
                field: 'year'
            },
            {
                headerText: '月',
                field: 'month'
            },
            {
                headerText: '缴费基数',
                field: 'paymentBase'
            },
            {
                headerText: '单位缴费',
                field: 'unitPay'
            },
            {
                headerText: '个人缴费',
                field: 'personPay'
            },
            {
                headerText: '缴费情况',
                field: 'payStatus'
            },
        ]);
        self.dataprovider = ko.observable(new ArrayDataProvider(self.deptArray()));


        self.initWithValues = function () {
            self.username(glData.credentialsInfo.credEndowmentHead.username);
            self.gender(glData.credentialsInfo.credEndowmentHead.gender);
            self.personId(glData.credentialsInfo.credEndowmentHead.personId);
            self.idNumber(glData.credentialsInfo.credEndowmentHead.idNumber);
            self.curPayStatus(glData.credentialsInfo.credEndowmentHead.curPayStatus);
            self.payMonth(glData.credentialsInfo.credEndowmentHead.payMonth);
            self.nowInsuredUnit(glData.credentialsInfo.credEndowmentHead.nowInsuredUnit);
            self.insuredStartDate(glData.credentialsInfo.credEndowmentHead.insuredStartDate);
            self.insuredUnit(glData.credentialsInfo.credEndowmentHead.insuredUnit);
            self.managementInstitution(glData.credentialsInfo.credEndowmentHead.managementInstitution);
            self.insuranceType(glData.credentialsInfo.credEndowmentHead.insuranceType);
            self.ciphertext(glData.ciphertext);

            var arrObj = glData.credentialsInfo.credEndowmentDetail;
            // self.collection().reset(arrObj);
            self.dataprovider(new ArrayDataProvider(arrObj, {keyAttributes: 'id'}));
        };
    }

    return new t2ContentViewModel;
});
