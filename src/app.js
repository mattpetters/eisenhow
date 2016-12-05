var app = angular.module('app', []);


app.controller('appController', function(){
        
        this.getResult = function(){
            this.result = (this.cash - this.save) / this.days;
        }
});