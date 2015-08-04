'use strict';

describe('Pet articles E2E Tests:', function() {
	describe('Test Pet articles page', function() {
		it('Should not include new Pet articles', function() {
			browser.get('http://localhost:3000/#!/pet-articles');
			expect(element.all(by.repeater('petArticle in petArticles')).count()).toEqual(0);
		});
	});
});
