function Bootstrap(options) {
	this.__proto__ = new BaseBootstrap(options); //Extend the base class
	this.onAppReady = function() {
		console.log('app ready boot');
	}	
}