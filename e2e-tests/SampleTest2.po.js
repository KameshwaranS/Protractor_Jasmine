'use strict';
/* global require, console */
let {ExpectedConditions} = require("protractor");

var SampleTest2Po = function () {

    this.nameField = element(by.css("[minlength='2']"));
    this.email = element(by.css("input[name='email']"));
    this.password = element(by.id("exampleInputPassword1"));
    this.checkBox = element(by.css("input[type='checkbox']"));
    this.submit = element(by.buttonText("Submit"));
    this.checkout = element(by.partialLinkText("Checkout"));
    this.btnCheckout = element(by.buttonText("Checkout"));
    this.country = element(by.css("#country"));



    this.selectItems = function (product) {
        //take 4 cards into list
        //go through each index in the list - and get the title= if title =desired title then in that index i will select add button
        element.all(by.tagName("app-card")).each(function (item) {

            item.element(by.css("h4 a")).getText().then(function (text) {
                if (text == product) {
                    item.element(by.css("button[class*='btn-info']")).click();
                }
            });
        });
    };

    this.registerPage = function (Name, Email, Password, Gender) {

        this.nameField.sendKeys(Name);
        this.email.sendKeys(Email);
        this.password.sendKeys(Password);
        this.checkBox.click();
        element(by.cssContainingText("[id='exampleFormControlSelect1'] option", Gender)).click();
        element.all(by.name("inlineRadioOptions")).first().click();
        this.submit.click().then(function () {
            element(by.css("div[class*='success']")).getText().then(function (text) {
                console.log(text);
                expect(text).toContain("The Form has been submitted successfully!");
            });
        });
        this.nameField.clear();
        this.nameField.sendKeys("M").then(function () {
            element(by.css("[class='alert alert-danger']")).getText().then(function (text) {
                console.log(text);
                expect(text).toContain("Name should be at least 2 characters");
            });
        });

    };

    this.countryDropdown = function (country) {

        var EC = ExpectedConditions;
        var condition = EC.elementToBeClickable(element(by.xpath("//a[.='" + country + "']")))
        browser.wait(condition, 30000);
        element(by.xpath("//a[.='" + country + "']")).click();
    };

    this.shop = function (product1, product2) {

        element(by.linkText("Shop")).click();
        this.selectItems(product1);
        this.selectItems(product2);

        element(by.partialLinkText("Checkout")).getText().then(function (text) {
            var res = text.split("(");
            var x = Number(res[1].trim().charAt(0));

            var y = x + 1;
            console.log(y);

            expect(x).toBe(2);
        });


    };

    this.checkoutAndPurchase = function (country) {

        this.checkout.click().then(function () {
            element(by.buttonText("Checkout")).click();
            element(by.css("#country")).sendKeys("IND").then(function () {
                var EC = ExpectedConditions;
                var condition = EC.elementToBeClickable(element(by.xpath("//a[.='" + country + "']")));
                browser.wait(condition, 30000);
                element(by.xpath("//a[.='" + country + "']")).click().then(function () {
                    element(by.className("btn btn-success btn-lg")).click().then(function () {
                        element(by.xpath("//div[@class='alert alert-success alert-dismissible']")).getText().then(function (text) {
                            console.log(text);
                            expect(text).toContain("Thank you! Your order will be delivered in next few weeks");
                        });
                    });

                });

            });
        });

    };

};
module.exports = SampleTest2Po;
