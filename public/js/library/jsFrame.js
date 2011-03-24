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

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function FrontController_Abstract() {
	
	var self = this;
	var route = {};
	var usingModules = false;
	
	this.aquireRoute = function() {
		var url = location.pathname.split('/');
		if (usingModules) {
			route.module = (url[1]) ? url[1] : 'Default'; 
			route.controller = (url[2]) ? url[2].capitalize() : 'Index'; 
			route.action = (url[3]) ? url[3] : 'index';
		} else {
			route.module = null; 
			route.controller = (url[1]) ? url[1].capitalize() : 'Index'; 
			route.action = (url[2]) ? url[2] : 'index';
		}
	}
	
	self.aquireRoute();
	
	this.setUsingModules = function(setusingmodules) {
		usingModules = setusingmodules;
	}
	
	this.setRoute = function(setroute) {
		route = setroute;
	}
	
	this.getRoute = function() {
		return route;
	}
	
	//ATTEMPT TO LOAD CONTROLLER AND VIEW
	this.dispatch = function() {
		self.aquireRoute();
		var controller = route.controller + 'Controller';
		var action = route.action + 'Action';
		var view = route.controller + 'View';
		if (window[view]) { //If the view exists, load it
			self.view = new window[view]();
		}
		if (window[controller]) { //If the controller exists
			self.controller = new window[controller]();
			self.controller.setView(view);
			if (self.controller[action]) {
				self.controller.init();
				self.controller[action]();
			} else { //No controller action, throw error
				alert('Controller Action: ' + route.action + ' not found');
			}
		} else { //No controller class, throw error
			alert('Controller: ' + route.controller + ' not found');
		}
	}
}

function Controller_Abstract() {
	var self = this;
	this.view = null;
	this.init = function() {
	}
	this.setView = function(setview) {
		console.log('setview');
		self.view = setview;
		console.log(self.view);
	}
}

function Bootstrap_Abstract() {
	var self = this;

	this.appOn = true; //appOn Bool, turns the app on or off.
	this.throwExceptions = true; //Bool for throwing exceptions
	this.front = null;
	
	//INITALIZE AND ATTEMPT TO START THE APP
	this.init = function() {
		if (self.appOn) {
			self.front = self.getFrontControllerInstance();
		} else {
			alert('App is Off');
		}
	}
	
	this.getFrontControllerInstance = function() {
		return new FrontController_Abstract();
	}
	
	//APP IS READY - MVC has loaded, all settings/vars are set. Execute the code below (eg. a startMVC callback).
	this.onAppReady = function() {
		console.log('app ready base');
	}
	
	this.init();
}

$(function() {
	new Bootstrap();
});
