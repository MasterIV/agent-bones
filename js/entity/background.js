define(['core/graphic', 'basic/entity', 'geo/v2', 'basic/image', 'config/screen'],
	function(graphics, Entity, V2, ImageEntity, screen) {
		graphics.add('img/bg_rock_1.png');
		graphics.add('img/bg_rock_2.png');

		graphics.add('img/bg_tree_1.png');
		graphics.add('img/bg_tree_2.png');
		graphics.add('img/bg_tree_3.png');
		graphics.add('img/bg_tree_4.png');

		graphics.add('img/bg_forest.png');
		graphics.add('img/asset_clouds.png');

		function rand(imgs) {
			return imgs[(Math.random()*imgs.length)|0];
		}

		function Layer(pos, imgs, dist, speed, height) {
			Entity.call(this, pos);
			this.dist_fixed = dist * .4;
			this.dist_flex = dist * .6;
			this.offset = Math.round(Math.random() * this.dist_flex);
			this.imgs = imgs;
			this.height = height || 0;
			this.speed = speed / 1000;
		}

		Layer.prototype = new Entity();

		Layer.prototype.update = function(delta) {
			var move = this.speed * delta;

			for(var i in this.entities) {
				var e = this.entities[i];
				e.position.x -= move;
				if(e.position.x < -e.img.width)
					this.remove(e);
			}

			this.offset -= move;
			while(this.offset < screen.w) {
				var img = this.imgs[(Math.random()*this.imgs.length)|0];
				this.add(new ImageEntity(new V2(this.offset, Math.random()*this.height), img));
				this.offset += graphics[img].width + this.dist_fixed + Math.round(Math.random() * this.dist_flex);
			}
		};


		function Background(speed_factor) {
			Entity.call(this, Zero());

			this.add(new Layer(new V2(0, 100), ['img/asset_clouds.png'], 300, 50 * speed_factor, 200));
			this.add(new Layer(Zero(), ['img/bg_forest.png'], 0, 10 * speed_factor));
			this.add(new Layer(Zero(), ['img/bg_tree_1.png','img/bg_tree_2.png','img/bg_tree_3.png','img/bg_tree_4.png'], 200, 40*speed_factor));
			this.add(new Layer(new V2(0, 630), ['img/bg_rock_1.png', 'img/bg_rock_2.png'], 200, 80*speed_factor));
		}

		Background.prototype = new Entity();


		Background.prototype.click = function() {};
		Background.prototype.mousedown = function() {};
		Background.prototype.mouseup = function() {};

		return Background;
	}
);