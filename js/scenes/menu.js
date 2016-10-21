define(['lib/scene', 'basic/button', 'core/game', 'geo/v2', 'basic/layout', 'scenes/play', 'core/graphic', 'basic/image', 'entity/background'],
	function(Scene, Button, game, V2, Layout, PlayScene, graphics, ImageEntity, Background) {
		graphics.add('img/asset_start_button.png');
		graphics.add('img/asset_credits_button.png');
		graphics.add('img/asset_logo.png');
		graphics.add('img/bg.jpg');

		function MenuScene() {
			Scene.call(this);
			this.bg = 'img/bg.jpg';
			this.add(new Background(1));

			var playButton = Button.create(Zero(), function() { game.scene = new PlayScene(100); }).img('img/asset_start_button.png', 1);
			var creditsButton = Button.create(Zero(), function() { game.scene = require('config/scenes').credits}).img('img/asset_credits_button.png', 1);

			//var helpButton = Button.create(new V2(0, 680), function() { game.scene = require('config/scenes').help; }).rect(300, 80).text("Help");

			var vLayout = new Layout.vertical(new V2(0, 20), 20, 50);
			vLayout.add(new ImageEntity(Zero(), 'img/asset_logo.png'));
			vLayout.add(playButton);
			vLayout.add(creditsButton);
			vLayout.align("center");
			this.center(vLayout);
		}

		MenuScene.prototype = new Scene();

		return MenuScene;
	}
);
