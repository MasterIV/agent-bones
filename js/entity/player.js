define(['basic/entity', 'geo/v2', 'geo/rect', 'config/colors', 'basic/rect', 'core/graphic', 'core/game'],
	function(Entity, V2, Rect, colors, RectEntity, graphics, game) {
		var jumpSpeed = 400;
		var gravity = .6;

		var size = new V2(40, 80);
		var area = new Rect(size.prd(-1), size);

		function Player(pos, speed, map, viewport) {
			Entity.call(this);

			this.map = map;
			this.position = pos;
			this.velocity = new V2(speed,0);
			this.viewport = viewport;

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

				var flags = this.map.flags(pos);
				var fass = this.map.flags(ass);

				if(flags['kill'])
					return this.die();

				if(before.y < pos.y && (flags['ground'] || flags['block'] || fass['ground'] || fass['block'])) {
					this.velocity.y = 0;
					this.grounded = true;

					this.position.y = pos.y * this.map.tile.y - 1;
					pos = this.map.toTile(this.position);
					flags = this.map.flags(pos);
				}

				if(before.x < pos.x && flags['block'])
					this.position.x = pos.x * this.map.tile.x - 1;
			}

			if(this.position.x < -this.viewport.position.x || this.position.y > 740)
				this.die();
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

		Player.prototype.die = function () {
			alert('you lost!');
			game.scene = require('config/scenes').menu;
		};

		return Player;
	}
);