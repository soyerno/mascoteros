'use strict';

(function() {
	// Petbreeds Controller Spec
	describe('Petbreeds Controller Tests', function() {
		// Initialize global variables
		var PetbreedsController,
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

			// Initialize the Petbreeds controller.
			PetbreedsController = $controller('PetbreedsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Petbreed object fetched from XHR', inject(function(Petbreeds) {
			// Create sample Petbreed using the Petbreeds service
			var samplePetbreed = new Petbreeds({
				name: 'New Petbreed'
			});

			// Create a sample Petbreeds array that includes the new Petbreed
			var samplePetbreeds = [samplePetbreed];

			// Set GET response
			$httpBackend.expectGET('api/petbreeds').respond(samplePetbreeds);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.petbreeds).toEqualData(samplePetbreeds);
		}));

		it('$scope.findOne() should create an array with one Petbreed object fetched from XHR using a petbreedId URL parameter', inject(function(Petbreeds) {
			// Define a sample Petbreed object
			var samplePetbreed = new Petbreeds({
				name: 'New Petbreed'
			});

			// Set the URL parameter
			$stateParams.petbreedId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/petbreeds\/([0-9a-fA-F]{24})$/).respond(samplePetbreed);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.petbreed).toEqualData(samplePetbreed);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Petbreeds) {
			// Create a sample Petbreed object
			var samplePetbreedPostData = new Petbreeds({
				name: 'New Petbreed'
			});

			// Create a sample Petbreed response
			var samplePetbreedResponse = new Petbreeds({
				_id: '525cf20451979dea2c000001',
				name: 'New Petbreed'
			});

			// Fixture mock form input values
			scope.name = 'New Petbreed';

			// Set POST response
			$httpBackend.expectPOST('api/petbreeds', samplePetbreedPostData).respond(samplePetbreedResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Petbreed was created
			expect($location.path()).toBe('/petbreeds/' + samplePetbreedResponse._id);
		}));

		it('$scope.update() should update a valid Petbreed', inject(function(Petbreeds) {
			// Define a sample Petbreed put data
			var samplePetbreedPutData = new Petbreeds({
				_id: '525cf20451979dea2c000001',
				name: 'New Petbreed'
			});

			// Mock Petbreed in scope
			scope.petbreed = samplePetbreedPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/petbreeds\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/petbreeds/' + samplePetbreedPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid petbreedId and remove the Petbreed from the scope', inject(function(Petbreeds) {
			// Create new Petbreed object
			var samplePetbreed = new Petbreeds({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Petbreeds array and include the Petbreed
			scope.petbreeds = [samplePetbreed];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/petbreeds\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePetbreed);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.petbreeds.length).toBe(0);
		}));
	});
}());