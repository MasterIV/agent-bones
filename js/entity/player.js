define(['basic/entity', 'geo/v2', 'geo/rect', 'config/colors', 'basic/rect', 'core/graphic'],
	function(Entity, V2, Rect, colors, RectEntity, graphics) {
		var jumpSpeed = 400;
		var gravity = .6;

		var size = new V2(40, 80);
		var area = new Rect(size.prd(-1), size);

		function Player(pos, speed, map) {
			Entity.call(this);

			this.map = map;
			this.position = pos;
			this.velocity = new V2(speed,0);

			this.grounded = true;

			this.add(new RectEntity(size.prd(-1), size, colors.player));
		}

		Player.prototype = new Entity();

		Player.prototype.getArea = function () {
			return area;
		};

		Player.prototype.onUpdate = function(delta) {
			this.velocity.y += gravity * delta;
			var move = this.velocity.prd(delta/1000);

			var steps = Math.ceil(Math.max(
				Math.abs( move.x )/this.map.tile.x,
				Math.abs( move.y )/this.map.tile.y));
			if(steps>1) move.div( steps );

			for(var i= 0; i < steps; i++) {
				var before = this.map.toTile(this.position);
				this.position.add(move);
				var pos = this.map.toTile(this.position);
				var ass = this.map.toTile(this.position.dif(new V2(size.x,0)));

				if(before.y < pos.y && (this.map.has(pos, 'ground') || this.map.has(ass, 'ground'))) {
					this.velocity.y = 0;
					this.grounded = true;
					this.position.y = pos.y * this.map.tile.y - 1;
				}

			}
		};

		Player.prototype.down = function(key) {
			if(key == 'space') this.jump();
		};

		Player.prototype.jump = function () {
			if(this.grounded) {
				this.grounded = false;
				this.velocity.y -= jumpSpeed;
			}
		};

		return Player;
	}
);