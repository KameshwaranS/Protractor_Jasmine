'use strict';

var SampleTest1Po = function () {

    this.selectedProduct = element(by.css("h4 > [href='#']"));
    this.btncontinueShopping = element(by.css(".btn-default"));
    this.btnCheckout = element(by.partialLinkText("Checkout"));

    this.selectItems = function (product) {

        element.all(by.tagName("app-card")).each(function (item) {
            item.element(by.css("h4 a")).getText().then(function (text) {
                if (text == product) {
                    item.element(by.css("button[class*='btn-info']")).click();
                }
            });
        });

    };

    this.shoppingCart = function (product) {
        var deferred = protractor.promise.defer();
        element(by.linkText("Shop")).click();
        this.selectItems(product);

        element(by.partialLinkText("Checkout")).getText().then(function (text) {
            deferred.fulfill(true);
            var res = text.split("(");
            var x = Number(res[1].trim().charAt(0));
            expect(x).toBe(1);

        }, function (err) {
            deferred.reject(err);
        }).catch(function (err) {
            throw new Error(" Error message : " + err.message);
        });
        return deferred.promise;

    };


};
module.exports = SampleTest1Po;