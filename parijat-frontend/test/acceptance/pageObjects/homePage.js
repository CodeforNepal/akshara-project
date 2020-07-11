module.exports = {
	url() {
		return this.api.launch_url;
	},

	commands: {
		userEntersTheString(searchTerm) {
			return this.waitForElementVisible('@searchField')
				.setValue('@searchField', searchTerm);
		},

		getTransliterationString(callback) {
			return this.waitForElementVisible('@transliterationTextField')
				.getText('@transliterationTextField', (result) => {
					callback(result.value);
				});
		},
		selectTheTransliteratedText () {
			return this.waitForElementVisible('@transliterationTextField')
				.click('@transliterationTextField');
		},
		searchForTheLiterature  () {
			return this.click('@searchButton');
		}

	},

	elements: {
		searchField: {
			selector: "//input[contains(@class, 'SearchBox')]",
			locateStrategy: 'xpath'
		},
		transliterationTextField: {
			selector: "//button[contains(@class,'TransliteratedInput__Suggestion')]",
			locateStrategy: 'xpath'
		},
		searchButton: {
			selector: "//button[contains(@class,'SearchBox__Button')]",
			locateStrategy: 'xpath'
		}
	}
}
