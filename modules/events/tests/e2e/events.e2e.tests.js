'use strict';

describe('Events E2E Tests:', function() {
	describe('Test Events page', function() {
		it('Should not include new Events', function() {
			browser.get('http://localhost:3000/#!/events');
			expect(element.all(by.repeater('event in events')).count()).toEqual(0);
		});
	});
});
