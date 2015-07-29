'use strict';

(function() {
	// Rides Controller Spec
	describe('Rides Controller Tests', function() {
		// Initialize global variables
		var RidesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Rides controller.
			RidesController = $controller('RidesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Ride object fetched from XHR', inject(function(Rides) {
			// Create sample Ride using the Rides service
			var sampleRide = new Rides({
				name: 'New Ride'
			});

			// Create a sample Rides array that includes the new Ride
			var sampleRides = [sampleRide];

			// Set GET response
			$httpBackend.expectGET('api/rides').respond(sampleRides);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.rides).toEqualData(sampleRides);
		}));

		it('$scope.findOne() should create an array with one Ride object fetched from XHR using a rideId URL parameter', inject(function(Rides) {
			// Define a sample Ride object
			var sampleRide = new Rides({
				name: 'New Ride'
			});

			// Set the URL parameter
			$stateParams.rideId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/rides\/([0-9a-fA-F]{24})$/).respond(sampleRide);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ride).toEqualData(sampleRide);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Rides) {
			// Create a sample Ride object
			var sampleRidePostData = new Rides({
				name: 'New Ride'
			});

			// Create a sample Ride response
			var sampleRideResponse = new Rides({
				_id: '525cf20451979dea2c000001',
				name: 'New Ride'
			});

			// Fixture mock form input values
			scope.name = 'New Ride';

			// Set POST response
			$httpBackend.expectPOST('api/rides', sampleRidePostData).respond(sampleRideResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Ride was created
			expect($location.path()).toBe('/rides/' + sampleRideResponse._id);
		}));

		it('$scope.update() should update a valid Ride', inject(function(Rides) {
			// Define a sample Ride put data
			var sampleRidePutData = new Rides({
				_id: '525cf20451979dea2c000001',
				name: 'New Ride'
			});

			// Mock Ride in scope
			scope.ride = sampleRidePutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/rides\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/rides/' + sampleRidePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid rideId and remove the Ride from the scope', inject(function(Rides) {
			// Create new Ride object
			var sampleRide = new Rides({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Rides array and include the Ride
			scope.rides = [sampleRide];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/rides\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleRide);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.rides.length).toBe(0);
		}));
	});
}());