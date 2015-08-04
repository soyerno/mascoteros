'use strict';

(function() {
	// Pet articles Controller Spec
	describe('Pet articles Controller Tests', function() {
		// Initialize global variables
		var PetArticlesController,
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

			// Initialize the Pet articles controller.
			PetArticlesController = $controller('PetArticlesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Pet article object fetched from XHR', inject(function(PetArticles) {
			// Create sample Pet article using the Pet articles service
			var samplePetArticle = new PetArticles({
				name: 'New Pet article'
			});

			// Create a sample Pet articles array that includes the new Pet article
			var samplePetArticles = [samplePetArticle];

			// Set GET response
			$httpBackend.expectGET('api/pet-articles').respond(samplePetArticles);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.petArticles).toEqualData(samplePetArticles);
		}));

		it('$scope.findOne() should create an array with one Pet article object fetched from XHR using a petArticleId URL parameter', inject(function(PetArticles) {
			// Define a sample Pet article object
			var samplePetArticle = new PetArticles({
				name: 'New Pet article'
			});

			// Set the URL parameter
			$stateParams.petArticleId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/pet-articles\/([0-9a-fA-F]{24})$/).respond(samplePetArticle);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.petArticle).toEqualData(samplePetArticle);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(PetArticles) {
			// Create a sample Pet article object
			var samplePetArticlePostData = new PetArticles({
				name: 'New Pet article'
			});

			// Create a sample Pet article response
			var samplePetArticleResponse = new PetArticles({
				_id: '525cf20451979dea2c000001',
				name: 'New Pet article'
			});

			// Fixture mock form input values
			scope.name = 'New Pet article';

			// Set POST response
			$httpBackend.expectPOST('api/pet-articles', samplePetArticlePostData).respond(samplePetArticleResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Pet article was created
			expect($location.path()).toBe('/pet-articles/' + samplePetArticleResponse._id);
		}));

		it('$scope.update() should update a valid Pet article', inject(function(PetArticles) {
			// Define a sample Pet article put data
			var samplePetArticlePutData = new PetArticles({
				_id: '525cf20451979dea2c000001',
				name: 'New Pet article'
			});

			// Mock Pet article in scope
			scope.petArticle = samplePetArticlePutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/pet-articles\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/pet-articles/' + samplePetArticlePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid petArticleId and remove the Pet article from the scope', inject(function(PetArticles) {
			// Create new Pet article object
			var samplePetArticle = new PetArticles({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Pet articles array and include the Pet article
			scope.petArticles = [samplePetArticle];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/pet-articles\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePetArticle);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.petArticles.length).toBe(0);
		}));
	});
}());