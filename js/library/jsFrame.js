function BaseController() {
}

function BaseBootstrap(options) {
	var self = this;
	this.module = (options.module) ? options.module : 'Default'; //controller is either a string, or false
	this.controller = (options.controller) ? options.controller : 'Index'; //controller is either a string, or false
	this.action = (options.action) ? options.action : 'index'; //controller is either a string, or false
	
	this.view; //The View
	this.appOn = true; //appOn Bool, turns the app on or off.
	this.errors = new Array(); //Array for holding errors.
	this.throwExceptions = false; //Bool for throwing exceptions
	
	//INITALIZE AND ATTEMPT TO START THE APP
	this.init = function() {
		if (self.appOn) {
			self.startMVC() //Start MVC	
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
	
	//ATTEMPT TO LOAD CONTROLLER AND VIEW
	this.startMVC = function() {
		if (self.controller) { //If the controller is defined, create the view and controller strings
			var controller = self.controller + 'Controller';
			var action = self.action + 'Action';
			var view = self.controller + 'View';
			if (window[view]) { //If the view exists, load it
				self.view = new window[view]();
			}
			if (window[controller]) { //If the controller exists
				self.controller = new window[controller](self.view);
				self.controller[action]();
			} else { //No controller class, throw error
				self.errors.push('The specified Controller: ' + self.controller + ' does not exist.');
			}
		} else { //No specifed controller, throw error
			self.errors.push('No Controller was specified.');
		}		
	}
	
	//APP IS READY - MVC has loaded, all settings/vars are set. Execute the code below (eg. a startMVC callback).
	this.onAppReady = function() {
		console.log('app ready base');
	}
	
	//INIT THE BOOTSTRAP
	self.init();
}
