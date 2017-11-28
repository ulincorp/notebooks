angular.module('myApp.services',[])
.factory('HitService', ['$q','$http',function ($q,$http) {
	var service = {
		count:function(){
			console.log('%%%%%%%%%%%%%$http',$http);
			var d = $q.defer();
			$http.get('/hits')
			.then(function(data){
				d.resolve(data.data);
			})
			.catch(function(error){
				d.reject(error);
			})
			return d.promise;
		},
		registerHit:function(){
			var d = $q.defer();
			$http.get('/hit')
			.then(function(data){
				d.resolve(data.data);
			})
			.catch(function(error){
				d.reject(error)
			})
			return d.promise;
		}
	}

	return service;
}])