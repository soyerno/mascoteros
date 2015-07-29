'use strict';

describe('Rides E2E Tests:', function() {
	describe('Test Rides page', function() {
		it('Should not include new Rides', function() {
			browser.get('http://localhost:3000/#!/rides');
			expect(element.all(by.repeater('ride in rides')).count()).toEqual(0);
		});
	});
});
