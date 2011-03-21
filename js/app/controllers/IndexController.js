//IndexController.prototype = new BaseController();
function IndexController(viewStr) {
	var self = this,
		view = viewStr;
	
	this.init = function() {
		self.view = viewStr;
	}();
	//-------------------------------------------------
	// Public Methods (Actions)
	//-------------------------------------------------
	/**
	 *
	 */
	this.indexAction = function( dataObj ) {
		console.log('index');
	};
	
	this.updateAction = function() {
		console.log('update');
	}
	//-------------------------------------------------
	// Private Methods (Action Helpers)
	//-------------------------------------------------
	/**
	 *
	 */
}
//new Extend(IndexController, BaseController);
