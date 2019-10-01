const { Given, When, Then } = require('cucumber');
const { client } = require('nightwatch-api');
const assert = require('assert');
const transliterationTextField = "//span[contains(@class,'TransliteratedList__Item')]";

Given('the user has browsed to the homepage', () => client.page.homePage().navigate());

Then('the transliteration should be {string}', (transliterationString) => {
	return client.page.homePage().getTransliterationString((actualTransliterationString) => {
		 assert.strictEqual(actualTransliterationString,transliterationString);
	});
});

Then('the transliteration should not be displayed', () => client.useXpath()
	.waitForElementNotPresent(transliterationTextField)
	.useCss());

Given('the user has selected the transliterated text', () => client.page.homePage().selectTheTransliteratedText());

When('the user selects the transliterated text', () => client.page.homePage().selectTheTransliteratedText());

