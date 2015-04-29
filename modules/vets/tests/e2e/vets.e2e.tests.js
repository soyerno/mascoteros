'use strict';

describe('Vets E2E Tests:', function() {
	describe('Test Vets page', function() {
		it('Should not include new Vets', function() {
			browser.get('http://localhost:3000/#!/vets');
			expect(element.all(by.repeater('vet in vets')).count()).toEqual(0);
		});
	});
});
