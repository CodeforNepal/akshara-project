const { Given, When, Then } = require('cucumber');
const { client } = require('nightwatch-api');

Given('the user has entered the string {string} into the main search field', (searchTerm) => client.page.homePage().userEntersTheString(searchTerm));
When('the user enters the string {string} into the main search field', (searchTerm) => client.page.homePage().userEntersTheString(searchTerm));

Given('the user has searched for the literature', () => client.page.homePage().searchForTheLiterature());
When('the user searches for the literature', () => client.page.homePage().searchForTheLiterature());

Then('the search result should be displayed', () => client.page.resultPage().searchResultDisplayed());
Then('the search result should not be displayed', () => client.page.resultPage().searchResultNotDisplayed());
