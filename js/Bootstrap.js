function Bootstrap() 
{   this.extends(Bootstrap_Abstract);
	
	var front = this.getFrontController();
	front.setRoute({module: 'Default', controller: 'Index', action: 'index'});
	front.dispatch();
}