'use strict';

angular.module('imageuploaders').filter('cloudinaryProfile', [
	function() {
		return function(input) {
			// Cloudinary directive logic
			// ...
			var res = input.split("/upload/");
			console.log(res);
			input = res[0]+ '/upload/w_150,h_150,c_thumb,g_face/' + res[1];
			return input;
		};
	}
]);
