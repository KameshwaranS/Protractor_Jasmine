/* global require, console, process  */
/*global describe, it, beforeAll, beforeEach, afterAll, afterEach */
'use strict';

var SampleTest1Po = require('./SampleTest1.po.js');
var sampleTest1Po = new SampleTest1Po();
var testData = require('./TestData/TestData_SampleTest1.json');

describe('TestSuite1',function(){

    beforeAll(function() {
        console.log('calling before all');
        browser.get("https://qaclickacademy.github.io/protocommerce/");
    });


    it('TS1: Select the product from shop Menu and it to the Cart', function () {

        sampleTest1Po.shoppingCart(testData.productName1).then(function () {
            sampleTest1Po.btnCheckout.click();
            expect((sampleTest1Po.selectedProduct).getText()).toBe(testData.productName1);
        });
    });

    it('Ts2: Continue shopping and add another product to the cart  ', function () {

        sampleTest1Po.btncontinueShopping.click().then(function (){
            sampleTest1Po.shoppingCart(testData.productName2).then(function () {
                sampleTest1Po.btnCheckout.click();
                expect((sampleTest1Po.selectedProduct).getText()).toBe(testData.productName2);
            });
        });

    });

});