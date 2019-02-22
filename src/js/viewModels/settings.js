/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * qrscan module
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojbutton','data/globData', 'ojs/ojinputtext','ojs/ojlabel', 'ojs/ojbutton'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function settingsContentViewModel() {
        var self = this;
        self.bbuttonClick = function () {
            oj.Router.rootInstance.go('dashboard');
        };
        this.isRequired = ko.observable(true);

        this.helpDef = ko.observable("默认地址 - http://heng-ge.cn:8080");
        this.helpDef1 = ko.observable("默认地址 - http://129.213.58.21:4310");
        this.helpSource = ko.observable("this is help2");
        self.urlText = ko.observable(window.localStorage.getItem("HOST_URL"));
        self.urlText1 = ko.observable();

        self.info1  = ko.observable("-");
        self.info2  = ko.observable("-");
        self.info3  = ko.observable("-");
        self.info4  = ko.observable("-");
        self.info5  = ko.observable("-");

        console.log(window.localStorage.getItem("HOST_URL"));

        self.init = function(){
            $.ajax({
                type: "get",
                url: LocalURL + "/ynrsBlockChain/getBlockChainHost.do",
                beforeSend: function (XMLHttpRequest) {

                },
                success: function (data, textStatus) {
                    self.urlText1(data.BlockChainHost);
                },

                complete: function (XMLHttpRequest, textStatus) {

                },
                error: function () {
                    alert("后台报错setting");
                }
            });

            $.ajax({
                type: "get",
                url: LocalURL + "/ynrsBlockChain/getBlockChainInfo.do",
                beforeSend: function (XMLHttpRequest) {

                },
                success: function (data, textStatus) {
                   var result = JSON.parse(data).resultMsg;
                    self.info1(result.nodesRunning);
                    self.info2(result.nodesStopped);
                    self.info3(result.healthStatus);
                    self.info4(result.blocks);
                    self.info5(result.transactions);
                },

                complete: function (XMLHttpRequest, textStatus) {

                },
                error: function () {
                    alert("后台报错");
                }
            });
        }

        self.init();

        self.setBCinfo = function(){
            $.ajax({
                type: "get",
                url: LocalURL + "/ynrsBlockChain/setBlockChainHost.do?host=" + self.urlText1(),
                beforeSend: function (XMLHttpRequest) {

                },
                success: function (data, textStatus) {
                    window.localStorage.setItem("HOST_URL",self.urlText() );
                    alert("后台配置已保存");
                    window.location.reload();
                    oj.Router.rootInstance.go('login');
                },

                complete: function (XMLHttpRequest, textStatus) {

                },
                error: function () {
                    alert("后台报错");
                }
            });
        }
    }
    return settingsContentViewModel;
});
