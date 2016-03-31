angular
	.module('app', ['ngRoute', 'firebase'])
	.constant('FirebaseUrl', 'https://fire-gochat.firebaseio.com')
	.service('rootRef', ['FirebaseUrl', Firebase])
	.service('messages', Messages)
	.controller('MyCtrl', MyController)
	.config(ApplicationConfig);


function ApplicationConfig($routeProvider) {
	$routeProvider.when('/', {
		controller: 'MyCtrl as ctrl',
		templateUrl: 'myctrl.html',
	})
}

function Messages(rootRef, $firebaseObject, $firebaseArray) {
	var msgRef = rootRef.child('messages');
	this.get = function get(id) {
		return $firebaseObject(msgRef.child(id));
	}
	this.all = function all() {
		return $firebaseArray(msgRef);
	}
}

function MyController(messages) {
	this.message = messages.get('msg2');
	this.messages = messages.all();
}