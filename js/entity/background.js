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

		function ri(l) {
			return l[(Math.random()*l.length)|0];
		}


		function Background(width) {
			Entity.call(this, Zero(), new V2(width, screen.h));

			var fw = graphics['img/bg_forest.png'].width;
			var fc = Math.ceil( width / fw );
			for(var i = 0; i < fc; i++)
				this.add(new ImageEntity(new V2(i*fw, 0), 'img/bg_forest.png'));

			var ti = ['img/bg_tree_1.png','img/bg_tree_2.png','img/bg_tree_3.png','img/bg_tree_4.png'];
			var to = (Math.random() * 100) | 0;
			while(to < width) {
				var img = ri(ti);
				this.add(new ImageEntity(new V2(to, 0), img));
				to += graphics[img].width + 50 + Math.round(Math.random() * 100);
			}
		}

		Background.prototype = new Entity();

		return Background;
	}
);