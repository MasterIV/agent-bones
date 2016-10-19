define(['lib/scene', 'basic/button', 'core/game', 'geo/v2', 'transitions/slideinright', 'basic/morph', 'definition/easing', 'basic/layout', 'scenes/play', 'core/graphic'],
	function(Scene, Button, game, V2, SlideInRightTransition, Morph, Easing, Layout, PlayScene, graphics) {
		graphics.add('img/asset_start_button.png');
		graphics.add('img/asset_credits_button.png');
		graphics.add('img/bg.jpg');

		function MenuScene() {
			Scene.call(this);
			this.bg = 'img/bg.jpg';

			var playButton = Button.create(new V2(0, 680), function() { game.scene = new PlayScene(100); }).img('img/asset_start_button.png', 1);
			var creditsButton = Button.create(new V2(0, 680), function() { game.scene = require('config/scenes').credits}).img('img/asset_credits_button.png', 1);

			//var helpButton = Button.create(new V2(0, 680), function() { game.scene = require('config/scenes').help; }).rect(300, 80).text("Help");

			var vLayout = new Layout.vertical(new V2(0, 20), 20, 50);
			vLayout.add(playButton);
			vLayout.add(creditsButton);
			vLayout.align("center");
			this.center(vLayout);

			//var easing = Easing.OUTELASTIC;
			//var self = this;

			//playButton.add(new Morph({ position: { y: 100 } }, 1500, easing));
			//creditsButton.add(new Morph({ position: { y: 250 } }, 1500, easing));
			//helpButton.add(new Morph({ position: { y: 400 } }, 1500, easing));
		}

		MenuScene.prototype = new Scene();

		return MenuScene;
	}
);
