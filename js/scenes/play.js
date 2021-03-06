define(['lib/scene', 'entity/player', 'lib/map', 'lib/viewport', 'basic/rect', 'config/colors', 'geo/v2', 'core/graphic', 'entity/background'],
		function(Scene, Player, TiledMap, ViewPort, RectEntity, colors, V2, graphics, Background ) {
			graphics.add('img/bg.jpg');
			function PlayScene(speed) {
				Scene.call(this);
				this.bg = 'img/bg.jpg';

				this.viewport = new ViewPort(true);
				var map = new TiledMap('map');
				var player = new Player(new V2(640, 670), 100, map, this.viewport);

				this.speed = speed;
				this.viewport.add(map.render());
				this.viewport.add(player);


				this.add(new Background(1));
				this.add(this.viewport);
				this.keyAware.push(player);
			}

			PlayScene.prototype = new Scene();

			PlayScene.prototype.onUpdate = function(delta) {
				this.viewport.position.x -= this.speed * delta / 1000;
			};

			return PlayScene;
		}
);