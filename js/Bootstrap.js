function Bootstrap(options) {
	
	//this.__proto__ = new BaseBootstrap(options); //Extend the base class
	//this.constructor.prototype = new BaseBootstrap;
	/*
this.constructor.prototype.onAppReady = function() {
		console.log('app ready boot');
	}
*/
	this.appOn = false;
	
	extend(this, BaseBootstrap);
}