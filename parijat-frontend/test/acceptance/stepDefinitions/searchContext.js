const { Given, When, Then } = require('cucumber');
const { client } = require('nightwatch-api');
const searchField = "//input[contains(@class, 'SearchBox')]";
const searchButton = "//button[contains(@class,'SearchBox__Button')]";
const searchResultFoundContainer = '.sk-hits';
const searchResultNotFoundContainer = '.sk-no-hits';

const userEntersTheEnglishOrNepaliCharacters = (searchTerm) => client.useXpath()
	.waitForElementVisible(searchField)
	.setValue(searchField, searchTerm)
	.useCss();

const userSearchesForTheLiterature = () => client.useXpath()
	.click(searchButton)
	.useCss();

Given('the user has entered the string {string} into the main search field', userEntersTheEnglishOrNepaliCharacters);
When('the user enters the string {string} into the main search field', userEntersTheEnglishOrNepaliCharacters);


Given('the user has searched for the literature', userSearchesForTheLiterature);
When('the user searches for the literature', userSearchesForTheLiterature);

Then('the search result should be displayed', () => client.waitForElementVisible(searchResultFoundContainer)
	.waitForElementNotPresent(searchResultNotFoundContainer));

Then('the search result should not be displayed', () => client.waitForElementVisible(searchResultNotFoundContainer)
	.waitForElementNotPresent(searchResultFoundContainer));
