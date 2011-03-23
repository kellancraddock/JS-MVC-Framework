Object.prototype.extends = function(super) {
	var mySub = this;
	var mySuper = new super;
	//Loop through all properties of super
	for(var f in mySuper) {
		if (!(f in mySub)) {
			mySub[f] = mySuper[f]; //If the property does not exist in the sub add it
		} else {
			mySuper[f] = mySub[f]; //If the property does exist in the sub overwrite the one in the super
		}
	}
}

function FrontController_Abstract() {
	
	var baseUrl;
	var route = {};
	
	this.init = function() {
		var url = location.pathname.split('/');
		route.module = (url[0]) ? url[0] : 'Default'; 
		route.controller = (url[1]) ? url[1] : 'Index'; 
		route.action = (url[2]) ? url[2] : 'index';
		console.log(route);
	}()
	
	this.setRoute = function(setroute) {
		route = setroute;
	}
	
	this.getRoute = function() {
		return route;
	}
	
	//ATTEMPT TO LOAD CONTROLLER AND VIEW
	this.dispatch = function() {
		if (route.controller) { //If the controller is defined, create the view and controller strings
			var controller = route.controller + 'Controller';
			var action = route.action + 'Action';
			var view = route.controller + 'View';
			if (window[view]) { //If the view exists, load it
				self.view = new window[view]();
			}
			if (window[controller]) { //If the controller exists
				self.controller = new window[controller](self.view);
				self.controller.init();
				self.controller[action]();
			} else { //No controller class, throw error
				//self.errors.push('The specified Controller: ' + options.controller + ' does not exist.');
			}
		} else { //No specifed controller, throw error
			//self.errors.push('No Controller was specified.');
		}		
	}
}

function Controller_Abstract() {
	this.init = function() {
	}
}

function Bootstrap_Abstract() {
	var self = this;
	
	this.view; //The View
	this.appOn = true; //appOn Bool, turns the app on or off.
	this.errors = new Array(); //Array for holding errors.
	this.throwExceptions = true; //Bool for throwing exceptions
	this.options = {};
	
	//INITALIZE AND ATTEMPT TO START THE APP
	this.init = function() {
		if (self.appOn) {
			//self.startMVC() //Start MVC	
		} else {
			self.errors.push('Application is off.');
		}
		
		if (self.errors.length) { // If there are errors, handle them
			//Handle errors
			if (self.throwExceptions) {
				alert(self.errors);
			}
			return false;
		} else { //App has loaded, set settings, fire onAppReady
			self.onAppReady(); //App is ready
		}
	}
	
	this.getFrontController = function() {
		return new FrontController_Abstract();
	}
	
	//APP IS READY - MVC has loaded, all settings/vars are set. Execute the code below (eg. a startMVC callback).
	this.onAppReady = function() {
		console.log('app ready base');
	}
}

$(function() {
	new Bootstrap();
});
