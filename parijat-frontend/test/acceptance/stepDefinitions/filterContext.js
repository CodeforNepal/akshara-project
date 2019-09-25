const {Given, When, Then} = require('cucumber')
const {client} = require('nightwatch-api')
const util = require('util')
const assert = require('assert')
const authorRefinementOptionContainer = "((//div[contains(@class, 'Filters__Desktop')]//span)[text()='%s'])"
const authorNameCheckBox = authorRefinementOptionContainer + '/preceding-sibling::input'
const authorRefinementCount = authorRefinementOptionContainer + '/following-sibling::span'
const searchItemAuthorName = "//div[contains(@class,'SearchItem__Author')]"
const searchResultCountInfo = "//div[contains(@class,'sk-hits-stats__info')]"

When('the user filters the results based on author {string}', (authorName) => {
	const formattedAuthorNameCheckBox = util.format(authorNameCheckBox, authorName)
	return client.useXpath()
		.waitForElementVisible(formattedAuthorNameCheckBox)
		.click(formattedAuthorNameCheckBox)
		.useCss();
});


Then('the result should only show the literature written by {string}', async (authorName) => {
	client.globals.retryAssertionTimeout = 5000
	const regex = /\d+/gm;
	let filterCountResultMsg = '%s नतिजा'
	const formattedAuthorRefinementCount = util.format(authorRefinementCount, authorName)

	const waitToGetResultCount = new Promise(resolve => client.useXpath()
		.getText(formattedAuthorRefinementCount, (countResult) => {
			const valueToFilter = countResult.value;
			const found = valueToFilter.match(regex)
			filterCountResultMsg = util.format(filterCountResultMsg, found[0])
			resolve();
		}))

	await waitToGetResultCount

	return client.useXpath()
		.assert
		.containsText(searchResultCountInfo, filterCountResultMsg)
		.elements('xpath', searchItemAuthorName, (result) => {
			const elementIDs = result.value
			elementIDs.forEach((elementID) => {
				client.elementIdText(elementID.ELEMENT, (elementText) => {
					assert.strictEqual(elementText.value, authorName);
				});
			});
		});
});
