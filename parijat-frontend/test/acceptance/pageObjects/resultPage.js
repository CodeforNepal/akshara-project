const util = require('util');
module.exports = {
	commands: {
		searchResultDisplayed() {
			return this.waitForElementVisible('@searchResultFoundContainer')
				.waitForElementNotPresent('@searchResultNotFoundContainer');
		},
		searchResultNotDisplayed() {
			return this.waitForElementVisible('@searchResultNotFoundContainer')
				.waitForElementNotPresent('@searchResultFoundContainer');
		},
		filterResultBasedOnAuthor(authorName) {
			const formattedAuthorNameCheckBox = util.format(this.elements.authorNameCheckBox.selector, authorName)
			return this.useXpath().waitForElementVisible(formattedAuthorNameCheckBox)
				.click(formattedAuthorNameCheckBox)
				.useCss();
		},
		async getAllAuthorsFromResultList(authorName, callback) {
			this.api.globals.retryAssertionTimeout = 5000
			const regex = /\d+/gm;
			let filterCountResultMsg = '%s नतिजा'
			const formattedAuthorRefinementCount = util.format(this.elements.authorRefinementCount.selector, authorName)
			const authorsList = []

			await this.useXpath()
				.getText(formattedAuthorRefinementCount, (countResult) => {
					const valueToFilter = countResult.value;
					const found = valueToFilter.match(regex)
					filterCountResultMsg = util.format(filterCountResultMsg, found[0]);
				});
			await this.assert
				.containsText('@searchResultCountInfo', filterCountResultMsg);
			return this.api
				.elements('xpath', this.elements.searchItemAuthorName.selector, (result) => {
					const elementIDs = result.value
					for (const elementID of elementIDs) {
						this.api.elementIdText(elementID.ELEMENT, (elementText) => {
							authorsList.push(elementText.value);
						});
					}
					callback(authorsList);
				});
		}
	},
	elements: {
		searchResultFoundContainer: {
			selector: '.sk-hits'
		},
		searchResultNotFoundContainer: {
			selector: '.sk-no-hits'
		},
		authorNameCheckBox: {
			selector: "((//div[contains(@class, 'Filters__Desktop')]//span)[text()='%s'])/preceding-sibling::input",
			locateStrategy: 'xpath'
		},
		authorRefinementOptionContainer: {
			selector: "((//div[contains(@class, 'Filters__Desktop')]//span)[text()='%s'])",
			locateStrategy: 'xpath'
		},
		authorRefinementCount: {
			selector: "((//div[contains(@class, 'Filters__Desktop')]//span)[text()='%s'])/following-sibling::span",
			locateStrategy: 'xpath'
		},
		searchResultCountInfo: {
			selector: "//div[contains(@class,'sk-hits-stats__info')]",
			locateStrategy: 'xpath'
		},
		searchItemAuthorName: {
			selector: "//div[contains(@class,'SearchItem__Author')]",
			locateStrategy: 'xpath'
		}


	}
}