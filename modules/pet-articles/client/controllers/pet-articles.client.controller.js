'use strict';

// Pet articles controller
angular.module('pet-articles').controller('PetArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'PetArticles',
	function($scope, $stateParams, $location, Authentication, PetArticles ) {
		$scope.authentication = Authentication;

		// Create new Pet article
		$scope.create = function() {
			// Create new Pet article object
			var petArticle = new PetArticles ({
				name: this.name,
				content: this.content,
				pet: $stateParams.petId
			});

			// Redirect after save
			petArticle.$save(function(response) {
				$location.path('pet-articles/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Pet article
		$scope.remove = function( petArticle ) {
			if ( petArticle ) { petArticle.$remove();

				for (var i in $scope.petArticles ) {
					if ($scope.petArticles [i] === petArticle ) {
						$scope.petArticles.splice(i, 1);
					}
				}
			} else {
				$scope.petArticle.$remove(function() {
					$location.path('pet-articles');
				});
			}
		};

		// Update existing Pet article
		$scope.update = function() {
			var petArticle = $scope.petArticle ;

			petArticle.$update(function() {
				$location.path('pet-articles/' + petArticle._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Pet articles
		$scope.find = function() {
			$scope.petArticles = PetArticles.query();
		};

		// Find existing Pet article
		$scope.findOne = function() {
			$scope.petArticle = PetArticles.get({ 
				petArticleId: $stateParams.petArticleId
			});
		};
	}
]);
