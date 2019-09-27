const { When, Then } = require('cucumber')
const { client } = require('nightwatch-api')
const assert = require('assert')

When('the user filters the results based on author {string}', (authorName) => client.page.resultPage().filterResultBasedOnAuthor(authorName));

Then('the result should only show the literature written by {string}', (authorName) => client.page.resultPage().getAllAuthorsFromResultList(authorName, (authorsList) => {
	authorsList.forEach((author) => {
		assert.strictEqual(author, authorName);
	});
}));

