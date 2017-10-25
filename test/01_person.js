var Person = artifacts.require("Person");
chai = require ("chai");
chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

expect = chai.expect;

contract("Testing the Person contract", function (accounts) {
	describe("Deploy the Person contract" , function () {
		it ("Get an instance of the Person contract", function(){
			return Person.new().then( function (instance){
				personContract = instance;
			})
		});
	});

	describe("Test the contract variables", function() {
		describe("Variable: name", function() {
		    it("Use setName to set a first name" , function(){
		        return personContract.setName("María").then ( function(response){
		            expect(response).to.not.be.an("error");
		        });
		    });

            it("Check the first name was set properly" , function(){
                return personContract.name().then ( function(response){
                    expect(response.toString()).to.be.equal("María");
                });
            });

            it("Use setName to reject the call from another account" , function(){
                return expect(personContract.setName("Juan" , {"from" : accounts[1]})).to.be.eventually.rejected;
            });

            it("Check the first name is still the given one originally" , function(){
                return personContract.name().then ( function(response){
                    expect(response.toString()).to.be.equal("María");
                });
            });
		});
	});
});

/*

            it("Use setName to set a second name" , function(){
                return personContract.setName("Juan").then ( function(response){
                    expect(response.toString()).to.not.be.an("error");
                });
            });

            it("Check the second name was set properly" , function(){
                return personContract.name().then ( function(response){
                    expect(response.toString()).to.be.equal("Juan");
                });
            });



	describe("Test the contract variables", function() {

		it("The name variable is Ciklopo" , function(){
			return personContract.name().then ( function(response) {
				expect(response.toString()).to.be.equal("Ciklopo");
			});
		});
	});

*/