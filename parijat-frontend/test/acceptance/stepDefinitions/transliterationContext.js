const { Given, When, Then } = require('cucumber')
const { client } = require('nightwatch-api')
const transliterationTextField = "//span[contains(@class,'TransliteratedList__Item')]"
const assert = require('assert')

const userSelectsTheTransliteratedText = () => client.useXpath()
	.waitForElementVisible(transliterationTextField)
	.click(transliterationTextField)
	.useCss()

Given('the user has browsed to the homepage', () => client.url(client.launch_url));

Then('the transliteration should be {string}', (transliterationString) => client.useXpath()
	.waitForElementVisible(transliterationTextField)
	.getText(transliterationTextField, (result) => {
		assert.strictEqual(result.value, transliterationString);
	})
	.useCss());

Then('the transliteration should not be displayed', () => client.useXpath()
	.waitForElementNotPresent(transliterationTextField)
	.useCss());

Given('the user has selected the transliterated text', userSelectsTheTransliteratedText);


When('the user selects the transliterated text', userSelectsTheTransliteratedText);

