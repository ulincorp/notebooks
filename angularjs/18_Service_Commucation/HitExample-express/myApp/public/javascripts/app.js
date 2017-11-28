angular.module('myApp',['myApp.services'])
.controller('HomeController',function($scope,HitService){
	console.log('%%%%%%%%%%%%%%%%%%%HitService',HitService)
	HitService.count().then(function(data){
		$scope.hits = data;
	})

	$scope.registerHit = function(){
		HitService.registerHit()
		.then(function(data){
			$scope.hits  = data;
		})
	}
})