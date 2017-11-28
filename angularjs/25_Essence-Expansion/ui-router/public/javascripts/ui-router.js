var mymodule = angular.module('myApp',['ui.router'])
.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
.state('start',
{
	url:'/',
	template:`<div>WC to start</div>`
})
.state('home',
{
	resolve:{
		person:function(){
			return {
				name:"Ari",
				email:"ari@gmail.com"
			}
		},
		currentDetails:function($http){
			return $http({
				method:'JSONP',
				url:'/curent_detail'
			})
		},
		currentUser:function($http,currentDetails){
			$http({
				method:'GET',
				url:'/current_user',
				params:{
					email:currentDetails.data.email[0]
				}
			})
		}
	},

	controller:function($scope,person,currentDetails,currentUser){
		$scope.person = person;
	},

	url:'/home',
	template:'<div>Hi {{person}} ,WC to home</div>'
})

})