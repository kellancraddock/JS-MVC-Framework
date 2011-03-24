function IndexController() 
{	this.extends(Controller_Abstract);
	console.log(this);
	this.init = function() {
		console.log('init');
		console.log(this);
	};
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
