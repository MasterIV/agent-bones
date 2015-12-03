function ViewPort(updateHidden) {
	Entity.call(this);
	this.updateHidden = updateHidden;
	this.visible = new V2(screen.w, screen.h);
	this.subject = null;
}

ViewPort.prototype = new Entity();

ViewPort.prototype.getVisibleArea = function() {
	if(this.size.x == 0 && this.size.y == 0) this.inheritSize();
	var pos = this.position.inverse();
	return new Rect(pos, pos.sum(this.visible));
};

ViewPort.prototype.dispatch = function(list, event, argurment) {
	for (var i = 0; i < list.length; i++)
		if (list[i][event]) {

			if(event == 'draw' && this.getVisibleArea().collision(list[i].getArea()))
				list[i].draw(argurment);
			if(event == 'update' && (this.updateHidden || this.getVisibleArea().collision(list[i].getArea())))
				list[i].update(argurment);
			else
				list[i][event](argurment);
		}
};

ViewPort.prototype.follow = function(entity) {
	this.subject = entity;
};

ViewPort.prototype.scrollTo = function(pos) {

};

ViewPort.prototype.update = function(delta) {
	Entity.prototype.update.call(this, delta);

	if( this.subject ) {
		this.position.x = Math.max(Math.min(0, this.visible.x/2-this.subject.position.x), this.visible.x-this.size.x );
		this.position.y = Math.max(Math.min(0, this.visible.y/2-this.subject.position.y), this.visible.y-this.size.y );
	}
};