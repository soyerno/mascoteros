'use strict';

describe('Petbreeds E2E Tests:', function() {
	describe('Test Petbreeds page', function() {
		it('Should not include new Petbreeds', function() {
			browser.get('http://localhost:3000/#!/petbreeds');
			expect(element.all(by.repeater('petbreed in petbreeds')).count()).toEqual(0);
		});
	});
});
