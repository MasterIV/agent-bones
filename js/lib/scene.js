function Scene() {
	Entity.call(this);
	this.size.x = screen.w;
	this.size.y = screen.h;
	this.keyAware = [];
}

Scene.prototype = new Entity();

Scene.prototype.onDraw = function(ctx) {
	if(config.debug)
		ctx.clearRect(0, 0, this.size.x, this.size.y);
	if( this.bg )
		ctx.drawImage(graphics[this.bg], 0, 0);
};

Scene.prototype.center = function(obj) {
	obj.position.x = this.size.x / 2 - obj.size.x / 2;
	this.entities.push(obj);
};

Scene.prototype.up = function(key) {
	this.dispatch(this.keyAware, 'up', key);
};

Scene.prototype.down = function(key) {
	this.dispatch(this.keyAware, 'down', key);
};